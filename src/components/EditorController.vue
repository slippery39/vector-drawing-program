<template>
  <div style="display:flex;width:100%;justify-content:center;">
    <q-card style="width:275px;" class='bg-primary'>
      <ShapeList
        @item-clicked="handleListItemClick"
        @delete-item-clicked="handleDeleteClicked"
        @visibility-clicked="handleVisibilityClicked"
        @lock-clicked="handleLockClicked"
        :shapes="editor.objects"
      />
    </q-card>
    <q-scroll-area visible style="max-width:100%;min-width:600px;height:600px;display:flex;justify-content:center;">
      <div
        class="canvas-container"
        @mousemove="checkForHoveredShape"
        @mouseleave="()=>hoveredShape=undefined"
        style="max-width:100%;display:inline-block;"
      >
        <SVGCanvas
          id="svg-image"
          :width="editor.width"
          :height="editor.height"
          :shapes="editor.objects"
          :highlightedShape="hoveredShape"
        />
        <ToolController
          @shapeCompleted="handleShapeComplete"
          :width="editor.width"
          :height="editor.height"
          style="position:absolute;left:0px;top:0px;"
        />
      </div>
    </q-scroll-area>
    <ShapeAttributesSidebar :shape="editor.SelectedShape()" />
  </div>
</template>

<script>
import state from "../state/state.js";

import ShapeList from "./ShapeList";
import SVGCanvas from "../components/SVGCanvas";
import ToolController from "../components/tools/ToolController";
import ShapeAttributesSidebar from "../components/ShapeAttributesSidebar";

import CreateShapeCommand from "../models/Commands/CreateShapeCommand";
import DeleteShapeCommand from "../models/Commands/DeleteShapeCommand";

export default {
  name: "PageIndex",
  components: {
    SVGCanvas,
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
      hoveredShape: undefined //we can't use css on the svg to determine if something is being hovered because of
      //the layered svg drawings. so we need to control it here.
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
    checkForHoveredShape: function(data) {
      //console.log("checkForHoveredShape");
     //console.log(data);
      const shapesHovered = this.editor.objects.filter(e => {
        return e.CollidesWithPoint({
          x: data.offsetX,
          y: data.offsetY
        });
      });
      const hoveredShape = shapesHovered.reverse()[0];
      this.hoveredShape = hoveredShape;
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