---
title: Cleaning up Blazor HTML
draft: false
tags:
  - Work
  - Blazor
  - CSS
  - HTML
  - Programming
---
# Blazor can be really annoying
Specifically, the junk that it leaves in the DOM can be really annoying, when you're trying to edit downloaded HTML. I was so annoyed by it, in fact, that I wrote a quick regex to delete it all. It consists of three parts, targeting three unique types of junk that Blazor likes to put in the DOM.
```
<!--!-->
\w-[\w\d]{10}=""
_[\w\d]{2}_[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}=""
```

Or all together in one convenient Regex:
```
<!--!-->| \w-[\w\d]{10}=""| _[\w\d]{2}_[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}=""
```
