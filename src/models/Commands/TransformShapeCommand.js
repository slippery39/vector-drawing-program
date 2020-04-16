class TransformShapeCommand {
    #editor
    #shape
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
    }
    Execute() {
        if (this.#position) {
            this.#shape.position = this.#position;
        }
        if (this.#scaling) {
            this.#shape.scale = this.#scaling;
        }
        if (this.#rotation) {
            this.#shape.rotation = this.#rotation;
        }
        this.#editor.SaveCommandHistory(this);
    }
    Redo() {
        this.Execute();
    }
    Undo() {
        this.#shape.rotation = this.#rotationBefore;
        this.#shape.position = this.#positionBefore
        this.#shape.scale = this.#scaleBefore;
    }
}
export default TransformShapeCommand;