/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PropertyPanel = function (/*:String*/ contentDivId) {
    try {
        if (!contentDivId) {
            return;
        }
        this.html = $(contentDivId);
        this.pages = new Hash();
        this.currentPage = null;
        this.pages.set(draw2d.PNPlaceModel.prototype.type, new draw2d.PNPlacePropertyPage());
        this.pages.set(draw2d.TransitionModel.prototype.type, new draw2d.TransitionPropertyPage());
        this.pages.set(draw2d.PNEventModel.prototype.type, new draw2d.PNEventPropertyPage());
        this.pages.set(draw2d.ArcModel.prototype.type, new draw2d.ArcPropertyPage());
        this.pages.set(draw2d.PNMessageModel.prototype.type, new draw2d.PNMessagePropertyPage());

        this.defaultPage = new draw2d.DefaultPropertyPage();
        this.onSelectionChanged(null, null);
    }
    catch (e) {
        pushErrorStack(e, "draw2d.PropertyPanel=function(/*:String*/ contentDivId)");
    }
};

/** @private **/
draw2d.PropertyPanel.prototype.type = "draw2d.PropertyPanel";


/**
 * Set the new dimension of the property panel
 **/
draw2d.PropertyPanel.prototype.setDimension = function (/*:int*/ w, /*:int*/ h) {
    this.html.style.width = w + "px";
    this.html.style.height = h + "px";
    this.pages.values().each(function (page) {
        page.onResize(w, h);
    });
};

draw2d.PropertyPanel.prototype.onSelectionChanged = function (/*:draw2d.Figure*/ figure, /*:draw2d.AbstractObjectModel*/ model) {
    try {
        if (this.currentPage !== null) {
            this.currentPage.deinit();
            this.html.removeChild(this.currentPage.getHTMLElement());
            this.currentPage = null;
        }

        this.html.innerHTML = "";
        if (model !== null) {
            var page = this.pages.get(model.type);
            if (page) {
                this.html.appendChild(page.getHTMLElement());
                page.init(model);
                this.currentPage = page;
            }
        }
        else {
            this.html.appendChild(this.defaultPage.getHTMLElement());
            this.defaultPage.init(editor.getModel());
            this.currentPage = this.defaultPage;
        }
    }
    catch (e) {
        alert(e);
    }
};
