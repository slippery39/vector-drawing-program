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
          {value:'polygon',slot:'polygon'},
          {value:'path-heart',slot:'path-heart'},
          {value:'path-lightning',slot:'path-lightning'},
          {value:'path-triangle',slot:'path-triangle'}
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
    <template slot="path-heart">
      <svg style="width:25px;height:25px;" preserveAspectRatio="none" viewBox="0 0 500 500">
        <path fill="white" :d="customPaths.find(e=>e.name=='heart').path" />
      </svg>
      <q-tooltip>Heart</q-tooltip>
    </template>
    <template slot="path-lightning">
      <svg style="width:25px;height:25px;" preserveAspectRatio="none" viewBox="0 0 50 50">
        <path fill="white" :d="customPaths.find(e=>e.name=='lightning').path" />
      </svg>
      <q-tooltip>Lightning</q-tooltip>
    </template>
    <template slot="path-triangle">
      <svg style="width:25px;height:25px;" preserveAspectRatio="none" viewBox="0 0 50 50">
        <path fill="white" :d="customPaths.find(e=>e.name=='triangle').path" />
      </svg>
      <q-tooltip>Triangle</q-tooltip>
    </template>
  </q-btn-toggle>
</template>

        <script>
import state from "../state/state";
import paths from "../models/Paths/Paths";

export default {
  name: "ToolsButtonGroup",
  data: function() {
    return {
      editor: state.editor,
      customPaths: [
        {
          name: "heart",
          path: paths.heart
        },
        {
          name: "lightning",
          path: paths.lightning
        },
        {
          name: "triangle",
          path: paths.triangle
        }
      ]
    };
  }
};
</script>