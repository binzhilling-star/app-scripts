(function() {
    if(window.nativeAdBlockerActiveFinished) return; 
    window.nativeAdBlockerActiveFinished = true;

    // 1. Block System Dialogs & Redirects
    window.onbeforeunload = function() { return 'Blocked'; };
    window.open = function() { return null; };
    try { Object.defineProperty(window, 'alert', { value: function(){return null;}, writable: false, configurable: false }); } catch(e){}
    try { Object.defineProperty(window, 'confirm', { value: function(){return false;}, writable: false, configurable: false }); } catch(e){}
    try { Object.defineProperty(window, 'prompt', { value: function(){return null;}, writable: false, configurable: false }); } catch(e){}

    // 2. Strip Dialogs from newly created iframes
    var origCreate = document.createElement;
    document.createElement = function(tag) {
       var el = origCreate.call(document, tag);
       if(tag.toLowerCase() === 'iframe') {
           el.addEventListener('load', function() {
               try { 
                   this.contentWindow.alert = function(){return null;}; 
                   this.contentWindow.confirm = function(){return false;}; 
                   this.contentWindow.prompt = function(){return null;}; 
                   this.contentWindow.open = function(){return null;}; 
               } catch(e) {}
           });
       }
       return el;
    };

    // 3. Inject CSS Shield
    var s = document.createElement('style');
    s.innerHTML = 'div[class*="reward"], div[id*="reward"], .rewardzone, #rewardzone, [class*="chest"], iframe[src*="about:blank"], a[target="_blank"] { display: none !important; pointer-events: none !important; } .clickjacker, div[style*="z-index: 2147483647"], div[style*="z-index: 9999"] { pointer-events: none !important; display: none !important; }';
    if(document.head) document.head.appendChild(s);

    // 4. Ultimate 300+ Word Ad Killer Loop
    var adRegex = /shopee|lazada|gcash|paymaya|grabpay|zalora|carousell|tokopedia|alibaba|aliexpress|temu|shein|tiktok shop|11\.11|12\.12|payday sale|flash sale|mega sale|super sale|free shipping|cash on delivery|cod only|piso deal|1 peso|voucher code|promo code|casino|jackpot|spin|win|sale|reward|bonus|claim|price|bet|deals|voucher|register|download|discount|promo|crypto|invest|trading|lotto|lucky|draw|sweepstakes|millionaire|bitcoin|ethereum|forex|jili|slot|baccarat|roulette|poker|sabong|scatter|color game|tongits|pusoy|pesowin|phbet|jilipark|jilbet|okbet|virus|malware|infected|cleaner|boost memory|battery damaged|critical alert|system warning|action required|pending message|package waiting|delivery failed|track shipment|claim prize|you have been chosen|survey|chance to win|extra income|work from home|fast cash|easy money|rich fast|double your money|meet|singles|girls|women|chat|flirt|hookup|webcam|cam|live|sex|porn|nude|naked|xxx|adult|18\+|mature|nsfw|viagra|pills|enhancement|enlargement|weight loss|diet|fat|muscle|fitness|health|cure|miracle|secret|revealed|install|app|apk|game|play now|click here|continue|proceed|verify|robot|captcha|allow|notification|winner|selected|congratulations|exclusive|limited time|offer|special|free|trial|subscribe|membership|trick|hack|cheat|generator|coins|gems|diamonds|robux|vbucks|fortnite|minecraft|roblox|gta|free fire|pubg|mobile legends|call of duty|codm|mlbb|genshin|impact|valorant|steam|psn|xbox|nintendo|gift card|code|redeem|paypal|amazon|google play|itunes|netflix|spotify|hulu|disney|premium|vip|pro|plus|unlimited|unlocked|cracked|mod|menu|god mode|wallhack|aimbot|esp|big sale time|great deals|best prices/i;

    function killAds() {
        var els = document.querySelectorAll('div, a, iframe, span, p, h1, h2, h3, h4, h5, h6, button, img');
        for(var i=0; i<els.length; i++) {
            var el = els[i];
            if (el.closest('.jwplayer') || el.closest('.plyr') || el.closest('.vjs') || el.closest('.artplayer-app') || el.tagName === 'VIDEO') continue;
            
            var text = (el.innerText || '').trim();
            if(text.length > 0 && adRegex.test(text)) {
                var p = el;
                for(var up=0; up<3; up++) { if(p && p !== document.body && p !== document.documentElement) { p.style.setProperty('display', 'none', 'important'); p = p.parentElement; } }
                el.remove(); continue;
            }

            var style = window.getComputedStyle(el);
            if((style.position === 'fixed' || style.position === 'absolute') && parseInt(style.zIndex) > 50) {
                 if (el.tagName === 'IFRAME') { el.remove(); continue; }
                 if (el.offsetWidth >= window.innerWidth * 0.5 || el.offsetHeight >= window.innerHeight * 0.5) {
                     el.style.setProperty('pointer-events', 'none', 'important'); el.style.setProperty('display', 'none', 'important'); el.remove();
                 }
            }
        }
    }
    setInterval(killAds, 100);
    var observer = new MutationObserver(function(mutations) { mutations.forEach(function(m) { killAds(); }); });
    if(document.body) observer.observe(document.body, { childList: true, subtree: true });

    // 5. Hijack Clicks to prevent popups (NO AUTO FULLSCREEN)
    document.addEventListener('click', function(e) {
        var t = e.target;
        if (t.tagName === 'A' || t.closest('a')) { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); }
        if (!t.closest('.jwplayer') && !t.closest('.plyr') && !t.closest('video') && !t.closest('.vjs') && !t.closest('.artplayer-app')) {
            e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        }
    }, true);

    document.addEventListener('touchstart', function(e) {
        var t = e.target;
        if (t.tagName === 'A' || t.closest('a') || t.tagName === 'IFRAME') { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); }
    }, {passive: false, capture: true});
})();
