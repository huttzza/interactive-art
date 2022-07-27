let permissionGranted = false;
let drawAllowed = true;
let cx, cy;
let rotRange = [];
let rotIdx;
var r, g, b, a;

function setup() {
    createCanvas(windowWidth, windowHeight);
    s = new Scribble();

    cx = width / 2;
    cy = height / 2;

    for (let i = 0; i <= 10; i++) {
        rotRange[i] = i - 5;
    }
    rotIdx = 0;

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
            })

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
    frameRate(10);

    if (!permissionGranted || !drawAllowed) return;

    background(255);

    r = random(255); // r is a random number between 0 - 255
    g = random(100, 200); // g is a random number betwen 100 - 200
    b = random(100); // b is a random number between 0 - 100
    a = random(200, 255); // a is a random number between 200 - 255

    noStroke();
    fill(r, g, b, a);

    const dx = constrain(rotationY, -3, 3); //범위 조정
    const dy = constrain(rotationX, -3, 3);
    cx += dx * 2;
    cy += dy * 2;
    cx = constrain(cx, 0, width);
    cy = constrain(cy, 0, height);

    //ellipse(cx, cy, 50, 50);

    fill('#5c5346');
    stroke('#A69F98');
    strokeWeight(2);
    s.scribbleEllipse(cx, cy, 100, 100);

    const rot = rotRange[rotIdx];

    noFill();
    s.scribbleLine(cx - 20, cy - 20,
        cx + 20, cy + 20);
    s.scribbleLine(cx + 20, cy - 20,
        cx - 20, cy + 20);
    // s.scribbleLine(cx - 20, cy - 20 + rot,
    //     cx + 20, cy + 20 - rot);
    // s.scribbleLine(cx + 20, cy - 20 - rot,
    //     cx - 20, cy + 20 + rot);

    rotIdx++;
    if (rotIdx > 10) rotIdx = 0;
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

function mousePressed() {
    drawAllowed = !drawAllowed;
}