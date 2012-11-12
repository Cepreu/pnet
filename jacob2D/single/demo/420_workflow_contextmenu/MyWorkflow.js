draw2d.MyWorkflow=function(id){
draw2d.Workflow.call(this,id);
};
draw2d.MyWorkflow.prototype=new draw2d.Workflow();
draw2d.MyWorkflow.prototype.type="MyWorkflow";
draw2d.MyWorkflow.prototype.getContextMenu=function(){
var menu=new draw2d.Menu();
var oThis=this;
menu.appendMenuItem(new draw2d.MenuItem("Grid 10x10",null,function(x,y){
oThis.setGridWidth(10,10);
oThis.setBackgroundImage("grid_10.png",true);
}));
menu.appendMenuItem(new draw2d.MenuItem("Grid 20x20",null,function(x,y){
oThis.setGridWidth(20,20);
oThis.setBackgroundImage("grid_20.png",true);
}));
menu.appendMenuItem(new draw2d.MenuItem("Add Circle",null,function(x,y){
oThis.addFigure(new draw2d.Circle(30),x,y);
}));
return menu;
};
