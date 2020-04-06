<template>
  <div style="display:flex;">
    <ShapeList @item-clicked="handleListItemClick" @delete-item-clicked="handleDeleteClicked" :shapes="editor.objects" />
    <div class="canvas-container">
      <SVGCanvas id="svg-image" :width="editor.width" :height="editor.height" :shapes="editor.objects" />
      <ToolController
        @shapeCompleted="handleShapeComplete"
        style="position:absolute;left:0px;top:0px;"
      />
    </div>
  </div>
</template>

<script>
import ShapeList from "./ShapeList";
import SVGCanvas from "../components/SVGCanvas";
import ToolController from "../components/tools/ToolController";
import AppState from "../state/state.js";

import CreateShapeCommand from "../models/Commands/CreateShapeCommand";
import DeleteShapeCommand from "../models/Commands/DeleteShapeCommand";

export default {
  name: "PageIndex",
  components: {
    SVGCanvas,
    ToolController,
    ShapeList
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
    return { editor: AppState.drawing };
  },
  methods: {
    handleShapeComplete: function(data) {
      const createShapeCommand = new CreateShapeCommand(AppState.drawing, data);
      createShapeCommand.Execute();
    },
    handleListItemClick: function(shape) {
      AppState.drawing.selectedShapeId = shape.id;
    },
    handleDeleteClicked: function(shape) {
      const deleteItemCommand = new DeleteShapeCommand(AppState.drawing, shape.id);
      deleteItemCommand.Execute();
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