<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <v-stage ref="stage" :config="stageConfig" v-touch-pan.prevent.mouse="HandlePan">
    <v-layer :config="layerConfig">
      <v-line v-if="currentPolygon!=undefined" :config="currentPolygon.GetKonvaConfig()" />
    </v-layer>
  </v-stage>
  <!--
  <svg ref="svg" v-touch-pan.prevent.mouse="HandlePan" width="640" height="480">
    <g v-if="currentPolygon!=undefined">
      <line
        v-for="(line,index) in ConvertPointsToLines(currentPolygon)"
        :key="'li'+index"
        :x1="line.point1.x"
        :y1="line.point1.y"
        :x2="line.point2.x"
        :y2="line.point2.y"
        :stroke="currentPolygon.strokeColor"
        :stroke-width="currentPolygon.strokeWidth"
      />
      <ellipse
        v-for="(point,index) in currentPolygon.points"
        :key="'el'+index"
        :cx="point.x"
        :cy="point.y"
        :rx="4+currentPolygon.strokeWidth/2"
        :ry="4+currentPolygon.strokeWidth/2"
        :fill="index===0? 'blue': 'white'"
        stroke="black"
      />
    </g>
  </svg>
  -->
</template>

<script>
import ToolMixIn from "./ToolMixIn";
import Polygon from "src/models/Shapes/Polygon";

export default {
  name: "PolygonCanvas",
  mixins: [ToolMixIn],
  data: function() {
    return {
      currentPolygon: undefined
    };
  },
  methods: {
    CreateStartingPolygon: function() {
      var polygon = new Polygon({
        id: 1,
        type: "polygon",
        points: [],
        fillColor: this.fillColor,
        strokeColor: this.strokeColor,
        strokeWidth: this.strokeWidth
      });
      return polygon;
    },
    // Converts the points from the current polygon into an array of lines.
    ConvertPointsToLines: function() {
      var lines = [];
      for (var i = 0; i < this.currentPolygon.points.length; i++) {
        //if there is another point after this one,
        //add a new line, x1/y1 = currentPoint, x2/y2 = next point
        if (i + 1 >= this.currentPolygon.points.length) {
          break;
        }

        lines.push({
          point1: this.currentPolygon.points[i],
          point2: this.currentPolygon.points[i + 1]
        });
      }
      return lines;
    },
    IsPolygonInProgress: function() {
      return !(
        this.currentPolygon === undefined ||
        this.currentPolygon.points.length === 0
      );
    },
    GetLastPoint: function() {
      console.log(this.currentPolygon);
      return this.currentPolygon.points[this.currentPolygon.points.length - 1];
    },
    HandlePan: function(data) {
      const relativePosition = this.GetRelativePointerCoordinates(data);

      if (data.isFirst) {
        //if no points have been created yet
        //the first point will be the first click

        //add new point
        //this points location will be the current location of the mouse while it is held down.

        if (!this.IsPolygonInProgress()) {
          this.currentPolygon = this.CreateStartingPolygon();
          this.currentPolygon.points.push(Object.assign({}, relativePosition));
        }
        this.currentPolygon.points.push(Object.assign({}, relativePosition));
      }

      this.GetLastPoint().x = relativePosition.x;
      this.GetLastPoint().y = relativePosition.y;

      if (data.isFinal) {
        //check if click is within 6 units of the first point.
        //if it is we will consider this shape completed.
        const firstPoint = this.currentPolygon.points[0];
        if (
          Math.abs(relativePosition.x - firstPoint.x) <=
            this.currentPolygon.strokeWidth + 4 &&
          Math.abs(relativePosition.y - firstPoint.y) <=
            this.currentPolygon.strokeWidth + 4
        ) {
          // connecting the first and last points together.
          this.GetLastPoint().x = firstPoint.x;
          this.GetLastPoint().y = firstPoint.y;

          this.$emit("shapeCompleted", this.currentPolygon);
          this.currentPolygon = undefined;
        }
      }
    }
  }
};
</script>
