//Here we will be testing whether or not our shape objects are returning a correct
//config object for the Vue Konva component to use.

import Rectangle from "src/models/Shapes/Rectangle";
import Ellipse from "src/models/Shapes/Ellipse";
import Line from "src/models/Shapes/Line";
import Polygon from "src/models/Shapes/Polygon";

describe('Konva Shape Config Tests', () => {

    it('creates correct rectangle config', () => {
        const rectangle = new Rectangle({
            id: 1,
            position: {
                x: 100,
                y: 100,
            },
            width: 200,
            height: 300,
            fillColor: '#FF0000FF',
            strokeColor: '#000000FF',
            scale: {
                x: 3,
                y: 2
            },
            rotation: 100
        });
        const config = rectangle.GetKonvaConfig();
        expect(config.id).toBe(1);
        expect(config.x).toBe(100);
        expect(config.y).toBe(100);
        expect(config.width).toBe(200);
        expect(config.height).toBe(300);
        expect(config.fill).toBe('#FF0000FF');
        expect(config.stroke).toBe('#000000FF');
        expect(config.scaleX).toBe(3);
        expect(config.scaleY).toBe(2);
        expect(config.rotation).toBe(100);

        //this is stuff that should be set as well
        expect(config.strokeScaleEnabled).toBe(false);
        expect(config.draggable).toBe(true);
    });
    it('creates correct ellipse config', () => {
        const ellipse = new Ellipse({
            id: 1,
            position: {
                x: 100,
                y: 100,
            },
            radius: {
                x: 100,
                y: 200
            },
            fillColor: '#FF0000FF',
            strokeColor: '#000000FF',
            scale: {
                x: 3,
                y: 2
            },
            rotation: 100
        });

        const config = ellipse.GetKonvaConfig();
        expect(config.id).toBe(1);
        expect(config.x).toBe(100);
        expect(config.y).toBe(100);
        expect(config.radius.x).toBe(100);
        expect(config.radius.y).toBe(200);
        expect(config.fill).toBe('#FF0000FF');
        expect(config.stroke).toBe('#000000FF');
        expect(config.scaleX).toBe(3);
        expect(config.scaleY).toBe(2);
        expect(config.rotation).toBe(100);

        //this is stuff that should be set as well
        expect(config.strokeScaleEnabled).toBe(false);
        expect(config.draggable).toBe(true);
    });
    it('creates correct line config', () => {
        const line = new Line({
            id: 1,
            x1: 100,
            y1: 150,
            x2: 300,
            y2: 350,
            strokeColor: '#000000FF',
            scale: {
                x: 3,
                y: 2
            },
            rotation: 100,
            strokeWidth:2
        });
        const config = line.GetKonvaConfig();
        expect(config.id).toBe(1);
        expect(config.x).toBe(100);
        expect(config.y).toBe(150);
        expect(config.points).toEqual([0, 0, 200, 200]) //the points should be relative.
        expect(config.stroke).toBe('#000000FF');
        expect(config.strokeWidth).toBe(2);
        expect(config.scaleX).toBe(3);
        expect(config.scaleY).toBe(2);
        expect(config.rotation).toBe(100);
        

        //this is stuff that should be set as well
        expect(config.strokeScaleEnabled).toBe(false);
        expect(config.draggable).toBe(true);
        //minimum of 25 for the hit stroke.
        expect(config.hitStrokeWidth).toBe(25);
    });
    it('creates correct polygon config', () => {
        const polygon = new Polygon({
            id: 1,
            points: [
                {
                    x: 100,
                    y: 100,
                },
                {
                    x: 200,
                    y: 100
                },
                {
                    x: 150, y: 200
                }
            ],
            fillColor: '#FF0000FF',
            strokeColor: '#000000FF',
            scale: {
                x: 3,
                y: 2
            },
            rotation: 100
        });
        const config = polygon.GetKonvaConfig();
        expect(config.id).toBe(1);
        expect(config.x).toBe(100);
        expect(config.y).toBe(100);
        expect(config.points).toEqual([0,0,100,0,50,100]) //the points should be relative.
        expect(config.fill).toBe('#FF0000FF');
        expect(config.stroke).toBe('#000000FF');
        expect(config.scaleX).toBe(3);
        expect(config.scaleY).toBe(2);
        expect(config.rotation).toBe(100);

        //this is stuff that should be set as well
        expect(config.strokeScaleEnabled).toBe(false);
        expect(config.draggable).toBe(true);
        expect(config.closed).toBe(true);        
    });

});
