var Helpers = require('./helpers');
var State = require('./state');
var title = require('./title');
var imagesLoaded = require("imagesloaded");
var imageTemplate = require("../templates/image.hbs");
var videoTemplate = require("../templates/video.hbs");
var albumTemplate = require("../templates/imgur-album.hbs");
var subredditErrorTemplate = require("../templates/subreddit-error.hbs");

var itemQueue = [];

var addItem = function(item, loadImmediately) {
  var url = item.data.url;
  var processedUrl = Helpers.processUrl(url);
  var templateData = {};
  templateData.data = item.data;
  templateData.processedUrl = processedUrl;
  templateData.isFirst = $(".item.present").length == 0;
  templateData.loadImmediately = $(".item").length <= 5;
  switch (Helpers.getMediaType(processedUrl)) {
    case "image":
      addImage(templateData);
      break;
    case "imgur-album":
      addImgurAlbum(templateData);
      break;
    case "imgur-gallery":
      addImgurGallery(templateData);
      break;
    case "imgur-gifv":
      addImgurGifv(templateData);
      break;
    default:
      console.log("Unsupported url encountered: " + url);
      break;
  }
}

var addImgurGifv = function(templateData) {
  var url = templateData['data']['url'];
  templateData.mp4url = url.replace("gifv", "mp4");
  templateData.webmurl = url.replace("gifv", "webm");
  addVideo(templateData);
}

var addVideo = function(templateData) {
  var html = videoTemplate(templateData);
  $(html).appendTo($("#wrapper"));
  if ((templateData).isFirst) {
    $(".item.present.video").children("video").get(0).play();
  }
}

var addImage = function(templateData) {
  html = imageTemplate(templateData);
  $(html).appendTo("#wrapper");
}

var addImgurAlbum = function(templateData) {
  var url = templateData.data.url;
  var id = url.split('/a/')[1];
  $.ajax({
    url: "https://api.imgur.com/3/album/" + id,
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Client-ID ddf12e5f849636a");
    },
    success: function(resp) {
      var data = resp.data;
      data.url = templateData.data.url;
      data.permalink = templateData.data.permalink;
      data.title = templateData.data.title;
      var html = albumTemplate(data);
      $(html).appendTo("#wrapper");
    }
  });
}

var addImgurGallery = function(templateData) {
  var url = templateData.data.url;
  var id = url.split('/gallery/')[1];
  $.ajax({
    url: "https://api.imgur.com/3/gallery/" + id,
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Client-ID ddf12e5f849636a");
    },
    success: function(resp) {
      var data = resp.data;
      data.url = templateData.data.url;
      data.permalink = templateData.data.permalink;
      data.title = templateData.data.title;
      var html = albumTemplate(data);
      $(html).appendTo("#wrapper");
    }
  });
}

var download = function(path, qs, afterId) {
  var $subredditError = $("#subreddit-error");
  $subredditError.hide();
  var url = buildUrl(path, qs, afterId);
  $.ajax({
    url: url,
    dataType: "json",
    success: function(resp) {
      downloadCompleteHandler(resp);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      var templateData = {};
      templateData.subreddit = path.split("/")[2];
      var html = subredditErrorTemplate(templateData);
      $subredditError.html(html).show();
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
    title.update();
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
