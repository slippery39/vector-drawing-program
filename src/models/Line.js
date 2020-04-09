import Rectangle from "./Rectangle"
import ShapeObject from "./ShapeObject";

class Line extends ShapeObject {
    constructor(data) {
        super(data);
        this.type = 'line'
    }

    GetPoints() {
        return [{
            x: this.x1, y: this.y1
        },
        { x: this.x2, y: this.y2 }]
    }

    CollidesWithPoint(point) {
        //make a polygon
        return this.GetBoundingBox().CollidesWithPoint(point);
    }
    GetPosition() {
        return this.GetBoundingBox().position;
    }
    SetPosition(positionVector) {
        var currentPosition = this.GetPosition();
        var diffX = positionVector.x - currentPosition.x;
        var diffY = positionVector.y - currentPosition.y;
        this.Translate({ x: diffX, y: diffY });
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
    Scale(scaleVector) {
        this.x1 = this.x1 + (this.x1 * scaleVector.x);
        this.x2 = this.x2 + (this.x2 * scaleVector.x);
        this.y1 = this.y1 + (this.y1 * scaleVector.y);
        this.y2 = this.y2 + (this.y2 * scaleVector.y);
    }
}

export default Line;