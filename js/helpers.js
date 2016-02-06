var Handlebars = require("handlebars/runtime");
var urijs = require("urijs");

var getFileExtension = function(filename) {
  return filename.split('.').pop().toLowerCase();
}

var getMediaType = function(url) {
  // imgur album
  if (url.indexOf('imgur.com/a/') > -1) {
    return "imgur-album";
  }

  // Some common sources don't use file extensions in the url, but still serve a plain ol' image file.
  if (url.indexOf('500px.org') > -1) {
    return "image";
  }

  switch (getFileExtension(url)) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image";
      break;
  }
}

var processUrl = function(url) {
  var newUrl = url;

  // convert imgur page url into direct image url
  if ((urijs(url).host().indexOf("imgur.com") > -1) &&
      (url.indexOf("gallery") == -1) &&
      (url.indexOf("/a/") == -1) &&
      (urijs(url).suffix().length == 0)) {
    newUrl = url + ".jpg"; // any suffix is ok
  }

  // convert imgur gifv url into gif url by slicing off the final v
  if (url.indexOf(".gifv") > -1) {
    newUrl = url.slice(0, -1);
  }

  return newUrl;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function openLinkInNewTab(url) {
  var $link = $("<a />")
                .css("display", "none")
                .attr("target", "_blank")
                .attr("href", url);
  $link.appendTo("body")[0].click();
  $link.remove();
}

Handlebars.registerHelper('addOne', function(value) {
  return value + 1;
});

Handlebars.registerHelper('ifFirstFive', function(index, options) {
  if (index < 5) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

module.exports = {
  getFileExtension: getFileExtension,
  getMediaType: getMediaType,
  processUrl: processUrl,
  getParameterByName: getParameterByName,
  openLinkInNewTab: openLinkInNewTab
}
