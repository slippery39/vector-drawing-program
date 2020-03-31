
// this isn't for all tools, just for the creation tools. perhaps we should change the name of this.
var ToolMixIn = {
    props: {
        fillColor: {
            type: String,
            default: "#FFFFFF"
        },
        fillOpacity: {
            default: 100
        },
        strokeColor: {
            type: String,
            default: "#000000"
        },
        strokeOpacity: {
            default: 100
        }
    },
    methods: {
        //requires an svg element with the ref of 'svg'
        GetRelativeCoordinates: function (data) {
            const svgLeft = this.$refs.svg.getBoundingClientRect().left;
            const svgTop = this.$refs.svg.getBoundingClientRect().top;

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