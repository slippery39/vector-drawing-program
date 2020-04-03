class ClearCanvasCommand {
    #editor
    #editorSnapshotBefore
    #editorSnapshotAfter
    #hasExecuted

    constructor(editor) {
        this.#editor = editor;
        this.#editorSnapshotBefore = [];
        this.#editorSnapshotAfter = [];
        this.#hasExecuted = false;
    }
    Execute() {
        if (!this.#hasExecuted) {
            this.#editorSnapshotBefore = this.#editor.objects.slice();
            this.#editor.RemoveAllShapes();
            this.#hasExecuted = true;
            this.#editorSnapshotAfter = this.#editor.objects.slice();
            this.#editor.SaveCommandHistory(this);
        }
        else {
            this.#editor.objects = this.#editorSnapshotAfter;
        }
    }
    Redo() {
        this.Execute();
    }
    Undo() {
        this.#editor.objects = this.#editorSnapshotBefore;
    }
}
export default ClearCanvasCommand;