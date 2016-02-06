var $title = $("#title");
var $wrapper = $("#wrapper");

var update = function() {
  $title.html($(".item.present").data("title"));
}

var hide = function() {
  $title.removeClass("visible");
  $wrapper.removeClass("title");
}

var show = function() {
  update();
  $title.addClass("visible");
  $wrapper.addClass("title");
}

var isVisible = function() {
  return $title.hasClass("visible");
}

var toggle = function() {
  if (isVisible()) hide()
  else show();
}

module.exports = {
  update: update,
  toggle: toggle
}