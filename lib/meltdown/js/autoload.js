function loadStyleSheet(path, fn, scope) {
    var head = document.getElementsByTagName( 'head' )[0], // reference to document.head for appending/ removing link nodes
    link = document.createElement('link');
    // create the link node
    link.setAttribute('href', path);
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');

    var sheet, cssRules;
    // get the correct properties to check for depending on the browser
    if ('sheet' in link) {
        sheet = 'sheet';
        cssRules = 'cssRules';
    } else {
        sheet = 'styleSheet';
        cssRules = 'rules';
    }

    var timeout_id = setInterval(function() {// start checking whether the style sheet has successfully loaded
        try {
            if (link[sheet] && link[sheet][cssRules].length) {// SUCCESS! our style sheet has loaded
                clearInterval(timeout_id);
                // clear the counters
                clearTimeout(timeout_id);
                fn.call(scope || window, true, link);
                // fire the callback with success == true
            }
        } catch( e ) {
        } finally {
        }
    }, 10), // how often to check if the stylesheet is loaded
    timeout_id = setTimeout(function() {// start counting down till fail
        clearInterval(timeout_id);
        // clear the counters
        clearTimeout(timeout_id);
        head.removeChild(link);
        // since the style sheet didn't load, remove the link node from the DOM
        fn.call(scope || window, false, link);
        // fire the callback with success == false
    }, 15000);
    // how long to wait before failing

    head.appendChild(link);
    // insert the link node into the DOM and start loading the style sheet
    return link;
    // return the link node;
}

window.onload = function() {
    $ = jQuery;
    $("#left__index__tree a, div.pagename a").each(function(e) {
        $(this).html($(this).text().replace(/.md$/,""))
    });
    $('#left__index__tree').bind('DOMSubtreeModified', 'test', function () {
        $("#left__index__tree li.open a").each(function(e) {
            $(this).html($(this).text().replace(/.md$/,""))
        });
    });

    var body = $("body[class=markdown]");
    if (body.length) {
        prettyPrint();
        var meltadown = "/sa_wiki/lib/plugins/markdownextra/lib/meltdown";
        loadStyleSheet(meltadown + "/css/markdown.css", function(success, link) {
        });
        loadStyleSheet(meltadown + "/css/desert.css", function(success, link) {
        });
    }
}