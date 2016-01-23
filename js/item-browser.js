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
  var $prevPrevItem = $prevItem.prev();

  if ($presentItem.length == 0 || $prevItem.length == 0) {
    return;
  }

  $presentItem.removeClass("present").addClass("future");
  $prevItem.removeClass("past").addClass("present");
}

var updateOnDeck = function() {
  var $allItems = $("#wrapper").children(".item");
  $allItems.removeClass("ondeck");
  var $presentItem = $("#wrapper").children(".item.present");
  var $prevItem = $presentItem.prev();
  var $nextItem = $presentItem.next();
  $prevItem.addClass("ondeck");
  $nextItem.addClass("ondeck");
}

module.exports = {
  nextItem: nextItem,
  prevItem: prevItem
}
