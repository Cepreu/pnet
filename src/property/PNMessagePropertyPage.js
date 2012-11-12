draw2d.PNMessagePropertyPage = function () {
    draw2d.PropertyPage.call(this);

    this.html = document.createElement("div");
    this.html.style.width = "100%";
    this.html.style.height = "100%";

    this.header = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_HEADER_PNMESSAGE, 0, 0);
    this.header.className = "panel_header";
    this.html.appendChild(this.header);

    // The Name of the PNMessage
    //
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

    // Target Service
    //
    this.serviceLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_SERVICE, 10, 95);
    this.html.appendChild(this.serviceLabel);

    this.listboxService = document.createElement("select");
    this.listboxService.style.position = "absolute";
    this.listboxService.style.overflow = "auto";
    this.listboxService.style.width = '210px';
    this.listboxService.style.top = "115px";
    this.listboxService.style.left = "10px";
    this.listboxService.size = 1;
    this.listboxService['onchange'] = function () {
        var func = oThis.currentModel.setService.bind(oThis.currentModel);
        var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getService(), oThis.listboxService.value);
        editor.executeCommand(command);
    };

    for (var i = 0; i < draw2d.PNMessageModel.SERVICE.getSize(); i++) {
        var node = document.createElement("option");
        node.value = draw2d.PNMessageModel.SERVICE.get(i);
        node.appendChild(document.createTextNode(node.value));
        this.listboxService.appendChild(node);
    }
    this.html.appendChild(this.listboxService);

    // Message Type
    //
    this.msgtypeLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_MSGTYPE, 10, 145);
    this.msgtypeLabel.style.color = "gray";
    this.html.appendChild(this.msgtypeLabel);

    this.msgtype = document.createElement("select");
    this.msgtype.style.position = "absolute";
    this.msgtype.style.overflow = "auto";
    this.msgtype.style.width = "210px";
    this.msgtype.style.top = "165px";
    this.msgtype.style.left = "10px";
    this.msgtype.size = 1;
    this.msgtype['onchange'] = function () {
        var func = oThis.currentModel.setMsgType.bind(oThis.currentModel);
        var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getMsgType(), oThis.msgtype.value);
        editor.executeCommand(command);
    };
    for (var i = 0; i < draw2d.PNMessageModel.MSGTYPE.getSize(); i++) {
        var node = document.createElement("option");
        node.value = draw2d.PNMessageModel.MSGTYPE.get(i);
        node.appendChild(document.createTextNode(node.value));
        this.msgtype.appendChild(node);
    }
    this.html.appendChild(this.msgtype);
};
draw2d.PNMessagePropertyPage.prototype = new draw2d.PropertyPage();
/** @private **/
draw2d.PNMessagePropertyPage.prototype.type = "draw2d.PNMessagePropertyPage";


/**
 *
 **/
draw2d.PNMessagePropertyPage.prototype.init = function (/*:draw2d.AbstractObjectModel*/ model) {
    this.currentModel = model;
    this.nameText.value = model.getName();
    this.listboxService.selectedIndex = draw2d.PNMessageModel.SERVICE.indexOf(model.getService());
    ;
    this.msgtype.selectedIndex = draw2d.PNMessageModel.MSGTYPE.indexOf(model.getMsgType());
};

/**
 *
 **/
draw2d.PNMessagePropertyPage.prototype.deinit = function () {
};

/**
 * @abstract
 * @type HTMLElement
 * @private
 **/
draw2d.PNMessagePropertyPage.prototype.getHTMLElement = function () {
    return this.html;
};