<template>
  <svg
    ref="svg"
    @mousedown="handleMouseDown"
    v-touch-pan.mouse="handlePan"
    width="640"
    height="480"
  >
    <SVGBoundingBox :data="editor.SelectedShape()" v-if="editor.SelectedShape()!=undefined" />
  </svg>
</template>

<script>
import state from "../../state/state";
import DeleteShapeCommand from "../../models/Commands/DeleteShapeCommand";
import TranslateShapeCommand from "../../models/Commands/TranslateShapeCommand";
import ToolMixIn from "./ToolMixIn";
import SVGBoundingBox from "../SVGBoundingBox";

export default {
  name: "MoveTool",
  components: {
    SVGBoundingBox
  },
  data: function() {
    return {
      editor: state.drawing,
      originalShapePosition: undefined
    };
  },
  mixins: [ToolMixIn],
  mounted: function() {
    window.addEventListener("keydown", e => {
      if (e.code === "Delete") {
        this.removeSelectedShape();
      }
    });
  },
  methods: {
    getShapePositionSnapshot: function(shape) {
      if (shape.type === "line") {
        return {
          x1: shape.x1,
          x2: shape.x2,
          y1: shape.y1,
          y2: shape.y2
        };
      } else if (shape.type === "polygon") {
        var newPoints = [];
        shape.points.forEach(element => {
          newPoints.push(Object.assign({}, element));
        });
        return {
          points: newPoints
        };
      } else {
        return {
          position: Object.assign({}, shape.position)
        };
      }
    },
    restoreShapePosition: function(shape) {
      if (shape.type === "line") {
        shape.x1 = this.originalShapePosition.x1;
        shape.x2 = this.originalShapePosition.x2;
        shape.y1 = this.originalShapePosition.y1;
        shape.y2 = this.originalShapePosition.y2;
      } else if (shape.type === "polygon") {
        shape.points = this.originalShapePosition.points;
      } else {
        shape.position = Object.assign({}, this.originalShapePosition.position);
      }
    },
    removeSelectedShape: function() {
      if (this.editor.selectedShapeId !== undefined) {
        const deleteCommand = new DeleteShapeCommand(
          this.editor,
          this.editor.selectedShapeId
        );
        deleteCommand.Execute();
        //this.editor.RemoveShape(this.editor.selectedShapeId);
      }
    },
    handleMouseDown: function(data) {
      const relativeCoordinates = this.GetRelativeCoordinates(data);
      const shapesAtPoint = this.editor.GetShapesAtPoint(relativeCoordinates);
      if (shapesAtPoint.length === 0) {
        this.editor.selectedShapeId = undefined;
        return;
      }
      this.editor.selectedShapeId = shapesAtPoint[0].id;
      this.originalShapePosition = this.getShapePositionSnapshot(
        this.editor.SelectedShape()
      );
    },
    handlePan: function(data) {
      const relativeCoordinates = this.GetRelativeCoordinates(data);
      //Hacky way of getting this implemented quickly
      //On handleMouseDown we store the initial position of the shape.
      //We translate the Shape using the Reference selected shape on pan (not using the translate command)
      //On data.isFinal, we put the shape back into its original position then create a TranslateShapeCommand with the offset data.
      //And finaly execute the command.
      //The editor object will only see the final command and therefore when the user tries to Undo, there will only be one Command object to undo
      //instead of a lot.

      if (data.isFirst) {
        const shapesAtPoint = this.editor.GetShapesAtPoint(relativeCoordinates);
        if (shapesAtPoint.length === 0) {
          return;
        }
        this.editor.selectedShapeId = shapesAtPoint[0].id;
      }
      if (this.editor.selectedShapeId === undefined) {
        return;
      }
      this.editor.SelectedShape().Translate({
        x: data.delta.x,
        y: data.delta.y
      });

      if (data.isFinal) {
        //TODO: this does not work for objects without a position...
        //how are we supposed to do lines or whatever with this?
        this.restoreShapePosition(this.editor.SelectedShape());
        const translateShapeCommand = new TranslateShapeCommand(
          this.editor,
          this.editor.SelectedShape(),
          {
            x: data.offset.x,
            y: data.offset.y
          }
        );
        translateShapeCommand.Execute();
      }
    }
  }
};
</script>
