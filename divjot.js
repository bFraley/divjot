/* divjot.js - Divjot Live Web Editor
   Copyright by Brett Fraley 2014 - 2016
*/

(function() {

    var divjot_wrapper = document.getElementById('divjot-wrapper');

    // Editor textarea elements
    var divjot_html = document.getElementById('divjot-html');
    var divjot_css = document.getElementById('divjot-css');
    var divjot_js = document.getElementById('divjot-js');
    var usermarkup = document.getElementById('divjot-markup');
    var userstyle = document.getElementById('divjot-style');

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
        run: document.getElementById('run-button'),
        closed: false,    // flag for open/close all editors
        fsize: 10
    };    

    // Set initial opacity to 100
    controls.opacity.value = 100;

    /* Functions */

    // Send user source to DOM.
    function markup_out() {
        usermarkup.innerHTML = divjot_html.value;
    }

    function style_out() {
        userstyle.innerHTML = divjot_css.value;
    }

    function js_out() {
        return eval(divjot_js.value);
    }

    // Open or close all editors at once (for hotkeys)
    function openclose_editors() {
	if (controls.closed) {
            divjot_html.style.display = "inline-block";
            divjot_css.style.display = "inline-block";
            divjot_js.style.display = "inline-block";
            controls.closed = false;
        }
        else {
            divjot_html.style.display = "none";
            divjot_css.style.display = "none";
            divjot_js.style.display = "none";
            controls.closed = true;
        }
    }

    // Toggle 'show/hide' individual editors.
    function toggle(el) {
        if (el.style.display === "none")
            el.style.display = "inline-block";
        else
            el.style.display = "none";
    }

    function font_smaller() {
        controls.fsize -= 2;
        divjot_html.style.fontSize = controls.fsize + "pt";
        divjot_css.style.fontSize = controls.fsize + "pt";
        divjot_js.style.fontSize = controls.fsize + "pt";
    }

    function font_bigger() {
        controls.fsize += 2;
        divjot_html.style.fontSize = controls.fsize + "pt";
        divjot_css.style.fontSize = controls.fsize + "pt";
        divjot_js.style.fontSize = controls.fsize + "pt";
    }

    function dark() {
        divjot_wrapper.style.backgroundColor = "#333";
        controls.dark.style.display = "none";
        controls.light.style.display = "inline";
    }

    function light() {
        divjot_wrapper.style.backgroundColor = "#FFF";
        controls.light.style.display = "none";
        controls.dark.style.display = "inline";
    }
    
    /* UI Events */
    
    /* Global Document events for divjot hotkeys */
    // ALT+C closes all editors. ALT+O (letter o) opens all editors.

    window.document.addEventListener('keydown', function(key) {
        if (key.which === 32 && key.altKey) {
            openclose_editors();
        }
    }, false);
        
    /* User code I/O event triggers. */
 
    divjot_html.addEventListener('keyup' || 'keypress', markup_out, false);

    divjot_css.addEventListener('keyup' || 'keypress', style_out, false);

    /* UI Control button event listeners */

    controls.opacity.addEventListener('input', function() {
        divjot_wrapper.style.opacity = controls.opacity.value; }, false);

    controls.fsmaller.addEventListener('click', font_smaller, false);

    controls.fbigger.addEventListener('click', font_bigger, false);

    controls.dark.addEventListener('click', dark, false);

    controls.light.addEventListener('click', light, false);

    controls.html.addEventListener('click', function() { toggle(divjot_html); }, false);

    controls.css.addEventListener('click', function() { toggle(divjot_css); }, false);

    controls.js.addEventListener('click', function() { toggle(divjot_js); }, false); 

    controls.run.addEventListener('click', function() { js_out(); }, false);

    divjot_import('test.js');





}());
