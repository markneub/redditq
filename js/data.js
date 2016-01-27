var Helpers = require('./helpers');
var State = require('./state');
var imagesLoaded = require("imagesloaded");
var imageTemplate = require("../templates/image.hbs");

var itemQueue = [];

var addItem = function(child) {
  var data = child.data;
  var url = Helpers.processUrl(data.url);
  data.url = url;
  var html = "";
  switch (Helpers.getMediaType(url)) {
    case "imgur-album":
      addImgurAlbum(url);
      break;
    case "image":
      addImage(data);
      break;
    default:
      break;
  }
}

var addImgurAlbum = function(url) {
  var id = url.split('/a/')[1];
  $.ajax({
    url: "https://api.imgur.com/3/album/" + id,
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Client-ID ddf12e5f849636a");
    },
    success: function(resp) {
      var data = resp.data;
      var albumTemplate = require("../templates/imgur-album.hbs");
      var html = albumTemplate(data);
      $(html).appendTo("#wrapper");
    }
  });
}

var addImage = function(data) {
  html = imageTemplate(data);
  $(html).appendTo("#wrapper");
  if ($("#wrapper").children(".item.present").length === 0) {
    var $firstItem = $("#wrapper").children(":first-child");
    $firstItem.removeClass("future").addClass("present");
  }
}

var download = function(path, qs, afterId) {
  var url = buildUrl(path, qs, afterId);
  $.ajax({
    url: url,
    dataType: "json",
    success: function(resp) {
      downloadCompleteHandler(resp);
    }
  });
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
