<template>
  <svg style="cursor:pointer" :width="width" :height="height">
    <SVGDynamicShape :data-id="shape.id" v-for="shape in shapes" :key="shape.id" :data="shape" />
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
      type: Array,
      default: function() {
        return [];
      }
    },
    width: {
      default: 640
    },
    height: {
      default: 480
    }
  }
};
</script>
