/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.LineColorDialog=function(_abc){draw2d.ColorDialog.call(this);this.figure=_abc;var _abd=_abc.getColor();this.updateH(this.rgb2hex(_abd.getRed(),_abd.getGreen(),_abd.getBlue()));};draw2d.LineColorDialog.prototype=new draw2d.ColorDialog();draw2d.LineColorDialog.prototype.type="draw2d.LineColorDialog";draw2d.LineColorDialog.prototype.onOk=function(){var _abe=this.workflow;draw2d.ColorDialog.prototype.onOk.call(this);if(typeof this.figure.setColor=="function"){_abe.getCommandStack().execute(new draw2d.CommandSetColor(this.figure,this.getSelectedColor()));if(_abe.getCurrentSelection()==this.figure){_abe.setCurrentSelection(this.figure);}}};