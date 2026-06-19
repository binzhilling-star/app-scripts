(function() {
    // 1. Block ALL Native Popups
    window.open = function() { return null; };
    window.alert = function() { return false; };
    window.confirm = function() { return true; }; // <-- Kills the "Please confirm" popup!
    window.prompt = function() { return null; };

    // 2. Prevent the page from redirecting itself to an ad site
    window.addEventListener('beforeunload', function (e) { e.preventDefault(); e.returnValue = ''; });

    // 3. Aggressively Hunt & Destroy Invisible Ad Overlays
    var nukeAds = function() {
        var ads = document.querySelectorAll('a[target="_blank"], a[href*="http"], div[class*="ad-"], div[id*="ad-"], iframe[src*="about:blank"]');
        for (var i = 0; i < ads.length; i++) { ads[i].remove(); }

        var els = document.querySelectorAll('div, iframe, a');
        for(var j=0; j<els.length; j++) {
            var style = window.getComputedStyle(els[j]);
            var z = style.zIndex;
            var pos = style.position;
            
            // If a box is floating over the video (high z-index or fixed position), kill it.
            if((z !== 'auto' && parseInt(z) > 99) || pos === 'fixed' || pos === 'absolute') {
                var c = els[j].className || '';
                var id = els[j].id || '';
                // Exclude the actual video player buttons (jwplayer, plyr, videojs)
                if(!c.includes('jw-') && !c.includes('plyr') && !c.includes('vjs') && !c.includes('video') && !id.includes('player')) {
                    els[j].style.display = 'none !important';
                    els[j].style.pointerEvents = 'none !important';
                    els[j].style.width = '0px';
                    els[j].style.height = '0px';
                    els[j].style.opacity = '0';
                }
            }
        }
    };

    nukeAds(); 
    setInterval(nukeAds, 400); // Scans the page every 400ms for new ads

    // 4. Trigger auto-unmute
    var checkPlayer = setInterval(function() {
        var v = document.querySelector('video');
        if (v) {
            clearInterval(checkPlayer);
            if (window.AndroidBridge && window.AndroidBridge.triggerUnmuteTap) window.AndroidBridge.triggerUnmuteTap();
        }
    }, 200);
})();
