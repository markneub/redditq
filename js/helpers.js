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
  return url;
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

module.exports = {
  getFileExtension: getFileExtension,
  getMediaType: getMediaType,
  processUrl: processUrl,
  addImgurAlbum: addImgurAlbum
}
