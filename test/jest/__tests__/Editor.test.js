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
    it('gets a shape at a point correctly', () => {
        const vectorDrawing = new Editor();
        vectorDrawing.AddShape(createTestRectangle());

        const shapesAtPoint = vectorDrawing.GetShapesAtPoint({
            x: 110,
            y: 160
        });

        expect(shapesAtPoint.length).toBe(1);
        expect(shapesAtPoint[0].id).toBe(1);

    });

    it('creates a snapshot correctly', ()=>{
        const editor = new Editor();
        editor.AddShape(createTestRectangle());
        editor.AddShape(createTestRectangle());
        editor.AddShape(createTestRectangle());
        editor.AddShape(createTestRectangle());

        const snapshot = editor.GetSnapshot();
        expect(snapshot.shapes.length).toBe(4);

        editor.selectedShapeId = 2;
        const snapshot2 = editor.GetSnapshot();
        expect(snapshot2.selectedShapeId).toBe(2);
    });

    it ('restores a snapshot correctly', ()=>{
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
    const createEllipseData = function(){
        return {
            type:'ellipse',
            position:{
                x:100,
                y:100
            },
            radius:{
                x:50,
                y:50
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

    it ('undos correctly after already undoing and adding a shape again', ()=>{
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
        const createCircleCommand = new CreateShapeCommand(editor,createEllipseData());
        createCircleCommand.Execute();

        //lets make sure the CommandHistory only contains 2 objects now.
        expect(editor.commandHistory.length).toBe(2);
        expect(editor.commandHistoryIndex).toBe(1) // it should be at the latest commmand;
        expect(editor.commandHistory[1]).toStrictEqual(createShapeCommand2);
    });

    it('redos correctly', ()=>{
        const editor = createEditor();

        const createShapeCommand = new CreateShapeCommand(editor, createRectangleData());
        createShapeCommand.Execute();

        editor.Undo();
        expect(editor.shapes.length).toBe(0);
        editor.Redo();
        expect(editor.shapes.length).toBe(1);
    });

    it('sends to back correctly', ()=>{
        const editor = createEditor();
         const rectangle = editor.AddShape({
             type:'rectangle'
         });
         const line = editor.AddShape({
             type:'line'
         });

         editor.SendToBack(line);

         expect(editor.shapes[0]).toBe(line);         
    });

    it('sends to front correctly', ()=>{
        const editor = createEditor();
        const rectangle = editor.AddShape({
            type:'rectangle'
        });
        const line = editor.AddShape({
            type:'line'
        });

        editor.SendToFront(rectangle);

        expect(editor.shapes[1]).toBe(rectangle);      
    });

    
});
