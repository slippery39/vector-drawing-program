import Editor from 'src/models/Editor'
import { ClearCanvasCommand, CreateShapeCommand, DeleteShapeCommand, TransformShapeCommand, SendToBackCommand, SendToFrontCommand } from "src/models/Commands";

const sendToBack = new SendToBackCommand(undefined, undefined, 1);

describe('ClearCanvasCommand Tests', () => {

    it('Clears Correctly', () => {
        //create an editor, add a couple shapes, execute a ClearCanvasCommand();
        const editor = new Editor();
        //the type of shape doesn't matter here so we will just call it a 'mock'
        editor.AddShape({
            type: 'rectangle'
        });
        editor.AddShape({
            type: 'rectangle'
        });

        //sanity check to make sure he objects are added in 
        expect(editor.shapes.length).toBe(2);

        const clearCanvasCommand = new ClearCanvasCommand(editor);
        clearCanvasCommand.Execute();
        expect(editor.shapes.length).toBe(0);

        clearCanvasCommand.Undo();
        expect(editor.shapes.length).toBe(2);

        //testing redo
        clearCanvasCommand.Redo();
        expect(editor.shapes.length).toBe(0);


    });
});

describe('CreateShapeCommand Tests', () => {
    it('Adds Correctly', () => {
        //create an editor, add a couple shapes, execute a ClearCanvasCommand();
        const editor = new Editor();
        //the type of shape doesn't matter here so we will just call it a 'mock'
        const createShapeCommand = new CreateShapeCommand(editor, { type: 'rectangle' });
        createShapeCommand.Execute();
        expect(editor.shapes.length).toBe(1);
        createShapeCommand.Undo();
        expect(editor.shapes.length).toBe(0);
    });
});

describe('Delete Shape Command Tests', () => {
    it('Deletes Correctly', () => {
        //create an editor, add a couple shapes, execute a ClearCanvasCommand();
        const editor = new Editor();
        //the type of shape doesn't matter here so we will just call it a 'mock'
        const shape1 = editor.AddShape({
            type: 'rectangle'
        });
        const shape2 = editor.AddShape({
            type: 'rectangle'
        });

        const deleteShapeCommand = new DeleteShapeCommand(editor, shape1.id);
        deleteShapeCommand.Execute();

        expect(editor.shapes.length).toBe(1);
        expect(editor.shapes[0]).toBe(shape2);

        deleteShapeCommand.Undo();

        expect(editor.shapes.length).toBe(2);
        expect(editor.shapes[0]).toBe(shape1);

        //testing redo
        deleteShapeCommand.Redo();
        expect(editor.shapes.length).toBe(1);
        expect(editor.shapes[0]).toBe(shape2);

    });

});

describe('Transform Shape Command Tests', () => {
    it('Transforms Correctly', () => {
        const editor = new Editor();

        const shape1 = editor.AddShape({
            type: 'rectangle'
        });

        //sanity check to make sure defaults are in place.
        expect(shape1.position.x).toBe(0);
        expect(shape1.position.y).toBe(0);

        expect(shape1.scale.x).toBe(1);
        expect(shape1.scale.y).toBe(1);

        expect(shape1.rotation).toBe(0);

        const transformShapeCommand = new TransformShapeCommand(editor, shape1, {
            position: { x: 101, y: 100 },
            scale: { x: 2, y: 3 },
            rotation: 90
        });
        transformShapeCommand.Execute();

        expect(shape1.position.x).toBe(101);
        expect(shape1.position.y).toBe(100);

        expect(shape1.scale.x).toBe(2);
        expect(shape1.scale.y).toBe(3);

        expect(shape1.rotation).toBe(90);

        //lets make sure it can undo properly;

        transformShapeCommand.Undo();
        expect(shape1.position.x).toBe(0);
        expect(shape1.position.y).toBe(0);

        expect(shape1.scale.x).toBe(1);
        expect(shape1.scale.y).toBe(1);

        expect(shape1.rotation).toBe(0);

        //make sure redo is working as well.
        transformShapeCommand.Redo();
        expect(shape1.position.x).toBe(101);
        expect(shape1.position.y).toBe(100);

        expect(shape1.scale.x).toBe(2);
        expect(shape1.scale.y).toBe(3);

        expect(shape1.rotation).toBe(90);
    });

    it('Only Transforms Specified Attributes', () => {
        const editor = new Editor();
        //the type of shape doesn't matter here so we will just call it a 'mock'
        const shape1 = editor.AddShape({
            type: 'rectangle',
            position: {
                x: 1,
                y: 1
            },
            scale: {
                x: 2, y: 2
            },
            rotation: 20
        });

        const transformShapeCommand = new TransformShapeCommand(editor, shape1, {
            position: {
                x: 100,
                y: 100
            }
        });
        transformShapeCommand.Execute();

        //these should have changed
        expect(shape1.position.x).toBe(100);
        expect(shape1.position.y).toBe(100);

        //these should not have changed
        expect(shape1.scale.x).toBe(2);
        expect(shape1.scale.y).toBe(2);
        expect(shape1.rotation).toBe(20);

        //lets make sure the position doesn't change now
        const transformShapeCommand2 = new TransformShapeCommand(editor, shape1, {
            scale: {
                x: 5,
                y: 5
            }
        });

        transformShapeCommand2.Execute();

        //scale should have changed
        expect(shape1.scale.x).toBe(5);
        expect(shape1.scale.y).toBe(5);

        //position and rotation should not have changed
        expect(shape1.position.x).toBe(100);
        expect(shape1.position.y).toBe(100);
        expect(shape1.rotation).toBe(20);
    });
});

