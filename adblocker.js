(function() {
    // 1. Block ALL Native Popups & Redirects
    window.open = function() { return null; };
    window.alert = function() { return false; };
    window.confirm = function() { return true; }; // Kills "Please confirm" popups
    window.prompt = function() { return null; };
    
    // Prevent the page from redirecting itself to an ad site or App Store
    window.addEventListener('beforeunload', function (e) { e.preventDefault(); e.returnValue = ''; });

    // 2. ULTIMATE HOST BLOCKER: Intercepts and drops dynamic ad scripts before they load
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const el = originalCreateElement.call(document, tagName);
        if (tagName.toLowerCase() === 'script' || tagName.toLowerCase() === 'iframe') {
            Object.defineProperty(el, 'src', {
                set: function(val) {
                    // Massive list of Ad Networks, Tracking, Shopping, and Casino Hosts
                    const badDomains = [
                        'adsterra', 'popads', 'onclick', 'propellerads', 'bet365', 'casino', 'monetag', 'clickadu', 'trafficstars',
                        'shopee', 'lazada', 'alibaba', 'aliexpress', 'tokopedia', 'bukalapak', 'zalora', 'carousell', 'gcash', 'paymaya', 'maya', 'grabpay',
                        'taboola', 'outbrain', 'mgid', 'revcontent', 'adcash', 'exoclick', 'zeropark', 'plugrush', 'richads', 'hilltopads', 'yllix', 'admaven',
                        'popcash', 'adsystem', 'syndication', 'doubleclick', 'googleads', 'adnetwork', 'runative', 'bidgear', 'infolinks', 'vignette', 'bebi',
                        'awxcdn', 'prowebcams', '1xbet', 'casinoplus', 'jilipark', 'phbet', 'jilbet', 'pesowin', 'swish', 'pogo', 'sabong', 'bingo', 'bet88',
                        'okbet', 'mwplay', 'pnxbet', 'taya', 'sugal', 'poker', 'baccarat', 'roulette', 'jackpot', 'slot', 'imasdk', 'ima3', 'vpaid', 'vast',
                        'pagead2', 'adservice', 'magsrv', 'jads', 'popru', 'byteoversea', 'tiktokcdn', 'pubmatic', 'openx', 'rubiconproject', 'appnexus',
                        'criteo', 'spotx', 'springserve', 'tremorvideo', 'telaria', 'aniview', 'videointelligence', 'viid', 'brid.tv', 'anyclip', 'connatix',
                        'ex.srv', 'exdynsrv', 'vidoomy', 'smartadserver', 'videology', 'adotmob', 'dynadmic', 'teads', 'stickyads', 'streamrail', 'vuble',
                        'adtelligent', 'tsyndicate', 'voluum', 'prplrsrv', 'uidapi', 'adsco', 'adform', 'adnxs', 'adscale', 'adspirit', 'adtech', 'adthrive',
                        'adzerk', 'alkami', 'amazon-adsystem', 'amplitude', 'asacdn', 'bidswitch', 'bongacash', 'braze', 'buysellads', 'carbonads', 'clready',
                        'convertmedia', 'daum', 'districtm', 'dynsrv', 'eloqua', 'etracker', 'eyereturn', 'fastclick', 'flashtalking', 'gemini', 'gumgum',
                        'hotjar', 'hubspot', 'idoot', 'imrworldwide', 'indexww', 'intentmedia', 'juicyads', 'kargo', 'leadbolt', 'lijit', 'liveperson', 'loggly',
                        'loopme', 'lotame', 'luckyorange', 'madvertise', 'marketuid', 'matomy', 'media.net', 'mediaforge', 'medialytics', 'mixpanel', 'moatads',
                        'mobfox', 'mookie1', 'mxptint', 'nativeads', 'newrelic', 'nexage', 'onebyaol', 'opmnstr', 'optimimizely', 'outclicks', 'pangle', 'pardot',
                        'perfectaudience', 'perfy', 'pipedrive', 'pleer', 'po.st', 'pockethits', 'popin', 'pro-market', 'quantserve', 'quantumads', 'realvue',
                        'reftagger', 'revenuehits', 'rfihub', 'rightmedia', 'rocketfuel', 'segment', 'servebom', 'sharethrough', 'simpli.fi', 'sinacdn',
                        'siteinternal', 'smaato', 'smartclip', 'sovrn', 'startapp', 'steelhouse', 'stickyadstv', 'sumome', 'superawesome', 'tapad', 'themediagrid',
                        'tradeexchange', 'turn.com', 'tynt', 'underone', 'undertone', 'unrulymedia', 'valueclick', 'vibrantmedia', 'vidible', 'vimeo-ad', 'vrtcal',
                        'widespace', 'woopra', 'yieldmo', 'yieldoptimizer', 'yandex', 'yoc', 'zemanta', 'zoho', 'onclickalgo', 'onclickperformance', 'adwrapper',
                        'popcashnet', 'popmyadsnet', 'adsterracdn', 'hilltopadscdn', 'admxcdn', 'trafficjunky', 'ero-advertising', 'juicyads-engine',
                        'exoclick-market', 'plugrushcdn', 'galaksioncdn', 'realsrv', 'bet365-ad', 'wagerads', 'lottotrack', 'scam-detect', 'anti-adblock',
                        'blockpass', 'bypass-detect', 'fingerprint2', 'canvas-fingerprint', 'user-tracker', 'click-tracker', 'heatmap-logger', 'session-recorder', 'lead-gen'
                    ];
                    if (val && typeof val === 'string') {
                        const valLower = val.toLowerCase();
                        if (badDomains.some(domain => valLower.includes(domain))) {
                            console.log("StreamHub blocked malicious host script: " + val);
                            return; // Destroy the script completely
                        }
                    }
                    el.setAttribute('src', val);
                },
                get: function() { return el.getAttribute('src'); }
            });
        }
        return el;
    };

    // 3. THE ULTIMATE KEYWORD NUKE (Shopee, Lazada, GCash, Casino, Sabong, Scams, Adult, System Warnings)
    var adRegex = /shopee|lazada|gcash|paymaya|grabpay|zalora|carousell|tokopedia|alibaba|aliexpress|temu|shein|tiktok shop|11\.11|12\.12|payday sale|flash sale|mega sale|super sale|free shipping|cash on delivery|cod only|piso deal|1 peso|voucher code|promo code|casino|jackpot|spin|win|sale|reward|bonus|claim|price|bet|deals|voucher|register|download|discount|promo|crypto|invest|trading|lotto|lucky|draw|sweepstakes|millionaire|bitcoin|ethereum|forex|jili|slot|baccarat|roulette|poker|sabong|scatter|color game|tongits|pusoy|pesowin|phbet|jilipark|jilbet|okbet|virus|malware|infected|cleaner|boost memory|battery damaged|critical alert|system warning|action required|pending message|package waiting|delivery failed|track shipment|claim prize|you have been chosen|survey|chance to win|extra income|work from home|fast cash|easy money|rich fast|double your money|meet|singles|girls|women|chat|flirt|hookup|webcam|cam|live|sex|porn|nude|naked|xxx|adult|18\+|mature|nsfw|viagra|pills|enhancement|enlargement|weight loss|diet|fat|muscle|fitness|health|cure|miracle|secret|revealed|install|app|apk|game|play now|click here|continue|proceed|verify|robot|captcha|allow|notification|winner|selected|congratulations|exclusive|limited time|offer|special|free|trial|subscribe|membership|trick|hack|cheat|generator|coins|gems|diamonds|robux|vbucks|fortnite|minecraft|roblox|gta|free fire|pubg|mobile legends|call of duty|codm|mlbb|genshin|impact|valorant|steam|psn|xbox|nintendo|gift card|code|redeem|paypal|amazon|google play|itunes|netflix|spotify|hulu|disney|premium|vip|pro|plus|unlimited|unlocked|cracked|mod|menu|god mode|wallhack|aimbot|esp|big sale time|great deals|best prices/i;

    // 4. Aggressively Hunt & Destroy UI Overlays
    var nukeAds = function() {
        // Remove obvious ad link tags
        var ads = document.querySelectorAll('a[target="_blank"], a[href*="http"]:not([href*="vidnest"]):not([href*="vidlink"]):not([href*="videasy"]), div[class*="ad-"], div[id*="ad-"], iframe[src*="about:blank"]');
        for (var i = 0; i < ads.length; i++) { ads[i].remove(); }

        var els = document.querySelectorAll('div, iframe, a, span, p, button, h1, h2, h3, h4, h5');
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
