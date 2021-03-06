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
            this.#editorSnapshotBefore = this.#editor.GetSnapshot();
            this.#editor.RemoveAllShapes();
            this.#hasExecuted = true;
            this.#editorSnapshotAfter = this.#editor.GetSnapshot();
            this.#editor.SaveCommandHistory(this);
        }
        else {
            this.#editor.RestoreSnapshot(this.#editorSnapshotAfter);
        }
    }
    Redo() {
        this.Execute();
    }
    Undo() {
        this.#editor.RestoreSnapshot(this.#editorSnapshotBefore);        
    }
}
export default ClearCanvasCommand;