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
  <PathTool
    @shapeCompleted="handleShapeComplete"
    v-else-if="IsPathTool(editor.selectedTool)"
    :strokeColor="editor.strokeColor"
    :strokeOpacity="editor.strokeOpacity"
    :fillColor="editor.fillColor"
    :fillOpacity="editor.fillOpacity"
    :width="editor.width"
    :height="editor.height"
    :pathData="GetPathData(editor.selectedTool)"
  />
</template>

<script>
// This component controls which drawing tool that is supposed to be used depending on the selectedTool
// in the app.

import EllipseTool from "./EllipseTool";
import RectangleTool from "./RectangleTool";
import LineTool from "./LineTool";
import PolygonTool from "./PolygonTool";
import PathTool from "./PathTool";

import state from "../../state/state";
import Paths from "../../models/Paths/Paths";

export default {
  name: "ToolController",
  components: {
    EllipseTool,
    RectangleTool,
    LineTool,
    PolygonTool,
    PathTool
  },
  data: function() {
    return { editor: state.editor };
  },
  methods: {
    handleShapeComplete: function(data) {
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
      var pathType = name.split("-")[1];
      console.log(pathType);
      console.log(name);
      console.log(Paths[pathType]);
      return Paths[pathType];
    }
  }
};
</script>
