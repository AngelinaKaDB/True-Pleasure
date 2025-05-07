let font1;
let mainText = "The Ideal Life";
let subText = "By pleasure we mean the state wherein the body is free from pain and the mind from anxiety.";

let textBoxWidth;
let mainTextX, mainTextY;
let bgColor;

let petals = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);

  font1 = await loadFont("BodoniModa.ttf");
  textFont(font1);

  textAlign(CENTER, CENTER);
  bgColor = color(245);
  textBoxWidth = width * 0.75;
  mainTextX = width / 2;
  mainTextY = height / 8;

  for (let i = 0; i < 40; i++) {
    petals.push(new Petal());
  }
}

function draw() {
  if (!font1) return;
  background(bgColor);

  drawRadiance(mainTextX, mainTextY, 150, 0.05);

  drawFilledRainbow(width / 2, mainTextY + 250, 350, 50);


  textSize(45);
  fill(0);
  text(mainText, mainTextX, mainTextY);

 
  let subTextYOffset = sin(frameCount * 0.01) * 3;
  textSize(20);
  fill(0);
  textWrap(WORD);
  textAlign(CENTER, TOP);
  text(subText, width / 2 - textBoxWidth / 2, mainTextY + 280 + subTextYOffset, textBoxWidth);


  for (let petal of petals) {
    petal.update();
    petal.display();
  }
}
function drawRadiance(x, y, baseSize, pulseSpeed) {
  noStroke();
  let pulse = sin(frameCount * pulseSpeed) * 20;
  fill(255, 223, 186, 60);
  ellipse(x, y, baseSize + pulse, baseSize + pulse);
}


function drawFilledRainbow(cx, cy, baseRadius, bandHeight) {
  let solidColors = [
    color(255, 0, 0),
    color(255, 127, 0),
    color(255, 255, 0),
    color(0, 255, 0),
    color(173, 216, 230),
    color(0, 0, 255),
    color(75, 0, 130)
  ];

  noStroke();
  for (let i = 0; i < solidColors.length; i++) {
    fill(solidColors[i]);
    arc(cx, cy, baseRadius * 2 - i * bandHeight, baseRadius - i * bandHeight / 2, PI, TWO_PI, PIE);
  }

  drawRainbowGradientArc(cx, cy, baseRadius * 2 - solidColors.length * bandHeight, baseRadius - solidColors.length * bandHeight / 2);
}


function drawRainbowGradientArc(cx, cy, w, h) {
  let steps = 200;
  noStroke();
  for (let i = 0; i < steps; i++) {
    let t = i / steps;
    let angleStart = PI + t * PI;
    let angleEnd = PI + (t + 1 / steps) * PI;

    let hueShift = (frameCount / 2 + t * 360) % 360;
    let col = color(`hsl(${int(hueShift)}, 100%, 50%)`);
    fill(col);
    arc(cx, cy, w, h, angleStart, angleEnd, PIE);
  }
}


class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(-200, -20);
    this.size = random(10, 18);
    this.speedY = random(0.5, 1.5);
    this.wind = random(0.5, 1.5);
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(0.01, 0.03);
    this.color = color(255, random(150, 180), random(180, 200), 180);
  }

  update() {
    this.y += this.speedY;
    this.x += sin(this.angle) * this.wind;
    this.angle += this.rotationSpeed;

    if (this.y > height + 10 || this.x < -10 || this.x > width + 10) {
      this.reset();
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(this.color);
    ellipse(0, 0, this.size * 0.7, this.size);
    pop();
  }
}
