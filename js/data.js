var Helpers = require('./helpers');
var reqwest = require('reqwest');
var imagesLoaded = require("imagesloaded");
var ImageTemplate = require("../templates/image.hbs");

var itemQueue = [];

var addItem = function(child) {
  var data = child.data;
  var html = "";
  switch (Helpers.getMediaType(data.url)) {
    case "image":
      html = ImageTemplate(data);
      break;
    default:
      break;
  }
  $(html).appendTo("#wrapper");
  if ($("#wrapper").children(".active").length === 0) {
    $("#wrapper").children(":first-child").addClass("active");
  }
}

var download = function(path, qs, limit) {
  var url = buildUrl(path, qs, limit);
  reqwest({
    url: url,
    type: 'jsonp',
    jsonpCallback: 'jsonp',
    success: function(resp) {
      downloadCompleteHandler(resp);
    }
  })
};

function buildUrl(path, qs, limit) {
  return "https://www.reddit.com" + path + ".json" + (qs === "" ? "?foo=bar" : qs);
};

var downloadCompleteHandler = function(result) {
  var children = result.data.children;
  for (var i = 0; i < children.length; i++) {
    itemQueue.push(children[i]);
  }
  addItem(itemQueue.shift());
  loadImages();
};

var loadImages = function() {
  if (itemQueue.length === 0) {
    return;
  }
  // Preload each image after the previous one is done loading
  $('#wrapper').imagesLoaded({ background: '.item' }, function() {
    addItem(itemQueue.shift());
    loadImages();
  });
}

module.exports = {
  download: download
}
