/*
* plant-gen.js
*/

let t = new Turtle([width/2, height/2]);
var plantGenes = new Array();
var genealogy = {};

var selectedLayer;
var plantPath;  // to be moved

// TEMP
var submitCounter = 0; 

(function() {
    var form = document.getElementById('plantForm');

    addEvent(form, 'submit', function(e) {
        e.preventDefault();  // stops form from being sent

        var elements = this.elements;
        
        // CLEAN HOUSE
        t.reset();
        resetGenerations();
        deselectLayer() 

        var i = 0;  // never a case where a match isn't found...!
        for (; i < presets.length; i++) {
            if (elements.fractalType.value === presets[i].name)
                break;
        }
        const axiom = presets[i].axiom;
        console.log("axiom-"+axiom);
        
        var rules = new Array();
        Object.assign(rules, presets[i].rules);
        console.log("rules-"+rules);
        
        const n = presets[i].generation;  // # of gens 
        document.getElementById('genSlider').max = n;
        document.getElementById('genSlider').value = n;
        console.log("n-"+n);

        var stepSize = presets[i].max_step;
        if (document.getElementById('scaleSlider').max != stepSize) {
            document.getElementById('scaleSlider').max = stepSize;
            document.getElementById('scaleSlider').value = stepSize;
            t.setStep(stepSize);
        }

        let angle = presets[i].base_angle; 
        t.setAngle(angle);
        console.log(t.getAngle());

        // declare new layer, name it (need to inc. xxxx)
        layerName = String(presets[i].name) + "_plantLayer" + submitCounter;
        createLayer(layerName);

        console.log("active layer - " + paper.project.activeLayer.name);
        console.log(paper.project.layers);

        lindenmayer(axiom, rules, n); // , angle);
        // getGenealogy();
        submitCounter++;
    });
} ());

/*
function updatePlantForm()
{
    if (selectedLayer) {
        console.log("UPDATE FORM - SELECTED LAYER = " + selectedLayer);
        console.log(document.getElementById('fractalType').value + " <--- WORKS?");
        console.log(selectedLayer.name.charAt(0) + " <--- PWEASE?");
        if (!(selectedLayer.name.charAt(0) === document.getElementById('fractalType').value)) {
            let idx = parseInt(selectedLayer.name.charAt(0));
            console.log("WORK PLEASE");
            document.getElementById('fractalType').value = presets[idx].name;
            document.getElementById('genSlider').max = presets[idx].generation;  
            document.getElementById('scaleSlider').max = presets[idx].max_step;
        }
    }
}
*/

function lindenmayer(axiom, rules, n, angle)
{   
    plantPath = new paper.CompoundPath();  // to be moved
    plantPath.name = "plantPath" + submitCounter;
    plantPath.strokeColor = 'black';

    plantGenes.push(resultant);
    var resultant = axiom;
    for (let i = 0; i < n; i++) { 
        resultant = applyRules(rules, resultant);
        plantGenes.push(resultant);
    }

    draw(resultant);
    plantPath.closePath();

    genealogy[paper.project.activeLayer.name] = [...plantGenes];
}

function draw(resultant)
{
    // trace first to get the right dimensions ---------------------------------
    // traceLSystem(resultant);
    // console.log(t.fitsCanvas());    

    t.setPosition();   // set starting position to new origin 

    // prepare positioning and draw --------------------------------------------
    t.resetAngle();    // reset angle for drawing

    drawLSystem(resultant);

    t.resetAngle();
}

