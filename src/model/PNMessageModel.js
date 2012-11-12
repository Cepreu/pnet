/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/


draw2d.PNMessageModel = function (/*:String*/ id) {
    draw2d.AbstractCloudNodeModel.call(this, id);
    // set some default values. Will be overwritten during de-serialization
    this.dbid = "";
    this.name = draw2d.Configuration.DEFAULT_PNMESSAGE_NAME;
    this.service = draw2d.Configuration.DEFAULT_PNMESSAGE_SERVICE;
    this.msgtype = draw2d.Configuration.DEFAULT_PNMESSAGE_TYPE;

    this.representation = new draw2d.RepresentationModel(42, 42, 0);
//   this.nics = new draw2d.NicsModel();
};

draw2d.PNMessageModel.prototype = new draw2d.AbstractCloudNodeModel();
/** @private **/
draw2d.PNMessageModel.prototype.type = "draw2d.PNMessageModel";
draw2d.PNMessageModel.prototype.tag = "pnmessage";

draw2d.PNMessageModel.MSGTYPE = new draw2d.ArrayList();
draw2d.PNMessageModel.MSGTYPE.add("Ping");
draw2d.PNMessageModel.MSGTYPE.add("GetAgent");
draw2d.PNMessageModel.MSGTYPE.add("GetUserInfo");
draw2d.PNMessageModel.MSGTYPE.add("PlayPrompt");
draw2d.PNMessageModel.MSGTYPE.add("Hangup");
draw2d.PNMessageModel.MSGTYPE.add("Connect");

draw2d.PNMessageModel.SERVICE = new draw2d.ArrayList();
draw2d.PNMessageModel.SERVICE.add("ACD");
draw2d.PNMessageModel.SERVICE.add("IVR");
draw2d.PNMessageModel.SERVICE.add("Agent");
draw2d.PNMessageModel.SERVICE.add("Authorization");
draw2d.PNMessageModel.SERVICE.add("Telephony");
draw2d.PNMessageModel.SERVICE.add("Contact");

draw2d.PNMessageModel.prototype.createReferenceModel = function () {
    return new draw2d.PNMessageReferenceModel(this.id);
};


/**
 * Set the position attribute of the model. This will enforce a redraw of the corresponding
 * figure (if existing).
 *
 * @param {int} xPos The x coordinate for the model
 * @param {int} yPos The y coordinate for the model
 **/
draw2d.PNMessageModel.prototype.setPosition = function (/*:int*/ xPos, /*:int*/ yPos) {
    // Don't move Elements outside the left or top canvas border
    xPos = Math.max(0, xPos);
    yPos = Math.max(0, yPos);

    var save = this.representation;
    if (save.x === xPos && save.y === yPos) {
        return;
    }

    this.representation = new draw2d.RepresentationModel(xPos, yPos, save.angle, save.minimized);

    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_POSITION_CHANGED, save, this.representation);
};

/**
 * Return the x/y position of the table in the database graphical layout.
 *
 * @type draw2d.Point
 **/
draw2d.PNMessageModel.prototype.getPosition = function () {
    return new draw2d.Point(parseInt(this.representation.x, 10), parseInt(this.representation.y, 10));
};

/**
 * Set the angle attribute of the model. This will enforce a redraw of the corresponding
 * figure (if existing).
 *
 * @param {int} angle The angle value (degrees) for the model
 **/
draw2d.PNMessageModel.prototype.setAngle = function (/*:int*/ angle) {
    var save = this.representation;
    if (save.angle !== angle) {
        this.representation = new draw2d.RepresentationModel(save.x, save.y, angle, save.minimized);
        this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_ANGLE_CHANGED, save, this.representation);
    }
};

/**
 * Return the angle.
 *
 * @type int
 **/
draw2d.PNMessageModel.prototype.getAngle = function () {
    return parseInt(this.representation.angle, 10);
};

draw2d.PNMessageModel.prototype.toggleMinMax = function () {
    var save = this.representation;
    this.representation = new draw2d.RepresentationModel(save.x, save.y, save.angle, !save.minimized);

    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_MINIMIZED_CHANGED, save, this.representation);
};

/**
 * Return flag: minimized or not?
 *
 * @type int
 **/
draw2d.PNMessageModel.prototype.isMinimized = function () {
    return this.representation.minimized;
};


/**
 * Set the name of the message.
 *
 * @param {String} name The new name of the message.
 **/
draw2d.PNMessageModel.prototype.setName = function (/*:String*/ name) {
    var save = this["name"];
    if (save === name) {
        return;
    }

    this["name"] = name;

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, name);
};

/**
 * Return the name of the message.
 *
 * @type String the name of the message.
 * @public
 **/
draw2d.PNMessageModel.prototype.getName = function () {
    return this["name"];
};


/**
 * Return the Nic container model object.
 *
 * @type NicsModel the container object.
 * @public
 **/
//draw2d.PNMessageModel.prototype.getNicsModel=function()
//{
//   return this.nics;
//};

/**
 * Set Target Service
 *
 * @param {String} service The target service for the message
 **/
draw2d.PNMessageModel.prototype.setService = function (/*:String*/ service) {
    var save = this["service"];
    if (save === service) {
        return;
    }
    this["service"] = service;

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, service);
};

/**
 * Return the target service for the message.
 *
 * @type String the name of the service.
 * @public
 **/
draw2d.PNMessageModel.prototype.getService = function () {
    return this["service"];
};

/**
 * Set the message's type
 *
 * @param {String} Message's type
 **/
draw2d.PNMessageModel.prototype.setMsgType = function (/*:String*/ msgtype) {
    var save = this.msgtype;
    if (save === msgtype) {
        return;
    }

    // check for invalid msgtype
    if (draw2d.PNMessageModel.MSGTYPE.indexOf(msgtype) === -1) {
        return;
    }

    this.msgtype = msgtype;

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, msgtype);
};

/**
 * Return the message's type
 *
 * @type String the message's type
 * @public
 **/
draw2d.PNMessageModel.prototype.getMsgType = function () {
    return this.msgtype;
};

/**
 * Returns all attributes which are relevant for serialization.
 *
 * @return The list of persistent attribute.
 **/
draw2d.PNMessageModel.prototype.getPersistentAttributes = function () {
    var memento = draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);

    // enrich the base attributes with the class/instance specific properties
    memento["name"] = this["name"];
    memento["service"] = this["service"];
    if (this.dbid.length > 0) {
        memento.dbid = this.dbid;
    }
//   memento.nics= this.nics;
    memento.representation = this.representation;

    memento.attributes.id = this.id;
    memento.attributes.msgtype = this.msgtype;

    return memento;
};
