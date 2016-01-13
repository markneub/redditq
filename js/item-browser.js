var TweenLite = require('./vendor/TweenLite');
var CSSPlugin = require('./vendor/CSSPlugin');

var transitionSpeed = 0.3;

var nextItem = function() {
  var $currActive = $("#wrapper").children(".active");
  if ($currActive.length == 0 || $currActive.next().length == 0) {
    return;
  }

  var $activeItem = $("#wrapper").children(".active.item");
  var $nextItem = $activeItem.next();

  TweenLite.to($nextItem, 0, {
    x: "100%",
    opacity: 1
  });
  TweenLite.to($activeItem, transitionSpeed, {
    x: "-100%"
  });
  TweenLite.to($nextItem, transitionSpeed, {
    x: "0%",
    onComplete: function() {
      $activeItem.removeClass("active");
      $nextItem.addClass("active");
    }
  });
}

var prevItem = function() {
  var $currActive = $("#wrapper").children(".active");
  if ($currActive.length == 0 || $currActive.prev().length == 0) {
    return;
  }

  var $activeItem = $("#wrapper").children(".active.item");
  var $prevItem = $activeItem.prev();

  TweenLite.to($prevItem, 0, {
    x: "-100%",
    opacity: 1
  });
  TweenLite.to($activeItem, transitionSpeed, {
    x: "100%"
  });
  TweenLite.to($prevItem, transitionSpeed, {
    x: "0%",
    onComplete: function() {
      $activeItem.removeClass("active");
      $prevItem.addClass("active");
    }
  });
}

module.exports = {
  nextItem: nextItem,
  prevItem: prevItem
}
