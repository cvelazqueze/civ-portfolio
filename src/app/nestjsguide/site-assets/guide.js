(function () {
  var toggle = document.getElementById('nav-toggle');
  var backdrop = document.getElementById('nav-backdrop');
  var backToTop = document.getElementById('back-to-top');

  function setNavOpen(open) {
    document.body.classList.toggle('nav-open', open);
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (backdrop) backdrop.hidden = !open;
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setNavOpen(!document.body.classList.contains('nav-open'));
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', function () { setNavOpen(false); });
  }

  document.querySelectorAll('.toc-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 899px)').matches) setNavOpen(false);
    });
  });

  window.addEventListener('scroll', function () {
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
})();
