   <template>
  <q-btn
    :style="styleColorInput(selectedColorData)"
    style="min-width:40px;margin-right:10px;"
    label="   "
  >
    <q-popup-proxy transition-show="scale" transition-hide="scale">
      <q-color
        @change="$emit('color-changed',selectedColorData)"
        v-model="selectedColorData"
        format-model="rgba"
      />
    </q-popup-proxy>
  </q-btn>
</template>

<script>
export default {
  name: "ShapesList",
  data: function() {
    return {
      selectedColorData: this.selectedColor
    };
  },
  props: {
    selectedColor: {
      type: String,
      default: undefined
    }
  },
  watch: {
    selectedColor: function(newVal) {
      this.selectedColorData = newVal;
    }
  },
  methods: {
    styleColorInput() {
      return {
        "background-color": this.selectedColorData,
        border: "1px solid black"
      };
    }
  }
};
</script>
