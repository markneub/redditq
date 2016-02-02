var Data = require('./data');
var State = require('./state');
var albumCounter = require('./album-counter');
var subredditNavigator = require("./subredditnavigator");

var nextItem = function() {
  var $presentItem = $("#wrapper").children(".item.present");
  var $nextItem = $presentItem.next();
  if ($presentItem.length == 0 || $nextItem.length == 0) {
    return;
  }

  subredditNavigator.hide();

  $presentItem.removeClass("present").addClass("past");
  $nextItem.removeClass("future").addClass("present");

  if ($nextItem.hasClass("imgur-album")) {
    albumCounter.show($nextItem.children(".imgur-album-image.present"), true);
  } else {
    albumCounter.hide();
  };
  Data.loadImages();

  // download more images if we're close to the end
  if ($nextItem.next().next().length === 0) {
    Data.download(location.pathname, location.search, State.afterId);
  }
}

var prevItem = function() {
  var $presentItem = $("#wrapper").children(".item.present");
  var $prevItem = $presentItem.prev();

  if ($presentItem.length == 0 || $prevItem.length == 0) {
    return;
  }

  subredditNavigator.hide();

  if ($prevItem.hasClass("imgur-album")) {
    albumCounter.show($prevItem.children(".imgur-album-image.present"), true);
  } else {
    albumCounter.hide();
  };

  $presentItem.removeClass("present").addClass("future");
  $prevItem.removeClass("past").addClass("present");
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
}

var showOriginal = function() {
  var $el = $(".item.present");
  var $link = $("<a />")
                .css("display", "none")
                .attr("target", "_blank")
                .attr("href", $el.data("original"));
  $link.appendTo("body")[0].click();
  $link.remove();
}

module.exports = {
  nextItem: nextItem,
  prevItem: prevItem,
  nextImgurAlbumImage: nextImgurAlbumImage,
  prevImgurAlbumImage: prevImgurAlbumImage,
  showOriginal: showOriginal
}
