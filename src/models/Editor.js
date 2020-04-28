import Shape from "./Shapes/ShapeObject";
import Ellipse from "./Shapes/Ellipse";
import Line from "./Shapes/Line";
import Polygon from "./Shapes/Polygon";
import Rectangle from "./Shapes/Rectangle";
import Path from "./Shapes/Path";

class Editor {
    constructor(data) {
        if (data === undefined) {
            data = {};
        }
        Object.assign(this, data);

        this.uniqueIdCounter = 1; //unique id assigned to each object. for ids we are using an auto-increment assignment.
        this.shapes = [];
        this.width = 640;
        this.height = 480;

        //UI State 
        this.selectedShapeId = undefined;
        this.selectedTool = 'path-heart'; //we need something for the different paths now?
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
    GetSelectedShape() {
        if (this.selectedShapeId === undefined) {
            return undefined;
        }
        return this.shapes.find(e => e.id === this.selectedShapeId);
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
            case 'path': {
                return new Path(data)
            }
            default: {
                console.error('Unknown shape type in call to create shape. Please check the Editor.js file');
                return new Shape(data);
            }
        }
    }

    AddShape(shapeData) {
        shapeData = JSON.parse(JSON.stringify(shapeData));
        const shape = this.CreateShape(shapeData);
        shape.id = this.uniqueIdCounter++;
        this.shapes = this.shapes.slice();
        this.shapes.push(shape);

        //this functionality is to satisfy our requirement of selecting the shape after it is created.
        this.selectedShapeId = shape.id;
        this.selectedTool = 'move';
        return shape; //returning the shape incase the caller of this code needs to reference it.
    }

    SaveCommandHistory(command) {
        this.commandHistory.splice(this.commandHistoryIndex + 1, this.commandHistory.length);
        this.commandHistory.push(command);
        this.commandHistoryIndex++;
    }

    RemoveShape(shapeId) {
        for (var i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i].id === shapeId) {
                if (this.selectedShapeId && this.shapes[i].id === this.selectedShapeId) {
                    this.selectedShapeId = undefined
                }
                this.shapes = Array.from(this.shapes);
                this.shapes.splice(i, 1);
                return;
            }
        }
    }
    RemoveAllShapes() {
        this.selectedShapeId = undefined;
        this.shapes = [];
    }

    SendToFront(shape) {
        //find the shape in the list of objects
        //save the shapes position.

        //make a new array with the shape at the end of the list
        const indexOfShape = this.shapes.indexOf(shape);
        this.shapes.splice(indexOfShape, 1);
        this.shapes.push(shape);
    }

    SendToBack(shape) {
        //make a new array with the shape at the end of the list
        const indexOfShape = this.shapes.indexOf(shape);
        this.shapes.splice(indexOfShape, 1);
        this.shapes.unshift(shape);
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
        let shapesAtPoint = this.shapes.filter(el => el.CollidesWithPoint(point)).reverse();

        if (options.excludeHidden) {
            shapesAtPoint = shapesAtPoint.filter(el => el.isVisible)
        }
        if (options.excludeLocked) {
            shapesAtPoint = shapesAtPoint.filter(el => !el.isLocked);
        }
        return shapesAtPoint;
    }

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

    //using the snapshot / memento pattern inside our command objects.
    //any state from the editor that should be undoable / redoable should be saved inside the snapshot.
    //for example, stuff like the shapes list is something that we might want to undp/redo
    //but something like what fill color is currently selected is not something we are really interested in undoing/redoing (at least not for now);
    GetSnapshot() {
        return {
            shapes: this.shapes.slice(), //copy of the shapes array, but notice the shapes themselves are not getting cloned
            selectedShapeId: this.selectedShapeId
        }
    }
    RestoreSnapshot(snapshot) {
        this.shapes = snapshot.shapes;
        this.selectedShapeId = snapshot.selectedShapeId;
    }
}

export default Editor;