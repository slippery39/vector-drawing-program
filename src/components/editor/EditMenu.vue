   <template>
  <div id="menu-file" class="cursor-pointer non-selectable">
    Edit
    <q-menu>
      <q-list dense style="min-width: 100px">
        <q-item
          :style="!editor.CanUndo()? GetUnselectableStyle():{}"
          :clickable="editor.CanUndo()"
          :v-close-popup="editor.CanUndo()"
          @click="editor.Undo()"
        >
          <q-item-section>Undo</q-item-section>
          <q-item-section side>Ctrl + Z</q-item-section>
        </q-item>
        <q-item
          :style="!editor.CanRedo()? GetUnselectableStyle():{}"
          :clickable="editor.CanRedo()"
          :v-close-popup="editor.CanRedo()"
          @click="editor.Redo()"
        >
          <q-item-section>Redo</q-item-section>
          <q-item-section side>Ctrl + X</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
import state from "src/state/state";

export default {
  name: "EditMenu",
  data: function() {
    return {
      editor: state.editor
    };
  },
  methods: {
    GetUnselectableStyle() {
      return {
        color: "lightgrey"
      };
    }
  }
};
</script>

<style scoped>
#menu-file:hover {
  color: black;
}
</style>