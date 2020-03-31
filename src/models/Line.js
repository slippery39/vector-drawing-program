import Rectangle from "./Rectangle"
import ShapeObject from "./ShapeObject";

class Line extends ShapeObject {
    constructor(data) {
        super(data);
        this.type = 'line'
    }

    /* possible functions to add here:
    GetSlope();
    Width();
    Height();
    */

    GetPoints() {
        return [{
            x: this.x1, y: this.y1
        },
        { x: this.x2, y: this.y2 }]
    }

    //This is a little misleading.
    CollidesWithPoint(point) {
        return this.GetBoundingBox().CollidesWithPoint(point);
    }

    Translate(translationVector) {
        this.x1 += translationVector.x;
        this.x2 += translationVector.x;
        this.y1 += translationVector.y;
        this.y2 += translationVector.y;
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