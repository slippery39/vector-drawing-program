<template>
  <q-page class="flex flex-center">
    <div style="position:relative;border:1px solid black;">
      <SVGCanvas id="svg-image" :shapes="shapes.objects" />
      <ToolController
        @shapeCompleted="handleShapeComplete"
        style="position:absolute;left:0px;top:0px;"
      />
    </div>
  </q-page>
</template>

<script>
import SVGCanvas from "../components/SVGCanvas";
import ToolController from "../components/tools/ToolController";
import AppState from "../state/state.js";

export default {
  name: "PageIndex",
  components: {
    SVGCanvas,
    ToolController
  },
  data: function() {
    return { shapes: AppState.drawing };
  },
  methods: {
    handleShapeComplete: function(data) {
      AppState.drawing.AddShape(data);
    }
  }
};
</script>
