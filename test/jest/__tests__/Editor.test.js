import Editor from 'src/models/Editor'
import CreateShapeCommand from 'src/models/Commands/CreateShapeCommand';

describe('Editor Tests', () => {
    const createTestRectangle = function () {
        return {
            type: 'rectangle',
            position: {
                x: 100,
                y: 150
            },
            width: 50,
            height: 60
        }
    }

    it('initializes correctly', () => {
        const vectorDrawing = new Editor();
        expect(vectorDrawing.width).toBe(640);
        expect(vectorDrawing.height).toBe(480);
        expect(vectorDrawing.shapes).toStrictEqual([]);
    });
    it('adds shapes correctly', () => {
        const vectorDrawing = new Editor();
        vectorDrawing.AddShape(createTestRectangle());
        expect(vectorDrawing.shapes.length).toBe(1);
        expect(vectorDrawing.shapes[0].type).toBe('rectangle');
        expect(vectorDrawing.shapes[0].id).toBe(1);

    });
    it('removes a shape correctly', () => {
        const vectorDrawing = new Editor();
        vectorDrawing.AddShape(createTestRectangle());
        vectorDrawing.RemoveShape(1);
        expect(vectorDrawing.shapes.length).toBe(0);
    });
    it('clears shapes correctly', () => {
        const vectorDrawing = new Editor();
        vectorDrawing.AddShape(createTestRectangle());
        vectorDrawing.AddShape(createTestRectangle());
        vectorDrawing.AddShape(createTestRectangle());

        expect(vectorDrawing.shapes.length).toBe(3);

        vectorDrawing.RemoveAllShapes();
        expect(vectorDrawing.shapes.length).toBe(0);

    }); 

    it('restores a snapshot correctly', () => {
        const editor = new Editor();
        editor.AddShape(createTestRectangle());
        editor.AddShape(createTestRectangle());
        editor.AddShape(createTestRectangle());
        editor.AddShape(createTestRectangle());

        const snapshot = editor.GetSnapshot();

        //the shapes should have cleared here.
        editor.RemoveAllShapes();
        expect(editor.shapes.length).toBe(0);

        editor.RestoreSnapshot(snapshot);

        expect(editor.shapes.length).toBe(4);
    });

    it('copy and pastes correctly', ()=>{
        //details:

        const editor = new Editor();       
        //make a shape,
        const shape = editor.AddShape(createTestRectangle());
        //copy a shape
        editor.Copy(shape);
        //paste the shape
        editor.Paste({
            x:300,y:300
        });

        expect(editor.shapes.length).toBe(2);
        expect(editor.shapes[1].position.x).toBe(300);
        expect(editor.shapes[1].position.y).toBe(300);

        //paste the shape again
        editor.Paste({
            x:300,
            y:300
        })

        //we had a bug where the instance was the same when pasted, this should catch that bug.
        expect(editor.shapes[1]===editor.shapes[2]).toBe(false);

    });
});

describe('Editor Commands / Undo / Redo Tests', () => {
    const createEditor = function () {
        return new Editor();
    }

    const createRectangleData = function () {
        return {
            type: 'rectangle',
            position: {
                x: 100,
                y: 150
            },
            width: 50,
            height: 60
        }
    }
    const createEllipseData = function () {
        return {
            type: 'ellipse',
            position: {
                x: 100,
                y: 100
            },
            radius: {
                x: 50,
                y: 50
            }
        }
    }

    it('undos correctly once', () => {
        const editor = createEditor();
        const createShapeCommand = new CreateShapeCommand(editor, createRectangleData());
        createShapeCommand.Execute();

        expect(editor.shapes.length).toBe(1);
        expect(editor.shapes[0].id).toBe(1);

        editor.Undo();

        expect(editor.shapes.length).toBe(0);
    });

    it('undos correctly after already undoing and adding a shape again', () => {
        const editor = createEditor();

        const createShapeCommand = new CreateShapeCommand(editor, createRectangleData());
        createShapeCommand.Execute();
        //is it better when we execute, to create a copy of the command to store in the command history?
        //this way we could actually re-use the same command multiple times?
        const createShapeCommand2 = new CreateShapeCommand(editor, createRectangleData());
        createShapeCommand2.Execute();

        expect(editor.shapes.length).toBe(2);
        editor.Undo();

        //Lets add a circle
        const createCircleCommand = new CreateShapeCommand(editor, createEllipseData());
        createCircleCommand.Execute();

        //lets make sure the CommandHistory only contains 2 objects now.
        expect(editor.commandHistory.length).toBe(2);
        expect(editor.commandHistoryIndex).toBe(1) // it should be at the latest commmand;
        expect(editor.commandHistory[1]).toStrictEqual(createShapeCommand2);
    });

    it('CanUndo() and CanRedo() correctly return', () => {
        const editor = createEditor();

        //should not be able to undo or redo here.
        expect(editor.CanUndo()).toBe(false);
        expect(editor.CanRedo()).toBe(false);

        //execute a command.
        const createShapeCommand = new CreateShapeCommand(editor, createRectangleData());
        createShapeCommand.Execute();

        //should be able to undo but not redo
        expect(editor.CanUndo()).toBe(true);
        expect(editor.CanRedo()).toBe(false);

        //undo the command, we should be able to redo but not undo
        editor.Undo();
        expect(editor.CanUndo()).toBe(false);
        expect(editor.CanRedo()).toBe(true);


    });

    it('redos correctly', () => {
        const editor = createEditor();

        const createShapeCommand = new CreateShapeCommand(editor, createRectangleData());
        createShapeCommand.Execute();

        editor.Undo();
        expect(editor.shapes.length).toBe(0);
        editor.Redo();
        expect(editor.shapes.length).toBe(1);
    });

    it('sends to back correctly', () => {
        const editor = createEditor();
        const rectangle = editor.AddShape({
            type: 'rectangle'
        });
        const line = editor.AddShape({
            type: 'line',
            points:[
                {
                    x:0,
                    y:0
                },
                {
                    x:100,
                    y:100
                }
            ]
        });

        editor.SendToBack(line);

        expect(editor.shapes[0]).toBe(line);
    });

    it('sends to front correctly', () => {
        const editor = createEditor();
        const rectangle = editor.AddShape({
            type: 'rectangle'
        });
        const line = editor.AddShape({
            type: 'line',
            points:[
                {
                x:0,
                y:0
                },
                {
                    x:100,
                    y:100
                }
            ]
        });

        editor.SendToFront(rectangle);

        expect(editor.shapes[1]).toBe(rectangle);
    });

    it('gets selected shape correctly', () => {
        const editor = createEditor();

        expect(editor.GetSelectedShape()).toBe(undefined);

        const rectangle = editor.AddShape({
            type: 'rectangle'
        });
        expect(editor.GetSelectedShape()).toBe(rectangle);
    });

    it('initializes with objects', () => {
        const editor = new Editor({
            objects: [
                {
                    type: 'path'
                },
                {
                    type: 'polygon',
                    points:[
                        {x:0,
                        y:0},
                        {x:100,
                        y:100},
                        {x:200,y:200}
                    ]
                },
                {
                    type: 'line',
                    points:[
                        {
                            x:0,
                            y:0
                        },
                        {
                            x:100,
                            y:100
                        }
                    ]
                }
            ]
        });

        expect(editor.shapes.length).toBe(3);
        expect(editor.shapes[0].type).toBe('path');
        expect(editor.shapes[1].type).toBe('polygon');
        expect(editor.shapes[2].type).toBe('line');
    });


});
