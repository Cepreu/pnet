/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.VirtualNetworkCloudModel = function (/*:String*/ id) {
    this.nodes = new draw2d.ArrayList();
    this.id = id;
    this.dbid = "";
    this.name = draw2d.Configuration.DEFAULT_NETWORK_NAME;
};

draw2d.VirtualNetworkCloudModel.prototype = new draw2d.AbstractObjectModel();
draw2d.VirtualNetworkCloudModel.prototype.type = "draw2d.VirtualNetworkCloudModel";
draw2d.VirtualNetworkCloudModel.prototype.tag = "pnml";


/**
 *
 **/
draw2d.VirtualNetworkCloudModel.prototype.getModelChildren = function () {
    return this.nodes;
};


/**
 * Set the name of the virtual network.
 *
 * @param {String} name The new name of the network.
 **/
draw2d.VirtualNetworkCloudModel.prototype.setName = function (/*:String*/ name) {
    var save = this.name;
    if (save === name) {
        return;
    }

    this.name = name;

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, name);
};

/**
 * Return the name of the network.
 *
 * @type String the name of the network.
 * @public
 **/
draw2d.VirtualNetworkCloudModel.prototype.getName = function () {
    return this.name;
};

/**
 * Return all connections from the model.
 *
 * @type draw2d.ArrayList
 **/
draw2d.VirtualNetworkCloudModel.prototype.getConnectionModels = function () {
    var result = new draw2d.ArrayList();
    var count = this.nodes.getSize();

    for (var i = 0; i < count; i++) {
        var model = this.nodes.get(i);
        result.addAll(model.getConnectionModels());
    }

    return result;
};


/**
 * Returns the all cloud node elements.
 *
 * @type draw2d.ArrayList
 **/
draw2d.VirtualNetworkCloudModel.prototype.getCloudNodeModels = function () {
    return this.nodes;
};

/**
 * Returns only the pnplace elements in the clouds.
 *
 * @type draw2d.ArrayList
 **/
draw2d.VirtualNetworkCloudModel.prototype.getPNPlaceModels = function () {
    var result = new draw2d.ArrayList();
    for (var i = 0; i < this.nodes.getSize(); i++) {
        var node = this.nodes.get(i);
        if (node instanceof draw2d.PNPlaceModel) {
            result.add(node);
        }
    }
    return result;
};

/**
 * Returns only the message elements in the clouds.
 *
 * @type draw2d.ArrayList
 **/
draw2d.VirtualNetworkCloudModel.prototype.getPNMessageModels = function () {
    var result = new draw2d.ArrayList();
    for (var i = 0; i < this.nodes.getSize(); i++) {
        var node = this.nodes.get(i);
        if (node instanceof draw2d.PNMessageModel) {
            result.add(node);
        }
    }
    return result;
};


/**
 * Returns only the event elements in the clouds.
 *
 * @type draw2d.ArrayList
 **/
draw2d.VirtualNetworkCloudModel.prototype.getPNEventModels = function () {
    var result = new draw2d.ArrayList();
    for (var i = 0; i < this.nodes.getSize(); i++) {
        var node = this.nodes.get(i);
        if (node instanceof draw2d.PNEventModel) {
            result.add(node);
        }
    }
    return result;
};


/**
 * Returns only the transition elements in the clouds.
 *
 * @type draw2d.ArrayList
 **/
draw2d.VirtualNetworkCloudModel.prototype.getTransitionModels = function () {
    var result = new draw2d.ArrayList();
    for (var i = 0; i < this.nodes.getSize(); i++) {
        var node = this.nodes.get(i);
        if (node instanceof draw2d.TransitionModel) {
            result.add(node);
        }
    }
    return result;
};

/**
 * Returns only the transition elements in the clouds.
 *
 * @type draw2d.ArrayList
 **/
draw2d.VirtualNetworkCloudModel.prototype.getArcModels = function () {
    var result = new draw2d.ArrayList();
    var cons = this.getConnectionModels();
    for (var i = 0; i < cons.getSize(); i++) {
        var con = cons.get(i);
        if (con instanceof draw2d.ArcModel) {
            result.add(con);
        }
    }
    return result;
};


/**
 * Add a new RecordSourceModel to the Converter model
 *
 **/
draw2d.VirtualNetworkCloudModel.prototype.addCloudNodeModel = function (/*:draw2d.AbstractRecordSourceModel*/ model) {
    this.nodes.add(model);
    model.setModelParent(this);
    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_ADDED, null, model);
};

/**
 **/
draw2d.VirtualNetworkCloudModel.prototype.removeCloudNodeModel = function (/*:draw2d.AbstractRecordSourceModell*/ model) {
    if (this.nodes.remove(model) !== null) {
        model.setModelParent(null);
        // inform all listener, mainly the visual representation, about the changes.
        this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_ELEMENT_REMOVED, model, null);
    }
};

/**
 * Return the table model with the hands over db name.
 *
 * @type draw2d.AbstractCloudNodeModel
 **/
draw2d.VirtualNetworkCloudModel.prototype.getCloudNodeModel = function (/*:String*/ sourceId) {
    var count = this.nodes.getSize();
    for (var i = 0; i < count; i++) {
        var source = this.nodes.get(i);
        if (source.getId() == sourceId) {
            return source;
        }
    }
    return null;
};


/**
 * Return the database pkey of the nework model
 *
 * @type String
 **/
draw2d.VirtualNetworkCloudModel.prototype.getDbId = function () {
    return this.dbid;
};

/**
 * Return the internal model id of the network model
 *
 * @type String
 **/
draw2d.VirtualNetworkCloudModel.prototype.getId = function () {
    return this.id;
};

/**
 * Return the name of the converter model
 *
 * @param {String}
    **/
draw2d.VirtualNetworkCloudModel.prototype.setId = function (/*:String*/ id) {
    this.id = id;
};

/**
 * Return the root  element of the model.
 *
 * @type draw2d.VirtualNetworkCloudModel
 **/
draw2d.VirtualNetworkCloudModel.prototype.getNetworkCloudModel = function () {
    return this;
};

/**
 * Return all attribute wich are relevant for the XML serialisation
 *
 **/
draw2d.VirtualNetworkCloudModel.prototype.getPersistentAttributes = function () {
    var memento = draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);

    // enrich the base attributes with the class/instance specific properties
    memento.attributes.id = this.id;
    memento.attributes.xmlns = this.xmlns;
    memento.attributes["xmlns:xsi"] = this["xmlns:xsi"];
    memento.attributes["xsi:schemaLocation"] = this["xsi:schemaLocation"];

    if (this.dbid.length > 0) {
        memento.dbid = this.dbid;
    }
    memento.name = this.name;
    memento.pnevents = this.getPNEventModels().asArray();
    memento.places = this.getPNPlaceModels().asArray();
    memento.pnmessages = this.getPNMessageModels().asArray();
    memento.transitions = this.getTransitionModels().asArray();
    memento.arcs = this.getArcModels().asArray();

    return memento;
};
