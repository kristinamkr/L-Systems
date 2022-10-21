/*
* turtle.js
*/

console.log("running turtle.js...");

class Turtle {
    _NORTH = -90;
    _step  = 5;
    _angle;
    _origin;

    // NOTE TO SELF - origin = midpoint passed through plantGen turtle construct
    constructor(origin) {
        this._origin = origin;
        this.x = origin[0];
        this.y = origin[1];
        this.a = this._NORTH;
        this.savedState = new Array();
    }

    getPosition() { return [this.x, this.y]; }

    getAngle()    { return this.a; }

    getStep()     { return this._step; }

    getOrigin()   { return this._origin; }

    // getCenter()   { paper.

    turnLeft()  { this.a += this._angle; }

    turnRight() { this.a -= this._angle; }

    moveForward()
    {
        let x = this.x + this._step * Math.cos(degreesToRadians(this.a));
        let y = this.y + this._step * Math.sin(degreesToRadians(this.a));

        plantPath.moveTo(this.x, this.y);
        plantPath.children[plantPath.children.length-1].add(new paper.Point(x, y));
        
        this.x = x;
        this.y = y;
    }

    moveForwardLeft()
    {
        moveForward();
        turnLeft();
        moveForward();
    }

    moveForwardRight()
    {
        moveForward();
        turnRight();
        moveForward();
    }

    goAhead()
    {
        let x = this.x + this._step * Math.cos(degreesToRadians(this.a));
        let y = this.y + this._step * Math.sin(degreesToRadians(this.a));

        plantPath.moveTo(this.x, this.y);

        this.x = x;
        this.y = y;
    }

    goAheadLeft()
    {
        goAhead();
        turnLeft();
        goAhead();
    }

    goAheadRight()
    {
        goAhead();
        turnRight();
        goAhead();
    }

    storeMatrix()
    {
        this.savedState.push([this.x, this.y, this.a]);
    }

    pushMatrix()
    {
        let point = this.savedState.pop();
        this.x = point[0];
        this.y = point[1];
        this.a = point[2];
        plantPath.moveTo(this.x, this.y);
    }

    /*
    fitsCanvas()
    {
        let plantBounds = plantPath.bounds;
        let max_x = plantPath.bounds._x + plantPath.bounds._width;
        let max_y = plantPath.bounds._y + plantPath.bounds._height;
        console.log("inside fitsCanvas... \n\tmax_x = " + max_x + "\n\tmax_y = " + max_y);

        let w_ = Math.ceil(Math.abs(max_x) - Math.abs(plantPath.bounds._x));
        let h_ = Math.ceil(Math.abs(plantPath.bounds._y) - Math.abs(max_y));

        if ((w_ * h_) > (width * height)) return false;
        return true;        
    }
    */

    setAngle(angle) { this._angle = angle; }

    setStep(len)    { this._step = len; }

    setOrigin(nOrigin)
    {
        this._origin = nOrigin;
    }

    setPosition()
    {
        this.x = this._origin[0];
        this.y = this._origin[1];
    }

    resetOrigin() { this.setOrigin([width/2, height/2]); }
   
    resetAngle()  { this.a = this._NORTH; }

    reset()
    {
        this.resetOrigin();
        this.resetAngle();
    }
}

function degreesToRadians(degrees) { return degrees * (Math.PI/180); }
