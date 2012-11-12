/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.TransitionModel = function (/*:String*/ id) {
    draw2d.AbstractCloudNodeModel.call(this, id);

    // set some default values. This will be overwritten during de-serialization
    this.dbid = "";
    this.name = draw2d.Configuration.DEFAULT_TRANSITION_NAME;
    this.weight = draw2d.Configuration.DEFAULT_TRANSITION_WEIGHT;
    this.rate = draw2d.Configuration.DEFAULT_TRANSITION_RATE;
    this.timing = draw2d.Configuration.DEFAULT_TRANSITION_TIMING;
    this.priority = draw2d.Configuration.DEFAULT_TRANSITION_PRIORITY;

    this.representation = new draw2d.RepresentationModel(42, 42, 0);
};

draw2d.TransitionModel.prototype = new draw2d.AbstractCloudNodeModel();
/** @private **/
draw2d.TransitionModel.prototype.type = "draw2d.TransitionModel";
draw2d.TransitionModel.prototype.tag = "transition";

draw2d.TransitionModel.TIMING = new draw2d.ArrayList();
draw2d.TransitionModel.TIMING.add("Timed");
draw2d.TransitionModel.TIMING.add("Immediate");

draw2d.TransitionModel.prototype.createReferenceModel = function () {
    return new draw2d.TransitionReferenceModel(this.id);
};

/**
 * Set the position attribute of the model. This will enforce a redraw of the corresponding
 * figure (if existing).
 *
 * @param {int} xPos The x coordinate for the model
 * @param {int} yPos The y coordinate for the model
 **/
draw2d.TransitionModel.prototype.setPosition = function (/*:int*/ xPos, /*:int*/ yPos) {
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
draw2d.TransitionModel.prototype.getPosition = function () {
    return new draw2d.Point(parseInt(this.representation.x, 10), parseInt(this.representation.y, 10));
};


/**
 * Set the angle attribute of the model. This will enforce a redraw of the corresponding
 * figure (if existing).
 *
 * @param {int} angle The angle value (degrees) for the model
 **/
draw2d.TransitionModel.prototype.setAngle = function (/*:int*/ angle) {
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
draw2d.TransitionModel.prototype.getAngle = function () {
    return parseInt(this.representation.angle, 10);
};

draw2d.TransitionModel.prototype.toggleMinMax = function () {
    var save = this.representation;
    this.representation = new draw2d.RepresentationModel(save.x, save.y, save.angle, !save.minimized);

    this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_MINIMIZED_CHANGED, save, this.representation);
};

/**
 * Return flag: minimized or not?
 *
 * @type boolean
 **/
draw2d.TransitionModel.prototype.isMinimized = function () {
    return this.representation.minimized;
};


/**
 * Set the name of the Transition.
 *
 * @param {String} name The new name of the transition
 **/
draw2d.TransitionModel.prototype.setName = function (/*:String*/ name) {
    var save = this.name;
    if (save !== name) {
        this.name = name;
        this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, name);
    }
};

/**
 * Return the name of the transition.
 *
 * @type String the name of the transition.
 * @public
 **/
draw2d.TransitionModel.prototype.getName = function () {
    return this.name;
};

/**
 * Set the transition's timing
 *
 *
 * @param {String} timing of the transition
 **/
draw2d.TransitionModel.prototype.setTiming = function (/*:String*/ timing) {
    var save = this.timing;
    if (save !== timing) {
        // check for invalid timing
        if (draw2d.TransitionModel.TIMING.indexOf(timing) > -1) {
            this.timing = timing;
            this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, timing);
        }
    }
};

/**
 * Return the timing of the transition
 *
 * @type String the timing of the transition
 * @public
 **/
draw2d.TransitionModel.prototype.getTiming = function () {
    return this.timing;
};

/**
 * Set the rate
 *
 * @param {Number} rate The new rate
 **/
draw2d.TransitionModel.prototype.setRate = function (/*:Number*/ rate) {
    var save = this.rate;
    if (save !== rate) {
        this.rate = rate;
        this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, rate);
    }
};

/**
 * Return the rate
 *
 * @type Number the rate
 * @public
 **/
draw2d.TransitionModel.prototype.getRate = function () {
    return this.rate;
};

/**
 * Return the weight
 *
 * @type Number the weight
 * @public
 **/
draw2d.TransitionModel.prototype.getWeight = function () {
    return this.weight;
};

/**
 * Set the weight
 *
 * @param {Number} weight The new weight
 **/
draw2d.TransitionModel.prototype.setWeight = function (/*:Number*/ weight) {
    var save = this.weight;
    if (save !== weight) {
        this.weight = weight;
        this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, weight);
    }
};

/**
 * Return the priority
 *
 * @type Number the priority
 * @public
 **/
draw2d.TransitionModel.prototype.getPriority = function () {
    return this.priority;
};

/**
 * Set the priority
 *
 * @param {int} priority The new priority
 **/
draw2d.TransitionModel.prototype.setPriority = function (/*:Int*/ priority) {
    var save = this.priority;
    if (save !== priority) {
        this.priority = priority;
        this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED, save, priority);
    }
};

/**
 * Returns all attributes which are relevant for serialization.
 *
 * @return The list of persistent attribute.
 **/
draw2d.TransitionModel.prototype.getPersistentAttributes = function () {
    var memento = draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);

    // enrich the base attributes with the class/instance specific properties
    memento.attributes.id = this.id;
    memento.name = this.name;
    memento.timing = this.timing;
    memento.rate = this.rate;
    memento.weight = this.weight;
    memento.priority = this.priority;
    memento.representation = this.representation;
    return memento;
};
