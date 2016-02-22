var itemBrowser = require("./item-browser");
var subredditNavigator = require("./subredditnavigator");
var title = require('./title');
var screenfull = require('screenfull');
var video = require('./video');

var KEYS = {
  // show/hide subreddit navigator
  R_KEY: 82,

  // hide subreddit navigator
  ESC_KEY: 27,

  // arrow keys to navigate items
  UP_KEY: 38,
  RIGHT_KEY: 39,
  DOWN_KEY: 40,
  LEFT_KEY: 37,

  // use WDSA keys as aliases for arrow keys for left-handed operation
  W_KEY: 87,
  D_KEY: 68,
  S_KEY: 83,
  A_KEY: 65,

  // i key for "image"
  I_KEY: 73,

  // o for "original"
  O_KEY: 79,

  // show reddit comments/permalink
  C_KEY: 67,
  P_KEY: 80,

  // toggle submission title
  T_KEY: 84,

  // toggle fullscreen
  F_KEY: 70,

  // pause/play video
  SPACEBAR_KEY: 32
};

$(document).keydown(function(e) {
  // console.log(e.which);
  if (!e.metaKey) {  // ignore key commands if cmd or ctrl is depressed at the same time
    switch (e.which) {
      case KEYS.R_KEY:
        if (subredditNavigator.isVisible()) subredditNavigator.hide();
        else subredditNavigator.show();
        break;
      case KEYS.ESC_KEY:
        subredditNavigator.hide();
        break;
      case KEYS.UP_KEY:
      case KEYS.W_KEY:
        itemBrowser.prevImgurAlbumImage();
        break;
      case KEYS.RIGHT_KEY:
      case KEYS.D_KEY:
        itemBrowser.nextItem();
        break;
      case KEYS.DOWN_KEY:
      case KEYS.S_KEY:
        itemBrowser.nextImgurAlbumImage();
        break;
      case KEYS.LEFT_KEY:
      case KEYS.A_KEY:
        itemBrowser.prevItem();
        break;
      case KEYS.O_KEY:
        itemBrowser.showOriginal();
        break;
      case KEYS.C_KEY:
      case KEYS.P_KEY:
        itemBrowser.showRedditComments();
        break;
      case KEYS.T_KEY:
        title.toggle();
        break;
      case KEYS.F_KEY:
        if (screenfull.enabled) {
          if (screenfull.isFullscreen) screenfull.exit();
          else screenfull.request();
        }
        break;
      case KEYS.SPACEBAR_KEY:
        if (video.isPresentItem()) {
          video.togglePlayPause();
        }
        break;
    }
  }
});

// ignore all keypresses on input fields except for esc
// i.e. don't respond to keypress handlers when typing input,
// but close subreddit navigator when esc is pressed
$(document).on('keydown', 'input', function(e) {
  if (e.which != KEYS.ESC_KEY) {
    e.stopPropagation();
  }
});

$(document).on('click', function(e) {
  // hide subreddit navigator when clicking on the page
  // stopping event propagation is handled in subredditnavigator.js
  subredditNavigator.hide();
});
