let permissionGranted = false;
let drawAllowed = true;
let cx, cy;
var radius;

function setup() {
    createCanvas(windowWidth, windowHeight);
    s = new Scribble();

    cx = width / 2;
    cy = height / 2;

    radius = 100;

    //check if it is ios
    if (typeof (DeviceOrientationEvent) !== 'undefined' &&
        typeof (DeviceOrientationEvent.requestPermission) === 'function') {
        //it is ios

        DeviceOrientationEvent.requestPermission()
            .catch(() => {
                //show permission dialog only the first time
                let button = createButton("clcik to allow access to sensors");

                button.style("font-size", "24px");
                button.center();
                button.mousePressed(requestAccess);

                throw error; //then으로 가지 않게 하는
            })
            .then(() => {
                //on any subsequent visits
                permissionGranted = true;
            });

    } else {
        //it is NOT ios
        // textSize(40);
        // text("non ios device", 100, 100);
        permissionGranted = true;
    }


}

function requestAccess() {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                permissionGranted = true;
            } else {
                permissionGranted = false;
            }
        })
        .catch(console.error);


    this.remove();
}

function draw() {
    frameRate(16);

    if (!permissionGranted || !drawAllowed) return;

    background('#AFD5AA');

    //drawing grass background
    for (let i = 0; i < 1000; i++) {
        let x = random(width);
        let y = random(height);
        stroke(41, random(150, 200), 0);
        strokeWeight(1);
        fill(random(255), random(255), random(255));
        line(x, y, x + random(50), y + random(50));
    }


    const dx = constrain(rotationY, -3, 3); //범위 조정
    const dy = constrain(rotationX, -3, 3);
    cx += dx * 3;
    cy += dy * 3;
    cx = constrain(cx, 0 + radius, width - radius);
    cy = constrain(cy, 0 + radius, height - radius);

    fill('#5c5346');
    stroke('#A69F98');
    strokeWeight(2);
    s.scribbleEllipse(cx, cy, radius * 2, radius * 2);

    noFill();
    s.scribbleLine(cx - 20, cy - 20,
        cx + 20, cy + 20);
    s.scribbleLine(cx + 20, cy - 20,
        cx - 20, cy + 20);
}

function keyPressed() {
    if (drawAllowed) {
        if (keyCode === LEFT_ARROW) {
            cx -= 6;
        } else if (keyCode === RIGHT_ARROW) {
            cx += 6;
        } else if (keyCode === UP_ARROW) {
            cy -= 6;
        } else if (keyCode === DOWN_ARROW) {
            cy += 6;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}