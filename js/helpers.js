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
  if ((parseUrl(url).hostname == "imgur.com") &&
      (url.indexOf("gallery") == -1) &&
      (url.indexOf("/a/") == -1) &&
      (url.indexOf(".gifv") == -1)) {
    newUrl = url + ".jpg"; // any suffix is ok
  }

  // convert imgur gifv url into gif url by slicing off the final v
  if (url.indexOf(".gifv") > -1) {
    newUrl = url.slice(0, -1);
  }

  return newUrl;
}

var addImgurAlbum = function(url) {
  var id = url.split('/a/')[1];
  $.ajax({
    url: "https://api.imgur.com/3/album/" + id,
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Client-ID ddf12e5f849636a");
    },
    success: function(resp) {
      var data = resp.data;
      var albumTemplate = require("../templates/imgur-album.hbs");
      var html = albumTemplate(data);
      $(html).appendTo("#wrapper");
    }
  });
}

// http://stackoverflow.com/a/6644749
function parseUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  return a;
}


module.exports = {
  getFileExtension: getFileExtension,
  getMediaType: getMediaType,
  processUrl: processUrl,
  addImgurAlbum: addImgurAlbum,
  parseUrl: parseUrl
}
