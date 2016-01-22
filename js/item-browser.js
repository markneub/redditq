var TweenLite = require('./vendor/TweenLite');
var CSSPlugin = require('./vendor/CSSPlugin');
var Data = require('./data');

var transitionSpeed = 0.35;

var nextItem = function() {
  var $presentItem = $("#wrapper").children(".item.present");
  var $nextItem = $presentItem.next();
  if ($presentItem.length == 0 || $nextItem.length == 0) {
    return;
  }

  $presentItem.removeClass("present").addClass("past");
  $nextItem.removeClass("future").addClass("present");
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
