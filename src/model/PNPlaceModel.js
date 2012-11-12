/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PNPlaceModel = function (/*:String*/ id) {
    draw2d.AbstractCloudNodeModel.call(this, id);
    // set some default values. Will be overwritten during de-serialization
    this.dbid = "";
    this.name = draw2d.Configuration.DEFAULT_PLACE_NAME;
    this.tokens = draw2d.Configuration.DEFAULT_PLACE_TOKENS;
    this.capacity = draw2d.Configuration.DEFAULT_PLACE_CAPACITY;
    this.place_type = draw2d.Configuration.DEFAULT_PLACE_TYPE;

    this.representation = new draw2d.RepresentationModel(42, 42, 0);
//   this.images = new draw2d.ImagesModel();
//   this.nics = new draw2d.P2TsModel();
};

draw2d.PNPlaceModel.prototype = new draw2d.AbstractCloudNodeModel();
/** @private **/
draw2d.PNPlaceModel.prototype.place_type = "draw2d.PNPlaceModel";
draw2d.PNPlaceModel.prototype.tag = "place";

draw2d.PNPlaceModel.PLACE_TYPE = new draw2d.ArrayList();
draw2d.PNPlaceModel.PLACE_TYPE.add("normal");
draw2d.PNPlaceModel.PLACE_TYPE.add("initial");
draw2d.PNPlaceModel.PLACE_TYPE.add("terminating");


draw2d.PNPlaceModel.prototype.createReferenceModel = function () {
    return new draw2d.PNPlaceReferenceModel(this.id);
};

/**
 * Set the position attribute of the model. This will enforce a redraw of the corresponding
 * figure (if existing).
 *
 * @param {int} xPos The x coordinate for the model
 * @param {int} yPos The y coordinate for the model
 * @param {int} angle The angle for the model
 **/
draw2d.PNPlaceModel.prototype.setPosition = function (/*:int*/ xPos, /*:int*/ yPos) {
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
draw2d.PNPlaceModel.prototype.getPosition = function () {
    return new draw2d.Point(parseInt(this.representation.x, 10), parseInt(this.representation.y, 10));
};

/**
 * Set the angle attribute of the model. This will enforce a redraw of the corresponding
 * figure (if existing).
 *
 * @param {int} angle The angle value (degrees) for the model
 **/
draw2d.PNPlaceModel.prototype.setAngle = function (/*:int*/ angle) {
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
draw2d.PNPlaceModel.prototype.getAngle = function () {
    return parseInt(this.representation.angle, 10);
};

draw2d.PNPlaceModel.prototype.toggleMinMax = function () {
    var save = this.representation;
    this.representation = new draw2d.RepresentationModel(save.x, save.y, save.angle, !save.minimized);

    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_MINIMIZED_CHANGED, save, this.representation);
};

/**
 * Return flag: minimized or not?
 *
 * @type int
 **/
draw2d.PNPlaceModel.prototype.isMinimized = function () {
    return this.representation.minimized;
};


/**
 * Set the name of the Place node.
 *
 * @param {String} name The new name of the place.
 **/
draw2d.PNPlaceModel.prototype.setName = function (/*:String*/ name) {
    var save = this.name;
    if (save !== name) {
        this.name = name;
        this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, name);
    }
};

/**
 * Return the name of the place.
 *
 * @type String the name of the place.
 * @public
 **/
draw2d.PNPlaceModel.prototype.getName = function () {
    return this.name;
};


/**
 * Return the Nic container model object.
 *
 * @type NicsModel the container object.
 * @public
 **/
//draw2d.PNPlaceModel.prototype.getP2TsModel=function()
//{
//   return this.nics;
//};

/**
 * Set initial number of tokens in the place
 *
 * @param {String} tokens The initial number of tokens in the place
 **/
draw2d.PNPlaceModel.prototype.setTokens = function (/*:String*/ tokens) {
    var save = this.tokens;
    if (save === tokens) {
        return;
    }
    this.tokens = tokens;

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, tokens);
};

/**
 * Return the initial number of tokens in the place
 *
 * @type String the name of the place.
 * @public
 **/
draw2d.PNPlaceModel.prototype.getTokens = function () {
    return this.tokens;
};


/**
 * Set the place's capacity.
 *
 * @param {Int} capacity The place capacity.
 **/
draw2d.PNPlaceModel.prototype.setCapacity = function (/*:Int*/ capacity) {
    capacity = "" + parseInt(capacity, 10);

    var save = this.capacity;
    if (save === capacity) {
        return;
    }
    this.capacity = capacity;

    // inform all listener, mainly the visual representation, about the changes.
    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, capacity);
};

/**
 * Return the Capacity of the place.
 *
 * @type String the capacity of the place.
 * @public
 **/
draw2d.PNPlaceModel.prototype.getCapacity = function () {
    return this.capacity;
};

/**
 * Set the place's type
 *
 * @param {String} type of the place
 **/
draw2d.PNPlaceModel.prototype.setType = function (/*:String*/ place_type) {
    var save = this.place_type;
    if (save !== place_type) {
        // check for invalid type
        if (draw2d.TransitionModel.TYPE.indexOf(place_type) > -1) {
            this.place_type = place_type;
            this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, place_type);
        }
    }
};

/**
 * Return the type of the place
 *
 * @type String the type of the place
 * @public
 **/
draw2d.PNPlaceModel.prototype.getType = function () {
    return this.place_type;
};

/**
 * Returns all attributes which are relevant for serialization.
 *
 * @return The list of persistent attribute.
 **/
draw2d.PNPlaceModel.prototype.getPersistentAttributes = function () {
    var memento = draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);

    // enrich the base attributes with the class/instance specific properties
    memento["name"] = this.name;
    memento["tokens"] = this.tokens;
    memento["capacity"] = this.capacity;
    if (this.dbid.length > 0) {
        memento.dbid = this.dbid;
    }
    memento.representation = this.representation;

    memento.attributes.id = this.id;
    memento.attributes.place_type = this.place_type;

    return memento;
};
