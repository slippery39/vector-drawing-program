<template>
  <div v-if="false" style="display:flex;margin-right:5px;">
    <div>
        Width
      <q-input type="number" dense bordered bg-color="white" v-model="editor.width" label="Width" mask="####" />
    </div>
    <div style='margin-left:5px;'>
        Height
      <q-input type="number" dense bordered bg-color="white" v-model="editor.height" label="Height" mask="####" />
    </div>
  </div>
</template>

<script>
import state from "../state/state";

export default {
  name: "CanvasDimensionsInput",
  data: function() {
    return {
      editor: state.editor
    };
  }
};
</script>