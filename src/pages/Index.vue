<template>
  <q-page class="flex flex-center">
    <div class="canvas-container">
      <SVGCanvas id="svg-image" :shapes="shapes.objects" />
      <ToolController
        @shapeCompleted="handleShapeComplete"
        style="position:absolute;left:0px;top:0px;"
      />
    </div>
  </q-page>
</template>

<script>
import SVGCanvas from "../components/SVGCanvas";
import ToolController from "../components/tools/ToolController";
import AppState from "../state/state.js";
import CreateShapeCommand from "../models/Commands/CreateShapeCommand";

export default {
  name: "PageIndex",
  components: {
    SVGCanvas,
    ToolController
  },
  mounted: function() {
    window.addEventListener("keydown", event => {
      if (event.ctrlKey && event.key === "z") {
        AppState.drawing.Undo();
      }
      if (event.ctrlKey && event.key === "x") {
        AppState.drawing.Redo();
      }
    });
  },
  data: function() {
    return { shapes: AppState.drawing };
  },
  methods: {
    handleShapeComplete: function(data) {
      //Create the shape here from the data?
      const createShapeCommand = new CreateShapeCommand(AppState.drawing, data);
      createShapeCommand.Execute();
      //AppState.drawing.AddShape(data);
    }
  }
};
</script>

<style scoped>
.canvas-container {
  position: relative;
  border: 1px solid black;
  cursor: pointer;
}
</style>
