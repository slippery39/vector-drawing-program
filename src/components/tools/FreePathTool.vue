<template>
  <v-stage ref="stage" :config="stageConfig" v-touch-pan.prevent.mouse="HandlePan">
    <v-layer :config="layerConfig">
      <v-path v-if="currentPath!=undefined" :config="currentPath" />
    </v-layer>
  </v-stage>
</template>

<script>
import ToolMixIn from "./ToolMixIn";

export default {
  name: "FreePathTool",
  mixins: [ToolMixIn],
  data: function() {
    return {
      firstClickPoint: undefined,
      currentPath: undefined,
      pathArr: []
    };
  },
  methods: {
    HandlePan: function(data, evt) {
      console.log(data);
      if (!data) {
        return;
      }
      const relativeCoordinates = this.GetRelativePointerCoordinates(data);

      if (data.isFirst) {
        this.currentPath = "";
        this.firstClickPoint = Object.assign({}, relativeCoordinates);
        this.pathArr.push(
          `M ${this.firstClickPoint.x},${this.firstClickPoint.y}`
        );
      }
      this.pathArr.push(`L ${relativeCoordinates.x},${relativeCoordinates.y}`);
      //update the current path.
      this.currentPath = {
        data: this.pathArr.join(" "),
        stroke: this.strokeColor,
        fill: "rgba(255,255,255,0)",
        strokeWidth: this.strokeWidth //this makes it so that the path is clickable inside for easier UI selecting functionality
      };

      if (data.isFinal) {
        this.$emit("shapeCompleted", {
          type: "path",
          strokeColor: this.strokeColor,
          strokeWidth: this.strokeWidth,
          fillColor: "rgba(255,255,255,0)", //having a transparent fill fixes some mouse detection issues for the transformer.
          data: this.pathArr.join(" ")
        });
        this.pathArr = [];
        this.firstClickPoint = undefined;
        this.currentPath = undefined;
      }
    }
  }
};
</script>
