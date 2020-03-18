import VectorDrawing from "../models/VectorDrawing"

// This is the app state we will use for our app for now. 
var state = {
   drawing: new VectorDrawing()
}

window.appState = state;
export default state;
