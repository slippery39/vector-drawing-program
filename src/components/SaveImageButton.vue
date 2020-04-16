<template>
  <div>
    <q-btn @click="saveAsImg">Save</q-btn>
    <MainLayer ref="imageCanvas" id="image-to-save" style="display:none" :shapes="editor.objects" />
  </div>
</template>

<script>
import MainLayer from "../components/konva/MainLayer";
import state from "../state/state";

/*
We are re-creating the shapes canvas here as a hidden object, when the user clicks the save button, we will convert this hidden canvas into
an actual image and trigger a 'download'.
*/

export default {
  name: "SaveImageButton",
  components: {
    MainLayer
  },
  data: function() {
    return {
      editor: state.editor
    };
  },
  methods: {
    saveAsImg() {
      console.log(this.$refs.imageCanvas);
      //hack to trigger a fake click in order to start a download.
      function triggerDownload(imgURI) {
        var evt = new MouseEvent("click", {
          view: window,
          bubbles: false,
          cancelable: true
        });
        var a = document.createElement("a");
        a.setAttribute("download", "savedImage.png");
        a.setAttribute("href", imgURI);
        a.setAttribute("target", "_blank");

        a.dispatchEvent(evt);
      }
      var canvas = document
        .getElementById("image-to-save")
        .querySelector("canvas");

      var img = new Image();
      img.onload = function() {
        var imgURI = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");

        triggerDownload(imgURI);
      };

      img.src = canvas.toDataURL();
    }
  }
};
</script>
