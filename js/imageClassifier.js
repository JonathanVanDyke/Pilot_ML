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
  createCanvas(window.innerWidth / 2, window.innerHeight / 2);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  // fwdButton = createButton('Forward');
  // fwdButton.mousePressed(function() {
  //   classifier.addImage('forward');
  // })
  leftButton = createButton('Left');
  leftButton.mousePressed(function() {
    classifier.addImage('left');
  })
  rightButton = createButton('Right');
  rightButton.mousePressed(function() {
    classifier.addImage('right');
    debugger
  })
  trainButton = createButton('Train');
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