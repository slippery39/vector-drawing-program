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
        //todo: check if it was a legit shape. for example a 0-1px circle or rectangle makes no sense
        if (!this.#hasExecuted) {
            this.#editorSnapshotBefore = this.#editor.objects.slice();
            this.#editor.AddShape(this.#shapeData);
            this.#hasExecuted = true;
            this.#editorSnapshotAfter = this.#editor.objects.slice();
            //Remove any commands after this?
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
        //-1 is the starting index... this is a bit confusing though. maybe a getter and setter on the editor object would be better
    }
}

export default CreateShapeCommand;