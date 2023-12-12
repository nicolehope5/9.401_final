let playLinearButton;
let playQuadraticButton;
let playFlowerButton;
let selectLinearButton;
let selectQuadraticButton;
let replayButton;

let linearLightBrightness = 0;
let quadraticLightBrightness = 0;
let flowerRadius = 0;
let petalLength = 0;
let feedback = "";
let selectedLight = null;
let animationStartTime = 0;

function setup() {
  createCanvas(800, 400);

  playLinearButton = createButton('Play Linear Light');
  playLinearButton.position(50, height - 60);
  playLinearButton.mousePressed(() => playLight('linear'));

  playQuadraticButton = createButton('Play Quadratic Light');
  playQuadraticButton.position(width / 3, height - 60);
  playQuadraticButton.mousePressed(() => playLight('quadratic'));

  playFlowerButton = createButton('Play Flower');
  playFlowerButton.position(width / 1.5, height - 60);
  playFlowerButton.mousePressed(() => playLight('flower'));

  selectLinearButton = createButton('Select Linear Light');
  selectLinearButton.position(50, height - 90);
  selectLinearButton.mousePressed(() => selectLight('linear'));

  selectQuadraticButton = createButton('Select Quadratic Light');
  selectQuadraticButton.position(width / 3, height - 90);
  selectQuadraticButton.mousePressed(() => selectLight('quadratic'));

  replayButton = createButton('Replay');
  replayButton.position(width - 70, height - 30);
  replayButton.mousePressed(replay);
}

function draw() {
  background(255);

  // Display feedback
  fill(0);
  textSize(16);
  text(feedback, width / 2 - 50, 20);

  // Linear light
  fill(0, 255, 0, linearLightBrightness);
  ellipse(100, 100, 50, 50);

  // Quadratic light (flashing three times)
  if (selectedLight === 'quadratic') {
    let elapsedTime = millis() - animationStartTime;
    let period = 5000 / 6; // 3 flashes in 5 seconds
    let flashNumber = floor(elapsedTime / period);
    if (flashNumber < 3) {
      quadraticLightBrightness = flashNumber % 2 === 0 ? 255 : 0;
    } else {
      quadraticLightBrightness = 0;
    }
  } else {
    quadraticLightBrightness = 0;
  }

  fill(0, 255, 0, quadraticLightBrightness);
  ellipse(width / 3, 100, 50, 50);

  // Flower
  drawFlower(width - 100, height - 100, flowerRadius, petalLength);

  // Update values only when the respective light is playing
  if (selectedLight === 'linear' && millis() - animationStartTime < 10000) {
    linearLightBrightness = min(linearLightBrightness + 255 / (10 * frameRate()), 255);
  }

  if (selectedLight === 'flower' && millis() - animationStartTime < 5000) {
    flowerRadius = min(flowerRadius + 50 / (5 * frameRate()), 50);
    petalLength = min(petalLength + 20 / (5 * frameRate()), 20);
  }
}

function playLight(lightType) {
  if (lightType === 'linear') {
    linearLightBrightness = 0;
  } else if (lightType === 'quadratic') {
    quadraticLightBrightness = 0;
  } else if (lightType === 'flower') {
    flowerRadius = 0;
    petalLength = 0;
  }

  feedback = '';
  selectedLight = lightType;
  animationStartTime = millis();
}

function selectLight(lightType) {
  selectedLight = lightType;
  feedback = checkFeedback();
}

function replay() {
  linearLightBrightness = 0;
  quadraticLightBrightness = 0;
  flowerRadius = 0;
  petalLength = 0;
  feedback = '';
  selectedLight = null;
}

function drawFlower(x, y, radius, petalLength) {
  fill(255, 0, 0);
  ellipse(x, y, radius * 2, radius * 2);

  fill(255, 255, 0);
  for (let angle = 0; angle < 360; angle += 10) {
    let petalX = x + cos(radians(angle)) * radius;
    let petalY = y + sin(radians(angle)) * radius;
    let endX = petalX + cos(radians(angle)) * petalLength;
    let endY = petalY + sin(radians(angle)) * petalLength;
    ellipse(petalX, petalY, 10, 20);
    line(petalX, petalY, endX, endY);
  }
}

function checkFeedback() {
  if (selectedLight === 'linear') {
    return 'Correct!';
  } else if (selectedLight === 'quadratic') {
    return 'Incorrect!';
  } else {
    return '';
  }
}