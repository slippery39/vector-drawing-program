<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 600px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <div class="q-pa-sm q-pl-md row items-center">
          <q-btn @click="removeAllShapes">Clear Canvas</q-btn>
          <ToolsButtonGroup />
          <div style="display:flex">
            <div>
              Fill Color:
              <q-btn :style="styleColorInput(uiState.fillColor)" label="   ">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="uiState.fillColor" />
                </q-popup-proxy>
              </q-btn>
              <q-input filled v-model="uiState.fillOpacity" label="Fill Opacity" mask="###" />
            </div>
            <div>
              Stroke Color:
              <q-btn :style="styleColorInput(uiState.strokeColor)" label="   ">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="uiState.strokeColor" />
                </q-popup-proxy>
              </q-btn>
              <q-input filled v-model="uiState.strokeOpacity" label="Stroke Opacity" mask="###" />
            </div>
          </div>
          <div>
            <q-btn @click="saveAsImg">Save Image</q-btn>
          </div>
        </div>
      </q-header>
      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import ToolsButtonGroup from "../components/ToolsButtonGroup";
import state from "../state/state";

export default {
  name: "MainLayout",
  components: {
    ToolsButtonGroup
  },
  data: function() {
    return {
      drawing: state.drawing,
      uiState: state.uiState
    };
  },
  methods: {
    styleColorInput(color) {
      return {
        "background-color": color,
        border: "1px solid black"
      };
    },
    removeAllShapes() {
      this.drawing.RemoveAllShapes();
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
      console.log(svg.attributes);
      console.log(canvas.width);
      console.log(canvas.height);
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
