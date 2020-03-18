class VectorDrawing {
    constructor(data) {
        if (data === undefined) {
            data = {};
        }
        Object.assign(this, data);

        this.uniqueIdCounter = 0; //unique id assigned to each object.
        this.objects = [];
        this.history = []; //history of shape modifications?

        if (data.objects) {
            data.objects.foreach((el, ind) => {
                this.AddShape(el);
            });
        }
    }
    AddShape(shapeObj) {
        shapeObj = Object.assign({}, shapeObj); //making a copy of the object.
        shapeObj.id = this.uniqueIdCounter++;
        this.objects.push(shapeObj);
    }
    RemoveShape(shapeId) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === shapeId) {
                this.objects.splice(i, 1)
                return;
            }
        }
    }
}

export default VectorDrawing;