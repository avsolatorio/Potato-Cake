function setupSounds(){
// 	minim = new Minim(this);
// 	intro = minim.loadFile("music/intro.mp3");
// 	type = new AudioPlayer[5];
// 	for(int i = 0; i < type.length; i++)
// 		type[i] = minim.loadFile("music/type.mp3");
// 	typeIndex = 0;
// 	countDown = new AudioPlayer[4];
// 	countDown[0] = minim.loadFile("music/Tre.mp3");
// 	countDown[1] = minim.loadFile("music/To.mp3");
// 	countDown[2] = minim.loadFile("music/Juan.mp3");
// 	countDown[3] = minim.loadFile("music/Kaloka.mp3");
// 	pong = new AudioPlayer[3];
// 	swipe = new AudioPlayer[3];
// 	drop = new AudioPlayer[3];
// 	hm = new AudioPlayer[3];
// 	for(int i = 0; i < 3; i++){
// 		pong[i] = minim.loadFile("music/pong.mp3");
// 		swipe[i] = minim.loadFile("music/swipe.mp3");
// 		drop[i] = minim.loadFile("music/drop.mp3");
// 		hm[i] = minim.loadFile("music/hm.mp3");
// 	}
}

function pong(){
// 	pong[pongIndex].rewind();
// 	pong[pongIndex].play();
// 	pongIndex++;
//         pongIndex%=pong.length;
}

function swipe(){
// 	swipe[swipeIndex].rewind();
// 	swipe[swipeIndex].play();
// 	swipeIndex++;
//         swipeIndex%=swipe.length;
}
function drop(){
// 	drop[dropIndex].rewind();
// 	drop[dropIndex].play();
// 	dropIndex++;
//         dropIndex%=drop.length;
}

function hm(){
// 	hm[hmIndex].rewind();
// 	hm[hmIndex].play();
// 	hmIndex++;
//         hmIndex%=hm.length;
}

function resetCount(){
	countIndex = 0;
}

function playCount(){
// 	countDown[countIndex].rewind();
// 	countDown[countIndex].play();
// 	countIndex++;
}

function type(){
// 	type[typeIndex].rewind();
// 	type[typeIndex].play();
// 	typeIndex = (typeIndex+1)%type.length;
}

function playIntro(){

// 	intro.rewind();
// 	intro.play();
// 	intro.loop();
}

function stopIntro(){
// 	intro.pause();
}
