function completeTopo() {
	// GFM (tracks and points): each neighbour has to be named on both sides: R from definition, L done here
	//	tracks
	let i=0;
	let actualNeighbour = '';
	while (i < trackNames.length) {
		let actualTrack = eval(trackNames[i] + '.name');
		// console.log('actual track: ' + actualTrack);
		let actualNeighbourR = eval(trackNames[i] + '.nextGfmR');
		if (actualNeighbourR.slice(0,2) == 'tr') {
			// neighbour R = track
			// console.log(actualNeighbourR + '.nextGfmL = "' + actualTrack + '"');
			eval(actualNeighbourR + '.nextGfmL = "' + actualTrack + '"');
		}
		else if (actualNeighbourR.slice(0,1) == 'p') {
			let k = actualNeighbourR.indexOf('@');
			if (actualNeighbourR.slice(3,4) == 'T') {
				// neighbour R = point, side tongue
				// console.log(actualNeighbourR.slice(0,k) + '.neighbourFace = "' + actualTrack + '"');
				eval(actualNeighbourR.slice(0,k) + '.neighbourFace = "' + actualTrack + '"');
			}
			else if (actualNeighbourR.slice(3,4) == 'R') {
				// neighbour R = point, side Pos R
				// console.log(actualNeighbourR.slice(0,k) + '.neighbourPosR = "' + actualTrack + '"');
				eval(actualNeighbourR.slice(0,k) + '.neighbourPosR = "' + actualTrack + '"');
				// actualTrack zuweisen zu actualNeighbourR.slice(0,k).neighbourPosR
			}		 
			else if (actualNeighbourR.slice(3,4) == 'L') {
				// neighbour R = point, side Pos L
				// console.log(actualNeighbourR.slice(0,k) + '.neighbourPosL = "' + actualTrack + '"');
				eval(actualNeighbourR.slice(0,k) + '.neighbourPosL = "' + actualTrack + '"');
			}		 
		}
		// console.log('');	
		i++;
	}
	//	points
	i=0;
	while (i < pointNames.length) {
		let actualPoint = eval(pointNames[i] + '.name');
		// console.log('actual point: ' + actualPoint);
		if(eval(actualPoint + '.tongueR')) { // tongue side R
		   	// console.log('point ' + actualPoint + ' has his tongue (Weichenspitze) R');
			actualNeighbour = eval(actualPoint + '.neighbourFace');
			// console.log('his neighbour side tongue: ' + actualNeighbour);
			if (actualNeighbour.slice(0,2) == 'tr') {
				eval(actualNeighbour + '.nextGfmL = "' + actualPoint + '@T"');
				// console.log(actualNeighbour + '.nextGfmL = "' + actualPoint + '@T"');
			}
			else if (actualNeighbour.slice(0,1) == 'p') {
				// console.log('... is a point - coding still to do!')	
				// point with tongue side R and neighbour R = point: still to do!
			}				
		}
		else { // tongue side L
		   	// console.log('point ' + actualPoint + ' has his tongue (Weichenspitze) L');
			
			actualNeighbour = eval(actualPoint + '.neighbourPosR');
			// console.log('his neighbour side PosR: ' + actualNeighbour);
			if (actualNeighbour.slice(0,2) == 'tr') {
				// neighbour = track
				// console.log(actualNeighbour + '.nextGfmL = "' + actualPoint + '@R"');
				eval(actualNeighbour + '.nextGfmL = "' + actualPoint + '@R"');
			}
			else if (actualNeighbour.slice(0,1) == 'p') {
				// neighbour = point
				k = actualNeighbour.indexOf('@');
				let add = actualNeighbour.slice(k+1,k+2);
				switch(add) {
					case 'T':
						// console.log(actualNeighbour.slice(0,k) + '.neighbourFace = "' + actualPoint + '@R"');
						eval(actualNeighbour.slice(0,k) + '.neighbourFace = "' + actualPoint + '@R"');
						break;
					case 'R':
						// console.log(actualNeighbour.slice(0,k) + '.neighbourPosR = "' + actualPoint + '@R"');
						eval(actualNeighbour.slice(0,k) + '.neighbourPosR = "' + actualPoint + '@R"');
						break;
					case 'L':	
						// console.log(actualNeighbour.slice(0,k) + '.neighbourPosL = "' + actualPoint + '@R"');
						eval(actualNeighbour.slice(0,k) + '.neighbourPosL = "' + actualPoint + '@R"');
						break;
				}		
			}
			
			actualNeighbour = eval(actualPoint + '.neighbourPosL');
			// console.log('his neighbour side PosL: ' + actualNeighbour);
			if (actualNeighbour.slice(0,2) == 'tr') {
				// neighbour = track
				// console.log(actualNeighbour + '.nextGfmL = "' + actualPoint + '@L"');
				eval(actualNeighbour + '.nextGfmL = "' + actualPoint + '@L"');
			}
			else if (actualNeighbour.slice(0,1) == 'p') {
				// neighbour = point
				k = actualNeighbour.indexOf('@');
				let add = actualNeighbour.slice(k+1,k+2);
				switch(add) {
					case 'T':
						// console.log(actualNeighbour.slice(0,k) + '.neighbourFace = "' + actualPoint + '@L"');
						eval(actualNeighbour.slice(0,k) + '.neighbourFace = "' + actualPoint + '@L"');
						break;
					case 'R':
						// console.log(actualNeighbour.slice(0,k) + '.neighbourPosR = "' + actualPoint + '@L"');
						eval(actualNeighbour.slice(0,k) + '.neighbourPosR = "' + actualPoint + '@L"');
						break;
					case 'L':	
						// console.log(actualNeighbour.slice(0,k) + '.neighbourPosL = "' + actualPoint + '@L"');
						eval(actualNeighbour.slice(0,k) + '.neighbourPosL = "' + actualPoint + '@L"');
						break;
				}		
			}			
		}
		
		// console.log('');	
		i++;
	}
	
	// signals: named on both neighbours
	i=0;
	while (i < trainSignalNames.length) {
		let actualFromTrack = eval(trainSignalNames[i] + '.fromTrack');
		// console.log(trainSignalNames[i] + ', actualFromTrack: ' + actualFromTrack);
		if (eval(trainSignalNames[i] + '.dirR')) {
			eval(actualFromTrack + '.sideRdirR = ' + trainSignalNames[i]);
			let actualToTrack = eval(actualFromTrack + '.nextGfmR');
			// console.log('acutalToTrack: ' + actualToTrack);
			eval(actualToTrack + '.sideLdirR = ' + trainSignalNames[i]);	
		}
		else {
			eval(actualFromTrack + '.sideLdirL = ' + trainSignalNames[i]);
			let actualToTrack = eval(actualFromTrack + '.nextGfmL');
			// console.log('acutalToTrack: ' + actualToTrack);
			eval(actualToTrack + '.sideRdirL = ' + trainSignalNames[i]);				
		}
		i++;
	}
	
	// blocks: named on attributed track 
		for (let bl of blockNames) {
		let myTrack = eval(bl + '.attrTrack.name');
		// console.log('Block ' + bl + ': myTrack = ' + myTrack);

		eval(myTrack + '.attrBlock = ' + bl);	
	}	

	// tracks: display name without 'tr'
		for (let tr of trackNames) {
			let myLabel = eval(tr + '.name');
			myLabel = myLabel.slice(2);
			eval(tr + '.label = ' + myLabel);
		}
}


