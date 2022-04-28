/*
* snippets.js
*/

let images = new Array(); 
let isMoving = false;

function captureImage(idx)
{
    let bounds = t.getBoundaries();
    let min_point = bounds[0];
    let max_point = bounds[1];
    console.log("boundaries ---\nmin_point: " + min_point + 
                "\nmax_point: " + max_point);

    let imageWidth =  Math.ceil(max_point[0] - min_point[0]); // (x_max - x_min)
    let imageHeight = Math.ceil(max_point[1] - min_point[1]); // (y_max - y_min)
    ctx.strokeRect(min_point[0], max_point[1], imageWidth, imageHeight * -1.0);
    let imageData = ctx.getImageData(min_point[0], max_point[1], imageWidth, imageHeight * -1.0);

    images[idx] = imageData;
    images.sort(function(a, b)
    {
        return b.length - a.length;
    });
    console.log(verifyImageData(imageData));

    for (let i = 0; i < images.length; i++)
        console.log("images["+i+"]-"+images[i].data);
    console.log("image captured!");
}

function getImageX(idx, x, y)
{
    prepareCanvas();
    t.setPosition();
    t.resetAngle();

    ctx.putImageData(images[idx], x, y);
}

function resetImages()
{
    while (images.length != 0)
        images.pop();
    console.log("images reset!");
}

canvas.addEventListener('mousedown', (event) => {
    isMoving = true;
    console.log("dragging!");
    // let mouse_x = (event).offsetX;
    // let mouse_y = (event).offsetY;
    // console.log("top left ("+mouse_x+", "+mouse_y+")");
});

canvas.addEventListener('mousemove', (event) => {
    if (isMoving) {
        let origin_coord = t.getOrigin();
        let center_coord = t.getCenter();
        // console.log("in event reader... origin: " + origin_coord);
        console.log("in event reader... center: " + center_coord);

        let mouse_x = (event).offsetX - center_coord[0];
        let mouse_y = (event).offsetY - center_coord[1];
        console.log("mouse ("+mouse_x+", "+mouse_y+")");

        let idx = getGenerationIndex();
        getImageX(idx, mouse_x, mouse_y)
    }
});

canvas.addEventListener('mouseup', (event) => {
    console.log("drag released!");
    /*
    let origin_coord = t.getOrigin();
    console.log("mouseup... origin: " + origin_coord);

    // console.log("mouseup... NEW origin: " + origin_coord);

    let center_coord = t.getCenter();

    let mouse_x = (event).offsetX - center_coord[0];
    let mouse_y = (event).offsetY - center_coord[1];
    console.log("mouse ("+mouse_x+", "+mouse_y+")");
    */
    isMoving = false;
});

/*
function adjustAngle(angle)
{
    prepareCanvas();
    t.reset();
    
    t.setAngle(angle);
    let idx = getGenerationIndex();

    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    drawLSystem(genResults[idx]);
    ctx.closePath();
}
*/

/* nope
document.getElementById("angleSlider").addEventListener('click', (event) => {
    var rangeInput = document.getElementById('angleSlider').value;
    adjustAngle(rangeInput);
});
*/

/*
document.getElementById("center").addEvent(form, 'submit', function(e) {
    console.log("center");

});
*/
