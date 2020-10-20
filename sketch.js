
let bg = {
    color: {
        h: 203,
        s: 100,
        l: 70,
    },
    width: 1000,
    height: 500
};

const gravity = 0.1;
const pixelSize = 3;

let elements = [];
let platforms = [];
let characters = [];

function setup() {
    createCanvas(bg.width, bg.height);
    new Platform();
    player = new Character({
        keys: {
            left: 37,
            right: 39,
            jump: 38
        }
    });
}
function draw() {
    background(hslFromObj(bg.color));
    for (let char of characters) {
        char.draw();
    }
    /*for (let element of elements) {
        element.draw();
    }*/
}

function hslFromObj(hsl) {
    return color('hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)');
}