function onNewLoad() { // site is (re)loaded

	//  reset (deactivate) all elements
	completeTopo();
	
	// blocks
	for (let block of blockNames) {
		eval(block + '.reset()');
		eval(block + '.draw()');
	}


	//	tracks
	let i=0;
	while (i < trackNames.length) {
		eval(trackNames[i] + '.reset()');
		eval(trackNames[i] + '.draw()');
		// console.log (trackNames[i] + '.draw()');
		i++;
	}
		
	// points
	i=0;
	while (i < pointNames.length) {
		eval(pointNames[i] + '.reset()');
		eval(pointNames[i] + '.draw()');
		i++;
	}
	
	//	train signals
	for (let sig of trainSignalNames) {
		eval(sig + '.reset()');
		eval(sig + '.draw()');
	}	
		

	//  draw all elements and labels in magenta
	ctx.strokeStyle = colorMagenta;
	ctx.fillStyle = colorMagenta;
	colorStatics = colorMagenta;

	drawStatics();
	
	// loadDoc()
}


function initialize() { // on clicking the "initialize" button
	// disable all failure texts
	hideFailureText(); //in function initialize()

	ctx.strokeStyle = colorWhite;
	ctx.fillStyle = colorWhite;
	colorStatics = colorWhite;
	drawStatics();
	
	// normalize all elements
	// blocks
	// normalize basic block directions as at SBB (driving at left)
	for (let b of blockNames) {
		eval(b + '.reset()');
		eval(b + '.ok = true');
		eval(b + '.draw()');
	}

	// tracks
	for (let t of trackNames) {
		eval(t + '.reset()');
		eval(t + '.ok = true');
		eval(t + '.draw()');
		eval(t + '.checkSectionTrackBlock()');
	}
	
	//	points
	for (let p of pointNames) {
		eval(p + '.reset()');
		eval(p + '.ok = true');
		eval(p + '.posR =' + p + '.prefPosR');
		eval(p + '.draw()');		
	}

	//	train signals
	for (let ts of trainSignalNames) {
		eval(ts + '.reset()');
		eval(ts + '.ok = true');
		eval(ts + '.draw()');
	}
}


function operationInstruction() {	
}


function drawStatics() { // static elements

	ctx.beginPath()
	ctx.font = titleFont;
	ctx.fillStyle = colorStatics;
	ctx.rect((tr1.cooL[0] + tr1.cooR[0])/2 - 40, 0, 80, 30); 
	ctx.fillText(stationName, (tr1.cooL[0] + tr1.cooR[0])/2, 20); 	
	ctx.font="11px Arial";
	ctx.rect(0, 0, 60, 25); 
	ctx.fillText("reset text", 30, 18); 
	ctx.stroke();
}


function showFailureText(myInput) { // static elements

	hideFailureText() // in function showFailureText(myInput)
	ctx.textAlign = "left";
	ctx.font = titleFont;
	ctx.fillStyle = colorStatics;
	ctx.fillText(myInput, 20, 65); 
	ctx.stroke();
	ctx.textAlign = myTextAlign;
	return;
}


function hideFailureText() {// static elements
	//console.log('function hideFailureText() called')
	ctx.fillStyle = colorBlack;
	ctx.fillRect(0, 40, 1499, 35)
	//preBuildFailureText = ''	
}


function failureTextResetClick() {
	if (x > 0 && x < 60 && y > 0 && y < 25) {
		hideFailureText()
		preBuildFailureText = ''
	}
}


function onclickCanvas(event)  {

	//console.log ('countTracks: ' + countTracks);
	//console.log ('trackNames: ' + trackNames);
	
	// disable all failure texts
	// here is still a problem to be solved!!!!
	//document.getElementById("failure-text").innerHTML = ('');
	
	//	adjust coordinates so that zero point is in the canvas top left	
	x = event.clientX - bb.left + window.pageXOffset;
	y = event.clientY - bb.top + window.pageYOffset;
	// console.log('function "onclickCanvas" activated; x = ' + x + ', y = ' + y); 
	// console.log ("x: " + x + "; y: " +y);

	//	check, if an element is clicked

	// tracks
	for (let tr of trackNames) {
		eval(tr + '.click()');
	}

	// points
	for (let pt of pointNames) {
		eval(pt + '.click()');
	}
	
	failureTextResetClick();
}


