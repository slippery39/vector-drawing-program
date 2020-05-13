   <template>
  <div id="menu-file" class="cursor-pointer non-selectable">
    File
    <q-menu>
      <q-list dense style="min-width: 100px">
        <q-item clickable v-close-popup @click="SaveImage">
          <q-item-section>Save as Image</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="RemoveAllShapes">
          <q-item-section>Clear Canvas</q-item-section>
        </q-item>       
      </q-list>
    </q-menu>
    <!-- this main layer is generated because it is an easy way for us to grab the image to save-->
    <!-- but we need to find a better way to do this, since if we want other ways to save the image then i don't want to keep 
    putting this random MainLayer everywhere-->
    <MainCanvas ref="imageCanvas" id="image-to-save" style="display:none" :shapes="editor.shapes" />
  </div>
</template>

<script>
import state from "src/state/state";

import MainCanvas from "src/components/editor/MainCanvas";

import ClearCanvasCommand from "src/models/Commands/ClearCanvasCommand";

export default {
  name: "FileMenu",
  components: {
    MainCanvas
  },
  data: function() {
    return {
      editor: state.editor
    };
  },
  methods: {
    GetUnselectableStyle() {
      return {
        color: "lightgrey"
      };
    },
    RemoveAllShapes() {
      const removeAllShapesCommand = new ClearCanvasCommand(this.editor);
      removeAllShapesCommand.Execute();
    },
    SaveImage() {
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

<style scoped>
#menu-file:hover {
  color: black;
}
</style>