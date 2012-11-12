/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.PNPlacePropertyPage = function () {
    draw2d.PropertyPage.call(this);

    this.html = document.createElement("div");
    this.html.style.width = "100%";
    this.html.style.height = "100%";

    this.header = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_HEADER_PLACE, 0, 0);
    this.header.className = "panel_header";
    this.html.appendChild(this.header);

    //------------------------
    // The Name of the Place
    //------------------------
    this.datarowLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_NAME, 10, 45);
    this.html.appendChild(this.datarowLabel);

    this.nameText = document.createElement("input");
    this.nameText.type = "text";
    var oThis = this;
    if (editor.isReadonly()) {
        this.nameText.disabled = "true";
    }
    else {
        Event.observe(this.nameText, "keyup", function (e) {
            var func = oThis.currentModel.setName.bind(oThis.currentModel);
            var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getName(), oThis.nameText.value);
            editor.executeCommand(command);
        });
    }
    this.nameText.style.position = "absolute";
    this.nameText.style.width = "210px";
    this.nameText.style.top = "65px";
    this.nameText.style.left = "10px";
    this.html.appendChild(this.nameText);

    //-----------------
    // Tokens
    //-----------------
    this.tokensLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_TOKENS, 10, 95);
    this.html.appendChild(this.tokensLabel);

    this.listboxTokens = document.createElement("select");
    this.listboxTokens.style.position = "absolute";
    this.listboxTokens.style.overflow = "auto";
    this.listboxTokens.style.width = "60px";
    this.listboxTokens.style.top = "115px";
    this.listboxTokens.style.left = "10px";
    this.listboxTokens.size = 1;
    this.listboxTokens['onchange'] = function () {
        var func = oThis.currentModel.setTokens.bind(oThis.currentModel);
        var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getTokens(), oThis.listboxTokens.selectedIndex + 1);
        editor.executeCommand(command);
    };

    for (var i = 1; i < 8; i++) {
        var node = document.createElement("option");
        node.value = "" + i;
        node.appendChild(document.createTextNode("" + i));
        this.listboxTokens.appendChild(node);
    }
    this.html.appendChild(this.listboxTokens);

    // ----------------
    // Capacity
    // ----------------
    this.capacityLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_CAPACITY, 100, 95);
    this.html.appendChild(this.capacityLabel);

    this.capacityText = document.createElement("input");
    this.capacityText.type = "text";
    var capacityUpdateFunc = function (capacityText) {
        var capacity = parseInt(capacityText.value, 10);
        if (isNaN(capacity)) {
            capacity = 0;
        }

        capacityText.value = "" + capacity;
        var func = this.currentModel.setCapacity.bind(this.currentModel);
        var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, this.currentModel.getCapacity(), capacityText.value);
        editor.executeCommand(command);
    };
    capacityUpdateFunc = capacityUpdateFunc.bind(this, this.capacityText);
    Event.observe(this.capacityText, "keyup", capacityUpdateFunc);


    this.capacityText.style.position = "absolute";
    this.capacityText.style.width = "110px";
    this.capacityText.style.top = "115px";
    this.capacityText.style.left = "100px";
    this.html.appendChild(this.capacityText);

    //---------------------
    // Place Type
    //---------------------
    this.typeLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_PLACE_TYPE, 10, 145);
    this.typeLabel.style.color = "gray";
    this.html.appendChild(this.typeLabel);

    this.place_type = document.createElement("select");
    this.place_type.style.position = "absolute";
    this.place_type.style.overflow = "auto";
    this.place_type.style.width = "210px";
    this.place_type.style.top = "165px";
    this.place_type.style.left = "10px";
    this.place_type.size = 1;
    this.place_type['onchange'] = function () {
        var func = oThis.currentModel.setType.bind(oThis.currentModel);
        var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getType(), oThis.place_type.value);
        editor.executeCommand(command);
    };
    for (var i = 0; i < draw2d.PNPlaceModel.PLACE_TYPE.getSize(); i++) {
        var node = document.createElement("option");
        node.value = draw2d.PNPlaceModel.PLACE_TYPE.get(i);
        node.appendChild(document.createTextNode(node.value));
        this.place_type.appendChild(node);
    }
    this.html.appendChild(this.place_type);
};

draw2d.PNPlacePropertyPage.prototype = new draw2d.PropertyPage();
/** @private **/
draw2d.PNPlacePropertyPage.prototype.type = "draw2d.PNPlacePropertyPage";


/**
 *
 **/
draw2d.PNPlacePropertyPage.prototype.init = function (/*:draw2d.AbstractObjectModel*/ model) {
    this.currentModel = model;
    this.nameText.value = model.getName();
    this.capacityText.value = model.getCapacity();
    this.listboxTokens.selectedIndex = parseInt(model.getTokens(), 10) - 1;
};

/**
 * The container panel did have changed the dimension. Adjust the layout of labels...if required.
 *
 **/
draw2d.PNPlacePropertyPage.prototype.onResize = function (/*:int*/ w, /*:int*/ h) {
};

/**
 *
 **/
draw2d.PNPlacePropertyPage.prototype.deinit = function () {
};

/**
 * @abstract
 * @type HTMLElement
 * @private
 **/
draw2d.PNPlacePropertyPage.prototype.getHTMLElement = function () {
    return this.html;
};