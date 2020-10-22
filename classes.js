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
    constructor(info) {
        elements.push(this);
        platforms.push(this);
        //this.x = random(100, 400);
        //this.y = random(100, 400);
        //this.x = 80;
        //this.y = 80;
        this.x = info.x;
        this.y = info.y;
        this.initGrid();
        console.log(this.pixels);
    }
    initGrid() {
        let green = color(0, 140, 0);
        let red = color(140, 0, 0);
        let gray1 = color(ugray);
        let grass = function () {
            return hslFromObj({
                h: 100,
                s: 100,
                l: Math.round(random(10, 40))
            });
        };
        let dirt = function () {
            return hslFromObj({
                h: 25,
                s: 44,
                l: Math.round(random(10, 30))
            })
        }
        let gridArrays = [[0, 0], [gray1, gray1], [gray1, gray1], [gray1, gray1], [gray1, gray1], [0, 0]];
        let textures = [grass, dirt];
        for (let i = 0; i < 40; i++) {
            gridArrays[0].splice(gridArrays[0].length - 1, 0, gray1);
            gridArrays[1].splice(gridArrays[1].length - 1, 0, grass());
            gridArrays[2].splice(gridArrays[2].length - 1, 0, textures[Math.round(random())]());
            gridArrays[3].splice(gridArrays[3].length - 1, 0, dirt());
            gridArrays[4].splice(gridArrays[4].length - 1, 0, dirt());
            gridArrays[5].splice(gridArrays[5].length - 1, 0, gray1);
        }
        this.grid = gridArrays;
        this.pixels = gridToPixels(this.grid, this.x, this.y);
    }
    updateGrid() {

    }
    draw() {
        this.pixels = gridToPixels(this.grid, this.x, this.y);
        drawPixels(this.pixels);
        /*if (frameCount % 4000 == 0) {
            this.y -= pixelSize;
        }*/
    }
    move() {

    }
}