function flashGeneric() { //called every 500ms, see directly after this function

	if (blink1)
	{
		blink1 = false;
	}
	else
	{
		blink1 = true;
	}
	
	/*let i = 0;
	while (i < countTrainSignals) {
		if (eval(trainSignalNames[i] + '.flash')) {
			eval(trainSignalNames[i] + '.draw()');
			//console.log (allTrainSignals[i] + ', .flash: ' + eval(allTrainSignals[i] + '.flash'));
		}
		i++;
	}*/
	
	i=0
	while (i < pointNames.length) {
		if (eval(pointNames[i] + '.turning')) {
			eval(pointNames[i] + '.flashOn = !' + pointNames[i] + '.flashOn');
			eval(pointNames[i] + '.draw()');
		}
		i++;
	}
}


let	setFlashInterval = setInterval(flashGeneric,500);
	
 
 function onMouseDownCanvas(event) {
	// console.log('function onMouseDownCanvas(event) activated');
	x = event.clientX - bb.left + window.pageXOffset;
	y = event.clientY - bb.top + window.pageYOffset;
	// console.log('function "onMouseDownCanvas(event)" activated; x = ' + x + ', y = ' + y) 
	mouseIsDown = true
	
	for (let sn of trainSignalNames) {
		eval(sn + '.mouseComesDown()');
	}
	 
	// tracks and points are done with the function 'onclickCanvas(event)' 	 
 }
 

 function onMouseDownMoveCanvas(event) {
	if (mouseIsDown) {
		x = event.clientX - bb.left + window.pageXOffset;
		y = event.clientY - bb.top + window.pageYOffset;
		// console.log('function "onMouseMoveCanvas" activated; x = ' + x + ', y = ' + y) 		
		let i = 0
		
		let mouseAnySignal = ''; // mouse is down and moving over signal or block (rhomb) 
		
		for (let sn of trainSignalNames) {
			if (eval(sn + '.mouseDownOverSignal')) {
				mouseAnySignal = sn; 
				eval(sn + '.mouseDownMoving()');
			}
		}
		for (let bn of blockNames) {
			if (eval(bn + '.mouseDownOverRhomb')) {
				mouseAnySignal = bn;
				eval(bn + '.mouseDownMoving()');
			}
		}
		// console.log ('mouseAnySignal: ' + mouseAnySignal);
		
		if (mouseAnySignal.length === 0) {
			// console.log('mouse is down, moving and not over a signal or block');
			for (let sn of trainSignalNames) {
				eval(sn + '.mouseDownMoving()');
			}
			for (let bn of blockNames) {
				eval(bn + '.mouseDownMoving()');
			}
		}
			
	
		reDraw()		
		ctx.strokeStyle = colorYellow
		ctx.beginPath()
		ctx.moveTo(xStart, yStart)
		ctx.lineTo (x, y)
		ctx.stroke();		
	}	 
 } 


function onMouseUpCanvas(event) {
	// console.log('[function onMouseUpCanvas(event)] potentialStartSignal = ' + potentialStartSignal + ', potentialTarget = ' + potentialTarget);
	if (potentialStartSignal.length > 0 && potentialTarget.length > 0) {
		// console.log ('mouse came up from ' + potentialTarget + ', potential Start Signal is ' + potentialStartSignal);
		eval(potentialTarget + '.mouseComesUp()');
		// potentialTrainRoute.pop();
		// potentialTrainRoute.shift();
		// preBuildTrainRoute(eval(potentialStartSignal + '.dirR'), potentialStartSignal, potentialTarget, potentialTrainRoute.reverse());
	}
	
	mouseIsDown = false;
	potentialStartSignal = '';
	reDraw();

}


function reDraw() {
	ctx.clearRect(0,0,cnv.width,cnv.height)

	ctx.strokeStyle = colorWhite
	drawStatics()

	// blocks
	let i = 0;
	while (i < blockNames.length) {
		eval(blockNames[i] + '.draw()');
		i++;
	}


	//	tracks
	i=0;
	while (i < trackNames.length) {
		eval(trackNames[i] + '.draw()');
		//console.log (trackNames[i] + '.reset()');
		i++;
	}
		
	// points
	for (let myPoint of pointNames) {
		eval(myPoint + '.draw()');
	}
	
	//	train signals
	i=0;
	while (i < trainSignalNames.length) {
		eval(trainSignalNames[i] + '.draw()');
		i++;
	}

	// preBuildFailureText
	showFailureText(preBuildFailureText)	
}


