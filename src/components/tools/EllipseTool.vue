<template>
  <svg ref="svg" v-touch-pan.prevent.mouse="HandlePan" width="640" height="480">
    <SVGDynamicShape
      v-if="currentEllipse!=undefined"
      :data-id="currentEllipse.id"
      :data="currentEllipse"
    />
  </svg>
</template>

<script>
import SVGDynamicShape from "../svg/SVGDynamicShape";
import ToolMixIn from "./ToolMixIn";

//import Ellipse from "../../models/Shapes/Ellipse";

export default {
  name: "SVGEllipseDrawingCanvas",
  components: {
    SVGDynamicShape
  },
  mixins: [ToolMixIn],
  data: function() {
    return {
      firstClickPoint: undefined,
      currentEllipse: undefined
    };
  },
  methods: {
    CreateStartingEllipse: function() {
      return {
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
      };
    },
    HandlePan: function(data) {
      const relativeCoordinates = this.GetRelativeCoordinates(data);

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
