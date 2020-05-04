//Base Shape class for all the different types of shapes we will use.
//Note that each shape has its own GetBoundingBox() function, but this function does not take into account rotation at the moment.
class Shape {
    constructor(config) {
        //Deep copy of the config for debugging purposes.
        this.config = JSON.parse(JSON.stringify(config));
        this.id = config.id;
        this.type = 'unknown-shape';
        this.InitName();
        this.isVisible = true;
        this.isLocked = false;

        this.fillColor = config.fillColor;
        this.strokeColor = config.strokeColor;
        this.strokeWidth = config.strokeWidth;

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
    InitName() {
        this.name = this.config.name ? this.config.name : this.type;
    }
    Translate(translationVector) {
        this.position.x += translationVector.x;
        this.position.y += translationVector.y;
    }
    GetSnapshot() {
        return {
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
            position: { ...this.position },
            scale: { ...this.scale },
            rotation: this.rotation
        }
    }
    RestoreSnapshot(snapshot) {
        this.fillColor = snapshot.fillColor;
        this.strokeColor = snapshot.strokeColor;
        this.strokeWidth = snapshot.strokeWidth;
        this.position = { ...snapshot.position };
        this.scale = { ...snapshot.scale };
        this.rotation = snapshot.rotation;
    }
}

export default Shape;