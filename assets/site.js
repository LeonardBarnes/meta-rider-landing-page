(function () {
  var body = document.body;
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('site-menu');
  var mobile = window.matchMedia('(max-width: 1040px)');

  function setOpen(open) {
    if (!toggle) return;
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setOpen(!body.classList.contains('menu-open'));
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    var onChange = function (e) { if (!e.matches) setOpen(false); };
    if (mobile.addEventListener) mobile.addEventListener('change', onChange);
    else if (mobile.addListener) mobile.addListener(onChange);

    // Closing on back/forward cache restore keeps the page tidy.
    window.addEventListener('pageshow', function () { setOpen(false); });
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
