<template>
  <q-icon v-if="visible" name="fas fa-eye" color="black" />
  <q-icon v-else name="fas fa-eye-slash" color="grey" />
</template>

<script>
export default {
  name: "VisibilityIcon",
  props: {
    visible: {
      default: true
    }
  }
};
</script>
