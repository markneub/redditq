var Helpers = require('./helpers');
var reqwest = require('reqwest');
var ImageTemplate = require("../templates/image.hbs");

var addItem = function(child) {
  var data = child.data;
  var html = "";
  switch (Helpers.getMediaType(data.url)) {
    case "image":
      html = ImageTemplate(data);
      break;
    default:
      break;
  }
  $(html).appendTo("#wrapper");
}

var download = function(path, qs, limit) {
  var url = buildUrl(path, qs, limit);
  reqwest({
    url: url,
    type: 'jsonp',
    jsonpCallback: 'jsonp',
    success: function(resp) {
      downloadCompleteHandler(resp);
    }
  })
};

function buildUrl(path, qs, limit) {
  return "https://www.reddit.com" + path + ".json" + (qs === "" ? "?foo=bar" : qs);
};

var downloadCompleteHandler = function(result) {
  var children = result.data.children;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    addItem(child);
  }
  if ($("#wrapper").children(".active").length === 0) {
    $("#wrapper").children(":first-child").addClass("active");
  }
};

module.exports = {
  download: download
}
