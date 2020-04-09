import Rectangle from "./Rectangle"
import ShapeObject from "./ShapeObject";

class Polygon extends ShapeObject {
    constructor(data) {
        super(data);
        this.type = 'polygon'
    }

    CollidesWithPoint(point) {
        return this.GetBoundingBox().CollidesWithPoint(point);
    }

    Translate(translationVector) {
        this.points.forEach(function (el) {
            el.x += translationVector.x;
            el.y += translationVector.y;
        });
    }

    GetBoundingBox() {
        var xValues = this.points.map(el => el.x);
        var yValues = this.points.map(el => el.y);

        var minX = Math.min(...xValues);
        var maxX = Math.max(...xValues);
        var minY = Math.min(...yValues);
        var maxY = Math.max(...yValues);

        return new Rectangle({
            position: {
                x: minX,
                y: minY
            },
            width: Math.abs(maxX - minX),
            height: Math.abs(maxY - minY)

        });
    }
    Scale(scaleVector) {
        this.points.forEach(function (point) {
            point.x *= scaleVector.x;
            point.y *= scaleVector.y;
        });
    };
}

export default Polygon;