/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.CommandMinimizeCloudNode = function (/*:GraphicalViewer*/ view, /*:Function*/ func) {
    draw2d.Command.call(this, "Minimize Element");
    this.func = func;
    this.view = view;
    this.objToSelect = this.view.getCurrentSelection();
};


draw2d.CommandMinimizeCloudNode.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandMinimizeCloudNode.prototype.type = "draw2d.CommandMinimizeCloudNode";


/**
 * Returns [true] if the command can be execute and the execution of the
 * command modify the model. <br>
 * the execution of the Command doesn't modify the model.
 *
 * @type boolean
 **/
draw2d.CommandMinimizeCloudNode.prototype.canExecute = function () {
    return true;
};

/**
 * Execute the command the first time
 *
 **/
draw2d.CommandMinimizeCloudNode.prototype.execute = function () {
    this.func();
};

/**
 * Undo the command
 *
 **/
draw2d.CommandMinimizeCloudNode.prototype.undo = function () {
    this.func();
    this.view.setCurrentSelection(this.objToSelect);
};

/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandMinimizeCloudNode.prototype.redo = function () {
    this.func();
    this.view.setCurrentSelection(this.objToSelect);
};
