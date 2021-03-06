import Shape from "./ShapeObject";

class Ellipse extends Shape {
    constructor(config) {
        super(config);
        this.type = 'ellipse';
        this.InitName();
        this.radius = { ...config.radius };
    }
    /*
    CollidesWithPoint(point) {
        // checking the equation of  
        // ellipse with the given point     
        //x,y - point x / y
        //a, b  a- horizontal radius, b, vertical radius
        const check = (Math.pow((point.x - this.position.x), 2) / Math.pow(this.radius.x, 2)) +
            (Math.pow((point.y - this.position.y), 2) / Math.pow(this.radius.y, 2));
        return check <= 1
    }*/
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
            strokeWidth: this.strokeWidth,
            scaleX: this.scale.x,
            scaleY: this.scale.y,
            rotation: this.rotation,
            strokeScaleEnabled: false,
            draggable: !this.isLocked
        }
    }
}

export default Ellipse;