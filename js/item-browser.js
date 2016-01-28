var Data = require('./data');
var State = require('./state');

$albumCounter = $("#album-counter");

var nextItem = function() {
  var $presentItem = $("#wrapper").children(".item.present");
  var $nextItem = $presentItem.next();
  if ($presentItem.length == 0 || $nextItem.length == 0) {
    return;
  }

  $presentItem.removeClass("present").addClass("past");
  $nextItem.removeClass("future").addClass("present");

  if ($nextItem.hasClass("imgur-album")) {
    showAlbumIndex($nextItem.children(":eq(0)"), true);
  } else {
    hideAlbumIndex();
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

  if ($prevItem.hasClass("imgur-album")) {
    showAlbumIndex($prevItem.children(":eq(0)"), true);
  } else {
    hideAlbumIndex();
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

  showAlbumIndex($nextItem, false);
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

  showAlbumIndex($prevItem, false);
}

var showAlbumIndex = function($image, flashBig) {
  $albumCounter
    .text($image.data("index") + "/" + $image.parent().data("length"))
    .addClass(flashBig ? "obvious" : "")
    .addClass("visible")
  setTimeout(function() {
    $albumCounter.removeClass("obvious");
  }, 500);
}

var hideAlbumIndex = function() {
  $albumCounter.removeClass("visible").removeClass("stealth");
}

module.exports = {
  nextItem: nextItem,
  prevItem: prevItem,
  nextImgurAlbumImage: nextImgurAlbumImage,
  prevImgurAlbumImage: prevImgurAlbumImage
}
