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

        //All objects should have a position.
        //for now each object will override this with whatever it considers its position to be
        //for example, circles position starts in the center of the circle,
        //rectangles position starts at the top left of the rectangle

        this.position = {
            x: 0,
            y: 0
        }

        this.scale = {
            x: 1,
            y: 1
        }

        this.rotation = 0;

        //We keep the objects original attributes in tact. to change the width / height we modify this "scale" object.
        //when we need to return a width and height we take the bounding box * the scale.
    }
    /**
     * @param {{ x: number; y: number; }} position
     */
    /*
    set position(position) {
        this.position = Object.assign({}, position);
    }
    set scale(scale) {
        this.scale = Object.assign({}, scale);
    }
    set rotation(rotation) {
        this.rotation = rotation
    }
    */
    Translate(translationVector) {

    }
    CollidesWithPoint(point) {
        console.error("call to collides with point has not been implemented")
    }
    //TODO: Define other Class Types and extend this from there.
    GetBoundingBox() {
        console.error("get bounding box has not implemented");
    }
    //this should be universal for all subclasses.
    GetPosition() {
        return this.GetBoundingBox().position;
    }
    SetPosition(positionVector) {
        var currentPosition = this.GetPosition();
        var diffX = positionVector.x - currentPosition.x;
        var diffY = positionVector.y - currentPosition.y;
        this.Translate({ x: diffX, y: diffY });
    }
    GetWidth() {
        return this.GetBoundingBox().width;
    }
    GetHeight() {
        return this.GetBoundingBox().height;
    }
    SetWidth(width) {
        //scale down points.
        const currentWidth = this.GetWidth();
        const scaleRatio = width / currentWidth;
        this.Scale({
            x: scaleRatio,
            y: 1
        });
    }
    SetHeight(height) {
        const currentHeight = this.GetHeight();
        const scaleRatio = height / currentHeight;
        this.Scale({
            x: 1,
            y: scaleRatio
        });
        //scale down points.
    }
}

export default Shape;