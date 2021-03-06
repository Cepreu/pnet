/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.OutArcInputPort = function () {
    draw2d.Port.call(this, new draw2d.ImageFigure("" + draw2d.Configuration.IMAGEPATH + "mount_port.png"));
    this.setDimension(16, 16);
    this.setBackgroundColor(null);
    this.setName("input");
};

/** @private **/
draw2d.OutArcInputPort.prototype = new draw2d.InputPort();
/** @private **/
draw2d.OutArcInputPort.prototype.type = "draw2d.OutArcInputPort";


/**
 * Returns the Command to perform the specified Request or null.<br>
 * Inherited figures can override this method to return the own implementation
 * of the request.<br>
 *
 * @param {draw2d.EditPolicy} request describes the Command being requested
 * @return null or a draw2d.Command
 * @type draw2d.Command
 **/
draw2d.OutArcInputPort.prototype.createCommand = function (/*:draw2d.EditPolicy*/ request) {
    // Connect request between two ports
    //
    if (request.getPolicy() === draw2d.EditPolicy.CONNECT) {
        // loopback connections are not valid
        if (request.source.parentNode.id === request.target.parentNode.id) {
            return null;
        }

        if (request.source instanceof draw2d.OutArcOutputPort) {
            // This is the different to the OutputPort implementation of createCommand
            var sourceModel = request.source.getParent().getModel();
            var targetModel = request.target.getParent().getModel();
            return new draw2d.CommandConnect(sourceModel, targetModel);
        }
        return null;
    }

    // ...else call the base class
    return draw2d.InputPort.prototype.createCommand.call(this, request);
};
