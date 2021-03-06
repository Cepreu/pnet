/* This notice must be untouched at all times.

FreeGroup Draw2D 0.9.26
The latest version is available at
http://www.freegroup.de

Copyright (c) 2006 Andreas Herz. All rights reserved.
Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )

LICENSE: LGPL

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License (LGPL) as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
or see http://www.gnu.org/copyleft/lesser.html
*/
draw2d.MyDoubleClickFigure=function()
{
  draw2d.Rectangle.call(this);
  this.setDimension(50,50);
  this.setBackgroundColor(new  draw2d.Color(220,255,255));
};

/** base class of my example double click figure 
 * You can use circle, oval,.....too
 **/
draw2d.MyDoubleClickFigure.prototype = new draw2d.Rectangle();

/** @private **/
draw2d.MyDoubleClickFigure.prototype.type="MyDoubleClickFigure";


/**
 * Callback method for the double click event of user interaction.
 **/
draw2d.MyDoubleClickFigure.prototype.onDoubleClick=function()
{
  var w = parseInt(prompt("Enter border line width", this.getLineWidth()));
  if(w>0)
    this.setLineWidth(w);
};

