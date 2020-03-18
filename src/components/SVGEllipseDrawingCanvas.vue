<template>
  <svg
    ref="svg"
    v-touch-pan.prevent.mouse="handlePan"
    width="640"
    height="480"
    style="border:1px solid black;background:red;"
  >
    <SVGDynamicShape
      v-if="currentEllipse!=undefined"
      :data-id="currentEllipse.id"
      :data="currentEllipse"
    />
  </svg>
</template>

<script>
import SVGDynamicShape from "./SVGDynamicShape";

var ellipse = {
  type: "ellipse",
  position: {
    x: 0,
    y: 0
  },
  radius: {
    x: 0,
    y: 0
  },
  fillColor: "black",
  strokeColor: "black",
  strokeWidth: "2"
};

export default {
  name: "SVGEllipseDrawingCanvas",
  components: {
    SVGDynamicShape
  },
  data: function() {
    return {
      firstClickPoint: undefined,
      currentEllipse: undefined
    };
  },
  methods: {
    handlePan: function(data) {
      if (data.isFirst) {
        this.currentEllipse = Object.assign({}, ellipse);

        const svgLeft = this.$refs.svg.getBoundingClientRect().left;
        const svgTop = this.$refs.svg.getBoundingClientRect().top;

        this.firstClickPoint = {
          left: data.position.left - svgLeft,
          top: data.position.top - svgTop
        };
      }
      //radius is the offset from the original mousedown
      this.currentEllipse.radius.x = Math.abs(data.offset.x) / 2;
      this.currentEllipse.radius.y = Math.abs(data.offset.y) / 2;

      //the center position will not be constant. it will change every time the user drags the mouse.
      //this is for copying the same behaviour for ellipse drawing from programs like mspaint and inkscape.
      this.currentEllipse.position.x =
        this.firstClickPoint.left + data.offset.x / 2;
      this.currentEllipse.position.y =
        this.firstClickPoint.top + data.offset.y / 2;

      //clear the ellipse when the user mouseups.
      if (data.isFinal) {

        //fire an event saying the ellipse has been completed.
        this.firstClickPoint = undefined;
        this.currentEllipse = undefined;
      }
    }
  }
};
</script>
