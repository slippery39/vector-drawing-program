<template>
  <div style="display:flex;width:100%;justify-content:center;">
    <q-card style="width:275px;" class="bg-primary">
      <ShapeList
        @item-clicked="handleListItemClick"
        @delete-item-clicked="handleDeleteClicked"
        @visibility-clicked="handleVisibilityClicked"
        @lock-clicked="handleLockClicked"
        :shapes="editor.objects"
      />
    </q-card>
    <div
      class="canvas-container"
      style="max-width:100%;display:inline-block;"
    >
      <MainLayer :shapes="editor.objects" :allowTransforms="true" :selectedShape="editor.selectedShapeId" @shape-selected='(id)=>editor.selectedShapeId = id' />
      <ToolController
        @shapeCompleted="handleShapeComplete"
        :width="editor.width"
        :height="editor.height"
        style="position:absolute;left:0px;top:0px;"
      />
    </div>
    <ShapeAttributesSidebar :shape="editor.SelectedShape()" />
  </div>
</template>

<script>
import state from "../state/state.js";

import MainLayer from "./konva/MainLayer";

import ShapeList from "./ShapeList";
import ToolController from "../components/tools/ToolController";
import ShapeAttributesSidebar from "../components/ShapeAttributesSidebar";

import CreateShapeCommand from "../models/Commands/CreateShapeCommand";
import DeleteShapeCommand from "../models/Commands/DeleteShapeCommand";

export default {
  name: "PageIndex",
  components: {
    MainLayer,
    ToolController,
    ShapeList,
    ShapeAttributesSidebar
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
    return {
      editor: state.editor,
    };
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
    },
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