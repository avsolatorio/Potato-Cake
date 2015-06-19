function Time(x,y,size){
    this.dx = 0;
    this.dy = 0;
    this.dSize = 0;
    
    this.framesLeft = 0;
    this.message = "Timer";
    this.currX = x;
    this.currY = y;
    this.currSize = size;
    this._hasStarted = false;
    this.isSlow = true;
	this.toDisplay = 0;      

    this.fast = function(){
        this.isSlow = false;
    }
    this.slow = function(){
        this.isSlow = true;
    }
    this.hasStarted = function(){
        return this._hasStarted;
    }

    this.start = function(){
        if(this._hasStarted)
            return;
        this._hasStarted = true;
        this.intervalID = setInterval(this.run(), slowPause);
    }

    this._animate = function(){
        if(this.framesLeft-->0){
            this.currX += this.dx;
            this.currY += this.dy;
            this.currSize += this.dSize;
        }
        return this.framesLeft > 0;
    }

    this.setAnimation = function(destX, destY, destSize){
        this.framesLeft = transitionLength;
        this.dx = (destX-this.currX)/transitionLength;
        this.dy = (destY-this.currY)/transitionLength;
        this.dSize = (destSize - this.currSize)/transitionLength;
    }
    
    this.display = function(){
        if(!this._hasStarted) return;
        noStroke();
        push();
        rectMode(CORNER);
        translate(this.currX,this.currY);
        this.setWhite();
        rect(0,0,this.currSize,this.currSize);
        fill(0);
        translate(border,border);
        rect(0, 0, this.currSize-border*2,this.currSize-border*2);
        if(this.hasStarted)
            this.drawFrame(this.currSize-border*2);
        pop();
    }

    this.run = function(){
        clearInterval(this.intervalID);
    }

	this.setWhite = function(){fill(0,0,100);}

	this.drawFrame = function(windowSize){
		setBitFontSize(parseInt(windowSize*0.015));
		bitTextCenter(this.toDisplay,0,0,windowSize,windowSize);
	}
	this.setDisplay = function(_toDisplay){
		this.toDisplay = _toDisplay;
	}

  this.hasLost = function(){return false;}
}
