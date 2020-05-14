<template>
  <v-stage
    ref="stage"
    :config="stageConfig"
    @mousedown="HandleStageMouseDown"
    @touchstart="HandleStageMouseDown"
    id="shapes-canvas"
    style="max-width:100%;height:500px;background-color:white;"
  >
    <v-layer :config="layerConfig">
      <v-rect
        :config="{
          x:0,
          y:0,
          width:editor.width,
          height:editor.height,
          stroke:'black',
          fill:'rgba(0,0,0,0)'
          }"
      />
    </v-layer>
    <v-layer :config="layerConfig">
      <template v-for="shape in shapes">
        <template v-if="shape.isVisible">
          <v-rect
            v-if="shape.type==='rectangle'"
            :config="shape.GetKonvaConfig()"
            :key="shape.id"
            @transformend="HandleTransformEnd"
            @dragend="HandleTransformEnd"
          ></v-rect>
          <v-ellipse
            v-else-if="shape.type==='ellipse'"
            :config="shape.GetKonvaConfig()"
            :key="shape.id"
            @transformend="HandleTransformEnd"
            @dragend="HandleTransformEnd"
          ></v-ellipse>
          <!--Combining the line and polygon below because in Konva, a polygon is just a line with 'closed=true'-->
          <v-line
            v-else-if="shape.type==='line' || shape.type==='polygon'"
            :config="shape.GetKonvaConfig()"
            :key="shape.id"
            @transformend="HandleTransformEnd"
            @dragend="HandleTransformEnd"
          ></v-line>

          <v-path
            v-else-if="shape.type==='path'"
            :key="shape.id"
            @transformend="HandleTransformEnd"
            @dragend="HandleTransformEnd"
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
        this.UpdateTransformer();
      });
    }
  },
  data: function() {
    const stagePadding = 500;
    const stageWidth = state.editor.width + stagePadding;
    const stageHeight = state.editor.height + stagePadding;
    return {
      stageConfig: {
        width: stageWidth,
        height: stageHeight
      },
      layerConfig: {
        x: stageWidth / 2 - state.editor.width / 2,
        y: stageHeight / 2 - state.editor.height / 2
      },
      selectedShapeName: undefined,
      editor: state.editor
    };
  },
  methods: {
    HandleTransformEnd(e) {
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
    GetDrawingLayer() {
      return this.$refs.stage.getNode().getLayers()[1];
    },
    //other components can include this component and get back the data url here.
    GetDrawingDataUrl() {
      const layer = this.GetDrawingLayer();

      //learned that layers cannot have their own width and heights, which makes sense after you think of it,
      //but now we need to specify the cutoff point here when we save the image (in case shapes are out of the drawing area bounds)
      const dataurl = layer.toDataURL({
        width: this.editor.width,
        height: this.editor.height
      });
      return dataurl;
    },
    GetRelativePointerCoordinates() {
      const layer = this.GetDrawingLayer();
      var transform = layer.getAbsoluteTransform().copy();
      // to detect relative position we need to invert transform
      transform.invert();

      // get pointer (say mouse or touch) position
      var pos = layer.getStage().getPointerPosition();

      // now we can find relative point
      return transform.point(pos);
    },
    HandleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = undefined;
        this.$emit("shape-selected", undefined);
        this.UpdateTransformer();
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
      this.UpdateTransformer();
    },
    UpdateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();

      if (this.selectedShapeName === undefined) {
        transformerNode.detach();
        transformerNode.getLayer().batchDraw();
        return;
      }

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
