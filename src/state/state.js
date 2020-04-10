import Editor from "../models/Editor"
// This will be our global app state.
// If a component needs to access the state they should import this object.
var state = {
   editor: new Editor()
}
window.appState = state;
export default state;
