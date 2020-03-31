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
        this.position.x += translationVector.x;
        this.position.y += translationVector.y;
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