class Character {
    constructor(info) {
        elements.push(this);
        characters.push(this);
        //this.x = random(100, 400);
        //this.y = random(100, 400);
        //this.x = 25 * pixelSize;
        //this.y = 15 * pixelSize;
        console.log(info);
        this.x = info.x;
        this.y = info.y;
        console.log(info.x);
        this.dir = 'left';
        this.robeHue = random(0, 360);
        this.eyesClosed = false;
        this.keys = info.keys;
        this.currentRobeLength = 'short';
        this.xspeed = 1;
        this.yspeed = 1;
        this.robeMoveSpeed = 10;
        this.currentHoodState = 'open';
        this.initGrid();
        console.log(this.pixels);
    }
    initGrid() {
        let green = color(0, 140, 0);
        let red = color(140, 0, 0);
        let black = color(0);
        let gray1 = color(ugray);
        let gray2 = color(54, 54, 54);
        let gray3 = color(66, 66, 66);
        let robe1 = hslFromObj({
            h: Math.round(this.robeHue),
            s: 100,
            l: 30
        });
        let robe2 = hslFromObj({
            h: Math.round(this.robeHue),
            s: 100,
            l: 40
        });
        let robe3 = hslFromObj({
            h: Math.round(this.robeHue),
            s: 100,
            l: 60
        });
        let gold1 = color('#FFB030');
        let gold2 = color('#BE8A23');
        let brown1 = color('#301B02');
        let brown2 = color('#573102');
        let brown3 = color('#AD7035');
        let skin = color('#E79E65');
        let eyes = robe3;
        if (this.eyesClosed) {
            eyes = black;
        }
        this.robeLenghts = {
            short: {},
            medium: {
                19: [0, 0, gray1, brown2, brown2, brown2, gray1, gray2, gray1, brown2, brown2,
                    brown2, gray1, gray2, gray2, gold1, robe1, robe1, robe1, robe1, gray1, 0],
                20: [0, gray1, brown1, brown1, brown1, brown1, gray1, gray2, gray1, brown1,
                    brown1, brown1, gray1, gray2, gray3, gray2, gold1, gold1, robe1, robe1, robe1, gray1],
                21: [0, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1,
                    gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1]
            },
            long: {
                17: [0, 0, gray1, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray2, gold1, robe2, robe1, robe1, robe1, gray1, 0, 0],
                18: [0, 0, gray1, gray1, gray1, gray1, gray2, gray3, gray1, gray1, gray1,
                    gray1, gray2, gray2, gold1, robe1, robe1, robe1, robe1, robe1, gray1, 0],
                19: [0, 0, gray1, brown2, brown2, brown2, gray1, gray2, gray1, brown2, brown2,
                    brown2, gray1, gray2, gray2, gold1, robe1, robe1, robe1, robe1, robe1, gray1, gray1, 0],
                20: [0, gray1, brown1, brown1, brown1, brown1, gray1, gray2, gray1, brown1,
                    brown1, brown1, gray1, gray2, gray3, gray2, gold1, gold1, robe1, robe1, robe1, robe1, robe1, gray1],
                21: [0, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1,
                    gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1]
            }
        };
        this.hoodStates = {
            open: {},
            closed: {
                4: [0, 0, 0, 0, gray1, robe1, robe1, robe1, robe1, robe1, robe2, robe2, robe2, robe2, robe1, gray1, robe1, gray1, 0, 0, 0],
                5: [0, 0, 0, 0, gray1, robe1, robe1, robe1, robe1, robe2, robe2, robe2, robe2, robe1, robe1, gray1, gray1, robe1, gray1, 0, 0],
                6: [0, 0, 0, gray1, robe1, robe1, robe1, robe1, robe2, robe2, robe2, robe2, robe2, robe1, robe1, robe1, gray1, gray1, gray1, 0, 0],
                7: [0, 0, 0, gray1, robe1, gold1, gold1, gold1, gold1, gold1, gold1, gold1, robe2, robe1, robe1, robe1, gray1, 0, 0, 0, 0],
                8: [0, 0, 0, gray1, gold1, black, eyes, black, black, eyes, black, black, gold1, robe1, robe1, robe1, robe1, gray1, 0, 0, 0],
            }
        }
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, gray1, gray1, gray1, gray1, 0, 0, 0, 0, 0, 0], //0
            [0, 0, 0, 0, 0, 0, 0, 0, gray1, gray1, gray1, robe1, robe1, robe1, robe1, gray1, 0, 0, 0, 0, 0], //1
            [0, 0, 0, 0, 0, 0, gray1, gray1, robe1, robe1, robe1, robe1, robe1, robe2, robe2, robe1, gray1, 0, 0, 0, 0], //2
            [0, 0, 0, 0, 0, gray1, robe1, robe1, robe1, robe1, robe1, robe2, robe2, robe2, robe2, robe2, robe1, gray1, 0, 0, 0], //3
            [0, 0, 0, 0, gray1, robe1, gold1, gold1, gold1, robe1, robe2, robe2, robe2, robe2, robe1, gray1, robe1, gray1, 0, 0, 0], //4
            [0, 0, 0, 0, gray1, gold1, black, black, black, gold1, gold1, robe2, robe2, robe1, robe1, gray1, gray1, robe1, gray1, 0, 0], //5
            [0, 0, 0, gray1, gold1, black, black, black, black, black, black, gold1, robe2, robe1, robe1, robe1, gray1, gray1, gray1, 0, 0], //6
            [0, 0, 0, gray1, gold1, black, black, black, black, black, black, black, gold1, robe1, robe1, robe1, gray1, 0, 0, 0, 0], //7
            [0, 0, 0, gray1, gold1, black, eyes, black, black, eyes, black, black, black, gold1, robe1, robe1, robe1, gray1, 0, 0, 0], //8
            [0, 0, 0, gray1, gold1, black, black, black, black, black, black, black, black, gold1, gold1, robe1, robe1, gray1, 0, 0, 0],
            [0, 0, 0, 0, gray1, gold1, black, black, black, black, black, black, black, black, black, gold1, gray1, 0, 0, 0, 0],
            [0, 0, 0, gray1, gray1, gray1, gray1, black, black, black, black, black, gray1, gray1, gray1, gray1, 0, 0, 0, 0, 0],
            [gray1, gray1, gray1, gray1, gray2, gray3, gray1, gold1, gold1, gold1, gray1, gray1, gold1, gold1, robe1, robe1, gray1, 0, 0, 0, 0],
            [gray1, skin, skin, gray1, gray2, gray3, gray3, gray1, gray1, gray1, gray3, gray2, gold1, robe1, robe2, robe1, robe1, gray1, 0, 0, 0],
            [gray1, skin, gray1, gray2, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray2, gold1, robe2, robe2, robe1, gray1, 0, 0, 0],
            [gray1, gray1, gray1, gray2, gray2, gray2, gray2, gray2, gray2, gray2, gray2, gray2, gray2, gold1, robe2, robe2, robe1, gray1, 0, 0, 0],
            [0, 0, gray1, brown3, brown3, brown3, gold2, gold2, brown3, brown3, brown3, brown3, brown3, brown3, gold1, robe2, robe1, robe1, gray1, 0, 0],
            [0, 0, gray1, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray3, gray2, gold1, robe2, robe1, robe1, gray1, 0, 0],
            [0, 0, gray1, gray1, gray1, gray1, gray2, gray3, gray1, gray1, gray1,
                gray1, gray2, gray2, gold1, robe1, robe1, robe1, robe1, gray1, 0],
            [0, 0, gray1, brown2, brown2, brown2, gray1, gray2, gray1, brown2, brown2,
                brown2, gray1, gray2, gray2, gold1, robe1, robe1, robe1, gray1, 0],
            [0, gray1, brown1, brown1, brown1, brown1, gray1, gray2, gray1, brown1,
                brown1, brown1, gray1, gray2, gray3, gray2, gold1, gold1, robe1, robe1, gray1],
            [0, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1,
                gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1, gray1]
        ];
        let newGrid = this.grid.map((x) => x);
        for (let i = 0; i < Object.keys(this.robeLenghts[this.currentRobeLength]).length; i++) {
            newGrid[Number(Object.keys(this.robeLenghts[this.currentRobeLength])[i])] = this.robeLenghts[this.currentRobeLength][Object.keys(this.robeLenghts[this.currentRobeLength])[i]];
        }
        this.applyGridChange(newGrid, this.robeLenghts, this.currentRobeLength);
        this.applyGridChange(newGrid, this.hoodStates, this.currentHoodState);
        for (let arr of newGrid) {
            let dif = maxArrayInArray(newGrid) - arr.length;
            for (let i = 0; i < dif; i++) {
                arr.push(0);
            }
        }
        if (this.dir == 'right') {
            for (let arr of newGrid) {
                arr = arr.reverse();
            }
        }
        this.pixels = gridToPixels(newGrid, this.x, this.y);
    }
    draw() {
        drawPixels(this.pixels);
        if (keyIsDown(this.keys.left)) {
            this.dir = 'left';
            this.initGrid();
            this.xMove(-1);
        } else if (keyIsDown(this.keys.right)) {
            this.dir = 'right';
            this.initGrid();
            this.xMove(1);
        } else {
            this.currentRobeLength = 'short';
            this.initGrid();
        }
        if (keyIsDown(this.keys.jump)) {
            this.jump();
        }
        if (this.platformContact()) {
            this.yspeed = 0;
        } else {
        }
        if (frameCount % 200 == 0) {
            this.blink();
        }
        //console.log(frameCount % this.yspeed);
        this.yMove();
    }
    xMove(dir) {
        this.x += dir * this.xspeed * pixelSize;
        this.robeMove();
    }
    yMove() {
        this.y += this.yspeed * pixelSize;
        this.yspeed += 0.1;
        //console.log(Math.round(this.yspeed));
        //console.log(frameCount % Math.round(this.yspeed));
    }
    shiftEyes() {
        this.eyesClosed = !this.eyesClosed;
        this.initGrid();
    }
    blink() {
        this.shiftEyes();
        let ths = this;
        setTimeout(function () {
            ths.shiftEyes();
        }, 300);
    }
    changeDir(dir) {
        if (dir) {
            this.dir = dir;
        } else {
            if (this.dir == 'right') {
                this.dir = 'left';
            } else {
                this.dir = 'right';
            }
            this.initGrid();
        }
    }
    robeMove() {
        this.currentRobeLength = 'medium';
    }
    applyGridChange(grid, options, change) {
        for (let i = 0; i < Object.keys(options[change]).length; i++) {
            grid[Number(Object.keys(options[change])[i])] = options[change][Object.keys(options[change])[i]];
        }
        return grid;
    }
    jump() {
        
    }
    platformContact() {
        for (let platform of platforms) {
            let bottomY = this.pixels[this.pixels.length - 1][0].y;
            let leftX = this.pixels[this.pixels.length - 1][0].x;
            let rightX = this.pixels[this.pixels.length - 1][this.pixels[this.pixels.length - 1].length-1].x;
            let pfLeftX = platform.x;
            let pfRightX = platform.pixels[0][platform.pixels[0].length - 1].x;
            if (bottomY >= platform.y && leftX < pfRightX && rightX > pfLeftX) {
                this.y -= bottomY - platform.y;
                return true;
            }
        }
    }
}

function gridToPixels(grid, x, y) {
    let pixels = [];
    for (let i = 0; i < grid.length; i++) {
        let pixelRow = [];
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                col = grid[i][j];
            } else {
                col = color(0, 0, 0, 0);
                //col = color(255, 0, 0);
            }
            pixelRow.push(new Pixel({
                x: x + (j),
                y: y + (i),
                color: col
            }));
        }
        pixels.push(pixelRow);
    }
    return pixels;
}

function maxArrayInArray(array) {
    let max = array[0].length;
    for (let i = 1; i < array.length; i++) {
        if (array[i].length > max) {
            max = array[i].length;
        }
    }
    return max;
}
function drawPixels(arr) {
    for (let pixelRow of arr) {
        for (let pixel of pixelRow) {
            pixel.draw();
            //screenPixels[pixel.y][pixel.x].color = pixel.color;
        }
    }
}