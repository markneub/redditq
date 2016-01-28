require("normalize.css");
require("../scss/app.scss");

require("./keydown-handler");
var Data = require("./data");
var ItemBrowser = require("./item-browser");

var path = location.pathname;
var qs = location.search;

Data.download(path, qs);
