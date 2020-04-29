
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