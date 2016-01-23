require("../scss/subredditnavigator.scss");
var template = require("../templates/subredditnavigator.hbs");

var show = function() {
  var html = template();
  $("body").append(html);
  $("#subreddit-navigator").fadeIn(300);
}

var hide = function() {
  $("#subreddit-navigator").fadeOut(150, function() {
    $(this).remove();
  });
}

var isVisible = function() {
  return $("#subreddit-navigator").length > 0;
}

module.exports = {
  show: show,
  hide: hide,
  isVisible: isVisible
}
