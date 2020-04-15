<template>
  <v-stage
    :config="configKonva"
    @mousedown="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
    id="shapes-canvas"
  >
    <v-layer>
      <template v-for="shape in shapes">
        <template v-if="shape.isVisible">
          <v-rect
            v-if="shape.type==='rectangle'"
            :config="GetConfig(shape)"
            :key="shape.id"
            @transformend="handleTransformEnd"
            @dragend="handleTransformEnd"
          ></v-rect>
          <v-ellipse
            v-else-if="shape.type==='ellipse'"
            :config="GetConfig(shape)"
            :key="shape.id"
            @transformend="handleTransformEnd"
            @dragend="handleTransformEnd"
          ></v-ellipse>
          <!--Maybe with groups, we can set the position to the original bounding box of the underlying
          shape and then modify all the points by the original bounding box inside-->
          <!-- basically this way we get to treat all the points inside as relative to the polygon/line container-->
          <!-- this should give us the "position" of the polygon-->
          <v-group
            v-else-if="shape.type==='line'"
            :key="shape.id"
            @transformend="handleTransformEnd"
            @dragend="handleTransformEnd"
            :config="{
            id:shape.id,
            draggable: allowTransforms? true:false
            }"
          >
            <v-line :config="GetConfig(shape)"></v-line>
          </v-group>
          <!--Setting the group position to 0 seems to work with proper coordinates, but not too sure why-->
          <v-group
            v-else-if="shape.type==='polygon'"
            :key="shape.id"
            @transformend="handleTransformEnd"
            @dragend="handleTransformEnd"
            :config="{
            id:shape.id,
            position:shape.position,
            draggable: allowTransforms? true:false
          }"
          >
            <v-line
              :config="GetConfig(shape)"
              @transformend="handleTransformEnd"
              @dragend="handleTransformEnd"
            ></v-line>
          </v-group>
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
      configKonva: {
        width: 640,
        height: 480
      },
      selectedShapeName: undefined,
      editor: state.editor
    };
  },
  methods: {
    //this is messy lets store this in the actual classes.
    GetConfig(shape) {
      //quick translator for the shape.
      var config = {};
      config.id = shape.id;
      if (shape.position && shape.type !== "polygon" && shape.type !== "line") {
        config.x = shape.position.x;
        config.y = shape.position.y;
      }
      config.width = shape.width;
      config.height = shape.height;
      config.fill = shape.fillColor;
      config.stroke = shape.strokeColor;
      config.scaleX = shape.scale.x;
      config.scaleY = shape.scale.y;
      config.rotation = shape.rotation;
      config.strokeScaleEnabled = false;
      if (this.allowTransforms && shape.isVisible && !shape.isLocked) {
        config.draggable = true;
      }

      //these shapes have an origin that exists in the top left corner of the rectangle.
      //we want to have it be in the center so that we can simplify the position's of these rectangular shapes.
      if (
        shape.type === "rectangle" ||
        shape.type === "polygon" ||
        shape.type === "line"
      ) {
        //trying this out.
        config.offsetX = shape.GetBoundingBox().width / 2;
        config.offsetY = shape.GetBoundingBox().height / 2;
        //this moves it every time.
        config.x += config.offsetX;
        config.y += config.offsetY;
      }

      //Radius for ellipses.
      if (shape.type === "ellipse") {
        config.radius = Object.assign({}, shape.radius);
      }

      //config for lines
      if (shape.type === "line") {
        config.points = [shape.x1, shape.y1, shape.x2, shape.y2];
        config.hitStrokeWidth = Math.max(6, shape.strokeWidth);
        config.id = undefined;
        config.draggable = false;
      }

      if (shape.type === "polygon") {
        config.closed = true;
        config.points = shape.relativePoints
          .map(el => {
            return [el.x, el.y];
          })
          .flat();
        //we are testing creating this shape by using groups.
        config.id = undefined;
        config.draggable = false;
      }

      return config;
    },
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const shape = this.shapes.find(r => r.id === this.selectedShapeName);

      //UPDATE THE STATE OF THE SHAPE HERE.
      console.log("transform update here");
      console.log(e.target);
      console.log(e.target.getClientRect());
      console.log("transform is done");

      var transform = {};

      //for now this is to prevent bugs from happening with the line and polygon tools, where the positions that konva tells us
      //don't really make sense.

      if (shape.position) {
        transform.position = {
          x: e.target.x(),
          y: e.target.y()
        };
      }
      //accounting for the offset from the transformer
      if (
        shape.type === "rectangle" ||
        shape.type === "polygon" ||
        shape.type === "line"
      ) {
        //remove the offset and reset the position.
        if (!transform.position) {
          transform.position = {};
        }
        transform.position.x -= shape.GetBoundingBox().width / 2;
        transform.position.y -= shape.GetBoundingBox().height / 2;
      }
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
        this.selectedShapeName = "";
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

      let id = e.target.attrs.id;
      //Checking to see if it is in a grouped object.
      //grouped objects will have their own id.
      if (e.target.getParent().attrs.id) {
        id = e.target.getParent().attrs.id;
      }

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
