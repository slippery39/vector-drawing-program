   <template>
  <div id="menu-view" class="cursor-pointer non-selectable">
    View
    <q-menu>
      <q-list dense style="min-width: 100px">
        <!--not using this for now, need to learn more about how dark mode is styled-->
        <q-item v-if="false" @click="ToggleDarkMode()" clickable v-close-popup>
          <q-item-section side>
            <span v-if="$q.dark.mode">&#10003;</span>
          </q-item-section>
          <q-item-section>Toggle Dark mode</q-item-section>
        </q-item>
        <q-item @click="editor.shapesListVisible=!editor.shapesListVisible" clickable v-close-popup>
          <q-item-section side>
            <span v-if="editor.shapesListVisible">&#10003;</span>
          </q-item-section>
          <q-item-section>Show Created Shapes List</q-item-section>
        </q-item>
        <q-item
          @click="editor.shapeAttributesVisible=!editor.shapeAttributesVisible"
          clickable
          v-close-popup
        >
          <q-item-section side>
            <span v-if="editor.shapeAttributesVisible">&#10003;</span>
          </q-item-section>
          <q-item-section>Show Shape Attributes</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
import state from "src/state/state";

export default {
  name: "FileMenu",
  data: function() {
    return {
      editor: state.editor
    };
  },
  methods: {
    ToggleDarkMode() {
      this.$q.dark.toggle();
    }
  }
};
</script>

<style scoped>
#menu-view:hover {
  color: black;
}
</style>