import Rectangle from "./Rectangle"
import Shape from "./ShapeObject";

class Polygon extends Shape {
    constructor(config) {
        /*
           Config for Polygon
        */
        super(config);        

        this.type = 'polygon'
        this.id = config.id;
        this.points = config.points.slice();
        this.fillColor = config.fillColor;
        this.strokeColor = config.strokeColor;
        //Find out the position of the polygon by finding its top left point
        //calculate the relative points
        var topLeftPoint = {
            x: this.GetBoundingBox().position.x,
            y: this.GetBoundingBox().position.y
        }
        //relative points to the position. these should never have to change.
        this._relativePoints = this.points.map(el => {
            return { x: el.x - topLeftPoint.x, y: el.y - topLeftPoint.y }
        });

        this.position = topLeftPoint;
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
    //depreciating these for now.
    Scale(scaleVector) {
        this.points.forEach(function (point) {
            point.x *= scaleVector.x;
            point.y *= scaleVector.y;
        });
    };
}

export default Polygon;