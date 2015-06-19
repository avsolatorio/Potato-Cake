Stack.prototype = new KalokaThread();
Stack.prototype.constructor=Stack;

function Stack(x,y,size){
  KalokaThread(x,y,size)
  this.count = 0;
  this.addBox = 0;
  this.removeBox = 0;
  this.animationRate = 4;
  this.delay = 60;
  this.frames = 0;
  this.pressed = true;
  this.hasLost = false;
  this.message = "YOU MESSED UP WITH THE PILE THING...";
  

  this.setWhite = function(){
    fill(0,100*this.count/9.0,100);
  }

  this.loop = function(){
    if(this.addBox > 0 && --this.addBox === 0)
      this.count++;
    if(this.count > 9)
      this.hasLost = true;
    if(this.frames++%this.delay === 0)
      this.addBox = this.animationRate; 
  }
  this.drawFrame = function(windowSize){
    if(this.count < 0) return;
    this.setWhite();
    var h = this.windowSize*.1;
    var currY = this.windowSize;
    if(this.addBox > 0){
       currY -= h*(this.animationRate-this.addBox)/this.animationRate;
       rect(windowSize*.1,currY,windowSize*.8,(windowSize-currY));
       currY -= 0.01*windowSize;
    }
    
    for(var i = 0; i < this.count; i++){
       currY -= h;
       rect(windowSize*.1,currY,windowSize*.8,h);
       currY -= 0.01*windowSize;
    }
    if(this.removeBox-- > 0){
      currY -= h;
      rect(0,currY,windowSize*.8*this.removeBox/this.animationRate,h);
    }
  }

  this._keyPressed = function(){
    if(_keyPressed['x'.charCodeAt(0)] && !this.pressed && this.removeBox <= 0){
      swipe();
      this.removeBox = this.animationRate;
      this.count--;
      if(this.count < 0)
        this.hasLost = true;
    } 
    this.pressed = _keyPressed['x'.charCodeAt(0)];
  }

  this.hasLost = function(){
    return this.hasLost;
  }
}

