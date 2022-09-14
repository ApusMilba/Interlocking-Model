'use strict';
console.log ("script generic_2-2-2_geo_V1_definitions.js started");

// topology parameters
const startPoint = [50, 130]; // coordinates of track left up
const deltaY = 80 // delta height to next y axe (axe 200)


let myFailureText = '';

let myVar; // for timer after 'preBuildTrainRoute()'

const	trackWidth = 2, // width of track stroke
		lengthRhomb = 12, // length (in x direction) of rhomb
		lengthTS = 10, // length of a train signal 
		radiusDotBlue = 5, // radius of blue dot

		lengthPFace = 20, // length of tongue (fix) [Weichenspitze]
		lengthPTrail = 40, // length of fix and variable part straight [stumpfe Seite der Weiche]
		lengthP = lengthPFace + lengthPTrail, // length of a point
		gradientP = 8/40, // 

		// lengthPFaceSpec = 24, // length of tongue (fix) with 'lengthFixSide24 = true'
		deltaSpw = 4, // delta length of Spw

		deltaText = 10, // distance between track and track number
		deltaBlock = 15, // distance between block arrow and track
		lengthBlockArrow = 10, // length block arrow
		switchSteepness = 5, // point: delta y to delta x
		dy = 2, // vertical reception range of mouse click on track
		tChangeSwitch = 2500, // flashing time point when switching [ms]
		signalFont = "14px Arial",
		trackFont = "14px Arial",
		switchFont = "14px Arial",
		titleFont = "16px Arial",
		colorMagenta = "#ff00ff",
		colorWhite = "#ffffff",
		colorBlack = "#000000",
		colorRed = "#ff0000",
		colorGreen = "#00ff00",
		colorLightGreen = "#b3ffb3",
		colorDarkGreen = "#008000",
		colorDarkBlue = "#4169e1", // blue dot
		colorOrange = "#ff6600",
		colorYellow = "#ffff00";

let	i = 1, // generic varable in loops
   	x, y, xx, yy, xStart, yStart, xTarget, yTarget, // coordinates
	mouseIsDown = false,
	mouseIsDownForCallZf = false,
	preBuildFailureText = '',
	blink1 = true,
	geometric = false,
	geometricR = false,
	geometricL = false,
	condSig = false,
	condGl = false,
	rect,
	styleYes, styleNo, styleFont, styleLine, preString, postString, zfStartEnd,
	colorStatics;

let potentialTarget = '';
let potentialStartSignal = '';
let potentialTrainRoute = [];

let preBuildedStartSignal = '';
let preBuildedTarget = '';
let preBuildedTrainRoute = [];
let preBuildedOlElement = '';
let preBuildedFlancProt = [];
let preBuildTRok = false;

let pointsToSet = [];
let setPointsOk = false;

let BuildTRok = false;
	

let	cnv = document.getElementById('myCanvas'),
    ctx = cnv.getContext('2d'),
	bb = cnv.getBoundingClientRect();

	ctx.fillStyle = "#000000"; // black
	ctx.fillRect(0, 0, cnv.width, cnv.height);
	ctx.lineWidth = trackWidth;
	ctx.font = "16px Arial";
	let myTextAlign = "center";
	ctx.textAlign = myTextAlign;
	
let
	// all element names 
	blockNames = [],
	trackNames = [],
	pointNames = [],
	trainSignalNames = [];
	

const stationName = "Testikon";
	
/* topology
yPos0: bl113, tr113, A113, tr21, p1, p4, tr41, B1, tr1, C1, tr61, p5, tr71, D115, tr115, bl115
yPos1: bl213, tr213, A213, tr22, p2, p3, tr42, B2, tr2, C2, tr62, p6, tr72. D215, tr215, bl215
*/

// geometry
const xPos0 = startPoint[0]; 

const yPos0 = startPoint[1];
const yPos1 = yPos0 + deltaY;

// length of tracks
let tr113Length = 120;
let tr21Length = 75;
let tr41Length = 75;
let tr1Length = 350;
let tr61Length = 75;
let tr71Length = 75;
let tr115Length = 140;

let tr213Length = tr113Length;
let tr22Length = tr21Length-deltaSpw;
let tr42Length = tr41Length-deltaSpw;
let tr2Length = tr1Length;
let tr62Length = tr61Length+deltaSpw;
let tr72Length = tr71Length-deltaSpw;
let tr215Length = tr115Length;

let addDistp2p3 = 0;

