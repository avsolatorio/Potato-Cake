var stars,s;
var ms = null;
var time_offset = 10000;
var p;

var prev = 0;
var count = 0;
var framerate = 0;
var delete_rate = 10;

var is_first = true;
var has_adjusted = false;

function Parameters(){
  this.lock = false;
  this.meteor_day = true;
  this.prev_time = 100;
  this.slope = 12;
  this.precision = 100;
  this.no_of_layers = random(20,30);

  this.speed = .1;
  this.manual_time = false;
  this.time_selected = 1000;
  this.curr_hue = 100;

  this.min_offset = 0;
  this.max_offset = height*.7;

  //Stars
  this.number_of_stars = 600;
  this.min_star_size = 1;
  this.max_star_size = 5;
  this.min_brightness = 10
  this.max_brightness = 25;

  //Meteor
  this.meteor_velocity = width*.2;
  this.meteor_trail_length = 5;
  
  this.meteor_max_delay = 1000;
  this.meteor_max_number = 10;

  this.meteor_chance_to_occur = 0.01;
  this.meteor_chance_day = 0.3;


  //Midnight
    this.mid_time = 0;

    this.mid_near_sat= 0;
    this.mid_far_sat = 0;

    this.mid_near_bright = 0;
    this.mid_far_bright = 12;

    this.mid_sky_sat = 0;
    this.mid_sky_bright = 8;
    this.mid_sun_sat = 50;
    this.mid_sun_bright = 100;

  //Pre-sunrise
    this.prerise_time = 7800;
    this.prerise_near_sat= 30;
    this.prerise_far_sat = 10;

    this.prerise_near_bright = 0;
    this.prerise_far_bright = 10;

    this.prerise_sky_sat = 30;
    this.prerise_sky_bright = 20;

    this.prerise_sun_sat = 50;
    this.prerise_sun_bright = 100;

  //Sunrise
    this.rise_time = 8500;
    this.rise_near_sat= 80;
    this.rise_far_sat = 50;

    this.rise_near_bright = 20;
    this.rise_far_bright = 40;

    this.rise_sky_sat = 40;
    this.rise_sky_bright = 70;

    this.rise_sun_sat = 50;
    this.rise_sun_bright = 100;

  //Post-sunrise
    this.postrise_time = 9200;
    this.postrise_near_sat= 100;
    this.postrise_far_sat = 50;

    this.postrise_near_bright = 40;
    this.postrise_far_bright = 100;

    this.postrise_sky_sat = 20;
    this.postrise_sky_bright = 90;

    this.postrise_sun_sat = 50;
    this.postrise_sun_bright = 100;
  

  //Afternoon
    this.noon_time = 12000;
    this.noon_near_sat= 70;
    this.noon_far_sat = 50;

    this.noon_near_bright = 60;
    this.noon_far_bright = 100;

    this.noon_sky_sat = 20;
    this.noon_sky_bright = 100;

    this.noon_sun_sat = 50;
    this.noon_sun_bright = 100;

  //Pre-sunset
    this.preset_time = 14500;

    this.preset_near_sat= 100;
    this.preset_far_sat = 50;

    this.preset_near_bright = 20;
    this.preset_far_bright = 100;

    this.preset_sky_sat = 25;
    this.preset_sky_bright = 100;

    this.preset_sun_sat = 50;
    this.preset_sun_bright = 100;

  //Sunset
    this.set_time = 15000;

    this.set_near_sat= 100;
    this.set_far_sat = 70;

    this.set_near_bright = 0;
    this.set_far_bright = 45;

    this.set_sky_sat = 30;
    this.set_sky_bright = 100;

    this.set_sun_sat = 50;
    this.set_sun_bright = 100;

  //Post-sunset
    this.postset_time = 16500;
    this.postset_near_sat= 100;
    this.postset_far_sat = 20;

    this.postset_near_bright = 0;
    this.postset_far_bright = 15;

    this.postset_sky_sat = 15;
    this.postset_sky_bright = 15;

    this.postset_sun_sat = 50;
    this.postset_sun_bright = 100;

  this.get_fill = function(i){
    var time = this.get_time();
    var near_sat, far_sat, near_bright, far_sat;

    if(time < this.prerise_time){
      near_sat =    map(time, 0, this.prerise_time, this.mid_near_sat, this.prerise_near_sat);
      far_sat =     map(time, 0, this.prerise_time, this.mid_far_sat, this.prerise_far_sat);
      near_bright = map(time, 0, this.prerise_time, this.mid_near_bright, this.prerise_near_bright);
      far_bright =  map(time, 0, this.prerise_time, this.mid_far_bright, this.prerise_far_bright);
    }else if(time < this.rise_time){
      near_sat =    map(time, this.prerise_time, this.rise_time, this.prerise_near_sat, this.rise_near_sat);
      far_sat =     map(time, this.prerise_time, this.rise_time, this.prerise_far_sat, this.rise_far_sat);
      near_bright = map(time, this.prerise_time, this.rise_time, this.prerise_near_bright, this.rise_near_bright);
      far_bright =  map(time, this.prerise_time, this.rise_time, this.prerise_far_bright, this.rise_far_bright);
    }
    else if(time < this.postrise_time){
      near_sat =    map(time, this.rise_time, this.postrise_time, this.rise_near_sat, this.postrise_near_sat);
      far_sat =     map(time, this.rise_time, this.postrise_time, this.rise_far_sat, this.postrise_far_sat);
      near_bright = map(time, this.rise_time, this.postrise_time, this.rise_near_bright, this.postrise_near_bright);
      far_bright =  map(time, this.rise_time, this.postrise_time, this.rise_far_bright, this.postrise_far_bright);
    }
    else if(time < this.noon_time){
      near_sat =    map(time, this.postrise_time, this.noon_time, this.postrise_near_sat, this.noon_near_sat);
      far_sat =     map(time, this.postrise_time, this.noon_time, this.postrise_far_sat, this.noon_far_sat);
      near_bright = map(time, this.postrise_time, this.noon_time, this.postrise_near_bright, this.noon_near_bright);
      far_bright =  map(time, this.postrise_time, this.noon_time, this.postrise_far_bright, this.noon_far_bright);
    }
    else if(time < this.preset_time){
      near_sat =    map(time, this.noon_time, this.preset_time, this.noon_near_sat, this.preset_near_sat);
      far_sat =     map(time, this.noon_time, this.preset_time, this.noon_far_sat, this.preset_far_sat);
      near_bright = map(time, this.noon_time, this.preset_time, this.noon_near_bright, this.preset_near_bright);
      far_bright =  map(time, this.noon_time, this.preset_time, this.noon_far_bright, this.preset_far_bright);
    }
    else if(time < this.set_time){
      near_sat =    map(time, this.preset_time, this.set_time, this.preset_near_sat, this.set_near_sat);
      far_sat =     map(time, this.preset_time, this.set_time, this.preset_far_sat, this.set_far_sat);
      near_bright = map(time, this.preset_time, this.set_time, this.preset_near_bright, this.set_near_bright);
      far_bright =  map(time, this.preset_time, this.set_time, this.preset_far_bright, this.set_far_bright);
    }
    else if(time < this.postset_time){
      near_sat =    map(time, this.set_time, this.postset_time, this.set_near_sat, this.postset_near_sat);
      far_sat =     map(time, this.set_time, this.postset_time, this.set_far_sat, this.postset_far_sat);
      near_bright = map(time, this.set_time, this.postset_time, this.set_near_bright, this.postset_near_bright);
      far_bright =  map(time, this.set_time, this.postset_time, this.set_far_bright, this.postset_far_bright);
    }
    else if(time < 24000){
      near_sat =    map(time, this.postset_time, 24000, this.postset_near_sat, this.mid_near_sat);
      far_sat =     map(time, this.postset_time, 24000, this.postset_far_sat, this.mid_far_sat);
      near_bright = map(time, this.postset_time, 24000, this.postset_near_bright, this.mid_near_bright);
      far_bright =  map(time, this.postset_time, 24000, this.postset_far_bright, this.mid_far_bright);
    }
    
    return color(p.curr_hue, map(i,0,p.no_of_layers,near_sat,far_sat), map(i,0,p.no_of_layers,near_bright,far_bright));    
  }

  this.get_sun_fill = function(){
   var time = this.get_time();
    var sun_sat,sun_bright;

    if(time < this.prerise_time){
      sun_sat =    map(time, 0, this.prerise_time, this.mid_sun_sat, this.prerise_sun_sat);
      sun_bright =     map(time, 0, this.prerise_time, this.mid_sun_bright, this.prerise_sun_bright);
    }else if(time < this.rise_time){
      sun_sat =    map(time, this.prerise_time, this.rise_time, this.prerise_sun_sat, this.rise_sun_sat);
      sun_bright =     map(time, this.prerise_time, this.rise_time, this.prerise_sun_bright, this.rise_sun_bright);
    }
    else if(time < this.postrise_time){
      sun_sat =    map(time, this.rise_time, this.postrise_time, this.rise_sun_sat, this.postrise_sun_sat);
      sun_bright =     map(time, this.rise_time, this.postrise_time, this.rise_sun_bright, this.postrise_sun_bright);
    }
    else if(time < this.noon_time){
      sun_sat =    map(time, this.postrise_time, this.noon_time, this.postrise_sun_sat, this.noon_sun_sat);
      sun_bright =     map(time, this.postrise_time, this.noon_time, this.postrise_sun_bright, this.noon_sun_bright);
    }
    else if(time < this.preset_time){
      sun_sat =    map(time, this.noon_time, this.preset_time, this.noon_sun_sat, this.preset_sun_sat);
      sun_bright =     map(time, this.noon_time, this.preset_time, this.noon_sun_bright, this.preset_sun_bright);
    }
    else if(time < this.set_time){
      sun_sat =    map(time, this.preset_time, this.set_time, this.preset_sun_sat, this.set_sun_sat);
      sun_bright =     map(time, this.preset_time, this.set_time, this.preset_sun_bright, this.set_sun_bright);
    }
    else if(time < this.postset_time){
      sun_sat =    map(time, this.set_time, this.postset_time, this.set_sun_sat, this.postset_sun_sat);
      sun_bright =     map(time, this.set_time, this.postset_time, this.set_sun_bright, this.postset_sun_bright);
    }
    else if(time < 24000){
      sun_sat =    map(time, this.postset_time, 24000, this.postset_sun_sat, this.mid_sun_sat);
      sun_bright =     map(time, this.postset_time, 24000, this.postset_sun_bright, this.mid_sun_bright);
    }
    
    return color(p.curr_hue, sun_sat, sun_bright); 
  }

  this.get_sky_fill = function(){
    var time = this.get_time();
    var sky_sat,sky_bright;

    if(time < this.prerise_time){
      sky_sat =    map(time, 0, this.prerise_time, this.mid_sky_sat, this.prerise_sky_sat);
      sky_bright =     map(time, 0, this.prerise_time, this.mid_sky_bright, this.prerise_sky_bright);
    }else if(time < this.rise_time){
      sky_sat =    map(time, this.prerise_time, this.rise_time, this.prerise_sky_sat, this.rise_sky_sat);
      sky_bright =     map(time, this.prerise_time, this.rise_time, this.prerise_sky_bright, this.rise_sky_bright);
    }
    else if(time < this.postrise_time){
      sky_sat =    map(time, this.rise_time, this.postrise_time, this.rise_sky_sat, this.postrise_sky_sat);
      sky_bright =     map(time, this.rise_time, this.postrise_time, this.rise_sky_bright, this.postrise_sky_bright);
    }
    else if(time < this.noon_time){
      sky_sat =    map(time, this.postrise_time, this.noon_time, this.postrise_sky_sat, this.noon_sky_sat);
      sky_bright =     map(time, this.postrise_time, this.noon_time, this.postrise_sky_bright, this.noon_sky_bright);
    }
    else if(time < this.preset_time){
      sky_sat =    map(time, this.noon_time, this.preset_time, this.noon_sky_sat, this.preset_sky_sat);
      sky_bright =     map(time, this.noon_time, this.preset_time, this.noon_sky_bright, this.preset_sky_bright);
    }
    else if(time < this.set_time){
      sky_sat =    map(time, this.preset_time, this.set_time, this.preset_sky_sat, this.set_sky_sat);
      sky_bright =     map(time, this.preset_time, this.set_time, this.preset_sky_bright, this.set_sky_bright);
    }
    else if(time < this.postset_time){
      sky_sat =    map(time, this.set_time, this.postset_time, this.set_sky_sat, this.postset_sky_sat);
      sky_bright =     map(time, this.set_time, this.postset_time, this.set_sky_bright, this.postset_sky_bright);
    }
    else if(time < 24000){
      sky_sat =    map(time, this.postset_time, 24000, this.postset_sky_sat, this.mid_sky_sat);
      sky_bright =     map(time, this.postset_time, 24000, this.postset_sky_bright, this.mid_sky_bright);
    }
    
    return color(p.curr_hue, sky_sat, sky_bright); 
  }

  this.get_sky_brightness = function(){
    var time = this.get_time();
    var sky_sat,sky_bright;

    if(time < this.prerise_time){
      sky_sat =    map(time, 0, this.prerise_time, this.mid_sky_sat, this.prerise_sky_sat);
      sky_bright =     map(time, 0, this.prerise_time, this.mid_sky_bright, this.prerise_sky_bright);
    }else if(time < this.rise_time){
      sky_sat =    map(time, this.prerise_time, this.rise_time, this.prerise_sky_sat, this.rise_sky_sat);
      sky_bright =     map(time, this.prerise_time, this.rise_time, this.prerise_sky_bright, this.rise_sky_bright);
    }
    else if(time < this.postrise_time){
      sky_sat =    map(time, this.rise_time, this.postrise_time, this.rise_sky_sat, this.postrise_sky_sat);
      sky_bright =     map(time, this.rise_time, this.postrise_time, this.rise_sky_bright, this.postrise_sky_bright);
    }
    else if(time < this.noon_time){
      sky_sat =    map(time, this.postrise_time, this.noon_time, this.postrise_sky_sat, this.noon_sky_sat);
      sky_bright =     map(time, this.postrise_time, this.noon_time, this.postrise_sky_bright, this.noon_sky_bright);
    }
    else if(time < this.preset_time){
      sky_sat =    map(time, this.noon_time, this.preset_time, this.noon_sky_sat, this.preset_sky_sat);
      sky_bright =     map(time, this.noon_time, this.preset_time, this.noon_sky_bright, this.preset_sky_bright);
    }
    else if(time < this.set_time){
      sky_sat =    map(time, this.preset_time, this.set_time, this.preset_sky_sat, this.set_sky_sat);
      sky_bright =     map(time, this.preset_time, this.set_time, this.preset_sky_bright, this.set_sky_bright);
    }
    else if(time < this.postset_time){
      sky_sat =    map(time, this.set_time, this.postset_time, this.set_sky_sat, this.postset_sky_sat);
      sky_bright =     map(time, this.set_time, this.postset_time, this.set_sky_bright, this.postset_sky_bright);
    }
    else if(time < 24000){
      sky_sat =    map(time, this.postset_time, 24000, this.postset_sky_sat, this.mid_sky_sat);
      sky_bright =     map(time, this.postset_time, 24000, this.postset_sky_bright, this.mid_sky_bright);
    }
    
    return sky_bright;
  }


  this.get_time = function(){
    if(p.manual_time) return p.time_selected;
    else{
      var ret = (time_offset + millis()*this.speed)%24000;
       if(this.prev_time > ret){
        this.curr_hue = random(0,100);
        this.meteor_day = random(0,1) < this.meteor_chance_day;
      }
       this.prev_time = ret;

       if(!ms && (ret < 2000 || ret > 22000) && !this.lock && this.meteor_day){
          this.lock = true;
          var rnd = random(1);
          if(ret % 1000 < 3 && rnd < p.meteor_chance_to_occur)
            ms = new MeteorShower(this.get_angle());
          this.lock = false;
         }
      return ret;
    }
  }

  this.get_angle = function(){
    return map(p.get_time(), 0, 24000, 0, 2*PI) + PI;
  }
}

