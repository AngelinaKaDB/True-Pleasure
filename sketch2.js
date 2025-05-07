let font1;
let bgColor;

let arrowX, arrowY, arrowWidth = 30, arrowHeight = 10;
let arrowVisible = false; 

let mainText = "More Than Physical Enjoyment";
let subText = "The truest happiness does not come from enjoyment of physical pleasures but from a simple life, free from anxiety, with the normal physical needs satisfied.";

let mainTextX, mainTextY;
let textBoxWidth;
let physicalClicked = false;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  font1 = await loadFont("BodoniModa.ttf");
  textFont(font1);
  textAlign(LEFT, TOP);

  bgColor = color(29);
  mainTextX = width / 2;
  mainTextY = height / 2 - 70;
  textBoxWidth = width * 0.6;

  arrowX = width - 50;
  arrowY = height - 50;
}

function draw() {
  if (!font1) return;

  background(bgColor);


  textAlign(CENTER, CENTER);
  textSize(45);
  fill(0);
  text(mainText, mainTextX, mainTextY);

  textAlign(LEFT, TOP);
  textSize(20);
  let words = subText.split(" ");
  let x = width / 2 - textBoxWidth / 2;
  let y = height / 2 + 10;
  let lineHeight = 28;
  let spaceWidth = textWidth(" ");
  let lineX = x;
  let lineY = y;

  let greenIndices = new Set();

  if (physicalClicked) {
    for (let i = 0; i < words.length - 2; i++) {
      let w1 = words[i].toLowerCase().replace(/[^\w]/g, "");
      let w2 = words[i + 1].toLowerCase().replace(/[^\w]/g, "");
      let w3 = words[i + 2].toLowerCase().replace(/[^\w]/g, "");
      if (w1 === "a" && w2 === "simple" && w3 === "life") {
        greenIndices.add(i);
        greenIndices.add(i + 1);
        greenIndices.add(i + 2);
        break;
      }
    }

    for (let i = 0; i < words.length - 2; i++) {
      let w1 = words[i].toLowerCase().replace(/[^\w]/g, "");
      let w2 = words[i + 1].toLowerCase().replace(/[^\w]/g, "");
      let w3 = words[i + 2].toLowerCase().replace(/[^\w]/g, "");
      if (w1 === "free" && w2 === "from" && w3 === "anxiety") {
        greenIndices.add(i);
        greenIndices.add(i + 1);
        greenIndices.add(i + 2);
      }
    }
  }
  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    let base = word.match(/^\w+/);
    let punct = word.match(/[^\w]+$/);
    let baseWord = base ? base[0] : "";
    let punctuation = punct ? punct[0] : "";

    let baseWidth = textWidth(baseWord);
    let punctWidth = textWidth(punctuation);
    let totalWidth = baseWidth + punctWidth;

    if (lineX + totalWidth > x + textBoxWidth) {
      lineX = x;
      lineY += lineHeight;
    }

    if (word.toLowerCase().includes("physical")) {
      if (physicalClicked) {
        fill(255, 0, 0, 100);
        rect(lineX - 1, lineY - -3, totalWidth + 3, lineHeight - 1, 1);
        fill(0);
      } else {
        fill(255, 0, 0);
      }
    } else if (greenIndices.has(i) && baseWord.length > 0) {
      fill(0, 210, 9111);
    } else {
      fill(0);
    }
    text(baseWord, lineX, lineY);
    lineX += baseWidth;

    if (punctuation.length > 0) {
      fill(0);
      text(punctuation, lineX, lineY);
      lineX += punctWidth;
    }

    lineX += spaceWidth;
  }

  cursor(ARROW);
  if (arrowVisible) {
    fill(255, 255, 153);
    drawArrow(arrowX, arrowY);
  }
}

function drawArrow(x, y) {
  push();
  translate(x, y);
  stroke(255, 255, 153);
  strokeWeight(5);
  line(0, 0, arrowWidth, 0);
  fill(255, 255, 153);
  noStroke();
  triangle(arrowWidth, -arrowHeight / 2, arrowWidth, arrowHeight / 2, arrowWidth + arrowHeight, 0);
  pop();
}

function mousePressed() {
  let x = width / 2 - textBoxWidth / 2;
  let y = height / 2 + 10;
  let words = subText.split(" ");
  let lineX = x;
  let lineY = y;
  let lineHeight = 28;
  let spaceWidth = textWidth(" ");
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let w = textWidth(word);

    if (lineX + w > x + textBoxWidth) {
      lineX = x;
      lineY += lineHeight;
    }

    if (word.toLowerCase().includes("physical")) {
      if (
        mouseX > lineX &&
        mouseX < lineX + w &&
        mouseY > lineY &&
        mouseY < lineY + lineHeight
      ) {
        physicalClicked = !physicalClicked;
        if (physicalClicked) {
          arrowVisible = true;
        }
        break;
      }
    }

    lineX += w + spaceWidth;
  }
  if (
    arrowVisible &&
    dist(mouseX, mouseY, arrowX, arrowY) < arrowWidth + arrowHeight / 2
  ) {
    window.location.href = "thirdpage.html";
  }
}
