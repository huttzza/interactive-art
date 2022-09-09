let angle = 0;
let isRotating = true;
let cam;

function preload() {
    m_head = loadImage("3D_mushroom/preset/mushroom_head.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    //cam = createCapture(VIDEO);
}

function draw() {
    background('#63A375');

    /*****Light****/
    let dx = mouseX - width / 2;
    let dy = mouseY - height / 2;
    let v = createVector(dx, dy, 0);
    v.normalize();

    ambientLight(255);
    directionalLight(255, 255, 255, v);

    let c = color('#F4FDD9');//

    push();
    translate(0, 200, 0);
    ambientMaterial(c);
    //texture(cam);
    ellipsoid(200, 10, 200);
    pop();

    /*****mushroom rotation****/
    //translate(mouseX - width/2 ,mouseY - height/2);
    //translate(0, 0, mouseX);
    rotateX(angle);
    rotateY(angle * 0.7);
    rotateZ(angle * 0.3);

    /*****mushroom cylinder****/
    rectMode(CENTER);

    noStroke();

    c = color('#D0B8AC');
    //c.setAlpha(90);
    //fill(c);
    ambientMaterial(c);
    cylinder(30, 100);

    push();
    translate(0, 50, 0);
    sphere(30);
    pop();

    /*****mushroom head****/
    c = color('#5A3A31');
    //fill(c);
    ambientMaterial(c);
    texture(m_head);

    push();
    translate(0, -50, 0);
    ellipsoid(80, 40, 80);
    pop();

    if (isRotating) {
        angle += 0.07;
    }
}

function keyPressed() {
    isRotating = !isRotating;
}