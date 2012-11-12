/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PNEventPalettePart = function (/*:draw2d.VirtualNetworkCloudModel*/ networkModel) {
    draw2d.AbstractPalettePart.call(this);
    this.networkModel = networkModel;
};

/** @private **/
draw2d.PNEventPalettePart.prototype = new draw2d.AbstractPalettePart();
/** @private **/
draw2d.PNEventPalettePart.prototype.type = "draw2d.PNEventPalettePart";


/**
 * @private
 **/
draw2d.PNEventPalettePart.prototype.createHTMLElement = function () {
    var item = draw2d.AbstractPalettePart.prototype.createHTMLElement.call(this);

    item.className = "palette_part_pnevent";
    item.innerHTML = draw2d.I18N.PALETTE_OBJECT_PNEVENT_LABEL;
    item.title = draw2d.I18N.PALETTE_OBJECT_PNEVENT_TOOLTIP;

    return item;
};


/**
 *
 **/
draw2d.PNEventPalettePart.prototype.execute = function (/*:int*/ x, /*:int*/ y) {
    editor.getGraphicalViewer().getCommandStack().execute(new draw2d.CommandAddPNEvent(this.networkModel, x - 10, y - 10, 0));
};
