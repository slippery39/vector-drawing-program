<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Shapes</q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator style="overflow-y:scroll;height:500px;">
      <q-item
        :active="isSelected(shape)"
        active-class="selected-list-item"
        class="q-my-sm"
        v-for="shape in shapes"
        :key="shape.id"
        v-ripple
      >
        <q-item-section
          class="clickable"
          @click.native.prevent="handleItemClicked(shape)"
        >{{shape.type}}</q-item-section>
        <!--Note: the @click.capture.stop directive is to prevent the click from being applied to the whole list item-->
        <!--Todo: implement some toggle components-->
        <q-item-section
          @click.capture.stop="handleVisibilityClicked(shape)"
          class="clickable hoverable"
          side
        >
          <VisibilityIcon :visible="shape.isVisible" />
        </q-item-section>
        <!--Open / Locked Icons -->
        <q-item-section
          @click.capture.stop="handleLockClicked(shape)"
          class="clickable hoverable"
          side
        >
          <LockedIcon :locked="shape.isLocked" />
        </q-item-section>
        <!-- Delete Icon -->
        <q-item-section
          @click.capture.stop="handleDeleteClicked(shape)"
          class="clickable hoverable"
          side
        >
          <q-icon name="fas fa-trash-alt" color="black" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import VisibilityIcon from "./toggleIcons/VisibilityIcon";
import LockedIcon from "./toggleIcons/LockedIcon";
import state from "../state/state";

export default {
  name: "ShapesList",
  components: {
    VisibilityIcon,
    LockedIcon
  },
  props: {
    shapes: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    isSelected(shape) {
      return state.editor.selectedShapeId === shape.id;
    },
    handleItemClicked: function(shape) {
      this.$emit("item-clicked", shape);
    },
    handleDeleteClicked: function(shape) {
      this.$emit("delete-item-clicked", shape);
    },
    handleVisibilityClicked: function(shape) {
      this.$emit("visibility-clicked", shape);
    },
    handleLockClicked: function(shape) {
      this.$emit("lock-clicked", shape);
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
.fas {
  font-size: 12px;
}
.hoverable > .fas:hover {
  font-size: 15px;
}
.selected-list-item{
    background-color:orange;
}
</style>