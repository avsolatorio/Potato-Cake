
function setup() {
  createCanvas(800, 600);
  colorMode(HSB,360,100,100);
  setupConstants();
  // setupSounds();
  startGame();
  console.log(width + " " + height);
}

function startGame(){
	fade = -fadeDuration/2;
  gameState = NEW_GAME;
	playIntro();
}

var prevTime = 0;
function draw() {
  var dt = millis() - prevTime;
  prevTime = millis();
	console.log(1000/dt);
	if(gameState == NEW_GAME){
		background(0);
		setFontColor(0,0,100);
		setBitFontSize(parseInt(height*.003));
		bitTextCenter("H for HELP and ESC to exit game.",0,height*.95,width,0);
		setBitFontSize(parseInt(height*.15)/5);
		bitTextCenter("KALOKA",0,height*.25,width,0);
		setBitFontSize(parseInt(height*.02/5));
		bitTextCenter("made by pepe berba",0,height*.38,width,0);
		setBitFontSize(parseInt(height*.02/5));
		bitTextCenter("HIGHSCORE: " + currHighScore/1000.0 + " " + nameHighScore,0,height*.6,width,0);
		setFontColor(0, 0, abs(fadeDuration/2-(fade = (fade+1)%fadeDuration)));
		bitTextCenter("PRESS ENTER TO START THE GAME",0,height*.65,width,0);
		if(fade < 0){
			fill(0, -fade);
			rect(0,0,width,height);
		}
	} else if(gameState == HELP_1 || gameState == HELP_2){
		image(help[gameState-HELP_1],0,0);
		setBitFontSize((int)(height*.02/5));
		bitText("PRESS ANY KEY TO CONTINUE",parseInt(width*.55), parseInt(height*.9));
	}else if(gameState == RUNNING){
		background(0);
		displayTime();
		animate();

		for(var i = 0; i < thread.length; i++){
		  e = thread[i];
		  e.display();
		}
	}else if(fade++ < 0){
		fill(0,10);
		rectMode(CORNER);
		rect(0,0,width,height);
	}else if(gameState == LOST){
		setBitFontSize(parseInt(height*.10)/5);
		setFontColor(0,0,100);
		bitTextCenter("GAME ENDED",0,height*.30,width,0);
		setBitFontSize(parseInt(height*.02/5));
		bitTextCenter(loseMessage,0,height*.4,width,0);
		bitTextCenter("YOUR SCORE: " + playerScore/1000.0,0,height*.55,width,0);
		if(playerScore > currHighScore){
			bitTextCenter("YOU HAVE SET THE NEW HIGHSCORE!",0,height*.6,width,0);
		}else{
			bitTextCenter("CURRENT HIGHSCORE: " + currHighScore/1000 + " " +  nameHighScore,0,height*.6,width,0);
		}

		setFontColor(0, 0, abs(fadeDuration/2-(fade = (fade+1)%fadeDuration)));
		bitTextCenter("PRESS ENTER TO CONTINUE",0,height*.80,width,0);
	}else if(gameState == GET_NAME){
		background(0);
		setFontColor(0,0,100);
		setBitFontSize((int)(height*.03/5));
		bitText("WHAT IS YOUR NAME?", parseInt(width*.3),parseInt(height*.4));
		bitText("NAME: " + playerName  + ((((++fade)%24) < 12)?"_":""), parseInt(width*.3),parseInt(height*.5));
		bitText("PRESS ENTER TO CONTINUE", parseInt(width*.3),parseInt(height*.6));
	}
}

function keyPressed(){
	if(gameState == NEW_GAME){
		if(keyCode==ENTER){
			startTime();
			type();
		}
		else if(key == 'H'){
			type();
			gameState = HELP_1;
		}
	}else if(gameState == HELP_1){
		type();
		gameState = HELP_2;
	}else if(gameState == HELP_2){
		type();
		gameState = NEW_GAME;
	}
	else if(gameState == LOST){
		if(key==ESC) exit();
		else if(key == ENTER){
			type();
			if(currHighScore >= playerScore) startGame();
			else{
				playerName = "";
				gameState = GET_NAME;
			}
		}
	}else if(gameState == GET_NAME){
		if(key == ENTER){
			if(playerName.length === 0) playerName = "ANON";
			currHighScore = playerScore;
			nameHighScore = playerName;
			startGame();
		}else if(key >= 'a' && key <= 'z'){
			type();
			if(playerName.length < 8)
				playerName = playerName + key;
		}else if(keyCode == 8){
			type();
			if(playerName.length > 0)
				playerName = playerName.substring(0,playerName.length-1);
		}
	}else if (key < 256){
		_keyPressed[key] = true;
	}else if(keyCode < 256){
		_keyPressed[keyCode] = true;
	}
}

function keyReleased(){
if(key < 256)
	_keyPressed[key] = false;
else if(keyCode < 256)
	_keyPressed[keyCode] = false;
}


function animate(){
	var hasAnimation = false;
	for(var i = 0; i < thread.length; i++){
	  e = thread[i];
	  e._animate();
	}
}
