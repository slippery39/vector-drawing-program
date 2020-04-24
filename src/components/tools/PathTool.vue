<template>
  <v-stage ref="svg" :config="configKonva" v-touch-pan.prevent.mouse="handlePan">
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
  name: "SVGEllipseDrawingCanvas",
  mixins: [ToolMixIn],
  props: {
    pathData: {
      default: undefined
    }
  },
  data: function() {
    return {
      firstClickPoint: undefined,
      currentPath: undefined,
      originalPathWidth: undefined,
      originalPathHeight: undefined,
      configKonva: {
        width: 640,
        height: 480
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
    createStartingPath: function(data) {
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
    handlePan: function(data) {
      if (!data) {
        return;
      }
      //is there a way to handle drags on the stage?
      const relativeCoordinates = this.GetRelativeCoordinates(data);

      if (data.isFirst) {
        this.currentPath = this.createStartingPath();
        this.firstClickPoint = Object.assign({}, relativeCoordinates);
        this.groupConfig.x = this.firstClickPoint.x;
        this.groupConfig.y = this.firstClickPoint.y;
      }

      //the path may not show on the first click, so we have to make sure it exists.
      const path = this.$refs.svg.getNode().find("Path")[0];
      if (path) {
        //for some reason the path needs to be in a group or else we can't get this clientRect properly...
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

      if (data.isFinal) {
        const finalShape = Object.assign(
          {},
          this.currentPath,
          this.groupConfig
        );
        //changing the positions to fit with our library.
        finalShape.position.x = this.groupConfig.x;
        finalShape.position.y = this.groupConfig.y;

        finalShape.fillColor = this.currentPath.fill;
        finalShape.strokeColor = this.currentPath.stroke;

        this.$emit("shapeCompleted", finalShape);

        this.firstClickPoint = undefined;
        this.currentPath = undefined;
        this.groupConfig.scale = { x: 1, y: 1 };
        this.originalPathWidth = undefined;
        this.originalPathHeight = undefined;
      }
    }
  }
};
</script>
