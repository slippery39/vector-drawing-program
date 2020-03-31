<template>
  <svg
    ref="svg"
    @mousedown="handleMouseDown"
    v-touch-pan.mouse="handlePan"
    width="640"
    height="480"
  >
    <SVGBoundingBox :data="state.selectedShape" v-if="state.selectedShape!=undefined" />
  </svg>
</template>

<script>
import state from "../../state/state";
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
      if (this.state.selectedShape !== undefined) {
        this.state.RemoveShape(state.selectedShape.id);
      }
    },
    handleMouseDown: function(data) {
      const relativeCoordinates = this.GetRelativeCoordinates(data);
      this.state.selectedShape = this.state.GetShapesAtPoint(
        relativeCoordinates
      )[0];
    },
    handlePan: function(data) {
      const relativeCoordinates = this.GetRelativeCoordinates(data);
      if (data.isFirst) {
        //these should be ordered by lowest depth first.
        this.state.selectedShape = this.state.GetShapesAtPoint(
          relativeCoordinates
        )[0];
      }
      if (this.state.selectedShape === undefined) {
        return;
      }
      this.state.selectedShape.Translate({
        x: data.delta.x,
        y: data.delta.y
      });
    }
  }
};
</script>
