/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.OutputFieldFigure=function(){draw2d.OutputPort.call(this);};draw2d.OutputFieldFigure.prototype=new draw2d.OutputPort();draw2d.OutputFieldFigure.prototype.createCommand=function(_159){if(_159.getPolicy()==draw2d.EditPolicy.CONNECT){if(_159.source.parentNode.id==_159.target.parentNode.id){return null;}if(_159.source instanceof draw2d.InputPort){return new draw2d.CommandConnect(_159.canvas,_159.target,_159.source);}return null;}return draw2d.Port.prototype.createCommand.call(this,_159);};