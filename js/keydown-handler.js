var ItemBrowser = require("./item-browser");

var KEYS = {
  R_KEY: 82,

  // arrow keys to navigate items
  UP_KEY: 38,
  RIGHT_KEY: 39,
  DOWN_KEY: 40,
  LEFT_KEY: 37,

  // use WDSA keys as aliases for arrow keys for left-handed operation
  W_KEY: 87,
  D_KEY: 68,
  S_KEY: 83,
  A_KEY: 65
};

$(document).keydown(function(e) {
  switch (e.which) {
    case KEYS.R_KEY:
      //
      break;
    case KEYS.UP_KEY:
    case KEYS.W_KEY:
      //
      break;
    case KEYS.RIGHT_KEY:
    case KEYS.D_KEY:
      ItemBrowser.nextItem();
      break;
    case KEYS.DOWN_KEY:
    case KEYS.S_KEY:
      //
      break;
    case KEYS.LEFT_KEY:
    case KEYS.A_KEY:
      ItemBrowser.prevItem();
      break;
  }
});
