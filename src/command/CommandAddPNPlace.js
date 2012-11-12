/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.CommandAddPNPlace = function (/*:draw2d.VirtualNetworkCloudModel*/ network, /*:int*/ x, /*:int*/ y, /*:int*/ angle) {
    draw2d.Command.call(this, "Add Place");
    this.model = new draw2d.PNPlaceModel();

    this.network = network;
    this.x = x;
    this.y = y;
    this.angle = angle;
};

draw2d.CommandAddPNPlace.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandAddPNPlace.prototype.type = "draw2d.CommandAddPNPlace";


/**
 * Returns [true] if the command can be execute and the execution of the
 * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
 * return false. <br>
 * the execution of the Command doesn't modify the model.
 *
 * @type boolean
 **/
draw2d.CommandAddPNPlace.prototype.canExecute = function () {
    return true;
};

/**
 * Execute the command the first time
 *
 **/
draw2d.CommandAddPNPlace.prototype.execute = function () {
    this.redo();
};

/**
 * Undo the command
 *
 **/
draw2d.CommandAddPNPlace.prototype.undo = function () {
    this.network.removeCloudNodeModel(this.model);
};

/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandAddPNPlace.prototype.redo = function () {
    this.network.addCloudNodeModel(this.model);
    this.model.setPosition(this.x, this.y);
};
