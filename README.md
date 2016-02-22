# redditq: minimal image browser for reddit

redditq ([redditq.com](https://www.redditq.com/ "redditq.com")) is an image browser for [reddit](https://www.reddit.com/ "reddit.com"). It features a minimal user interface and is designed to be controlled via keyboard shortcuts.

## Navigation

redditq uses the same URL scheme as reddit for subreddits, so you can browse any subreddit on redditq by simply adding a q after reddit in your browser URL bar. For example, view /r/earthporn on redditq at [https://redditq.com/r/earthporn](https://redditq.com/r/earthporn).

### Keyboard Controls
<kbd>A</kbd> or <kbd>←</kbd> previous image  
<kbd>D</kbd> or <kbd>→</kbd> next image  
<kbd>W</kbd> or <kbd>↑</kbd> previous Imgur gallery image  
<kbd>S</kbd> or <kbd>↓</kbd> next Imgur gallery image  
  
<kbd>R</kbd> open the sub**r**eddit navigator (try using <kbd>tab</kbd>, <kbd>space</kbd>, and <kbd>return</kbd> in the navigator)  
<kbd>O</kbd> open the **o**riginally submitted link in a new tab  
<kbd>I</kbd> open a direct link to the currently displayed **i**mage in a new tab  
<kbd>F</kbd> toggle **f**ull screen  
<kbd>C</kbd> open the reddit **c**omments about the current image in a new tab  
<kbd>T</kbd> toggle visibility of the submission **t**itle  
<kbd>/</kbd> or <kbd>?</kbd> view this README

## About ##

This project was inspired by [redditp](https://www.redditp.com/ "redditp.com"). I wanted to have support for image galleries and Flickr photo pages and experiment with a minimal UI. From a technical standpoint, I wanted practice using CommonJS modules for structuring my JavaScript, as well as [webpack](https://github.com/webpack/webpack) for bundling static assets.