// instancing all elements from left to right, top down
// neighboursL will be automatic completed in the function 'completeTopo()'
// tracks and points
// first row
let tr113 = new Track('tr113', xPos0+lengthRhomb/2, yPos0, xPos0+lengthRhomb/2+tr113Length, yPos0, [0,0], [0,0], 'tr21', true);
let tr21 = new Track('tr21', tr113.cooRx+lengthTS, yPos0, tr113.cooRx+lengthTS+tr21Length, yPos0, [0,0], [0,0], 'p1@T', false);
let p1 = new Point ('p1', 'p1', tr21.cooRx+lengthPFace, yPos0, false, true, 'tr21', 'p4@R', 'p2@R', '', 0, 0, false);
// let tr31 = new Track('tr31', tr21.cooRx+lengthP, yPos0, tr21.cooRx+lengthP+tr31Length, yPos0, [0,0], [0,0], 'tr41', false);
let p4 = new Point ('p4', 'p4', p1.cooX + 2 * gradientP * deltaY + 2 * lengthPFace + addDistp2p3, yPos0, true, false, 'tr41', 'p3@L', 'p1@L', '', 0, 0, true);
let tr41 = new Track('tr41', p4.cooX+lengthPFace, yPos0, p4.cooX+lengthPFace+tr41Length, yPos0, [0,0], [0,0], 'tr1', false);
let tr1 = new Track('tr1', tr41.cooRx+lengthTS, yPos0, tr41.cooRx+lengthTS+tr1Length, yPos0, [0,0], [0,0], 'tr61', false);
let tr61 = new Track('tr61', tr1.cooRx+lengthTS, yPos0, tr1.cooRx+lengthTS+tr61Length, yPos0, [0,0], [0,0], 'p5@R', false);
let tr71 = new Track('tr71', tr61.cooRx+lengthP, yPos0, tr61.cooRx+lengthP+tr71Length, yPos0, [0,0], [0,0], 'tr115', false);
let tr115 = new Track('tr115', tr71.cooRx+lengthTS, yPos0, tr71.cooRx+lengthTS+tr115Length, yPos0, [0,0], [0,0], '', true);

// second row
let tr213 = new Track('tr213', xPos0+lengthRhomb/2, yPos1, xPos0+lengthRhomb/2+tr213Length, yPos1, [0,0], [0,0], 'tr22', true);
let tr22 = new Track('tr22', tr213.cooRx+lengthTS, yPos1, tr213.cooRx+lengthTS+tr22Length, yPos1, [0,0], [0,0], 'p2@L', false);
let p2 = new Point ('p2', 'p2', tr22.cooRx+lengthPTrail, yPos1, true, true, 'p3@T', 'tr22', 'p1@L', '', addDistp2p3/2, 0, false);
let p3 = new Point ('p3', 'p3', p2.cooX+2*lengthPFace+addDistp2p3, yPos1, false, false, 'p2@T', 'p4@L', 'tr42', '', addDistp2p3/2, 0, true);
let tr42 = new Track('tr42', p3.cooX + lengthPTrail, yPos1, p3.cooX + lengthPTrail + tr42Length, yPos1, [0,0], [0,0], 'tr2', false)
let tr2 = new Track('tr2', tr42.cooRx+lengthTS, yPos1, tr42.cooRx+lengthTS+tr1Length, yPos1, [0,0], [0,0], 'tr62', false);
let tr62 = new Track('tr62', tr2.cooRx+lengthTS, yPos1, tr2.cooRx+lengthTS+tr62Length, yPos1, [0,0], [0,0], 'p6@T', false);
let tr72 = new Track('tr72', tr62.cooRx+lengthP, yPos1,tr62.cooRx+lengthP+tr72Length, yPos1, [0,0], [0,0], 'tr215', false);
let tr215 = new Track('tr215', tr72.cooRx+lengthTS, yPos1, tr72.cooRx+lengthTS+tr215Length, yPos1, [0,0], [0,0], '', true);

// points
let p5 = new Point ('p5', 'W5', tr61.cooRx+lengthPTrail, yPos0, true, false, 'tr71', '', '', '', 0, 0, true);

let p6 = new Point ('p6', 'W6', tr62.cooRx+lengthPFace, yPos1, false, false,	'', 'p5@L', 'tr72', '', 0, 0, true);

// train signals
let A113 = new TrainSignal ('A113', true, 'tr113', tr113.cooRx+lengthTS, yPos0, false, false);
let B1 = new TrainSignal ('B1', false, 'tr1', tr41.cooRx, yPos0, true, false);
let C1 = new TrainSignal('C1', true, 'tr1', tr1.cooRx+lengthTS, yPos0, true, false);
let D115 = new TrainSignal('D115', false, 'tr115', tr71.cooRx, yPos0, false, false);
let A213 = new TrainSignal ('A213', true, 'tr213', tr213.cooRx+lengthTS, yPos1, false, false);
let B2 = new TrainSignal ('B2', false, 'tr2', tr42.cooRx, yPos1, true, false);
let C2 = new TrainSignal('C2', true, 'tr2', tr2.cooRx+lengthTS, yPos1, true, false);
let D215 = new TrainSignal('D215', false, 'tr215', tr72.cooRx, yPos1, false, false);

// blocks (to be instanced after instancing the tracks, because blocks refer to tracks)
let bl113 = new Block ('bl113', 'ABC', false, tr113, true);
let bl115 = new Block('bl115', 'XYZ', true, tr115, true);
let bl213 = new Block ('bl213', '', false, tr213, false);
let bl215 = new Block('bl215', '', true, tr215, false);

// console.log('script "generic_2-2-2_goe_X0_definitions.js" ended');