function findRouteBackwards(s, t) { // activated with objects TrainSignal or Block, method mouseDownMoving()
	console.log('function findRouteBackwards (' + s + ' , ' + t + ') activated');
	potentialTrainRoute.length = 0; // empty array
	let actualElement = t;
	let nextElement = '';
	let change = false;
	potentialTrainRoute.push(actualElement);
	
	if (t.slice(0,2) == 'bl') { // target is a block
		console.log('target is a block: ' + t);
		nextElement = eval(t + '.attrTrack.name');
		}
	else {
		// console.log('target is a signal: ' + t);
		nextElement = eval(t + '.fromTrack');
	}
	// console.log('nextElement: ' + nextElement);

	if (eval(s + '.dirR')) { // direction of potential train route: L -> R
		// console.log('potential train route L -> R');
		// potential target may be a signal or a block
		
		let o = 0; // four outer loop: try all possible train routes with different point positions
		let k = 0; // for inner loop: find backwards GfmElement after GfmElement
		while (o < 5) { // 5 is not definitive, still to fix the right number
			k = 0; 
			while (k < 10) { // 10 is not definitive, still to fix the right number
				actualElement = nextElement;
				nextElement = '';
				// check, if actualElement contains start signal
				if (actualElement.slice(0, 2) == 'tr') { // actual element is a track
					if (eval(actualElement).hasOwnProperty('sideLdirR')) { // actualElement has start signal attributed
						if (eval(actualElement + '.sideLdirR.name') == s) {
							// console.log('start signal ' + eval(actualElement + '.sideLdirR.name') + ' found');
							potentialTrainRoute.push(actualElement);
							potentialTrainRoute.push(s);
							return true;
							}
						else {
							console.log('start signal found (' + eval(actualElement + '.sideLdirR.name') + '), but it is not the searched one');
							k = 10;
							break;
						}
					}			
					nextElement = eval(actualElement + '.nextGfmL');
				}
				if (actualElement.slice(0, 1) == 'p') { // actual element is a point
					let m = actualElement.indexOf('@');
					let attr='';
					// console.log('m = ' + m + '; slice(m+1): ' + actualElement.slice(m+1));
					if (actualElement.slice(m+1) == 'R' || actualElement.slice(m+1) == 'L') {
						// console.log('point has tongue side L - point position given');
						nextElement = eval(actualElement.slice(0, m) + '.neighbourFace');
					}
					else if (actualElement.slice(m+1) == 'T') {
						// console.log('point has tongue side R - 2 possibilities for point position');
						// starting with direct positione (no turnout)
						if (eval(actualElement.slice(0, m) + '.turnoutR')) {
							// console.log('point has turnout pos R, so we start with pos L');
							nextElement = eval(actualElement.slice(0, m) + '.neighbourPosL');
							attr = '-L';
						}
						else {
							// console.log('point has turnout pos L, so we start with pos R');
							nextElement = eval(actualElement.slice(0, m) + '.neighbourPosR');
							attr = '-R';
						}
						// actualElement = actualElement.slice(0,m+1);
						actualElement = actualElement.concat(attr);						
					}
					else if (actualElement.slice(m+1) == 'T+R') {
						nextElement = eval(actualElement.slice(0, m) + '.neighbourPosR');
					}
					else if (actualElement.slice(m+1) == 'T+L') {
						nextElement = eval(actualElement.slice(0, m) + '.neighbourPosL');
					}
				}

				// console.log('k = ' + k);
				// console.log('actual element: ' + actualElement + ' is pushed into potentialTrainRoute');
				potentialTrainRoute.push(actualElement);
				// console.log('next element: ' + nextElement);
				// console.log('');

				k++;
			}
			let el = '';
			// console.log('potentialTrainRoute: ' + potentialTrainRoute);
						
			while (el.search('@T') === -1 && potentialTrainRoute.length > 0) {
				// console.log('el.search("@T") = ' + el.search('@T'));
				el = potentialTrainRoute.pop(); 
				// console.log('in while loop: potentialTrainRoute: ' + potentialTrainRoute + '; el = ' + el);				
			}
			if (potentialTrainRoute.length == 0) {
				console.log('will return false');
				reDraw();
				return false;
			}
			// console.log('potentialTrainRoute: ' + potentialTrainRoute + '; el = ' + el);
			el = el.replace('-L', '+R');
			el = el.replace('-R', '+L');
			nextElement = el;
			// console.log('potentialTrainRoute: ' + potentialTrainRoute + '; nextElement = ' + nextElement);
			
			o++;			
		}	
	}
	else { // direction of start signal is R -> L
		
		let o = 0; // four outer loop: try all possible train routes with different point positions
		let k = 0; // for inner loop: find backwards GfmElement after GfmElement
		while (o < 5) { // 5 is not definitive, still to fix the right number
			k = 0; 
			while (k < 10) { // 10 is not definitive, still to fix the right number
				actualElement = nextElement;
				nextElement = '';
				// check, if actualElement contains start signal
				if (actualElement.slice(0, 2) == 'tr') { // actual element is a track
					if (eval(actualElement).hasOwnProperty('sideRdirL')) { // actualElement has start signal attributed
						if (eval(actualElement + '.sideRdirL.name') == s) {
							// console.log('start signal ' + eval(actualElement + '.sideLdirR.name') + ' found');
							potentialTrainRoute.push(actualElement);
							potentialTrainRoute.push(s);
							return true;
							}
						else {
							console.log('start signal found (' + eval(actualElement + '.sideRdirL.name') + '), but it is not the searched one');
							k = 10;
							break;
						}
					}			
					nextElement = eval(actualElement + '.nextGfmR');
				}
				if (actualElement.slice(0, 1) == 'p') { // actual element is a point
					let m = actualElement.indexOf('@');
					let attr='';
					// console.log('m = ' + m + '; slice(m+1): ' + actualElement.slice(m+1));
					if (actualElement.slice(m+1) == 'R' || actualElement.slice(m+1) == 'L') {
						// console.log('point has tongue side L - point position given');
						nextElement = eval(actualElement.slice(0, m) + '.neighbourFace');
					}
					else if (actualElement.slice(m+1) == 'T') {
						// console.log('point has tongue side R - 2 possibilities for point position');
						// starting with direct positione (no turnout)
						if (eval(actualElement.slice(0, m) + '.turnoutR')) {
							// console.log('point has turnout pos R, so we start with pos L');
							nextElement = eval(actualElement.slice(0, m) + '.neighbourPosL');
							attr = '-L';
						}
						else {
							// console.log('point has turnout pos L, so we start with pos R');
							nextElement = eval(actualElement.slice(0, m) + '.neighbourPosR');
							attr = '-R';
						}
						actualElement=actualElement.concat(attr);						
					}
					else if (actualElement.slice(m+1) == 'T+R') {
						nextElement = eval(actualElement.slice(0, m) + '.neighbourPosR');
					}
					else if (actualElement.slice(m+1) == 'T+L') {
						nextElement = eval(actualElement.slice(0, m) + '.neighbourPosL');
					}
				}

				// console.log('k = ' + k);
				// console.log('actual element: ' + actualElement + ' is pushed into potentialTrainRoute');
				potentialTrainRoute.push(actualElement);
				// console.log('next element: ' + nextElement);
				// console.log('');

				k++;
			}
			let el = '';
			// console.log('potentialTrainRoute: ' + potentialTrainRoute);
						
			while (el.search('@T') === -1 && potentialTrainRoute.length > 0) {
				// console.log('el.search("@T") = ' + el.search('@T'));
				el = potentialTrainRoute.pop(); 
				// console.log('in while loop: potentialTrainRoute: ' + potentialTrainRoute + '; el = ' + el);				
			}
			if (potentialTrainRoute.length == 0) {
				console.log('will return false');
				reDraw();
				return false;
			}
			// console.log('potentialTrainRoute: ' + potentialTrainRoute + '; el = ' + el);
			el = el.replace('-L', '+R');
			el = el.replace('-R', '+L');
			nextElement = el;
			// console.log('potentialTrainRoute: ' + potentialTrainRoute + '; nextElement = ' + nextElement);
			
			o++;			
		}		
	}
}


