var which = 1;

function setup() {
    var myCanvas = createCanvas(512, 512);
    myCanvas.parent('sketch');
    
}

function draw() {
    background(100);
    if(which == 1){
        draw1();
    } else if(which == 2){
        draw2();
    } else if(which == 3){
        draw3();
    } else if(which == 4){
        draw4();
    }
}


function draw1(){
    for(let y = 0; y < height; y+=10){
        line(0,y, width-y, 0);
    }
}

function draw2(){
    ellipseMode(CENTER);
    let dr = random(15);
    for(let r = height-20; r > 0; r-=dr){
        dr = random(15);
        ellipse(width/2,height/2, r,r);
    }
}

function draw3(){
    for(let x = 0; x < width; x++){
        stroke(map(x, 0, width, 0, 255));
        line(x,0,x,height);
    }
    stroke(0);
}

function draw4(){
    noStroke();
    background(150);
    // for(let x = 16.66; x < width; x+=(width-16.66)/5){for(let y = 16.66; y < height; y+=(height-16.66)/5){fill(80);rect(x, y, 100,100);}}
    let d = (width-(width/6))/30;
    for(let x = d; x < width; x+=(width-d)/5){
        for(let y = d; y < height; y+=(height-d)/5){
            fill(80);
            rect(x, y, width/6,width/6);
        }
    }
    stroke(0);
}

function keyPressed(){
    if(key == '1'){
        resizeCanvas(512, 512);
        which = 1;
    } else if(key == '2'){
        resizeCanvas(512, 512);
        which = 2;
    } else if(key == '3'){
        resizeCanvas(512, 512);
        which = 3;
    } else if(key == '4'){
        resizeCanvas(512, 512);
        which = 4;
    }
}