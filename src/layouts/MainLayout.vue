<template>
  <div class="q-pa-md" style="height:100vh">
    <q-layout style='min-height:0px !important;' view="lHh lpr lFf" container class="shadow-2 rounded-borders">
      <q-header elevated>
        <div class='q-ma-sm' style='display:flex;'>
        <FileMenu class='top-menu' />
        <EditMenu class='top-menu'/>
        <ViewMenu class='top-menu'/>
        </div>
        <div class="q-pa-xs q-pl-md row items-center">
          <ToolsButtonGroup class='menu-margin' />
          <StrokeWidthInput class='menu-margin'/>
          <AppColorPicker class='menu-margin' />
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
import EditMenu from "src/components/editor/EditMenu";
import ViewMenu from "src/components/editor/ViewMenu";
import StrokeWidthInput from "src/components/editor/StrokeWidthInput";

export default {
  name: "MainLayout",
  components: {
    ToolsButtonGroup,
    AppColorPicker,
    FileMenu,
    EditMenu,
    ViewMenu,
    StrokeWidthInput
  }
};
</script>

<style scoped>
.top-menu{
  margin-right:10px;
}
.menu-margin{
  margin-right:15px;
}
</style>