class CreateShapeCommand{
    constructor(drawing,data){
        this.drawing = drawing;
        this.data = data;
        this.createdShape = {};        
    }
    Execute(){
        this.createdShape = this.drawing.CreateShape(this.data);
        this.drawing.AddShape(this.createdShape);        
    }
    Undo(){
        this.drawing.RemoveShape(this.createdShape.id);
    }
}

class RemoveShapeCommand{
    constructor(drawing,data){

    }
    Undo(){
        //do we need to remember to position in the shapes array?
        
    }
    Execute(){        
        this.drawing.RemoveShape(this.createdShape.id);
    }
}