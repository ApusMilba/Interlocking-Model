
class Block {
	constructor(a, b, c, d, f) {
		// static properties
		this.name = a; // same name as name of the instance resp object
		this.title = b; // short name of neighbour station
		this.posR = c; // true, if block is on right side of the station; false else
		this.attrTrack = d; // track name of attributed track (section track)
		this.standardDirR = f; // direction of block at reload and after reset()
		blockNames.push(this.name); // array with all block names

		if (c) {
			this.coox = this.attrTrack.cooRx + lengthRhomb/2;
			this.cooy = this.attrTrack.cooRy;
		}
		else {
			this.coox = this.attrTrack.cooLx - lengthRhomb/2;
			this.cooy = this.attrTrack.cooLy;
		}
		this.coo = [this.coox, this.cooy];
 	}

	reset() { // set static state (ok = FALSE)		
		// activated with functions 'onNewLoad()' and 'initialize()'
		// dynamic properties
		this.ok = false; // active and not faulty
		this.targetSignalCandidate = false // 
		this.mouseDownOverRhomb = false; // (as name says)
		this.dirR = this.standardDirR; // actual direction of block		
		this.preBlocked = false; // (as name says) 
		this.blocked = false; // (as name says)
	}
	
	draw() { // (re)draw element
		ctx.font = titleFont;
		ctx.fillStyle = colorWhite;
		
		if (this.posR)
		{
			ctx.textAlign = "end";
		}
		else
		{
			ctx.textAlign = "start";
		}
		
		if (!this.ok)
		{
			ctx.fillStyle = colorMagenta;
		}
		
		ctx.fillText(this.title, this.coo[0] - 12 + this.posR * 24, this.coo[1]-4*deltaText);
		ctx.stroke();
		ctx.textAlign = "center";

		
		// draw rhomb itself
		ctx.strokeStyle = colorWhite
		if (!this.ok) { // passiviert
			ctx.strokeStyle = colorMagenta
		}
		else if (this.targetSignalCandidate) {
			ctx.strokeStyle = colorYellow;
			// ctx.fillStyle = colorYellow; // does not work
		}
		xx = this.coo[0]
		yy = this.coo[1]
		ctx.beginPath()
		ctx.moveTo(xx - 6, yy)
		ctx.lineTo(xx, yy + 10)
		ctx.lineTo(xx + 6, yy)
		ctx.lineTo(xx, yy - 10)
		ctx.lineTo(xx - 6, yy)
		ctx.stroke()
		let styleArrowRw = ''
		let styleArrowRr = ''
		let styleArrowLw = ''
		let styleArrowLr = ''

		if (!this.ok)
		{
			styleArrowRw = colorMagenta;
			styleArrowRr = colorMagenta;
			styleArrowLw = colorMagenta;
			styleArrowLr = colorMagenta;
		}	
		else if (this.dirR)
		{
			styleArrowLw = colorBlack;
			styleArrowLr = colorBlack;
			if (!this.preBlocked && !this.blocked)
			{
				styleArrowRw = colorWhite;
				styleArrowRr = colorBlack;
			}
			else if (this.preBlocked)
			{
				styleArrowRw = colorWhite;
				styleArrowRr = colorRed;
			}
			else
			{
				// blocked
				styleArrowRw = colorBlack;
				styleArrowRr = colorRed;
			}
		}
		else
		{
			// direction L
			styleArrowRw = colorBlack;
			styleArrowRr = colorBlack;
			if (!this.preBlocked && !this.blocked)
			{
				styleArrowLw = colorWhite;
				styleArrowLr = colorBlack;
			}
			else if (this.preBlocked)
			{
				styleArrowLw = colorWhite;
				styleArrowLr = colorRed;
			}
			else
			{
				// blocked
				styleArrowLw = colorBlack;
				styleArrowLr = colorRed;
			}
		}
		let startX, startY
		eval('startX = ' + this.name + '.coo[0] + 20')
		if (eval(this.name + '.posR')) {
			startX = startX - 70
		}
		//console.log ('startX = ' + startX)
		eval('startY = ' + this.name + '.coo[1]')
		//console.log ('startY = ' + startY)
		
		
		//drawing arrowRr (R = right, r = red)
		ctx.strokeStyle = styleArrowRr;
		//ctx.strokeStyle = colorRed
		ctx.beginPath();
		ctx.moveTo (startX, startY - deltaBlock);
		ctx.lineTo (startX + lengthBlockArrow, startY - deltaBlock);
		ctx.lineTo (startX + 0.4*lengthBlockArrow, startY - deltaBlock - 0.6*lengthBlockArrow);
		ctx.moveTo (startX + lengthBlockArrow, startY - deltaBlock);
		ctx.lineTo (startX + 0.4*lengthBlockArrow, startY - deltaBlock + 0.6*lengthBlockArrow);	
		ctx.stroke();

		//drawing arrowRw (R = right, w = white)
		ctx.strokeStyle = styleArrowRw;
		//ctx.strokeStyle = colorWhite
		ctx.beginPath();
		startX = startX + lengthBlockArrow + 10;
		ctx.moveTo (startX, startY - deltaBlock);
		ctx.lineTo (startX + lengthBlockArrow, startY - deltaBlock);
		ctx.lineTo (startX + 0.4*lengthBlockArrow, startY - deltaBlock - 0.6*lengthBlockArrow);
		ctx.moveTo (startX + lengthBlockArrow, startY - deltaBlock);
		ctx.lineTo (startX + 0.4*lengthBlockArrow, startY - deltaBlock + 0.6*lengthBlockArrow);	
		ctx.stroke();

		//drawing arrowLr (L = left, w = white)
		ctx.strokeStyle = styleArrowLw;
		//ctx.strokeStyle = colorWhite
		ctx.beginPath();
		ctx.moveTo (startX, startY + deltaBlock);
		ctx.lineTo (startX - lengthBlockArrow, startY + deltaBlock);
		ctx.lineTo (startX - 0.4*lengthBlockArrow, startY + deltaBlock - 0.6*lengthBlockArrow);
		ctx.moveTo (startX - lengthBlockArrow, startY + deltaBlock);
		ctx.lineTo (startX - 0.4*lengthBlockArrow, startY + deltaBlock + 0.6*lengthBlockArrow);	
		//console.log('end of drawing ' + this.name + ', arrow Lw; ctx.strokeStyle = ' + ctx.strokeStyle)
		//console.log ("startX was: " + startX + ", startY was: " + startY);
		ctx.stroke();

		//drawing arrowLw (L = left, r = red)
		ctx.strokeStyle = styleArrowLr;
		//ctx.strokeStyle = colorRed
		ctx.beginPath();
		startX = startX + lengthBlockArrow + 10;
		ctx.moveTo (startX, startY + deltaBlock);
		ctx.lineTo (startX - lengthBlockArrow, startY + deltaBlock);
		ctx.lineTo (startX - 0.4*lengthBlockArrow, startY + deltaBlock - 0.6*lengthBlockArrow);
		ctx.stroke();
		ctx.moveTo (startX - lengthBlockArrow, startY + deltaBlock);
		ctx.lineTo (startX - 0.4*lengthBlockArrow, startY + deltaBlock + 0.6*lengthBlockArrow);	
		ctx.stroke();
		//console.log('end of drawing ' + this.name + ', arrow Lr; ctx.strokeStyle = ' + ctx.strokeStyle)
		//console.log ("startX was: " + startX + ", startY was: " + startY);
	}
	
	mouseDownMoving() {
		// this.mouseDownOverRhomb = false
		//this.draw()		
		//xx = x - this.coo[0] + 6 - this.posR * 12; 
		
		xx = x - this.coo[0]
		yy = y - this.coo[1]
		geometric = (xx<6 && xx>-6 && yy<10 && yy>-10);
		
		if (geometric && (eval(potentialStartSignal + '.dirR') === this.posR)) {			
			if (potentialStartSignal.length > 0 && this.ok && !this.preBlocked && !this.blocked && !this.mouseDownOverRhomb) {
				// console.log('block ' + this.name + ', could be a possible target of the actual start signal ' + potentialStartSignal);
				this.mouseDownOverRhomb = true;

				// find backwards a route to the start signal
				potentialTarget = this.name;
				this.targetSignalCandidate = findRouteBackwards (potentialStartSignal, potentialTarget);
				 if (this.targetSignalCandidate) {
				 	// console.log('[class Block, method mouseDownMoving()] potential train route found: ' + potentialTrainRoute);
				 }
				this.draw();			
			}			
		}
		else {
			this.mouseDownOverRhomb = false;
			this.targetSignalCandidate = false;
			this.draw();
		}
	}

