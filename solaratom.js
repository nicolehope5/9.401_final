let nucleus, electron, sun, planet;
let feedback = "";
let submitButton, replayButton;

function setup() {
  createCanvas(800, 400);

  // Create draggable text elements with colors and bounding boxes
  nucleus = new DraggableText("nucleus", 50, 300, color(128, 0, 128)); // Purple
  electron = new DraggableText("electron", 200, 300, color(0, 0, 255)); // Blue
  sun = new DraggableText("sun", 450, 300, color(255, 165, 0)); // Orange
  planet = new DraggableText("planet", 600, 300, color(0, 128, 0)); // Green

  // Create submit and replay buttons
  submitButton = createButton('Submit');
  submitButton.position(10, height - 60);
  submitButton.mousePressed(checkAndProvideFeedback);

  replayButton = createButton('Replay');
  replayButton.position(10, height - 30);
  replayButton.mousePressed(replay);
}

function draw() {
  background(255);

  // Display draggable text elements
  nucleus.display();
  electron.display();
  sun.display();
  planet.display();

  // Display feedback
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(feedback, width / 2, height - 20);
}

function mousePressed() {
  // Check if the mouse is pressed on any of the draggable text elements
  nucleus.pickUp(mouseX, mouseY);
  electron.pickUp(mouseX, mouseY);
  sun.pickUp(mouseX, mouseY);
  planet.pickUp(mouseX, mouseY);
}

function mouseDragged() {
  // Drag the text element if it is being dragged
  nucleus.drag();
  electron.drag();
  sun.drag();
  planet.drag();
}

function mouseReleased() {
  // Release the currently dragged text element
  nucleus.drop();
  electron.drop();
  sun.drop();
  planet.drop();
}

function checkAndProvideFeedback() {
  // Check matches and provide feedback
  checkMatches();
}

function checkMatches() {
  // Check if the text elements are in correct pairs
  let matchesCorrect =
    (sun.isNear(nucleus) && electron.isNear(planet)) ||
    (nucleus.isNear(sun) && planet.isNear(electron));

  // Provide feedback based on matches
  if (matchesCorrect) {
    feedback = "Correct!";
  } else {
    feedback = "Incorrect. Try again.";
  }
}

function replay() {
  // Reset positions and feedback
  nucleus.resetPosition();
  electron.resetPosition();
  sun.resetPosition();
  planet.resetPosition();
  feedback = "";
}

class DraggableText {
  constructor(label, x, y, color) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.color = color;
    this.boxSize = 60; // Size of the bounding box
  }

  display() {
    // Draw the bounding box
    noFill();
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);
    rect(this.x, this.y, this.boxSize, this.boxSize);

    // Draw the text at its current position with the specified color
    fill(this.color);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.label, this.x, this.y);
  }

  pickUp(mx, my) {
    // Check if the mouse is pressed inside the bounding box
    let d = dist(mx, my, this.x, this.y);
    if (d < this.boxSize / 2) {
      this.dragging = true;
      this.offsetX = this.x - mx;
      this.offsetY = this.y - my;
    }
  }

  drag() {
    // Drag the text element if it is being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  drop() {
    // Release the text
    this.dragging = false;
  }

  resetPosition() {
    // Reset the position of the text to its initial position
    this.x = this.initialX;
    this.y = this.initialY;
  }

isNear(otherText) {
  // Check if this text is near another text
  let distance = dist(this.x, this.y, otherText.x, otherText.y);
  return distance < 2 * this.boxSize; // Adjust the multiplier as needed
}
