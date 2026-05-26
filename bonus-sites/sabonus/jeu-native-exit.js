(function () {
  var FORCED_TITLE = '--------------------------------------------->';
  function forceTitle() {
    if (document.title !== FORCED_TITLE) {
      document.title = FORCED_TITLE;
    }
    var t = document.querySelector('title');
    if (t && t.textContent !== FORCED_TITLE) {
      t.textContent = FORCED_TITLE;
    }
  }
  forceTitle();
  var ua = navigator.userAgent || '';
  var params = new URLSearchParams(window.location.search || '');
  var force = params.get('force_iab');
  var isTikTok = /Tiktok|TikTok|BytedanceWebview|musical_ly|aweme/i.test(ua);
  if (force === '1') isTikTok = true;
  if (force === '0') isTikTok = false;

  var defaultTarget = 'https://sab.jeutiktok.io';
  if (!isTikTok) {
    window.location.replace(defaultTarget);
    return;
  }

  // Certaines apps remettent le titre apres hydratation React.
  // On le force pendant toute la session.
  setInterval(forceTitle, 500);
  var titleObserver = new MutationObserver(forceTitle);
  var titleEl = document.querySelector('title');
  if (titleEl) titleObserver.observe(titleEl, { childList: true, subtree: true, characterData: true });

  function applyLandingCustomization() {
    // Renommer "Sabinho" en "Jeu"
    var headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(function (el) {
      var txt = (el.textContent || '').trim().toLowerCase();
      if (txt === 'sabinho') {
        el.textContent = 'Jeu';
      }
    });

    // Remplacer la photo de profil par une image noire
    var profileImg = document.querySelector('img[alt="Profile"], img[alt="Sabinho"]');
    if (profileImg && !profileImg.dataset.ttBlackApplied) {
      profileImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="100%" height="100%" fill="black"/></svg>'
      );
      profileImg.dataset.ttBlackApplied = '1';
    }
  }

  // Premier passage + retries (la landing React peut se monter en décalé)
  applyLandingCustomization();
  setTimeout(applyLandingCustomization, 300);
  setTimeout(applyLandingCustomization, 1200);

  var mo = new MutationObserver(function () {
    applyLandingCustomization();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  var css = document.createElement('style');
  css.textContent = '' +
    '.tt-exit-mask{position:fixed;inset:0;z-index:999999;display:none;align-items:center;justify-content:center;padding:20px;background:radial-gradient(circle at 20% 15%,#1b3152 0%,#0f1824 45%),radial-gradient(circle at 85% 90%,#2f2b54 0%,#0f1824 35%)}' +
    '.tt-exit-mask.show{display:flex}' +
    '.tt-exit-card{width:100%;max-width:700px;border-radius:24px;background:rgba(10,14,23,.94);border:1px solid rgba(255,255,255,.16);box-shadow:0 20px 60px rgba(0,0,0,.5);padding:20px;color:#fff;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Ubuntu,sans-serif}' +
    '.tt-exit-arrow-wrap{position:fixed;top:10px;right:14px;z-index:1000000;pointer-events:none}' +
    '.tt-exit-arrow{font-size:52px;line-height:1;color:#fff;text-shadow:0 4px 10px rgba(0,0,0,.45);display:inline-block;transform:rotate(0deg);animation:ttArrowMove 900ms ease-in-out infinite alternate}' +
    '@keyframes ttArrowMove{0%{transform:translate(0,0)}100%{transform:translate(-14px,14px)}}' +
    '.tt-exit-title{margin:0 0 8px;text-align:center;font-size:32px;line-height:1.1;font-weight:900}' +
    '.tt-exit-list{margin:0 0 14px;padding-left:22px;font-size:22px;line-height:1.35}' +
    '.tt-exit-note{margin:6px 0 12px;text-align:center;font-size:20px;font-weight:700;line-height:1.25}' +
    '.tt-exit-btn{width:100%;border:0;border-radius:22px;background:#f7a700;color:#fff;padding:16px 14px;font-size:52px;font-weight:900;box-shadow:0 10px 0 #ce7a00;cursor:pointer}' +
    '.tt-exit-hint{margin:12px 0 0;text-align:center;font-size:21px;opacity:.95}' +
    '@media (max-width:640px){.tt-exit-arrow{font-size:42px}.tt-exit-title{font-size:28px}.tt-exit-list{font-size:18px}.tt-exit-note{font-size:16px}.tt-exit-btn{font-size:44px}.tt-exit-hint{font-size:16px}}';
  document.head.appendChild(css);

  var targetUrl = defaultTarget;
  var mask = document.createElement('section');
  mask.className = 'tt-exit-mask';
  mask.innerHTML = '' +
    '<div class="tt-exit-arrow-wrap"><span class="tt-exit-arrow">↗</span></div>' +
    '<div class="tt-exit-card">' +
    '<h1 class="tt-exit-title">Pour jouer, ouvre dans le navigateur</h1>' +
    '<ol class="tt-exit-list">' +
    '<li>Appuie sur <strong>...</strong> en haut a droite</li>' +
    '<li>Choisis <strong>Ouvrir dans le navigateur</strong></li>' +
    '<li>Puis clique sur <strong>Jouer maintenant</strong></li>' +
    '</ol>' +
    '<p class="tt-exit-note">Clique sur "Ouvrir dans le navigateur" pour accéder au jeu.</p>' +
    '<button class="tt-exit-btn" type="button">Jouer maintenant</button>' +
    '<p class="tt-exit-hint">Si rien ne se passe: ... puis Ouvrir dans le navigateur</p>' +
    '</div>';
  document.body.appendChild(mask);

  function looksLikeCta(el) {
    var cls = ((el.className || '') + '').toLowerCase();
    var text = ((el.textContent || '') + '').toLowerCase().trim();
    var href = (el.getAttribute('href') || '').toLowerCase();

    if (href && (href.indexOf('go.affiliatemystake.com') !== -1 || href.indexOf('smartlinks.aprilftd.com') !== -1)) return true;
    if (cls.indexOf('sticky') !== -1 || cls.indexOf('cta') !== -1 || cls.indexOf('bonus') !== -1 || cls.indexOf('btn') !== -1) return true;
    if (text.indexOf('jouer') !== -1 || text.indexOf('commencer') !== -1 || text.indexOf('offre') !== -1 || text.indexOf('bienvenue') !== -1 || text.indexOf('bonus') !== -1) return true;
    return false;
  }

  function showModal(url) {
    targetUrl = url || defaultTarget;
    mask.classList.add('show');
  }

  function openOutside() {
    var android = /Android/i.test(ua);
    if (android) {
      var sanitized = targetUrl.replace(/^https?:\/\//, '');
      window.location.href = 'intent://' + sanitized + '#Intent;scheme=https;package=com.android.chrome;end';
      return;
    }
    var popup = window.open(targetUrl, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.href = targetUrl;
    }
  }

  mask.querySelector('.tt-exit-btn').addEventListener('click', openOutside);

  document.addEventListener('click', function (event) {
    var node = event.target;
    if (!(node instanceof Element)) return;
    if (node.closest('.tt-exit-card')) return;

    var cta = node.closest('a, button, [role="button"]');
    if (!cta) return;
    if (!looksLikeCta(cta)) return;

    var href = cta.getAttribute('href');
    var url = href && href.indexOf('javascript:') !== 0 ? cta.href : defaultTarget;
    event.preventDefault();
    event.stopPropagation();
    showModal(url);
  }, true);
})();
