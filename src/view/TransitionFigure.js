/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.TransitionFigure = function () {
    draw2d.AbstractCloudNodeFigure.call(this);
};

draw2d.TransitionFigure.prototype = new draw2d.AbstractCloudNodeFigure();
draw2d.TransitionFigure.prototype.type = "draw2d.TransitionFigure";

draw2d.TransitionFigure.prototype.paint = function () {
    draw2d.AbstractCloudNodeFigure.prototype.paint.call(this);
    try {
        var model = this.getModel();
        this.header.innerHTML = model.getName();
        this.timing.innerHTML = this.getModel().getTiming();
        this.weight.innerHTML = this.getModel().getWeight();
        this.rate.innerHTML = this.getModel().getRate();
        this.priority.innerHTML = this.getModel().getPriority();
        var st = window.getComputedStyle(this.table, '');
        this.setDimension(parseInt(st.getPropertyValue("width"), 10), parseInt(st.getPropertyValue("height"), 10));
    }
    catch (e) {
        pushErrorStack(e, "draw2d.TransitionFigure.prototype.paint=function()");
    }
};

/**
 * Create the HTML Element for the visual representation.
 *
 * @private
 **/
draw2d.TransitionFigure.prototype.createHTMLElement = function () {
    var item = draw2d.AbstractCloudNodeFigure.prototype.createHTMLElement.call(this);
    item.className = "transition_frame";
    this.header.className = "transition_header";
    item.style.border = "";

    // Rate
    var x = this.table.insertRow(this.table.rows.length);
    this.rateLabel = x.insertCell(0);
    this.rateLabel.innerHTML = draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_TRANSITION_RATE;
    this.rateLabel.className = "transition_label";
    this.disableTextSelection(this.rateLabel);
    this.rate = x.insertCell(1);
    this.rate.className = "transition_data";
    this.disableTextSelection(this.rate);

    // Weight
    x = this.table.insertRow(this.table.rows.length);
    this.weightLabel = x.insertCell(0);
    this.weightLabel.innerHTML = draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_TRANSITION_WEIGHT;
    this.weightLabel.className = "transition_label";
    this.disableTextSelection(this.weightLabel);
    this.weight = x.insertCell(1);
    this.weight.className = "transition_data";
    this.disableTextSelection(this.weight);

    // Priority
    x = this.table.insertRow(this.table.rows.length);
    this.priorityLabel = x.insertCell(0);
    this.priorityLabel.innerHTML = draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_TRANSITION_PRIORITY;
    this.priorityLabel.className = "transition_label";
    this.disableTextSelection(this.priorityLabel);
    this.priority = x.insertCell(1);
    this.priority.className = "transition_data";
    this.disableTextSelection(this.weight);

    // Timing
    x = this.table.insertRow(this.table.rows.length);
    this.timingLabel = x.insertCell(0);
    this.timingLabel.innerHTML = draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_TRANSITION_TIMING;
    this.timingLabel.className = "transition_label";
    this.disableTextSelection(this.timingLabel);
    this.timing = x.insertCell(1);
    this.timing.className = "transition_data";
    this.disableTextSelection(this.weight);

    this.setDimension(this.getWidth(), this.getHeight());
    return item;
};

/**
 * @private
 **/
draw2d.TransitionFigure.prototype.initPorts = function () {
    try {
        if (this.outputPort !== null) {
            return;
        }

        this.outputPort = new draw2d.OutArcOutputPort();
        this.outputPort.setWorkflow(this.workflow);
        this.outputPort.setCanDrag(this.getCanDrag());
        this.addPort(this.outputPort, 0, 0);
        this.outputPort.paint();

        this.inputPort = new draw2d.InArcInputPort();
        this.inputPort.setWorkflow(this.workflow);
        this.inputPort.setCanDrag(this.getCanDrag());
        this.addPort(this.inputPort, 0, 0);
        this.inputPort.paint();

        this.setDimension(this.getWidth(), this.getHeight());
    }
    catch (e) {
        pushErrorStack(e, "draw2d.TransitionFigure.prototype.initPorts=function()");
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
draw2d.TransitionFigure.prototype.setDimension = function (/*:int*/ w, /*:int*/ h) {
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

draw2d.TransitionFigure.prototype.rotate = function (/*int*/incr) {
    draw2d.AbstractCloudNodeFigure.prototype.rotate.call(this, incr);
    this.paint();
};
