var img, imgBck, seed;
var brightAmount = 20;
function preload(){
    // let imagePath = './FortAdamsSmall.png'
    let imagePath = './FortAdams.png'
    img = loadImage(imagePath);
    imgBck = loadImage(imagePath);
}

function setup() {
    // var myCanvas = createCanvas(400, 300);
    var myCanvas = createCanvas(600, 450);

    myCanvas.parent('sketch');
    seed = 904734;
    noiseSeed(seed);
    select("#seed").elt.innerHTML = 'Seed is: ' + seed;
    img.resize(width, height);
    imgBck.resize(width, height);
    image(img, 0, 0, width, height);
}

function writeColor(img, x, y, red, green, blue, alpha) {
    var index = (x + y * width) * 4;
    img.pixels[index] = red;
    img.pixels[index + 1] = green;
    img.pixels[index + 2] = blue;
    img.pixels[index + 3] = alpha;
}

function draw() {
    if(keyIsDown(89)){
        img.loadPixels();
        for(let x = 0; x < img.width; x++){
            for(let y = 0; y < img.height; y++){
                var idx = (x + y * width) * 4;
                let r = img.pixels[idx];
                let g = img.pixels[idx + 1];
                let b = img.pixels[idx + 2];
                let a = img.pixels[idx + 3];
                let r2 = r + ((noise(r)-.5)*r);
                let g2 = g + ((noise(g)-.5)*g);
                let b2 = b + ((noise(b)-.5)*b);
                writeColor(img, x, y, r2, g2, b2, a);
                
            }
        }
        img.updatePixels();
    }
    image(img, 0, 0, width, height);
}

function keyTyped(){
    if(key == 'c'){
        img.copy(imgBck, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    } else if(key == 'u'){
        seed = floor(random(1000000));
        noiseSeed(seed);
        select("#seed").elt.innerHTML = 'Seed is: ' + seed;
    }
    img.loadPixels();
    for(let x = 0; x < img.width; x++){
        for(let y = 0; y < img.height; y++){
            var idx = (x + y * width) * 4;
            let r = img.pixels[idx];
            let g = img.pixels[idx + 1];
            let b = img.pixels[idx + 2];
            let a = img.pixels[idx + 3];
            if(key == 'i'){
                writeColor(img, x, y, 255-r, 255-g, 255-b, a);
            } else if(key == 'r'){
                writeColor(img, x, y, r, 0, 0, a);
            } else if(key == 'b'){
                writeColor(img, x, y, r + brightAmount, g + brightAmount, b + brightAmount, a);
            } else if(key == 'd'){
                writeColor(img, x, y, r - brightAmount, g - brightAmount, b - brightAmount, a);
            } else if(key == 'w'){
                writeColor(img, x, y, g, b, r, a);
            } else if(key == 'g'){
                let gray = (r + g + b) /3;
                writeColor(img, x, y, gray, gray, gray, a);
            } else if(key == 't'){
                let avg = (r + g + b)/3;
                let bw = avg<140 ? 0 : 255;
                writeColor(img, x, y, bw, bw, bw, a);
            } else if(key == 's'){
                let sepiaAmt = 20;
                writeColor(img, x, y, r + 2*sepiaAmt, g + sepiaAmt, b - sepiaAmt, a);
            } else if(key == 'f'){
                let sum = r+g+b;
                if(sum < 181){
                    writeColor(img, x, y, 0, 51, 76, a);
                } else if(sum < 363){
                    writeColor(img, x, y, 217, 26, 33, a);
                } else if(sum < 545){
                    writeColor(img, x, y, 112, 150, 158, a);
                } else {
                    writeColor(img, x, y, 252, 227, 166, a);
                }
            }
        }
    }
    img.updatePixels();
}