class CreateShapeCommand {
    #editor
    #editorSnapshotBefore
    #editorSnapshotAfter
    #hasExecuted
    #shapeData

    constructor(editor, shapeData) {
        this.#editor = editor;
        this.#editorSnapshotBefore = [];
        this.#editorSnapshotAfter = [];
        this.#hasExecuted = false;
        this.#shapeData = shapeData;
    }
    Execute() {
        if (!this.#hasExecuted) {
            this.#editorSnapshotBefore = this.#editor.GetSnapshot();
            this.#editor.AddShape(this.#shapeData);
            this.#hasExecuted = true;
            this.#editorSnapshotAfter = this.#editor.GetSnapshot();
            //Remove any commands after this?
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

export default CreateShapeCommand;