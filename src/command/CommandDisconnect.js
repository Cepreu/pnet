/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.CommandDisconnect = function (/*:draw2d.ArcModel*/ connection) {
    draw2d.Command.call(this, "Disconnect Transition");

    this.connection = connection;
    this.source = this.connection.getModelParent();
};

draw2d.CommandDisconnect.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandDisconnect.prototype.type = "draw2d.CommandDisconnect";


/**
 * Execute the command the first time
 *
 **/
draw2d.CommandDisconnect.prototype.execute = function () {
    this.redo();
};

/**
 * Redo the command after the user has undo this command.
 *
 **/
draw2d.CommandDisconnect.prototype.redo = function () {
    this.source.removeConnectionModel(this.connection);
};

/**
 * Undo the command.
 *
 **/
draw2d.CommandDisconnect.prototype.undo = function () {
    this.source.addConnectionModel(this.connection);
};
