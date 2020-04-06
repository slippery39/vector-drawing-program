<template>
  <div style="display:flex;margin-right:5px;">
    <div>
      Fill Color:
      <q-btn :style="styleColorInput(editor.fillColor)" label="   ">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-color v-model="editor.fillColor" />
        </q-popup-proxy>
      </q-btn>
      <q-input type="number" dense bordered bg-color="white" v-model="editor.fillOpacity" label="Fill Opacity" mask="###" />
    </div>
    <div style='margin-left:5px;'>
      Stroke Color:
      <q-btn :style="styleColorInput(editor.strokeColor)" label="   ">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-color v-model="editor.strokeColor" />
        </q-popup-proxy>
      </q-btn>
      <q-input type="number" dense bordered bg-color="white" v-model="editor.strokeOpacity" label="Stroke Opacity" mask="###" />
    </div>
  </div>
</template>

<script>
import state from "../state/state";

export default {
  name: "AppColorPicker",
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