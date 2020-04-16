import Editor from 'src/models/Editor'
import { ClearCanvasCommand, CreateShapeCommand, DeleteShapeCommand, TransformShapeCommand } from "src/models/Commands";

describe('ClearCanvasCommand Tests', () => {

    it('Clears Correctly', () => {
        //create an editor, add a couple shapes, execute a ClearCanvasCommand();
        const editor = new Editor();
        //the type of shape doesn't matter here so we will just call it a 'mock'
        editor.AddShape({
            type: 'mock'
        });
        editor.AddShape({
            type: 'mock'
        });

        //sanity check to make sure he objects are added in 
        expect(editor.objects.length).toBe(2);

        const clearCanvasCommand = new ClearCanvasCommand(editor);
        clearCanvasCommand.Execute();
        expect(editor.objects.length).toBe(0);

        editor.Undo();
        expect(editor.objects.length).toBe(2);

    });
});

describe('CreateShapeCommand Tests', () => {
    it('Adds Correctly', () => {
        //create an editor, add a couple shapes, execute a ClearCanvasCommand();
        const editor = new Editor();
        //the type of shape doesn't matter here so we will just call it a 'mock'
        const createShapeCommand = new CreateShapeCommand(editor, { type: 'mock' });
        createShapeCommand.Execute();
        expect(editor.objects.length).toBe(1);
        createShapeCommand.Undo();
        expect(editor.objects.length).toBe(0);
    });
});

describe('Delete Shape Command Tests', () => {
    it('Deletes Correctly', () => {
        //create an editor, add a couple shapes, execute a ClearCanvasCommand();
        const editor = new Editor();
        //the type of shape doesn't matter here so we will just call it a 'mock'
        const shape1 = editor.AddShape({
            type: 'mock'
        });
        const shape2 = editor.AddShape({
            type: 'mock'
        });



        const deleteShapeCommand = new DeleteShapeCommand(editor, shape1.id);
        deleteShapeCommand.Execute();

        expect(editor.objects.length).toBe(1);
        expect(editor.objects[0]).toBe(shape2);

        deleteShapeCommand.Undo();

        expect(editor.objects.length).toBe(2);
        expect(editor.objects[0]).toBe(shape1);

    });

    describe('Transform Shape Command Tests', () => {
        it('Transforms Correctly', () => {
            //create an editor, add a couple shapes, execute a ClearCanvasCommand();
            const editor = new Editor();
            //the type of shape doesn't matter here so we will just call it a 'mock'
            const shape1 = editor.AddShape({
                type: 'mock'
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
        });
    });

});
