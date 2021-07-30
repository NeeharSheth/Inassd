img = [];
status = false;
objects = [];
img_count=0;

function preload() {
    img[0] = loadImage("dog_cat.jpg");
    img[1]=loadImage("sushi.png");
    img[2]=loadImage("hotel.png");
    img[3]=loadImage("3.jpeg");
}

function setup() {
    canvas = createCanvas(640, 520);
    canvas.center();
    objectDetect = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Image";
}

function modelLoaded() {
    console.log("Model loaded :D");
    status = true;
    console.log(status);
    objectDetect.detect(img[img_count], gotResults);
}

function draw() {
    image(img[img_count], 0, 0, 640, 520);

    if (status == "true") {
        for (i = 0; i < objects.length; i++) {
            fill("#FFF000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("#000000");
            strokeWeight(5);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        document.getElementById("status").innerHTML = "Detected Image";
    }
}


function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
        console.log(objects);
    }
}

function next(){
    img_count+=1;
    if(i==4)
        i=0;

    canvas.clear();
    objectDetect.detect(img[img_count], gotResults);
}