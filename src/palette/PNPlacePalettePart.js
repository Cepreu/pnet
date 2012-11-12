/**
 * Base class for elements which can be inserted into an external
 * tool palette.<br>
 * Objects of this class can be drag&drop around the hole web page. An event will
 * be fired if the element has been dropped into the canvas.<br>
 * Inherited classes should override the execute event method to implement
 * special behaviour.
 *
 * @version 0.0.1
 * @author Sergel K.
 * @constructor
 **/
draw2d.PNPlacePalettePart = function (/*:draw2d.VirtualNetworkCloudModel*/ networkModel) {
    draw2d.AbstractPalettePart.call(this);
    this.networkModel = networkModel;
};

draw2d.PNPlacePalettePart.prototype = new draw2d.AbstractPalettePart();
/** @private **/
draw2d.PNPlacePalettePart.prototype.type = "draw2d.PNPlacePalettePart";


/**
 * @private
 **/
draw2d.PNPlacePalettePart.prototype.createHTMLElement = function () {
    var item = draw2d.AbstractPalettePart.prototype.createHTMLElement.call(this);
    item.className = "palette_part_pnplace";
    item.innerHTML = draw2d.I18N.PALETTE_OBJECT_PNPLACE_LABEL;
    item.title = draw2d.I18N.PALETTE_OBJECT_PNPLACE_TOOLTIP;
    return item;
};


/**
 *
 **/
draw2d.PNPlacePalettePart.prototype.execute = function (/*:int*/ x, /*:int*/ y) {
    editor.getGraphicalViewer().getCommandStack().execute(new draw2d.CommandAddPNPlace(this.networkModel, x - 10, y - 10));
};
