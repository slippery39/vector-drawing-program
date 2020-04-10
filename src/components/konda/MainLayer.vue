<template>
  <v-stage
    :config="configKonva"
    @mousedown="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
  >
    <v-layer>
      <v-rect
        v-for="shape in shapes"
        :config="GetConfig(shape)"
        :key="shape.id"
        @transformend="handleTransformEnd"
        @dragend="handleTransformEnd"
      ></v-rect>
      <v-transformer ref="transformer" />
    </v-layer>
  </v-stage>
</template>

<script>
import state from "../../state/state";
//i need to track when the mouse moves over this thing.
//and grab any shapes that have a mouseover applied to it.

export default {
  name: "MainLayer",
  props: {
    shapes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    selectedShape: {
      type: Number
    }
  },
  watch: {
    selectedShape: function(val) {
      // here we need to manually attach or detach Transformer node
      this.selectedShapeName = val;

      this.$nextTick(e => {
        this.updateTransformer();
        /*
        const transformerNode = this.$refs.transformer.getNode();
        const stage = transformerNode.getStage();        

        const selectedNode = stage.find(el => {
          return el.attrs && el.attrs.id === this.selectedShapeName;
        })[0];

        // do nothing if selected node is already attached
        if (selectedNode === transformerNode.node()) {
          return;
        }
        if (selectedNode) {
          // attach to another node
          transformerNode.attachTo(selectedNode);
        } else {
          // remove transformer
          transformerNode.detach();
        }
        transformerNode.getLayer().batchDraw();
        */
      });
    }
  },
  data: function() {
    return {
      configKonva: {
        width: 640,
        height: 480
      },
      selectedShapeName: ""
    };
  },
  methods: {
    GetConfig(shape) {
      //quick translator for the shape.
      var config = {};
      config.id = shape.id;
      config.x = shape.position.x;
      config.y = shape.position.y;
      config.width = shape.width;
      config.height = shape.height;
      config.fill = shape.fillColor;
      config.stroke = shape.strokeColor;
      config.scaleX = 1;
      config.scaleY = 1;
      config.draggable = true;

      return config;
    },
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const rect = this.shapes.find(r => r.id === this.selectedShapeName);
      // update the state
      //UPDATE THE STATE OF THE RECT
      rect.position.x = e.target.x();
      rect.position.y = e.target.y();
      rect.width = e.target.width();
      rect.height = e.target.height();
      rect.rotation = e.target.rotation();
      rect.scale.x = e.target.scaleX();
      rect.scale.y = e.target.scaleY();
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = "";
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }

      const id = e.target.attrs.id;

      const rect = this.shapes.find(function(r) {
        return r.id === id;
      });
      if (rect) {
        this.selectedShapeName = id;
        //update selected shape in the editor.
        state.editor.selectedShapeId = id;
      } else {
        this.selectedShapeName = "";
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();

      const selectedNode = stage.find(el => {
        return el.attrs && el.attrs.id === this.selectedShapeName;
      })[0];

      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }
      if (selectedNode) {
        // attach to another node
        transformerNode.attachTo(selectedNode);
      } else {
        // remove transformer
        transformerNode.detach();
      }
      transformerNode.getLayer().batchDraw();
    }
  }
};
</script>