	mouseComesUp() {
		console.log('method mouseComesUp() in class Block started with block ' + this.name)
		if (this.targetSignalCandidate) {
			potentialTrainRoute.pop();
			potentialTrainRoute.shift();
			preBuildTrainRoute(eval(potentialStartSignal + '.dirR'), potentialStartSignal, potentialTarget, potentialTrainRoute.reverse());
			this.targetSignalCandidate = false;
			potentialStartSignal = '';
			potentialTarget = '';
			// evtl. potentialTrainRoute = '';
			// console.log('prebuild train route from ' + potentialStartSignal + ' to ' + potentialTarget);
		}
		else {
			console.log('no train route prebuilding');
		}

		potentialStartSignal = '';
		potentialTarget = '';
		this.mouseDownOverRhomb = false
		// reDraw();
	}
}


class Track {
	constructor(na, cLx, cLy, cRx, cRy, delL, delR, nGr, sT) { // static properties
		this.name = na; // same name as name of the instance resp. object
		this.label = ''; // element label on the screen
		this.cooLx = cLx; 
		this.cooLy = cLy;
		this.cooL = [cLx, cLy]; // coordinates of left end
		this.cooRx = cRx;
		this.cooRy = cRy;
		this.cooR = [cRx, cRy]; // coordinates of right end
		this.cooDeltaL = delL; // supplementary line at left end of track
		this.cooDeltaR = delR; // supplementary line at right end of track
		this.nextGfmR = nGr; // next element right with track free detection (GFM = Gleisfreimeldung)
		this.nextGfmL = ''; // dito left
		this.sectionTrack = sT; // section track (Streckengleis) if TRUE, else station track (Bahnhofgleis)
		trackNames.push(this.name); // array with all track names
 	}

	reset() { //  ... dynamic properties
		// activated with new load of page
		this.ok = false; // active and not faulty
		this.free = true; // not occupied
		this.zfL = false; // train route in left direction set
		this.olL = false; // overlap track for a train route in left direction
		this.olLStartSig = ''; // start signal of the train route having this track as overlap
		this.zfR = false; // train route in right direction set
		this.olR = false; // overlap track for a train route in right direction
		this.olRStartSig = ''; // start signal of the train route having this track as overlap
		this.myOlTrack = ''; // last track before this track being overlap track
		this.flProtBan = false; // this track is flanc protection type ban (verbotsbewirkt)
		this.flProtBanStartSig = ''; // start signal of train route setting this track as flProtBan
		this.preBuildTR = false; // prereservation for a train route
		this.mouseCameDownHere = false; // (as name says)	
	}

	draw() {
		ctx.font = trackFont;
		if (!this.ok) // element inactive
		{
			ctx.strokeStyle = colorMagenta;
			ctx.fillStyle = colorMagenta;
		}
		else if (!this.free) // element occupied
		{
			//console.log('track ' + this.name + ' is occupied')
			ctx.strokeStyle = colorRed;
			ctx.fillStyle = colorWhite;
			// ctx.lineWidth = trackWidthRed;	
		}
		else if (this.zfR || this.zfL) // element covered with Zf (train route)
		{
			ctx.strokeStyle = colorGreen;
			ctx.fillStyle = colorWhite;
		}
		else if (this.olR || this.olL) // element covered with overlap of a train route
		{
			ctx.strokeStyle = colorLightGreen;
			ctx.fillStyle = colorWhite;
		}
		else if (this.flProtBan) // element covered with flanc protection
		{
			ctx.strokeStyle = colorLightGreen;
			ctx.fillStyle = colorWhite;
		}
		else if (this.preBuildTR) // element is part of a train route prebuilding
		{
			ctx.strokeStyle = colorYellow;
			ctx.fillStyle = colorWhite;
		}
		else // element free
		{
			ctx.strokeStyle = colorWhite;
			ctx.fillStyle = colorWhite;
		}	
		//console.log ("method 'draw' in class 'Track' running for track " + this.name);
		ctx.beginPath();
		ctx.moveTo(this.cooL[0] + this.cooDeltaL[0], this.cooL[1] + this.cooDeltaL[1]); 
		ctx.lineTo(this.cooL[0], this.cooL[1]); 
		ctx.lineTo(this.cooR[0], this.cooR[1]);
		ctx.lineTo(this.cooR[0] + this.cooDeltaR[0], this.cooR[1] + this.cooDeltaR[1]);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.fillText(this.label, this.cooL[0]+0.5*(this.cooR[0]-this.cooL[0]), this.cooL[1]-deltaText); 
		ctx.fill();

		ctx.fillStyle=colorBlack;
		if (this.free === false && (this.zfR === true || this.zfL === true))
			{	// draw blue dot
				ctx.fillStyle = colorDarkBlue;
			}		
		ctx.strokeStyle = colorBlack;
		ctx.beginPath();
		ctx.arc(this.cooL[0]+0.8*(this.cooR[0]-this.cooL[0]),this.cooR[1]-10,radiusDotBlue,0,2*Math.PI);
		ctx.fill();
	}	

	click() {
		// console.log('method "click()" in object ' + this.name + ' just started');
		if (this.ok && x >= this.cooLx && x <= this.cooRx && y >= this.cooLy-trackWidth/2-dy && y <= this.cooRy+trackWidth/2+dy) {
			console.log('track ' + this.name + ' just was clicked');
			hideFailureText();
			if (this.free) {
				this.trackGotOccupied();
			}
			else {
				this.trackGotFree();
			}
		}	
	}
	

	trackIsFirstElAfterTrainSig(x) { // x is direction of train route (true if R, false if L)
		if (x && this.hasOwnProperty('sideLdirR') || !x && this.hasOwnProperty('sideRdirL')) { // train route direction R
			return true;
		}	
		else {
			return false;
		}	
	}
	
	trackGotOccupied() {
		// called by method click() in class Track

		// flow a1
		this.free = false;
		this.checkOccupationWithoutRoute();
		
		// section track
		if (this.sectionTrack) {
			let myBlock = '';
			myBlock = this.attrBlock.name;
			console.log('the attributed block to sectionTrack ' + this.name + ' is ' + myBlock);

			// difference position R or L
			if (this.attrBlock.posR) {
				// flow a11
				eval(myBlock + '.dirR = false');
				if (eval(this.nextGfmL + '.zfR')) {
					// flow a21
					eval(myBlock + '.dirR = true');
				} 	
			}
			if (!this.attrBlock.posR) {
				// flow a11
				eval(myBlock + '.dirR = true');
				if (eval(this.nextGfmR + '.zfL')) {
					// flow a21
					eval(myBlock + '.dirR = false');
				} 
			}

			eval(myBlock + '.preBlocked = false');
			// flow a31
			eval(myBlock + '.blocked = true'); 
			eval(myBlock + '.draw()');				
		}
		else { // station track
			// check, if ol track got occupied
			if (this.olR) {
				this.olRStartSig.ma = false;
				this.olRStartSig.start = false;
				this.olRStartSig.draw();
				showFailureText('Alarm! Overlap track ' + this.name + ' occupied! Startsignal ' + this.olRStartSig.name + ' set to stop.');

				this.olR = false;
				this.olRStartSig = '';
			}

			if (this.olL) {
				this.olLStartSig.ma = false;
				this.olLStartSig.start = false;
				this.olLStartSig.draw();
				showFailureText('Alarm! Overlap track ' + this.name + ' occupied! Startsignal ' + this.olLStartSig.name + ' set to stop.');

				this.olL = false;
				this.olLStartSig = '';
			}

			// reset all ol sets
			if (this.myOlTrack !== '') {
				this.myOlTrack.olL = false;
				this.myOlTrack.olR = false;
				this.myOlTrack.olLStartSig = '';
				this.myOlTrack.olRStartSig = '';
				this.myOlTrack.draw();
			}

			// check, if flProtBan track
			if (this.flProtBanStartSig !== '') {
				this.flProtBanStartSig.ma = false;
				this.flProtBanStartSig.start = false;
				this.flProtBanStartSig.draw();
				showFailureText('Alarm! Track ' + this.name + ' has flanc protection and get occupied! Startsignal ' + this.flProtBanStartSig.name + ' set to stop.');

				this.flProtBanStartSig = '';
				this.flProtBan = false;
			}
		}
	this.draw();
	}

