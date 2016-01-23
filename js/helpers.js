var getFileExtension = function(filename) {
  return filename.split('.').pop().toLowerCase();
}

var getMediaType = function(url) {
  // Some common sources don't use file extensions, but still serve a plain ol' image file.

  // 500px.org
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

module.exports = {
  getFileExtension: getFileExtension,
  getMediaType: getMediaType
}
