draw2d.Configuration = function () {
};

// Set this flag to show some additional properties in the PropertyPanel
// Like PNPlace.DBID,....
//
draw2d.Configuration.DEBUG = true;


// Modify this file or override the settings in your JS file
// before other draw2d files are loaded
//
draw2d.Configuration.THEME = "default";
draw2d.Configuration.APP_PATH = "";
draw2d.Configuration.IMAGEPATH = "./theme/" + draw2d.Configuration.THEME + "/images/";
draw2d.Configuration.GET_XML = "./getFile.php";
draw2d.Configuration.SAVE_XML = "./saveFile.php";

// enable/disable the apply button.
//draw2d.Configuration.APPLY_XML=null;
draw2d.Configuration.APPLY_XML = "./applyFile.php";

// delay to wait before automatic, asynchron save of the model.
// -1 => disable autosave
//draw2d.Configuration.AUTOSAVE_IN_SECONDS=-1;
draw2d.Configuration.AUTOSAVE_IN_SECONDS = 4;

// Some default values for network objects instantiation
//
draw2d.Configuration.DEFAULT_NETWORK_NAME = "Virtual Network";
draw2d.Configuration.DEFAULT_PNEVENT_NAME = "Event";

draw2d.Configuration.DEFAULT_PLACE_NAME = "Place";
draw2d.Configuration.DEFAULT_PLACE_CAPACITY = 0;
/* 0=unlimited */
draw2d.Configuration.DEFAULT_PLACE_TOKENS = 0;
draw2d.Configuration.DEFAULT_PLACE_TYPE = "normal";

draw2d.Configuration.DEFAULT_TRANSITION_NAME = "Transition";
draw2d.Configuration.DEFAULT_TRANSITION_RATE = 1.0;
draw2d.Configuration.DEFAULT_TRANSITION_WEIGHT = 1.0;
draw2d.Configuration.DEFAULT_TRANSITION_PRIORITY = 1;
draw2d.Configuration.DEFAULT_TRANSITION_TIMING = "Immediate";

draw2d.Configuration.DEFAULT_IMAGE_NAME = "Image";
draw2d.Configuration.DEFAULT_IMAGE_FILENAME = null;
draw2d.Configuration.DEFAULT_IMAGE_IMAGETYPE = null;
draw2d.Configuration.DEFAULT_IMAGE_WRITEBACK = null;
draw2d.Configuration.DEFAULT_IMAGE_ORDER = 1;
draw2d.Configuration.DEFAULT_IMAGE_BOOTORDER = null;
draw2d.Configuration.DEFAULT_IMAGE_READONLY = null;
draw2d.Configuration.DEFAULT_ARC_WEIGHT = 1;
draw2d.Configuration.DEFAULT_P2T_WEIGHT = 1;
draw2d.Configuration.DEFAULT_P2T_TYPE = "normal";
draw2d.Configuration.DEFAULT_PNMESSAGE_NAME = "Message";
draw2d.Configuration.DEFAULT_PNMESSAGE_SERVICE = "ACD";
draw2d.Configuration.DEFAULT_PNMESSAGE_TYPE = "Ping";


draw2d.ImageTemplates = [
    {
        "name":"Debian",
        "file-name":"file1.iso",
        "image-type":"cdrom",
        "writeback":"none",
        "readonly":"true",
        "icon":draw2d.Configuration.IMAGEPATH + "image_debian.png"
    },
    {
        "name":"Gentoo",
        "file-name":"file2.iso",
        "image-type":"fdd",
        "writeback":"none",
        "readonly":"false",
        "icon":draw2d.Configuration.IMAGEPATH + "image_gentoo.png"
    },
    {
        "name":"My OS",
        "file-name":"file2.iso",
        "image-type":"fdd",
        "writeback":"none",
        "readonly":"false"
    },
    {
        "name":"Fedora",
        "file-name":"file2.iso",
        "image-type":"fdd",
        "writeback":"none",
        "readonly":"false",
        "icon":draw2d.Configuration.IMAGEPATH + "image_fedora.png"
    },
    {
        "name":"Mepis",
        "file-name":"file2.iso",
        "image-type":"fdd",
        "writeback":"none",
        "readonly":"false",
        "icon":draw2d.Configuration.IMAGEPATH + "image_mepis.png"
    },
    {
        "name":"Red Hat",
        "file-name":"file2.iso",
        "image-type":"fdd",
        "writeback":"none",
        "readonly":"false",
        "icon":draw2d.Configuration.IMAGEPATH + "image_redhat.png"
    },
    {
        "name":"Suse",
        "file-name":"file2.iso",
        "image-type":"fdd",
        "writeback":"none",
        "readonly":"false",
        "icon":draw2d.Configuration.IMAGEPATH + "image_suse.png"
    },
    {
        "name":"Ubuntu",
        "file-name":"file2.iso",
        "image-type":"fdd",
        "writeback":"none",
        "readonly":"false",
        "icon":draw2d.Configuration.IMAGEPATH + "image_ubuntu.png"
    },
    {
        "name":"Xandros",
        "file-name":"file2.iso",
        "image-type":"fdd",
        "writeback":"none",
        "readonly":"false",
        "icon":draw2d.Configuration.IMAGEPATH + "image_xandros.png"
    },
    {
        "name":"Music Sampler 1",
        "file-name":"file2.iso",
        "image-type":"cdrom",
        "writeback":"none",
        "readonly":"true",
        "icon":draw2d.Configuration.IMAGEPATH + "image_mymusic.png"
    }
];


