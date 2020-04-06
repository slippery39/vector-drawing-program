<template>
  <EllipseTool
    @shapeCompleted="handleShapeComplete"
    v-if="editor.selectedTool==='ellipse'"
    :strokeColor="editor.strokeColor"
    :strokeOpacity="editor.strokeOpacity"
    :fillColor="editor.fillColor"
    :fillOpacity="editor.fillOpacity"
    :width="editor.width"
    :height="editor.height"
  />
  <RectangleTool
    @shapeCompleted="handleShapeComplete"
    v-else-if="editor.selectedTool === 'rectangle'"
    :strokeColor="editor.strokeColor"
    :strokeOpacity="editor.strokeOpacity"
    :fillColor="editor.fillColor"
    :fillOpacity="editor.fillOpacity"
    :width="editor.width"
    :height="editor.height"
  />
  <LineTool
    @shapeCompleted="handleShapeComplete"
    v-else-if="editor.selectedTool === 'line'"
    :strokeColor="editor.strokeColor"
    :strokeOpacity="editor.strokeOpacity"
    :fillColor="editor.fillColor"
    :fillOpacity="editor.fillOpacity"
    :width="editor.width"
    :height="editor.height"
  />
  <PolygonTool
    @shapeCompleted="handleShapeComplete"
    v-else-if="editor.selectedTool==='polygon'"
    :strokeColor="editor.strokeColor"
    :strokeOpacity="editor.strokeOpacity"
    :fillColor="editor.fillColor"
    :fillOpacity="editor.fillOpacity"
    :width="editor.width"
    :height="editor.height"
  />
  <MoveTool v-else-if="editor.selectedTool==='move'" />
  <div v-else>Error: No Tool Found for {{editor.selectedTool}}</div>
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
    return { editor: state.editor };
  },
  methods: {
    handleShapeComplete: function(data) {
      this.$emit("shapeCompleted", data);
    }
  }
};
</script>
