import Shape from "./ShapeObject";

class Rectangle extends Shape {
    constructor(config) {
        super(config);
        this.type = 'rectangle'
        this.position = { ...config.position };
        this.width = config.width;
        this.height = config.height;
        this.fillColor = config.fillColor;
        this.strokeColor = config.strokeColor;
        this.strokeWidth = config.strokeWidth;
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
    //this does not work with rotations.
    CollidesWithPoint(point) {
        return this.position.x <= point.x && this.position.x + this.width >= point.x && this.position.y <= point.y && this.position.y + this.height >= point.y
    }
    //note that currently this bounding box just returns another rectangle
    //that is more or less exactly the same.
    GetBoundingBox() {
        return new Rectangle({
            position: Object.assign({}, this.position),
            width: this.width,
            height: this.height
        });
    }
    GetKonvaConfig() {
        return {
            id: this.id,
            x: this.position.x,
            y: this.position.y,
            width: this.width,
            height: this.height,
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

export default Rectangle;