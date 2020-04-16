<template>
  <div class="q-pa-md" style="height:100vh">
    <q-layout view="lHh lpr lFf" container class="shadow-2 rounded-borders">
      <q-header elevated>
        <div class="q-pa-sm q-pl-md row items-center" style="justify-content:space-between">
          <q-btn @click="removeAllShapes">Clear</q-btn>
          <CanvasDimensionsInput />
          <ToolsButtonGroup />
          <AppColorPicker />
          <SaveImageButton />
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
import SaveImageButton from "../components/SaveImageButton";

//Javascript Imports
import ClearCanvasCommand from "../models/Commands/ClearCanvasCommand";
import state from "../state/state";

export default {
  name: "MainLayout",
  components: {
    ToolsButtonGroup,
    AppColorPicker,
    CanvasDimensionsInput,
    SaveImageButton
  },
  data: function() {
    return {
      editor: state.editor
    };
  },
  methods: {
    removeAllShapes() {
      const removeAllShapesCommand = new ClearCanvasCommand(this.editor);
      removeAllShapesCommand.Execute();
    }
  }
};
</script>
