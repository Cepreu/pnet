/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PNPlaceFigure = function () {
    draw2d.AbstractCloudNodeFigure.call(this);
};

/** @private **/
draw2d.PNPlaceFigure.prototype = new draw2d.AbstractCloudNodeFigure();
/** @private **/
draw2d.PNPlaceFigure.prototype.type = "draw2d.PNPlaceFigure";

draw2d.PNPlaceFigure.prototype.paint = function () {
    draw2d.AbstractCloudNodeFigure.prototype.paint.call(this);
    try {
        var model = this.getModel();
        this.header.innerHTML = model.getName();
        this.tokens.innerHTML = this.getModel().getTokens();
        this.capacity.innerHTML = this.getModel().getCapacity();
        this.setDimension(this.getWidth(), this.getHeight());
    }
    catch (e) {
        pushErrorStack(e, "draw2d.PNPlaceFigure.prototype.paint=function()");
    }
};

/**
 * Create the HTML Element for the visual representation.
 *
 * @private
 **/
draw2d.PNPlaceFigure.prototype.createHTMLElement = function () {
    var item = draw2d.AbstractCloudNodeFigure.prototype.createHTMLElement.call(this);
    item.className = "pnplace_frame";
    item.style.border = "";
    this.header.className = "pnplace_header";

    // Tokens
    //
    var x = this.table.insertRow(this.table.rows.length);
    this.tokensLabel = x.insertCell(0);
    this.tokensLabel.innerHTML = draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_PLACE_TOKENS;
    this.tokensLabel.className = "pnplace_label";
    this.disableTextSelection(this.tokensLabel);

    this.tokens = x.insertCell(1);
    this.tokens.className = "pnplace_data";
    this.disableTextSelection(this.tokens);

    // Capacity
    x = this.table.insertRow(this.table.rows.length);
    this.capacityLabel = x.insertCell(0);
    this.capacityLabel.innerHTML = draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_PLACE_CAPACITY;
    this.capacityLabel.className = "pnplace_label";
    this.disableTextSelection(this.capacityLabel);

    this.capacity = x.insertCell(1);
    this.capacity.className = "pnplace_data";
    this.disableTextSelection(this.capacity);

    this.setDimension(this.getWidth(), this.getHeight());

    return item;
};


/**
 *
 * @private
 **/
draw2d.PNPlaceFigure.prototype.initPorts = function () {
    try {
        if (this.inputPort !== null) {
            return;
        }

        this.inputPort = new draw2d.OutArcInputPort();
        this.inputPort.setWorkflow(this.workflow);
        this.inputPort.setCanDrag(this.getCanDrag());
        this.addPort(this.inputPort, 0, 0);
        this.inputPort.paint();

        this.outputPort = new draw2d.InArcOutputPort();
        this.outputPort.setWorkflow(this.workflow);
        this.outputPort.setCanDrag(this.getCanDrag());
        this.addPort(this.outputPort, 0, 0);
        this.outputPort.paint();

        this.setDimension(this.getWidth(), this.getHeight());
    }
    catch (e) {
        pushErrorStack(e, "draw2d.PNPlaceFigure.prototype.initPorts=function()");
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
draw2d.PNPlaceFigure.prototype.setDimension = function (/*:int*/ w, /*:int*/ h) {
    draw2d.AbstractCloudNodeFigure.prototype.setDimension.call(this, w, h);

    if (this.outputPort === null || this.inputPort === null)
        return;

    var model = this.getModel();
    var angle = 0;
    if (model) {
        this.setMinimized(model.isMinimized());
        angle = model.getAngle();
    }
    switch (angle) {
        case 90:
            this.inputPort.setPosition(-5, h / 2);
            this.outputPort.setPosition(w + 5, h / 2);
            break;
        case 180:
            this.inputPort.setPosition(w / 2, h + 5);
            this.outputPort.setPosition(w / 2, -5);
            break;
        case 270:
            this.inputPort.setPosition(w + 5, h / 2);
            this.outputPort.setPosition(-5, h / 2);
            break;
        default:
            this.inputPort.setPosition(w / 2, -5);
            this.outputPort.setPosition(w / 2, h + 5);
    }
};
