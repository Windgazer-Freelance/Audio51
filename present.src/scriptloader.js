(function() {
    
    var body = null;
    
    function getBody() {
        if (body === null) {
            body = document.querySelector("body");
        }
        return body;
    }

    function scriptLoader( uri ) {
        var tag = document.createElement("script");
        tag.src = uri;
        
        getBody().appendChild(tag);
    }
    
    getBody().addEventListener( 'click', function( e ) {
        var t = e.target;
        if (e.altKey||e.ctrlKey||e.metaKey||e.shiftKey) return;
        if (t && t.href && t.href.indexOf('.js') > 0) {
            scriptLoader( t.href );
            e.preventDefault();
        }
    } );

}());

var getContext = (function(AC){
    var ctx = null;
    
    return function() {
        if ( ctx === null ) {
            ctx = new AC();
        }
        return ctx;
    }
}(
    window.AudioContext || 
    window.webkitAudioContext || 
    window.mozAudioContext || 
    window.oAudioContext || 
    window.msAudioContext
));