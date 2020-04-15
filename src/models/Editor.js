import Shape from "./Shapes/ShapeObject";
import Ellipse from "./Shapes/Ellipse";
import Line from "./Shapes/Line";
import Polygon from "./Shapes/Polygon";
import Rectangle from "./Shapes/Rectangle";

class Editor {
    constructor(data) {
        if (data === undefined) {
            data = {};
        }
        Object.assign(this, data);

        this.uniqueIdCounter = 1; //unique id assigned to each object. for ids we are using an auto-increment assignment.
        this.objects = [];
        this.width = 640;
        this.height = 480;

        //UI State 
        this.selectedShapeId = undefined;
        this.selectedTool = 'polygon';
        this.fillColor = "#FFFFFF"; 
        this.strokeColor = "#000000";

        //Command Objects
        this.commandHistory = []; //temp variable to track the history of our commands;
        this.commandHistoryIndex = -1;

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
                return new Shape(data);
            }
        }
    }

    AddShape(shapeData) {
        shapeData = JSON.parse(JSON.stringify(shapeData));
        const shape = this.CreateShape(shapeData);
        shape.id = this.uniqueIdCounter++;
        this.objects = this.objects.slice();
        this.objects.push(shape);

        //this functionality is to satisfy our requirement of selecting the shape after it is created.
        this.selectedShapeId = shape.id;
        this.selectedTool = 'move';
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

    GetShapesAtPoint(point, options) {
        /*
            options: 
            excludeHidden,
            excludeLocked

            In case the case that the UI calling this function does not want to include
            hidden or locked objects, they can add these arguments to exlude them.
            
        */
        if (options === undefined) {
            options = {};
        }
        var shapesAtPoint = this.objects.filter(el => el.CollidesWithPoint(point)).reverse();

        if (options.excludeHidden) {
            shapesAtPoint = shapesAtPoint.filter(el => el.isVisible)
        }
        if (options.excludeLocked) {
            shapesAtPoint = shapesAtPoint.filter(el => !el.isLocked);
        }
        return shapesAtPoint;
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