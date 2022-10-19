/*
* submit-event.js
*/

console.log("running events.js...");

const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
paper.setup(canvas);
var plantPath = new paper.Path();


var width = canvas.width;
var height = canvas.height;

function prepareCanvas()
{
    ctx.resetTransform();  // prepare new canvas for drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    ctx.fillStyle = 'white'; 
    ctx.fillRect(0, 0, width, height);
}

document.addEventListener('DOMContentLoaded', (event) => {
    ctx.strokeStyle = 'black'; // move
    ctx.lineWidth  = 1.0;      // these
});


