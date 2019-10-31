// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Webcam Image Classification with ml5
// https://youtu.be/D9BoBSkLvFo

let mobilenet;
let classifier;
let video;
let label = 'test';
let fwdButton;
let leftButton;
let rightButton;
let trainButton;
let lcount = 0;
let webCam;

function modelReady() {
  console.log('Model is ready');
  // mobilenet.predict(gotResults);
}

function videoReady() {
  console.log('Video is ready')
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // console.log(results);
    // debugger
    // ARRAY OF ONLY TWO
    // console.log(result)
    label = result[0].label;
    classifier.classify(gotResults);
    // mobilenet.predict(gotResults);
  }
}

// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }


function setup() {
  webCam = createCanvas(600, 400);

  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  // fwdButton = createButton('Forward');
  // fwdButton.mousePressed(function() {
  //   classifier.addImage('forward');
  // })
  // lcount = 0;
  leftButton = createButton(`Left`);
  leftButton.style('position', 'absolute');
  leftButton.style('background', 'none');
  leftButton.style('border', '2px solid black');
  leftButton.style('padding', '20px');
  leftButton.style('border-radius', '5px');
  leftButton.style('font-size', '20px');
  leftButton.style('margin-top', '30px');
  leftButton.style('margin-left', '350px');
  leftButton.mousePressed(function() {
    classifier.addImage('left');
  })
  rightButton = createButton('Right');
  rightButton.style('position', 'absolute');
  rightButton.style('background', 'none');
  rightButton.style('border', '2px solid black');
  rightButton.style('padding', '20px 14px');
  rightButton.style('border-radius', '5px');
  rightButton.style('font-size', '20px');
  rightButton.style('margin-top', '110px');
  rightButton.style('margin-left', '350px');
  rightButton.mousePressed(function() {
    classifier.addImage('right');
    debugger
  })
  trainButton = createButton('Train');
  trainButton.style('position', 'absolute');
  trainButton.style('background', 'none');
  trainButton.style('border', '2px solid black');
  trainButton.style('padding', '8px 17px');
  trainButton.style('border-radius', '5px');
  trainButton.style('font-size', '20px');
  trainButton.style('margin-top', '178px');
  trainButton.style('margin-left', '350px');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  })
  
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
  // console.log(label)
}