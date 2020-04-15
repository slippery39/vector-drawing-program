import Line from "src/models/Shapes/Line";

describe('Line Tests', () => {

    const lineData = {
        x1: 0,
        y1: 0,
        x2: 100,
        y2: 100
    };

    it('initializes correctly', () => {
        const line = new Line(lineData);
        expect(line.type).toBe('line');
        expect(line.x1).toBe(0);
        expect(line.y1).toBe(0);
        expect(line.x2).toBe(100);
        expect(line.y2).toBe(100);

        //lines have a position now, lets test that.
        expect(line.position.x).toBe(0);
        expect(line.position.y).toBe(0);

        //trying another non 0 based line.
        const lineData2 = {
            x1: 100,
            y1: 100,
            x2: 200,
            y2: 200
        };
        const line2 = new Line(lineData2);
        expect(line2.x1).toBe(100);
        expect(line2.y1).toBe(100);
        expect(line2.x2).toBe(200);
        expect(line2.y2).toBe(200);

        expect(line2.position.x).toBe(100);
        expect(line2.position.y).toBe(100);
    });
    it('translates correctly', () => {
        const line = new Line(lineData);

        line.Translate({ x: 50, y: 75 });
        expect(line.x1).toBe(50);
        expect(line.y1).toBe(75);
        expect(line.x2).toBe(150);
        expect(line.y2).toBe(175);

        line.Translate({ x: -25, y: -50 });
        expect(line.x1).toBe(25);
        expect(line.y1).toBe(25);
        expect(line.x2).toBe(125);
        expect(line.y2).toBe(125);

        //trying another translae without 0 based values
        const lineData2 = {
            x1: 100,
            y1: 100,
            x2: 200,
            y2: 200
        };
        const line2 = new Line(lineData2);
        line2.Translate({ x: 50, y: 100 });
        expect(line2.x1).toBe(150);
        expect(line2.y1).toBe(200);
        expect(line2.x2).toBe(250);
        expect(line2.y2).toBe(300);
    });

    it('collides with point correctly', () => {

        const line = new Line(lineData);

        var pointOutsideLine = {
            x: 150,
            y: 150
        }
        expect(line.CollidesWithPoint(pointOutsideLine)).toBe(false);

        //move the ellipse to a place where the point would be inside it.
        line.Translate({ x: 125, y: 125 });
        expect(line.CollidesWithPoint(pointOutsideLine)).toBe(true);
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
