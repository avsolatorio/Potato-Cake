function next(){
    console.log("NEXT");
    //Random
    for(var i = 0; i < 5; i++){
        var index = parseInt(random(i+1));
        var temp = thread[i];
        thread[i] = thread[index];
        thread[index] = temp;
    }
    i = 0;
    for(i = 0; i < 5; i++){
        if(!thread[i].hasStarted()){
            temp = thread[i];
            thread[i] = thread[0];
            thread[0] = temp;
            break;
        }
    }

    for(i = 0; i < 5; i++){
        thread[i].setAnimation(x[i],y[i],size[i]);
        if(i===0) thread[i].fast();
        else thread[i].slow();
    }
    console.log(thread[0].message);
    thread[0].start();
    slowPause = max(fastPause,slowPause-5);
}