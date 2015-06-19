function startTime(){
	stopIntro();
	resetThreads();
	_startTime = millis() + 4000;
	seekTime = _startTime-3000;
	gameState = RUNNING;
	hasBeeped = false;
	resetCount();
}

function displayTime(){
	var time = millis() - _startTime;
	setFontColor(0,0,100);
		
		if(millis() > seekTime){
				if(seekTime < _startTime){
					seekTime += 1000;
					hasBeeped = false;
				}else if(seekTime == _startTime){
					timer.start();
					next();
					seekTime += switchDelay;
				}else{
					next();
					seekTime += switchDelay;
				}
		}

	if(time < 0){
		var toDisplay = time < -1000 ? parseInt(-time/1000) : "KALOKA!";
		if(abs(millis() - seekTime) > 900)
			setBitFontSize(parseInt((height/40.0)*(1000-(abs(millis() - seekTime)))/100));	
		else{
			setBitFontSize(height/40);	
			if(!hasBeeped){
				hasBeeped = true;
				playCount();
			}
		}
		bitTextCenter(toDisplay,0,0,width,height);
	}else{
		timer.setDisplay(parseFloat(time/1000.0).toFixed(3));
	}
}

function endTime(message){
   loseMessage = message;
   if(true){
		playerScore = millis()-startTime;
		gameState = LOST;
		fade = -100;
   }
}
