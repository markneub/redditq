var Helpers = require('./helpers');
var State = require('./state');
var imagesLoaded = require("imagesloaded");
var imageTemplate = require("../templates/image.hbs");

var itemQueue = [];

var addItem = function(item, loadImmediately) {
  var url = item.data.url;
  var templateData = {};
  templateData.data = item.data;
  templateData.processedUrl = Helpers.processUrl(url);
  templateData.isFirst = $(".item.present").length == 0;
  templateData.loadImmediately = $(".item").length <= 5;
  switch (Helpers.getMediaType(url)) {
    case "image":
      addImage(templateData);
      break;
    case "imgur-album":
      addImgurAlbum(item.data.url);
      break;
    default:
      console.log("Unsupported url encountered: " + url);
      break;
  }
}

var addImage = function(templateData) {
  html = imageTemplate(templateData);
  $(html).appendTo("#wrapper");
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

  var $activeItem = $('#wrapper').children('.item.present');
  if ($activeItem.nextAll().length < 4) {
    $('#wrapper').imagesLoaded({
      background: '.item'
    }, function() {
      addItem(itemQueue.shift());
      loadImages();
    });
  } else {
    for (i = 0; i < itemQueue.length; i++) {
      addItem(itemQueue.shift());
    }
  }
}

var clear = function() {
  itemQueue = [];
  $("#wrapper").empty();
}

module.exports = {
  download: download,
  loadImages: loadImages,
  clear: clear
}
