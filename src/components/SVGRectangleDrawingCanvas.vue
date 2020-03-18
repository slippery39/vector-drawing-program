<template>
  <svg
    ref="svg"
    v-touch-pan.prevent.mouse="handlePan"
    width="640"
    height="480"
    style="border:1px solid black;background:red;"
  >
    <SVGDynamicShape
      v-if="currentRectangle!=undefined"
      :data-id="currentRectangle.id"
      :data="currentRectangle"
    />
  </svg>
</template>

<script>
import SVGDynamicShape from "./SVGDynamicShape";

var rectangle = {
  type: "rectangle",
  position: {
    x: 0,
    y: 0
  },
  width: 0,
  height: 0,
  fillColor: "black",
  strokeColor: "black",
  strokeWidth: "2"
};

// rectangle x,y is specifies the left and top position

export default {
  name: "SVGEllipseDrawingCanvas",
  components: {
    SVGDynamicShape
  },
  data: function() {
    return {
      firstClickPoint: undefined,
      currentRectangle: undefined
    };
  },
  methods: {
    handlePan: function(data) {
      if (data.isFirst) {
        this.currentRectangle = Object.assign({}, rectangle);

        const svgLeft = this.$refs.svg.getBoundingClientRect().left;
        const svgTop = this.$refs.svg.getBoundingClientRect().top;

        this.firstClickPoint = {
          left: data.position.left - svgLeft,
          top: data.position.top - svgTop
        };
      }

      this.currentRectangle.width = Math.abs(data.offset.x);
      this.currentRectangle.height = Math.abs(data.offset.y);
      //to handle negative offsets we will need to change the left and top position of the rectangle.
      //since svg can't have negative width or height.
      this.currentRectangle.position.x =
        this.firstClickPoint.left + Math.min(data.offset.x, 0);
      this.currentRectangle.position.y =
        this.firstClickPoint.top + Math.min(data.offset.y, 0);

      //clear the ellipse when the user mouseups.
      if (data.isFinal) {
        
        // TODO: fire an event saying the rectangle has been completed.
        this.firstClickPoint = undefined;
        this.currentRectagle = undefined;
        
      }
    }
  }
};
</script>
