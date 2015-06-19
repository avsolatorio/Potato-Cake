function KalokaThread(x0, y0, size){
    this.dx = 0;
    this.dy = 0;
    this.dSize = 0;
    
    this.framesLeft = 0;
    this.message = "Aww... Too bad...";
    this.currX = x0;
    this.currY = y0;
    this.currSize = size;
    this.hasStarted = false;
    this.isSlow = true;
      
    this.setWhite = function(){};
    this.loop = function(){};
    this.drawFrame = function(windowSize){};
    this._keyPressed = function(){};
    this.hasLost = function(){};

    this.fast = function(){
        this.isSlow = false;
    }
    this.slow = function(){
        this.isSlow = true;
    }
    this.hasStarted = function(){
        return this.hasStarted;
    }

    this.start = function(){
        if(this.hasStarted)
            return;
        this.hasStarted = true;
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
        if(!this.hasStarted) return;
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
            this._keyPressed();
            this.loop();
            
            clearInterval(this.intervalID);

            this.intervalID = setInterval(this.run(), isSlow ? slowPause : fastPause);

            if(this.hasLost()){
              endTime(message);
            }
    }
}
