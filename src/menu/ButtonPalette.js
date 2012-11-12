/**
 * The blue arrowed arc button at the left hand side of an selected object/node in the canvas area.
 *
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.ButtonPalette = function (/*:draw2d.ToolPalette*/ palette) {
    draw2d.GenericButton.call(this, palette, 16, 16);
};

draw2d.ButtonPalette.prototype = new draw2d.GenericButton();
/** @private */
draw2d.ButtonPalette.prototype.type = "draw2d.ButtonPalette";


draw2d.ButtonPalette.prototype.execute = function () {
    var currentModel = this.palette.workflow.getCurrentSelection().getModel();
//    var oldAngle = currentModel.getAngle();
//    var newAngle = (oldAngle + 90) % 360;
//    var func = currentModel.setAngle.bind(currentModel);
//    var command = new draw2d.CommandRotateCloudNode(editor.getGraphicalViewer(), func, oldAngle, newAngle);
//    editor.executeCommand(command);
    this.palette.workflow.getCurrentSelection().setColor(new draw2d.Color(100,0,0));
    var color = new draw2d.ColorDialog();
    this.palette.workflow.addFigure(color,150,150);
};
