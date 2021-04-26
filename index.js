/*========/
  module
/========*/
const cv = require('opencv4nodejs');
/*
const Discord = require('discord.js');
const secret = require('./token');
*/

/*========/
  const
/========*/
// Unicode Blocks //
let shades = [' ', '░', '▒', '▓', '█']; // shades [0%, 25%, 50%, 75%, 100%]
let bw = [' ', '▀', '▄', '█']; // 'black/white'
// Animation Data //
const resX = 960, // res of original video
      resY = 720; 
const noFrames = 6572; // frame no of original video
// Unicode Print Data //
const ar = 4/3; // aspect ratio (of video)
const scale = 72; // scale factor (x dim)
const nX = Math.round(scale), // column
      nY = Math.round(scale/ar/2); // row
console.log(`Bad Apple\r\nCONFIG:\r\n\tres:(${nX}, ${nY})`);
// Pixel Iteration Vars //
const xOff = Math.round(resX/nX/2), // x offset (px) [both help to center low res images]
      yOff = Math.round(resY/nY/2); // y offset (px)
const xInc = resX/nX, // x loop increment (px), may be a float (rounded off later)
      yInc = resY/nY; // y loop increment (px), may be a float


/*========/
  discord
/========*/
/*
client = new Discord.Client();
client.login(secret.token);
// Discord.js Events
client.on('ready', () => {
  console.log('ready');
});
client.on('message', async msg => {
  // play command >> f$play
  if (msg.content.startsWith('f$play'))
  {
    if (msg.author.id === secret.whitelist_id)
    {
      main(msg);
    }
  }
});
*/

/*========/
  fn
/========*/
// read all frames in Frames (print)
async function main(msg)
{
  await sleep(2000);
  // loop over entire animation //
  for(let frameNo = 0; frameNo < noFrames; frameNo++) {
    // image matrix //
    const mat = cv.imread(`./frames/frame_${frameNo}.jpg`);
    let strFrame = ''; // string-ified frame
    // append to strFrame //
    for(let iterY = 0; iterY < nY; iterY++) {
      let pY = yOff + Math.round(yInc * iterY); // px y/row
      for(let iterX = 0; iterX < nX; iterX++) {
        let pX = xOff + Math.round(xInc * iterX); // px x/col
        const r = mat.atRaw(pY, pX)[2];

        // unignore comments >> utilize bw array (extra unicode palette)  //
        // commented flawed portion                                       //
        let s = Math.round(r*4/255);
        /* // better noise implementation(?): get std dev of sampled points, threshold exceeded = 'noisy' enough to use 'bw' array
        if (r === 0 || r === 4) {   // If pixel is 'pure' black/white
          // sampling subsection
          let y1 = yOff + Math.round(yInc * (iterY-.25));
          let y2 = yOff + Math.round(yInc * (iterY+.25));
          const [,,red1] = mat.a tRaw(y1, pX);
          const [,,red2] = mat.atRaw(y2, pX);
          strFrame += bw[(red2>127)*2 + (red1>127)];
        } else                    // Continue on with normal shading //
        */
          strFrame += shades[s];
      }
      strFrame += '\n';
    }
    // print frame number
    //console.log(frameNo);
    // print unicode frame 
    console.log(strFrame);

    // send bot message to same channel as message
    /*
    let content = "```" + strFrame + "```";
    msg.channel.send(content);
    */
    
    // discord bots can only send 5 messages every 5 seconds per channel
    // recommended interval (Discord): 1500 ms
    await sleep(16); 
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// run (comment out if using discord)
main();
