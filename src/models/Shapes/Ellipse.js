import Rectangle from "./Rectangle"
import Shape from "./ShapeObject";

class Ellipse extends Shape {
    constructor(config) {
        super(config);
        this.type = 'ellipse';
        this.radius = { ...config.radius };
        this.fillColor = config.fillColor;
        this.strokeColor = config.strokeColor;
        this.stokeWidth = config.strokeWidth;
    }
    CollidesWithPoint(point) {
        // checking the equation of  
        // ellipse with the given point     
        //x,y - point x / y
        //a, b  a- horizontal radius, b, vertical radius
        var check = (Math.pow((point.x - this.position.x), 2) / Math.pow(this.radius.x, 2)) +
            (Math.pow((point.y - this.position.y), 2) / Math.pow(this.radius.y, 2));
        return check <= 1
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
    GetKonvaConfig() {
        return {
            id: this.id,
            x: this.position.x,
            y: this.position.y,
            radius: {
                x: this.radius.x,
                y: this.radius.y
            },
            fill: this.fillColor,
            stroke: this.strokeColor,
            scaleX: this.scale.x,
            scaleY: this.scale.y,
            rotation: this.rotation,
            strokeScaleEnabled: false,
            draggable: true
        }
    }
}

export default Ellipse;