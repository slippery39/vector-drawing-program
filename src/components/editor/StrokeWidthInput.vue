<template>
  <div>
    Stroke Width:
    <q-input
      hide-bottom-space
      style="max-width: 50px; display:inline-block; height:30px;"
      dense
      class="bg-white text-black"
      v-model.number="editor.strokeWidth"
      type="number"
      filled
      input-style="height:30px;"
    />
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

<style scoped>
.q-field__control{
  height:30px !important;
}
</style>
