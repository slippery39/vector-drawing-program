<template>
  <EllipseTool
    @shapeCompleted="handleShapeComplete"
    v-if="appState.selectedTool==='ellipse'"
    :strokeColor="appState.strokeColor"
    :strokeOpacity="appState.strokeOpacity"
    :fillColor="appState.fillColor"
    :fillOpacity="appState.fillOpacity"
  />
  <RectangleTool
    @shapeCompleted="handleShapeComplete"
    v-else-if="appState.selectedTool === 'rectangle'"
    :strokeColor="appState.strokeColor"
    :strokeOpacity="appState.strokeOpacity"
    :fillColor="appState.fillColor"
    :fillOpacity="appState.fillOpacity"
  />
  <LineTool
    @shapeCompleted="handleShapeComplete"
    v-else-if="appState.selectedTool === 'line'"
    :strokeColor="appState.strokeColor"
    :strokeOpacity="appState.strokeOpacity"
    :fillColor="appState.fillColor"
    :fillOpacity="appState.fillOpacity"
  />
  <div v-else>Error: No Tool Found for {{appState.selectedTool}}</div>
</template>

<script>
// This component controls which drawing tool that is supposed to be used depending on the selectedTool
// in the app.

import EllipseTool from "./EllipseTool";
import RectangleTool from "./RectangleTool";
import LineTool from "./LineTool";

import state from "~/state/state";

export default {
  name: "ToolController",
  components: {
    EllipseTool,
    RectangleTool,
    LineTool
  },
  data: function() {
    return { appState: state.uiState };
  },
  methods: {
    handleShapeComplete: function(data) {
      console.log("shapeCompleted");
      console.log(data);
      this.$emit("shapeCompleted", data);
    }
  }
};
</script>
