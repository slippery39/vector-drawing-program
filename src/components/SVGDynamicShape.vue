<template>
  <circle
    v-if="data.type=='circle'"
    :cx="data.position.x"
    :cy="data.position.y"
    :r="data.radius"
    :stroke="data.strokeColor"
    :stroke-width="data.strokeWidth"
    :fill="data.fillColor"
  />
  <rect
    v-else-if="data.type=='rectangle'"
    :x="data.position.x"
    :y="data.position.y"
    :width="data.width"
    :height="data.height"
    :stroke="data.strokeColor"
    :stroke-width="data.strokeWidth"
    :fill="data.fillColor"
  />
  <ellipse
    v-else-if="data.type=='ellipse'"
    :cx="data.position.x"
    :cy="data.position.y"
    :rx="data.radius.x"
    :ry="data.radius.y"
    :fill="data.fillColor"
    :stroke="data.strokeColor"
    :stroke-width="data.strokeWidth"
  />
  <line
    v-else-if="data.type=='line'"
    :x1="data.x1"
    :y1="data.y1"
    :x2="data.x2"
    :y2="data.y2"
    :stroke="data.strokeColor"
    :stroke-width="data.strokeWidth"
  />
  <polygon
    v-else-if="data.type=='polygon'"
    :points="PointsArrToString(data.points)"
    :fill="data.fillColor"
    :stroke="data.strokeColor"
    :stroke-width="data.strokeWidth"
    style="fill:lime;stroke:purple;stroke-width:1"
  />
  <text
    v-else-if="data.type=='text'"
    :x="data.position.x"
    :y="data.position.y"
    :fill="data.fillColor"
  >{{data.text}}</text>
</template>

<script>
export default {
  name: "SVGDynamicShape",
  props: {
    data: {
      type: Object,
      required: true
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
