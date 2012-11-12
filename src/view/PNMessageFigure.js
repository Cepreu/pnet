/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PNMessageFigure = function () {
    draw2d.AbstractCloudNodeFigure.call(this);
};

/** @private **/
draw2d.PNMessageFigure.prototype = new draw2d.AbstractCloudNodeFigure();
/** @private **/
draw2d.PNMessageFigure.prototype.type = "draw2d.PNMessageFigure";

draw2d.PNMessageFigure.prototype.paint = function () {
    draw2d.AbstractCloudNodeFigure.prototype.paint.call(this);
    try {
        var model = this.getModel();
        this.header.innerHTML = model.getName();
        this.service.innerHTML = model.getService();
        this.msgtype.innerHTML = model.getMsgType();
        this.setDimension(this.getWidth(), this.getHeight());
        this.getHTMLElement().className = "pnmessage_frame rotate_" + model.getAngle();
    }
    catch (e) {
        pushErrorStack(e, "draw2d.PNMessageFigure.prototype.paint=function()");
    }
};

/**
 * Create the HTML Element for the visual representation.
 *
 * @private
 **/
draw2d.PNMessageFigure.prototype.createHTMLElement = function () {
    var item = draw2d.AbstractCloudNodeFigure.prototype.createHTMLElement.call(this);
    item.className = "pnmessage_frame";
    item.style.border = "";
    this.header.className = "pnmessage_header";

    // Service
    //
    var r = this.table.insertRow(this.table.rows.length);
    this.serviceLabel = r.insertCell(0);
    this.serviceLabel.innerHTML = draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_PNMESSAGE_SERVICE;
    this.serviceLabel.className = "pnmessage_label";
    this.disableTextSelection(this.serviceLabel);

    this.service = r.insertCell(1);
    this.service.className = "pnmessage_data";
    this.disableTextSelection(this.service);

    // PNMessage's Type
    //
    r = this.table.insertRow(this.table.rows.length);
    this.msgtypeLabel = r.insertCell(0);
    this.msgtypeLabel.innerHTML = draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_PNMESSAGE_MSGTYPE;
    this.msgtypeLabel.className = "pnmessage_label";
    this.disableTextSelection(this.msgtypeLabel);

    this.msgtype = r.insertCell(1);
    this.msgtype.className = "pnmessage_data";
    this.disableTextSelection(this.msgtype);

    this.setDimension(this.getWidth(), this.getHeight());

    return item;
};


/**
 *
 * @private
 **/
draw2d.PNMessageFigure.prototype.initPorts = function () {
    try {
        if (this.inputPort !== null) {
            return;
        }

        this.inputPort = new draw2d.OutArcInputPort();
        this.inputPort.setWorkflow(this.workflow);
        this.inputPort.setCanDrag(this.getCanDrag());
        this.addPort(this.inputPort, 0, 0);
        this.inputPort.paint();


        this.setDimension(this.getWidth(), this.getHeight());
    }
    catch (e) {
        pushErrorStack(e, "draw2d.PNMessageFigure.prototype.initPorts=function()");
    }
};


/**
 * Set the new width and height of the figure.
 *
 * @see #getMinWidth
 * @see #getMinHeight
 * @param {int} w The new width of the figure
 * @param {int} h The new height of the figure
 **/
draw2d.PNMessageFigure.prototype.setDimension = function (/*:int*/ w, /*:int*/ h) {
    draw2d.AbstractCloudNodeFigure.prototype.setDimension.call(this, w, h);
    if (this.inputPort === null)
        return;
    var model = this.getModel();
    var angle = 0;
    if (model) {
        this.setMinimized(model.isMinimized());
        angle = model.getAngle();
    }
    switch (angle) {
        case 90:
            this.inputPort.setPosition(w / 2, h + 5);
            break;
        case 180:
            this.inputPort.setPosition(w + 5, h / 2);
            break;
        case 270:
            this.inputPort.setPosition(w / 2, -5);
            break;
        default:
            this.inputPort.setPosition(-5, h / 2);
    }
};

draw2d.PNMessageFigure.prototype.rotate = function (/*int*/incr) {
    draw2d.AbstractCloudNodeFigure.prototype.rotate.call(this, incr);
    this.paint();
};