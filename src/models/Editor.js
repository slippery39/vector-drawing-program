import ShapeObject from "./ShapeObject";
import Ellipse from "./Ellipse";
import Line from "./Line";
import Polygon from "./Polygon";
import Rectangle from "./Rectangle";

class Editor {
    constructor(data) {
        if (data === undefined) {
            data = {};
        }
        Object.assign(this, data);

        this.uniqueIdCounter = 1; //unique id assigned to each object.
        this.objects = [];
        this.width = 640;
        this.height = 480;

        this.commandHistory = []; //temp variable to track the history of our commands;
        this.commandHistoryIndex = -1;

        //for now, we are changing this variable through the RemoveShape()
        //and RemoveAllShapes() function.
        this.selectedShapeId = undefined;

        if (data.objects) {
            data.objects.foreach((el, ind) => {
                this.AddShape(el); //dont save the history for this initialization.
            });
        }
    }
    SelectedShape() {
        if (this.selectedShapeId === undefined) {
            return undefined;
        }
        return this.objects.find(e => e.id === this.selectedShapeId);
    }

    CreateShape(data) {
        switch (data.type) {
            case 'rectangle': {
                return new Rectangle(data);
            }
            case 'ellipse': {
                return new Ellipse(data)
            }
            case 'line': {
                return new Line(data);
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

    AddShape(shapeData, dontSaveHistory) {
        shapeData = JSON.parse(JSON.stringify(shapeData));
        const shape = this.CreateShape(shapeData);
        shape.id = this.uniqueIdCounter++;
        this.objects = this.objects.slice();
        this.objects.push(shape);
    }

    SaveCommandHistory(command) {
        this.commandHistory.splice(this.commandHistoryIndex + 1, this.commandHistory.length);
        this.commandHistory.push(command);
        this.commandHistoryIndex++;
    }

    RemoveShape(shapeId) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === shapeId) {
                if (this.selectedShapeId && this.objects[i].id === this.selectedShapeId) {
                    this.selectedShapeId = undefined
                }
                this.objects = Array.from(this.objects);
                this.objects.splice(i, 1);
                return;
            }
        }
    }

    GetShapesAtPoint(point) {
        return this.objects.filter(el => el.CollidesWithPoint(point)).reverse();
    }

    //UNDO/REDO should be the responsibility of a CommandHistory object.
    Undo() {
        if (this.commandHistoryIndex >= 0) {
            this.commandHistory[this.commandHistoryIndex].Undo();
            this.commandHistoryIndex--;
        }
    }
    Redo() {
        if (this.commandHistoryIndex < this.commandHistory.length - 1) {
            this.commandHistoryIndex++;
            this.commandHistory[this.commandHistoryIndex].Redo();
        }
    }
    RemoveAllShapes() {
        this.selectedShapeId = undefined;
        this.objects = [];
    }
}

export default Editor;