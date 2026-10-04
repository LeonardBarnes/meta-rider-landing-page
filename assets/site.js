(function () {
  var body = document.body;
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('site-menu');
  var privacyMenus = document.querySelectorAll('.privacy-menu');
  var mobile = window.matchMedia('(max-width: 1040px)');

  function closePrivacyMenus() {
    privacyMenus.forEach(function (details) { details.open = false; });
  }

  function setOpen(open, restoreFocus) {
    if (!toggle || !menu) return;
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.inert = mobile.matches && !open;
    if (!open) closePrivacyMenus();
    if (restoreFocus) toggle.focus();
  }

  // Details/summary works without JavaScript; these add dismissal shortcuts.
  document.addEventListener('click', function (e) {
    privacyMenus.forEach(function (details) {
      if (details.open && !details.contains(e.target)) details.open = false;
    });
    if (header && body.classList.contains('menu-open') && !header.contains(e.target)) {
      setOpen(false, true);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openPrivacyMenu = Array.prototype.find.call(privacyMenus, function (details) {
      return details.open;
    });
    if (openPrivacyMenu) {
      e.preventDefault();
      openPrivacyMenu.open = false;
      openPrivacyMenu.querySelector('summary').focus();
    } else if (body.classList.contains('menu-open')) {
      e.preventDefault();
      setOpen(false, true);
    }
  });

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setOpen(!body.classList.contains('menu-open'));
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Keep keyboard focus inside the visible mobile menu while it is open.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !mobile.matches || !body.classList.contains('menu-open') || !header) return;
      var focusable = Array.prototype.filter.call(header.querySelectorAll('a[href], button, summary'), function (el) {
        return el.getClientRects().length && !el.closest('[inert]');
      });
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    var onChange = function (e) { setOpen(false, e.matches && menu.contains(document.activeElement)); };
    if (mobile.addEventListener) mobile.addEventListener('change', onChange);
    else if (mobile.addListener) mobile.addListener(onChange);

    // Closing on back/forward cache restore keeps the page tidy.
    window.addEventListener('pageshow', function () { setOpen(false); });
    setOpen(false);
  }

  // Soft shadow under the header once the page has scrolled.
  if (header) {
    var ticking = false;
    var update = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 4);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // Gentle reveal of sections as they scroll into view.
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();
