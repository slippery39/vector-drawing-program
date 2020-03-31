<template>
  <svg ref="svg" v-touch-pan.prevent.mouse="handlePan" width="640" height="480">
    <SVGDynamicShape v-if="currentLine!=undefined" :data-id="currentLine.id" :data="currentLine" />
  </svg>
</template>

<script>
import SVGDynamicShape from "../SVGDynamicShape";
import ToolMixIn from "./ToolMixIn";

export default {
  name: "SVGLineDrawingCanvas",
  components: {
    SVGDynamicShape
  },
  mixins: [ToolMixIn],
  data: function() {
    return {
      currentLine: undefined
    };
  },
  methods: {
    createStartingLine: function() {
      var line = {
        id: 1,
        type: "line",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        strokeColor: this.strokeColor,
        strokeWidth: 2
      };

      return line;
    },

    handlePan: function(data) {
      const relativeCoordinates = this.GetRelativeCoordinates(data);

      if (data.isFirst) {
        this.currentLine = this.createStartingLine();

        //the first point on the line is the first point that is clicked.
        this.currentLine.x1 = relativeCoordinates.x;
        this.currentLine.y1 = relativeCoordinates.y;
      }

      this.currentLine.x2 = relativeCoordinates.x; //this.currentLine.x1 + data.offset.x;
      this.currentLine.y2 = relativeCoordinates.y; //this.currentLine.y1 + data.offset.y;

      if (data.isFinal) {
        this.$emit("shapeCompleted", this.currentLine);
        this.currentLine = undefined;
      }
    }
  }
};
</script>
