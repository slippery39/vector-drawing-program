<template>
  <q-card
    style="width:20%;max-width:200px;"
    v-if="shape!=undefined"
    color="primary"
    class="q-pa-md bg-primary text-white"
  >
    <!--Name-->
    <div>
      <q-card style="text-align:center;" class="q-pa-md bg-primary text-white">
        Name:
        <q-input filled v-model="shape.name" dense class="bg-white text-black" />
      </q-card>
    </div>
    <!--<BackgroundContainer>-->
    <div>
      <q-card style="text-align:center;" class="q-pa-md bg-primary text-white">
        Fill:
        <ColorPicker @color-changed="FillColorChanged" :selectedColor="shape.fillColor" />
      </q-card>
    </div>
    <!--</BackgroundContainer>-->
    <div>
      <q-card style="text-align:center;" class="q-pa-md bg-primary text-white">
        Border:
        <ColorPicker @color-changed="BorderColorChanged" :selectedColor="shape.strokeColor" />
      </q-card>
    </div>
    <div>
      <q-card style="text-align:center;" class="q-pa-md bg-primary text-white">
          Border Width:
          <q-input
            class="bg-white text-black"
            v-model.number="shape.strokeWidth"
            type="number"
            filled
          />
      </q-card>
    </div>
    <!--Disabling this functionality for now while i figure out how I can make polygons and lines 
    work properly-->
    <div v-if="false">
      <q-card
        color="primary"
        class="q-pa-md bg-primary text-white"
        style="text-align:center"
      >Dimensions</q-card>
      <q-card style="display:flex;" class="bg-primary">
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          @input="HandleWidthChange"
          :value="shape.GetWidth()"
          label="Width"
          mask="###"
        />
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          @input="HandleHeightChange"
          :value="shape.GetHeight()"
          label="Height"
          mask="###"
        />
      </q-card>
    </div>
    <!--Disabling this functionality for now while i figure out how I can make polygons and lines 
    work properly-->
    <div v-if="false">
      <q-card
        color="primary"
        class="q-pa-md bg-primary text-white"
        style="text-align:center"
      >Position</q-card>
      <q-card style="display:flex;flex: 1 1 0;" class="bg-primary">
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          @input="HandleXPositionChange"
          :value="shape.GetPosition().x"
          label="X Position"
          mask="###"
        />
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          @input="HandleYPositionChange"
          v-model="shape.GetPosition().y"
          label="Y Position"
          mask="###"
        />
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          v-model="shape.rotation"
          label="Rotation"
          mask="###"
        />
      </q-card>
    </div>
  </q-card>
  <q-card
    v-else
    style="width:20%;max-width:200px;"
    color="primary"
    class="q-pa-md bg-primary text-white"
  >A shape has not been selected</q-card>
</template>

<script>
import ColorPicker from "src/components/generic/ColorPicker";

export default {
  name: "ShapeAttributesSidebar",
  components: {
    ColorPicker
  },
  props: {
    shape: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    StyleColorInput(color) {
      return {
        "background-color": color,
        border: "1px solid black"
      };
    },
    FillColorChanged(data) {
      this.shape.fillColor = data;
    },
    BorderColorChanged(data) {
      this.shape.strokeColor = data;
    },
    HandleXPositionChange(data) {
      this.shape.SetPosition({ x: data, y: this.shape.GetPosition().y });
    },
    HandleYPositionChange(data) {
      this.shape.SetPosition({ x: this.shape.GetPosition().x, y: data });
    },
    HandleWidthChange(data) {
      this.shape.SetWidth(data);
    },
    HandleHeightChange(data) {
      this.shape.SetHeight(data);
    }
  }
};
</script>