
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

const ugray = [24, 24, 24];
function setup() {
    frameRate(60);
    console.log(pixelDensity());
    createCanvas(bg.width, bg.height);
    new Platform();
    
}
function draw() {
    background(hslFromObj(bg.color));
    frameCount++;
    for (let char of characters) {
        char.draw();
    }
    for (let platform of platforms) {
        platform.draw();
    }
}

function hslFromObj(hsl) {
    return color('hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)');
}
function mouseClicked() {
    player = new Character({
        keys: {
            left: 37,
            right: 39,
            jump: 38,
        },
        x: mouseX,
        y: mouseY
    });
    console.log(player);
}