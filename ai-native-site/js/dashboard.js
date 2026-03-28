/* ═══════════════════════════════════════════════════════
   dashboard.js — Dashboard page logic
   Progress rings, module card state, reset
   ═══════════════════════════════════════════════════════ */

(function () {
  var TOTAL_MODULES = 21;
  var LESSONS_PER_MODULE = 5;
  var TOTAL_LESSONS = TOTAL_MODULES * LESSONS_PER_MODULE;

  function init() {
    updateProgressRing();
    updateHeroStats();
    updateAllCards();
    updateContinueBtn();
    bindReset();
  }

  function updateProgressRing() {
    var ring = document.querySelector('.progress-ring-fill');
    var text = document.querySelector('.progress-ring-text');
    if (!ring || !text) return;

    var done = Progress.totalModulesDone();
    var pct = Math.round((done / TOTAL_MODULES) * 100);
    var circumference = 2 * Math.PI * 52; // r=52
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference - (pct / 100) * circumference;
    text.textContent = pct + '%';
  }

  function updateHeroStats() {
    var modsDone = document.getElementById('statModules');
    var lessDone = document.getElementById('statLessons');
    if (modsDone) modsDone.textContent = Progress.totalModulesDone() + '/' + TOTAL_MODULES;
    if (lessDone) lessDone.textContent = Progress.totalLessonsDone() + '/' + TOTAL_LESSONS;
  }

  function updateAllCards() {
    for (var n = 1; n <= TOTAL_MODULES; n++) {
      updateCard(n);
    }
  }

  function updateCard(n) {
    var card = document.getElementById('card-' + n);
    if (!card) return;

    var done = Progress.countDone(n);
    var total = LESSONS_PER_MODULE;
    var pct = Math.round((done / total) * 100);
    var isComplete = done === total;

    var fill = card.querySelector('.module-card-bar-fill');
    var label = card.querySelector('.module-card-pct');

    if (fill) {
      fill.style.width = pct + '%';
      if (isComplete) fill.classList.add('complete');
      else fill.classList.remove('complete');
    }
    if (label) label.textContent = done + '/' + total;

    if (isComplete) {
      card.classList.add('complete');
      if (!Progress.isModuleComplete(n)) Progress.completeModule(n);
    } else {
      card.classList.remove('complete');
    }
  }

  function updateContinueBtn() {
    var btn = document.getElementById('continueBtn');
    if (!btn) return;
    for (var n = 1; n <= TOTAL_MODULES; n++) {
      if (Progress.countDone(n) < LESSONS_PER_MODULE) {
        btn.href = 'modules/module-' + n + '.html';
        btn.style.display = 'inline-flex';
        btn.textContent = 'Continue: Module ' + n + ' →';
        return;
      }
    }
    // all complete
    btn.textContent = 'All Complete! Review Any Module →';
    btn.style.display = 'inline-flex';
    btn.href = '#phase-1';
  }

  function bindReset() {
    var btn = document.getElementById('resetBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (confirm('Reset all progress? This cannot be undone.')) {
        Progress.resetAll();
        location.reload();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