// I18N Definitions
//
draw2d.I18N = function () {
};

draw2d.I18N.PALETTE_OBJECT_HEADER = "Workflow Objects";
draw2d.I18N.PALETTE_OBJECT_PNPLACE_LABEL = "Place";
draw2d.I18N.PALETTE_OBJECT_PNPLACE_TOOLTIP = "Drag the place element into the Petri net canvas";
draw2d.I18N.PALETTE_OBJECT_PNMESSAGE_TOOLTIP = "Drag the message element into the Petri net canvas";
draw2d.I18N.PALETTE_OBJECT_PNMESSAGE_LABEL = "Message";
draw2d.I18N.PALETTE_OBJECT_TRANSITION_LABEL = "Transition";
draw2d.I18N.PALETTE_OBJECT_TRANSITION_TOOLTIP = "Drag the transition element into the Petri net canvas";
draw2d.I18N.PALETTE_OBJECT_PNEVENT_LABEL = "Receive Message";
draw2d.I18N.PALETTE_OBJECT_PNEVENT_TOOLTIP = "Drag the Send Message element into the Petri net canvas";
draw2d.I18N.PALETTE_OBJECT_PNEVENT_LABEL = "Event";
draw2d.I18N.PALETTE_OBJECT_PNEVENT_TOOLTIP = "Drag the Event element into the Petri net canvas";

draw2d.I18N.PROPERTYPANEL_HEADER_DEFAULT = "Workflow Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_ARC = "Arc Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_P2T = "Connector Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_PLACE = "Place Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_PNEVENT = "Event Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_PNMESSAGE = "Message Properties";
draw2d.I18N.PROPERTYPANEL_HEADER_TRANSITION = "Transition Properties";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_NAME = "Name";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_WEIGHT = "Weight";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_TOKENS = "Tokens";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_CAPACITY = "Capacity";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_PLACE_TYPE = "Type";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_RATE = "Rate";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_WEIGHT = "Weight";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_PRIORITY = "Priority";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_TIMING = "Timing";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGES = "Installed Images";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_BOOTORDER = "Boot Order:";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_FILENAME = "File Name:";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_TYPE = "Type:";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_WRITEBACK = "Writeback:";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_IMAGE_READONLY = "Readonly:";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_SERVICE = "Service";
draw2d.I18N.PROPERTYPANEL_PROPERTYLABEL_MSGTYPE = "Type";

draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_PLACE_TOKENS = "Tokens:";
draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_PLACE_CAPACITY = "Capacity:";

draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_TRANSITION_RATE = "Rate:";
draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_TRANSITION_WEIGHT = "Weight:";
draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_TRANSITION_PRIORITY = "Priority:";
draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_TRANSITION_TIMING = "Timing:";
draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_PNMESSAGE_SERVICE = "Service:";
draw2d.I18N.PROPERTYPANEL_FIGURE_LABEL_PNMESSAGE_MSGTYPE = "Type:";

draw2d.I18N.ERRORMESSAGE_NULL_MODEL = "Unable to load workflow configuration from Cloud";
draw2d.I18N.ERRORMESSAGE_WRONG_MODELURL = "Unable to load workflow configuration from: ";
draw2d.I18N.ERRORMESSAGE_APPLY_ERROR_404 = "Unable to apply workflow configuration.";
draw2d.I18N.ERRORMESSAGE_SAVE_ERROR_404 = "Unable to save workflow configuration.";

draw2d.I18N.TOOLTIP_BUTTON_ADD_IMAGE = "Add an additional Image to the Server";
draw2d.I18N.TOOLTIP_BUTTON_REMOVE_IMAGE = "Remove Image from Server";

draw2d.I18N.DIALOG_ADDIMAGE_HEADER = "Select Image to Add";
draw2d.I18N.DIALOG_ADDIMAGE_OK = "Select";
draw2d.I18N.DIALOG_ADDIMAGE_CANCEL = "Cancel";

draw2d.I18N.TOOLBAR_BUTTON_SAVE_XML = "Save";
draw2d.I18N.TOOLBAR_BUTTON_APPLY_XML = "Apply";
draw2d.I18N.TOOLBAR_BUTTON_SHOW_XML = "Show XML";
draw2d.I18N.TOOLBAR_BUTTON_UNDO = "Undo";
draw2d.I18N.TOOLBAR_BUTTON_REDO = "Redo";


