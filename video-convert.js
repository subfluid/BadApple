const cv = require('opencv4nodejs');

// nearly verbatim from ocv4node docs
async function frameCapture(path) {
  const vCap = new cv.VideoCapture(path);
  let count = 0;

  let done = false;
  while (!done) {
    let frame = vCap.read();
    // loop back to start on end of stream reached
    if (frame.empty) {
      break;
    }
    // 
    cv.imwrite(`./frames/frame_${count}.jpg`, frame);
    console.log(count);
   
    await sleep(1);
    count++;
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// run
frameCapture("./video/badapple.mp4");