
//refactoring this to use a konva tool setup and not svg.

// this isn't for all tools, just for the creation tools. perhaps we should change the name of this.
var ToolMixIn = {
    props: {
        fillColor: {
            type: String,
            default: "#FFFFFF"
        },
        strokeColor: {
            type: String,
            default: "#000000"
        },
        strokeWidth: {
            type: Number,
            default: 2
        },
        width: {
            type: Number,
            default: 640
        },
        height: {
            type: Number,
            default: 480
        }
    },
    data: function () {
        const stagePadding = 500;
        const stageWidth = this.width + stagePadding;
        const stageHeight = this.height + stagePadding;

        return {
            stageConfig: {
                width: stageWidth,
                height: stageHeight
            },
            layerConfig: {
                x: stageWidth / 2 - this.width / 2,
                y: stageHeight / 2 - this.height / 2
            }
        }
    },
    methods: {
        GetDrawingLayer() {
            return this.$refs.stage.getNode().getLayers()[0];
        },
        GetRelativePointerCoordinates(data) {
               const layer = this.GetDrawingLayer();
            layer.getStage().setPointersPositions(data.evt);
            var transform = layer.getAbsoluteTransform().copy();
            // to detect relative position we need to invert transform
            transform.invert();

            // get pointer (say mouse or touch) position
            var pos = layer.getStage().getPointerPosition();

            // now we can find relative point
            return transform.point(pos);
        },
        //requires an svg element with the ref of 'svg'
        GetRelativeCoordinates: function (data) {
            //there seems to be a bug that happens sometimes where this thing fires but the
            //data variable is undefined. hopefully this fixes that.
            if (!data) {
                return;
            }

            //determine whether a $el exists or not for compatibility with both our svg and our konva based tools
            let left;
            let top;

            if (this.$refs.stage) {
                left = this.$refs.stage.$el.getBoundingClientRect().left;
                top = this.$refs.stage.$el.getBoundingClientRect().top;
            }
            else {
                left = this.$refs.svg.getBoundingClientRect().left;
                top = this.$refs.svg.getBoundingClientRect().top;
            }

            //for usage with Quasar Touch Events
            if (data.position) {
                return {
                    x: data.position.left - left,
                    y: data.position.top - top
                }
            } else {
                //for usage with native mouse events
                return {
                    x: data.clientX - left,
                    y: data.clientY - top
                }
            }
        }
    }
}

export default ToolMixIn;