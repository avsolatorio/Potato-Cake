var layer = 6;
var s = []
var go_through = false;

var pride = ["#f00000", "#ff8000", "#ffff00", "#007940", "#4040ff", "#a000c0"];
function setup() {
  createCanvas(windowWidth, windowHeight);
  var i;
  for(i = layer ; i > 0; i--){
    s.push(new System(i*height/(layer), layer-i));
  }

  for(i = 1; i < s.length - 1; i++){
    s[i].next = s[i+1];
  }
}

function Parameters(i){
  this.g = 0.1;
  this.spread = 0.5;
  this.size = 2;
  this.rate = 3;
  this.growth_coefficient = .5;
  this.max_growth = this.size*this.rate;

  this.threshold = 6;
  this.precision = 80;
  this.viscosity = 10;
  this.fill = color(pride[i]);
}

function randomify(p){
  // p.threshold = random(0,8);
  // p.viscosity = random(1,20);
  p.fill = color(random(255),random(255),random(255));
}

function System(offset,i){
  this.next = null;
  var p = new Parameters(i);


  function Particle(_x,_y,flag) {
    this.x = constrain(_x,0, width);
    this.y = max(_y,0);
    var dy = random(0,p.spread),
        dx = random(-p.spread, p.spread);
    if(flag){
      dy = dx = 0;
    }

    this.draw = function(_p){
      noStroke();
      fill(_p.fill);
      ellipse(this.x, this.y, p.size, p.size);

    }

    this.loop = function() {
      dy += p.g;
      this.x += dx;
      this.y += dy;
      if (this.x < 0 || this.x > width) {
        this.x -= 2*dx;
        dx *= -1;
      }
      this.x = constrain(this.x,0,width);
    }
  }

  function Liquid(offset) {
    var h = [], temp = [], i;
    for(i = 0 ; i < p.precision; i++){
      h.push(offset);
      temp.push(offset);
    }

    this.draw = function() {
      fill(p.fill);
      noStroke();
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      curveVertex(0, height - h[0]);
      for (i = 0; i < h.length; i++)
        curveVertex(i*width/(h.length-1), height-h[(i+h.length)%h.length]);
      curveVertex(width, height- h[h.length-1]);
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();
    }

    this.equalize = function() {
      for (i = 0; i < h.length; i++) {
        var den = 2+p.viscosity;
        var left = h[(i+h.length-1)%h.length];
        var right = h[(i+1)%h.length];

        if (i == 0 || abs(left-h[i]) < p.threshold ) {
          left = 0;
          den--;
        }

        if (i==h.length-1 || abs(right-h[i]) < p.threshold) {
          right = 0;
          den--;
        }
        temp[i] = (left+right+p.viscosity*h[i])/(den);
      } 

      for (i = 0; i < h.length; i++) {
        h[i] = temp[i];
      }
    }
    
    this.y_value = function(x){
       var left = floor(x*(p.precision-1)/width);
       var right = ceil(x*(p.precision-1)/width);
       
       left = constrain(left,0,p.precision-1);
       right = constrain(right,0,p.precision-1);

       if(left==right) return height - h[left];

       var ret = map(x, left*width/(p.precision-1), right*width/(p.precision-1),height - h[left], height - h[right]);
      return ret;
    }

    this.isIn = function(point){
       return point.y > this.y_value(point.x);
    }
    
    this.add = function(point){
       var left = floor(point.x*(p.precision-1)/width);
       var right = ceil(point.x*(p.precision-1)/width);
       var k = map(point.x, left*width/(p.precision-1), right*width/(p.precision-1), 0,1);
       h[left] += k*p.size*p.growth_coefficient;
       h[right] += (1-k)*p.size*p.growth_coefficient;
       h[left] = min(h[left],temp[left] + p.max_growth);
       h[right] = min(h[right],temp[right] + p.max_growth);

       h[left] = min(h[left],height);
       h[right] = min(h[right],height);
    }

    this.resize = function(k){
      for(var i = 0; i < h.length; i++)
        h[i] *= k;
    }
  }

  this.al = [];
  var l = new Liquid(offset);

  this.draw = function(mouse){
    var temp = [],i;
    l.draw();
    for (i = 0; i < this.al.length; i++) {
      var e = this.al[i];
      e.loop();
      e.draw(p);

      if(!l.isIn(e)) temp.push(e);
      else{
        l.add(e);
        if(this.next && go_through) {
          this.next.al.push(e);
        }
      }
    }
    this.al = temp;
    l.equalize();
    if (mouse && mouseY <= l.y_value(mouseX)) {  
      for(i = 0 ; i < p.rate; i++)
        this.al.push(new Particle(mouseX, mouseY));
      return true;
    } else return false;
  }

  this.mousePressed = function(){
    randomify(p);
  }

  this.resize = function(k){
    l.resize(k);
  }
}

function draw() {
  background(0);

  var i;
  var mouse = true;
  for (i = 0; i < s.length; i++){
    if(s[i].draw(mouse)) mouse = false; 
  }

  // if(mouse){
  //   s.push(new System(0));
  //   s[s.length-1].draw(mouse);
  // }
}

function mousePressed(){
  for(var i = 0; i < s.length; i++)
    s[i].mousePressed();
}

function windowResized() {
  console.log("RESIZE");
  for(var i = 0; i < s.length; i++)
    s[i].resize(windowHeight/height);
  resizeCanvas(windowWidth, windowHeight);
}