import ShapeObject from "./ShapeObject";
import Ellipse from "./Ellipse";
import Line from "./Line";
import Polygon from "./Polygon";
import Rectangle from "./Rectangle";

class VectorDrawing {
    constructor(data) {
        if (data === undefined) {
            data = {};
        }
        Object.assign(this, data);

        this.uniqueIdCounter = 1; //unique id assigned to each object.
        this.objects = [];
        this.history = []; //history of shape modifications?
        this.width = 640;
        this.height = 480;

        // i feel like the selectedShape variable doesn't belong here, since the concept of a selected shape
        // only exists in the ui state, But i have no other place to put it at the moment
        // where my components can easily access it. for example, i have a button
        // that clears the canvas, if something is selected in the ui using the selection tool then this component
        // will not know that everything is supposed to be unselected unless i control it here

        //for now, we are changing this variable through the RemoveShape()
        //and RemoveAllShapes() function.
        this.selectedShape = undefined;

        if (data.objects) {
            data.objects.foreach((el, ind) => {
                this.AddShape(el);
            });
        }
    }
    static CreateShape(data) {
        switch (data.type) {
            case 'rectangle': {
                return new Rectangle(data)
            }
            case 'ellipse': {
                return new Ellipse(data)
            }
            case 'line': {
                return new Line(data)
            }
            case 'polygon': {
                return new Polygon(data)
            }
            default: {
                console.error('Unknown shape type in call to create shape');
                return new ShapeObject(data);
            }
        }
    }

    AddShape(shapeObj) {
        shapeObj = JSON.parse(JSON.stringify(shapeObj)); //making a copy of the object.
        shapeObj.id = this.uniqueIdCounter++;
        this.objects.push(VectorDrawing.CreateShape(shapeObj));
    }
    RemoveShape(shapeId) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === shapeId) {
                if (this.objects[i].id === this.selectedShape.id) {
                    this.selectedShape = undefined;
                }
                this.objects.splice(i, 1)
                return;
            }
        }
    }
    GetShapesAtPoint(point) {
        return this.objects.filter(el => el.CollidesWithPoint(point)).reverse();
    }

    RemoveAllShapes() {
        this.selectedShape = undefined;
        this.objects = [];
    }
}

export default VectorDrawing;