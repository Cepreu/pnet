/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.AbstractCloudNodeFigure = function () {
    this.inputPort = null;
    this.outputPort = null;
    this.table = null;
    this.header = null;
    this.minimized = false;
    this.angle = 0.0;

    draw2d.Node.call(this);

    this.setDimension(75, 75);
    this.setResizeable(false);
};

draw2d.AbstractCloudNodeFigure.prototype = new draw2d.Node();
/** @private **/
draw2d.AbstractCloudNodeFigure.prototype.type = "draw2d.AbstractCloudNodeFigure";


draw2d.AbstractCloudNodeFigure.prototype.propertyChange = function (/*:draw2d.PropertyChangeEvent*/ event) {
    switch (event.property) {
        case draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED:
            this.paint();
            break;
        case draw2d.AbstractCloudNodeModel.EVENT_POSITION_CHANGED:
            this.setPosition(event.newValue.x, event.newValue.y);
            break;
        case draw2d.AbstractCloudNodeModel.EVENT_ANGLE_CHANGED:
            this.setAngle(event.newValue.angle);
            break;
        case draw2d.AbstractCloudNodeModel.EVENT_MINIMIZED_CHANGED:
            this.toggleMinMax(event.newValue.minimized);
            break;
        case draw2d.AbstractObjectModel.EVENT_CONNECTION_ADDED:
            this.refreshConnections();
            break;
        case draw2d.AbstractObjectModel.EVENT_CONNECTION_REMOVED:
            this.refreshConnections();
            break;
        default:
            break;
    }
};


/**
 * @private
 **/
draw2d.AbstractCloudNodeFigure.prototype.createHTMLElement = function () {
    var item = draw2d.Node.prototype.createHTMLElement.call(this);

    item.style.width = "100px";
    item.style.height = "100px";
    item.style.margin = "0px";
    item.style.padding = "0px";

    this.table = document.createElement("table");
    this.table.style.margin = "0px";
    this.table.style.padding = "0px";
    this.table.cellPadding = "0";
    this.table.cellSpacing = "0";

    var row = this.table.insertRow(0);
    this.header = row.insertCell(0);
    this.header.innerHTML = "";
    this.header.colSpan = "2";
    this.disableTextSelection(this.header);
    item.appendChild(this.table);

    return item;
};


draw2d.AbstractCloudNodeFigure.prototype.paint = function () {
    try {
        var pos = this.getModel().getPosition();
        this.setPosition(pos.x, pos.y);

        var st = window.getComputedStyle(this.table, '');
        this.setDimension(parseInt(st.getPropertyValue("width"), 10), parseInt(st.getPropertyValue("height"), 10));
        this.initPorts();
    }
    catch (e) {
        pushErrorStack(e, "draw2d.AbstractCloudNodeFigure.prototype.paint=function()");
    }
};

/**
 * Returns the calculated width of the figure.
 *
 **/
draw2d.AbstractCloudNodeFigure.prototype.getWidth = function () {
    if (this.table === null) {
        return 10;
    }

    if (window.getComputedStyle) {
        return  parseInt(window.getComputedStyle(this.table, '').getPropertyValue("width"), 10)
    }

    return this.table.clientWidth;
};

/**
 * Returns the calculated height of the figure.
 *
 **/
draw2d.AbstractCloudNodeFigure.prototype.getHeight = function () {
    if (this.table === null) {
        return 10;
    }

    if (window.getComputedStyle) {
        return  parseInt(window.getComputedStyle(this.table, '').getPropertyValue("height"), 10)
    }

    return this.table.clientHeight;
};

/**
 * Returns the Command to perform the specified Request or null.
 *
 * @param {draw2d.EditPolicy} request describes the Command being requested
 * @return null or a Command
 * @type draw2d.Command
 **/
draw2d.AbstractCloudNodeFigure.prototype.createCommand = function (/*:draw2d.EditPolicy*/ request) {
    if (request.getPolicy() === draw2d.EditPolicy.MOVE) {
        if (!this.canDrag) {
            return null;
        }

        return new draw2d.CommandMoveCloudNode(this.model);
    }
    else if (request.getPolicy() === draw2d.EditPolicy.DELETE) {
        return new draw2d.CommandRemoveCloudNode(this.model);
    }

    return  draw2d.Node.prototype.createCommand.call(this, request);
};


/**
 * @private
 **/
draw2d.AbstractCloudNodeFigure.prototype.initPorts = function () {
};

/**
 * Returns the List of the connection model objects for which this Figure's model is the source.
 * Callers must not modify the returned List.
 * Only called if you use the MVC pattern of Draw2D
 *
 * @type draw2d.ArrayList
 * @return the List of model source connections
 */
draw2d.AbstractCloudNodeFigure.prototype.getModelSourceConnections = function () {
    return this.getModel().getConnectionModels();
};


draw2d.Figure.prototype.setAngle = function (/*:int*/ angle) {
    this.angle = angle;
    this.paint();
    this.fireMoveEvent();

    // Update the resize handles if the user change the position of the element via an API call.
    //
    if (this.workflow !== null && this.workflow.getCurrentSelection() == this)
        this.workflow.showResizeHandles(this);
};

draw2d.AbstractCloudNodeFigure.prototype.setMinimized = function (minimized) {
    for (var r = 1, row; row = this.table.rows[r], r < this.table.rows.length; r++) {
        row.style.display = minimized ? 'none' : '';
    }
    this.minimized = minimized;
}

draw2d.AbstractCloudNodeFigure.prototype.toggleMinMax = function (minimized) {
    this.setMinimized(minimized);
    this.paint();
};
