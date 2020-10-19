
let bg = {
    color: {
        h: 203,
        s: 100,
        l: 70,
    },
    width: 600,
    height: 600
};

const pixelSize = 10;

let elements = [];
let platforms = [];
let characters = [];

function setup() {
    createCanvas(bg.width, bg.height);
    new Platform();
    new Character();
}
function draw() {
    background(hslFromObj(bg.color));
    for (let element of elements) {
        element.draw();
    }
}

function hslFromObj(hsl) {
    return color('hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)');
}