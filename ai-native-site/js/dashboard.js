/* ═══════════════════════════════════════════════════════
   dashboard.js — Dashboard page logic
   Progress ring, phase summaries, resume state, and card state
   ═══════════════════════════════════════════════════════ */

(function () {
  var TOTAL_MODULES = 21;
  var LESSONS_PER_MODULE = 5;
  var TOTAL_LESSONS = TOTAL_MODULES * LESSONS_PER_MODULE;
  var PHASES = [
    { id: 'phase-1', title: 'AI Foundations', modules: [1, 2, 3, 4], focus: 'Start here to build your mental model, prompt habits, and safe-use discipline.' },
    { id: 'phase-2', title: 'Productivity Acceleration', modules: [5, 6, 7, 8], focus: 'Best for daily productivity once the basics are in place.' },
    { id: 'phase-3', title: 'Business Operations', modules: [9, 10, 11, 12, 13], focus: 'Use AI on documentation, analysis, project work, and stakeholder communication.' },
    { id: 'phase-4', title: 'Advanced AI Workflows', modules: [14, 15, 16, 17], focus: 'Use after the workflow modules when you are ready for playbooks and agentic patterns.' },
    { id: 'phase-5', title: 'AI Strategy & Leadership', modules: [18, 19, 20, 21], focus: 'Turn practical use into opportunity selection, governance, and measurement.' }
  ];

  function init() {
    updateProgressRing();
    updateHeroStats();
    updateAllCards();
    updateContinueBtn();
    renderPhaseProgress();
    renderRecentUpdates();
    bindReset();
  }

  function updateProgressRing() {
    var ring = document.querySelector('.progress-ring-fill');
    var text = document.querySelector('.progress-ring-text');
    if (!ring || !text) return;

    var done = Progress.totalModulesDone();
    var pct = Math.round((done / TOTAL_MODULES) * 100);
    var circumference = 2 * Math.PI * 87;
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
    var pct = Math.round((done / LESSONS_PER_MODULE) * 100);
    var isComplete = done === LESSONS_PER_MODULE;
    var fill = card.querySelector('.module-card-bar-fill');
    var label = card.querySelector('.module-card-pct');

    if (fill) {
      fill.style.width = pct + '%';
      fill.classList.toggle('complete', isComplete);
    }
    if (label) label.textContent = done + '/' + LESSONS_PER_MODULE;

    card.classList.toggle('complete', isComplete);
    if (isComplete && !Progress.isModuleComplete(n)) Progress.completeModule(n);
  }

  function updateContinueBtn() {
    var btn = document.getElementById('continueBtn');
    var resumeMeta = document.getElementById('resumeMeta');
    var last = Progress.getLastVisited();

    if (!btn) return;

    if (last && last.path) {
      btn.href = last.kind === 'bonus' ? last.path : 'modules/' + last.path;
      btn.style.display = 'inline-flex';
      btn.textContent = last.kind === 'bonus' ? 'Resume Bonus Section →' : 'Resume: Module ' + last.id + ' →';
      if (resumeMeta) {
        resumeMeta.textContent = last.kind === 'bonus'
          ? 'Resume your last visited bonus lesson.'
          : 'Last visited lesson ' + last.lesson + ' in module ' + last.id + '.';
      }
      return;
    }

    for (var n = 1; n <= TOTAL_MODULES; n++) {
      if (Progress.countDone(n) < LESSONS_PER_MODULE) {
        btn.href = 'modules/module-' + n + '.html';
        btn.style.display = 'inline-flex';
        btn.textContent = 'Start Module ' + n + ' →';
        if (resumeMeta) resumeMeta.textContent = n === 1 ? 'Start at Module 1 and move in order through the program.' : 'Continue with the next incomplete module.';
        return;
      }
    }

    btn.textContent = 'Core Program Complete →';
    btn.style.display = 'inline-flex';
    btn.href = 'agents-in-practice.html';
    if (resumeMeta) resumeMeta.textContent = 'You finished the 21-module core path. Continue into the bonus agent section.';
  }

  function phaseDoneCount(phase) {
    return phase.modules.reduce(function (count, moduleNum) {
      return count + Progress.countDone(moduleNum);
    }, 0);
  }

  function renderPhaseProgress() {
    var container = document.getElementById('phaseProgressGrid');
    var phases = (typeof PROGRAM_META !== 'undefined' && PROGRAM_META.phases && PROGRAM_META.phases.length) ? PROGRAM_META.phases : PHASES;
    if (!container) return;

    container.innerHTML = phases.map(function (phase, idx) {
      var phaseLessons = phase.modules.length * LESSONS_PER_MODULE;
      var done = phaseDoneCount(phase);
      var pct = Math.round((done / phaseLessons) * 100);
      return '<a class="phase-progress-card" href="#' + phase.id + '">' +
        '<div class="phase-progress-top">' +
        '<div class="phase-progress-label">Phase ' + (idx + 1) + '</div>' +
        '<div class="phase-progress-value">' + done + '/' + phaseLessons + '</div>' +
        '</div>' +
        '<h3>' + phase.title + '</h3>' +
        '<p>' + phase.focus + '</p>' +
        '<div class="phase-progress-bar"><div class="phase-progress-fill" style="width:' + pct + '%"></div></div>' +
        '</a>';
    }).join('');
  }

  function renderRecentUpdates() {
    var container = document.getElementById('recentUpdatesGrid');
    var updates = typeof PROGRAM_META !== 'undefined' && PROGRAM_META.recentUpdates ? PROGRAM_META.recentUpdates : [];
    if (!container || !updates.length) return;

    container.innerHTML = updates.map(function (item) {
      return '<article class="recent-update-card">' +
        '<div class="recent-update-date">' + item.date + '</div>' +
        '<h3>' + item.title + '</h3>' +
        '<p>' + item.summary + '</p>' +
        '</article>';
    }).join('');
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
