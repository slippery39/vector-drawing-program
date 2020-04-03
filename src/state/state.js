import Editor from "../models/Editor"
import UIState from "../models/UIState";

// This will be our global app state.
// If a component needs to access the state they should import this object.
var state = {
   drawing: new Editor(),
   uiState: new UIState()
}

window.appState = state;
export default state;
