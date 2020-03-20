<template>
  <svg
    ref="svg"
    v-touch-pan.prevent.mouse="handlePan"
    width="640"
    height="480"
  >
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
      if (data.isFirst) {
        this.currentLine = this.createStartingLine();

        const svgLeft = this.$refs.svg.getBoundingClientRect().left;
        const svgTop = this.$refs.svg.getBoundingClientRect().top;

        this.currentLine.x1 = data.position.left - svgLeft;
        this.currentLine.y1 = data.position.top - svgTop;
      }

      this.currentLine.x2 = this.currentLine.x1 + data.offset.x;
      this.currentLine.y2 = this.currentLine.y1 + data.offset.y;

      if (data.isFinal) {
        this.$emit("shapeCompleted", this.currentLine);
        this.currentLine = undefined;
      }
    }
  }
};
</script>
