let points = [];
let velocities = [];
let numPoints = 100;
let maxDistance = 90;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvasContainer");
    noStroke();

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
            velocities.push(createVector(random(-0.5, 0.5), random(-0.5, 0.5)));
        }
    }
}

function draw() {
    // set the background to #00205C with a little transparency for trails
    background(0, 32, 92, 20);

    // Draw points
    fill(0, 32, 100);
    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        circle(p.x, p.y, 5);
        updatePoint(p, velocities[i]);
    }

    // Draw lines between points
    stroke(0, 32, 40, 100); // White lines with some transparency
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