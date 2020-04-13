<template>
  <q-card
    style="width:20%;max-width:300px;"
    v-if="shape!=undefined"
    color="primary"
    class="q-pa-md bg-primary text-white"
  >
    <!--<BackgroundContainer>-->
    <div>
      <q-card style="text-align:center;" class="q-pa-md bg-primary text-white">Fill</q-card>
      <q-card style="display:flex;" class="q-pa-md bg-white text-black">
        <ColorPicker @color-changed="fillColorChanged" :selectedColor="shape.fillColor" />
        <!--Opacity Input-->
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          v-model="shape.fillOpacity"
          label="Opacity"
          mask="###"
        />
      </q-card>
    </div>
    <!--</BackgroundContainer>-->
    <div>
      <q-card style="text-align:center;" class="q-pa-md bg-primary text-white">Border</q-card>
      <q-card style="display:flex;" class="q-pa-md bg-white text-black">
        <ColorPicker @color-changed="borderColorChanged" :selectedColor="shape.strokeColor" />
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          v-model="shape.strokeOpacity"
          label="Opacity"
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
      >Dimensions</q-card>
      <q-card style="display:flex;" class="bg-primary">
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          @input="handleWidthChange"
          :value="shape.GetWidth()"
          label="Width"
          mask="###"
        />
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          @input="handleHeightChange"
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
          @input="handleXPositionChange"
          :value="shape.GetPosition().x"
          label="X Position"
          mask="###"
        />
        <q-input
          type="number"
          dense
          bordered
          bg-color="white"
          @input="handleYPositionChange"
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
    style="width:20%;max-width:300px;"
    color="primary"
    class="q-pa-md bg-primary text-white"
  >A shape has not been selected</q-card>
</template>

<script>
import ColorPicker from "./ColorPicker";
/*
-We will need a ModifyShapeAttributesCommand.
options:{
    backgroundStuff,
    borderStuff,
    width/heightStuff
    positionStuff

//things we need in our shapes
    //every object needs a position.
        //position will be based on top left corner of bounding box
        //for objects that don't have a position.
    //ability to manipulate all shapes by width/height
        //Shapes need a 'Scale' function
    //(width/height is basically just scaling the object by x and y)
*/

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
    styleColorInput(color) {
      return {
        "background-color": color,
        border: "1px solid black"
      };
    },
    fillColorChanged(data) {
      this.shape.fillColor = data;
    },
    borderColorChanged(data) {
      this.shape.strokeColor = data;
    },
    handleXPositionChange(data) {
      this.shape.SetPosition({ x: data, y: this.shape.GetPosition().y });
    },
    handleYPositionChange(data) {
      this.shape.SetPosition({ x: this.shape.GetPosition().x, y: data });
    },
    handleWidthChange(data) {
      this.shape.SetWidth(data);
    },
    handleHeightChange(data) {
      this.shape.SetHeight(data);
    }
  }
};
</script>