function applyRules(rules, current)
{      
    let newCurrent = "";
    let next = "";

    for (let i = 0; i < current.length; i++) {
        let c = current.charAt(i);
        if (c === "F" || c === "A") {
            let rand = Math.floor(Math.random() * (rules[0][1].length - 0));
            next = JSON.stringify(rules[0][1][rand]);
        }
        else if (c === "X" || c === "B") {
            next = JSON.stringify(rules[1][1]);
        }
        else {
            next = c;
        }
        newCurrent += next; 
        next = "";
    }

    newCurrent = newCurrent.replace(/['"]+/g, '');
    current = newCurrent;
    return current;
} 

function traceLSystem(resultant)
{
    if (resultant === undefined) return -1; // error check

    for (let i = 0; i < resultant.length; i++) {
        let c = resultant.charAt(i);
            if (c === "F" || c === "X" || c === ".") // check to see if in bounds
                t.goAhead();
            else if (c === "A")
                t.goAheadLeft();
            else if (c === "B")
                t.goAheadRight();
            else if (c === "+")
                t.turnLeft();
            else if (c === "-")
                t.turnRight();
            else if (c === "[")
                t.storeMatrix();
            else if (c === "]")
                t.pushMatrix();
            else console.log("unidentified char");
    }
}

function drawLSystem(resultant)
{
    if (resultant === undefined) return -1; // error check

    for (let i = 0; i < resultant.length; i++) {
        let c = resultant.charAt(i);
            if (c === "F" || c === "X")
                t.moveForward();
            else if (c === "A")
                t.moveForwardLeft();
            else if (c === "B")
                t.moveForwardRight();
            else if (c === ".")
                t.goAhead();
            else if (c === "+")
                t.turnLeft();
            else if (c === "-")
                t.turnRight();
            else if (c === "[")
                t.storeMatrix();
            else if (c === "]")
                t.pushMatrix();
            else console.log("unidentified char");
    }
}

// GENERATION ------------------------------------------------------------------

function getGenerationX(idx)
{
    if (selectedLayer)
        currentLayer = selectedLayer;
    else currentLayer = paper.project.activeLayer;
    currentName = currentLayer.name;

    console.log("LAYER - " + currentLayer.name);

    let origin = t.getOrigin();
    clearLayer(currentLayer);

    t.setPosition();
    t.resetAngle();
    createLayer(currentName);

    plantPath = new paper.CompoundPath();
    plantPath.name = "plantPath";
    plantPath.strokeColor = 'black';
    plantPath.moveTo(origin[0], origin[1]);
    drawLSystem((genealogy[currentLayer.name])[idx]);
    plantPath.closePath();
}

function getGenerationIndex()
{
    return document.getElementById('genSlider').value;
}

function resetGenerations()
{
    while (plantGenes.length != 0)
        plantGenes.pop();
}

function getGenealogy()
{
    for (const [key, value] of Object.entries(genealogy))
        console.log(key, value)
}

document.getElementById("genSlider").addEventListener('click', (event) => {
    var rangeInput = document.getElementById('genSlider').value;
    getGenerationX(rangeInput);
});

// SCALE -----------------------------------------------------------------------

function scale(len)
{
    t.setStep(len);
    let idx = getGenerationIndex();
    getGenerationX(idx);
}

document.getElementById("scaleSlider").addEventListener('click', (event) => {
    var rangeInput = document.getElementById('scaleSlider').value;
    console.log("rangeInput - " + rangeInput);
    scale(rangeInput);
});

// DRAG MODE -------------------------------------------------------------------

paper.tool.onMouseDown = function(event) 
{
    for (let i = (paper.project.layers).length- 1; i > 0; i--) {
        let currentLayer = paper.project.layers[i];

        let currentPlant = currentLayer.children[0];
        if (currentPlant.bounds.contains(event.point)) {
            currentPlant.bounds.selected = true;
            if (selectedLayer) {
                if (!(currentLayer.name === selectedLayer.name))
                    selectedLayer.children[0].bounds.selected = false;
            }
            selectedLayer = currentLayer;
            console.log("CLICKED - selectedLayer = " + selectedLayer.name);
            break;
        }
        else
            deselectLayer();
    }
}

paper.tool.onMouseDrag = function(event) 
{
    if (selectedLayer)
        selectedLayer.children[0].position = event.point;
}

// DELETE SELECTED LAYER -------------------------------------------------------

// UI implementation ! make it so that there's an 'X' somewhere along plant bounds
paper.tool.onKeyUp = function(event)
{
    if (event.key == 'backspace') {
        if (selectedLayer)
            clearLayer(selectedLayer); 
        selectedLayer = undefined;
    }
}

// DOWNLOAD --------------------------------------------------------------------

function DownloadPlantIMG()
{
    deselectLayer();  // to not print bound lines...
    let dLink = document.createElement('a');
    let fileName = 'plant' + Date.now().toString() + '.png';
    dLink.setAttribute('download', fileName);
    let dURL = canvas.toDataURL('image/png');
    let url  = dURL.replace(/^data:image\/png/, 'data:application/octet-stream');
    dLink.setAttribute('href', url);
    dLink.click();
}
