<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Shapes</q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator style="overflow-y:scroll;height:500px;">
      <q-item class="q-my-sm" v-for="shape in shapes" :key="shape.id" v-ripple>
        <q-item-section
          class="clickable"
          @click.native.prevent="handleItemClicked(shape)"
        >{{shape.type}}</q-item-section>
        <!--Note: the @click.capture.stop directive is to prevent the click from being applied to the whole list item-->
        <!--Todo: implement some toggle components-->
        <q-item-section  class="clickable" side>
          <VisibilityIcon @click.capture.stop="handleVisibilityClicked(shape)" :visible="shape.isVisible" />
        </q-item-section>
        <!--Open / Locked Icons -->
        <q-item-section class="clickable" side>
          <LockedIcon  @click.capture.stop="handleLockClicked(shape)" :locked="shape.isLocked" />
        </q-item-section>
        <!-- Delete Icon -->
        <q-item-section  class="clickable" side>
          <q-icon @click.capture.stop="handleDeleteClicked(shape)"  name="fas fa-trash-alt" color="black" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import VisibilityIcon from "./toggleIcons/VisibilityIcon";
import LockedIcon from "./toggleIcons/LockedIcon";

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
</style>