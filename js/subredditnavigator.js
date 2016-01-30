var urijs = require("urijs");
require("../scss/subredditnavigator.scss");
var template = require("../templates/subreddit-navigator.hbs");
var Data = require("./data");
var Helpers = require("./helpers");
var albumCounter = require("./album-counter");

var $subredditNavigator = $("#subreddit-navigator");

var show = function() {
  var subreddit = location.pathname.split("/")[2];
  var sort = location.pathname.split("/")[3] || "hot";
  var t = Helpers.getParameterByName("t") || "week";

  var html = template();
  $subredditNavigator.html(html).addClass("visible");

  $("#subreddit").val(location.pathname.split("/")[2]);
  $("#" + sort).addClass("active");
  $("#" + t).addClass("active");

  $(".sort-chooser .choice").on("click", function(e){
    $(this).addClass('active').siblings().removeClass("active");
  });

  if ($("#top").hasClass("active")) {
    $(".sort-chooser.t").addClass("visible");
  } else {
    $(".sort-chooser.t").removeClass("visible");
  }

  $(".sort-chooser.sort .choice").on("click", function(e) {
    if ($(this).is("#top")) {
      $(".sort-chooser.t").addClass("visible");
    } else {
      $(".sort-chooser.t").removeClass("visible");
    }
  });

  $("#view-btn").click(function(e){
    var sort = $(".sort .choice.active").attr("id");
    var t = sort == "top" ? "?t=" + $(".t .choice.active").attr("id") : "";
    var newHref = "/r/" + $("#subreddit").val() + "/" + sort + t;
    if (history && history.pushState) {
      albumCounter.hide();
      Data.clear();
      history.pushState({}, "", newHref);
      Data.download("/r/" + $("#subreddit").val() + "/" + sort, t);
      hide();
    } else {
      location.href = newHref;
    }
  });
}

var hide = function() {
  $subredditNavigator.removeClass("visible");
}

var isVisible = function() {
  return $subredditNavigator.hasClass("visible");
}

module.exports = {
  show: show,
  hide: hide,
  isVisible: isVisible
}