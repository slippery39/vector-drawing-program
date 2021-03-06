import Shape from "./ShapeObject";

class Rectangle extends Shape {
    constructor(config) {
        super(config);
        this.type = 'rectangle'
        this.InitName();
        this.width = config.width;
        this.height = config.height;
    }
    GetPoints() {
        //top left corner
        const minX = this.position.x
        const minY = this.position.y

        //top right corner
        const maxX = this.position.x + this.width
        const maxY = this.position.y + this.height

        const points = [
            { x: minX, y: minY },
            { x: maxX, y: minY },
            { x: minX, y: maxY },
            { x: maxX, y: maxY }
        ]

        return points;
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
            strokeWidth: this.strokeWidth,
            scaleX: this.scale.x,
            scaleY: this.scale.y,
            rotation: this.rotation,
            strokeScaleEnabled: false,
            draggable: !this.isLocked
        }
    }
}

export default Rectangle;