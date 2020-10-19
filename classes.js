class Pixel {
    constructor(info) {
        this.x = info.x;
        this.y = info.y;
        this.width = pixelSize;
        this.color = info.color;
    }
    draw() {
        fill(this.color);
        stroke(this.color);
        strokeWeight(0.1);
        //noStroke();
        rect(this.x, this.y, this.width, this.width);
    }
}

class Platform {
    constructor() {
        elements.push(this);
        platforms.push(this);
        //this.x = random(100, 400);
        //this.y = random(100, 400);
        this.x = 250;
        this.y = 250;
        let green = color(0, 140, 0);
        let red = color(140, 0, 0);
        this.grid = [];
        this.pixels = gridToPixels(this.grid, this.x, this.y);
        
        console.log(this.pixels);
    }
    draw() {
        for (let pixel of this.pixels) {
            pixel.draw();
        }
    }
    move() {

    }
}

class Character {
    constructor() {
        elements.push(this);
        characters.push(this);
        //this.x = random(100, 400);
        //this.y = random(100, 400);
        this.x = 250;
        this.y = 250;
        this.dir = 'left';
        let green = color(0, 140, 0);
        let red = color(140, 0, 0);
        let black = color(0);
        let gray1 = color(24, 24, 24);
        let gray2 = color(54, 54, 54);
        let gray3 = color(66, 66, 66);
        let blue1 = color(10, 44, 164);
        let blue2 = color(27, 56, 201);
        let blue3 = color('#3BA0E0');
        let gold1 = color('#FFB030');
        let gold2 = color('#BE8A23');
        let brown1 = color('#301B02');
        let brown2 = color('#573102');
        let brown3 = color('#AD7035');
        let skin = color('#E79E65');
        this.grid = [
            [0, 0, 0, gray1, gray1, gray1, gray1, black, black, black, black, black, gray1, gray1, gray1, gray1, 0, 0, 0, 0, 0],
            [gray1, gray1, gray1, gray1, gray2, gray3, gray1, gold1, gold1, gold1, gray1, gray1, gold1, gold1, blue1, blue1, gray1, 0, 0, 0, 0],
            [gray1, skin, skin, gray1, gray2, gray3, gray3, gray1, gray1, gray1, gray3, gray2, gold1, blue1, blue2, blue1, blue1, gray1, 0, 0, 0],
            [gray1, skin, gray1, gray2, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray2, gold1, blue2, blue2, blue1, gray1, 0, 0, 0],
            [gray1, gray1, gray1, gray2, gray2, gray2, gray2, gray2, gray2, gray2, gray2, gray2, gray2, gold1, blue2, blue2, blue1, gray1, 0, 0, 0],
            [0, 0, gray1, brown3, brown3, brown3, gold2, gold2, brown3, brown3, brown3, brown3, brown3, brown3, gold1, blue2, blue1, blue1, gray1, 0, 0],
            [0, 0, gray1, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray2, gold1, blue2, blue1, blue1, gray1, 0, 0],
            [0, 0, gray1, gray1, gray1, gray1, gray2, gray3, gray1, gray1, gray1, 
                gray1, gray2, gray2, gold1, blue1, blue1, blue1, blue1, gray1, 0],
            [0, 0, gray1, brown2, brown2, brown2, gray1, gray2, gray1, brown2, brown2, 
                brown2, gray1, gray2, gray2, gold1, blue1, blue1, blue1, gray1, 0],
            [0, gray1, brown1, brown1, brown1, brown1, gray1, gray2, gray1, brown1, 
                brown1, brown1, gray1, gray2, gray3, gray2, gold1, gold1, blue1, blue1, gray1],
            [0, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, 
                gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1]
        ];
        if (this.dir == 'right') {
            for (let arr of this.grid) {
                arr = arr.reverse();
            }
        }
        this.pixels = gridToPixels(this.grid, this.x, this.y);
        
        console.log(this.pixels);
    }
    draw() {
        for (let pixel of this.pixels) {
            pixel.draw();
        }
    }
    move() {

    }
}

function gridToPixels(grid, x, y) {
    let pixels = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                col = grid[i][j];
            } else {
                col = color(0, 0, 0, 0);
                //col = color(255, 0, 0);
            }
            pixels.push(new Pixel({
                x: x + (pixelSize * j),
                y: y + (pixelSize * i),
                color: col
            }));
        }
    }
    return pixels;
}