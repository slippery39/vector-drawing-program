   <template>
  <div id="menu-view" class="cursor-pointer non-selectable">
    View
    <q-menu>
      <q-list dense style="min-width: 100px">
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
  }
};
</script>

<style scoped>
#menu-view:hover {
  color: black;
}
</style>