function Star(_size){
  var theta,r,size;
  theta = random(-PI, PI);
  r = random(height*.5,1.3*height);
  size = _size

  this.resize = function(k){
    r *= k;
  }

  this.draw = function(){

    var curr = p.get_angle() + theta;
    while(curr > PI*2) curr -= PI*2;
    if(curr > PI*3/2)  return;
    if(curr < PI/2) return;

    push();

    rotate(theta);
    noStroke();

    var b = p.get_sky_brightness();
    if(b <= p.max_brightness) {
      var show_size = map(b, p.max_brightness, p.min_brightness, p.max_star_size, 0);
      
      if(size - show_size > 1){
        fill(100);
        ellipse(0,r,size - show_size,size - show_size);
      }else {
        fill(100, map(show_size - size, 0, 1, 0, 100));
        stroke(100,map(1 - (show_size - size), 0, 1, 0, 100));;
        point(0,r);
      }
    }
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  p = new Parameters();
  make_landscape();
  // setup_controls();
}

function setup_controls(){
  var gui = new dat.GUI();

  var general = gui.addFolder("GENERAL");
    general.add(p, "manual_time");
    general.add(p, "time_selected", 0, 24000).onChange(function(){
      time_offset = (p.time_selected - millis()*p.speed) + 24000;
    });
    general.add(p, "curr_hue",0,100);
    general.add(p, "speed",0,10);

  var prerise = gui.addFolder("PRE-SUNRISE");
    prerise.add(p,"prerise_time",0, 24000);
    prerise.add(p,"prerise_near_sat", 0,100);
    prerise.add(p,"prerise_far_sat", 0,100);
    prerise.add(p,"prerise_near_bright", 0,100);
    prerise.add(p,"prerise_far_bright", 0,100);
    prerise.add(p,"prerise_sky_sat", 0,100);
    prerise.add(p,"prerise_sky_bright", 0,100);
    prerise.add(p,"prerise_sun_sat", 0,100);
    prerise.add(p,"prerise_sun_bright", 0,100);

  var rise = gui.addFolder("SUNRISE");
    rise.add(p,"rise_time",0, 24000);
    rise.add(p,"rise_near_sat", 0,100);
    rise.add(p,"rise_far_sat", 0,100);
    rise.add(p,"rise_near_bright", 0,100);
    rise.add(p,"rise_far_bright", 0,100);
    rise.add(p,"rise_sky_sat", 0,100);
    rise.add(p,"rise_sky_bright", 0,100);
    rise.add(p,"rise_sun_sat", 0,100);
    rise.add(p,"rise_sun_bright", 0,100);

  var postrise = gui.addFolder("POST-SUNRISE");
    postrise.add(p,"postrise_time",0, 24000);
    postrise.add(p,"postrise_near_sat", 0,100);
    postrise.add(p,"postrise_far_sat", 0,100);
    postrise.add(p,"postrise_near_bright", 0,100);
    postrise.add(p,"postrise_far_bright", 0,100);
    postrise.add(p,"postrise_sky_sat", 0,100);
    postrise.add(p,"postrise_sky_bright", 0,100);
    postrise.add(p,"postrise_sun_sat", 0,100);
    postrise.add(p,"postrise_sun_bright", 0,100);

  var noon = gui.addFolder("NOON");
    noon.add(p,"noon_time",0, 24000);
    noon.add(p,"noon_near_sat", 0,100);
    noon.add(p,"noon_far_sat", 0,100);
    noon.add(p,"noon_near_bright", 0,100);
    noon.add(p,"noon_far_bright", 0,100);
    noon.add(p,"noon_sky_sat", 0,100);
    noon.add(p,"noon_sky_bright", 0,100);
    noon.add(p,"noon_sun_sat", 0,100);
    noon.add(p,"noon_sun_bright", 0,100);

  var preset = gui.addFolder("PRE-SUNSET");
    preset.add(p,"preset_time",0, 24000);
    preset.add(p,"preset_near_sat", 0,100);
    preset.add(p,"preset_far_sat", 0,100);
    preset.add(p,"preset_near_bright", 0,100);
    preset.add(p,"preset_far_bright", 0,100);
    preset.add(p,"preset_sky_sat", 0,100);
    preset.add(p,"preset_sky_bright", 0,100);
    preset.add(p,"preset_sun_sat", 0,100);
    preset.add(p,"preset_sun_bright", 0,100);

  var set = gui.addFolder("SUNSET");
    set.add(p,"set_time",0, 24000);
    set.add(p,"set_near_sat", 0,100);
    set.add(p,"set_far_sat", 0,100);
    set.add(p,"set_near_bright", 0,100);
    set.add(p,"set_far_bright", 0,100);
    set.add(p,"set_sky_sat", 0,100);
    set.add(p,"set_sky_bright", 0,100);
    set.add(p,"set_sun_sat", 0,100);
    set.add(p,"set_sun_bright", 0,100);

  var postset = gui.addFolder("POST-SUNSET");
    postset.add(p,"postset_time",0, 24000);
    postset.add(p,"postset_near_sat", 0,100);
    postset.add(p,"postset_far_sat", 0,100);
    postset.add(p,"postset_near_bright", 0,100);
    postset.add(p,"postset_far_bright", 0,100);
    postset.add(p,"postset_sky_sat", 0,100);
    postset.add(p,"postset_sky_bright", 0,100);
    postset.add(p,"postset_sun_sat", 0,100);
    postset.add(p,"postset_sun_bright", 0,100);

  var mid = gui.addFolder("MIDNIGHT");
    mid.add(p,"mid_time",0, 24000);
    mid.add(p,"mid_near_sat", 0,100);
    mid.add(p,"mid_far_sat", 0,100);
    mid.add(p,"mid_near_bright", 0,100);
    mid.add(p,"mid_far_bright", 0,100);
    mid.add(p,"mid_sky_sat", 0,100);
    mid.add(p,"mid_sky_bright", 0,100);
    mid.add(p,"mid_sun_sat", 0,100);
    mid.add(p,"mid_sun_bright", 0,100);
}

function make_landscape(){    
  s = [];
  stars = [];
  var i,j;
  for(i = p.no_of_layers ; i > 0; i--){
    s.push(new Landscape(i*(height*.7/p.no_of_layers), i));
    for(j = 0; j < 30; j++)
      s[p.no_of_layers-i].equalize();
  } 

  for(i = p.max_star_size; i >= p.min_star_size; i--)
    for(j = 0; j <= p.number_of_stars/(i*i); j++)
      stars.push(new Star(i));
}

function Landscape(offset, _i) {
  var index = _i;
  var h = [], temp = [], i;
  for(i = 0 ; i < p.precision; i++){
    // var x = offset*noise(offset + i);
    var x = random(offset-100*(2 - offset/height),offset);
    h.push(x);
    temp.push(x);
  }

  this.draw = function() {
    var temp = p.get_fill(index);
    fill(temp);
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
      var den = 3
      var left = h[(i+h.length-1)%h.length];
      var right = h[(i+1)%h.length];

      if (i == 0 || abs(left-h[i]) < p.slope ) {
        left = 0;
        den--;
      }

      if (i==h.length-1 || abs(right-h[i]) < p.slope) {
        right = 0;
        den--;
      }
      temp[i] = (left+right+h[i])/(den);
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

function MeteorShower(_angle){
  var angle = _angle;
  var queue = [];
  var draw = [];

  var general_source = createVector(random(0, -width/5), random(0, height*.05));
  var general_direction = createVector(random(width/2, width), random(general_source.y, height*.3));

  if (random(1) > 0.5) {
    general_source.x = width - general_source.x;
    general_direction.x = width - general_direction.x;
  }
  general_direction.sub(general_source).setMag(width*5).add(general_source);


  var time = millis();
  var no = random(p.meteor_max_number);
  for (var i = 0; i < no; i++) {
    var m = new Meteor(general_source, general_direction, time);
    time = m.time_to_go;
    queue.push(m);
  }
  

  this.draw = function(){
    push();
    rotate(-angle);
    translate(-width/2,-height);
    while(queue.length != 0  && queue[0].shouldGo())
        draw.push(queue.shift());

     temp = [];

     for(var i = 0; i < draw.length; i++){
        var e = draw[i];
        e.draw();
        if(!e.isOut())
         temp.push(e);
     }
     draw = temp;
     pop();
  }

  this.is_done = function(){
    return queue.length + draw.length == 0;
  }

  this.resize = function(k){
    for(var i = 0; i < draw.length; i++)
      draw[i].resize(k);
    for(var j = 0; j <  queue.length; j++)
      queue[j].resize(k);
  }

  function Meteor(source,target,curr_time){
    var trail = [];

    this.time_to_go = curr_time + round(random(0, p.meteor_max_delay));
    var pos = createVector(source.x + random(-100, 100), source.y + random(-100, 100));
    var vel = target.copy().sub(pos).normalize().setMag(p.meteor_velocity);

    trail.push(pos.copy());


    this.draw = function() {
      pos.add(vel);
      trail.push(pos.copy());

      if (trail.length > p.meteor_trail_length)
        trail.shift();

      for (var i = 0; i < trail.length-1; i++) {
        noFill();
        strokeWeight(1);
        stroke(100, 20*(i+1)/p.meteor_trail_length);
        var a = trail[i];
        var b = trail[i+1];
        line(a.x, a.y, b.x, b.y);
      }
    }

    this.shouldGo = function() {
      return millis() > this.time_to_go;
    } 

    this.isOut = function() {
      var x = trail[trail.length-1].x;
      return x < 0 || x > width;
    }

    this.resize = function(k){
      pos.y *= k;
      pos.x *= k;
    }
  }
}

function draw() {
  background(p.get_sky_fill());
  noStroke();

  var theta = p.get_angle();

  push();
    
    translate(width/2, height);

    fill(p.get_sun_fill());
    if(is_first){
      textAlign(CENTER,CENTER);
      textSize(15);
      text("simple landscape", -60, -height*.9, 120,0);
      textSize(10);
      text("by pepe berba", -60, -height*.9 + 30, 120,0);
    }
    if(p.get_time() > 12000){
      is_first = false;
    }

    rotate(theta);

    for(i = 0; i < stars.length; i++)
      stars[i].draw();



    ellipse(0, -height*.9, 120, 120);


    if(ms){
        ms.draw();
        if(ms.is_done())
          ms = null;
      }
      
  pop();

  for (var i = 0; i < s.length; i++)
    s[i].draw();

  stroke(100);
  noFill();
  count++;
  
  if(millis() > prev + 1000){
    framerate = count;
    count = 0;
    if(framerate < 10){
      has_adjusted = true;
      if(p.precision > 20){
        p.precision /= 2;
        p.number_of_stars /= 2;
         make_landscape();
      }else{
        p.number_of_stars /= 2;
        stars = [];
        for(i = p.max_star_size; i >= p.min_star_size; i--)
          for(j = 0; j <= p.number_of_stars/(i*i); j++)
            stars.push(new Star(i));

      }
    }else has_adjusted = false;
    prev = millis();
  }

  if(has_adjusted){
    rectMode(CORNER);
      text("It looks like your device's browser can't handle the simple landscape. Reducing complexity. Try viewing this on a laptop. Sorry :(", 20, 20, 200,200);      

    }
}

// function mousePressed(){
//   p.curr_hue = map(mouseX,0,width,0,100);
// }

// function mouseDragged(){
//   p.curr_hue = map(mouseX,0,width,0,100);
// }

function windowResized() {
  var k = windowHeight/height;
  for(var i = 0; i < s.length; i++)
    s[i].resize(k);

  if(ms) ms.resize(k)
  for (var j = 0; j < stars.length; j++)
    stars[j].resize(k);
  resizeCanvas(windowWidth, windowHeight);
}
