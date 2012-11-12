/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.CommandReconnect = function (/*:draw2d.ArcModel*/ con) {
    draw2d.Command.call(this, "Reconnect Transition");
    this.con = con;
    this.oldSourceModel = con.getSourceModel();
    this.oldTargetModel = con.getTargetModel();
};

draw2d.CommandReconnect.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandReconnect.prototype.type = "draw2d.CommandReconnect";

/**
 * Returns [true] if the command can be execute and the execution of the
 * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
 * return false. <br>
 * the execution of the Command doesn't modify the model.
 *
 * @type boolean
 **/
draw2d.CommandReconnect.prototype.canExecute = function () {
    // return false if we doesn't modify the model => NOP Command
    return true;
};

/**
 * called by the framework
 **/
draw2d.CommandReconnect.prototype.setNewPorts = function (/*:draw2d.Port*/ source, /*:draw2d.Port*/ target) {
    this.newSourceModel = source.getParent().getModel();
    this.newTargetModel = target.getParent().getModel();
};

/**
 * Execute the command the first time
 *
 **/
draw2d.CommandReconnect.prototype.execute = function () {
    this.redo();
};

/**
 * Execute the command the first time
 *
 **/
draw2d.CommandReconnect.prototype.cancel = function () {
    this.con.setSourceModel(this.oldSourceModel);
    this.con.setTargetModel(this.oldTargetModel);
};

/**
 * Undo the command
 *
 **/
draw2d.CommandReconnect.prototype.undo = function () {
    this.con.setSourceModel(this.oldSourceModel);
    this.con.setTargetModel(this.oldTargetModel);
};

/**
 * Redo the command after the user has undo this command
 *
 **/
draw2d.CommandReconnect.prototype.redo = function () {
    this.con.setSourceModel(this.newSourceModel);
    this.con.setTargetModel(this.newTargetModel);
};