function preBuildTrainRoute(dirR, s, t, el) {
	// this function is activated with object/instance 'TrainSignal' or 'Block', method 'mouseComesUp()'
	console.log('function "preBuildTrainRoute" startet with dirR = ' + dirR + ', start = ' + s + ', target = ' + t + ', elements = ' + el);
	
	// check start signal and target, if they are ready for a train route
	let preBuildTRok = true;
	preBuildTRok = preBuildTRok && (eval(s + '.dirR') === dirR) && eval(s + '.ok') && !eval(s + '.start') 
		&& !eval(s + '.ma');
	// console.log('after check start signal: preBuildTRok = ' + preBuildTRok);
	if (t.slice(0,2) === 'bl') {
		preBuildTRok = preBuildTRok && eval(t + '.ok') && (eval(t + '.posR') === dirR) 
			&& !eval(t + '.preBlocked') && !eval(t + '.blocked');
	}
	else {
		preBuildTRok = preBuildTRok && (eval(t + '.dirR') === dirR) && eval(t + '.ok') && !eval(t + '.start') 
		&& !eval(t + '.end') && !eval(t + '.ma');
	}
	// console.log('after check target: preBuildTRok = ' + preBuildTRok);
	
	
	// check all elements, if they are ready for a train route
	const elCh = el.slice(0, el.length);
	// console.log('el: ' + el); // el is not changed
	// console.log('elCh: ' + elCh); // elCh will be succesively reduced
	while (elCh.length > 0) {
		let actualElement = elCh.shift();
		if (actualElement.startsWith('p')) {
			actualElement = actualElement.slice(0, actualElement.search('@'));
		}	
		// console.log('actualElement: ' + actualElement);
		preBuildTRok = preBuildTRok && eval('!' + actualElement + '.flProtBan') 
			&& eval(actualElement + '.ok') && eval(actualElement + '.free') && eval('!' + actualElement + '.zfR')
			&& eval('!' + actualElement + '.zfL');
	}
	// console.log('after check array "el": preBuildTRok = ' + preBuildTRok);


	// find overlap element
	let lastElement = el[el.length - 1];
	let olElement = '';
	// console.log('el: ' + el);
	// console.log('last Element: ' + lastElement);
	if (!eval(lastElement + '.sectionTrack')) {	
		// last element is a station track
		if (dirR) {
			olElement = eval(lastElement + '.nextGfmR');
			// eval(olElement + '.olR = true');
		}
		else {
			olElement = eval(lastElement + '.nextGfmL');
			// eval(olElement + '.olL = true');
		}
		// eval(olElement + '.draw()');
		preBuildTRok = preBuildTRok && eval(olElement + '.ok') && 
		eval(olElement + '.free') && !eval(olElement + '.zfR') && !eval(olElement + '.zfL');
	}
	// console.log('after check olElement: preBuildTRok = ' + preBuildTRok);	
	
	// find flanc protection
	// generate an array with all points in the train route, 'elP'
	let actualFlancProt = [];
	let actualFlancProtRed=[];
	let newFlancProt = [];
	let elP = el.filter(checkP);
	function checkP(x) {
		return x.startsWith('p');
	}
	// console.log('el: ' + el);
	// console.log('elP: ' + elP);

	// go through all points with 'elP' and search each for flanc protection
	let k=0;
	while (k < 10) {
		// console.log('at start of while loop with k = ' + k);

		let actualPoint = elP.shift();
		// console.log('actual point: ' + actualPoint);
		let actualPointRed = actualPoint.slice(0, actualPoint.search('@'));
		// console.log('actualPointRed = ' + actualPointRed);
		
		// search the flanc protection neighbour of the actual point
		let actualPointFlancPos = '';
		if (actualPoint.search('L') > 0) {
			actualPointFlancPos = 'R';
			actualFlancProt[k] = eval(actualPointRed + '.neighbourPosR');
		}
		else if (actualPoint.search('R') > 0) {
			actualPointFlancPos = 'L';
			actualFlancProt[k] = eval(actualPointRed + '.neighbourPosL');
		}
		console.log('actualFlancProt[' + k + ']: ' + actualFlancProt[k]);

		// to do!!! if flanc prot element is a trap point (Zwieschutz) this has to be detected and done
		// detect, if actualFlancProt[] is the same point as another actualFlancProt[]
		let i = 0;
		while (i < k) {
			console.log ('actualFlancProt[k] sliced: ' + actualFlancProt[k].slice(0,actualFlancProt[k].search("@")));
			console.log ('actualFlancProt[i] sliced: ' + actualFlancProt[i].slice(0,actualFlancProt[i].search("@")));
			i++;
		}
		// to be continued!!!

		// decide, if flanc protection type ban (verbotsbewirkt) or type pos (spurbewirkt)
		let flancProtType = '';
		if (actualFlancProt[k].startsWith('p')) {
			// flanc protection element of actual point is a point
			actualFlancProtRed[k] = actualFlancProt[k].slice(0, actualFlancProt[k].search('@'));
			let posFlP = actualFlancProt[k].slice(actualFlancProt[k].search('@')+1, actualFlancProt[k].search('@')+2);
			// actualPointRed.myFlProtPos = actualFlancProtRed[k]; // too early -> only a building TR
			console.log('flanc prot side of actualFlancProt: ' + posFlP);
			if(posFlP == 'T') {
				flancProtType = 'ban';
				newFlancProt[k] = actualFlancProt[k].concat('@T');
				newFlancProt[k] = newFlancProt[k].concat('#' + actualPointRed);
				console.log('newFlancProt[' + k + ']: ' + newFlancProt[k]);
				preBuildTRok = preBuildTRok && eval(actualFlancProtRed[k] + '.ok') && eval(actualFlancProtRed[k] + '.free') 
					&& !eval(actualFlancProtRed[k] + '.zfR') && !eval(actualFlancProtRed[k] + '.zfL'); 
			}
			else if (posFlP == 'R') {
				flancProtType = 'pos';
				newFlancProt[k] = actualFlancProtRed[k].concat('@L'); // flanc prot point has opposite position of the position
				// neighbouring the point to protect
				newFlancProt[k] = newFlancProt[k].concat('#' + actualPointRed);
				
				let xxx = eval(actualFlancProtRed[k] + '.posR'); // actual position of actual flanc protection point
				let yyy = eval(actualFlancProtRed[k] + '.locked'); // actual flanc protection point is already locked (for another train route)
				let alsoTR = yyy && (xxx === false);
				preBuildTRok = preBuildTRok && 
					eval(actualFlancProtRed[k] + '.ok') && (eval(actualFlancProtRed[k] + '.free') && 
					eval('!' + actualFlancProtRed[k] + '.zfR') && eval('!' + actualFlancProtRed[k] + '.zfL') || alsoTR); 
			 }
			else if (posFlP == 'L') {
				flancProtType = 'pos';
				newFlancProt[k] = actualFlancProtRed[k].concat('@R'); // see above			
				newFlancProt[k] = newFlancProt[k].concat('#' + actualPointRed);
				let xxx = eval(actualFlancProtRed[k] + '.posR'); // actual position of actual flanc protection point
				let yyy = eval(actualFlancProtRed[k] + '.locked'); // actual flanc protection point is already locked (for another train route)
				let alsoTR = yyy && (xxx === true);
				preBuildTRok = preBuildTRok && 
					eval(actualFlancProtRed[k] + '.ok') && (eval(actualFlancProtRed[k] + '.free') && 
					eval('!' + actualFlancProtRed[k] + '.zfR') && eval('!' + actualFlancProtRed[k] + '.zfL') || alsoTR); 
			}
		}
		else if (actualFlancProt[k].startsWith('tr')) {
			// flanc protection element of actual point is a track
			actualFlancProtRed[k] = actualFlancProt[k];
			newFlancProt[k] = actualFlancProt[k] + '@' + actualPointRed;
			flancProtType = 'ban';
			preBuildTRok = preBuildTRok && eval(actualFlancProtRed[k] + '.ok') && eval(actualFlancProtRed[k] + '.free') 
				&& !eval(actualFlancProtRed[k] + '.zfR') && !eval(actualFlancProtRed[k] + '.zfL'); 			
		}		
		else {
			console.log('failure! flanc protection element of point ' + actualPoint + ' is neither a track nor a point');
			preBuildTRok = false;
		}
		
		// console.log('after check flanc protection number ' + k + ': preBuildTRok = ' + preBuildTRok);


		k++;
		
		if (elP.length == 0) {
			actualFlancProt.pop();
			k=10;
		}

		// console.log('at end of while loop with k = ' + k);

	}

	// console.log('after check flanc protection elements: preBuildTRok = ' + preBuildTRok);
	
// console.log('just out of while loop');

	// console.log('newFlancProt[' + k + '] = ' + newFlancProt[k]);

		/*
		if (actualFlancProt[k].startsWith('tr') || actualFlancProt[k].endsWith('@T')) { // flanc protection method 'ban' (verbotsbewirkter Flankenschutz)
			// to do later: topology with a point as flProtBan (acutally no realised)
			// eval(actualFlancProtRed[k] + '.flProtBan = true');
			// eval(actualFlancProtRed + '.draw()');
		}
		else { // flanc protection type 'pos' (spurbewirkt)
			if (actualFlancProt[k].endsWith('@R')) {
				eval(actualFlancProtRed[k] + '.flProtPosL = true');
			}
			else {
				eval(actualFlancProtRed[k] + '.flProtPosR = true');
			}
		// eval(actualFlancProtRed + '.draw()');
		}
		
		let xxx = eval(actualFlancProtRed[k] + '.posR'); // actual position of acutal flanc protection point
		let yyy = eval(actualFlancProtRed[k] + '.locked'); // actual flanc protection point is already locked (for another train route)
		console.log('actual flanc prot point, actual posR (xxx): ' + xxx);
		console.log('yyy: ' + yyy);
		console.log('newPosR[' + k + ']:' + newPosR);
		let alsoTR = yyy && (xxx === newPosR[k]);
		console.log('alsoTR: ' + alsoTR);
		preBuildTRok = preBuildTRok && 
		eval(actualFlancProtRed[k] + '.ok') && (eval(actualFlancProtRed[k] + '.free') && 
		eval('!' + actualFlancProtRed[k] + '.zfR') && eval('!' + actualFlancProtRed[k] + '.zfL') || alsoTR); 
		console.log('after check flanc protection number ' + k + ': preBuildTRok = ' + preBuildTRok);
		// console.log('newFlancProt: ' + newFlancProt);*/
		
	// normalize point elements in 'el': replace '@T-R' resp '@T-L' by '@R' resp '@L'
		let el1 = [];
		for (let elem of el) {
			// console.log('before: elem = ' + elem);
			let pos = elem.search('@T');
			if (pos > 0) {
				let rl = elem.slice(pos+3);
				elem = elem.slice(0, pos+1);
				elem = elem.concat(rl);
			}
			// console.log('after: elem = ' + elem);
			el1.push(elem);
		}
		// console.log('el: ' + el);
		// console.log('el1: ' + el1);		
	
	if (preBuildTRok) {
		// mark the elements of the train route yellow ('this.preBuildTR')
		for (let elem of el) {
			if (elem.startsWith('p')) {
				let psAff = elem.search('@');
				elem = elem.slice(0, psAff);
			}
			eval(elem + '.preBuildTR = true');
			// console.log(elem + ' has preBuildTR set');
		}
		
		preBuildedStartSignal = s;
		preBuildedTarget = t;
		preBuildedTrainRoute = el1.slice(0, el1.length);
		preBuildedOlElement = olElement;
		preBuildedFlancProt = newFlancProt.slice(0, newFlancProt.length);
		setPointsForTrainRoute();
		}
	else {
		preBuildedStartSignal = '';
		preBuildedTarget = '';
		preBuildedTrainRoute.length = 0;
		preBuildedOlElement = '';
		preBuildedFlancProt.length = 0;
	}
}


