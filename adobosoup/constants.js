var td;
var thread = [];

function setupConstants(){

	x = [0,0,0,0,0]
	y = [0,0,0,0,0]
	size = [0,0,0,0,0]

	var tempSize = width/4.0;
	x[0] = tempSize;
	x[1] = x[2] = 0;
	x[3] = x[4] = width - tempSize;

	y[1] = y[4] = y[0] = (height - tempSize*2)/2;
	y[2] = y[3] = y[0] + tempSize;

	size[1] = size[2] = size[3] = size[4] = tempSize;
	size[0] = tempSize*2;

	thread = [0,0,0,0,0];
	resetThreads();
	_keyPressed = []
	for(var i = 0; i < 256; i++)
	  _keyPressed.push(false);

	help = [0,0];
// 	help[0] = loadImage("./data/images/Kaloka Help 1.png");
// 	help[0].resize(width,height);
// 	help[1] = loadImage("./data/images/Kaloka Help 2.png");
// 	help[1].resize(width,height);
}

function resetThreads(){
	thread[0] = timer = new Time(x[0],y[0],size[0]);
	thread[1] = new Stack(x[1],y[1],size[1]);
	thread[2] = new Stack(x[2],y[2],size[2]);
	thread[3] = new Stack(x[3],y[3],size[3]);
	thread[4] = new Stack(x[4],y[4],size[4]);
	slowPause = 80;
}

//New Game Screen Constants
var fade = 0;
var fadeDuration = 400;

//GUI Constants
var x;
var y;
var size;

//Game Constants
var NEW_GAME = 0;
var RUNNING = 1;
var LOST = 2;
var GET_NAME = 3;
var HELP_1 = 4;
var HELP_2 = 5;
var gameState = NEW_GAME;

//Thread Run Constants
var slowPause = 80;
var fastPause = 10;

//Thread GUI Constants
var border = 10;
var transitionLength = 10;

//High Score Constants
var loseMessage = "Aww... Better Luck next time!";
var nameHighScore = "None", playerName;
var currHighScore = 0, playerScore;

//Timer Constants
var timer;
var _startTime;
var seekTime;
var switchDelay = 5000;
var hasBeeped = true;

//Sound Constants
var minim;
var intro,type,countDown;
var pong,swipe,hm,drop;
var pongIndex,swipeIndex,hmIndex,dropIndex;
var typeIndex,countIndex;

//Input 
var _keyPressed;

//Help
var help;
