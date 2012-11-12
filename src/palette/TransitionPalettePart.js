/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.TransitionPalettePart = function (/*:draw2d.VirtualNetworkCloudModel*/ networkModel) {
    draw2d.AbstractPalettePart.call(this);
    this.networkModel = networkModel;
};

/** @private **/
draw2d.TransitionPalettePart.prototype.type = "draw2d.TransitionPalettePart";
draw2d.TransitionPalettePart.prototype = new draw2d.AbstractPalettePart();


/**
 * @private
 **/
draw2d.TransitionPalettePart.prototype.createHTMLElement = function () {
    var item = draw2d.AbstractPalettePart.prototype.createHTMLElement.call(this);
    item.className = "palette_part_transition";
    item.innerHTML = draw2d.I18N.PALETTE_OBJECT_TRANSITION_LABEL;
    item.title = draw2d.I18N.PALETTE_OBJECT_TRANSITION_TOOLTIP;
    return item;
};


/**
 *
 **/
draw2d.TransitionPalettePart.prototype.execute = function (/*:int*/ x, /*:int*/ y) {
    editor.getGraphicalViewer().getCommandStack().execute(new draw2d.CommandAddTransition(this.networkModel, x - 10, y - 10));
};
