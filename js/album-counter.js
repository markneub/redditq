$albumCounter = $("#album-counter");
var albumCounterObviousTimer = 0;

var show = function($image, emphasize) {
  clearTimeout(albumCounterObviousTimer);
  $albumCounter
    .text($image.data("index") + "/" + $image.parent().data("length"))
    .addClass(emphasize ? "emphasis" : "")
    .addClass("visible")
  albumCounterObviousTimer = setTimeout(function() {
    $albumCounter.removeClass("emphasis");
  }, 500);
}

var hide = function() {
  $albumCounter.removeClass("visible").removeClass("emphasis");
}

module.exports = {
  show: show,
  hide: hide
}