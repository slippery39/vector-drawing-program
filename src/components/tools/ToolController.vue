<template>
  <!--Todo, we have a lot of repeated handlers here, lets use dynamic components and stuff-->
  <EllipseTool
    @shapeCompleted="HandleShapeComplete"
    v-if="editor.selectedTool==='ellipse'"
    :strokeColor="editor.strokeColor"
    :fillColor="editor.fillColor"
    :width="editor.width"
    :height="editor.height"
  />
  <RectangleTool
    @shapeCompleted="HandleShapeComplete"
    v-else-if="editor.selectedTool === 'rectangle'"
    :strokeColor="editor.strokeColor"
    :fillColor="editor.fillColor"
    :width="editor.width"
    :height="editor.height"
  />
  <LineTool
    @shapeCompleted="HandleShapeComplete"
    v-else-if="editor.selectedTool === 'line'"
    :strokeColor="editor.strokeColor"
    :fillColor="editor.fillColor"
    :width="editor.width"
    :height="editor.height"
  />
  <PolygonTool
    @shapeCompleted="HandleShapeComplete"
    v-else-if="editor.selectedTool==='polygon'"
    :strokeColor="editor.strokeColor"
    :fillColor="editor.fillColor"
    :width="editor.width"
    :height="editor.height"
  />
  <PremadePathTool
    @shapeCompleted="HandleShapeComplete"
    v-else-if="IsPathTool(editor.selectedTool)"
    :strokeColor="editor.strokeColor"
    :fillColor="editor.fillColor"
    :width="editor.width"
    :height="editor.height"
    :pathData="GetPathData(editor.selectedTool)"
    :pathName="GetPathName(editor.selectedTool)"
  />
  <FreePathTool
    @shapeCompleted="HandleShapeComplete"
    v-else-if="editor.selectedTool==='free-draw'"
    :strokeColor="editor.strokeColor"
    :fillColor="editor.fillColor"
    :width="editor.width"
    :height="editor.height"
  />
</template>

<script>
// This component controls which drawing tool that is supposed to be used depending on the selectedTool
// in the app.

import EllipseTool from "./EllipseTool";
import RectangleTool from "./RectangleTool";
import LineTool from "./LineTool";
import PolygonTool from "./PolygonTool";
import PremadePathTool from "./PremadePathTool";
import FreePathTool from "./FreePathTool";

import state from "../../state/state";
import Paths from "../../models/Paths/Paths";

export default {
  name: "ToolController",
  components: {
    EllipseTool,
    RectangleTool,
    LineTool,
    PolygonTool,
    PremadePathTool,
    FreePathTool
  },
  data: function() {
    return { editor: state.editor };
  },
  methods: {
    HandleShapeComplete: function(data) {
      this.$emit("shapeCompleted", data);
    },
    //our premade path tools will be stored as 'path-heart' or 'path-lightning' in our editor class, but we want
    //to reuse the same tool for all paths, this helps us determine if the tool selected is a path.
    IsPathTool: function(name) {
      if (name === undefined) {
        return false;
      }
      return name.split("-")[0] === "path";
    },
    GetPathData: function(name) {
      const pathType = name.split("-")[1];
      return Paths[pathType];
    },
    GetPathName: function(name) {
      return name.split("-")[1];
    }
  }
};
</script>
