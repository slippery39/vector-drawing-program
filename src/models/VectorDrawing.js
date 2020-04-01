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
        this.history = []; //need the initial object in there?
        this.historyIndex = -1; //no index yet;
        this.width = 640;
        this.height = 480;
        // i feel like the selectedShape variable doesn't belong here, since the concept of a selected shape
        // only exists in the ui state, But i have no other place to put it at the moment
        // where my components can easily access it. for example, i have a button
        // that clears the canvas, if something is selected in the ui using the selection tool then this component
        // will not know that everything is supposed to be unselected unless i control it here

        //for now, we are changing this variable through the RemoveShape()
        //and RemoveAllShapes() function.
        this.selectedShapeId = undefined;

        if (data.objects) {
            data.objects.foreach((el, ind) => {
                this.AddShape(el, true); //dont save the history for this initialization.
            });
        }
        this.SaveHistory();
    }
    SelectedShape() {
        if (this.selectedShapeId === undefined) {
            return undefined;
        }
        return this.objects.find(e => e.id === this.selectedShapeId);
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
    AddShape(shapeObj, dontSaveHistory) {
        shapeObj = JSON.parse(JSON.stringify(shapeObj)); //making a copy of the object.
        shapeObj.id = this.uniqueIdCounter++;
        this.objects = this.objects.slice();
        const newShape = VectorDrawing.CreateShape(shapeObj);
        this.objects.push(newShape);
        if (!dontSaveHistory) {
            this.SaveHistory();
        }
    }
    SaveHistory() {
        //Get rid of any history objects that are past the current history point.
        //They will be overwritten this isn't working so well at the moment.
        this.historyIndex++;
        this.history.splice(this.historyIndex, this.history.length);
        this.history.push({ historyId: this.historyIndex, objects: this.objects });
    }
    RemoveShape(shapeId) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === shapeId) {
                if (this.selectedShapeId && this.objects[i].id === this.selectedShapeId) {
                    this.selectedShapeId = undefined
                }
                this.objects = Array.from(this.objects);
                this.objects.splice(i, 1);
                this.SaveHistory();

                return;
            }
        }
    }

    GetShapesAtPoint(point) {
        return this.objects.filter(el => el.CollidesWithPoint(point)).reverse();
    }

    Undo() {
        this.historyIndex -= 1;
        this.historyIndex = Math.max(0, this.historyIndex);
        this.objects = this.history[this.historyIndex].objects;
    }
    Redo() {
        this.historyIndex += 1;
        this.historyIndex = Math.min(this.historyIndex, this.history.length - 1);
        this.objects = this.history[this.historyIndex].objects;
    }
    RemoveAllShapes() {
        this.selectedShapeId = undefined;
        this.objects = [];
    }
}

export default VectorDrawing;