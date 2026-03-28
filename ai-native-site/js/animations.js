/* ═══════════════════════════════════════════════════════
 animations.js — IntersectionObserver scroll animations
 Elements with data-animate="fade-up" animate on scroll.
 Uses MutationObserver to catch dynamically-added elements
 (e.g. lessons rendered by course.js after DOM ready).
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

   function observeEl(el) {
          if (!el.classList.contains('visible')) {
                   observer.observe(el);
          }
   }

   function init() {
          var els = document.querySelectorAll('[data-animate]');
          els.forEach(observeEl);
   }

   // Watch for dynamically-added elements (e.g. from course.js rendering lessons)
   var mutationObserver = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
                   mutation.addedNodes.forEach(function (node) {
                              if (node.nodeType !== 1) return;
                              if (node.hasAttribute && node.hasAttribute('data-animate')) {
                                           observeEl(node);
                              }
                              var children = node.querySelectorAll ? node.querySelectorAll('[data-animate]') : [];
                              children.forEach(observeEl);
                   });
          });
   });

   function start() {
          init();
          mutationObserver.observe(document.body, { childList: true, subtree: true });
   }

   if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', start);
   } else {
          start();
   }
})();
