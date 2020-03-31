<template>
  <div style="display:flex;margin-right:5px;">
    <div>
      Fill Color:
      <q-btn :style="styleColorInput(uiState.fillColor)" label="   ">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-color v-model="uiState.fillColor" />
        </q-popup-proxy>
      </q-btn>
      <q-input type="number" dense bordered bg-color="white" v-model="uiState.fillOpacity" label="Fill Opacity" mask="###" />
    </div>
    <div style='margin-left:5px;'>
      Stroke Color:
      <q-btn :style="styleColorInput(uiState.strokeColor)" label="   ">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-color v-model="uiState.strokeColor" />
        </q-popup-proxy>
      </q-btn>
      <q-input type="number" dense bordered bg-color="white" v-model="uiState.strokeOpacity" label="Stroke Opacity" mask="###" />
    </div>
  </div>
</template>

<script>
import state from "../state/state";

export default {
  name: "SVGDynamicShape",
  data: function() {
    return {
      uiState: state.uiState
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