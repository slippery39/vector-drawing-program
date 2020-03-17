class ShapesList {
    constructor() {
        this.uniqueIdCounter = 0; //unique id assigned to each object.
        this.objects = [];
    }
    AddShape(shapeObj) {
        //TODO : Validation.
        //make a copy of the object,
        //add a unique id to the object,
        //push it into the array
        shapeObj = Object.assign({}, shapeObj);
        shapeObj.id = this.uniqueIdCounter++;
        this.objects.push(shapeObj);
    }
    // TODO: Remove Shape
    GetShapes() {
        return this.objects.slice();
    }
}

export default ShapesList;