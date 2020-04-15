import Rectangle from "./Rectangle"
import Shape from "./ShapeObject";

class Line extends Shape {
    constructor(config) {
        super(config);
        this.type = 'line';
        this._x1 = config.x1;
        this._x2 = config.x2;
        this._y1 = config.y1;
        this._y2 = config.y2;
        //the position of the line is the top left of the 'bounding box' around it
        this.position = {
            x: Math.min(this.x1, this.x2), y: Math.min(this.y1, this.y2)
        }
        //relative points are the points relative to the position we calculated above.
        this.relativePoints = [
            {
                x: this.x1 - this.position.x,
                y: this.y1 - this.position.y
            },
            {
                x: this.x2 - this.position.x,
                y: this.y2 - this.position.y
            }
        ]
        this.strokeColor = config.strokeColor;
        this.strokeWidth = config.strokeWidth;
    }
    //the following getter variables return the absolute position of the values.
    get x1(){
        return this.position.x+this._x1
    }
    get x2(){
        return this.position.x+this._x2
    }
    get y1(){
        return this.position.y+this._y1
    }
    get y2(){
        return this.position.y+this._y2
    }
    GetPoints() { //points should be relative to the container object.
        return this.relativePoints.map(point => {
            return { x: point.x + this.position.x, y: point.y + this.position.y }
        });
    }
    CollidesWithPoint(point) {
        return this.GetBoundingBox().CollidesWithPoint(point);
    }
    Translate(translationVector) {
        this.position.x += translationVector.x;
        this.position.y += translationVector.y;
    }
    GetBoundingBox() {
        return new Rectangle({
            position: {
                x: Math.min(this.x1, this.x2), y: Math.min(this.y1, this.y2)
            },
            width: Math.abs(this.x2 - this.x1),
            height: Math.abs(this.y2 - this.y1)
        });
    }
}

export default Line;