describe('transform shape command does not overwrite the command history on redo', ()=>{
    it('redos correctly without deleting the command history', ()=>{
        const editor = new Editor();

        //lets do some commands here,

        //add shape,
        const addShapeCommand = new CreateShapeCommand(editor,{
            type:'rectangle'
        });
        addShapeCommand.Execute();

        const transformShapeCommand = new TransformShapeCommand(editor,editor.shapes[0],{
            position:{
                x:100,
                y:100
            }
        });
        transformShapeCommand.Execute();

        const addAnotherShape= new CreateShapeCommand(editor,{
            type:'ellipse'
        }); 
        addAnotherShape.Execute();

        const clearCanvas = new ClearCanvasCommand(editor);
        clearCanvas.Execute();

        //undo everything
        for (var i=0;i<editor.commandHistory.length;i++){
            editor.Undo();
        }

        //make sure there are still 4 commands in the history
        expect(editor.commandHistory.length).toBe(4);

        //redo everything;
        for (var i=0;i<editor.commandHistory.length;i++){
            editor.Redo();
        }

        //make sure there are still 4 commands in the history
        expect(editor.commandHistory.length).toBe(4);

    }); 
});


describe('SendToBack-SendToFront Tests', () => {

    it('Sends to Back correctly', () => {
        const editor = new Editor();
        //the type of shape doesn't matter here so we will just call it a 'mock'
        const shape1 = editor.AddShape({
            type: 'rectangle',

        });
        const shape2 = editor.AddShape({
            type:'rectangle'
        });

        //i don't like how we have to pass the id and not the shape itself.         
        const sendToBackCommand = new SendToBackCommand(editor, shape2.id);
        sendToBackCommand.Execute();

        //sending it to the back puts it at the first position;
        expect(editor.shapes[0]).toBe(shape2);
        expect(editor.shapes[1]).toBe(shape1);

        sendToBackCommand.Undo();

        expect(editor.shapes[0]).toBe(shape1);
        expect(editor.shapes[1]).toBe(shape2);

        sendToBackCommand.Redo();

        expect(editor.shapes[0]).toBe(shape2);
        expect(editor.shapes[1]).toBe(shape1);

        const sendToFrontCommand = new SendToFrontCommand(editor, shape2.id);
        sendToFrontCommand.Execute();

        expect(editor.shapes[0]).toBe(shape1);
        expect(editor.shapes[1]).toBe(shape2);

        sendToFrontCommand.Undo();

        expect(editor.shapes[0]).toBe(shape2);
        expect(editor.shapes[1]).toBe(shape1);

        sendToFrontCommand.Redo();

        expect(editor.shapes[0]).toBe(shape1);
        expect(editor.shapes[1]).toBe(shape2);
    });
});
