<template>
  <!-- For whatever reason this tool does not work with our dynamic setup, for now lets keep it like this until we can figure out why-->
  <PremadePathTool
    @shapeCompleted="HandleShapeComplete"
    v-if="IsPathTool(editor.selectedTool)"
    :strokeColor="editor.strokeColor"
    :strokeWidth="editor.strokeWidth"
    :fillColor="editor.fillColor"
    :width="editor.width"
    :height="editor.height"
    :pathData="GetPathData(editor.selectedTool)"
    :pathName="GetPathName(editor.selectedTool)"
  />
  <component
    v-else-if="GetCurrentTool()!=undefined"
    :is="GetCurrentTool()"
    :strokeColor="editor.strokeColor"
    :strokeWidth="editor.strokeWidth"
    :fillColor="editor.fillColor"
    :width="editor.width"
    :height="editor.height"
    @shapeCompleted="HandleShapeComplete"
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
    },
    GetCurrentProps: function() {
      const props = {
        strokeColor: this.editor.strokeColor,
        strokeWidth: this.editor.strokeWidth,
        fillColor: this.editor.fillColor,
        width: this.editor.width,
        height: this.editor.height
      };

      if (this.IsPathTool(this.editor.selectedTool)) {
        props.pathData = this.GetPathData(this.editor.selectedTool);
        props.pathName = this.GetPathName(this.editor.selectedTool);
      }
      console.log('current props');
      console.log(props);
      return props;
    },
    GetCurrentTool: function() {
      const selectedTool = this.editor.selectedTool;
      if (selectedTool === undefined) {
        return;
      }

      //first check if its a path tool
      if (this.IsPathTool(selectedTool)) {
        return PremadePathTool;
      } else {
        const toolMap = {
          ellipse: EllipseTool,
          rectangle: RectangleTool,
          line: LineTool,
          polygon: PolygonTool,
          "free-draw": FreePathTool
        };
        return toolMap[selectedTool];
      }
    }
  }
};
</script>
