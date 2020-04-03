class DeleteShapeCommand {
    #editor
    #editorSnapshotBefore
    #editorSnapshotAfter
    #hasExecuted
    #shapeId

    constructor(editor, shapeId) {
        this.#editor = editor;
        this.#shapeId = shapeId;
        this.#editorSnapshotBefore = [];
        this.#editorSnapshotAfter = [];
        this.#hasExecuted = false;
    }
    Execute() {
        if (!this.#hasExecuted) {
            this.#editorSnapshotBefore = this.#editor.objects.slice();
            this.#editor.RemoveShape(this.#shapeId);
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
export default DeleteShapeCommand;