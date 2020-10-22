
let bg = {
    color: {
        h: 203,
        s: 100,
        l: 70,
    },
    width: 1000,
    height: 600
};

const gravity = 0.1;
const pixelSize = 3;
let frameCount = 0;
let elements = [];
let platforms = [];
let characters = [];
let screenPixels = [];




const ugray = [24, 24, 24];
function setup() {
    frameRate(60);
    console.log(pixelDensity());
    createCanvas(bg.width, bg.height);
    new Platform({
        x: 80,
        y: 80
    });
    for (let i = 0; i <= bg.height; i += pixelSize) {
        screenPixelrow = [];
        for (let j = 0; j <= bg.width; j += pixelSize) {
            screenPixelrow.push(new Pixel({
                x: j,
                y: i,
                color: hslFromObj(bg.color)
            }))
        }
        screenPixels.push(screenPixelrow);
    }
    
}
function draw() {
    background(hslFromObj(bg.color));
    frameCount++;
    for (let row of screenPixels) {
        for (let pixel of row) {
            //console.log(pixel);
            pixel.draw();
        }
    }
    drawElems(platforms);
}

function hslFromObj(hsl) {
    return color('hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)');
}
function mouseClicked() {
    /*player = new Character({
        keys: {
            left: 37,
            right: 39,
            jump: 38,
        },
        x: mouseX,
        y: mouseY
    });
    console.log(player);*/
    new Platform({
        x: Math.round(mouseX/pixelSize),
        y: Math.round(mouseY/pixelSize)
    });
}

function drawElems(elems) {
    for (let elem of elems) {
        elem.draw();
    }
}