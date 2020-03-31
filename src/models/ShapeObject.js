//Base ShapeObject class for all the different types of shapes
//that we will use. 

//Note that not much 

class ShapeObject {
    constructor(data) {
        //the line below is to make sure that we are deep cloning any nested objects.
        Object.assign(this, JSON.parse(JSON.stringify(data)));
        this.type = 'unknown-shape';
    }

    Translate(translationVector) {
        console.error("not implemented");
    }
    CollidesWithPoint(point) {
        console.error("call to collides with point has not been implemented")
    }
    //TODO: Define other Class Types and extend this from there.
    GetBoundingBox() {
        console.error("get bounding box has not implemented");
    }
}

export default ShapeObject;