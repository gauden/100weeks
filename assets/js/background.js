let points = [];
let velocities = [];
let velocityBounds = 0.2;
let numPoints = 140;
let maxDistance = 0; // initialize global, set up in initializePointsAndVelocities()
let red = 15;
let green = 139;
let blue = 141;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvasContainer");
    noStroke();
    initializePointsAndVelocities();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initializePointsAndVelocities();
}

function initializePointsAndVelocities() {
    // Calculate the maximum distance between points based on the canvas size
    // (Expression developed empirically, to show a reasonable number of lines)
    maxDistance = sqrt(width * height) / numPoints * 20 - 15;

    // Clear the points and velocities arrays
    points = [];
    velocities = [];

    // Determine the size of the grid by taking the square root of the number of points
    let gridSize = sqrt(numPoints);

    // Calculate the width and height of each cell
    let cellWidth = width / gridSize;
    let cellHeight = height / gridSize;

    // Initialize points and velocities
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            // Calculate the x and y position for this cell
            let x = i * cellWidth + cellWidth / 2;
            let y = j * cellHeight + cellHeight / 2;

            // Add a small random offset to make it look less grid-like
            x += random(-cellWidth / 2, cellWidth / 2);
            y += random(-cellHeight / 2, cellHeight / 2);

            // Create the point and its velocity
            points.push(createVector(x, y));
            velocities.push(createVector(random(-velocityBounds, velocityBounds), random(-velocityBounds, velocityBounds)));
        }
    }
}

function draw() {
    // set the background to #00205C with a little transparency for trails
    background(0, 32, 92, 30);

    // Draw points
    fill(red, green, blue, 80);
    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        circle(p.x, p.y, 5);
        updatePoint(p, velocities[i]);
    }

    // Draw lines between points
    stroke(red, green, blue, 80); // White lines with some transparency
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let distance = p5.Vector.dist(points[i], points[j]);
            if (distance < maxDistance) {
                line(points[i].x, points[i].y, points[j].x, points[j].y);
            }
        }
    }
}

// Function to update the position of each point
function updatePoint(p, v) {
    p.add(v);

    // If the point hits the edge of the canvas, reverse its velocity
    if (p.x < 0 || p.x > width) {
        v.x *= -1;
    }
    if (p.y < 0 || p.y > height) {
        v.y *= -1;
    }

    // Keep points within the canvas
    p.x = constrain(p.x, 0, width);
    p.y = constrain(p.y, 0, height);
}