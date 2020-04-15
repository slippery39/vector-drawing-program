//Base ShapeObject class for all the different types of shapes
//that we will use. 

//Note that not much 

class Shape {
    constructor(config) {
        //Deep copy of the config for debugging purposes.
        this.config = JSON.parse(JSON.stringify(config));
        this.id = config.id;
        this.type = 'unknown-shape';
        this.isVisible = true;
        this.isLocked = false;
        this.position = {
            x: 0,
            y: 0
        }
        this.scale = {
            x: 1,
            y: 1
        }
        this.rotation = 0;
    }
}

export default Shape;