function setPointsForTrainRoute() {
	// called by function 'preBuildTrainRoute(dirR, s, t, el)', if 'preBuildTRok' == true
	console.log('function \'setPointsForTrainRoute()\' started');
	/*console.log('preBuildTRok: ' + preBuildTRok);
	console.log('preBuildedStartSignal: ' + preBuildedStartSignal);
	console.log('preBuildedTarget: ' + preBuildedTarget);
	console.log('preBuildedTrainRoute: ' + preBuildedTrainRoute);
	console.log('preBuildedOlElement: ' + preBuildedOlElement);
	console.log('preBuildedFlancProt: ' + preBuildedFlancProt);*/
	
	preBuildTRok = false;
	setPointsOk = true;
	
	pointsToSet = preBuildedTrainRoute.filter(checkP);
	pointsToSet = pointsToSet.concat(preBuildedFlancProt.filter(checkP));
	
	// attention! case with a point as flanc protection element type 'ban' not realised (
	
	function checkP(x) {
		return x.startsWith('p');
	}
	// console.log('pointsToSet: ' + pointsToSet);

	for (let po of pointsToSet) {
		let pos = po.search('@');
		let rlt = po.slice(pos + 1, pos + 2);
		po = po.slice(0, pos);
		if (rlt == 'T') {
			console.log('problem: point ' + po + ' is flanc protection element, type \'ban\', this is not yet realised!');
			preBuildTRok = false;
			return;
		}
		if (eval(po + '.posR') && (rlt == 'L')) {eval(po + '.turning = true');}
		if (!eval(po + '.posR') && (rlt == 'R')) {eval(po + '.turning = true');}
		if (rlt == 'R') {eval(po + '.posR = true');}
		if (rlt == 'L') {eval(po + '.posR = false');}
	}
	
	const pbFP = preBuildedFlancProt.slice(0, preBuildedFlancProt.length);
	// console.log('pbFP: ' + pbFP);

	if (setPointsOk) {myVar = setTimeout(startBuildingTR, tChangeSwitch);}
	// setTimeout(function(){ buildTrainRoute(preBuildedStartSignal, preBuildedTarget, preBuildedTrainRoute, preBuildedOlElement, preBuildedFlancProt); }, tChangeSwitch);

}


