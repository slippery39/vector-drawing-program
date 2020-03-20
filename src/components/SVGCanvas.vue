<template>
    <svg width="640" height="480">
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
    }
  },
  methods: {
    handlePan(data) {
      console.log(data);
    }
  }
};
</script>
