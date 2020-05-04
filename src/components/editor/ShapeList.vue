<template>
  <div class="q-pa-md bg-primary text-white">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Shapes</q-toolbar-title>
    </q-toolbar>
    <q-list
      bordered
      separator
      style="overflow-y:scroll;height:500px; font-size:10px;"
      class="bg-white text-black"
    >
      <q-item
        :active="IsSelected(shape)"
        active-class="selected-list-item"
        class="q-my-sm"
        v-for="shape in shapes"
        :key="shape.id"
        v-ripple
      >
        <q-item-section
          class="clickable"
          @click.native.prevent="HandleItemClicked(shape)"
        >{{shape.name}}</q-item-section>
        <!--Note: the @click.capture.stop directive is to prevent the click from being applied to the whole list item-->
        <q-item-section
          @click.capture.stop="HandleVisibilityClicked(shape)"
          class="clickable hoverable"
          side
        >
          <VisibilityIcon :visible="shape.isVisible" />
        </q-item-section>
        <!--Open / Locked Icons -->
        <q-item-section
          @click.capture.stop="HandleLockClicked(shape)"
          class="clickable hoverable"
          side
        >
          <LockedIcon :locked="shape.isLocked" />
        </q-item-section>
        <!-- Delete Icon -->
        <q-item-section
          @click.capture.stop="HandleDeleteClicked(shape)"
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
import VisibilityIcon from "src/components/toggleIcons/VisibilityIcon";
import LockedIcon from "src/components/toggleIcons/LockedIcon";
//import state from "src/state/state";

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
    },
    selectedShapeId: {
      type: Number,
      default: function() {
        return undefined;
      }
    }
  },
  methods: {
    IsSelected(shape) {
      return shape.id === this.selectedShapeId;
    },
    HandleItemClicked: function(shape) {
      this.$emit("item-clicked", shape);
    },
    HandleDeleteClicked: function(shape) {
      this.$emit("delete-item-clicked", shape);
    },
    HandleVisibilityClicked: function(shape) {
      this.$emit("visibility-clicked", shape);
    },
    HandleLockClicked: function(shape) {
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
  font-size: 11px;
}
.hoverable > .fas:hover {
  font-size: 14px;
}
.selected-list-item {
  background-color: orange;
}
</style>