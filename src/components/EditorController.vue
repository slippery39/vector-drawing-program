<template>
  <div style="display:flex;width:100%;justify-content:center;">
    <q-card v-if="editor.shapesListVisible" style="width:225px;" class="bg-primary">
      <ShapeList
        @item-clicked="HandleListItemClick"
        @delete-item-clicked="HandleDeleteClicked"
        @visibility-clicked="HandleVisibilityClicked"
        @lock-clicked="HandleLockClicked"
        :shapes="editor.shapes"
        :selectedShapeId="editor.selectedShapeId"
      />
    </q-card>
    <div
      class="canvas-container"
      style="max-width:99%;height:100%;display:inline-block;overflow:scroll;"
    >
      <MainCanvas
        :shapes="editor.shapes"
        :allowTransforms="true"
        :selectedShape="editor.selectedShapeId"
        @shape-selected="(id)=>editor.selectedShapeId = id"
      />
      <ToolController
        @shapeCompleted="HandleShapeComplete"
        :width="editor.width"
        :height="editor.height"
        style="position:absolute;left:0px;top:0px;"
      />
      <!--Right Click Context Menu-->
      <q-menu v-if="editor.selectedShapeId!=undefined" touch-position context-menu>
        <q-list dense style="min-width: 100px">
          <q-item @click="HandleSendToFront()" clickable v-close-popup>
            <q-item-section>Send to Front</q-item-section>
          </q-item>
          <q-item @click="HandleSendToBack()" clickable v-close-popup>
            <q-item-section>Send to Back</q-item-section>
          </q-item>
          <q-item @click="HandleDeleteClicked(editor.GetSelectedShape())" clickable v-close-popup>
            <q-item-section>Delete</q-item-section>
          </q-item>
          <q-item
            @click="HandleVisibilityClicked(editor.GetSelectedShape())"
            clickable
            v-close-popup
          >
            <q-item-section>Hide</q-item-section>
          </q-item>
          <q-item @click="HandleLockClicked(editor.GetSelectedShape())" clickable v-close-popup>
            <q-item-section>Lock</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </div>
    <ShapeAttributesSidebar v-if="editor.shapeAttributesVisible" :shape="editor.GetSelectedShape()" />
  </div>
</template>

<script>
import state from "src/state/state.js";

import { MainCanvas, ShapeList, ShapeAttributesSidebar } from "./editor";
import ToolController from "./tools/ToolController";

/*
import MainLayer from "src/components/editor/MainCanvas";
import ShapeList from "src/components/editor/ShapeList";
import ToolController from "src/components/tools/ToolController";
import ShapeAttributesSidebar from "src/components/editor/ShapeAttributesSidebar";
*/

import CreateShapeCommand from "src/models/Commands/CreateShapeCommand";
import DeleteShapeCommand from "src/models/Commands/DeleteShapeCommand";
import SendToFrontCommand from "src/models/Commands/SendToFrontCommand";
import SendToBackCommand from "src/models/Commands/SendToBackCommand";

export default {
  name: "PageIndex",
  components: {
    MainCanvas,
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
    },
    HandleSendToFront: function() {
      const sendToFrontCommand = new SendToFrontCommand(
        this.editor,
        this.editor.GetSelectedShape().id
      );
      sendToFrontCommand.Execute();
    },
    HandleSendToBack: function() {
      const sendToBackCommand = new SendToBackCommand(
        this.editor,
        this.editor.GetSelectedShape().id
      );
      sendToBackCommand.Execute();
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