	trackGotFree() {
		// called by method 'Track.click()'
		console.log('method trackGotFree() activated from ' + this.name);

		// if neighbour is point, normalize its name
		let nextGfmLslice = this.nextGfmL;
		if (this.nextGfmL.slice(0,1) === 'p') {
			nextGfmLslice = this.nextGfmL.slice(0,this.nextGfmL.search('@'));
		}
		let nextGfmRslice = this.nextGfmR;
		if (this.nextGfmR.slice(0,1) === 'p') {
			nextGfmRslice = this.nextGfmR.slice(0,this.nextGfmR.search('@'));
		}
		console.log('nextGfmRslice: ' + nextGfmRslice);

		
		// flow b1
		this.free = true;		
		this.checkFlyingTrain();
		
		
		// section track
		if (this.sectionTrack) {
			let myBlock = '';
			myBlock = this.attrBlock.name;
			if (eval(myBlock + '.posR') && eval(myBlock + '.dirR') || !eval(myBlock + '.posR') && !eval(myBlock + '.dirR')) {
				// dir exit (Ausfahrt)
				console.log(myBlock + ' has direction exit (from station, Ausfahrt)');
				let myNextGfm = '';
				if(eval(myBlock + '.posR')) {myNextGfm = this.nextGfmL;}
				if(!eval(myBlock + '.posR')) {myNextGfm = this.nextGfmR;}
				if (eval(myNextGfm + '.zfR') || eval(myNextGfm + '.zfL')) {
					// flow b32
					console.log('flow b32, showFailureText()');
					showFailureText('Attention: section track (Streckengleis) ' + this.name + ' got free, block direction exit (Ausfahrt), but neighbour track has a train route set: block not released!');
				}
				else {
					// flow b31
					eval(myBlock + '.preBlocked = false');
					eval(myBlock + '.blocked = false');
				}
			}
			if (eval(myBlock + '.posR') && !eval(myBlock + '.dirR') || !eval(myBlock + '.posR') && eval(myBlock + '.dirR')) {
				// dir entry (Einfahrt)
				if ((eval(myBlock + '.posR') && eval(this.nextGfmL + '.free')) || (!eval(myBlock + '.posR') && eval(this.nextGfmR + '.free'))) {
					console.log('showFailureText() activated');
					// flow b33
					console.log('flow b33, showFailureText()');
					showFailureText('Attention: section track (Streckengleis) ' + this.name + ' got free, block direction entry (Einfahrt), but neighbour track is free: block not released!');
				}
			}
			eval(myBlock + '.draw()');
		}


		else { // station track
			// first track after a train signal?
			let TRdirR;
			if (this.zfR) {TRdirR = true;}
			else if (this.zfL) {TRdirR = false;}
			let firstEl = this.trackIsFirstElAfterTrainSig(TRdirR);
			// console.log('is track ' + this.name + ' first element after a train signal? ' + firstEl);
	

			if (this.zfR && !eval(nextGfmLslice + '.zfL') && !eval(nextGfmLslice + '.zfR') && eval(nextGfmLslice + '.free')) {
				this.zfR = false; // flow b21
				if (firstEl) {
					this.sideLdirR.ma = false;
					this.sideLdirR.start = false;
					this.sideLdirR.end = false;
					this.sideLdirR.draw();
					if (this.nextGfmL.slice(0,2) === 'tr') {
						if (eval(this.nextGfmL + '.sectionTrack')) {
							eval(this.nextGfmL + '.attrBlock.blocked = false');
							eval(this.nextGfmL + '.attrBlock.draw()');
						}	
					}		
				}
			}
			else if (this.zfL && !eval(nextGfmRslice + '.zfL') && !eval(nextGfmRslice + '.zfR') && eval(nextGfmRslice + '.free')) {
				this.zfL = false;  // flow b21
				if (firstEl) {
					this.sideRdirL.ma = false;
					this.sideRdirL.start = false;
					this.sideRdirL.end = false;
					this.sideRdirL.draw();
					if (this.nextGfmR.slice(0,2) === 'tr') {		
						if (eval(this.nextGfmR + '.sectionTrack')) {
							eval(this.nextGfmR + '.attrBlock.blocked = false');
							eval(this.nextGfmR + '.attrBlock.draw()');
						}
					}			
				}
			}			
		}
		this.draw();
	}

	
	flancProtectionViolation() {
		//console.log(`method flancProtectionViolation started`)
		let problemPoint = '';
		let myDirR = true
		let strGfmL = eval(this.nextGfmL + '.name');
		let strGfmR = eval(this.nextGfmR + '.name');
		let preElement;
		let problemSignal;
		let problemDirection = '';
		// console.log ('track ' + this.name + ': next GFM L: ' + strL + '; next GFM R: ' + strR);
		if (strGfmL.indexOf ("p") === 0) 
		{
			problemPoint = strGfmL;
		}

		if (strGfmR.indexOf ("p") === 0) 
		{
			problemPoint = strGfmR;
		}
		
		//console.log ("violation of flanc protection for point " + problemPoint);
		if (eval(problemPoint + '.zfL')) {myDirR = false}
		problemSignal = startSignalFromElement(problemPoint, myDirR)
		eval(problemSignal + '.ma = false')	
		eval(problemSignal + '.draw()')	
		showFailureText('violation of flanc protection of point ' + problemPoint + ': track ' + this.name + ' is occupied, signal ' + problemSignal + ' is set to stop') 							
		
		
		/*
		if (eval(problemPoint + '.zfR')) {
			problemDirection = 'R'
			myDirR = true										
			if (eval(problemPoint + '.tongueR')) {
				if (eval(problemPoint + '.posR')) {
					//console.log ('case route R, tongue R, pos R');
					preElement = eval(problemPoint + '.neighbourPosR');
					// jetzt in allen 6 Fällen solange suchen, bis Signal gefunden
					// (z.B. Zf_B1_bl201, Belegung tr22 -> geht nicht direkt!)
				}
				else {
					//console.log ('case route R, tongue R, pos L');
					preElement = eval(problemPoint + '.neighbourPosL');
				}
			}
			else {
				//console.log ('case route R, tongue L');
				preElement = eval(problemPoint + '.neighbourFace');
			}
		}
		if (eval(problemPoint + '.zfL')) {
			problemDirection = 'L'
			myDirR = false										
			if (eval(problemPoint + '.tongueR')) {
				//console.log ('case route L, tongue R');
				preElement = eval(problemPoint + '.neighbourFace');
			}
			else {
				if (eval(problemPoint + '.posR')) {
					//console.log ('case route L, tongue L, pos R');
					preElement = eval(problemPoint + '.neighbourPosR');
				}
				else {
					//console.log ('case route L, tongue L, pos L');
					preElement = eval(problemPoint + '.neighbourPosL');
				}
			}
		}						
		//console.log ('Element before violated point ("preElement"): ' + preElement);
		
		if (preElement.indexOf ("t") === 0) {
			console.log ('preElement is a track (name begins with t)');
			if (eval(problemPoint + '.zfR')) {
				problemSignal = eval(preElement + '.trainSignalL');
			}
			else {
				problemSignal = eval(preElement + '.trainSignalR');								
			}
		}
		else if (preElement.indexOf ("p") === 0) {
			//console.log ('preElement is a point');
			if (eval(preElement + '.zfR')) {
				if (eval(preElement + '.tongueR')) {
					if (eval(preElement + '.posR')) {
						//console.log ('case point with zfR, tongueR, posR');	
						//console.log ('relevant neighbour: ' + eval(preElement + '.neighbourPosR'));
						preElement = eval(preElement + '.neighbourPosR');
					}
					else if (eval(preElement + '.posL')) {
						//console.log ('case point with zfR, tongueR, posL');						
						//console.log ('relevant neighbour: ' + eval(preElement + '.neighbourPosL'));
						preElement = eval(preElement + '.neighbourPosL');
					}	
				}
				else {
					//console.log ('point with zfR, tongueL');
					//console.log ('relevant neighbour: ' + eval(preElement + '.neighbourFace'));
					preElement = eval(preElement + '.neighbourFace');									
				}
				problemSignal = eval(preElement + '.trainSignalL');
				//console.log ('preElement: ' + preElement + '; problemSignal: ' + problemSignal);	
			}
			else if (eval(preElement + '.zfL')) {
				if (eval(preElement + '.tongueR')) {
					//console.log ('case point with zfL, tongueR');	
					//console.log ('relevant neighbour: ' + eval(preElement + '.neighbourFace'));
					preElement = eval(preElement + '.neighbourFace');
				}
				else {
					if (eval(preElement + '.posL')) {
						//console.log ('case: point with zfL, tongueL, posL');
						preElement = eval(preElement + 'neighbourPosL');
					}
					if (eval(preElement + '.posR')) {
						//console.log ('case: point with zfL, tongueL, posR');
						preElement = eval(preElement + '.neighbourPosR');
					}
				}
				problemSignal = eval(preElement + '.trainSignalR');
			}
			else {
				//console.log ('problem with point ' + perElement + ', neither zfR nor zfL set');
			}
		}
		else {
			//console.log ('preElement is not defined!');
		}
		// console.log ('problemSignal: ' + problemSignal);*/
	}
	

