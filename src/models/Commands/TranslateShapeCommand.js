class TranslateShapeCommand {
    #editor
    #shape
    #hasExecuted
    #translationVector

    constructor(editor, shape, translationVector) {
        this.#editor = editor;
        this.#shape = shape;
        this.#translationVector = Object.assign({}, translationVector);
        this.#hasExecuted = false;
    }
    Execute() {
        this.#shape.Translate(this.#translationVector);
        this.#hasExecuted = true;
        this.#editor.SaveCommandHistory(this);
    }
    Redo() {
        this.Execute();
    }
    Undo() {
        this.#shape.Translate({
            x: -1 * this.#translationVector.x,
            y: -1 * this.#translationVector.y
        })
    }
}
export default TranslateShapeCommand;