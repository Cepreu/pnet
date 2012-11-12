/**
 * Created with JetBrains WebStorm.
 * User: skrupnov
 * Date: 8/16/12
 * Time: 12:34 PM
 * To change this template use File | Settings | File Templates.
 */

draw2d.PNMessagePalettePart = function (/*:draw2d.VirtualNetworkCloudModel*/ networkModel) {
    draw2d.AbstractPalettePart.call(this);
    this.networkModel = networkModel;
};

draw2d.PNMessagePalettePart.prototype = new draw2d.AbstractPalettePart();
/** @private **/
draw2d.PNMessagePalettePart.prototype.type = "draw2d.PNMessagePalettePart";


/**
 * @private
 **/
draw2d.PNMessagePalettePart.prototype.createHTMLElement = function () {
    var item = draw2d.AbstractPalettePart.prototype.createHTMLElement.call(this);
    item.className = "palette_part_pnmessage";
    item.innerHTML = draw2d.I18N.PALETTE_OBJECT_PNMESSAGE_LABEL;
    item.title = draw2d.I18N.PALETTE_OBJECT_PNMESSAGE_TOOLTIP;
    return item;
};


/**
 *
 **/
draw2d.PNMessagePalettePart.prototype.execute = function (/*:int*/ x, /*:int*/ y) {
    editor.getGraphicalViewer().getCommandStack().execute(new draw2d.CommandAddPNMessage(this.networkModel, x - 10, y - 10));
};
