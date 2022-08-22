(function() {
    function ready(callback) {
        if (
            document.readyState === "complete" ||
            (document.readyState !== "loading" && !document.documentElement.doScroll)
        ) {
            callback();
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    }

    function addScript(src) {
        var el = document.createElement('script');

        el.setAttribute('src', src);
        document.body.appendChild(el);
    }

    function getCurrentScript() {
        var scripts = document.getElementsByTagName('script');
        var index = scripts.length - 1;

        return scripts[index];
    }

    var gameScript = getCurrentScript();
    var pathParts = gameScript.src.split('/');
    var scriptDir;
    var hash = parseInt(Math.random() * 1000000);
    var scriptPath;

    pathParts.pop();
    scriptDir = pathParts.join('/');
    scriptPath = scriptDir + '/runtime.js?h=' + hash;

    ready(function() {
        addScript(scriptPath);
    });
})();