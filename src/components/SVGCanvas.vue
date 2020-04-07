<template>
  <svg style="cursor:pointer" :width="width" :height="height">
    <SVGDynamicShape
      v-for="shape in shapes"
      :key="shape.id"
      :data-id="shape.id"
      :data="shape"
      v-bind:class="{ highlighted:(highlightedShape!=undefined && highlightedShape.id===shape.id) }"
    />
  </svg>
</template>

<script>
import SVGDynamicShape from "./SVGDynamicShape";

//i need to track when the mouse moves over this thing.
//and grab any shapes that have a mouseover applied to it.

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
    },
    highlightedShape: {
      default: undefined
    }
  }
};
</script>

<style>
g.highlighted>*{
  stroke:blue !important
}
</style>