	checkSectionTrackBlock() {
		if (this.sectionTrack) {
			let myBlock = '';
			if (typeof this.attrBlock !== 'object') {
				console.log('sectionTrack ' + this.name + 'doesn\'t have an attributed block');
				showFailureText ('sectionTrack ' + this.name + 'doesn\'t have an attributed block');
			}	
		}
	}
	
	checkFlyingTrain() {
		console.log('method checkFlyingTrain() activated from ' + this.name);
		let actualGfmL = this.nextGfmL;
		if (actualGfmL.startsWith('p')) {
			let actPos = actualGfmL.search('@');
			actualGfmL = actualGfmL.slice(0, actPos);
		}
		
		let actualGfmR = this.nextGfmR;
		if (actualGfmR.startsWith('p')) {
			let actPos = actualGfmR.search('@');
			actualGfmR = actualGfmR.slice(0, actPos);
		}
		
		if (!this.sectionTrack && eval(actualGfmL + '.free') && eval(actualGfmR + '.free')) {
			console.log('AFT on ' + this.name);
			showFailureText('AFT, Alarm Flying Train from track ' + this.label);			
		}
	}
	
	checkOccupationWithoutRoute() {
		if (!this.sectionTrack && !this.zfL && !this.zfR) {
			showFailureText('ABoF, Alarm Belegung ohne Fahrstrasse on track ' + this.label);			
		}
	}
}


class Point {
	constructor(a,b,c1, c2, d,e,f,g,h,i, m, n, o)
	{
		// static properties
		this.name = a; // same name as name of the instance resp. object
		this.label = b; // element label on the screen
		this.cooX = c1;
		this.cooY = c2;
		this.coo = [c1, c2]; // coordinates of point of intersection (Schnittpunkt)
		this.tongueR = d; // tongue (Weichenspitze) on right side (left side otherwise)
		this.turnoutR = e; // turnout (Ablenkung) on right side (left side otherwise)
		this.neighbourFace = f; // neighbour face side (Weichenspitze)
		this.neighbourPosL = g; // neighbour side L (if point has position L - in Linkslage)
		this.neighbourPosR = h; // neighbour side R  (if point has position R - in Rechtslage)
		this.trainSignalTongue = i; // train signal pointing towards this point, side tongue (Spitze)
		this.lengthFaceSide = lengthPFace; // (as name says), in pixel [px]
		this.addLengthFaceSide = m; // additional length on the straight side [px] (Seite Weichenspitze)
		this.lengthTrailSide = lengthPTrail; // (as name says), in pixel [px]
		this.addLengthTrailSide = n; // additional lenght on the trail side in [px] (Seite Weichenwurzel, Stellung gerade)
		this.prefPosR = o; // preferred position (R if TRUE, L else)
		pointNames.push(this.name); // array with all point names
 	}

 	reset() {	
		// activated with functions 'onNewLoad()' and 'initialize()'
		// dynamic properties
		this.ok = false; // ok and not faulty (if nok, point is drawn in magenta)
		this.turning = false; // point flashing
		this.free = true; // not occupied
		this.locked = false; // (verschlossen) - not in use
		this.posR = false; // (as name says)
		this.zfR = false; // train route (TR) in right direction set
		this.zfL = false; // TR in left direction set
		this.olL = false; // overlap point for a train route in left direction
		this.olR = false; // dito right direction
		this.flProtBan = false; // this point is flanc protection type ban (verbotsbewirkt)
		this.myFlProtBanTrack = ''; // track offering flanc protection type ban for this point
		this.flProtPosR = false; // this track offers flanc protection type pos in position R
		this.flProtPosL = false; // dito position L
		this.flProtPosFor = ''; // name of point, for which this point offers fl prot pos
		this.myFlProtPos = undefined; // name of point offering fl prot pos to this point
		this.mouseCameDownHere = false; // (as name says)
		this.preBuildTR = false; // point is pre reserved for a train route 
		this.flashOn = false; // dynamic property, only for drawing when this.turning is true		
	}

	click()
	{
        xx = x - this.coo[0];
        yy = y - this.coo[1];
        
		let cond_geom = false;
		let cond_txt = false;		
		cond_geom = (xx >= -lengthP/2 && xx <= lengthP/2 && yy >= -trackWidth/2-dy && yy <= trackWidth/2+dy);
		
		if (this.tongueR && this.turnoutR)
		{
			cond_geom = yy > -5/4*xx-50 && yy > 10/7*xx-200/7 && yy < 0;
			cond_txt = yy > 10 && yy < 20 && xx > -10 && xx < 10;
		}
		
		else if (this.tongueR && !this.turnoutR)
		{
			cond_geom = yy < 5/4*xx+50 && yy < -10/7*xx+200/7 && yy > 0;
			cond_txt = yy > -20 && yy < -10 && xx > -10 && xx < 10;			
		}
		
		else if (!this.tongueR && this.turnoutR)
		{
			cond_geom = yy < 10/7*xx+200/7 && yy < -5/4*xx+50 && yy > 0;
			cond_txt = yy > -20 && yy < -10 && xx > -10 && xx < 10;			
		}
		
		else if (!this.tongueR && !this.turnoutR)
		{
			cond_geom = yy > -10/7*xx-200/7 && yy > 5/4*xx-50 && yy < 0;
			cond_txt = yy > 10 && yy < 20 && xx > -10 && xx < 10;
		}
		
		if (this.ok && !this.turning && cond_geom) {
			console.log ('point ' + this.name + ' just was clicked')
			hideFailureText();
			
			if (this.free) {
				this.pointGotOccupied()
			}
			else {
				this.pointGotFree()
			}
		}

		if (cond_txt && this.ok && !this.turning && this.free && !this.locked && !this.zfR && !this.zfL && !this.flProtBan && !this.olR && !this.olL && !this.flProtPosR && !this.flProtPosL)
		{
			// console.log ("all conditions for turning ok and point text clicked");
			this.posR = !this.posR;
			this.draw();
		}			
	}
	
	findElementBefore() {
		let eb = '';
		if (this.zfR && this.tongueR && this.posR) {
			eb = this.neighbourPosR			
		}
		else if (this.zfR && this.tongueR && !this.posR) {
			eb = this.neighbourPosL
		}
		else if (this.zfR && !this.tongueR) {
			eb = this.neighbourFace
		}
		else if (this.zfL && this.tongueR) {
			eb = this.neighbourFace			
		}
		else if (this.zfL && !this.tongueR && this.posR) {
			eb = this.neighbourPosR
		}
		else if (this.zfL && !this.tongueR && !this.posR) {
			eb = this.neighbourPosL
		}
		return eb;
	}

