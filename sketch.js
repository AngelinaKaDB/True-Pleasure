let font1;
let secondTextX, secondTextY;
let secondTextWidth, secondTextHeight;
let isDragging = false;
let dragTextX, dragTextY; 
let isTextDragged = false; 

let truePleasureX, truePleasureY, truePleasureWidth, truePleasureHeight;
let bgColor; 

let arrowX, arrowY, arrowWidth = 30, arrowHeight = 10;
let arrowVisible = false; 

async function setup() {
  createCanvas(windowWidth, windowHeight);
  font1 = await loadFont("BodoniModa.ttf");
  textFont(font1);
  textAlign(CENTER, CENTER);

  bgColor = color(245); 
  secondTextX = width / 2;
  secondTextY = height / 2 + 20;
  dragTextX = secondTextX; 
  dragTextY = secondTextY;
  
  textSize(15);
  secondTextWidth = textWidth("A life free from pain and anxiety");
  secondTextHeight = 15; 
  truePleasureWidth = textWidth("True Pleasure");
  truePleasureHeight = 32; 
  truePleasureX = width / 2 - truePleasureWidth / 2;
  truePleasureY = height / 2 - 49 - truePleasureHeight / 2; 
  arrowX = width - 50;
  arrowY = height - 50;
}

function draw() {
  if (!font1) return;

  background(bgColor); 
  let isOverlapping = dragTextX > truePleasureX && dragTextX < truePleasureX + truePleasureWidth &&
          dragTextY > truePleasureY && dragTextY < truePleasureY + truePleasureHeight;

  
  textSize(49);
  if (isOverlapping) {
    fill(255); 
  } else {
    fill(0); 
  }
  text("True Pleasure", width / 2, height / 2 - 49);

  textSize(15);
  fill(0); 
  text("A life free from pain and anxiety", secondTextX, secondTextY);


  if (mouseX > secondTextX - secondTextWidth / 2 && mouseX < secondTextX + secondTextWidth / 2 &&
      mouseY > secondTextY - secondTextHeight / 2 && mouseY < secondTextY + secondTextHeight / 2) {
    cursor(HAND); 
  } else {
    cursor(ARROW); 
  }

  if (isTextDragged) {
    fill(173, 216, 230); 
    text("A life free from pain and anxiety", dragTextX, dragTextY);
  }

  
  if (isOverlapping) {
    arrowVisible = true;
  } else {
    arrowVisible = false;
  }

  
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
  
  if (mouseX > secondTextX - secondTextWidth / 2 && mouseX < secondTextX + secondTextWidth / 2 &&
      mouseY > secondTextY - secondTextHeight / 2 && mouseY < secondTextY + secondTextHeight / 2) {
    isDragging = true; 
    isTextDragged = true;
  } 
  if (arrowVisible && dist(mouseX, mouseY, arrowX, arrowY) < arrowWidth + arrowHeight / 2) {
    window.location.href = "nextpage.html",'next page'; 
  }
}

function mouseReleased() {
  isDragging = false;
}

function mouseDragged() {
  if (isDragging) {
    dragTextX = mouseX;
    dragTextY = mouseY;
  }
}
