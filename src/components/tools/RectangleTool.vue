<template>
  <svg ref="svg" v-touch-pan.prevent.mouse="handlePan" width="640" height="480">
    <SVGDynamicShape
      v-if="currentRectangle!=undefined"
      :data-id="currentRectangle.id"
      :data="currentRectangle"
    />
  </svg>
</template>

<script>
import SVGDynamicShape from "../SVGDynamicShape";
import ToolMixIn from "./ToolMixIn";

export default {
  name: "SVGEllipseDrawingCanvas",
  components: {
    SVGDynamicShape
  },
  mixins: [ToolMixIn],
  data: function() {
    return {
      firstClickPoint: undefined,
      currentRectangle: undefined
    };
  },
  methods: {
    createStartingRectangle: function(data) {
      return {
        type: "rectangle",
        position: {
          x: 0,
          y: 0
        },
        width: 0,
        height: 0,
        fillColor: this.fillColor,
        fillOpacity: this.fillOpacity,
        strokeColor: this.strokeColor,
        strokeOpacity: this.strokeOpacity,
        strokeWidth: "2"
      };
    },
    handlePan: function(data) {
      const relativeCoordinates = this.GetRelativeCoordinates(data);

      if (data.isFirst) {
        this.currentRectangle = this.createStartingRectangle();
        this.firstClickPoint = Object.assign({}, relativeCoordinates);
      }

      this.currentRectangle.width = Math.abs(data.offset.x);
      this.currentRectangle.height = Math.abs(data.offset.y);
      //to handle negative offsets we will need to change the left and top position of the rectangle.
      //since svg can't have negative width or height.
      this.currentRectangle.position.x =
        this.firstClickPoint.x + Math.min(data.offset.x, 0);
      this.currentRectangle.position.y =
        this.firstClickPoint.y + Math.min(data.offset.y, 0);

      if (data.isFinal) {
        this.$emit("shapeCompleted", this.currentRectangle);
        this.firstClickPoint = undefined;
        this.currentRectangle = undefined;
      }
    }
  }
};
</script>
