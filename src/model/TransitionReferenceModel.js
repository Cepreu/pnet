/**
 * @version 0.0.1
 * @author Sergei K
 * @constructor
 **/
draw2d.TransitionReferenceModel = function (/*:String*/ reference) {
    draw2d.AbstractCloudNodeModel.call(this);
    this.reference = reference;
};

draw2d.TransitionReferenceModel.prototype = new draw2d.AbstractCloudNodeModel();
/** @private **/
draw2d.TransitionReferenceModel.prototype.type = "draw2d.TransitionReferenceModel";
draw2d.TransitionReferenceModel.prototype.tag = "transition";


/**
 * Returns all attributes which are relevant for serialization.
 *
 * @return The list of persistent attribute.
 **/
draw2d.TransitionReferenceModel.prototype.getPersistentAttributes = function () {
    var memento = draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);

    // enrich the base attributes with the class/instance specific properties
    memento.attributes.reference = this.reference;

    return memento;
};
