<template>
  <div style="display:flex;margin-right:5px;">
    <div>
      Fill Color:
      <ColorPicker
        :selectedColor="editor.fillColor"
        @color-changed="function(data){editor.fillColor=data}"
      />
    </div>
    <div style="margin-left:5px;">
      Stroke Color:
      <ColorPicker
        :selectedColor="editor.strokeColor"
        @color-changed="function(data){editor.strokeColor=data}"
      />
    </div>
  </div>
</template>

<script>
import state from "../state/state";

import ColorPicker from "./ColorPicker";

export default {
  name: "AppColorPicker",
  components: {
    ColorPicker
  },
  data: function() {
    return {
      editor: state.editor
    };
  },
  methods: {
    styleColorInput(color) {
      return {
        "background-color": color,
        border: "1px solid black"
      };
    }
  }
};
</script>