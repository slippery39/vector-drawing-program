<template>
<div>
  <svg width="640" height="480" style="border:1px solid black">
    <SVGDynamicShape :data-id="shape.id" v-for="shape in shapes" :key="shape.id" :data="shape" />
  </svg>
  <SVGRectangleDrawingCanvas/>
</div>
</template>

<script>
import SVGDynamicShape from "./SVGDynamicShape";

import SVGRectangleDrawingCanvas from "./SVGRectangleDrawingCanvas";

export default {
  name: "SVGCanvas",
  components: {
    SVGDynamicShape,
    SVGRectangleDrawingCanvas
  },
  props: {
    shapes: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    // Unit Testable Function.
    PointsArrToString: function(arr) {
      return arr
        .map(el => {
          return el.x + "," + el.y;
        })
        .join(" ");
    },
    handlePan(data) {
      console.log(data);
    }
  }
};
</script>
