(function() {
    window.open = function() { return null; };
    window.alert = function() { return false; };
    document.addEventListener('click', function(e) {
        var el = e.target;
        var isLink = false;
        while(el && el.tagName) {
            if(el.tagName.toLowerCase() === 'a') { isLink = true; break; }
            el = el.parentElement;
        }
        if(isLink || !e.isTrusted || window.getComputedStyle(e.target).zIndex > 9999) {
            e.stopPropagation(); e.preventDefault(); return false;
        }
    }, true);

    var nukeAds = function() {
        var ads = document.querySelectorAll('a[target="_blank"], a[href*="http"], div[class*="ad-"], div[id*="ad-"], iframe[src*="about:blank"]');
        for (var i = 0; i < ads.length; i++) { ads[i].remove(); }
        var els = document.querySelectorAll('div, iframe');
        for(var j=0; j<els.length; j++) {
            var z = window.getComputedStyle(els[j]).zIndex;
            if(z !== 'auto' && parseInt(z) > 999) {
                var c = els[j].className || '';
                if(!c.includes('jw-') && !c.includes('plyr') && !c.includes('vjs')) {
                    els[j].style.display = 'none !important';
                    els[j].style.pointerEvents = 'none !important';
                    els[j].style.width = '0px';
                    els[j].style.height = '0px';
                }
            }
        }
    };

    nukeAds(); 
    setInterval(nukeAds, 400);
    window.addEventListener('beforeunload', function (e) { e.preventDefault(); e.returnValue = ''; });
    
    var checkPlayer = setInterval(function() {
        var v = document.querySelector('video');
        if (v) {
            clearInterval(checkPlayer);
            if (window.AndroidBridge && window.AndroidBridge.triggerUnmuteTap) window.AndroidBridge.triggerUnmuteTap();
        }
    }, 200);
})();
