/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.ArcPropertyPage = function () {
    draw2d.PropertyPage.call(this);

    this.html = document.createElement("div");
    this.html.style.width = "100%";
    this.html.style.height = "100%";

    this.header = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_HEADER_ARC, 0, 0);
    this.header.className = "panel_header";
    this.html.appendChild(this.header);


    var oThis = this;

    // Order of the Arc
    //
    this.orderLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_WEIGHT, 10, 45);
    this.orderLabel.style.color = "gray";
    this.html.appendChild(this.orderLabel);

    this.orderText = document.createElement("input");
    this.orderText.type = "text";
    if (editor.isReadonly()) {
        this.orderText.disabled = "true";
    }
    else {
        Event.observe(this.orderText, "keyup", function (e) {
            var order = parseInt(oThis.orderText.value, 10);
            if (isNaN(order)) {
                order = "";
            }
            oThis.orderText.value = "" + order;
            var func = oThis.currentModel.setWeight.bind(oThis.currentModel);
            var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getWeight(), oThis.orderText.value);
            editor.executeCommand(command);
        });
    }
    this.orderText.style.position = "absolute";
    this.orderText.style.width = "110px";
    this.orderText.style.top = "65px";
    this.orderText.style.left = "10px";
    this.html.appendChild(this.orderText);
};

draw2d.ArcPropertyPage.prototype = new draw2d.PropertyPage();
/** @private **/
draw2d.ArcPropertyPage.prototype.type = "draw2d.ArcPropertyPage";


/**
 *
 **/
draw2d.ArcPropertyPage.prototype.init = function (/*:draw2d.AbstractObjectModel*/ model) {
    this.currentModel = model;
    this.orderText.value = model.getWeight();
};

/**
 *
 **/
draw2d.ArcPropertyPage.prototype.deinit = function () {
};

/**
 * @abstract
 * @type HTMLElement
 * @private
 **/
draw2d.ArcPropertyPage.prototype.getHTMLElement = function () {
    return this.html;
};