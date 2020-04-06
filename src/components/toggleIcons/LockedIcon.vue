<template>
  <q-icon v-if="!locked" name="fas fa-lock-open" color="grey" />
  <q-icon v-else name="fas fa-lock" color="black" />
</template>

<script>
export default {
  name: "LockedIcon",
  props: {
    locked: {
      default: true
    }
  }
};
</script>
