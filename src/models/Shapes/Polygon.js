import Shape from "./ShapeObject";

class Polygon extends Shape {
    constructor(config) {
        super(config);
        this.type = 'polygon'
        this.InitName();
        this.id = config.id;
        //original points?
        this._points = config.points.slice();

        //Find out the position of the polygon by finding its top left point
        //We have copied this block of code from the GetBoundingBox(), since we need to iniialize everything first.
        const xValues = this._points.map(el => el.x);
        const yValues = this._points.map(el => el.y);

        const minX = Math.min(...xValues);
        const minY = Math.min(...yValues);

        const topLeftPoint = {
            x: minX,
            y: minY
        }

        this.position = topLeftPoint;

        //the points with their x/y values relative to the position calculated above.
        this.relativePoints = this._points.map(el => {
            return { x: el.x - topLeftPoint.x, y: el.y - topLeftPoint.y }
        });
    }
    get points() {
        //return an array of the relative points + the current position.
        return this.relativePoints.map(point => {
            return { x: point.x + this.position.x, y: point.y + this.position.y }
        });
    }
    GetKonvaConfig() {
        const flattenedArr = [].concat(...this.relativePoints.map(p => [p.x, p.y]));
        return {
            id: this.id,
            x: this.position.x,
            y: this.position.y,
            points: flattenedArr,
            fill: this.fillColor,
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth,
            scaleX: this.scale.x,
            scaleY: this.scale.y,
            rotation: this.rotation,
            strokeScaleEnabled: false,
            draggable: !this.isLocked,
            closed: true
        }
    }
}

export default Polygon;