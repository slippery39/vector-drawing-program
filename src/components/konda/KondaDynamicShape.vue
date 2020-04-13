<template>
  <v-rect
    v-if="data.type=='rectangle'"
    :config="{
        x:data.position.x,
        y:data.position.y,
        width:data.width,
        height:data.height,
        stroke:data.strokeColor,
        strokeOpacity:data.strokeOpacity/10,
        strokeWidth:data.strokeWidth,
        fill:data.fillColor,
        fillOpacity:data.fillOpacity        
        }"
    @transformend="transformEnd"
    @dragend="dragEnd"
  ></v-rect>
</template>
<script>
export default {
  name: "KondaDynamicShape",
  props: {
    data: {
      type: Object,
      required: true
    },
    tansformEnd: {
      required: true
    },
    dragEnd: {
      required: true
    }
  },
  methods: {}
};
</script>
