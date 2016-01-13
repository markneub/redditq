var nextItem = function() {
  var $currActive = $("#wrapper").children(".active");
  if ($currActive.length == 0 || $currActive.next().length == 0) {
    return;
  }
  $("#wrapper").children(".active").removeClass("active").next().addClass("active");
}

var prevItem = function() {
  var $currActive = $("#wrapper").children(".active");
  if ($currActive.length == 0 || $currActive.prev().length == 0) {
    return;
  }
  $("#wrapper").children(".active").removeClass("active").prev().addClass("active");
}

module.exports = {
  nextItem: nextItem,
  prevItem: prevItem
}
