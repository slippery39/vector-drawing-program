import Ellipse from 'src/models/Shapes/Ellipse';


describe('Ellipse Tests', () => {
    /*
        type: "ellipse",
        position: {
          x: 0,
          y: 0
        },
        radius: {
          x: 0,
          y: 0
        },
        fillColor: this.fillColor,
        fillOpacity: this.fillOpacity,
        strokeColor: this.strokeColor,
        strokeOpacity: this.strokeOpacity,
        strokeWidth: "2"
    */
    const ellipseData = {
        position: {
            x: 50,
            y: 75
        },
        radius: {
            x: 50,
            y: 75
        }
    };

    it('initializes correctly', () => {
        const ellipse = new Ellipse(ellipseData);
        expect(ellipse.type).toBe('ellipse');
        expect(ellipse.position).toStrictEqual({ x: 50, y: 75 });
        expect(ellipse.radius.x).toBe(50);
        expect(ellipse.radius.y).toBe(75);
    });
    it('translates correctly', () => {
        const ellipse = new Ellipse(ellipseData);
        
        ellipse.Translate({x:50,y:75});
        expect(ellipse.position.x).toBe(100);
        expect(ellipse.position.y).toBe(150);

        ellipse.Translate({x:-25,y:-50});
        expect(ellipse.position.x).toBe(75);
        expect(ellipse.position.y).toBe(100);
    });   
    it('collides with point correctly', () => {

        // note that for now we are just doing bounding box collisions
        // so even though this is a circle, we are testing if the point
        //collides with the bounding box around the circle.
        const ellipse = new Ellipse(ellipseData);

        var pointOutsideEllipse = {
            x:500,
            y:500
        }
        expect(ellipse.CollidesWithPoint(pointOutsideEllipse)).toBe(false);
        
        //move the ellipse to a place where the point would be inside it.
        ellipse.Translate({x:450,y:450});
        expect(ellipse.CollidesWithPoint(pointOutsideEllipse)).toBe(true);
    });
});
