<template>
  <div style="display:flex;width:100%;">
    <q-card style="width:275px;">
      <ShapeList
        @item-clicked="handleListItemClick"
        @delete-item-clicked="handleDeleteClicked"
        @visibility-clicked="handleVisibilityClicked"
        @lock-clicked="handleLockClicked"
        :shapes="editor.objects"
      />
    </q-card>
    <q-scroll-area visible style="width:100%;height:600px;display:flex;justify-content:center;">
      <div class="canvas-container" style="max-width:100%;display:inline-block;">
        <SVGCanvas
          id="svg-image"
          :width="editor.width"
          :height="editor.height"
          :shapes="editor.objects"
        />
        <ToolController
          @shapeCompleted="handleShapeComplete"
          :width="editor.width"
          :height="editor.height"
          style="position:absolute;left:0px;top:0px;"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import ShapeList from "./ShapeList";
import SVGCanvas from "../components/SVGCanvas";
import ToolController from "../components/tools/ToolController";
import state from "../state/state.js";

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
        this.editor.Undo();
      }
      if (event.ctrlKey && event.key === "x") {
        this.editor.Redo();
      }
    });
  },
  data: function() {
    return { editor: state.editor };
  },
  methods: {
    handleShapeComplete: function(data) {
      const createShapeCommand = new CreateShapeCommand(this.editor, data);
      createShapeCommand.Execute();
    },
    handleListItemClick: function(shape) {
      this.editor.selectedShapeId = shape.id;
    },
    handleDeleteClicked: function(shape) {
      const deleteItemCommand = new DeleteShapeCommand(this.editor, shape.id);
      deleteItemCommand.Execute();
    },
    handleVisibilityClicked: function(shape) {
      shape.isVisible = !shape.isVisible;
    },
    handleLockClicked: function(shape) {
      shape.isLocked = !shape.isLocked;
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