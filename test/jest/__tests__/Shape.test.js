import ShapeObject from 'src/models/Shapes/ShapeObject';


describe('Rectangle Tests', () => {

    const shapeData = {
        fillColor:'red',
        strokeColor:'blue',
        strokeWidth:5,
        position:{
            x:1,y:100
        },
        scale:{
            x:2,y:5
        },
        rotation:50
    }

    it('gets correct snapshot', ()=>{
        const shape = new ShapeObject(shapeData);
        const snapshot = shape.GetSnapshot();

        expect(snapshot.fillColor).toBe('red');
        expect(snapshot.strokeColor).toBe('blue');
        expect(snapshot.strokeWidth).toBe(5);
        expect(snapshot.position.x).toBe(1);
        expect(snapshot.position.y).toBe(100);
        
        expect(snapshot.scale.x).toBe(2);
        expect(snapshot.scale.y).toBe(5);

        expect(snapshot.rotation).toBe(50);
    });
    it('restores correct snapshot', ()=>{
        const shape = new ShapeObject(shapeData);
        const snapshot = shape.GetSnapshot();

        //change all the attributes.

        shape.fillColor = 'green';
        shape.strokeColor = 'red';
        shape.strokeWidth = 7;
        shape.position = {x:2,y:101};
        shape.scale = {x:3,y:4};
        shape.rotation = 35;

        //restore the snapshot;
        shape.RestoreSnapshot(snapshot);

        //the shape should be the same as before now.
        expect(snapshot.fillColor).toBe('red');
        expect(snapshot.strokeColor).toBe('blue');
        expect(snapshot.strokeWidth).toBe(5);
        expect(snapshot.position.x).toBe(1);
        expect(snapshot.position.y).toBe(100);
        
        expect(snapshot.scale.x).toBe(2);
        expect(snapshot.scale.y).toBe(5);

        expect(snapshot.rotation).toBe(50);

    });

});
