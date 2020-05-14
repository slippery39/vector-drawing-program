import Rectangle from 'src/models/Shapes/Rectangle';


describe('Rectangle Tests', () => {

    const rectangleData = {
        position: {
            x: 100,
            y: 150
        },
        width: 50,
        height: 60,
        strokeColor:'red',
        fillColor:'blue',
        strokeWidth:8
    };

    it('initializes correctly', () => {
        const rectangle = new Rectangle(rectangleData);

        expect(rectangle.type).toBe('rectangle');
        expect(rectangle.position).toStrictEqual({ x: 100, y: 150 });
        expect(rectangle.width).toBe(50);
        expect(rectangle.height).toBe(60);

        expect(rectangle.fillColor).toBe('blue');
        expect(rectangle.strokeColor).toBe('red');
        expect(rectangle.strokeWidth).toBe(8);
        
    });
    it('translates correctly', () => {
        const rectangle = new Rectangle(rectangleData);

        rectangle.Translate({ x: 100, y: 110 });
        expect(rectangle.position.x).toBe(200);
        expect(rectangle.position.y).toBe(260);

        rectangle.Translate({ x: -50, y: -100 });
        expect(rectangle.position.x).toBe(150);
        expect(rectangle.position.y).toBe(160);
    });
    it('gets points correctly', () => {
        const rectangle = new Rectangle(rectangleData);
        //x is 100, y is 150, width is 50 height is 60
        //points should be 100,150 | 100,210 | 150,150 | 150,210

        //is there a better way to test each individual point?
        const points = rectangle.GetPoints();

        expect(points).toContainEqual(
            expect.objectContaining({
                x: 100,
                y: 150
            })
        );
        expect(points).toContainEqual(
            expect.objectContaining({
                x: 100,
                y: 210
            })
        );
        expect(points).toContainEqual(
            expect.objectContaining({
                x: 150,
                y: 150
            })
        );
        expect(points).toContainEqual(
            expect.objectContaining({
                x: 150,
                y: 210
            })
        );
    });
});
