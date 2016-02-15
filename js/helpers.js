var Handlebars = require("handlebars/runtime");
var urijs = require("urijs");

var getMediaType = function(url) {
  var suffix = urijs(url).suffix();

  // imgur album
  if (url.indexOf('imgur.com/a/') > -1) {
    return "imgur-album";
  }

  // Some common sources don't use file extensions in the url, but still serve a plain ol' image file.
  if (url.indexOf('500px.org') > -1) {
    return "image";
  }

  switch (suffix) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image";
      break;
  }
}

var processUrl = function(url) {
  var domain = urijs(url).domain();
  var suffix = urijs(url).suffix();
  var path = urijs(url).path();

  // convert imgur page url into direct image url
  if ((domain == "imgur.com") &&
     (url.indexOf("gallery") == -1) &&
     (url.indexOf("/a/") == -1) &&
     (suffix == "")) {
    return url + ".jpg"; // any suffix is ok
  }

  // convert imgur gifv url into gif url by slicing off the final v
  if (url.indexOf(".gifv") > -1) {
    newUrl = url.slice(0, -1);
  }

  // get flickr direct image url
  if (domain == "flickr.com" && suffix == "") {
    var pathArray = path.split("/");
    var photoId = pathArray[3];
    $.get("/flickr/api.php?id=" + photoId, function(sourceUrl) {
      // update image in page after it loads. hacky but it works (tm).
      var $el = $(".item.image[data-url='flickr.jpg?id=" + photoId + "']");
      $el.data("url", sourceUrl);
      if ($el.hasClass("present")) {
        $el.css("background-image", "url(" + sourceUrl + ")");
      }
    });
    return "flickr.jpg?id=" + photoId;
  }

  return url;
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
  getMediaType: getMediaType,
  processUrl: processUrl,
  getParameterByName: getParameterByName,
  openLinkInNewTab: openLinkInNewTab
}
