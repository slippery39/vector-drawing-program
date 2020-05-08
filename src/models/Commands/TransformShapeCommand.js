class TransformShapeCommand {
    #editor
    #shape
    #transforms
    #snapshotBefore
    #hasExecuted;

    constructor(editor, shape, transforms) {
        this.#editor = editor;
        this.#shape = shape;
        this.#snapshotBefore = shape.GetSnapshot();
        this.#transforms = { ...transforms };
        this.#hasExecuted = false;
    }
    Execute() {
        if (this.#transforms.position) {
            this.#shape.position = { ...this.#transforms.position };
        }
        if (this.#transforms.scale) {
            this.#shape.scale = { ...this.#transforms.scale };
        }
        if (this.#transforms.rotation) {
            this.#shape.rotation = this.#transforms.rotation;
        }
        if (this.#transforms.fillColor) {
            this.#shape.fillColor = this.#transforms.fillColor;
        }
        if (this.#transforms.strokeColor) {
            this.#shape.strokeColor = this.#transforms.strokeColor;
        }
        if (this.#transforms.strokeWidth) {
            this.#shape.strokeWidth = this.#transforms.strokeWidth;
        }
        //right here is why its fucking up.
        //lets add some tests first.
        if (!this.#hasExecuted) {
            this.#editor.SaveCommandHistory(this);
        }
        this.#hasExecuted = true;
    }
    Redo() {
        this.Execute();
    }
    Undo() {
        this.#shape.RestoreSnapshot(this.#snapshotBefore);
    }
}
export default TransformShapeCommand;