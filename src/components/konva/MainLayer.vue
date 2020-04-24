<template>
  <v-stage
    :config="stageConfig"
    @mousedown="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
    id="shapes-canvas"
    style="border:2px solid black;"
  >
    <v-layer>
      <template v-for="shape in shapes">
        <template v-if="shape.isVisible">
          <v-rect
            v-if="shape.type==='rectangle'"
            :config="shape.GetKonvaConfig()"
            :key="shape.id"
            @transformend="handleTransformEnd"
            @dragend="handleTransformEnd"
          ></v-rect>
          <v-ellipse
            v-else-if="shape.type==='ellipse'"
            :config="shape.GetKonvaConfig()"
            :key="shape.id"
            @transformend="handleTransformEnd"
            @dragend="handleTransformEnd"
          ></v-ellipse>
          <!--Combining the line and polygon below because in Konva, a polygon is just a line with 'closed=true'-->
          <v-line
            v-else-if="shape.type==='line' || shape.type==='polygon'"
            :config="shape.GetKonvaConfig()"
            :key="shape.id"
            @transformend="handleTransformEnd"
            @dragend="handleTransformEnd"
          ></v-line>

          <v-path
            v-else-if="shape.type==='path'"
            :key="shape.id"
            @transformend="handleTransformEnd"
            @dragend="handleTransformEnd"
            :config="shape.GetKonvaConfig()"
          />
        </template>
      </template>
      <v-transformer
        ref="transformer"
        :resizeEnabled="allowTransforms"
        :rotateEnabled="allowTransforms"
      />
    </v-layer>
  </v-stage>
</template>

<script>
import state from "src/state/state";
import TransformShapeCommand from "src/models/Commands/TransformShapeCommand";
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
    },
    allowTransforms: {
      type: Boolean
    }
  },
  watch: {
    selectedShape: function(val) {
      // here we need to manually attach or detach Transformer node
      this.selectedShapeName = val;
      this.$nextTick(e => {
        this.updateTransformer();
      });
    }
  },
  data: function() {
    return {
      stageConfig: {
        width: state.editor.width,
        height: state.editor.height
      },
      selectedShapeName: undefined,
      editor: state.editor
    };
  },
  methods: {
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const shape = this.shapes.find(r => r.id === this.selectedShapeName);
      const transform = {};

      //for now this is to prevent bugs from happening with the line and polygon tools, where the positions that konva tells us
      //don't really make sense.
      transform.position = {
        x: e.target.x(),
        y: e.target.y()
      };
      transform.rotation = e.target.rotation();
      transform.scale = {
        x: e.target.scaleX(),
        y: e.target.scaleY()
      };
      const transformShapeCommand = new TransformShapeCommand(
        this.editor,
        shape,
        transform
      );
      transformShapeCommand.Execute();
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = undefined;
        this.$emit("shape-selected", undefined);
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
      const shape = this.shapes.find(function(r) {
        return r.id === id && !r.isLocked;
      });

      if (shape) {
        this.selectedShapeName = id;
        //update selected shape in the editor.
        this.$emit("shape-selected", id);
      } else {
        this.selectedShapeName = undefined;
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();

      const selectedNode = stage.find(el => {
        return (
          el.attrs &&
          el.attrs.id === this.selectedShapeName &&
          el.attrs.id !== undefined
        );
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
