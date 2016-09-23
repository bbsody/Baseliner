var Baseliner = function (options) {

  var DEFAULT_OPTIONS = {
    query:    "screen",
    height:   0,
    color:    "rgba(0,0,0,.3)"
  };

  function createStyle() {
    var head = document.head || document.getElementsByTagName("head")[0],
        css = document.createElement("style");
    css.type = "text/css";
    css.id = "baseline_sheet";
    css.appendChild(document.createTextNode("body:before{background-repeat: repeat; background-position: left top; position:absolute;width:auto;z-index:9999;content:'';display:block;pointer-events:none;top:0;right:0;bottom:0;left:0;transition: opacity .1s ease-in}\nbody{position: relative}\nbody:active:before{opacity:0}\n"));
    head.appendChild(css);
  };

  function generateSvg(property) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width",10);
    svg.setAttribute("height",property.height);
    var svgNS = svg.namespaceURI;
    var line = document.createElementNS(svgNS,'line');
    line.setAttribute('stroke-dasharray', '3, 2');
    line.setAttribute('x1',0);
    line.setAttribute('y1',property.height);
    line.setAttribute('x2',10);
    line.setAttribute('y2',property.height);
    line.setAttribute('style','stroke:' + property.color + ';stroke-width:2');
    svg.appendChild(line);
    var data = new XMLSerializer().serializeToString(svg);
    var encodedData = window.btoa(data);
    var gen = "url('data:image/svg+xml;base64," + encodedData + "')";
    document.getElementById("baseline_sheet").innerHTML += "@media " + property.query + "{\nbody:before{background-image:" + gen + "}}\n";
  };

  function mergeOptions(obj1, obj2) {
    var out = {};
    for (var i in obj1) { out[i] = obj1[i]; }
    for (var k in obj2) { out[k] = obj2[k]; }
    return out;
  };

  function calculateHeight() {
    var body = document.body,
        html = document.documentElement,
        height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    return height;
  };

  function setHeight(height) {
    document.getElementById("baseline_sheet").sheet.cssRules[0].style.height = height + "px";
  };

  if (Array.isArray(options) === false) {
      options = [options];
  }
  var props = (options || []).map(function(media){
    return mergeOptions(DEFAULT_OPTIONS, media);
  });

  document.addEventListener("DOMContentLoaded", function() {
    createStyle();
    for (var i = 0; i < props.length; i++) {
      generateSvg(props[i]);
    }
    setHeight(calculateHeight());
  });

  function resize() {
    setHeight(0);
    setHeight(calculateHeight());
  };

  if ('addEventListener' in window) {
    window.addEventListener('resize', resize, false);
  } else if ('attachEvent' in window) {
    window.attachEvent('resize', resize);
  };
};
