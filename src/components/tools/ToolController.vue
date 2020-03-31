<template>
  <EllipseTool
    @shapeCompleted="handleShapeComplete"
    v-if="appState.selectedTool==='ellipse'"
    :strokeColor="appState.strokeColor"
    :strokeOpacity="appState.strokeOpacity"
    :fillColor="appState.fillColor"
    :fillOpacity="appState.fillOpacity"
    :width="drawingState.width"
    :height="drawingState.height"
  />
  <RectangleTool
    @shapeCompleted="handleShapeComplete"
    v-else-if="appState.selectedTool === 'rectangle'"
    :strokeColor="appState.strokeColor"
    :strokeOpacity="appState.strokeOpacity"
    :fillColor="appState.fillColor"
    :fillOpacity="appState.fillOpacity"
    :width="drawingState.width"
    :height="drawingState.height"
  />
  <LineTool
    @shapeCompleted="handleShapeComplete"
    v-else-if="appState.selectedTool === 'line'"
    :strokeColor="appState.strokeColor"
    :strokeOpacity="appState.strokeOpacity"
    :fillColor="appState.fillColor"
    :fillOpacity="appState.fillOpacity"
    :width="drawingState.width"
    :height="drawingState.height"
  />
  <PolygonTool
    @shapeCompleted="handleShapeComplete"
    v-else-if="appState.selectedTool==='polygon'"
    :strokeColor="appState.strokeColor"
    :strokeOpacity="appState.strokeOpacity"
    :fillColor="appState.fillColor"
    :fillOpacity="appState.fillOpacity"
    :width="drawingState.width"
    :height="drawingState.height"
  />
  <MoveTool v-else-if="appState.selectedTool==='move'" />
  <div v-else>Error: No Tool Found for {{appState.selectedTool}}</div>
</template>

<script>
// This component controls which drawing tool that is supposed to be used depending on the selectedTool
// in the app.

import EllipseTool from "./EllipseTool";
import RectangleTool from "./RectangleTool";
import LineTool from "./LineTool";
import PolygonTool from "./PolygonTool";
import MoveTool from "./MoveTool";

import state from "~/state/state";

export default {
  name: "ToolController",
  components: {
    EllipseTool,
    RectangleTool,
    LineTool,
    PolygonTool,
    MoveTool
  },
  data: function() {
    return { appState: state.uiState, drawingState: state.drawing };
  },
  methods: {
    handleShapeComplete: function(data) {
      this.$emit("shapeCompleted", data);
    }
  }
};
</script>
