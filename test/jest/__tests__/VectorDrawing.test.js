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
        expect(vectorDrawing.history).toStrictEqual([]);
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
});
