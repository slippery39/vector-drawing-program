<template>
  <v-stage ref="stage" :config="stageConfig" v-touch-pan.prevent.mouse="HandlePan">
    <v-layer :config="layerConfig">
      <v-rect v-if="currentRectangle!=undefined" :config="currentRectangle.GetKonvaConfig()" />
    </v-layer>
  </v-stage>
</template>

<script>
import ToolMixIn from "./ToolMixIn";
import Rectangle from "src/models/Shapes/Rectangle";

export default {
  name: "RectangleTool",
  mixins: [ToolMixIn],
  data: function() {
    return {
      firstClickPoint: undefined,
      currentRectangle: undefined
    };
  },
  methods: {
    CreateStartingRectangle: function(data) {
      return new Rectangle({
        type: "rectangle",
        position: {
          x: 0,
          y: 0
        },
        width: 0,
        height: 0,
        fillColor: this.fillColor,
        strokeColor: this.strokeColor,
        strokeWidth: this.strokeWidth
      });
    },
    HandlePan: function(data) {
      const relativeCoordinates = this.GetRelativePointerCoordinates(data);

      if (data.isFirst) {
        this.currentRectangle = this.CreateStartingRectangle();
        console.log(this.$props);
        console.log(this.currentRectangle);
        this.firstClickPoint = Object.assign({}, relativeCoordinates);
      }

      this.currentRectangle.width = Math.abs(data.offset.x);
      this.currentRectangle.height = Math.abs(data.offset.y);
      //to handle negative offsets we will need to change the left and top position of the rectangle.
      //since svg can't have negative width or height.
      this.currentRectangle.position.x =
        this.firstClickPoint.x + Math.min(data.offset.x, 0);
      this.currentRectangle.position.y =
        this.firstClickPoint.y + Math.min(data.offset.y, 0);

      if (data.isFinal) {
        this.$emit("shapeCompleted", this.currentRectangle);
        this.firstClickPoint = undefined;
        this.currentRectangle = undefined;
      }
    }
  }
};
</script>
