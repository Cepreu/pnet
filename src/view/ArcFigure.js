/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.ArcFigure = function () {
    draw2d.Connection.call(this);

    // install a Label decorator which display the "weight" attribute of the arc
    this.setTargetDecorator(new draw2d.ArrowConnectionDecorator());
    this.getTargetDecorator().setColor(draw2d.ArcFigure.DEFAULT_COLOR);
    this.setRouter(new draw2d.BezierConnectionRouter());
//    this.setRouter(new draw2d.NullConnectionRouter());
    this.setColor(draw2d.ArcFigure.DEFAULT_COLOR);

    // Create any Draw2D figure as decoration for the connection
    //
    this.weightLabel = new draw2d.Label("");
    this.weightLabel.setWordwrap(false);
    this.weightLabel.setAlpha(0.5);
    this.addFigure(this.weightLabel, new draw2d.BezierMidpointLocator(this));
};

/** @private **/
draw2d.ArcFigure.prototype = new draw2d.Connection();
/** @private **/
draw2d.ArcFigure.prototype.type = "draw2d.OutArcFigure";
draw2d.ArcFigure.DEFAULT_COLOR = new draw2d.Color(95, 95, 95);


draw2d.ArcFigure.prototype.paint = function () {
    draw2d.Connection.prototype.paint.call(this);
    try {
        var weight = this.getModel().getWeight() + "";
        if (weight === "" || weight === "1") {
            this.weightLabel.setText("");
        }
        else {
            this.weightLabel.setText("Weight: " + weight);
        }
    }
    catch (e) {
        pushErrorStack(e, "draw2d.OutArcFigure.prototype.paint=function()");
    }
};

draw2d.ArcFigure.prototype.propertyChange = function (/*:draw2d.PropertyChangeEvent*/ event) {
    switch (event.property) {
        case draw2d.ArcModel.EVENT_PROPERTY_CHANGED:
            this.paint();
            break;
        case draw2d.ArcModel.EVENT_SOURCE_CHANGED:
            this.refreshSourcePort();
            break;
        case draw2d.ArcModel.EVENT_TARGET_CHANGED:
            this.refreshTargetPort();
            break;
        default:
            break;
    }
};


/**
 * Returns the Command to perform the specified Request or null.
 *
 * @param {draw2d.EditPolicy} request describes the Command being requested
 * @return null or a Command
 * @type draw2d.Command
 **/
draw2d.ArcFigure.prototype.createCommand = function (/*:draw2d.EditPolicy*/ request) {
    if (request.getPolicy() === draw2d.EditPolicy.MOVE) {
        return new draw2d.CommandReconnect(this.model);
    }

    if (request.getPolicy() === draw2d.EditPolicy.DELETE) {
        if (this.isDeleteable() === true) {
            return new draw2d.CommandDisconnect(this.getModel());
        }
        return null;
    }

    return null;
};
