class PasteCommand {
    #editor
    #editorSnapshotBefore
    #editorSnapshotAfter
    #hasExecuted
    #position

    constructor(editor, position) {
        this.#editor = editor;
        this.#editorSnapshotBefore = [];
        this.#editorSnapshotAfter = [];
        this.#position = position;
        this.#hasExecuted = false;
    }
    Execute() {
        //only execute if the editor has something to paste
        if (this.#editor.clipboard === undefined) {
            return;
        }

        if (!this.#hasExecuted) {
            this.#editorSnapshotBefore = this.#editor.GetSnapshot();
            this.#editor.Paste(this.#position);
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
export default PasteCommand;