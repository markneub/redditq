var Helpers = require('./helpers');
var Data = require('./data');
var State = require('./state');
var albumCounter = require('./album-counter');
var subredditNavigator = require("./subredditnavigator");
var title = require('./title');

var nextItem = function() {
  var $presentItem = $("#wrapper").children(".item.present");
  var $nextItem = $presentItem.next();
  if ($presentItem.length == 0 || $nextItem.length == 0) {
    return;
  }

  subredditNavigator.hide();

  $presentItem.removeClass("present").addClass("past");
  $nextItem.removeClass("future").addClass("present");

  // handle imgur album
  if ($nextItem.hasClass("imgur-album")) {
    albumCounter.show($nextItem.children(".imgur-album-image.present"), true);
  } else {
    albumCounter.hide();
  };
  Data.loadImages();

  // handle video
  if ($nextItem.hasClass("video")) {
    var videoEl = $nextItem.children("video").get(0);
    videoEl.currentTime = 0;
    videoEl.play();
  }

  // download more images if we're close to the end
  if ($nextItem.next().next().length === 0) {
    Data.download(location.pathname, location.search, State.afterId);
  }

  setVisibleImages(false);
  title.update();
}

var prevItem = function() {
  var $presentItem = $("#wrapper").children(".item.present");
  var $prevItem = $presentItem.prev();

  if ($presentItem.length == 0 || $prevItem.length == 0) {
    return;
  }

  subredditNavigator.hide();

  // imgur album
  if ($prevItem.hasClass("imgur-album")) {
    albumCounter.show($prevItem.children(".imgur-album-image.present"), true);
  } else {
    albumCounter.hide();
  };

  // handle video
  if ($prevItem.hasClass("video")) {
    var videoEl = $prevItem.children("video").get(0);
    videoEl.currentTime = 0;
    videoEl.play();
  }

  $presentItem.removeClass("present").addClass("future");
  $prevItem.removeClass("past").addClass("present");

  setVisibleImages(false);
  title.update();
}

var nextImgurAlbumImage = function() {
  var $presentItem = $("#wrapper")
    .children(".item.present")
    .children(".imgur-album-image.present");
  var $nextItem = $presentItem.next();
  if ($presentItem.length == 0 || $nextItem.length == 0) {
    return;
  }

  $presentItem.removeClass("present").addClass("past");
  $nextItem.removeClass("future").addClass("present");

  albumCounter.show($nextItem, false);

  setVisibleImages(true);
}

var prevImgurAlbumImage = function() {
  var $presentItem = $("#wrapper")
    .children(".item.present")
    .children(".imgur-album-image.present");
  var $prevItem = $presentItem.prev();

  if ($presentItem.length == 0 || $prevItem.length == 0) {
    return;
  }

  $presentItem.removeClass("present").addClass("future");
  $prevItem.removeClass("past").addClass("present");

  albumCounter.show($prevItem, false);

  setVisibleImages(true);
}

var showImage = function() {
  var $el = $(".item.present");
  if ($el.hasClass("imgur-album")) {
    $el = $(".item.present").children(".imgur-album-image.present");
  }
  Helpers.openLinkInNewTab($el.data("url"));
}

var showOriginal = function() {
  var $el = $(".item.present");
  Helpers.openLinkInNewTab($el.data("original"));
}

// only keep current and nearby images in memory
var setVisibleImages = function(isAlbum) {
  var $presentItem;
  if (isAlbum) {
    $presentItem = $("#wrapper").children(".item.present").children(".imgur-album-image.present");
  } else {
    $presentItem = $("#wrapper").children(".item.present");
  }
  $presentItem.add($presentItem.next())
              .add($presentItem.next().next())
              .add($presentItem.prev())
              .add($presentItem.prev().prev())
  .each(function(i, e) {
    if ($(this).hasClass(isAlbum ? "imgur-album-image" : "image")) {
      $(this).css("background-image", "url(" + $(this).data("url") + ")");
    }
  });

  $presentItem.prev().prev().prev(isAlbum ? ".imgur-album-image" : ".image").add($presentItem.next().next().next(isAlbum ? ".imgur-album-image" : ".image")).css("background-image", "");
}

var showRedditComments = function() {
  var $el = $(".item.present");
  Helpers.openLinkInNewTab('https://www.reddit.com' + $el.data("permalink"));
}

module.exports = {
  nextItem: nextItem,
  prevItem: prevItem,
  nextImgurAlbumImage: nextImgurAlbumImage,
  prevImgurAlbumImage: prevImgurAlbumImage,
  showImage: showImage,
  showOriginal: showOriginal,
  showRedditComments: showRedditComments
}
