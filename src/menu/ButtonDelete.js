/**
 * The red cross button at the left hand side of an selected object/node in the canvas area.
 *
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.ButtonDelete = function (/*:draw2d.ToolPalette*/ palette) {
    draw2d.GenericButton.call(this, palette, 16, 16);
};

draw2d.ButtonDelete.prototype = new draw2d.GenericButton();
/** @private */
draw2d.ButtonDelete.prototype.type = "draw2d.ButtonDelete";


draw2d.ButtonDelete.prototype.execute = function () {
    this.palette.workflow.getCommandStack().execute(new draw2d.CommandRemoveCloudNode(this.palette.workflow.getCurrentSelection().getModel()));
    draw2d.ToolGeneric.prototype.execute.call(this);
};
