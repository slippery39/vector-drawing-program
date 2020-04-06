<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Created Shapes</q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator>
      <q-item class="q-my-sm" v-for="shape in shapes" :key="shape.id" v-ripple>
        <q-item-section
          class="clickable"
          @click.native.prevent="handleItemClicked(shape)"
        >{{shape.type}}</q-item-section>
        <q-item-section @click.capture.stop class="clickable" side>
          <q-icon v-if="shape.isVisible" name="fas fa-eye-slash" color="black" />
        </q-item-section>
        <q-item-section @click.capture.stop class="clickable" side>
          <q-icon v-if="!shape.isVisible" name="fas fa-eye-slash" color="grey" />
        </q-item-section>
        <q-item-section @click.capture.stop class="clickable" side>
          <q-icon v-if="!shape.isLocked" name="fas fa-lock-open" color="black" />
        </q-item-section>
        <q-item-section @click.capture.stop class="clickable" side>
          <q-icon v-if="shape.isLocked" name="fas fa-lock" color="black" />
        </q-item-section>
        <q-item-section @click.capture.stop="handleDeleteClicked(shape)" class="clickable" side>
          <q-icon name="fas fa-trash-alt" color="black" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "ShapesList",
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
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>