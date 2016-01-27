var Data = require('./data');
var State = require('./state');

var nextItem = function() {
  var $presentItem = $("#wrapper").children(".item.present");
  var $nextItem = $presentItem.next();
  if ($presentItem.length == 0 || $nextItem.length == 0) {
    return;
  }

  $presentItem.removeClass("present").addClass("past");
  $nextItem.removeClass("future").addClass("present");

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
}

module.exports = {
  nextItem: nextItem,
  prevItem: prevItem,
  nextImgurAlbumImage: nextImgurAlbumImage,
  prevImgurAlbumImage: prevImgurAlbumImage
}
