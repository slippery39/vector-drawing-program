   <template>
  <q-btn-toggle
    v-model="editor.selectedTool"
    push
    glossy
    toggle-color="teal"
    :options="[
          {value: 'move', slot: 'move'},
          {value: 'ellipse', slot: 'ellipse'},
          {value: 'rectangle', slot: 'rectangle'},
          {value:'line',slot:'line'},
          {value:'polygon',slot:'polygon'}
        ]"
  >
    <template v-slot:move>
      <q-icon name="fas fa-arrows-alt"></q-icon>
      <q-tooltip>Move Tool</q-tooltip>
    </template>
    <template v-slot:ellipse>
      <q-icon name="far fa-circle"></q-icon>
      <q-tooltip>Ellipse</q-tooltip>
    </template>

    <template v-slot:rectangle>
      <q-icon name="far fa-square"></q-icon>
      <q-tooltip>Rectangle</q-tooltip>
    </template>
    <template v-slot:line>
      <q-icon name="fas fa-grip-lines"></q-icon>
      <q-tooltip>Line</q-tooltip>
    </template>
    <template v-slot:polygon>
      <q-icon name="fas fa-draw-polygon"></q-icon>
      <q-tooltip>Polygon</q-tooltip>
    </template>
  </q-btn-toggle>
</template>

        <script>
import state from "../state/state";

export default {
  name: "ToolsButtonGroup",
  data: function() {
    return {
      editor: state.editor
    };
  }
};
</script>