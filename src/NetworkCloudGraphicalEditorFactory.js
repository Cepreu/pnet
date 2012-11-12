/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.NetworkCloudGraphicalEditorFactory = function (/*:boolean*/ readonly) {
    this.readonly = readonly;
    draw2d.EditPartFactory.call(this);
};

draw2d.NetworkCloudGraphicalEditorFactory.prototype = new draw2d.EditPartFactory();
/** @private **/
draw2d.NetworkCloudGraphicalEditorFactory.prototype.type = "draw2d.NetworkCloudGraphicalEditorFactory";


/**
 * Creates a new Figure given the specified model.
 * @param {draw2d.AbstractObjectModel} mode - the model of the figure being created
 *
 * @type draw2d.Figure
 **/
draw2d.NetworkCloudGraphicalEditorFactory.prototype.createEditPart = function (/*:draw2d.AbstractObjectModel*/ model) {
    var figure = null;

    if (model instanceof draw2d.PNPlaceModel) {
        figure = new draw2d.PNPlaceFigure();
    }
    if (model instanceof draw2d.PNMessageModel) {
        figure = new draw2d.PNMessageFigure();
    }
    else if (model instanceof draw2d.TransitionModel) {
        figure = new draw2d.TransitionFigure();
    }
    else if (model instanceof draw2d.PNEventModel) {
        figure = new draw2d.PNEeventFigure();
    }
    else if (model instanceof draw2d.ArcModel) {
        figure = new draw2d.ArcFigure();
    }


    if (figure === null) {
        throw "factory called with unknown model class:" + model.type;
    }

    figure.setModel(model);
    if (this.readonly) {
        figure.setDeleteable(false);
        figure.setCanDrag(false);
    }
    return figure;
};