	checkTrailing() {
		// is called when occupation occurs
		let trailed = false;
		if (this.posR) {
			// check, if neighbourPosL is occupied (if this element is not a point)			
			if (!eval(this.neighbourPosL + '.free') && !((this.neighbourPosL).slice(0,1) == 'p')) {
				trailed = true;
			}
			
			if ((this.neighbourPosL).slice(0,1) == 'p' && !eval(this.neighbourPosL + '.free')) {  // neighbour L is an occupied point
				// console.log ('point '+ this.name + ' gets occupied, position R, neighbour L is an occupied point: ' + this.neighbourPosL + '');
				if (eval(this.neighbourPosL + '.neighbourFace') == this.name) {
					console.log ('neighbourPosL has his tongue in direction of ' + this.name);
					trailed = true;
				}
				else if (eval(this.neighbourPosL + '.neighbourPosL') == this.name && eval(this.neighbourPosL + '.posR == false')) {
					console.log ('neighbourPosL has his left leg in direction of ' + this.name + ' with position L');
					trailed = true;
				}
				else if (eval(this.neighbourPosL + '.neighbourPosR') == this.name && eval(this.neighbourPosL + '.posR == true')) {
					console.log ('neighbourPosL has his right leg in direction of ' + this.name + ' with position R');
					trailed = true;
				}
			}
		}
		else if (!this.posR) {
			if (!eval(this.neighbourPosR + '.free') && !((this.neighbourPosR).slice(0,1) == 'p')) {
				trailed = true;
			}
			
			if ((this.neighbourPosR).slice(0,1) == 'p' && !eval(this.neighbourPosR + '.free')) {  // neighbour R is an occupied point
				if (eval(this.neighbourPosR + '.neighbourFace') == this.name) {
					trailed = true;
				}
				else if (eval(this.neighbourPosR + '.neighbourPosL') == this.name && eval(this.neighbourPosR + '.posR == false')) {
					trailed = true;
				}
				else if (eval(this.neighbourPosR + '.neighbourPosR') == this.name && eval(this.neighbourPosR + '.posR == true')) {
					trailed = true;
				}
			}

		}
		if (trailed) {
			this.ok = false;
			this.draw();
			//hideFailureText();
			showFailureText('point ' + this.name + ' is trailed (aufgeschnitten)');			
		}
		//console.log('method checkTrailing() in class Point ended with ' + this.name)
	}
	
	pointGotOccupied() {
		// flow chart -> "Point_pointGotOccupied.pdf"
		
		let elementBefore = this.findElementBefore();
		if (elementBefore.search('@') !== -1) {
			elementBefore = elementBefore.slice(0,elementBefore.search('@'));
		}


		// flow c1
		this.free = false
		if (!this.zfR && !this.zfL) {
			showFailureText('ABoF, Alarm Belegung ohne Fahrstrasse on point ' + this.name);
		}

		else {  //(this.zfR || this.zfL)
			let neighbourPosRs = this.neighbourPosR;
			if (this.neighbourPosR.search('@') !== -1) {
				console.log('sic!');
				neighbourPosRs = this.neighbourPosR.slice(0,this.neighbourPosR.search('@'));
				console.log(neighbourPosRs);
			}
			let neighbourPosLs = this.neighbourPosL;
			if (this.neighbourPosL.search('@') !== -1) {
				neighbourPosLs = this.neighbourPosL.slice(0,this.neighbourPosL.search('@'));
			}
			// d21R
			if (this.zfR && !this.tongueR && this.trainSignalTongue != '' && eval(this.trainSignalTongue + '.ma')) {
				// d22R
				//console.log('point ' + this.name + ' gets occupied, position d22R')
				if (eval(this.neighbourFace + '.free')) {
					// p22R
					showFailureText('point ' + this.name + ' has ZfR and gets occupied, but element left is free')
				}				
			}
			else if (this.zfR && !this.tongueR) {
				// d23R
				//console.log('point ' + this.name + ' gets occupied, position d23R')
				if (eval(this.neighbourFace + '.free') || !eval(this.neighbourFace + '.zfR')) {
					// p23R
					showFailureText('point ' + this.name + ' has ZfR and gets occupied, but element left has no zfR or is free')					
				}				
			}
			else if (this.zfR && this.tongueR && this.posR) {
				if (eval(neighbourPosRs + '.free') || !eval(neighbourPosRs + '.zfR')) {
					showFailureText('point ' + this.name + ' has ZfR and gets occupied, but element left has no zfR or is free')					
				}
			}
			else if (this.zfR && this.tongueR && !this.posR) {
				if (eval(neighbourPosLs + '.free') || !eval(neighbourPosLs + '.zfR')) {
					showFailureText('point ' + this.name + ' has ZfR and gets occupied, but element left has no zfR or is free')					
				}
			}
			// d21L
			if (this.zfL && this.tongueR && this.trainSignalTongue != '' && eval(this.trainSignalTongue + '.ma')) {
				// d22L
				//console.log('point ' + this.name + ' gets occupied, case d22L')
				if (eval(this.neighbourFace + '.free')) {
					// p22L
					showFailureText('point ' + this.name + ' has ZfL and gets occupied, but element right is free')
				}				
			}
			else if (this.zfL && this.tongueR){
				// d23L
				if (eval(this.neighbourFace + '.free') || !eval(this.neighbourFace + '.zfL')) {
					// p23L
					showFailureText('point ' + this.name + ' has ZfL and gets occupied, but element right has no zfL or is free')					
				}
			}
			else if (this.zfL && !this.tongueR && this.posR) {
				if (eval(neighbourPosRs + '.free') || !eval(neighbourPosRs + '.zfL')) {
					showFailureText('point ' + this.name + ' has ZfL and gets occupied, but element right has no zfL or is free')					
				}
			}
			else if (this.zfL && !this.tongueR && !this.posR) {
				if (eval(neighbourPosLs + '.free') || !eval(neighbourPosLs + '.zfL')) {
					showFailureText('point ' + this.name + ' has ZfL and gets occupied, but element right has no zfL or is free')					
				}
			}
		}
		
		// d31
		if (this.flProtBan || this.olR || this.olL) {
			let actualElement = ''
			let actualDirR = false
			if (this.flProtBan) {				
				// p31 (find start signal of corresponding zf and set it to stop)
				// look for the point to be protected
				let pointToBeProtected = ''
				if (this.neighbourFace.slice(0,1) == 'p') {
					if (eval(this.neighbourFace + '.zfR') || eval(this.neighbourFace + '.zfL')) {
						pointToBeProtected = this.neighbourFace
					}
				}
				if (this.neighbourPosR.slice(0,1) == 'p') {
					if (eval(this.neighbourPosR + '.zfR') || eval(this.neighbourPosR + '.zfL')) {
						pointToBeProtected = this.neighbourPosR
					}				
				}
				if (this.neighbourPosL.slice(0,1) == 'p') {
					if (eval(this.neighbourPosL + '.zfR') || eval(this.neighbourPosL + '.zfL')) {
						pointToBeProtected = this.neighbourPosL
					}				
				}
				showFailureText('violation of flanc protection of ' + pointToBeProtected + ' by occupying ' + this.name + ', start signal set to stop')
				actualDirR = eval(pointToBeProtected + '.zfR')
				actualElement = pointToBeProtected
			}
			else if (this.olR || this.olL) {
				showFailureText('violation of overlap by occupying ' + this.name + ', start signal set to stop')
				actualDirR = this.olR
				actualElement = eval(this.name + '.neighbourFace')
			}

			// find start signal corresponding to actualElement	
			let zStart = startSignalFromElement(actualElement, actualDirR)			
			eval(zStart + '.ma = false')
			eval(zStart + '.draw()')

			/*// to do!!!
			let myStartSignal = ''
			let startSignalFound = false
			let k=0
			while (!startSignalFound && k<10) {
				console.log ('actualElement: ' + actualElement)
				if (actualElement.slice(0,2) == 'tr') {
					if (eval(actualElement + '.trainSignalR != ""') && !actualDirR) {
						startSignalFound = true
						myStartSignal = eval(actualElement + '.trainSignalR')
					}
					else if (eval(actualElement + '.trainSignalL != ""') && actualDirR) {
						startSignalFound = true
						myStartSignal = eval(actualElement + '.trainSignalL')						
					}
				}
				else if (actualElement.slice(0,1) == 'p') {
					if (actualDirR && !eval(actualElement + '.tongueR') && eval(actualElement + '.trainSignalTongue != ""')) {
						startSignalFound = true
						myStartSignal = eval(actualElement + '.trainSignalTongue')
					}
					else if (!actualDirR && eval(actualElement + '.tongueR') && eval(actualElement + '.trainSignalTongue != ""')) {
						startSignalFound = true
						myStartSignal = eval(actualElement + '.trainSignalTongue')
					}
				}
				if (actualElement.slice(0,2) == 'tr' && actualDirR) {
					actualElement = eval(actualElement + '.nextGfmL')
				}
				else if (actualElement.slice(0,2) == 'tr' && !actualDirR) {
					actualElement = eval(actualElement + '.nextGfmR')
				}				
				else if (actualElement.slice(0,1) == 'p' && actualDirR) {
					if (!eval(actualElement + '.tongueR')) {
						actualElement = eval(actualElement + '.neighbourFace')
					}
					else if (actualElement.slice(0,1) == 'p' && eval(actualElement + '.posR')) {
						actualElement = eval(actualElement + '.neighbourPosR')						
					}
					else if (actualElement.slice(0,1) == 'p' && !eval(actualElement + '.posR')) {
						actualElement = eval(actualElement + '.neighbourPosL')						
					}
				}
				else if (actualElement.slice(0,1) == 'p' && !actualDirR) {
					if (eval(actualElement + '.tongueR')) {
						actualElement = eval(actualElement + '.neighbourFace')
					}
					else if (actualElement.slice(0,1) == 'p' && eval(actualElement + '.posR')) {
						actualElement = eval(actualElement + '.neighbourPosR')						
					}
					else if (actualElement.slice(0,1) == 'p' && !eval(actualElement + '.posR')) {
						actualElement = eval(actualElement + '.neighbourPosL')						
					}
				}
				k++
			}
			//console.log('start signal found: ' + myStartSignal)
			eval(myStartSignal + '.ma = false')
			eval(myStartSignal + '.draw()')*/
		}
		
		// d51
		// this.checkTrailing()
		
		// p91
		this.draw()		
	}	
	
