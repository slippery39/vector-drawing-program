<template>
<div>
  Stroke Width: 
  <q-input class='bg-white text-black' v-model.number="editor.strokeWidth" type="number" filled style="max-width: 200px" />
</div>
</template>

<script>
import state from "src/state/state";

export default {
  name: "StrokeWidthInput",
  data: function() {
    return {
      editor: state.editor
    };
  }
};
</script>
