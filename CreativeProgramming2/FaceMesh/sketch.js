/*

SEE ALSO
+ https://github.com/tensorflow/tfjs-models/tree/
  master/face-landmarks-detection
+ https://arxiv.org/pdf/1907.06724.pdf


*/

let video;  // webcam input
let model;  // Face Landmarks machine-learning model
let face;   // detected face

//peacock image 
let peacock; 
let peacock_rev; 

//elephant ears 
let left_ear; 
let right_ear; 
let trunk; 

// print details when a face is
// first found
let firstFace = true;

function preload() {
    peacock = loadImage('assets/peacock_feather.png'); 
    peacock_rev = loadImage('assets/peacock_feather_flip.png'); 
    left_ear = loadImage('assets/left_ear.png'); 
    right_ear = loadImage('assets/right_ear.png'); 
    trunk = loadImage('assets/trunk.png'); 
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  // like in the BlazeFace example, we have
  // to load the model in an asynchronous function
  loadFaceModel();
}


// load the Face Landmarks model – this can be super
// slow so you might want to add a loading screen!
async function loadFaceModel() {
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    
    // optional: limit results to just one face
    { maxFaces: 1 }
  );
}


function draw() {

  // get face data if the video and model are both loaded
  if (video.loadedmetadata && model !== undefined) {
    getFace();
  }

  // if we have face data, show us!
  if (face !== undefined) {
    image(video, 0,0, width,height);

    // print info the first time a face is detected
    if (firstFace) {
      console.log(face);
      firstFace = false;
    }

    // this model gives us a *ton* of data!
    // first, let's see all the points
    // fill(255);
    // noStroke();
    // for (let pt of face.scaledMesh) {
    //   pt = scalePoint(pt);
    //   circle(pt.x, pt.y, 3);
    // }

    // amazing, but probably information overload
    // we can also use the 'annotations' section to get
    // facial features...

    //silhouette
    fill(76, 185, 202, 200);
    noStroke();
    beginShape();
    for (pt of face.annotations.silhouette) {
      pt = scalePoint(pt);
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);

    let featherPoints1 = [ 1, 2, 3, 4, 5];
    // 21, 54, 103, 67, 109, 10, 338, 297, 332, 284, 251, 389
    peacock.resize(100, 100); 
  
    for(let i of featherPoints1) {
        let pt = face.annotations.silhouette[i]; 
        pt = scalePoint(pt); 
        fill(0); 
        //circle(pt.x, pt.y, 10); 
        image(peacock, pt.x - 50, pt.y - 70); 
    }

    let featherPoints2 = [31, 32, 33, 34, 35];
    peacock_rev.resize(100, 100); 
  
    for(let i of featherPoints2) {
        let pt = face.annotations.silhouette[i]; 
        pt = scalePoint(pt); 
        fill(0); 
        //circle(pt.x, pt.y, 10); 
        image(peacock_rev, pt.x - 50, pt.y - 70); 
    }

    //ears 
    let ptLE = face.scaledMesh[234]; 
    ptLE = scalePoint(ptLE); 
    left_ear.resize(130, 130); 
    image(left_ear, ptLE.x - 100, ptLE.y - 40); 

    let ptRE = face.scaledMesh[454]; 
    ptRE = scalePoint(ptRE); 
    right_ear.resize(130, 130); 
    image(right_ear, ptRE.x - 30, ptRE.y - 40); 

    //nose
    let nose = face.scaledMesh[5]; 
    nose = scalePoint(nose); 
    trunk.resize(80, 100); 
    image(trunk, nose.x - 40, nose.y); 

    //eyes 
    fill(255);
    stroke(1);  
    let pt1 = face.scaledMesh[224]; 
    pt1 = scalePoint(pt1); 
    let pt2 = face.scaledMesh[196]; 
    pt2 = scalePoint(pt2);
    let pt3 = face.scaledMesh[234]; 
    pt3 = scalePoint(pt3);
    
    triangle(pt1.x, pt1.y, pt2.x, pt2.y, pt3.x, pt3.y); 

    let pt4 = face.scaledMesh[259]; 
    pt4 = scalePoint(pt4); 
    let pt5 = face.scaledMesh[419]; 
    pt5 = scalePoint(pt5); 
    let pt6 = face.scaledMesh[454]; 
    pt6 = scalePoint(pt6); 
    triangle(pt4.x, pt4.y, pt5.x, pt5.y, pt6.x, pt6.y); 



    // for(let i of leftEye) {
    //     let pt = face.mesh[i]; 
    //     pt = scalePoint(pt); 
    //     fill(255, 0, 0, 100); 
    //     triangle()
    // }
    // eyes
    // first, let's use the iris position as the center
    // let leftEye =  scalePoint(face.annotations.leftEyeIris[0]);
    // let rightEye = scalePoint(face.annotations.rightEyeIris[0]);

    // then use the face's overall bounding box to scale them
    // let topLeft =     scalePoint(face.boundingBox.topLeft);
    // let bottomRight = scalePoint(face.boundingBox.bottomRight);
    // let w = bottomRight.x - topLeft.x;
    // let dia = w / 6;

    // fill(255);
    // noStroke();
    // circle(leftEye.x,  leftEye.y,  dia);
    // circle(rightEye.x, rightEye.y, dia);

    // the mouth is split into four parts: the top/bottom
    // and their inner/outer lips – to use these to make a 
    // shape, we have to be a little creative
    // let mouth = [];
    // for (let pt of face.annotations.lipsUpperInner) {
    //   pt = scalePoint(pt);
    //   mouth.push(pt);
    // }
    // for (let pt of face.annotations.lipsLowerInner) {
    //   pt = scalePoint(pt);
    //   mouth.push(pt);
    // }

    // fill(50,0,0);
    // noStroke();
    // beginShape();
    // for (let pt of mouth) {
    //   vertex(pt.x, pt.y);
    // }
    // endShape(CLOSE);

    // if necessary, you can also grab points directly
    // from the mesh! (see the url at the top for an
    // image showing all the point locations)
    // let nose = scalePoint(face.scaledMesh[5]);
    // for (let d=w/6; d>=2; d-=1) {
    //   fill(255,150,0, map(d, w/6,2, 0,255));
    //   noStroke();
    //   circle(nose.x, nose.y, d);
    // }
  }
}


// converts points from video coordinates to canvas
function scalePoint(pt) {
  let x = map(pt[0], 0,video.width, 0,width);
  let y = map(pt[1], 0,video.height, 0,height);
  return createVector(x, y);
}


// gets face points from video input
async function getFace() {
  const predictions = await model.estimateFaces({
    input: document.querySelector('video')
  }); 
  if (predictions.length === 0) {
    face = undefined;
  }
  else {
    face = predictions[0];
  }
}

