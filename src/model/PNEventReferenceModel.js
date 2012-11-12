/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PNEventReferenceModel = function (/*:String*/ reference) {
    draw2d.AbstractCloudNodeModel.call(this);
    this.reference = reference;
};

draw2d.PNEventReferenceModel.prototype = new draw2d.AbstractCloudNodeModel();
/** @private **/
draw2d.PNEventReferenceModel.prototype.type = "draw2d.PNEventReferenceModel";
draw2d.PNEventReferenceModel.prototype.tag = "pnevent";


draw2d.PNEventReferenceModel.prototype.getReference = function () {
    return this.reference;
};

/**
 * Returns all attributes which are relevant for serialization.
 *
 * @return The list of persistent attribute.
 * @since 0.0.1
 **/
draw2d.PNEventReferenceModel.prototype.getPersistentAttributes = function () {
    var memento = draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);

    // enrich the base attributes with the class/instance specific properties
    memento.attributes.reference = this.reference;

    return memento;
};
