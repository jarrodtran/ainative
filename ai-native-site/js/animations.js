/* ═══════════════════════════════════════════════════════
   animations.js — IntersectionObserver scroll animations
   Elements with data-animate="fade-up" animate on scroll
   ═══════════════════════════════════════════════════════ */

(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12 });

  function init() {
    var els = document.querySelectorAll('[data-animate]');
    els.forEach(function (el) { observer.observe(el); });
  }

  // run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
