let birds = [];
let stopFormation = false;
let feedback = "";
let replayButton;

function setup() {
    createCanvas(600, 400);
    playBirdAnimation();

    // Create a replay button
    replayButton = createButton('Replay');
    replayButton.position(10, height - 30);
    replayButton.mousePressed(replay);
}

function draw() {
    background(173, 216, 230); // Light pale blue background

    // Draw the birds
    for (let bird of birds) {
        bird.update();
        bird.draw();
    }

    // Draw the cloud
    fill(200);
    noStroke();
    ellipse(width / 2, height / 2, 120, 60);

    // Display feedback only after the V formation has stopped
    if (stopFormation) {
        fill(0);
        textSize(16);
        text(feedback, 10, 20);
    }

    // Check for mouse click after the V formation has stopped and before pressing "Replay"
    if (stopFormation && mouseIsPressed && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        let expectedTipX = width / 2 + 30;
        let expectedTipY = birds[0].y; // Assuming top bird defines the tip position

        // Define the dimensions of the bounding box
        let bboxWidth = 170; // Adjust the width of the bounding box as needed
        let bboxHeight = 20; // Adjust the height of the bounding box as needed

        // Check if the click is within the bounding box of the expected tip region
        if (
            mouseX >= expectedTipX - bboxWidth / 2 &&
            mouseX <= expectedTipX + bboxWidth / 2 &&
            mouseY >= expectedTipY - bboxHeight / 2 &&
            mouseY <= expectedTipY + bboxHeight / 2
        ) {
            feedback = "Correct!";
        } else {
            feedback = "Incorrect. Try again.";
        }
    }
}

function playBirdAnimation() {
    // Set up birds in a "V" formation
    let spacing = 20; // Spacing between birds

    // Starting position of the "V" formation on the left
    let startX = width / 2 - spacing * 2 - 100;
    let startY = height / 2;

    // Top row
    for (let i = 0; i < 5; i++) {
        let birdTop = new Bird(startX - i * spacing, startY - i * spacing);
        birds.push(birdTop);
    }

    // Bottom row
    for (let i = 0; i < 5; i++) {
        let birdBottom = new Bird(startX - i * spacing, startY + i * spacing);
        birds.push(birdBottom);
    }
}

function replay() {
    // Reset variables and replay the animation
    birds = [];
    stopFormation = false;
    feedback = "";
    playBirdAnimation();
}

class Bird {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.stopX = width / 2 + 30; // x-coordinate to stop a little to the right of the middle of the cloud
    }

    update() {
        // Example: simple movement towards the right
        if (!stopFormation) {
            this.x += this.speed;
            if (this.x >= this.stopX) {
                stopFormation = true; // Stop the entire formation when the stopping point is reached
            }
        }
    }

    draw() {
        fill(0); // Black color for the bird
        triangle(
            this.x, this.y,
            this.x - 10, this.y - 5,
            this.x - 10, this.y + 5
        ); // Triangle shape
    }
}