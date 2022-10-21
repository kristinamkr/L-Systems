/*
* submit-event.js
*/

const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

paper.setup(canvas); 
var tool = new paper.Tool();

var width = canvas.width;
var height = canvas.height;

function prepareCanvas() { }

// NOTE - i have NO idea what the null layer is, where or when it gets created
function clearCanvas()
{
    var i = (paper.project.layers).length - 1 ;
    while (i > 0) {
        if (paper.project.layers[i].name === null || 
            !(paper.project.layers[i].name === "background_layer"))
            paper.project.layers[i].remove();
        i--;
    }
}

function createLayer(name)
{
    var layer = new paper.Layer();
    layer.name = name;
}

function getLayers()
{
    return paper.project.layers;
}

function deselectLayer() 
{
    if (selectedLayer)
        selectedLayer.children[0].bounds.selected = false;
    selectedLayer = undefined;
}

function clearLayer(layer)
{
    if ((paper.project.layers).length > 1) {
        layer.remove();
        console.log("REMOVED");
    }
    console.log(layer);
}

function prepareBackgroundLayer()
{
    createLayer("background_layer");

    var background_def = new paper.Rectangle(0, 0, paper.project.view.bounds.width, paper.project.view.bounds.height);
    var background_00 = new paper.Path.Rectangle(background_def);
}

$('#picker').farbtastic(function(color) {
    paper.project.layers["background_layer"].children[0].fillColor
        = new paper.Color(color);
});

document.addEventListener('DOMContentLoaded', (event) => {
    prepareBackgroundLayer();
});
