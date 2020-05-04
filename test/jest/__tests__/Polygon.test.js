import Polygon from "src/models/Shapes/Polygon";

describe('Polygon Tests', () => {

    const polygonData = {
        points: [
            {
                x: 0, y: 0
            },
            {
                x: 100, y: 0
            },
            {
                x: 50, y: 50
            }
        ],
        strokeColor:'green',
        fillColor:'red',
        strokeWidth:9
    };

    it('initializes correctly', () => {
        const polygon = new Polygon(polygonData);
        expect(polygon.type).toBe('polygon');
        expect(polygon.points.length).toBe(3);
        expect(polygon.points).toContainEqual(
            expect.objectContaining({
                x: 0,
                y: 0
            })
        );
        expect(polygon.points).toContainEqual(
            expect.objectContaining({
                x: 100,
                y: 0
            })
        );
        expect(polygon.points).toContainEqual(
            expect.objectContaining({
                x: 50,
                y: 50
            })
        );
    });

    it('translates correctly', () => {
        const polygon = new Polygon(polygonData);

        polygon.Translate({ x: 25, y: 30 });
        expect(polygon.points).toContainEqual(
            expect.objectContaining({
                x: 25,
                y: 30
            })
        );
        expect(polygon.points).toContainEqual(
            expect.objectContaining({
                x: 125,
                y: 30
            })
        );
        expect(polygon.points).toContainEqual(
            expect.objectContaining({
                x: 75,
                y: 80
            })
        );
    });

    it('collides with point correctly', () => {

        const polygon = new Polygon(polygonData);

        var pointOutsidePolygon = {
            x: 150,
            y: 150
        }
        expect(polygon.CollidesWithPoint(pointOutsidePolygon)).toBe(false);

        //move the ellipse to a place where the point would be inside it.
        polygon.Translate({ x: 120, y: 120 });

        expect(polygon.CollidesWithPoint(pointOutsidePolygon)).toBe(true);
    });


});
