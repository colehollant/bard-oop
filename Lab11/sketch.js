var data;

function preload(){
    data = loadStrings("poem.txt");
}

function setup() {
    var myCanvas = createCanvas(1500, 500);
    myCanvas.parent('sketch');
    var wc = new WordCount();
    for (let i = 0; i < data.length; i++) {
        let row = splitTokens(data[i]); 
        for (let j = 0; j < row.length; j++) {
            let s = row[j];
            wc.add(new Word(s));
        }
    }
    background(80);
    wc.display();
}