	pointGotFree() {
		// called by method click() in class Point

		let elementBefore = this.findElementBefore();
		if (elementBefore.search('@') !== -1) {
			elementBefore = elementBefore.slice(0,elementBefore.search('@'));
		}

		// flow d1
		this.free = true
		this.checkFlyingTrain()
		
		
		if ((this.zfR || this.zfL) && eval(elementBefore + '.free') && !eval(elementBefore + '.zfR') && !eval(elementBefore + '.zfL')) {
			
			// flow d3
			this.zfR = false
			this.zfL = false
			

			// reset flProtBan properties (3 in total)
			if (this.myFlProtBanTrack !== '') {
				this.myFlProtBanTrack.flProtBan = false;
				this.myFlProtBanTrack.flProtBanStartSig = '';
				this.myFlProtBanTrack.draw();
				this.myFlProtBanTrack = '';		
			}
			
			// reset flProtPos properties
			if (this.myFlProtPos !== undefined) {
				this.myFlProtPos.flProtPosR = false;
				this.myFlProtPos.flProtPosL = false;
				this.myFlProtPos.flProtPosFor = undefined;
				this.myFlProtPos.draw();
				this.myFlProtPos = undefined;	
			}
		}
		this.draw();
	}
	
	draw_part_face()
	{
		ctx.beginPath()
		ctx.moveTo(this.coo[0], this.coo[1])
		if (this.tongueR) {
				ctx.lineTo(this.coo[0] + this.lengthFaceSide + this.addLengthFaceSide, this.coo[1])
		}
		else {
				ctx.lineTo(this.coo[0] - this.lengthFaceSide - this.addLengthFaceSide, this.coo[1])			
		}
		ctx.stroke()
	}	
	
	draw_part_straight_flexible()
	{
		ctx.beginPath();
		ctx.moveTo(this.coo[0], this.coo[1]);
		ctx.lineTo(this.coo[0]+15-30*this.tongueR, this.coo[1]);
		ctx.stroke();
	}
	
	draw_part_straight_fix()
	{
		ctx.beginPath();
		// let myLengthFaceFix = lengthPTrail;
		ctx.moveTo(this.coo[0] + 15 * (1 - 2 * this.tongueR), this.coo[1]);
		ctx.lineTo(this.coo[0] + lengthPTrail * (1 - 2 * this.tongueR), this.coo[1]);
		ctx.stroke()
	}
	
	draw_part_dev_flexible()
	{
		ctx.beginPath();
		ctx.moveTo(this.coo[0], this.coo[1]);
		ctx.lineTo(this.coo[0]+3-6*this.tongueR, this.coo[1]-15+30*(this.tongueR || this.turnoutR)-30*(this.tongueR && this.turnoutR));
		ctx.stroke();
	}
	
