draw2d.ContextmenuConnection=function(){
draw2d.Connection.call(this);
this.sourcePort=null;
this.targetPort=null;
this.lineSegments=[];
this.setColor(new draw2d.Color(0,0,115));
this.setLineWidth(2);
};
draw2d.ContextmenuConnection.prototype=new draw2d.Connection();
draw2d.ContextmenuConnection.prototype.getContextMenu=function(){
var menu=new draw2d.Menu();
var oThis=this;
menu.appendMenuItem(new draw2d.MenuItem("Blue",null,function(){
oThis.setColor(new draw2d.Color(0,0,255));
}));
menu.appendMenuItem(new draw2d.MenuItem("Green",null,function(){
oThis.setColor(new draw2d.Color(0,255,0));
}));
menu.appendMenuItem(new draw2d.MenuItem("Silver",null,function(){
oThis.setColor(new draw2d.Color(128,128,128));
}));
menu.appendMenuItem(new draw2d.MenuItem("Black",null,function(){
oThis.setColor(new draw2d.Color(0,0,0));
}));
return menu;
};
