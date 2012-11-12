/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
//draw2d.CommandRotateCloudNode=function(/*:draw2d.FunnelModel*/ model)
//{
//    draw2d.Command.call(this,"Rotate Element");
//    this.model = model;
//    this.oldAngle  = model.getAngle();
//};

draw2d.CommandRotateCloudNode = function (/*:GraphicalViewer*/ view, /*:Function*/ func, /*:Object*/ oldValue, /*:Object*/ newValue) {
    draw2d.Command.call(this, "Rotate Element");
    this.func = func;
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.view = view;
    this.objToSelect = this.view.getCurrentSelection();
};


draw2d.CommandRotateCloudNode.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandRotateCloudNode.prototype.type = "draw2d.CommandRotateCloudNode";


/**
 * Returns [true] if the command can be execute and the execution of the
 * command modify the model. A CommandMove with startAngle == endAngle should
 * return false. <br>
 * the execution of the Command doesn't modify the model.
 *
 * @type boolean
 **/
draw2d.CommandRotateCloudNode.prototype.canExecute = function () {
    // return false if we doesn't modify the model => NOP Command
    return this.newValue !== this.oldValue;
};

/**
 * Execute the command the first time
 *
 **/
draw2d.CommandRotateCloudNode.prototype.execute = function () {
    this.func(this.newValue);
};

/**
 * Undo the command
 *
 **/
draw2d.CommandRotateCloudNode.prototype.undo = function () {
    this.func(this.oldValue);
    this.view.setCurrentSelection(this.objToSelect);
};

/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandRotateCloudNode.prototype.redo = function () {
    this.func(this.newValue);
    this.view.setCurrentSelection(this.objToSelect);
};
