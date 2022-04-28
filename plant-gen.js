/*
* plant-gen.js
*/

console.log("running plant-gen.js...");
const canvas_p = canvas.getBoundingClientRect();

let t = new Turtle([width/2, height/2]);
let genResults = new Array();

(function() {
    var form = document.getElementById('plantForm');

    addEvent(form, 'submit', function(e) {
        e.preventDefault();  // stops form from being sent

        var elements = this.elements;
        
        t.reset();
        resetGenerations();
        prepareCanvas();

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
        console.log("angle-"+angle);
        console.log(t.getAngle());

        // set background color ------------------------------------------------
        
        // set plant stroke color ----------------------------------------------
        ctx.strokeStyle = 'black';
        lindenmeyer(axiom, rules, n); // , angle);
    });
} ());

function lindenmeyer(axiom, rules, n, angle)
{   
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);

    genResults.push(axiom);
    var resultant = axiom;
    for (let i = 0; i < n; i++) { 
        resultant = applyRules(rules, resultant);
        genResults.push(resultant);
    }

    draw(resultant);
    ctx.closePath();
    console.log("done!");
}

function draw(resultant)
{
    console.log("INITIAL ORIGIN: " + t.getOrigin());
    // trace first to get the right dimensions ---------------------------------
    traceLSystem(resultant);
    console.log(t.fitsCanvas());    

    t.centerOrigin();  // recenter origin point
    t.setPosition();   // set starting position to new origin 
    console.log("ORIGIN AFTER TRACE: " + t.getOrigin());

    // prepare positioning and draw --------------------------------------------
    t.resetAngle();    // reset angle for drawing
    t.initBoundaries();

    console.log("CENTER BEFORE DRAW: " + t.getCenter());
    drawLSystem(resultant);
    console.log("ORIGIN AFTER DRAW: " + t.getOrigin());
    console.log("CENTER AFTER DRAW: " + t.getCenter());

    t.resetAngle();
    t.initBoundaries();
}

function applyRules(rules, current)
{      
    let new_current = "";
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
        new_current += next; 
        next = "";
    }

    new_current = new_current.replace(/['"]+/g, '');
    current = new_current;
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
    let origin = t.getOrigin();

    prepareCanvas();
    t.setPosition();
    t.resetAngle();
    t.initBoundaries();

    ctx.beginPath();
    ctx.moveTo(origin[0], origin[1]);
    drawLSystem(genResults[idx]);
    ctx.closePath();
}

function getGenerationIndex()
{
    return document.getElementById('genSlider').value;
}

function resetGenerations()
{
    while (genResults.length != 0)
        genResults.pop();
}

document.getElementById("genSlider").addEventListener('click', (event) => {
    var rangeInput = document.getElementById('genSlider').value;
    getGenerationX(rangeInput);
});

// SCALE -----------------------------------------------------------------------

function scale(len)
{
    t.setStep(len);

    let origin = t.getOrigin();

    prepareCanvas();
    t.setPosition();
    t.resetAngle();
    t.initBoundaries();

    let idx = getGenerationIndex();

    ctx.beginPath();
    ctx.moveTo(origin[0], origin[1]);
    drawLSystem(genResults[idx]);
    ctx.closePath();
}

document.getElementById("scaleSlider").addEventListener('click', (event) => {
    var rangeInput = document.getElementById('scaleSlider').value;
    console.log("rangeInput - " + rangeInput);
    scale(rangeInput);
});

// DOWNLOAD --------------------------------------------------------------------

function DownloadPlantIMG()
{
    let dLink = document.createElement('a');
    let fileName = 'plant' + Date.now().toString() + '.png';
    dLink.setAttribute('download', fileName);
    let dURL = canvas.toDataURL('image/png');
    let url  = dURL.replace(/^data:image\/png/, 'data:application/octet-stream');
    dLink.setAttribute('href', url);
    dLink.click();
}
