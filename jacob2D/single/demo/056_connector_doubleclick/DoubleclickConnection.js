draw2d.DoubleclickConnection=function(){
draw2d.Connection.call(this);
this.sourcePort=null;
this.targetPort=null;
this.lineSegments=[];
this.setColor(new draw2d.Color(0,0,115));
this.setLineWidth(2);
this.setColor(new draw2d.Color(128,255,128));
this.isHighlight=false;
};
draw2d.DoubleclickConnection.prototype=new draw2d.Connection();
draw2d.DoubleclickConnection.prototype.onDoubleClick=function(){
this.isHighlight=!this.isHighlight;
if(this.isHighlight){
this.setLineWidth(5);
this.setColor(new draw2d.Color(255,128,128));
}else{
this.setLineWidth(2);
this.setColor(new draw2d.Color(128,255,128));
}
};
