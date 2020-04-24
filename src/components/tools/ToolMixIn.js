
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
        }
    },
    methods: {
        //requires an svg element with the ref of 'svg'
        GetRelativeCoordinates: function (data) {
            //there seems to be a bug that happens sometimes where this thing fires but the
            //data variable is undefined. hopefully this fixes that.
            if (!data) {
                return;
            }

            //determine whether a $el exists or not for compatibility with both our svg and our konva based tools
            let svgLeft;
            let svgTop;
            if (this.$refs.svg.$el) {
                svgLeft = this.$refs.svg.$el.getBoundingClientRect().left;
                svgTop = this.$refs.svg.$el.getBoundingClientRect().top;
            }
            else {
                svgLeft = this.$refs.svg.getBoundingClientRect().left;
                svgTop = this.$refs.svg.getBoundingClientRect().top;
            }

            //for usage with Quasar Touch Events
            if (data.position) {
                return {
                    x: data.position.left - svgLeft,
                    y: data.position.top - svgTop
                }
            } else {
                //for usage with native mouse events
                return {
                    x: data.clientX - svgLeft,
                    y: data.clientY - svgTop
                }
            }
        }
    }
}

export default ToolMixIn;