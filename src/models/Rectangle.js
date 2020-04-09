import ShapeObject from "./ShapeObject";

class Rectangle extends ShapeObject {
    constructor(data) {
        super(data);
        if (data.position === undefined) {
            console.error("no position found for rectangle");
        }
        if (data.width === undefined) {
            console.error("no width found for rectangle");
        }
        if (data.height === undefined) {
            console.error("no height found for rectangle");
        }
        this.type = 'rectangle'
    }
    Translate(translationVector) {
        this.position.x += translationVector.x;
        this.position.y += translationVector.y;
    }

    GetPoints() {
        //top left corner
        var minX = this.position.x
        var minY = this.position.y

        //top right corner
        var maxX = this.position.x + this.width
        var maxY = this.position.y + this.height

        const points = [
            { x: minX, y: minY },
            { x: maxX, y: minY },
            { x: minX, y: maxY },
            { x: maxX, y: maxY }
        ]

        return points;
    }
    //note - if we introduce rotations into our app, then 
    //this collision algorithm may no longer make sense.
    CollidesWithPoint(point) {
        return this.position.x <= point.x && this.position.x + this.width >= point.x && this.position.y <= point.y && this.position.y + this.height >= point.y
    }

    //note that currently the bounding box just returns another rectangle
    //that is more or less exactly the same.
    GetBoundingBox() {
        return new Rectangle({
            position: Object.assign({}, this.position),
            width: this.width,
            height: this.height
        });
    }
    Scale(scaleVector) {
        this.width *= scaleVector.x;
        this.height *= scaleVector.y
    }
}

export default Rectangle;