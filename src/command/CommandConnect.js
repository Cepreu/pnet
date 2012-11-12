/**
 * @version 0.0.1
 * @constructor
 **/
draw2d.CommandConnect = function (/*:draw2d.TransitionModel*/ source, /*:draw2d.PNPLaceModel*/target) {
    draw2d.Command.call(this, "Connect Transition");
    this.source = source;
    this.target = target;
    this.model = null;
    if (this.source === null || this.target === null) {
        throw "Source and target must be set to create a new  draw2d.CommandConnectNodes object";
    }
};

draw2d.CommandConnect.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandConnect.prototype.type = "draw2d.CommandConnect";

/**
 * Init the Command with my own implementation of a connection
 *
 **/
draw2d.CommandConnect.prototype.setConnection = function (/*:draw2d.Connection*/ connection) {
    this.connection = connection;
};

/**
 * Execute the command the first time
 *
 **/
draw2d.CommandConnect.prototype.execute = function () {
    this.redo();
};

/**
 * Redo the command after the user has undo this command.
 *
 **/
draw2d.CommandConnect.prototype.redo = function () {
    if (this.model === null) {
        this.model = new draw2d.ArcModel(this.source.getId(), this.target.getId());
    }

    this.source.addConnectionModel(this.model);
};

/**
 * Undo the command.
 *
 **/
draw2d.CommandConnect.prototype.undo = function () {
    this.source.removeConnectionModel(this.model);
};
