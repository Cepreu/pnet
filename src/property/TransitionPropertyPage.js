/**
 * @version 0.0.1
 * @author SK
 * @constructor
 **/
draw2d.TransitionPropertyPage = function () {
    draw2d.PropertyPage.call(this);

    this.html = document.createElement("div");
    this.html.style.width = "100%";
    this.html.style.height = "100%";

    this.header = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_HEADER_TRANSITION, 0, 0);
    this.header.className = "panel_header";
    this.html.appendChild(this.header);

    var oThis = this;


    // The Name of the Transition
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

    // Rate
    this.rateLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_RATE, 10, 95);
    this.rateLabel.style.color = "gray";
    this.html.appendChild(this.rateLabel);

    this.rateText = document.createElement("input");
    this.rateText.type = "text";
    if (editor.isReadonly()) {
        this.rateText.disabled = "true";
    }
    else {
        Event.observe(this.rateText, "keyup", function (e) {
            var ram = parseFloat(oThis.rateText.value, 10);
            ram = !isNaN(ram) ? ram : 1.0;
            oThis.rateText.value = "" + ram;
            var func = oThis.currentModel.setRate.bind(oThis.currentModel);
            var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getRate(), oThis.rateText.value);
            editor.executeCommand(command);
        });
    }
    this.rateText.style.position = "absolute";
    this.rateText.style.width = "110px";
    this.rateText.style.top = "115px";
    this.rateText.style.left = "10px";
    this.html.appendChild(this.rateText);

    // Weight
    this.weightLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_WEIGHT, 10, 145);
    this.weightLabel.style.color = "gray";
    this.html.appendChild(this.weightLabel);

    this.weightText = document.createElement("input");
    this.weightText.type = "text";
    if (editor.isReadonly()) {
        this.weightText.disabled = "true";
    }
    else {
        Event.observe(this.weightText, "keyup", function (e) {
            var ram = parseFloat(oThis.weightText.value, 10);
            ram = !isNaN(ram) ? ram : 1.0;
            oThis.weightText.value = "" + ram;
            var func = oThis.currentModel.setWeight.bind(oThis.currentModel);
            var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getWeight(), oThis.weightText.value);
            editor.executeCommand(command);
        });
    }
    this.weightText.style.position = "absolute";
    this.weightText.style.width = "110px";
    this.weightText.style.top = "165px";
    this.weightText.style.left = "10px";
    this.html.appendChild(this.weightText);

    // Priority
    this.priorityLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_PRIORITY, 10, 195);
    this.priorityLabel.style.color = "gray";
    this.html.appendChild(this.priorityLabel);

    this.priorityText = document.createElement("input");
    this.priorityText.type = "text";
    if (editor.isReadonly()) {
        this.priorityText.disabled = "true";
    }
    else {
        Event.observe(this.priorityText, "keyup", function (e) {
            var ram = parseInt(oThis.priorityText.value, 10);
            ram = !isNaN(ram) ? ram : 10;
            oThis.priorityText.value = "" + ram;
            var func = oThis.currentModel.setPriority.bind(oThis.currentModel);
            var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getPriority(), oThis.priorityText.value);
            editor.executeCommand(command);
        });
    }
    this.priorityText.style.position = "absolute";
    this.priorityText.style.width = "110px";
    this.priorityText.style.top = "215px";
    this.priorityText.style.left = "10px";
    this.html.appendChild(this.priorityText);

    // Timing
    //
    this.timingLabel = this.createLabelElement(draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_TIMING, 10, 245);
    this.timingLabel.style.color = "gray";
    this.html.appendChild(this.timingLabel);

    this.timing = document.createElement("select");
    this.timing.style.position = "absolute";
    this.timing.style.overflow = "auto";
    this.timing.style.width = "110px";
    this.timing.style.top = "265px";
    this.timing.style.left = "10px";
    this.timing.size = 1;
    this.timing['onchange'] = function () {
        var func = oThis.currentModel.setTiming.bind(oThis.currentModel);
        var command = new draw2d.CommandChangeProperty(editor.getGraphicalViewer(), func, oThis.currentModel.getTiming(), oThis.timing.value);
        editor.executeCommand(command);
    };
    for (var i = 0; i < draw2d.TransitionModel.TIMING.getSize(); i++) {
        var node = document.createElement("option");
        node.value = draw2d.TransitionModel.TIMING.get(i);
        node.appendChild(document.createTextNode(node.value));
        this.timing.appendChild(node);
    }
    this.html.appendChild(this.timing);
};

draw2d.TransitionPropertyPage.prototype = new draw2d.PropertyPage();
/** @private **/
draw2d.TransitionPropertyPage.prototype.type = "draw2d.TransitionPropertyPage";


/**
 *
 **/
draw2d.TransitionPropertyPage.prototype.init = function (/*:draw2d.AbstractObjectModel*/ model) {
    this.currentModel = model;
    this.nameText.value = model.getName();
    this.rateText.value = model.getRate();
    this.weightText.value = model.getWeight();
    this.priorityText.value = model.getPriority();
    this.timing.selectedIndex = draw2d.TransitionModel.TIMING.indexOf(model.getTiming());
};

/**
 *
 **/
draw2d.TransitionPropertyPage.prototype.deinit = function () {
};

/**
 * @abstract
 * @type HTMLElement
 * @private
 **/
draw2d.TransitionPropertyPage.prototype.getHTMLElement = function () {
    return this.html;
};