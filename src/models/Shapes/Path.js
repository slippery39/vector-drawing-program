import Shape from "./ShapeObject";

class Path extends Shape {
    constructor(config) {
        super(config);
        this.type = 'path'
        this.InitName();
        this.id = config.id;
        this.data = config.data
        this.fillColor = config.fillColor;
        this.strokeWidth = config.strokeWidth;
        this.strokeColor = config.strokeColor;
    }
    CollidesWithPoint(point) {
        return this.GetBoundingBox().CollidesWithPoint(point);
    }
    GetBoundingBox() {

    }
    GetKonvaConfig() {
        return {
            id: this.id,
            x: this.position.x,
            y: this.position.y,
            data: this.data,
            stroke: this.strokeColor,
            scaleX: this.scale.x,
            scaleY: this.scale.y,
            rotation: this.rotation,
            strokeScaleEnabled: false,
            draggable: !this.isLocked,
            strokeWidth: this.strokeWidth,
            fill: this.fillColor,
            hitStrokeWidth: Math.max(25, this.strokeWidth)
        }
    }
}

export default Path;