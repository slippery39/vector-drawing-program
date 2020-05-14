import Shape from "./ShapeObject";

class Line extends Shape {
    constructor(config) {
        super(config);
        this.type = 'line';
        this.InitName();
        this.name = this.type;
        this.points = config.points;
        this.CalculatePosition();
        this.CalculateRelativePoints();
    }

    //mainly have these so i don't need to update any unit tests but these should be removed soon.
    get x1() {
        return this.points[0].x;
    }
    get y1() {
        return this.points[0].y
    }
    get x2() {
        return this.points[1].x
    }
    get y2() {
        return this.points[1].y
    }

    SetPoint(index, point) {
        this.points[index] = point;
        //update the relative points and the position here.
        //position always needs to be calculated before the relative points
        this.CalculatePosition();
        this.CalculateRelativePoints();
    }
    CalculatePosition() {
        this.position = {
            x: Math.min(this.points[0].x, this.points[1].x), y: Math.min(this.points[0].y, this.points[1].y)
        }
    }
    CalculateRelativePoints() {
        //relative points are the points relative to the position we calculated above.
        this.relativePoints = [
            {
                x: this.points[0].x - this.position.x,
                y: this.points[0].y - this.position.y
            },
            {
                x: this.points[1].x - this.position.x,
                y: this.points[1].y - this.position.y
            }
        ]
    }
    GetPoints() { //points should be relative to the container object.
        return this.points.map(point => {
            return { x: point.x, y: point.y }
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