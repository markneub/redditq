var $title = $("#title");
var $wrapper = $("#wrapper");

var updateCounter = 0;
var update = function() {
  var newTitle = $(".item.present").data("title");
  if (!newTitle && updateCounter < 40) {
    setTimeout(function() {
      updateCounter++;
      update();
    }, 50);
  } else {
    updateCounter = 0;
    $title.html($(".item.present").data("title"));
  }
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

var clear = function() {
  $title.html("");
}

module.exports = {
  update: update,
  toggle: toggle,
  clear: clear
}