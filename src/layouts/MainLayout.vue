<template>
  <div class="q-pa-md" style="height:100vh">
    <q-layout view="lHh lpr lFf" container class="shadow-2 rounded-borders">
      <q-header elevated>
        <div class="q-pa-sm q-pl-md row items-center" style="justify-content:space-between">
          <FileMenu />
          <ToolsButtonGroup />
          <StrokeWidthInput />
          <AppColorPicker />
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
import ToolsButtonGroup from "src/components/editor/ToolsButtonGroup";
import AppColorPicker from "src/components/editor/AppColorPicker";
import FileMenu from "src/components/editor/FileMenu";
import StrokeWidthInput from "src/components/editor/StrokeWidthInput";

export default {
  name: "MainLayout",
  components: {
    ToolsButtonGroup,
    AppColorPicker,
    FileMenu,
    StrokeWidthInput
  }
};
</script>