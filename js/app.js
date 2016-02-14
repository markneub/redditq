require("normalize.css");
require("../scss/app.scss");

require("./input-handler");
var Data = require("./data");
var ItemBrowser = require("./item-browser");

var path = location.pathname;
var qs = location.search;

Data.download(path, qs);

// test ajax
// https://gfycat.com/cajax/get/ScaryGrizzledComet
$.ajax({
  url: "https://gfycat.com/cajax/get/ScaryGrizzledComet",
  dataType: "json",
  success: function(resp) {
    console.debug(resp);
  }
});