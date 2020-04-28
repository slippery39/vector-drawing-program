class SendToBackCommand {
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
            console.log(this.#editor);
            this.#editorSnapshotBefore = this.#editor.GetSnapshot();
            this.#editor.SendToBack(this.#editor.shapes.find(el => { return el.id === this.#shapeId }));
            this.#hasExecuted = true;
            this.#editorSnapshotAfter = this.#editor.GetSnapshot();
            this.#editor.SaveCommandHistory(this);

            console.log('testing our snapshots')
            console.log(this.#editorSnapshotBefore);
            console.log(this.#editorSnapshotAfter);
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
export default SendToBackCommand;