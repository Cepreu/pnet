/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PNPlaceReferenceModel = function (/*:String*/ reference) {
    draw2d.AbstractCloudNodeModel.call(this);
    this.reference = reference;
};

draw2d.PNPlaceReferenceModel.prototype = new draw2d.AbstractCloudNodeModel();
/** @private **/
draw2d.PNPlaceReferenceModel.prototype.type = "draw2d.PNPlaceReferenceModel";
draw2d.PNPlaceReferenceModel.prototype.tag = "place";


draw2d.PNPlaceReferenceModel.prototype.getReference = function () {
    return this.reference;
};

/**
 * Returns all attributes which are relevant for serialization.
 *
 * @return The list of persistent attribute.
 * @since 0.9.15
 **/
draw2d.PNPlaceReferenceModel.prototype.getPersistentAttributes = function () {
    var memento = draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);

    // enrich the base attributes with the class/instance specific properties
    memento.attributes.reference = this.reference;

    return memento;
};
