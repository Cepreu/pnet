/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.RepresentationModel = function (/*:int*/ x, /*:int*/ y, /*:int*/angle, /*bool*/minimized) {
    draw2d.AbstractCloudNodeModel.call(this);

    if (x !== undefined && x !== null) {
        this.x = parseInt(x, 10);
    }
    else {
        this.x = 42;
    }

    if (y !== undefined && y !== null) {
        this.y = parseInt(y, 10);
    }
    else {
        this.y = 42;
    }

    if (angle !== undefined && angle !== null) {
        this.angle = parseInt(angle, 10);
    }
    else {
        this.angle = 0;
    }

    if (minimized !== undefined && minimized !== null) {
        this.minimized = (minimized === true);
    }
    else {
        this.minimized = false;
    }
};

draw2d.RepresentationModel.prototype = new draw2d.AbstractCloudNodeModel();
/** @private **/
draw2d.RepresentationModel.prototype.type = "draw2d.RepresentationModel";
draw2d.RepresentationModel.prototype.tag = "representation";


/**
 * Returns all attributes which are relevant for serialization.
 *
 * @return The list of persistent attribute.
 **/
draw2d.RepresentationModel.prototype.getPersistentAttributes = function () {
    var memento = draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);

    // enrich the base attributes with the class/instance specific properties
    memento.attributes.x = this.x;
    memento.attributes.y = this.y;
    memento.attributes.angle = this.angle;
    memento.attributes.minimized = this.minimized;

    return memento;
};
