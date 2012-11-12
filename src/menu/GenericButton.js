/**
 * Base class for all FlowMenu buttons.
 *
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.GenericButton = function (/*:draw2d.PaletteWindow*/ palette) {
    draw2d.Button.call(this, palette, 16, 16);
};

draw2d.GenericButton.prototype = new draw2d.Button();
/** @private */
draw2d.GenericButton.prototype.type = "draw2d.GenericButton";


/**
 * @final
 */
draw2d.GenericButton.prototype.getImageUrl = function () {
    if (this.enabled) {
        return draw2d.Configuration.IMAGEPATH + this.type + ".png";
    }
    else {
        return draw2d.Configuration.IMAGEPATH + this.type + "_disabled.png";
    }
};
