/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolClear=function(_4e1){draw2d.Button.call(this,_4e1);this.setDimension(25,25);};draw2d.ToolClear.prototype=new draw2d.Button();draw2d.ToolClear.prototype.type="ToolClear";draw2d.ToolClear.prototype.execute=function(){this.palette.workflow.clear();draw2d.ToolGeneric.prototype.execute.call(this);};