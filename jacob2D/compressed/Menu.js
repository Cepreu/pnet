/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Menu=function(){this.menuItems=new draw2d.ArrayList();draw2d.Figure.call(this);this.setSelectable(false);this.setDeleteable(false);this.setCanDrag(false);this.setResizeable(false);this.setSelectable(false);this.setZOrder(10000);this.dirty=false;};draw2d.Menu.prototype=new draw2d.Figure();draw2d.Menu.prototype.type="draw2d.Menu";draw2d.Menu.prototype.createHTMLElement=function(){var item=document.createElement("div");item.style.position="absolute";item.style.left=this.x+"px";item.style.top=this.y+"px";item.style.margin="0px";item.style.padding="0px";item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;item.style.border="1px solid gray";item.style.background="lavender";item.style.cursor="pointer";item.style.width="auto";item.style.height="auto";item.style.boxShadow="5px 5px 5px #ccc";item.style.borderRadius="2px";item.className="Menu";return item;};draw2d.Menu.prototype.setWorkflow=function(_1ba){this.workflow=_1ba;};draw2d.Menu.prototype.setDimension=function(w,h){};draw2d.Menu.prototype.appendMenuItem=function(item){this.menuItems.add(item);item.parentMenu=this;this.dirty=true;};draw2d.Menu.prototype.getHTMLElement=function(){var html=draw2d.Figure.prototype.getHTMLElement.call(this);if(this.dirty){this.createList();}return html;};draw2d.Menu.prototype.createList=function(){this.dirty=false;this.html.innerHTML="";var _1bf=this;for(var i=0;i<this.menuItems.getSize();i++){var item=this.menuItems.get(i);var li=document.createElement("a");li.innerHTML=item.getLabel();li.style.display="block";li.style.fontFamily="Verdana, Arial, Helvetica, sans-serif";li.style.fontSize="9pt";li.style.color="dimgray";li.style.borderBottom="1px solid silver";li.style.paddingLeft="5px";li.style.paddingRight="5px";li.style.whiteSpace="nowrap";li.style.cursor="pointer";li.className="MenuItem";this.html.appendChild(li);li.menuItem=item;if(li.addEventListener){li.addEventListener("click",function(_1c3){var _1c4=arguments[0]||window.event;_1c4.cancelBubble=true;_1c4.returnValue=false;var _1c5=_1c4.clientX;var _1c6=_1c4.clientY;var _1c7=document.body.parentNode.scrollLeft;var _1c8=document.body.parentNode.scrollTop;this.menuItem.execute(_1c5+_1c7,_1c6+_1c8);},false);li.addEventListener("mouseup",function(_1c9){_1c9.cancelBubble=true;_1c9.returnValue=false;},false);li.addEventListener("mousedown",function(_1ca){_1ca.cancelBubble=true;_1ca.returnValue=false;},false);li.addEventListener("mouseover",function(_1cb){this.style.backgroundColor="silver";},false);li.addEventListener("mouseout",function(_1cc){this.style.backgroundColor="transparent";},false);}else{if(li.attachEvent){li.attachEvent("onclick",function(_1cd){var _1ce=arguments[0]||window.event;_1ce.cancelBubble=true;_1ce.returnValue=false;var _1cf=_1ce.clientX;var _1d0=_1ce.clientY;var _1d1=document.body.parentNode.scrollLeft;var _1d2=document.body.parentNode.scrollTop;_1cd.srcElement.menuItem.execute(_1cf+_1d1,_1d0+_1d2);});li.attachEvent("onmousedown",function(_1d3){_1d3.cancelBubble=true;_1d3.returnValue=false;});li.attachEvent("onmouseup",function(_1d4){_1d4.cancelBubble=true;_1d4.returnValue=false;});li.attachEvent("onmouseover",function(_1d5){_1d5.srcElement.style.backgroundColor="silver";});li.attachEvent("onmouseout",function(_1d6){_1d6.srcElement.style.backgroundColor="transparent";});}}}};