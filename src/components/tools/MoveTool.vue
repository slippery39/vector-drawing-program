<template>
  <svg
    ref="svg"
    @mousedown="handleMouseDown"
    v-touch-pan.mouse="handlePan"
    width="640"
    height="480"
  >
    <SVGBoundingBox :data="state.SelectedShape()" v-if="state.selectedShapeId!=undefined" />
  </svg>
</template>

<script>
import state from "../../state/state";
import DeleteShapeCommand from "../../models/Commands/DeleteShapeCommand";
import ToolMixIn from "./ToolMixIn";
import SVGBoundingBox from "../SVGBoundingBox";

export default {
  name: "MoveTool",
  components: {
    SVGBoundingBox
  },
  data: function() {
    return {
      state: state.drawing
    };
  },
  mixins: [ToolMixIn],
  mounted: function() {
    window.addEventListener("keydown", e => {
      console.log(e);
      if (e.code === "Delete") {
        this.removeSelectedShape();
      }
    });
  },
  methods: {
    removeSelectedShape: function() {
      if (this.state.selectedShapeId !== undefined) {
        const deleteCommand = new DeleteShapeCommand(
           this.state,
          this.state.selectedShapeId
        );
        deleteCommand.Execute();
        //this.state.RemoveShape(this.state.selectedShapeId);
      }
    },
    handleMouseDown: function(data) {
      const relativeCoordinates = this.GetRelativeCoordinates(data);
      const shapesAtPoint = this.state.GetShapesAtPoint(relativeCoordinates);
      if (shapesAtPoint.length === 0) {
        this.state.selectedShapeId = undefined;
        return;
      }
      this.state.selectedShapeId = shapesAtPoint[0].id;
    },
    handlePan: function(data) {
      const relativeCoordinates = this.GetRelativeCoordinates(data);
      if (data.isFirst) {
        //these should be ordered by lowest depth first.
        const shapesAtPoint = this.state.GetShapesAtPoint(relativeCoordinates);
        if (shapesAtPoint.length === 0) {
          return;
        }
        this.state.selectedShapeId = shapesAtPoint[0].id;
      }
      if (this.state.selectedShapeId === undefined) {
        return;
      }
      this.state.SelectedShape().Translate({
        x: data.delta.x,
        y: data.delta.y
      });
    }
  }
};
</script>
