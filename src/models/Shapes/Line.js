import Rectangle from "./Rectangle"
import Shape from "./ShapeObject";

class Line extends Shape {
    constructor(config) {
        super(config);
        this.type = 'line';
        this.InitName();
        this.name = this.type;

        if (config.x1 === undefined || config.x2 === undefined || config.y1 === undefined || config.y2 === undefined) {
            console.error(`Attempted to initialize line with bad points [${config.x1},${config.y1},${config.x2},${config.y2}]`);
        }

        this._x1 = config.x1;
        this._x2 = config.x2;
        this._y1 = config.y1;
        this._y2 = config.y2;
        //the position of the line is the top left of the 'bounding box' around it
        this.position = {
            x: Math.min(this._x1, this._x2), y: Math.min(this._y1, this._y2)
        }
        //relative points are the points relative to the position we calculated above.
        this.relativePoints = [
            {
                x: this._x1 - this.position.x,
                y: this._y1 - this.position.y
            },
            {
                x: this._x2 - this.position.x,
                y: this._y2 - this.position.y
            }
        ]
    }
    //the following getter variables return the absolute position of the values.
    get x1() {
        return this.position.x + this.relativePoints[0].x;
    }
    get x2() {
        return this.position.x + this.relativePoints[1].x;
    }
    get y1() {
        return this.position.y + this.relativePoints[0].y;
    }
    get y2() {
        return this.position.y + this.relativePoints[1].y;
    }
    GetPoints() { //points should be relative to the container object.
        return this.relativePoints.map(point => {
            return { x: point.x + this.position.x, y: point.y + this.position.y }
        });
    }
    CollidesWithPoint(point) {
        return this.GetBoundingBox().CollidesWithPoint(point);
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
    GetKonvaConfig() {
        //the testing framework doesn't have Array.flat() avaiable :(
        const flattenedArr = [].concat(...this.relativePoints.map(p => [p.x, p.y]));
        return {
            id: this.id,
            x: this.position.x,
            y: this.position.y,
            points: flattenedArr,
            stroke: this.strokeColor,
            scaleX: this.scale.x,
            scaleY: this.scale.y,
            rotation: this.rotation,
            strokeScaleEnabled: false,
            draggable: !this.isLocked,
            strokeWidth: this.strokeWidth,
            hitStrokeWidth: Math.max(25, this.strokeWidth)
        }
    }
}

export default Line;