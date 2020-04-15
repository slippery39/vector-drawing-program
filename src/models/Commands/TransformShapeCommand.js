class TransformShapeCommand {
    #editor
    #shape
    #hasExecuted
    #position
    #scaling
    #rotation

    #positionBefore
    #scaleBefore
    #rotationBefore

    //i think we should be able to grab a snapshot of the shapes transform via a shape.GetTransform() function;
    //that would reduce the code needed for here. 
    constructor(editor, shape, transforms) {
        this.#editor = editor;
        this.#shape = shape;

        //Do we want this or do we want just the resulting shape?
        this.#position = Object.assign({}, transforms.position);
        this.#scaling = Object.assign({}, transforms.scale);
        this.#rotation = transforms.rotation;

        this.#positionBefore = Object.assign({}, shape.position);
        this.#scaleBefore = Object.assign({}, shape.scale);
        this.#rotationBefore = shape.rotation;
        this.#hasExecuted = false;
        console.log('shape before executing');
        console.log(JSON.parse(JSON.stringify(this.#shape)));
    }
    Execute() {
        /*
            if there was translation, set translation
        */
        /*
            if there was scaling set scaling
        */
        /*
        if there was rotation then set rotation.
        */
        if (this.#position) {
            this.#shape.position = this.#position;
        }
        if (this.#scaling) {
            this.#shape.scale = this.#scaling;
        }
        if (this.#rotation) {
            this.#shape.rotation = this.#rotation;
        }

        this.#hasExecuted = true;
        this.#editor.SaveCommandHistory(this);
        console.log(JSON.parse(JSON.stringify(this.#shape)));
        console.log('transform has been executed!');
    }
    Redo() {
        this.Execute();
    }
    Undo() {
        console.log('what are the positions and stuff');
        console.log(this.#positionBefore);
        console.log(this.#scaleBefore);
        console.log(this.#rotationBefore);
        if (this.#rotation) {
            this.#shape.rotation = this.#rotationBefore;
        }
        if (this.#position) {
            this.#shape.position = this.#positionBefore
        }
        if (this.#scaling) {
            this.#shape.scale = this.#scaleBefore;
        }
        
        console.log(JSON.parse(JSON.stringify(this.#shape)));
        console.log('transform has been undone');
    }
}
export default TransformShapeCommand;