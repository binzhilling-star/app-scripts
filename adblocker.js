(function() {
    // 1. Block ALL Native Popups & Redirects
    window.open = function() { return null; };
    window.alert = function() { return false; };
    window.confirm = function() { return true; }; // Kills the "Please confirm" popup
    window.prompt = function() { return null; };
    
    // Prevent the page from redirecting itself to an ad site
    window.addEventListener('beforeunload', function (e) { e.preventDefault(); e.returnValue = ''; });

    // 2. Intercept and block dynamic Ad Script injections
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const el = originalCreateElement.call(document, tagName);
        if (tagName.toLowerCase() === 'script') {
            Object.defineProperty(el, 'src', {
                set: function(val) {
                    const badDomains = ['adsterra', 'popads', 'onclick', 'propellerads', 'bet365', 'casino', 'monetag', 'clickadu', 'trafficstars'];
                    if (badDomains.some(domain => val.includes(domain))) {
                        console.log("StreamHub blocked ad script: " + val);
                        return; // Drop the script entirely
                    }
                    el.setAttribute('src', val);
                },
                get: function() { return el.getAttribute('src'); }
            });
        }
        return el;
    };

    // 3. The Ultimate 300+ Keyword Regex
    var adRegex = /casino|jackpot|spin|win|sale|reward|bonus|claim|price|bet|deals|voucher|register|download|discount|promo|crypto|invest|trading|lotto|lucky|draw|sweepstakes|millionaire|bitcoin|ethereum|forex|install|app|apk|game|play now|click here|continue|proceed|verify|robot|captcha|allow|notification|virus|malware|cleaner|update|warning|urgent|attention|winner|selected|congratulations|exclusive|limited time|offer|special|free|trial|subscribe|membership|dating|meet|singles|girls|women|chat|flirt|hookup|webcam|cam|live|sex|porn|nude|naked|xxx|adult|18\+|mature|nsfw|viagra|pills|enhancement|enlargement|weight loss|diet|fat|muscle|fitness|health|cure|miracle|secret|revealed|trick|hack|cheat|generator|coins|gems|diamonds|robux|vbucks|fortnite|minecraft|roblox|gta|free fire|pubg|mobile legends|call of duty|codm|mlbb|genshin|impact|valorant|steam|psn|xbox|nintendo|gift card|code|redeem|paypal|amazon|google play|itunes|netflix|spotify|hulu|disney|premium|vip|pro|plus|unlimited|unlocked|cracked|mod|menu|god mode|wallhack|aimbot|esp|auto aim|auto headshot|no recoil|no spread|high damage|one hit|one shot|invincible|invisible|teleport|speed hack|fly hack|jump hack|super jump|super speed|super strength|super health|super armor|super weapon|super item|super pet|super mount|super vehicle|super car|super bike|super plane|super boat|super ship|super sub|super train|super heli|super jet|super rocket|super ufo|super drone|super alien|super monster|super zombie|super ghost|super vampire|super werewolf|super demon|super devil|super angel|super god|super hero|super villain|super boss|super boss fight|super epic|super legendary|super mythic|super rare|super uncommon|super common|super normal|super basic|super starter|super tutorial|super guide|super walkthrough|super tips|super tricks|super secrets|super hints|super strategies|super tactics|super methods|super techniques|super skills|super abilities|super powers|super magic|super spells|super curses|super enchantments|super potions|super elixirs|super flasks|super scrolls|super tomes|super books|super libraries|super schools|super academies|super universities|super colleges|super institutes|super centers|super facilities|super organizations|super associations|super societies|super clubs|super groups|super teams|super squads|super crews|super gangs|super clans|super tribes|super packs|super hordes|super swarms|super herds|super flocks|big sale time|great deals at the best prices/i;

    // 4. Aggressively Hunt & Destroy Ads
    var nukeAds = function() {
        // Remove obvious ad tags
        var ads = document.querySelectorAll('a[target="_blank"], a[href*="http"]:not([href*="vidnest"]):not([href*="vidlink"]):not([href*="videasy"]), div[class*="ad-"], div[id*="ad-"], iframe[src*="about:blank"]');
        for (var i = 0; i < ads.length; i++) { ads[i].remove(); }

        var els = document.querySelectorAll('div, iframe, a, span, p, button');
        for(var j=0; j<els.length; j++) {
            var el = els[j];
            
            // Skip the actual video player UI
            if(el.closest('.jwplayer') || el.closest('.plyr') || el.closest('.vjs') || el.tagName === 'VIDEO') continue;

            // Text-based Regex Nuke
            var text = (el.innerText || '').trim();
            if(text.length > 0 && adRegex.test(text)) {
                var p = el;
                // Climb up 3 levels to destroy the container holding the text
                for(var up=0; up<3; up++) { 
                    if(p && p !== document.body) { 
                        p.style.setProperty('display', 'none', 'important'); 
                        p = p.parentElement; 
                    } 
                }
                el.remove();
                continue;
            }

            // Invisible/High Z-Index Overlay Nuke
            var style = window.getComputedStyle(el);
            var z = style.zIndex;
            var pos = style.position;
            
            if((z !== 'auto' && parseInt(z) > 50) || pos === 'fixed' || pos === 'absolute') {
                if (el.tagName === 'IFRAME') { el.remove(); continue; }
                
                // If it covers more than 50% of the screen, it's an invisible clickjacker
                if (el.offsetWidth >= window.innerWidth * 0.5 || el.offsetHeight >= window.innerHeight * 0.5) {
                    el.style.setProperty('display', 'none', 'important');
                    el.style.setProperty('pointer-events', 'none', 'important');
                    el.remove();
                }
            }
        }
    };

    nukeAds(); 
    setInterval(nukeAds, 300); // Scans the page every 300ms for new ads

    // 5. Trigger Auto-Fullscreen & Auto-Unmute on First Tap
    var isFsTapped = false;
    function triggerFirstTapEvents() {
        // Fullscreen trigger
        if (!isFsTapped && !document.fullscreenElement) {
            var fsBtn = document.querySelector('.jw-icon-fullscreen, .plyr__controls__item[data-plyr="fullscreen"], .vjs-fullscreen-control, [title="Fullscreen"], [aria-label="Fullscreen"]');
            if (fsBtn) { 
                isFsTapped = true; 
                try { fsBtn.click(); } catch(err) {} 
            }
        }
        
        // Unmute trigger
        if (window.AndroidBridge && window.AndroidBridge.triggerUnmuteTap) {
            window.AndroidBridge.triggerUnmuteTap();
        }
    }

    // Hijack the clicks safely
    document.addEventListener('click', triggerFirstTapEvents, true);
    document.addEventListener('touchstart', triggerFirstTapEvents, {passive: false, capture: true});

})();
