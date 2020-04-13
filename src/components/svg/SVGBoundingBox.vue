  <template>
  <g v-if="GetBoundingBox() !=undefined">
    <rect
      :x="GetBoundingBox().position.x"
      :y="GetBoundingBox().position.y"
      fill-opacity="0.1"
      fill="red"
      stroke="red"
      stroke-width="1"
      stroke-opacity="50"
      :width="GetBoundingBox().width"
      :height="GetBoundingBox().height"
    />
    <circle
      v-for="(point,index) in GetBoundingBox().GetPoints()"
      :key="index"
      stroke="black"
      fill="blue"
      r="3"
      :cx="point.x"
      :cy="point.y"
    />
  </g>
</template>

<script>
export default {
  name: "SVGBoundingBox",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    GetBoundingBox: function() {
      return this.data.GetBoundingBox();
    }
  }
};
</script>
