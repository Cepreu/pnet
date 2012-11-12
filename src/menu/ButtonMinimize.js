/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.ButtonMinimize = function (/*:draw2d.ToolPalette*/ palette) {
    draw2d.GenericButton.call(this, palette, 16, 16);
};

draw2d.ButtonMinimize.prototype = new draw2d.GenericButton();
/** @private */
draw2d.ButtonMinimize.prototype.type = "draw2d.ButtonMinimize";


draw2d.ButtonMinimize.prototype.execute = function () {
    var currentModel = this.palette.workflow.getCurrentSelection().getModel();
    var func = currentModel.toggleMinMax.bind(currentModel);
    var command = new draw2d.CommandMinimizeCloudNode(editor.getGraphicalViewer(), func);
    editor.executeCommand(command);
};
