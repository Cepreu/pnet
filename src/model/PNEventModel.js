/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PNEventModel = function (/*:String*/ id) {
    draw2d.AbstractCloudNodeModel.call(this, id);

    // set some default values.
    this.dbid = "";
    this.name = draw2d.Configuration.DEFAULT_PNEVENT_NAME;
    this.representation = new draw2d.RepresentationModel(42, 42, 0);
};

draw2d.PNEventModel.prototype = new draw2d.AbstractCloudNodeModel();
/** @private **/
draw2d.PNEventModel.prototype.type = "draw2d.PNEventModel";
draw2d.PNEventModel.prototype.tag = "pnevent";


draw2d.PNEventModel.prototype.createReferenceModel = function () {
    return new draw2d.PNEventReferenceModel(this.id);
};

/**
 * Set the name of the event.
 *
 * @param {String} name The new name of the network.
 **/
draw2d.PNEventModel.prototype.setName = function (/*:String*/ name) {
    var save = this.name;
    if (save === name) {
        return;
    }

    this.name = name;

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, name);
};

/**
 * Return the name of the event.
 *
 * @type String the name of the network.
 * @public
 **/
draw2d.PNEventModel.prototype.getName = function () {
    return this.name;
};

/**
 * Set the position attribute of the model. This will enforce a redraw of the corresponding
 * figure (if existing).
 *
 * @param {int} xPos The x coordinate for the model
 * @param {int} yPos The y coordinate for the model
 **/
draw2d.PNEventModel.prototype.setPosition = function (/*:int*/ xPos, /*:int*/ yPos) {
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
 * Set the angle attribute of the model. This will enforce a redraw of the corresponding
 * figure (if existing).
 *
 * @param {int} angle The angle for the model
 **/
draw2d.PNEventModel.prototype.setAngle = function (/*:int*/ angle) {
    angle %= 360;

    var save = this.representation;
    if (save.angle === angle) {
        return;
    }

    this.representation = new draw2d.RepresentationModel(save.x, save.y, angle, save.minimized);

    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_ANGLE_CHANGED, save, this.representation);
};

draw2d.PNEventModel.prototype.toggleMinMax = function () {
    var save = this.representation;
    this.representation = new draw2d.RepresentationModel(save.x, save.y, save.angle, !save.minimized);

    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_MINIMIZED_CHANGED, save, this.representation);
};

/**
 * Return flag: minimized or not?
 *
 * @type int
 **/
draw2d.PNEventModel.prototype.isMinimized = function () {
    return this.representation.minimized;
};

/**
 * Return the x/y position of the table in the database graphical layout.
 *
 * @type draw2d.Point
 **/
draw2d.PNEventModel.prototype.getPosition = function () {
    return new draw2d.Point(parseInt(this.representation.x, 10), parseInt(this.representation.y, 10));
};


/**
 * Return the angle.
 *
 * @type int
 **/
draw2d.PNEventModel.prototype.getAngle = function () {
    return parseInt(this.representation.angle, 10);
};

/**
 * Returns all attributes which are relevant for serialization.
 *
 * @return The list of persistent attribute.
 **/
draw2d.PNEventModel.prototype.getPersistentAttributes = function () {
    var memento = draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);

    // enrich the base attributes with the class/instance specific properties
    memento.attributes.id = this.id;
    if (this.dbid.length > 0) {
        memento.dbid = this.dbid;
    }
    memento.name = this.name;
    memento.representation = this.representation;

    return memento;
};
