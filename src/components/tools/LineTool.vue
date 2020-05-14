<template>
  <v-stage ref="stage" :config="stageConfig" v-touch-pan.prevent.mouse="HandlePan">
    <v-layer :config="layerConfig">
      <v-line v-if="currentLine!=undefined" :config="currentLine.GetKonvaConfig()" />
    </v-layer>
  </v-stage>
</template>

<script>
import ToolMixIn from "./ToolMixIn";
import Line from "src/models/Shapes/Line";

export default {
  name: "LineTool",
  mixins: [ToolMixIn],
  data: function() {
    return {
      currentLine: undefined,
      currentPointerCoordinates: undefined
    };
  },
  methods: {
    CreateStartingLine: function() {
      return new Line({
        id: 1,
        type: "line",
        position: {
          x: 0,
          y: 0
        },
        points: [
          {
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 0
          }
        ],
        strokeColor: this.strokeColor,
        strokeWidth: this.strokeWidth
      });
    },
    HandlePan: function(data) {
      const relativeCoordinates = this.GetRelativePointerCoordinates(data);

      if (data.isFirst) {
        this.currentLine = this.CreateStartingLine();
        this.currentLine.SetPoint(0, Object.assign({}, relativeCoordinates));
      }
      //for some reason the relativeCoordinates from the konva stage do not get updated in our panning function. I don't know
      //why at the moment so I am using an interval to grab the updated ones.
      const newPoint = Object.assign({}, this.currentLine.points[0]);
      newPoint.x += data.offset.x;
      newPoint.y += data.offset.y;
      this.currentLine.SetPoint(1, Object.assign({}, newPoint));

      if (data.isFinal) {
        this.$emit("shapeCompleted", this.currentLine);
        this.currentLine = undefined;
      }
    }
  }
};
</script>
