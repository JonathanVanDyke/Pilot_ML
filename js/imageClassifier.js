let mobilenet;
let classifier;
let video;
let fwdButton;
let bckButton;
let leftButton;
let rightButton;
let rrButton;
let rlButton;
let resetButton;
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
    debugger
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
  webCam = createCanvas(600, 400).style(`transform: rotateY(180deg);`);

  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  mobilenet.config.numLabels = 8;
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
    // debugger
  })
  fwdButton = createButton('Forward');
  fwdButton.style('position', 'absolute');
  fwdButton.style('background', 'none');
  fwdButton.style('border', '2px solid black');
  fwdButton.style('padding', '20px 14px');
  fwdButton.style('border-radius', '5px');
  fwdButton.style('font-size', '20px');
  fwdButton.style('margin-top', '230px');
  fwdButton.style('margin-left', '350px');
  fwdButton.mousePressed(function() {
    classifier.addImage('forward');
    // debugger
  })
  bckButton = createButton('Backward');
  bckButton.style('position', 'absolute');
  bckButton.style('background', 'none');
  bckButton.style('border', '2px solid black');
  bckButton.style('padding', '20px 14px');
  bckButton.style('border-radius', '5px');
  bckButton.style('font-size', '20px');
  bckButton.style('margin-top', '350px');
  bckButton.style('margin-left', '350px');
  bckButton.mousePressed(function() {
    classifier.addImage('backward');
    // debugger
  })
  rrButton = createButton('Rotate Right');
  rrButton.style('position', 'absolute');
  rrButton.style('background', 'none');
  rrButton.style('border', '2px solid black');
  rrButton.style('padding', '20px 14px');
  rrButton.style('border-radius', '5px');
  rrButton.style('font-size', '20px');
  rrButton.style('margin-top', '400px');
  rrButton.style('margin-left', '350px');
  rrButton.mousePressed(function() {
    classifier.addImage('rr');
    // debugger
  })
  rlButton = createButton('Rotate Left');
  rlButton.style('position', 'absolute');
  rlButton.style('background', 'none');
  rlButton.style('border', '2px solid black');
  rlButton.style('padding', '20px 14px');
  rlButton.style('border-radius', '5px');
  rlButton.style('font-size', '20px');
  rlButton.style('margin-top', '450px');
  rlButton.style('margin-left', '350px');
  rlButton.mousePressed(function() {
    classifier.addImage('rl');
    // debugger
  })
  neutButton = createButton('Neutral');
  neutButton.style('position', 'absolute');
  neutButton.style('background', 'none');
  neutButton.style('border', '2px solid black');
  neutButton.style('padding', '20px 14px');
  neutButton.style('border-radius', '5px');
  neutButton.style('font-size', '20px');
  neutButton.style('margin-top', '300px');
  neutButton.style('margin-left', '350px');
  neutButton.mousePressed(function() {
    classifier.addImage('neutral');
    // debugger
  })
  resetButton = createButton('Reset!');
  resetButton.style('position', 'absolute');
  resetButton.style('background', 'none');
  resetButton.style('border', '2px solid black');
  resetButton.style('padding', '20px 14px');
  resetButton.style('border-radius', '5px');
  resetButton.style('font-size', '20px');
  resetButton.style('margin-top', '300px');
  resetButton.style('margin-left', '450px');
  resetButton.mousePressed(function() {
    classifier.addImage('reset');
    // debugger
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
  text(label, 10, height - 20)
  debugger
  // console.log(label)
}