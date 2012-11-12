/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.ArcModel = function (/*:String*/ sourceNodeId, /*:String*/ targetNodeId, /*:String*/ id) {
    draw2d.AbstractConnectionModel.call(this);

    /** @private */
    this.sourceNodeId = sourceNodeId;
    /** @private */
    this.sourcePort = "output";
    /** @private */
    this.targetNodeId = targetNodeId;
    /** @private */
    this.targetPort = "input";

    if (id !== undefined && id !== null) {
        this.id = id;
        draw2d.IdGenerator.reserve(this.id);
    }
    else {
        this.id = draw2d.IdGenerator.getNext();
    }

    // set some default vaiues for the XML serialization
    this.dbid = "";
    this.weight = draw2d.Configuration.DEFAULT_ARC_WEIGHT;
};


draw2d.ArcModel.EVENT_SOURCE_CHANGED = "source changed";
draw2d.ArcModel.EVENT_TARGET_CHANGED = "target changed";
draw2d.ArcModel.EVENT_PROPERTY_CHANGED = "property changed";

draw2d.ArcModel.prototype = new draw2d.AbstractConnectionModel();
/** @private */
draw2d.ArcModel.prototype.type = "draw2d.ArcModel";
draw2d.ArcModel.prototype.tag = "arc";


/**
 * Set the weight of the arc.
 *
 * @param {String} name The new weight of the arc.
 **/
draw2d.ArcModel.prototype.setWeight = function (/*:String*/ order) {
    var save = this.weight;
    if (save === order) {
        return;
    }
    this.weight = order;

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.ArcModel.EVENT_PROPERTY_CHANGED, save, this.weight);
};

/**
 * Return the weight of the arc.
 *
 * @type String the weight of the arc.
 * @public
 **/
draw2d.ArcModel.prototype.getWeight = function () {
    return this.weight;
};


/**
 *
 **/
draw2d.ArcModel.prototype.setSourceModel = function (/*:draw2d.AbstractCloudNodeModel*/ model) {
    var save1 = this.sourceNodeId;
    var save2 = this.sourcePort;

    this.sourceNodeId = model.getId();
    this.sourcePort = "output";

    if (save1 === this.sourceNodeId && save2 === this.sourcePort) {
        return;
    }

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.ArcModel.EVENT_SOURCE_CHANGED, null, model);
};

/**
 *
 * @type draw2d.AbstractCloudNodeModel
 **/
draw2d.ArcModel.prototype.getSourceModel = function () {
    return this.getNetworkCloudModel().getCloudNodeModel(this.sourceNodeId);
};


/**
 *
 **/
draw2d.ArcModel.prototype.setTargetModel = function (/*:draw2d.AbstractCloudNodeModel*/ model) {
    var save1 = this.targetNodeId;
    var save2 = this.targetPort;

    this.targetNodeId = model.getId();
    this.targetField = "input";

    if (save1 == this.targetNodeId && save2 == this.targetPort) {
        return;
    }

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.ArcModel.EVENT_TARGET_CHANGED, null, model);
};


/**
 *
 * @type draw2d.AbstractCloudNodeModel
 **/
draw2d.ArcModel.prototype.getTargetModel = function () {
    return this.getNetworkCloudModel().getCloudNodeModel(this.targetNodeId);
};


/**
 *
 * @type String
 **/
draw2d.ArcModel.prototype.getSourcePortName = function () {
    return this.sourcePort;
};

/**
 *
 * @type String
 **/
draw2d.ArcModel.prototype.getTargetPortName = function () {
    return this.targetPort;
};


/**
 * @type draw2d.VirtualNetworkCloudModel
 **/
draw2d.ArcModel.prototype.getNetworkCloudModel = function () {
    return this.getModelParent().getNetworkCloudModel();
};


/**
 * Returns all attributes which are relevant for serialization.
 *
 * @return The list of persistend attribute.
 **/
draw2d.ArcModel.prototype.getPersistentAttributes = function () {
    var memento = {attributes:{}};
    memento.attributes.id = this.id;
    memento.source = this.getSourceModel().createReferenceModel();
    memento.target = this.getTargetModel().createReferenceModel();
    if (this.weight > 0) {
        memento.weight = this.weight;
    }
    if (this.dbid.length > 0) {
        memento.dbid = this.dbid;
    }
    return memento;
};
