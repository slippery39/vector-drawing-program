<template>
  <v-stage ref="stage" :config="stageConfig" v-touch-pan.prevent.mouse="HandlePan">
    <v-layer>
      <v-group v-if="currentPath!=undefined" :config="groupConfig">
        <v-path :config="currentPath" />
      </v-group>
    </v-layer>
  </v-stage>
</template>

<script>
import ToolMixIn from "./ToolMixIn";

export default {
  name: "PremadePathTool",
  mixins: [ToolMixIn],
  props: {
    pathData: {
      default: undefined
    },
    width: {
      default: 640
    },
    height: {
      default: 480
    }
  },
  data: function() {
    return {
      firstClickPoint: undefined,
      currentPath: undefined,
      originalPathWidth: undefined,
      originalPathHeight: undefined,
      stageConfig: {
        width: this.width,
        height: this.height
      },
      groupConfig: {
        x: 0,
        y: 0,
        scale: {
          x: 1,
          y: 1
        }
      }
    };
  },
  methods: {
    CreateStartingPath: function(data) {
      return {
        type: "path",
        fill: this.fillColor,
        stroke: this.strokeColor,
        strokeWidth: 2,
        strokeScaleEnabled: false,
        scale: {
          x: 1,
          y: 1
        },
        position: {
          x: 0,
          y: 0
        },
        data: this.pathData
      };
    },
    HandlePan: function(data) {
      if (!data) {
        return;
      }
      //is there a way to handle drags on the stage?
      const relativeCoordinates = this.GetRelativeCoordinates(data);

      if (data.isFirst) {
        this.currentPath = this.CreateStartingPath();
        this.firstClickPoint = Object.assign({}, relativeCoordinates);
        this.groupConfig.x = this.firstClickPoint.x;
        this.groupConfig.y = this.firstClickPoint.y;
      }
      this.HandlePathScaling(data);
      if (data.isFinal) {
        const finalShape = this.PrepareFinalPath();
        this.$emit("shapeCompleted", finalShape);
        this.Reset();
      }
    },
    HandlePathScaling: function(data) {
      //the path may not show on the first click, so we have to make sure it exists.
      const path = this.$refs.stage.getNode().find("Path")[0];
      if (path) {
        //for some reason the path needs to be in a v-group or else we can't get this clientRect properly...
        //not sure why.
        var rect = path.getClientRect(); //we need the width and height of the rect
        if (this.originalPathWidth === undefined) {
          this.originalPathWidth = rect.width;
          this.originalPathHeight = rect.height;
        }

        //scaling is the ratio of the drag offset from the original width and height.
        const scaleX = data.offset.x / this.originalPathWidth;
        const scaleY = data.offset.y / this.originalPathHeight;

        //this needs to change the scaling of the path instead.
        this.groupConfig.scale = {
          x: scaleX,
          y: scaleY
        };
        //}
      }
    },
    PrepareFinalPath: function() {
      const finalPath = Object.assign({}, this.currentPath, this.groupConfig);
      //changing the positions to fit with our library.
      finalPath.position.x = this.groupConfig.x;
      finalPath.position.y = this.groupConfig.y;

      finalPath.fillColor = this.currentPath.fill;
      finalPath.strokeColor = this.currentPath.stroke;

      return finalPath;
    },
    Reset: function() {
      this.firstClickPoint = undefined;
      this.currentPath = undefined;
      this.groupConfig.scale = { x: 1, y: 1 };
      this.originalPathWidth = undefined;
      this.originalPathHeight = undefined;
    }
  }
};
</script>
