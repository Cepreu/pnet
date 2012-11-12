/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PNEeventFigure = function () {
    draw2d.AbstractCloudNodeFigure.call(this);
};

draw2d.PNEeventFigure.prototype = new draw2d.AbstractCloudNodeFigure();
draw2d.PNEeventFigure.prototype.type = "draw2d.PNEeventFigure";


draw2d.PNEeventFigure.prototype.paint = function () {
    draw2d.AbstractCloudNodeFigure.prototype.paint.call(this);
    try {
        var model = this.getModel();
        this.getHTMLElement().className = "pnevent_frame rotate_" + model.getAngle();
        this.header.innerHTML = model.getName();
        this.setDimension(this.getWidth(), this.getHeight());
    }
    catch (e) {
        pushErrorStack(e, "draw2d.PNEeventFigure.prototype.paint=function()");
    }
};


/**
 * Create the HTML Element for the visual representation.
 *
 * @private
 **/
draw2d.PNEeventFigure.prototype.createHTMLElement = function () {
    var item = draw2d.AbstractCloudNodeFigure.prototype.createHTMLElement.call(this);

    item.className = "pnevent_frame";
    this.header.className = "pnevent_header";
    item.style.border = "";

    this.setDimension(this.getWidth(), this.getHeight());

    return item;
};


/**
 * @private
 **/
draw2d.PNEeventFigure.prototype.initPorts = function () {
    try {
        if (this.outputPort !== null) {
            return;
        }

        this.outputPort = new draw2d.InArcOutputPort();
        this.outputPort.setWorkflow(this.workflow);
        this.outputPort.setCanDrag(this.getCanDrag());
        this.addPort(this.outputPort, 0, 0);
        this.outputPort.paint();

        this.setDimension(this.getWidth(), this.getHeight());
    }
    catch (e) {
        pushErrorStack(e, "draw2d.PNEeventFigure.prototype.outputPort=function()");
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
draw2d.PNEeventFigure.prototype.setDimension = function (/*:int*/ w, /*:int*/ h) {
    draw2d.AbstractCloudNodeFigure.prototype.setDimension.call(this, w, h);
    if (this.outputPort === null)
        return;

    var model = this.getModel();
    var angle = 0;
    if (model) {
        this.setMinimized(model.isMinimized());
        angle = model.getAngle();
    }
    switch (angle) {
        case 90:
            this.outputPort.setPosition(w / 2, -5);
            break;
        case 180:
            this.outputPort.setPosition(-5, h / 2);
            break;
        case 270:
            this.outputPort.setPosition(w / 2, h + 5);
            break;
        default:
            this.outputPort.setPosition(w + 5, h / 2);
    }
};

