require("normalize.css");
require("../scss/app.scss");

require("./input-handler");
var Data = require("./data");
var ItemBrowser = require("./item-browser");

var path = location.pathname;
var qs = location.search;

Data.download(path, qs);

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-50553956-2', 'auto');
ga('send', 'pageview');