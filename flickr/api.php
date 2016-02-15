<?php

/* Proxy Flickr API requests to keep people from stealing my key and allow for caching of API responses. */

require_once("phpflickr/phpFlickr.php");
require_once("../config.conf.php");

$photo_id = $_GET["id"];

$flickr = new phpFlickr($flickr_api_key);
if ($_SERVER["HTTP_HOST"] !== "redditq.local") {
  $flickr->enableCache("db", "mysql://$flickr_db_user:$flickr_db_pass@127.0.0.1/flickrcache");
}
$sizes = $flickr->photos_getSizes($photo_id);
$source = "";
// try to get a large (2048px) image, but settle for the last image size in the list if not available
for ($i = 0; $i < count($sizes); $i++) {
  $size =  $sizes[$i];
  if ($size["width"] == "2048" || $size["height"] == "2048") {
    $source = $size["source"];
    break;
  }
  $source = $size["source"];
}
echo $source;

?>