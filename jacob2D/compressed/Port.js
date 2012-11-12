/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Port=function(_186,_187){Corona=function(){};Corona.prototype=new draw2d.Circle();Corona.prototype.setAlpha=function(_188){draw2d.Circle.prototype.setAlpha.call(this,Math.min(0.3,_188));this.setDeleteable(false);this.setCanDrag(false);this.setResizeable(false);this.setSelectable(false);};if(_186===null||_186===undefined){this.currentUIRepresentation=new draw2d.Circle();}else{this.currentUIRepresentation=_186;}if(_187===null||_187===undefined){this.connectedUIRepresentation=new draw2d.Circle();this.connectedUIRepresentation.setColor(null);}else{this.connectedUIRepresentation=_187;}this.disconnectedUIRepresentation=this.currentUIRepresentation;this.hideIfConnected=false;this.uiRepresentationAdded=true;this.parentNode=null;this.originX=0;this.originY=0;this.coronaWidth=10;this.corona=null;draw2d.Rectangle.call(this);this.setDimension(8,8);this.setBackgroundColor(new draw2d.Color(100,180,100));this.setColor(new draw2d.Color(90,150,90));draw2d.Rectangle.prototype.setColor.call(this,null);this.dropable=new draw2d.DropTarget(this.html);this.dropable.node=this;this.dropable.addEventListener("dragenter",function(_189){_189.target.node.onDragEnter(_189.relatedTarget.node);});this.dropable.addEventListener("dragleave",function(_18a){_18a.target.node.onDragLeave(_18a.relatedTarget.node);});this.dropable.addEventListener("drop",function(_18b){_18b.relatedTarget.node.onDrop(_18b.target.node);});};draw2d.Port.prototype=new draw2d.Rectangle();draw2d.Port.prototype.type="draw2d.Port";draw2d.Port.ZOrderBaseIndex=5000;draw2d.Port.setZOrderBaseIndex=function(_18c){draw2d.Port.ZOrderBaseIndex=_18c;};draw2d.Port.prototype.setHideIfConnected=function(flag){this.hideIfConnected=flag;};draw2d.Port.prototype.dispose=function(){var size=this.moveListener.getSize();for(var i=0;i<size;i++){var _190=this.moveListener.get(i);this.parentNode.workflow.removeFigure(_190);_190.dispose();}draw2d.Rectangle.prototype.dispose.call(this);this.parentNode=null;this.dropable.node=null;this.dropable=null;this.disconnectedUIRepresentation.dispose();this.connectedUIRepresentation.dispose();};draw2d.Port.prototype.createHTMLElement=function(){var item=draw2d.Rectangle.prototype.createHTMLElement.call(this);item.style.zIndex=draw2d.Port.ZOrderBaseIndex;this.currentUIRepresentation.html.zIndex=draw2d.Port.ZOrderBaseIndex;item.appendChild(this.currentUIRepresentation.html);this.uiRepresentationAdded=true;return item;};draw2d.Port.prototype.setUiRepresentation=function(_192){if(_192===null){_192=new draw2d.Figure();}if(this.uiRepresentationAdded){this.html.removeChild(this.currentUIRepresentation.getHTMLElement());}this.html.appendChild(_192.getHTMLElement());_192.paint();this.currentUIRepresentation=_192;};draw2d.Port.prototype.onMouseEnter=function(){this.setLineWidth(2);};draw2d.Port.prototype.onMouseLeave=function(){this.setLineWidth(0);};draw2d.Port.prototype.setDimension=function(_193,_194){draw2d.Rectangle.prototype.setDimension.call(this,_193,_194);this.connectedUIRepresentation.setDimension(_193,_194);this.disconnectedUIRepresentation.setDimension(_193,_194);this.setPosition(this.x,this.y);};draw2d.Port.prototype.setBackgroundColor=function(_195){this.currentUIRepresentation.setBackgroundColor(_195);};draw2d.Port.prototype.getBackgroundColor=function(){return this.currentUIRepresentation.getBackgroundColor();};draw2d.Port.prototype.getConnections=function(){var _196=new draw2d.ArrayList();var size=this.moveListener.getSize();for(var i=0;i<size;i++){var _199=this.moveListener.get(i);if(_199 instanceof draw2d.Connection){_196.add(_199);}}return _196;};draw2d.Port.prototype.setColor=function(_19a){this.currentUIRepresentation.setColor(_19a);};draw2d.Port.prototype.getColor=function(){return this.currentUIRepresentation.getColor();};draw2d.Port.prototype.setLineWidth=function(_19b){this.currentUIRepresentation.setLineWidth(_19b);};draw2d.Port.prototype.getLineWidth=function(){return this.currentUIRepresentation.getLineWidth();};draw2d.Port.prototype.paint=function(){try{this.currentUIRepresentation.paint();}catch(e){pushErrorStack(e,"draw2d.Port.prototype.paint=function()");}};draw2d.Port.prototype.setPosition=function(xPos,yPos){this.originX=xPos;this.originY=yPos;draw2d.Rectangle.prototype.setPosition.call(this,xPos,yPos);if(this.html===null){return;}this.html.style.left=(this.x-this.getWidth()/2)+"px";this.html.style.top=(this.y-this.getHeight()/2)+"px";};draw2d.Port.prototype.setParent=function(_19e){if(this.parentNode!==null){this.parentNode.detachMoveListener(this);}this.parentNode=_19e;if(this.parentNode!==null){this.parentNode.attachMoveListener(this);}};draw2d.Port.prototype.attachMoveListener=function(_19f){draw2d.Rectangle.prototype.attachMoveListener.call(this,_19f);if(this.hideIfConnected==true){this.setUiRepresentation(this.connectedUIRepresentation);}};draw2d.Port.prototype.detachMoveListener=function(_1a0){draw2d.Rectangle.prototype.detachMoveListener.call(this,_1a0);if(this.getConnections().getSize()==0){this.setUiRepresentation(this.disconnectedUIRepresentation);}};draw2d.Port.prototype.getParent=function(){return this.parentNode;};draw2d.Port.prototype.onDrag=function(){draw2d.Rectangle.prototype.onDrag.call(this);this.parentNode.workflow.showConnectionLine(this.parentNode.x+this.x,this.parentNode.y+this.y,this.parentNode.x+this.originX,this.parentNode.y+this.originY);};draw2d.Port.prototype.getCoronaWidth=function(){return this.coronaWidth;};draw2d.Port.prototype.setCoronaWidth=function(_1a1){this.coronaWidth=_1a1;};draw2d.Port.prototype.setOrigin=function(x,y){this.originX=x;this.originY=y;};draw2d.Port.prototype.onDragend=function(){this.setAlpha(1);this.setPosition(this.originX,this.originY);this.parentNode.workflow.hideConnectionLine();document.body.focus();};draw2d.Port.prototype.onDragEnter=function(port){var _1a5=new draw2d.EditPolicy(draw2d.EditPolicy.CONNECT);_1a5.canvas=this.parentNode.workflow;_1a5.source=port;_1a5.target=this;var _1a6=this.createCommand(_1a5);if(_1a6===null){return;}this.parentNode.workflow.connectionLine.setColor(new draw2d.Color(0,150,0));this.parentNode.workflow.connectionLine.setLineWidth(3);this.showCorona(true);};draw2d.Port.prototype.onDragLeave=function(port){this.parentNode.workflow.connectionLine.setColor(new draw2d.Color(0,0,0));this.parentNode.workflow.connectionLine.setLineWidth(1);this.showCorona(false);};draw2d.Port.prototype.onDrop=function(port){var _1a9=new draw2d.EditPolicy(draw2d.EditPolicy.CONNECT);_1a9.canvas=this.parentNode.workflow;_1a9.source=port;_1a9.target=this;var _1aa=this.createCommand(_1a9);if(_1aa!==null){this.parentNode.workflow.getCommandStack().execute(_1aa);}};draw2d.Port.prototype.getAbsolutePosition=function(){return new draw2d.Point(this.getAbsoluteX(),this.getAbsoluteY());};draw2d.Port.prototype.getAbsoluteBounds=function(){return new draw2d.Dimension(this.getAbsoluteX(),this.getAbsoluteY(),this.getWidth(),this.getHeight());};draw2d.Port.prototype.getAbsoluteY=function(){return this.originY+this.parentNode.getY();};draw2d.Port.prototype.getAbsoluteX=function(){return this.originX+this.parentNode.getX();};draw2d.Port.prototype.onOtherFigureMoved=function(_1ab){this.fireMoveEvent();};draw2d.Port.prototype.getName=function(){return this.name;};draw2d.Port.prototype.setName=function(name){this.name=name;};draw2d.Port.prototype.isOver=function(iX,iY){var x=this.getAbsoluteX()-this.coronaWidth-this.getWidth()/2;var y=this.getAbsoluteY()-this.coronaWidth-this.getHeight()/2;var iX2=x+this.width+(this.coronaWidth*2)+this.getWidth()/2;var iY2=y+this.height+(this.coronaWidth*2)+this.getHeight()/2;return (iX>=x&&iX<=iX2&&iY>=y&&iY<=iY2);};draw2d.Port.prototype.showCorona=function(flag,_1b4){if(flag===true){this.corona=new Corona();this.corona.setAlpha(0.3);this.corona.setBackgroundColor(new draw2d.Color(0,125,125));this.corona.setColor(null);this.corona.setDimension(this.getWidth()+(this.getCoronaWidth()*2),this.getWidth()+(this.getCoronaWidth()*2));this.parentNode.getWorkflow().addFigure(this.corona,this.getAbsoluteX()-this.getCoronaWidth()-this.getWidth()/2,this.getAbsoluteY()-this.getCoronaWidth()-this.getHeight()/2);}else{if(flag===false&&this.corona!==null){this.parentNode.getWorkflow().removeFigure(this.corona);this.corona=null;}}};draw2d.Port.prototype.createCommand=function(_1b5){if(_1b5.getPolicy()===draw2d.EditPolicy.MOVE){if(!this.canDrag){return null;}return new draw2d.CommandMovePort(this);}if(_1b5.getPolicy()===draw2d.EditPolicy.CONNECT){if(_1b5.source.parentNode.id===_1b5.target.parentNode.id){return null;}else{return new draw2d.CommandConnect(_1b5.canvas,_1b5.source,_1b5.target);}}return null;};