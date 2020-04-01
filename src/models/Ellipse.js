import Rectangle from "./Rectangle"
import ShapeObject from "./ShapeObject";

class Ellipse extends ShapeObject {
    constructor(data) {
        super(data);
        this.type = 'ellipse';
    }

    CollidesWithPoint(point) {
        return this.GetBoundingBox().CollidesWithPoint(point);
    }

    Translate(translationVector) {
        var newPosition = {
            x: this.position.x += translationVector.x,
            y: this.position.y += translationVector.y
        }
        this.position = newPosition;
        super.Translate();       
    }
    GetBoundingBox() {
        var leftMostPoint = this.position.x - this.radius.x;
        var rightMostPoint = this.position.x + this.radius.x;
        var topMostPoint = this.position.y - this.radius.y;
        var bottomMostPoint = this.position.y + this.radius.y;

        return new Rectangle({
            position: {
                x: leftMostPoint, y: topMostPoint
            },
            width: Math.abs(rightMostPoint - leftMostPoint),
            height: Math.abs(topMostPoint - bottomMostPoint)
        });
    }
}

export default Ellipse;