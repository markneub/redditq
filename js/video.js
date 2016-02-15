isPresentItem = function() {
  return $(".item.present.video").length == 1;
}

var togglePlayPause = function() {
  var videoEle = $(".item.present.video").children("video").get(0);
  if (videoEle.paused) {
    videoEle.play();
  } else {
    videoEle.pause();
  }
}

module.exports = {
  isPresentItem: isPresentItem,
  togglePlayPause: togglePlayPause
}