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

    // Menu UI elements.
    var menu = {
        top_ui_section: document.getElementsByClassName('top-ui-section')[0],
        user_fileinput: document.getElementById('user-fileinput'),
        import_fileinput: document.getElementById('import-fileinput'),
        import_button: document.getElementById('import-button'),
        imported_list: []
    };

    
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
    
    // Decrease editors' font-size.
    function font_smaller() {
        controls.fsize -= 2;
        divjot_html.style.fontSize = controls.fsize + "pt";
        divjot_css.style.fontSize = controls.fsize + "pt";
        divjot_js.style.fontSize = controls.fsize + "pt";
    }

    // Increase editors' font-size.
    function font_bigger() {
        controls.fsize += 2;
        divjot_html.style.fontSize = controls.fsize + "pt";
        divjot_css.style.fontSize = controls.fsize + "pt";
        divjot_js.style.fontSize = controls.fsize + "pt";
    }
    
    // Switch to dark UI colors.
    function dark() {
        divjot_wrapper.style.backgroundColor = "#333";
        menu.top_ui_section.style.color = "#eee";
        controls.dark.style.display = "none";
        controls.light.style.display = "inline";
    }

    // Switch to light UI colors.
    function light() {
        divjot_wrapper.style.backgroundColor = "#FFF";
        menu.top_ui_section.style.color = "#333";
        controls.light.style.display = "none";
        controls.dark.style.display = "inline";
    }
    
    // Append new JS or CSS file resource to <head>.
    function divjot_import(filepath) {
        error_msg = 'Error calling divjot_import ' + filepath + ' Please check the file path and try again.';

        if (!filepath)
            throw error_msg;

        h =  document.getElementsByTagName('head')[0];
        f_length = filepath.length;

        // Does file name end with '.js' extension?
        if (filepath.slice(-3, f_length) === '.js') {
            script = document.createElement('script');
            script.setAttribute('src', filepath);
            h.appendChild(script);
        }
        // Or does file name end with '.css' extension?
        else if (filepath.slice(-4, f_length) == '.css') {
            stylesheet = document.createElement('link');
            stylesheet.setAttribute('rel', "stylesheet");
            stylesheet.setAttribute('href', filepath);
            h.appendChild(stylesheet);
        }
        else          
            throw error_msg;   
    }

    // Load local file and read - for loading local html files
    // or other content file into the html editor.

    function get_user_file(file, onLoadCallback) {
        var reader = new FileReader();
        reader.onload = onLoadCallback;
        reader.readAsText(file);
    }

    /* UI Events */
    
    // Global Document events for divjot hotkeys.
    // alt + space opens and closes editors.

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

    /* Menu UI event listeners */

    // New file input event. Assign file content,
    // and then append to divjot_html editor.

    menu.user_fileinput.addEventListener('change', function(e) {

        get_user_file(this.files[0], function(e) {
            divjot_html.userfile = e.target.result;
            divjot_html.value += divjot_html.userfile;
            markup_out();
        });
    });

    // Import field listener

    menu.import_button.addEventListener('click', function(key) {
        pathvalue = menu.import_fileinput.value;

        if (pathvalue.length > 0) {
            divjot_import(pathvalue);
            menu.imported_list.push(pathvalue);
            menu.import_fileinput.value = "";
        }

    }, false);

}());

