/*
* turtle.js
*/

console.log("running turtle.js...");

class Turtle {
    _NORTH = 90;
    _step  = 5;
    _angle;
    _origin;

    _MAX_X; // use MAX, MIN to designate image borders
    _MIN_X;
    _MAX_Y;
    _MIN_Y;
    
    constructor(origin) {
        this._origin = origin;
        this.x = origin[0];
        this.y = origin[1];
        this.a = this._NORTH;
        this.savedState = new Array();

        this.initBoundaries();
    }

    getPosition() { return [this.x, this.y]; }

    getAngle()    { return this.a; }

    getStep()     { return this._step; }

    getOrigin()   { return this._origin; }

    getBoundaries()
    {
        // console.log("min_x: "+this._MIN_X+"\nmin_y: "+this._MIN_Y+"\n\nmax_x: "+this._MAX_X+"\nmax_y: "+this._MAX_Y);
        return [[this._MIN_X, this._MIN_Y], [this._MAX_X, this._MAX_Y]];
    }

    getCenter()
    {
        let w_ = (this._MAX_X - this._MIN_X) / 2.0;
        let h_ = (this._MAX_Y - this._MIN_Y) / 2.0;
        // console.log("-=-=- center -=-=-\n\tw_: "+w_+"\n\th_: "+h_);
        return [w_, h_];
    }

    turnLeft()  { this.a += this._angle; }

    turnRight() { this.a -= this._angle; }

    // draws a straight line ahead
    moveForward()
    {
        let x = this.x + this._step * Math.cos(degreesToRadians(this.a));
        let y = this.y + this._step * Math.sin(degreesToRadians(this.a));

        if (this._MAX_X < x) this._MAX_X = x;
        if (this._MIN_X > x) this._MIN_X = x;
        if (this._MAX_Y < y) this._MAX_Y = y;
        if (this._MIN_Y > y) this._MIN_Y = y;
        
        plantPath.moveTo(this.x, this.y);
        plantPath.add(x, y)
        //ctx.moveTo(this.x, this.y);
        //ctx.lineTo(x, y);
        //ctx.stroke();
        
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

        if (this._MAX_X < x) this._MAX_X = x;
        if (this._MIN_X > x) this._MIN_X = x;
        if (this._MAX_Y < y) this._MAX_Y = y;
        if (this._MIN_Y > y) this._MIN_Y = y;
        
        ctx.moveTo(this.x, this.y);

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
    }

    // i have no idea what i tried doing here but it needs to be fixed later
    centerOrigin() // not quite center canvas...
    {
        let origin = this.getOrigin();
        let center = this.getCenter();
        // console.log("Origin center = "+origin);
        // console.log("centerOrigin center = "+center);
        
        // if ( 
        if (center[0] > 0) origin[0] = origin[0] - center[0];
        else if (center[0] < 0) origin[0] = origin[0] + center[0];
        
        if (center[1] > 0) origin[1] = origin[1] - center[1];
        else if (center[1] < 0) origin[1] = origin[1] + center[1];

        this.setOrigin([width/2, origin[1]]);
        // console.log("new origin: "+this.getOrigin());
    }

    fitsCanvas()
    {
        let w_ = Math.ceil(Math.abs(this._MAX_X) - Math.abs(this._MIN_X));
        let h_ = Math.ceil(Math.abs(this._MIN_Y) - Math.abs(this._MAX_Y));

        if ((w_ * h_) > (width * height)) return false;
        return true;        
    }

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

    initBoundaries()
    {
        this._MAX_X = this.x;
        this._MIN_X = this.x;
        this._MAX_Y = this.y;
        this._MIN_Y = this.y;
    }
    
    reset()
    {
        this.resetOrigin();
        this.initBoundaries();
        this.resetAngle();
    }
}

function degreesToRadians(degrees) { return degrees * (Math.PI/180); }
