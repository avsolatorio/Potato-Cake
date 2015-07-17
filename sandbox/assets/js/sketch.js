function Parameters(){
  this.g = 0.1;
  this.spread = 0.5;
  this.size = 2;
  this.rate = 3;
  this.max_growth = this.size*this.rate;

  this.threshold = 2;
  this.precision = 80;
  this.viscosity = 10;
}

var p = new Parameters();
var isReversed = false;

function Particle(_x,_y) {
  this.x = constrain(_x,0, width);
  this.y = max(_y,0);
  var dy = random(-p.spread,p.spread),
      dx = random(-p.spread, p.spread);

  this.draw = function(){
    noStroke();
    fill(isReversed ? 0 : 255);
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

function Liquid() {
  var h = [], temp = [], i;
  for(i = 0 ; i < p.precision; i++){
    h.push(0);
    temp.push(0);
  }

  this.draw = function() {
    fill(isReversed ? 0 : 255);
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
     h[left] += k*p.size;
     h[right] += (1-k)*p.size;
     h[left] = min(h[left],temp[left] + p.max_growth);
     h[right] = min(h[right],temp[right] + p.max_growth);

     h[left] = min(h[left],height);
     h[right] = min(h[right],height);

     if(height - h[left] < 5)
      h[left] = height;
    if(height - h[right] < 5)
      h[right] = height;
  }

  this.isFilled = function(point){
    var i;
    for(i = 0; i < h.length; i++)
      if(h[i] < height) return false;
    return true;
  }
}

var al = [];

var l = new Liquid();

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(!isReversed ? 0 : 255);
  fill(125);
  var temp = [],i;
  l.draw();
  for (i = 0; i < al.length; i++) {
    var e = al[i];
    e.loop();
    e.draw();
    if(!l.isIn(e)) temp.push(e);
    else l.add(e);
  }
  
  al = temp;

  if (mouseIsPressed && mouseY < l.y_value(mouseX)) {
    for(i = 0 ; i < p.rate; i++)
      al.push(new Particle(mouseX, mouseY));
  }
  l.equalize();


  if (l.isFilled()) {
    al = [];
    l = new Liquid();
    isReversed = !isReversed;
  }
}
