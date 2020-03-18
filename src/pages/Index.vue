<template>
  <q-page class="flex flex-center">
    <SVGCanvas :shapes="shapes.objects" />
  </q-page>
</template>

<script>
import SVGCanvas from "../components/SVGCanvas";
import AppState from "../state/state.js";

var circle1 = {
  type: "circle",
  position: {
    x: 50,
    y: 50
  },
  radius: 40,
  strokeColor: "green",
  strokeWidth: 4,
  fillColor: "yellow"
};

AppState.drawing.AddShape(circle1);

var ellipse = {
  type: "ellipse",
  position: {
    x: 200,
    y: 80
  },
  radius: {
    x: 100,
    y: 50
  },
  fillColor: "yellow",
  strokeColor: "purple",
  strokeWidth: "2"
};
AppState.drawing.AddShape(ellipse);

var line = {
  type: "line",
  x1: 0,
  y1: 0,
  x2: 200,
  y2: 200,
  strokeColor: "red",
  strokeWidth: 2
};

AppState.drawing.AddShape(line);

var polygon = {
  type: "polygon",
  points: [
    { x: 200, y: 10 },
    { x: 250, y: 190 },
    { x: 160, y: 210 }
  ],
  fillColor: "lime",
  strokeColor: "purple",
  strokeWidth: 1
};

AppState.drawing.AddShape(polygon);

var text = {
  type: "text",
  position: {
    x: 0,
    y: 15
  },
  fillColor: "red",
  text: "I love SVG!"
};
AppState.drawing.AddShape(text);

export default {
  name: "PageIndex",
  components: {
    SVGCanvas
  },
  data: function() {
    return { shapes: AppState.drawing };
  }
};
</script>
