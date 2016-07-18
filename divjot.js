
var jauntwrapper = document.getElementById('jaunt-wrapper');

// Editor textarea elements
var jaunthtml = document.getElementById('jaunt-html');
var jauntcss = document.getElementById('jaunt-css');
var jauntjs = document.getElementById('jaunt-js');
var usermarkup = document.getElementById('jaunt-markup');
var userstyle = document.getElementById('jaunt-style');

// Editor control buttons
var controls = {
    opacity:  document.getElementById('opacity-control'),
    fsmaller: document.getElementById('fsize-smaller-button'),
    fbigger: document.getElementById('fsize-bigger-button'),
    dark: document.getElementById('dark-button'),
    light: document.getElementById('light-button'),
    html: document.getElementById('html-button'),
    css: document.getElementById('css-button'),
    js: document.getElementById('js-button'),
    fsize: 10
};    

/* Functions */

// Send user source to DOM.
function markup_out() { usermarkup.innerHTML=(jaunthtml.value); }
function style_out() { userstyle.innerHTML=(jauntcss.value); }
function js_out() { return eval(jauntjs.value); }

// Toggle 'show/hide' editors.
function toggle(el) {
    if (el.style.display === "none")
        el.style.display = "inline-block";
    else
        el.style.display = "none";
}

function font_smaller() {
    controls.fsize -= 2;
    jaunthtml.style.fontSize = controls.fsize + "pt";
    jauntcss.style.fontSize = controls.fsize + "pt";
    jauntjs.style.fontSize = controls.fsize + "pt";
}

function font_bigger() {
    controls.fsize += 2;
    jaunthtml.style.fontSize = controls.fsize + "pt";
    jauntcss.style.fontSize = controls.fsize + "pt";
    jauntjs.style.fontSize = controls.fsize + "pt";
}

function dark() {
    jauntwrapper.style.backgroundColor = "#333";
    controls.dark.style.display = "none";
    controls.light.style.display = "inline";
}

function light() {
    jauntwrapper.style.backgroundColor = "#FFF";
    controls.light.style.display = "none";
    controls.dark.style.display = "inline";
}

/* Events */

// User code I/O event triggers. 
jaunthtml.addEventListener('keyup' || 'keypress', markup_out, false);

jauntcss.addEventListener('keyup' || 'keypress', style_out, false);

jauntjs.addEventListener('keypress', function(key) {
    if (key.keyCode === 13)    js_out();    }, false);

// Control button event triggers.
controls.opacity.addEventListener('input', function() {
    jauntwrapper.style.opacity = controls.opacity.value; }, false);

controls.fsmaller.addEventListener('click', font_smaller, false);

controls.fbigger.addEventListener('click', font_bigger, false);

controls.dark.addEventListener('click', dark, false);

controls.light.addEventListener('click', light, false);

controls.html.addEventListener('click', function() { toggle(jaunthtml); }, false);

controls.css.addEventListener('click', function() { toggle(jauntcss); }, false);

controls.js.addEventListener('click', function() { toggle(jauntjs); }, false); 


// code output



