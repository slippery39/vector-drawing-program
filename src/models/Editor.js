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
        this.selectedTool = 'rectangle'; //we need something for the different paths now?
        this.fillColor = "#FFFFFF";
        this.strokeColor = "#000000";
        this.strokeWidth = 2;

        this.shapesListVisible = true;
        this.shapeAttributesVisible = true;

        //Clipboard for Cut/Copy/Paste
        this.clipboard = undefined;
        //when we copy we add a snapshot of the object to the clipboard,
        //when we paste we instantiate a new object that uses the copied objects parameters.

        //Command Objects
        this.commandHistory = []; //temp variable to track the history of our commands;
        this.commandHistoryIndex = -1;

        if (data.objects) {
            data.objects.forEach((el, ind) => {
                this.AddShape(el);
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
                console.error(`Unknown shape type in call to create shape (${data.type}). Please check the Editor.js file`);
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

    Undo() {
        if (this.CanUndo()) {
            this.commandHistory[this.commandHistoryIndex].Undo();
            this.commandHistoryIndex--;
        }
    }
    Redo() {
        if (this.CanRedo()) {
            this.commandHistoryIndex++;
            this.commandHistory[this.commandHistoryIndex].Redo();
        }
    }

    CanUndo() {
        return this.commandHistoryIndex >= 0
    }
    CanRedo() {
        return this.commandHistoryIndex < this.commandHistory.length - 1
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
    Copy(shape) {
        if (shape === undefined) {
            return;
        }
        this.clipboard = shape.Clone();
    }
    Paste(position) {
        if (this.clipboard === undefined) {
            return;
        }
        this.clipboard.id = this.uniqueIdCounter++;
        this.clipboard.position = {
            x: position.x,
            y: position.y
        };

        const pastedShape = this.clipboard.Clone(); //we need to clone again, or else everything single pasted object will
        //be using the same reference.
        this.shapes.push(pastedShape);
        this.selectedShapeId = pastedShape.id;
    }
}

export default Editor;