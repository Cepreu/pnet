/**
 * @version  0.0.1
 * @author   SK
 * @private
 **/

function removeTextNodes(nodes) {
    var result = new draw2d.ArrayList();
    for (var i = 0; i < nodes.length; i++) {
        var child = nodes.item(i);
        var attName = child.nodeName;

        if (attName === "#text") {
            continue;
        }
        result.add(child);
    }
    return result.asArray();
}

draw2d.ModelXMLDeserializer = function () {
    alert("do not init this class. Use the static methods instead");
};


draw2d.ModelXMLDeserializer.fromXML = function (/*:DOMNode*/ node, /*:Object*/ modelParent, /*:Object*/ modelRoot) {
    var className = "" + node.nodeName;
    var value = node.nodeValue;
    if (value === null) {
        value = node.nodeTypedValue ? node.nodeTypedValue : node.textContent;
    }
    var obj = null;
    var checkPNEvents = false;

    switch (className.toLowerCase()) {
        case "pnml":
            obj = new draw2d.VirtualNetworkCloudModel(node.getAttribute("id"));
            modelRoot = obj;
            break;
        case "pnmessage":
            if (modelParent instanceof draw2d.ArcModel) {
                obj = new draw2d.PNMessageReferenceModel(node.getAttribute("reference"));
            }
            else {
                obj = new draw2d.PNMessageModel(node.getAttribute("id"));
            }
            break;
        case "place":
            if (modelParent instanceof draw2d.ArcModel) {
                obj = new draw2d.PNPlaceReferenceModel(node.getAttribute("reference"));
            }
            else {
                obj = new draw2d.PNPlaceModel(node.getAttribute("id"));
            }
            break;
        case "transition":
            if (modelParent instanceof draw2d.ArcModel) {
                obj = new draw2d.TransitionReferenceModel(node.getAttribute("reference"));
            }
            else {
                obj = new draw2d.TransitionModel(node.getAttribute("id"));
            }
            break;
        case "pnevent":
            if (modelParent instanceof draw2d.ArcModel) {
                obj = new draw2d.PNEventReferenceModel(node.getAttribute("reference"));
            }
            else {
                obj = new draw2d.PNEventModel(node.getAttribute("id"));
            }
            break;
        case "representation":
            obj = new draw2d.RepresentationModel();
            break;
        case "p2ts":
            obj = new draw2d.P2TsModel();
            break;
        case "arc":
            var children = removeTextNodes(node.childNodes);
            if (children[0].nodeName === "pnplace" || children[0].nodeName === "pnmessage") {
                obj = new draw2d.ArcModel(children[1].getAttribute("reference"), children[0].getAttribute("reference"), node.getAttribute("id"));
            }
            else {
                obj = new draw2d.ArcModel(children[0].getAttribute("reference"), children[1].getAttribute("reference"), node.getAttribute("id"));
            }

            break;
        default:
            return value;
    }

    if (modelParent !== undefined && obj.setModelParent !== undefined) {
        obj.setModelParent(modelParent);
    }
    var childNodes = removeTextNodes(node.childNodes);
    var counter = 0;
    for (var i = 0; i < childNodes.length; i++) {
        var child = childNodes[i];
        var attName = child.nodeName;

        if (obj instanceof Array) {
            attName = counter;
            /* parseInt(attName.replace("index",""));*/
        }

        var childModel = draw2d.ModelXMLDeserializer.fromXML(child, obj instanceof draw2d.AbstractObjectModel ? obj : modelParent, modelRoot);

        if (childModel instanceof draw2d.AbstractCloudNodeModel && obj instanceof draw2d.VirtualNetworkCloudModel) {
            obj.addCloudNodeModel(childModel);
        } else if (childModel instanceof draw2d.ArcModel) {
            childModel.getSourceModel().addConnectionModel(childModel);
        }

        else {
            obj[attName] = (typeof obj[attName] === 'boolean') ? (childModel === 'true') : childModel;
        }
        counter++;
    }
    var attributes = node.attributes;
    for (var ii = 0; ii < attributes.length; ii++) {
        var childAtt = attributes.item(ii);
        obj[childAtt.nodeName] = (typeof obj[childAtt.nodeName] === 'boolean') ? (childAtt.nodeValue === 'true') : childAtt.nodeValue;
    }

    return obj;
};
