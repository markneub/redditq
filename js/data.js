var Helpers = require('./helpers');
var State = require('./state');
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
  if ($("#wrapper").children(".item.present").length === 0) {
    var $firstItem = $("#wrapper").children(":first-child");
    $firstItem.removeClass("future").addClass("present");
    $firstItem.next().addClass("ondeck");
  }
}

var download = function(path, qs, afterId) {
  var url = buildUrl(path, qs, afterId);
  reqwest({
    url: url,
    type: 'jsonp',
    jsonpCallback: 'jsonp',
    success: function(resp) {
      downloadCompleteHandler(resp);
    }
  })
};

function buildUrl(path, qs, afterId) {
  afterId = afterId || "";
  return "https://www.reddit.com" + path + ".json" + (qs === "" ? "?foo=bar" : qs) + (afterId === "" ? "" : "&after=" + afterId);
};

var downloadCompleteHandler = function(result) {
  State.afterId = result.data.after;
  var children = result.data.children;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    itemQueue.push(child);
  }
  if (itemQueue.length > 0) {
    addItem(itemQueue.shift());
    loadImages();
  }
};

var loadImages = function() {
  if (itemQueue.length === 0) {
    return;
  }
  // Preload a maximum of 5 images ahead, each after the previous one is done loading
  var $activeItem = $('#wrapper').children('.item.present');
  if ($activeItem.nextAll().length >= 4) {
    return;
  }
  $('#wrapper').imagesLoaded({ background: '.item' }, function() {
    if (itemQueue.length > 0) {
      addItem(itemQueue.shift());
      loadImages();
    }
  });
}

module.exports = {
  download: download,
  loadImages: loadImages
}
