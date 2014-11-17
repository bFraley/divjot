// TODO: doc comments / license etc

/* This napkin.js file is for the 'local-app' version
that includes the napkinpage.html and napkin-ui.css files.
The load anywhere version needs to create the napkin ui elements,
as well as style rules, all from a single script.
*/

// TODO: enclose scope

// @everything UI napkin-wrapper
var napkinwrapper = document.getElementById('napkin-wrapper');

// Editor textarea elements
var napkinhtml = document.getElementById('napkin-html');
var napkincss = document.getElementById('napkin-css');
var napkinjs = document.getElementById('napkin-js');
var usermarkup = document.getElementById('napkin-markup');
var userstyle = document.getElementById('napkin-style');

// Opacity slider
var opacitycontrol = document.getElementById('opacity-control');

function markup_out() { usermarkup.innerHTML=(napkinhtml.value); }
function style_out() { userstyle.innerHTML=(napkincss.value); }
function js_out() { return eval(napkinjs.value); }
   
napkinhtml.addEventListener('keyup' || 'keypress', markup_out, false);

napkincss.addEventListener('keyup' || 'keypress', style_out, false);

napkinjs.addEventListener('keypress', function(key) {
    if (key.keyCode === 13)    js_out();    }, false);

opacitycontrol.addEventListener('input', function() {
    napkinwrapper.style.opacity = opacitycontrol.value; }, false);
    
