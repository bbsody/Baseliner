# Baseliner.js

Baseliner.js is a simple JavaScript tool to check how a baseline is performing in the code.

Using Baseliner.js is easy. First, link to the JS file in your HTML document:
```html
<script src="baseliner.js"></script>
```

Then, set up a baseline like this:
```javascript
Baseliner({height: 28})
```

Or a bunch of baselines like this:
```javascript
Baseliner([
  {query: "(min-width: 0px)", height: 28},
  {query: "(min-width: 500px) and (orientation: landscape)", height: 32},
  {query: "(min-width: 900px)", height: 38}
]);
```

To learn more, go to https://bbsody.github.io/Baseliner/

Disclaimer: it probably doesn’t work with old browsers (but who cares, huh?)
