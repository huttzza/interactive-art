let permissionGranted = false;
let cx, cy;
var r, g, b, a;

function setup() {
    createCanvas(windowWidth, windowHeight);

    cx = width / 2;
    cy = height / 2;

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
        textSize(40);
        text("non ios device", 100, 100);
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

    if (!permissionGranted) return;

    //background(255);

    // textSize(20);
    // text(rotationX, 100, 100);

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

    ellipse(cx, cy, 50, 50);
}