<template>
  <v-stage ref="stage" :config="stageConfig" v-touch-pan.prevent.mouse="HandlePan">
    <v-layer :config="layerConfig">
      <v-ellipse v-if="currentEllipse!=undefined" :config="currentEllipse.GetKonvaConfig()" />
    </v-layer>
  </v-stage>
</template>

<script>
import ToolMixIn from "./ToolMixIn";
import Ellipse from "src/models/Shapes/Ellipse";

export default {
  name: "EllipseTool",
  mixins: [ToolMixIn],
  data: function() {
    return {
      firstClickPoint: undefined,
      currentEllipse: undefined
    };
  },
  methods: {
    CreateStartingEllipse: function() {
      return new Ellipse({
        type: "ellipse",
        position: {
          x: 0,
          y: 0
        },
        radius: {
          x: 0,
          y: 0
        },
        fillColor: this.fillColor,
        strokeColor: this.strokeColor,
        strokeWidth: this.strokeWidth
      });
    },
    HandlePan: function(data) {
      const relativeCoordinates = this.GetRelativePointerCoordinates(data);

      if (data.isFirst) {
        this.currentEllipse = this.CreateStartingEllipse();
        this.firstClickPoint = Object.assign({}, relativeCoordinates);
      }
      //radius is the offset from the original mousedown
      this.currentEllipse.radius.x = Math.abs(data.offset.x) / 2;
      this.currentEllipse.radius.y = Math.abs(data.offset.y) / 2;

      //the center position will not be constant. it will change every time the user drags the mouse.
      //this is for copying the same behaviour for ellipse drawing from programs like mspaint and inkscape.
      this.currentEllipse.position.x =
        this.firstClickPoint.x + data.offset.x / 2;
      this.currentEllipse.position.y =
        this.firstClickPoint.y + data.offset.y / 2;

      //clear the ellipse when the user mouseups.
      if (data.isFinal) {
        //fire an event saying the ellipse has been completed.
        this.$emit("shapeCompleted", this.currentEllipse);
        this.firstClickPoint = undefined;
        this.currentEllipse = undefined;
      }
    }
  }
};
</script>