	draw_part_dev_fix()
	{
		ctx.beginPath();
		ctx.moveTo(this.coo[0]+3- 6*this.tongueR, this.coo[1]-15+30*(this.tongueR || this.turnoutR)-30*(this.tongueR && this.turnoutR));
		ctx.lineTo(this.coo[0]+(8 + this.addLengthTrailSide)*(1 - 2 * this.tongueR), this.coo[1]+(40 + 5 * this.addLengthTrailSide) * (-1 + 2*(this.tongueR || this.turnoutR)-2*(this.tongueR && this.turnoutR)))
		ctx.stroke();
	}
	
	
	draw()
	{
		// designation
		ctx.font = switchFont;
		ctx.fillStyle = colorWhite;
		if (!this.ok)
		{
			ctx.fillStyle = colorMagenta;
		}
		ctx.fillText(this.label, this.coo[0], this.coo[1] + 20 - 30*(this.tongueR || this.turnoutR) + 30*(this.tongueR && this.turnoutR)); 
		ctx.stroke();

		
		// draw point itself ( 5 lines)
		ctx.fillStyle = colorBlack;
		if (!this.ok) // passiviert
		{
			ctx.strokeStyle = colorMagenta;
			this.draw_part_face();
			this.draw_part_straight_flexible();
			this.draw_part_straight_fix();
			this.draw_part_dev_flexible();
			this.draw_part_dev_fix();
		}	
		
		else if (this.free &&
				 !this.preBuildTR && 		
				 !this.turning &&
				 !this.zf &&
				 !this.olR &&
				 !this.zfR &&
				 !this.zfL &&
				 !this.olL &&
				 !this.flProtBan &&
				 !this.flProtPosR &&
				 !this.flProtPosL)	// free (white)
		{
			ctx.strokeStyle = colorWhite;
			this.draw_part_face();
			this.draw_part_straight_fix();
			this.draw_part_dev_fix();
			if (this.posR && !this.turnoutR || !this.posR && this.turnoutR)
			{
			this.draw_part_straight_flexible();
			ctx.strokeStyle = colorBlack;
			this.draw_part_dev_flexible();			
			}				
			else
			{
			this.draw_part_dev_flexible();				
			ctx.strokeStyle = colorBlack;
			this.draw_part_straight_flexible();
			}
		}

		else if (this.free &&
				 !this.turning &&
				 (this.zfR || this.zfL)) // free + Zf (green)
		{
			ctx.strokeStyle = colorGreen;
			this.draw_part_face();
			if (this.posR && !this.turnoutR || !this.posR && this.turnoutR) // position straight
			{
			this.draw_part_straight_flexible();
			this.draw_part_straight_fix();
			ctx.strokeStyle = colorBlack;
			this.draw_part_dev_flexible();
			ctx.strokeStyle = colorLightGreen;
			this.draw_part_dev_fix();			
			}				
			else // position deviation
			{
			this.draw_part_dev_flexible();				
			this.draw_part_dev_fix();			
			ctx.strokeStyle = colorBlack;
			this.draw_part_straight_flexible();
			ctx.strokeStyle = colorLightGreen;
			this.draw_part_straight_fix();
			}
		}
		
		else if (this.free && !this.turning && (this.olR || this.olL)) { // free + ol (light green)
			ctx.strokeStyle = colorLightGreen
			this.draw_part_face()
			if (this.posR && !this.turnoutR || !this.posR && this.turnoutR) {// position straight
				this.draw_part_straight_flexible()
				this.draw_part_straight_fix()
				this.draw_part_dev_fix();			
				ctx.strokeStyle = colorBlack
				this.draw_part_dev_flexible()				
			}
			else { // position deviation
				this.draw_part_dev_flexible()				
				this.draw_part_dev_fix()			
				this.draw_part_straight_fix();
				ctx.strokeStyle = colorBlack;
				this.draw_part_straight_flexible()
			}
		}

		else if (this.free &&
				 !this.turning &&
				 !this.zfR && !this.zfL &&
				 !this.olR && !this.olL &&
				 (this.flProtBan || this.flProtPosR || this.flProtPosL)
				 ) // free + flProt (light green)
		{
			ctx.strokeStyle = colorLightGreen;
			this.draw_part_face();
			if (this.posR && !this.turnoutR || !this.posR && this.turnoutR) // position straight
			{
			this.draw_part_straight_flexible();
			this.draw_part_straight_fix();
			ctx.strokeStyle = colorBlack;
			this.draw_part_dev_flexible();
			ctx.strokeStyle = colorLightGreen;
			this.draw_part_dev_fix();			
			}				
			else // position deviation
			{
			this.draw_part_dev_flexible();				
			this.draw_part_dev_fix();			
			ctx.strokeStyle = colorBlack;
			this.draw_part_straight_flexible();
			ctx.strokeStyle = colorLightGreen;
			this.draw_part_straight_fix();
			}
		}
		
		else if (!this.free &&
				 !this.turning ) // occupied (with or without Zf, flProt, olR/olL) (red)
		{
			ctx.strokeStyle = colorRed;
			this.draw_part_face();
			if (this.posR && !this.turnoutR || !this.posR && this.turnoutR) // position straight
			{
			this.draw_part_straight_flexible();
			this.draw_part_straight_fix();
			ctx.strokeStyle = colorBlack;
			this.draw_part_dev_flexible();
			ctx.strokeStyle = colorRed; // vorläufig bewusst so
			this.draw_part_dev_fix();			
			}				
			else // position deviation
			{
			this.draw_part_dev_flexible();				
			this.draw_part_dev_fix();			
			ctx.strokeStyle = colorBlack;
			this.draw_part_straight_flexible();
			ctx.strokeStyle = colorRed; // vorläufig bewusst so
			this.draw_part_straight_fix();
			}
			if (this.zfR || this.zfL) { // blue dot 
					ctx.fillStyle = colorDarkBlue;
			}
		}
		
		else if (this.free &&
				 !this.zfR && !this.zfL &&
				 this.preBuildTR) {
			// train route prebuilding
			// console.log('point ' + this.name + ' has preBuildTR = true');
			ctx.strokeStyle = colorYellow;
			this.draw_part_face();
			if (this.posR && !this.turnoutR || !this.posR && this.turnoutR) // position straight
			{
			this.draw_part_straight_flexible();
			this.draw_part_straight_fix();
			ctx.strokeStyle = colorBlack;
			this.draw_part_dev_flexible();
			ctx.strokeStyle = colorYellow;
			this.draw_part_dev_fix();			
			}				
			else // position deviation
			{
			this.draw_part_dev_flexible();				
			this.draw_part_dev_fix();			
			ctx.strokeStyle = colorBlack;
			this.draw_part_straight_flexible();
			ctx.strokeStyle = colorYellow;
			this.draw_part_straight_fix();
			}
		}

		ctx.strokeStyle = colorBlack;
		ctx.beginPath();
		ctx.arc(this.coo[0] + 20 - 40*this.tongueR, this.coo[1] - 10 + 20*(this.tongueR || this.turnoutR) - 20*(this.tongueR && this.turnoutR),radiusDotBlue,0,2*Math.PI);
		ctx.fill();

		if (this.turning &&
			this.ok && 
			this.free &&
			!this.zfR && !this.zfL &&
			!this.flProtPosR && !this.flProtPosL &&
			!this.olR && !this.olL) // case flashing
		{
			// console.log ("case flashing");
			ctx.strokeStyle = colorYellow;
			this.draw_part_face();
			this.draw_part_straight_fix();
			this.draw_part_dev_fix();

			if (this.flashOn)
			{
				this.draw_part_dev_flexible();
				ctx.strokeStyle = colorBlack;
				this.draw_part_straight_flexible();				
			}
			else
			{
				this.draw_part_straight_flexible();								
				ctx.strokeStyle = colorBlack;
				this.draw_part_dev_flexible();
			}
		}
	}
	checkFlyingTrain() {
		let neighbourPosRs = this.neighbourPosR;
		if (this.neighbourPosR.search('@') !== -1) {
			neighbourPosRs = this.neighbourPosR.slice(0,this.neighbourPosR.search('@'));
		}
		let neighbourPosLs = this.neighbourPosL;
		if (this.neighbourPosL.search('@') !== -1) {
			neighbourPosLs = this.neighbourPosL.slice(0,this.neighbourPosL.search('@'));
		}
		let neighbourFaces = this.neighbourFace;
		if (this.neighbourFace.search('@') !== -1) {
			neighbourFaces = this.neighbourFace.slice(0,this.neighbourFace.search('@'));
		}
		console.log('point ' + this.name + ': neighbourFaces = ' + neighbourFaces);

		if (eval(neighbourFaces + '.free')) {
			if (this.posR && eval(neighbourPosRs + '.free')) {
				showFailureText('AFT, Alarm Flying Train from point ' + this.name)				
			}
			else if (!this.posR && eval(neighbourPosLs + '.free')) {
				showFailureText('AFT, Alarm Flying Train from point ' + this.name)			
			}
		}	
	}
}


class TrainSignal {
	constructor(n, dR, fT, cox, coy, tS, lB)
	{	// static properties
		this.name = n; // same name as name of the instance resp. the object
		this.dirR = dR; // signal is valid for trains driving in right direction
		this.fromTrack = fT; // track, on which the trains is positioned when looking at the signal
		this.cooX = cox;
		this.cooY = coy;
		this.coo = [cox, coy]; // coordinates of arrow head
		// this.precSig = pS; // array with names of all possible preceeding signals
		this.targetSignalOfTrainRoute = tS; // signal can be a target of a train route
		this.labelBehind = lB; // position of label more behind (if two signals are back to back)
		trainSignalNames.push(this.name); // arrow with all names of signals
		this.mouseDownOverSignal = false; // (as name says)
 	}

 	reset() {	
		// activated with functions 'onNewLoad()' and 'initialize()'
		// dynamic properties
		this.ok = false; // active and not faulty
		this.flash = false; // (not in use)
		this.start = false; // this is the start signal of a train route
		this.end = false; // this is the target of a train route
		this.ma = false; // moving authority
		this.mouseCameDownHere = false;	// (as name says)
		this.targetSignalCandidate = false; // (as name says)
		this.mouseDownOverSignal = false; // (as name says)
		this.olTr = ''; // if this signal is the start of a train route: name of element offering overlap protection
	}
	
