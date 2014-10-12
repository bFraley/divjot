// TODO: doc comments / license etc

/* This napkin.js file is for the 'local-app' version
that includes the napkinpage.html and napkin-ui.css files.

Other versions need to create the napkin ui elements,
as well as style rules, all from a single script.
These implementations will require much more code for 
managing ui events, and the plug-in features system.
NOTE:This version must be complete, with any further changes
made here. Then the changes can be implemented into 
subsequent napkin versions.
*/

// TODO: enclose scope

var napkinhtml = document.getElementById('napkin-html');
var napkincss = document.getElementById('napkin-css');
var napkinjs = document.getElementById('napkin-js');
var usermarkup = document.getElementById('napkin-markup');
var userstyle = document.getElementById('napkin-style');

function markup_out() { usermarkup.innerHTML=(napkinhtml.value); }
function style_out() { userstyle.innerHTML=(napkincss.value); }
function js_out() { return eval(napkinjs.value); }
   
napkinhtml.addEventListener('keyup' || 'keypress', function() {
    markup_out(); }, false);

napkincss.addEventListener('keypress', function() {
    style_out(); }, false);

napkinjs.addEventListener('keypress', function(key) {
    if (key.keyCode === 13) {
        js_out();
    }
}, false);



  
