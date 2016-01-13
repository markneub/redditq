var getFileExtension = function(filename) {
  return filename.split('.').pop().toLowerCase();
}

var getMediaType = function(filename) {
  switch (getFileExtension(filename)) {
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
