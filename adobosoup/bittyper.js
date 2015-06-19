/*
BitTyper by Pepe Berba
https://github.com/pepeberba/Kahon-Legacy

Used to display bit font. 

Things to add:
Adding alignment feature
Letter outlines
Dynamic Resizing of Font
Dynamic sized characters (current each character has the same width)
*/

//Font Color
var _fontH = 255; 
var _fontS = 0;
var _fontB = 100;
var _fontAlpha = 100;
//Font size
var _fontSize = 4;

//Spacing
var _fontLine = 1.3;
var _fontSpacing = 1.3;

//Font
var _fontLetter = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4198532, 330, 11512810, 33193151, 17895697, 24821070, 196, 6325286, 13124108, 4096, 145536, 6422528, 14336, 4194304, 1118480, 33080895, 4329604, 32570911, 33059359, 17333809, 33061951, 33094719, 17318431, 33095231, 17333823, 131200, 6422656, 4260932, 459200, 4473092, 4223551, 32568895, 18415167, 33094823, 32539711, 16303663, 32545855, 1088575, 33092671, 18415153, 66195615, 33079824, 18414889, 32539681, 1125701311, 51955263, 33080895, 1113663, 33343039, 51969191, 33061951, 4329631, 972604977, 4532785, 33216049, 28774875, 4357681, 32575775, 7373863, 151261249, 29901340, 324, 32505856, 194, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6360134, 4329604, 12869900, 939232, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6422528, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

function setFontColor(h, s, b, alpha) {
  if(alpha === undefined)
    alpha = 100;
  _fontH = h;
  _fontS = s;
  _fontB = b;
  _fontAlpha = alpha;
}


function setBitFontSize(fontSize) {
  _fontSize = fontSize;
}

function setBitFontLine(line) {
  _fontLine = line;
}

function setBitFontSpacing(space) {
  _fontSpacing = space;
}

function bitChar(c, x, y) {
  colorMode(HSB, 360, 100, 100, 100);
  stroke(_fontH, _fontS, _fontB, _fontAlpha);
  noStroke();
  fill(_fontH, _fontS, _fontB, _fontAlpha);
  var pattern = _fontLetter[c];

  push();
  translate(x, y);
  for (var i = 0; i < 5; i++)
    for (var j = 0; j < 5; j++) 
      if ((pattern&(1<<(j*5 + i)))!== 0){
        rect(i*_fontSize, j*_fontSize, _fontSize, _fontSize);
      }

  pop();
}


function bitText(text, x, y, textWidth, textHeight, padding) {
    // text = text + "";
  if(padding === undefined){
    bitText(text, x, y, textWidth, textHeight, 0);
    return;
  }
  
  if(textWidth === undefined){
    bitText(text, x, y, 1<<29, 1<<29);
    return;
  }

  push();
  rectMode(CORNER);
  translate(x+padding, y+padding);
  textWidth-=padding*2;
  textHeight-=padding*2;
  var currX = 0;
  var currY = 0;
  
  var toPrint = text.toUpperCase()
  
  for (var i = 0; i < toPrint.length; i++)
  {
    bitChar(toPrint.charCodeAt(i), currX, currY);
    currX += 5*_fontSize*_fontSpacing;
  }
  
  pop();
}


function bitTextCenter(text, x, y, textWidth, textHeight){
  
  if(textWidth === undefined){
    textWidth = 0;
    textHeight = 0;
  }
  
  var currFontSize = _fontSize*5;
  text = text + "";
  bitText(text, parseInt(x + (textWidth - bitTextWidth(text))/2), parseInt( y + (textHeight-currFontSize)/2));
}
function bitTextWidth(s) {
  return parseInt(s.length*5*_fontSize*_fontSpacing);
}
