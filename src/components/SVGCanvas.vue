<template>
  <svg width="640" height="480" style="border:1px solid black">
    <SVGDynamicShape v-for="shape in shapes" :key="shape.type" :data="shape" />
  </svg>
</template>

<script>
import SVGDynamicShape from "./SVGDynamicShape";

export default {
  name: "SVGCanvas",
  components: {
    SVGDynamicShape
  },
  props: {
    shapes: {
      type: Object,
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
    }
  }
};
</script>
