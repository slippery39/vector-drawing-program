import VectorDrawing from 'src/models/VectorDrawing'

describe('Vector Drawing Tests', () => {

    const createVectorDrawing = function () {
        return new VectorDrawing();
    }

    const createTestRectangle = function () {
        return VectorDrawing.CreateShape({
            type: 'rectangle',
            position: {
                x: 100,
                y: 150
            },
            width: 50,
            height: 60
        })
    }

    it('initializes correctly', () => {
        const vectorDrawing = new VectorDrawing();
        expect(vectorDrawing.width).toBe(640);
        expect(vectorDrawing.height).toBe(480);
        expect(vectorDrawing.objects).toStrictEqual([]);
    });
    it('adds shapes correctly', () => {
        const vectorDrawing = new VectorDrawing();
        vectorDrawing.AddShape(createTestRectangle());
        expect(vectorDrawing.objects.length).toBe(1);
        expect(vectorDrawing.objects[0].type).toBe('rectangle');
        expect(vectorDrawing.objects[0].id).toBe(1);

    });
    it('removes a shape correctly', () => {
        const vectorDrawing = new VectorDrawing();
        vectorDrawing.AddShape(createTestRectangle());
        vectorDrawing.RemoveShape(1);
        expect(vectorDrawing.objects.length).toBe(0);
    });
    it('clears shapes correctly', () => {
        const vectorDrawing = new VectorDrawing();
        vectorDrawing.AddShape(createTestRectangle());
        vectorDrawing.AddShape(createTestRectangle());
        vectorDrawing.AddShape(createTestRectangle());

        expect(vectorDrawing.objects.length).toBe(3);

        vectorDrawing.RemoveAllShapes();
        expect(vectorDrawing.objects.length).toBe(0);

    });
    it('gets a shape at a point correctly', () => {
        const vectorDrawing = new VectorDrawing();
        vectorDrawing.AddShape(createTestRectangle());

        const shapesAtPoint = vectorDrawing.GetShapesAtPoint({
            x: 110,
            y: 160
        });

        expect(shapesAtPoint.length).toBe(1);
        expect(shapesAtPoint[0].id).toBe(1);

    });

    it('undos correctly once', () => {
        const vectorDrawing = new VectorDrawing();
        vectorDrawing.AddShape(createTestRectangle()); 
        vectorDrawing.AddShape(createTestRectangle());           
        expect(vectorDrawing.objects.length).toBe(2);
        vectorDrawing.Undo();
        expect(vectorDrawing.objects.length).toBe(1);
        vectorDrawing.Undo();
        expect(vectorDrawing.objects.length).toBe(0);
    });
    it ('undos correctly after already undoing and adding a shape again', ()=>{
        const vectorDrawing = new VectorDrawing();

        vectorDrawing.AddShape(createTestRectangle());        
        vectorDrawing.Undo();


        //add 2 shapes, make sure it undos both
        vectorDrawing.AddShape(createTestRectangle());
        console.log('1')
        console.log(JSON.stringify(vectorDrawing.history));
        vectorDrawing.AddShape(createTestRectangle());
        console.log('2')
        console.log(JSON.stringify(vectorDrawing.history));
        expect(vectorDrawing.objects.length).toBe(2);

        vectorDrawing.Undo();
        console.log('3')
        console.log(JSON.stringify(vectorDrawing.history));
        expect(vectorDrawing.objects.length).toBe(1);
        
        vectorDrawing.Undo();
        console.log('4')
        console.log(JSON.stringify(vectorDrawing.history));
        expect(vectorDrawing.objects.length).toBe(0);

    });

    it('redos correctly', () => {
        const vectorDrawing = new VectorDrawing();
        vectorDrawing.AddShape(createTestRectangle());
        vectorDrawing.Undo();
        expect(vectorDrawing.objects.length).toBe(0);
        vectorDrawing.Redo();
        expect(vectorDrawing.objects.length).toBe(1);
    });
});