	draw()
	{
		ctx.font = signalFont;
		// ctx.lineWith = trackWidth;
		if (this.flash === false) // kein Blinken)
		{	
			if (this.ok === false) // Element inaktiv
			{
				ctx.strokeStyle = colorMagenta;
				ctx.fillStyle = colorMagenta;
			}
    		else if (this.ma === true) // Element zeigt Movement Authority
		    {
			    ctx.strokeStyle = colorGreen; // MA
			    ctx.fillStyle = colorWhite;
		    }
			else if (this.targetSignalCandidate) {
			    ctx.strokeStyle = colorYellow;
			    ctx.fillStyle = colorWhite;					 
			}
		    /*else if (this.mouseCameDownHere) {
			    ctx.strokeStyle = colorYellow
			    ctx.fillStyle = colorWhite;				
			}
		    else if (this.mouseDownOverSignal) {
			    ctx.strokeStyle = colorYellow
			    ctx.fillStyle = colorWhite				
			}*/
			else {
			    ctx.strokeStyle = colorRed; // Element in Grundstellung
			    ctx.fillStyle = colorWhite;
		    }
	    }
	    else if (blink1) // flashing signal, case ON
	    {
		    ctx.strokeStyle = colorRed;
		    ctx.fillStyle = colorWhite;		
	    }
    	else // flashing signal, case OFF
    	{
	    	ctx.strokeStyle = colorBlack;
		    ctx.fillStyle = colorWhite;
    	}
	    ctx.beginPath();
	    if (this.dirR)
        {
			ctx.moveTo(this.coo[0] - lengthTS, this.coo[1] - lengthTS);
    	    ctx.lineTo(this.coo[0], this.coo[1]);
    	    ctx.lineTo(this.coo[0] - lengthTS, this.coo[1] + lengthTS);
			ctx.stroke();
	        ctx.fillText(this.name, this.cooX - lengthTS/2 - this.labelBehind * 10, this.cooY - 2 * deltaText); 
     	}
        else
        {
            ctx.moveTo(this.coo[0] + lengthTS, this.coo[1] - lengthTS);
            ctx.lineTo(this.coo[0], this.coo[1]);
            ctx.lineTo(this.coo[0] + lengthTS, this.coo[1] + lengthTS);
			ctx.stroke();
			ctx.fillText(this.name, this.cooX + lengthTS/2 + this.labelBehind * 10, this.cooY - 2 * deltaText);
        }
		
       	ctx.fillStyle = colorBlack;
       	ctx.strokeStyle = colorBlack
    	if (this.ok === true && this.end === true)
	    {
		    ctx.fillStyle = colorDarkBlue;	
	    }
	    ctx.beginPath();
	    ctx.arc(this.coo[0]+20-this.dirR*40,this.coo[1]-10,radiusDotBlue,0,2*Math.PI);
		ctx.stroke()
	    ctx.fill();
 	}

    mouseComesDown() {
		// console.log('method mouseComesDown() for trainSignal ' + this.name + ' activated');
		xx = x - this.coo[0];
        yy = y - this.coo[1];
        
        if (this.dirR) {
           geometric = (xx<=0 && xx>=-lengthTS && yy>=xx && yy<=-xx);
        }
        else {
    	    geometric = (xx>=0 && xx<= lengthTS && yy<=xx && yy>=-xx);
        }
		if (geometric && this.ok && !this.start && !this.ma && !preBuildTRok) {
			console.log('mouse came down on signal ' + this.name)
			this.mouseCameDownHere = true
			mouseIsDownForCallZf = true
			xStart = this.coo[0]
			yStart = this.coo[1]
			this.draw()
			potentialStartSignal = this.name;
			
			// console.log('mouse came down on signal ' + this.name + ', the signal is ok, not a start signal and has no ma')
		}
	}
	
	mouseDownMoving() { // called from function onMouseDownMoveCanvas(event)
		// console.log('method mouseDownMoving() on signal' + this.name + 'activated; x=' + x + ', y=' + y);
		// this.mouseDownOverSignal = false
		// this.draw()

		xx = x - this.cooX;
        yy = y - this.cooY;
        
		if (this.dirR) {
           geometric = (xx<=0 && xx>=-lengthTS && yy>=xx && yy<=-xx)
		   // console.log('xx=' + xx + ', yy=' + yy + '; geometric (case dirR): ' + geometric);
        }
        else {
    	    geometric = (xx>=0 && xx<= lengthTS && yy<=xx && yy>=-xx)
        }
		//console.log('method mouseDownMoving() on signal' + this.name + 'activated; x=' + x + ', y=' + y + '; geometric = ' + geometric);
		
		if (geometric && potentialStartSignal.length > 0 && this.name != potentialStartSignal) {
			// console.log('signal ' + this.name + ', geometric = true');
			if (this.ok && this.targetSignalOfTrainRoute && !this.start && !this.ma && !this.end && (eval(potentialStartSignal + '.dirR') == this.dirR) && !this.mouseDownOverSignal) {
				// console.log('signal ' + this.name + ', could be a possible target of the actual start signal ' + potentialStartSignal);
				// console.log('dirR start: ' + eval(potentialStartSignal + '.dirR') + ', dirR target: ' + this.dirR);
				this.mouseDownOverSignal = true;
				this.draw();
			
				// find backwards a route to the start signal
				potentialTarget = this.name;
				// console.log('[class TrainSignal, method mouseDownMoving()] potentialTarget = ' + potentialTarget);
				this.targetSignalCandidate = findRouteBackwards (potentialStartSignal, potentialTarget);
				if (this.targetSignalCandidate) {
				 	// console.log('[class TrainSignal, method mouseDownMoving()] potential train route found: ' + potentialTrainRoute);
	 				// console.log('[class TrainSignal, method mouseDownMoving()] potentialTarget = ' + potentialTarget);
				}
				this.draw();
			}			
		}
		else {
			// console.log('signal ' + this.name + ', geometric = false');
			this.mouseDownOverSignal = false;
			this.targetSignalCandidate = false;
			this.draw();
		}		
	}

	mouseComesUp() {
		console.log('method mouseComesUp() in class TrainSignal started with signal ' + this.name)
		if (this.targetSignalCandidate) {
			potentialTrainRoute.pop();
			potentialTrainRoute.shift();
			preBuildTrainRoute(eval(potentialStartSignal + '.dirR'), potentialStartSignal, potentialTarget, potentialTrainRoute.reverse());
			this.targetSignalCandidate = false;
			// evtl. potentialTrainRoute = '';
		}
		else {
			console.log('no train route prebuilding');
		}
		
		potentialStartSignal = '';
		potentialTarget = '';
		this.mouseDownOverSignal = false
		reDraw();	
		
		
		/*
// to do!		eval(potentialStartSignal + '.mouseCameDownHere = false');
		potentialStartSignal = '';
		potentialTarget = '';
		xx = x - this.coo[0];
        yy = y - this.coo[1];
        
		if (this.dirR) {
           geometric = (xx<=0 && xx>=-lengthTS && yy>=xx && yy<=-xx)
        }
        else {
    	    geometric = (xx>=0 && xx<= lengthTS && yy<=xx && yy>=-xx)
        }
		if (geometric && this.ok && this.targetSignalCandidate) { // !this.start && !this.ma && !this.end && 
			//console.log('mouse came up on signal ' + this.name + ', the signal is ok and it is a candidate as target of a train route')
			xTarget = this.coo[0]
			yTarget = this.coo[1]

			// find the signal, where the mouse went down
			let k=0;
			let signalWhereMouseDown = ''
			while (k < countTrainSignals) {
				if (eval(trainSignalNames[k] + '.mouseCameDownHere')) {
					signalWhereMouseDown = 	trainSignalNames[k]
					//console.log('possible start signal found: ' + signalWhereMouseDown)
				}			
				k++;
			}
			//console.log('mouse went down on signal ' + signalWhereMouseDown + ' and came up on signal ' + this.name)
			if (this.asTargetBivalent) {
				// find the point with tongue side signal
				let pointAfterTarget = ''
				let i=0
				while (i < countPoints) {
					if (eval(pointNames[i] + '.trainSignalTongue') == this.name) {
						//console.log('point directly after target signal found: ' + pointNames[i])
						pointAfterTarget = pointNames[i]
					}
					i++					
				}
				// find position of this point
				let pointPosR = eval(pointAfterTarget + '.posR')
				//console.log ('point after target posR: ' + pointPosR)
				
				// call preBuild() of concerning route
				if (eval(pointAfterTarget + '.posR')) {
					eval('zf_' + signalWhereMouseDown + '_' + this.name + '_R' + '.preBuild()')					
				}
				else {
					eval('zf_' + signalWhereMouseDown + '_' + this.name + '_L' + '.preBuild()')					
				}
			}
			else {
				eval('zf_' + signalWhereMouseDown + '_' + this.name + '.preBuild()')				
			}
			preBuildStarted = true
		} */
	}

	
	asStartSignalSetToStop() {
		// called by class 'Track', method 'trackGotFree()'
		this.start = false;
		this.ma = false;
		this.draw();
		console.log('method \'asStartSignalSetToStop()\' of class TrainSignal, signal ' + this.name + ', called');
	}
	
	/*deBlink()
    {
        // // console.log(this.name + ": this.blink = " + this.blink);
        this.flash = false;
        // // console.log(this.name + ": this.blink = " + this.blink);
		this.draw();
    } */
}