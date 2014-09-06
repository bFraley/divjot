// TODO: doc comments / license etc

/* This napkin.js file is for the 'local-app' version
that includes the napkinpage.html and napkin-ui.css files.

Other versions need to create the napkin ui elements,
as well as style rules, all from a single script.
These implementations will require much more code for 
managing ui events, and the plug-in features system.
*/

var napkin = {};

napkin.html_out = function () {
  var napkin_html = document.getElementById('napkin-html').value;  
  var napkin_page = document.getElementById('napkin-page');
  napkin_page.innerHTML=napkin_html;
};

napkin.css_out = function () {
  var napkin_css = document.getElementById('napkin-css').value;
  var napkin_style = document.getElementById('napkin-style');
  napkin_style.innerHTML=napkin_css;
};

napkin.js_out = function () {
    var napkin_js = document.getElementById('napkin-js');
    return eval(napkin_js.value);
};
