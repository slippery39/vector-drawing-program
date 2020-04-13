//Base ShapeObject class for all the different types of shapes
//that we will use. 

//Note that not much 

class ShapeObject {
    constructor(data) {
        //the line below is to make sure that we are deep cloning any nested objects.
        Object.assign(this, JSON.parse(JSON.stringify(data)));
        this.type = 'unknown-shape';
        this.isVisible = true;
        this.isLocked = false;
        this.scale = {
            x: 1,
            y: 1
        }  
         //We keep the objects original attributes in tact. to change the width / height we modify this "scale" object.
        //when we need to return a width and height we take the bounding box * the scale.
    }
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

export default ShapeObject;