function startBuildingTR() {
	// called by function 'setPointsForTrainRoute()' after delay of 'tChangeSwitch'
	console.log('function \'startBuildingTR()\' started');
	clearTimeout(myVar);
	myVar = 0;
	buildTrainRoute(preBuildedStartSignal, preBuildedTarget, preBuildedTrainRoute, preBuildedOlElement, preBuildedFlancProt, pointsToSet);

}


function buildTrainRoute(s, t, el, ol, flP, pts) {
	// called by function 'startBuildingTR()'
	console.log('function \'buildTrainRoute(s, t, el, ol, flP, pts)\' started');
	let dirR = eval(s + '.dirR');
	/*console.log('s: ' + s);
	console.log('t: ' + t);
	console.log('el: ' + el);
	console.log('ol: ' + ol);
	console.log('flP: ' + flP);
	console.log('pts: ' + pts);*/
	
	setPointsOk = false;
	buildTRok = true;
	// to do: recheck everything like in function' preBuildTrainRoute()'
	
	// normalize array 'ele' (point names without position), new array 'ele1'
	let el1 =  [];
	for (let ele of el) {
		if (ele.startsWith('p')) {
			let pos = ele.indexOf('@');
			ele = ele.slice(0,pos);
		}
		el1.push(ele);
	}
	
	// if target is a block (exit route), the last element (section track) is not to make yellow
	if (eval(el1[el1.length - 1] + '.sectionTrack')) {
		let mySectionTrack = el1.pop(); // section tracks have block logic, not route logic
		eval(mySectionTrack + '.preBuildTR = false');
	}
	
	// finish points flashing
	for (let po of pts) {
		let pos = po.search('@');
		po = po.slice(0, pos);
		eval(po + '.turning = false');
		eval(po + '.locked = true');
	}
	
	// set start signal
	eval(s + '.start = true' );
	
	// set end signal or block
	if (t.slice(0,2) == 'bl') {
		eval(t + '.dirR = ' + dirR);
		eval(t + '.preBlocked = true'); // ref bl-pB
	}
	else {
		eval(t + '.end = true');
	}
	
	// set el Elements
	for (let ele of el1) {
		if (dirR) {
			eval(ele + '.zfR = true');
		}
		else {
			eval(ele + '.zfL = true');			
		}
		eval(ele + '.preBuildTR = false');
	}
		
	// set flanc protection elements
	console.log('we are here: begin set flanc protection elements');
	for (let f of flP) {
		if (f.startsWith('p')) { // points only can offer flProtPos, not flProtBan
			// let ppos = f.charAt(f.length - 1);
			let ppos = f.slice(f.search('@')+1, f.search('@')+2);
			let flProtFor = f.slice(f.search('#')+1);
			// console.log('f: ' + f + '; ppos: ' + ppos + '; flProtFor: ' + flProtFor);
			f = f.slice(0, f.search('@'));
			if (ppos == 'R') {
				eval(f + '.posR = true');
				eval(f + '.flProtPosR = true');
				eval(f + '.locked = true');
			}
			else if (ppos == 'L') {
				eval(f + '.posR = false');
				eval(f + '.flProtPosL = true');			
				eval(f + '.locked = true');
			}
			else {
				// console.log('flanc protection element ' + f + ' is type \'ban\', not yet realised');
				buildTRok = false;
			}	
			eval(f + '.flProtPosFor = ' + flProtFor);	
			eval(flProtFor + '.myFlProtPos = ' + f);	
		}
		else if (f.startsWith('tr')) { // track only can offer flProtBan (obviously not flProtPos)
			let fRed = f.slice(0, f.search('@'));
			eval(fRed + '.flProtBan = true');
			eval(fRed + '.flProtBanStartSig = ' + s);

			// find protected point and set there the property 'myFlProtBanTrack' (this track, f)
			let protectedPoint = f.slice(f.search('@')+1, f.length);
			// console.log('fRed: ' + fRed + '; protectedPoint: ' + protectedPoint);
			eval(protectedPoint + '.myFlProtBanTrack = ' + fRed);
		}
		else {
			console.log('failure: flanc protection element ' + f + ' is neither a point nor a track');
			buildTRok = false;			
		}
	}
	
	// set overlap element
	console.log('we are here: begin set overlap element');
	if (ol.length > 0) {
		if (dirR) {
			eval(ol + '.olR = true');
			eval(ol + '.olRStartSig = ' + s);
			let myTrackBefore = eval(ol + '.nextGfmL');
			eval(myTrackBefore + '.myOlTrack = '+ ol);
		}
		else {
			eval(ol + '.olL = true');		
			eval(ol + '.olLStartSig = ' + s);
			let myTrackBefore = eval(ol + '.nextGfmR');
			eval(myTrackBefore + '.myOlTrack = '+ ol);
		}
	}	
	
	// set startSignal, movement authority (ma) = true
	eval(s + '.ma = true');

	// reset potential rest train route in other direction (Wenden)
	let startTrack = eval(s + '.fromTrack');
	if (!eval(startTrack + '.sectionTrack')) {
		/*console.log('startTrack: ' + startTrack + ', it is a station track');
		console.log('s[dirR]: ' + s[dirR]);
		console.log('s.dirR: ' + s.dirR);
		console.log("eval(s + '.dirR'): " + eval(s + ".dirR"));*/
		if (eval(s + '.dirR')) { 
			eval(startTrack + '.zfL = false'); 
			// console.log('startTrack, zfL set to false');
		}
		else { 
			eval(startTrack + '.zfR = false'); 
			// console.log('startTrack, zfR set to false');
		}
			
		if (eval(s + '.dirR') && eval(startTrack + '.sideLdirL !== undefined')) {
			// console.log('startTrack has a train signal in the opposite direction on his other side');
			let conterSignal = eval(startTrack + '.sideLdirL');
			// console.log('conterSignal: ' + conterSignal.name);
			conterSignal.end = false;
			conterSignal.draw();
		}
		else if (!eval(s + '.dirR') && eval(startTrack + '.sideRdirR !== undefined')) {
			// console.log('startTrack has a train signal in the opposite direction on his other side');
			let conterSignal = eval(startTrack + '.sideRdirR');
			// console.log('conterSignal: ' + conterSignal.name);
			conterSignal.end = false;
			conterSignal.draw();
		}
	}
	reDraw(); 
	
	preBuildedStartSignal.length = 0;
	preBuildedTarget.length = 0;
	preBuildedTrainRoute.length = 0;
	preBuildedOlElement.length = 0;
	preBuildedFlancProt.length = 0;
	pointsToSet.length = 0;
	buildTRok = false;
}