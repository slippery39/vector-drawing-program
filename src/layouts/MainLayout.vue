<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 766px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <div class="q-pa-sm q-pl-md row items-center" style="justify-content:space-between">
          <q-btn @click="removeAllShapes">Clear Canvas</q-btn>
          <CanvasDimensionsInput/>
          <ToolsButtonGroup />
          <AppColorPicker />
          <div>
            <q-btn @click="saveAsImg">Save Image</q-btn>
          </div>
        </div>
      </q-header>
      <q-page-container>
        <q-page>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
//Component Imports
import ToolsButtonGroup from "../components/ToolsButtonGroup";
import AppColorPicker from "../components/AppColorPicker";
import CanvasDimensionsInput from "../components/CanvasDimensionsInput";

//Javascript Imports
import ClearCanvasCommand from "../models/Commands/ClearCanvasCommand";
import state from "../state/state";

export default {
  name: "MainLayout",
  components: {
    ToolsButtonGroup,
    AppColorPicker,
    CanvasDimensionsInput
  },
  data: function() {
    return {
      editor: state.drawing,
      uiState: state.uiState
    };
  },
  methods: {
    removeAllShapes() {
      const removeAllShapesCommand = new ClearCanvasCommand(this.editor);
      removeAllShapesCommand.Execute();
    },
    saveAsImg() {
      function triggerDownload(imgURI) {
        var evt = new MouseEvent("click", {
          view: window,
          bubbles: false,
          cancelable: true
        });

        var a = document.createElement("a");
        a.setAttribute("download", "MY_COOL_IMAGE.png");
        a.setAttribute("href", imgURI);
        a.setAttribute("target", "_blank");

        a.dispatchEvent(evt);
      }

      var svg = document.getElementById("svg-image");

      var canvas = document.createElement("canvas");
      canvas.width = svg.attributes.width.value;
      canvas.height = svg.attributes.height.value;
      var ctx = canvas.getContext("2d");
      var data = new XMLSerializer().serializeToString(svg);
      var DOMURL = window.URL || window.webkitURL || window;

      var img = new Image();
      var svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
      var url = DOMURL.createObjectURL(svgBlob);

      img.onload = function() {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        var imgURI = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");

        triggerDownload(imgURI);
      };

      img.src = url;
    }
  }
};
</script>
