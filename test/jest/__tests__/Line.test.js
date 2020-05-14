import Line from "src/models/Shapes/Line";

describe('Line Tests', () => {

    const lineData = {
        points:[
            {x:0,y:0},
            {x:100,y:100}
        ],
        strokeColor:'red',
        strokeWidth:5
    };

    it('initializes correctly', () => {
        const line = new Line(lineData);
        expect(line.type).toBe('line');
        expect(line.x1).toBe(0);
        expect(line.y1).toBe(0);
        expect(line.x2).toBe(100);
        expect(line.y2).toBe(100);

        expect(line.strokeColor).toBe('red');
        expect(line.strokeWidth).toBe(5);

        //lines have a position now, lets test that.
        expect(line.position.x).toBe(0);
        expect(line.position.y).toBe(0);

        //trying another non 0 based line.
        const lineData2 = {
            points:[
                {
                    x:100,
                    y:100
                },
                {
                    x:200,
                    y:200
                }
            ]
        };
        const line2 = new Line(lineData2);
        expect(line2.x1).toBe(100);
        expect(line2.y1).toBe(100);
        expect(line2.x2).toBe(200);
        expect(line2.y2).toBe(200);

        expect(line2.position.x).toBe(100);
        expect(line2.position.y).toBe(100);
    });
    it('gets points correctly', () => {
        const line = new Line(lineData);

        const points = line.GetPoints();

        expect(points).toContainEqual(
            expect.objectContaining({
                x: 0,
                y: 0
            })
        );
        expect(points).toContainEqual(
            expect.objectContaining({
                x: 100,
                y: 100
            })
        );
    });
});
