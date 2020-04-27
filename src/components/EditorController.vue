<template>
  <div style="display:flex;width:100%;justify-content:center;">
    <q-card style="width:225px;" class="bg-primary">
      <ShapeList
        @item-clicked="HandleListItemClick"
        @delete-item-clicked="HandleDeleteClicked"
        @visibility-clicked="HandleVisibilityClicked"
        @lock-clicked="HandleLockClicked"
        :shapes="editor.objects"
      />
    </q-card>
    <div
      class="canvas-container"
      style="max-width:50%;display:inline-block;"
    >
      <MainLayer :shapes="editor.objects" :allowTransforms="true" :selectedShape="editor.selectedShapeId" @shape-selected='(id)=>editor.selectedShapeId = id' />
      <ToolController
        @shapeCompleted="HandleShapeComplete"
        :width="editor.width"
        :height="editor.height"
        style="position:absolute;left:0px;top:0px;"
      />
      <!--Right Click Context Menu-->
     <q-menu v-if="editor.selectedShapeId!=undefined" touch-position context-menu>
      <q-list dense style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>Send to Front</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Send to back</q-item-section>
        </q-item>
        <q-item @click="HandleDeleteClicked(editor.GetSelectedShape())" clickable v-close-popup>
          <q-item-section>Delete</q-item-section>
        </q-item>
        <q-item @click="HandleVisibilityClicked(editor.GetSelectedShape())" clickable v-close-popup>
          <q-item-section>Hide</q-item-section>
        </q-item>
        <q-item @click="HandleLockClicked(editor.GetSelectedShape())" clickable v-close-popup>
          <q-item-section>Lock</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    </div>
    <ShapeAttributesSidebar :shape="editor.GetSelectedShape()" />
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
      editor: state.editor
    };
  },
  methods: {
    HandleShapeComplete: function(data) {
      const createShapeCommand = new CreateShapeCommand(this.editor, data);
      createShapeCommand.Execute();
    },
    HandleListItemClick: function(shape) {
      this.editor.selectedShapeId = shape.id;
    },
    HandleDeleteClicked: function(shape) {
      const deleteItemCommand = new DeleteShapeCommand(this.editor, shape.id);
      deleteItemCommand.Execute();
    },
    HandleVisibilityClicked: function(shape) {
      shape.isVisible = !shape.isVisible;
    },
    HandleLockClicked: function(shape) {
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