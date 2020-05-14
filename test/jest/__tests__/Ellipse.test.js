import Ellipse from 'src/models/Shapes/Ellipse';


describe('Ellipse Tests', () => {

    const ellipseData = {
        position: {
            x: 50,
            y: 75
        },
        radius: {
            x: 50,
            y: 75
        },
        strokeColor:'red',
        strokeWidth:10,
        fillColor:'blue'
    };

    it('initializes correctly', () => {
        const ellipse = new Ellipse(ellipseData);
        expect(ellipse.type).toBe('ellipse');
        expect(ellipse.position).toStrictEqual({ x: 50, y: 75 });
        expect(ellipse.radius.x).toBe(50);
        expect(ellipse.radius.y).toBe(75);
        expect(ellipse.fillColor).toBe('blue');
        expect(ellipse.strokeColor).toBe('red');
        expect(ellipse.strokeWidth).toBe(10);
    });
    it('translates correctly', () => {
        const ellipse = new Ellipse(ellipseData);

        ellipse.Translate({ x: 50, y: 75 });
        expect(ellipse.position.x).toBe(100);
        expect(ellipse.position.y).toBe(150);

        ellipse.Translate({ x: -25, y: -50 });
        expect(ellipse.position.x).toBe(75);
        expect(ellipse.position.y).toBe(100);
    });
});
