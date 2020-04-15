//Base Shape class for all the different types of shapes we will use.
//Note that each shape has its own GetBoundingBox() function, but this function does not take into account rotation at the moment.
class Shape {
    constructor(config) {
        //Deep copy of the config for debugging purposes.
        this.config = JSON.parse(JSON.stringify(config));
        this.id = config.id;
        this.type = 'unknown-shape';
        this.isVisible = true;
        this.isLocked = false;

        this.position = {
            x: config.position ? config.position.x : 0,
            y: config.position ? config.position.y : 0
        }
        this.scale = {
            x: config.scale ? config.scale.x : 1,
            y: config.scale ? config.scale.y : 1
        }
        this.rotation = config.rotation ? config.rotation : 0;
    }
    Translate(translationVector) {
        this.position.x += translationVector.x;
        this.position.y += translationVector.y;
    }
}

export default Shape;