var template = require("../templates/subreddit-navigator.hbs");
var Data = require("./data");
var Helpers = require("./helpers");
var albumCounter = require("./album-counter");
var title = require('./title');

var $subredditNavigator = $("#subreddit-navigator");

var show = function() {
  // get characteristics of current subreddit view
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
    $(".sort-chooser.t")
      .addClass("visible")
      .children().each(function(i, e) {
        $(this).attr("tabindex", $(this).data("tabindex"));
    });
  } else {
    $(".sort-chooser.t").removeClass("visible");
  }

  $(".sort-chooser.sort .choice").on("click", function(e) {
    if ($(this).is("#top")) {
      $(".sort-chooser.t")
        .addClass("visible")
        .children()
        .each(function(i, e) {
          $(this).attr("tabindex", $(this).data("tabindex"));
        });
    } else {
      $(".sort-chooser.t").removeClass("visible").children().attr("tabindex", "-1");
    }
  });

  var keys = {
    RETURN_KEY: 13,
    SPACE_KEY: 32
  };

  $subredditNavigator.find("a.choice, #view-btn").on("keypress", function(e) {
    // if the user presses the space bar on a link-button, treat as a click on that item
    if (e.which == keys.SPACE_KEY) {
      $(this).trigger("click");
    }
  }).add("input").on("keypress", function(e){
    // if the user presses the return key while the text input or a link-button is focused, treat as a click on that item followed by a submit
    if (e.which == keys.RETURN_KEY) {
      $(this).trigger("click");
      setTimeout(function(){
        $("#view-btn").trigger("click");
      }, 150);
    }
  });

  $("#view-btn").click(function(e){
    var sort = $(".sort .choice.active").attr("id");
    var subreddit = $("#subreddit").val();
    var newPath = subreddit == "" ? "/" + sort : "/r/" + subreddit + "/" + sort;
    var qs = sort == "top" ? "?sort=top&t=" + $(".t .choice.active").attr("id") : "";
    var newHref = newPath + qs;
    if (history && history.pushState) {
      albumCounter.hide();
      Data.clear();
      history.pushState({}, "", newHref);
      Data.download(newPath, qs);
      hide();
      title.clear();
    } else {
      location.href = newHref;
    }
  });

  setTimeout(function(){
    $subredditNavigator.find("input").focus();
  }, 1);

  // clicking on the page while the subreddit navigator is open should close it
  // but not if the click happens to be on the navigator itself
  $subredditNavigator.on("click", function(e) {
    e.stopPropagation();
  });
}

var hide = function() {
  $subredditNavigator.removeClass("visible");
  document.activeElement.blur();
}

var isVisible = function() {
  return $subredditNavigator.hasClass("visible");
}

module.exports = {
  show: show,
  hide: hide,
  isVisible: isVisible
}