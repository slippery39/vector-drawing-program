import Path from "src/models/Shapes/Path";

describe('Path Tests', () => {

    const pathData = {
        data:"M 10,150 L 70,10 L 130,150 z", 
        type : 'path',
        name:'test-path',
        fillColor : 'blue',
        strokeWidth : 2,
        strokeColor : 'red',
        position:{
            x:100,
            y:150
        },
        scale:{
            x:2,
            y:3
        }
    };

    it('initializes correctly', () => {
        const path = new Path(pathData);
        expect(path.type).toBe('path');
        expect(path.data).toBe("M 10,150 L 70,10 L 130,150 z");
        expect(path.fillColor).toBe('blue');
        expect(path.strokeColor).toBe('red');
        expect(path.strokeWidth).toBe(2);
        expect(path.position.x).toBe(100);
        expect(path.position.y).toBe(150);
        expect(path.scale.x).toBe(2);
        expect(path.scale.y).toBe(3);
    });
    it('translates correctly', () => {
        const path = new Path(pathData);

        path.Translate({ x: 50, y: 75 });
        expect(path.position.x).toBe(150);
        expect(path.position.y).toBe(225);

        path.Translate({ x: -25, y: -50 });
        expect(path.position.x).toBe(125);
        expect(path.position.y).toBe(175);
    });
    
});
