let bubbles = [];
let difficulty=1;
let scores=0;
let rad=0;
let hits=0;
let misses=0;
let time = 10;
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            alert("Time is up!  Score is :"+(Math.ceil(scores/(misses+1))));
            document.location.reload(true)

        }
    }, 1000);
}

window.onload = function () {
    var display = document.querySelector('#time');
    startTimer(time, display);
};
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
        let x = random(200,width-200);
        let y = random(100,height-100);
        let r = random(20, 60/(difficulty/2));
        let b = new Bubble(x, y, r);
        rad=r;
        bubbles.push(b);
}

function mousePressed() {
    for (let i = bubbles.length - 1; i >= 0; i--) {
        if (bubbles[i].contains(mouseX, mouseY)) {
            bubbles.splice(i, 1);
            scores+=Math.ceil((100-rad)*difficulty/2);
            hits++;
            document.getElementById("Scoreboard").innerText="score: "+scores+"   misses: "+misses+"   hits:"+hits;
            console.log(scores);
            setup();
        }
        else {misses++;
            document.getElementById("Scoreboard").innerText="score: "+scores+"   misses: "+misses+"   hits:"+hits;
        }

    }
}

function draw() {
   background(212)
    for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i].contains(mouseX, mouseY)) {
            bubbles[i].changeColor(255);
        } else {
            bubbles[i].changeColor(0);
        }
        bubbles[i].move();
        bubbles[i].show();
    }
}

class Bubble {

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.brightness = 0;
    }

    changeColor(dark) {
        this.brightness = 0;

    }

    contains(px, py) {
        let d = dist(px, py, this.x, this.y);
        if (d < this.r) {
            return true;
        } else {
            return false;
        }
    }

    move() {
        let xMove=random(-3,3)*difficulty;
        let yMove=random(-3,3)*difficulty;
            this.x = this.x + xMove;
            this.y = this.y + yMove;
        if(this.x>innerWidth||this.y>innerHeight||this.x<0||this.y<0) {
            for (let i = bubbles.length - 1; i >= 0; i--) {
                bubbles.splice(i, 1);
                setup();
            }
        }

    }

    show() {
        stroke(255);
        strokeWeight(4);
        fill(this.brightness, 125);
        ellipse(this.x, this.y, this.r * 2);
    }
}