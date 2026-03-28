/* ═══════════════════════════════════════════════════════
   course.js — Course page logic
   Renders lessons, handles completion, updates progress
   Active lesson indicator, auto-scroll, lesson navigation
   ═══════════════════════════════════════════════════════ */

(function () {
  var moduleNum = null;
  var course = null;

  function init() {
    moduleNum = parseInt(document.body.getAttribute('data-module'), 10);
    if (!moduleNum || !COURSES[moduleNum]) return;

    course = COURSES[moduleNum];
    renderNav();
    renderHero();
    renderLessons();
    renderCompletion();
    renderLessonIndicator();
    updateButtons();
    initLessonObserver();
  }

  function renderNav() {
    var title = document.getElementById('navModuleTitle');
    var progress = document.getElementById('navModProgress');
    if (title) title.textContent = course.title;
    if (progress) {
      var done = Progress.countDone(moduleNum);
      progress.textContent = done + '/5 lessons';
    }
  }

  function renderHero() {
    var numEl = document.getElementById('courseNum');
    var titleEl = document.getElementById('courseTitle');
    var descEl = document.getElementById('courseDesc');
    var fill = document.getElementById('courseProgFill');
    var label = document.getElementById('courseProgLabel');

    if (numEl) numEl.textContent = 'Module ' + moduleNum;
    if (titleEl) titleEl.textContent = course.title;
    if (descEl) descEl.textContent = course.lessons[0].subtitle || '';

    var done = Progress.countDone(moduleNum);
    var pct = Math.round((done / 5) * 100);
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = done + ' of 5 complete';
  }

  function renderLessons() {
    var container = document.getElementById('lessonsContainer');
    if (!container) return;

    var lessons = course.lessons;
    var prog = Progress.getLessons(moduleNum);
    var total = lessons.length;

    lessons.forEach(function (l, i) {
      var isDone = !!prog[i];
      var isLast = i === total - 1;

      var section = document.createElement('section');
      section.className = 'lesson-section';
      section.id = 'lesson-' + (i + 1);

      var inner = document.createElement('div');
      inner.className = 'lesson-inner';

      // text column
      var textCol = document.createElement('div');
      textCol.className = 'lesson-text';
      textCol.setAttribute('data-animate', 'fade-up');

      var navHTML = '<div class="lesson-nav-between">';
      if (i > 0) {
        navHTML += '<button class="lesson-scroll-btn" onclick="CourseActions.scrollTo(' + i + ')">↑ Previous Lesson</button>';
      }
      if (!isLast) {
        navHTML += '<button class="lesson-scroll-btn" onclick="CourseActions.scrollTo(' + (i + 2) + ')">Next Lesson ↓</button>';
      } else {
        navHTML += '<button class="lesson-scroll-btn" onclick="CourseActions.scrollTo(\'completion\')">View Progress ↓</button>';
      }
      navHTML += '</div>';

      textCol.innerHTML =
        '<div class="lesson-num">Lesson ' + (i + 1) + ' of ' + total + '</div>' +
        '<h2 class="lesson-title">' + l.title + '</h2>' +
        (l.subtitle ? '<p class="lesson-subtitle">' + l.subtitle + '</p>' : '') +
        '<div class="lesson-content">' + l.content + '</div>' +
        '<button class="lesson-complete-btn' + (isDone ? ' done' : '') + '" ' +
        'data-lesson="' + i + '" onclick="CourseActions.markComplete(this, ' + i + ')">' +
        (isDone ? 'Completed' : 'Mark Complete') + '</button>' +
        navHTML;

      // visual column
      var visCol = document.createElement('div');
      visCol.className = 'lesson-visual';
      visCol.setAttribute('data-animate', 'fade-up');
      visCol.setAttribute('data-delay', '200');

      var visHTML = '';
      if (l.tryIt) {
        visHTML += '<div class="try-it-box">' +
          '<div class="try-it-label">Try It Now</div>' +
          '<div class="try-it-text">' + l.tryIt + '</div></div>';
      }
      visCol.innerHTML = visHTML;

      inner.appendChild(textCol);
      inner.appendChild(visCol);
      section.appendChild(inner);
      container.appendChild(section);
    });
  }

  function renderCompletion() {
    var container = document.getElementById('lessonsContainer');
    if (!container) return;

    var done = Progress.countDone(moduleNum);
    var allDone = done === 5;

    var section = document.createElement('section');
    section.className = 'completion-section';
    section.id = 'completion';

    section.innerHTML =
      '<div class="completion-inner" data-animate="fade-up">' +
      '<div class="completion-icon">' + (allDone ? '🎉' : '📚') + '</div>' +
      '<h2 class="completion-title">' +
      (allDone ? 'Module Complete!' : done + ' of 5 Lessons Complete') +
      '</h2>' +
      '<p class="completion-text">' +
      (allDone
        ? 'You\'ve finished all lessons in this module. Great work!'
        : 'Complete all lessons to finish this module.') +
      '</p>' +
      '<a href="/" class="completion-btn">← Back to Dashboard</a>' +
      '</div>';

    container.appendChild(section);
  }

  /* ── Active Lesson Indicator (dot nav on right side) ── */
  function renderLessonIndicator() {
    var indicator = document.getElementById('lessonIndicator');
    if (!indicator) return;

    var prog = Progress.getLessons(moduleNum);
    var html = '';
    for (var i = 0; i < 5; i++) {
      var isDone = !!prog[i];
      html += '<div class="lesson-dot-nav' + (isDone ? ' done' : '') +
        '" data-lesson-dot="' + i + '" onclick="CourseActions.scrollTo(' + (i + 1) +
        ')" title="Lesson ' + (i + 1) + '"></div>';
    }
    indicator.innerHTML = html;
  }

  /* ── IntersectionObserver for active lesson detection ── */
  function initLessonObserver() {
    var sections = document.querySelectorAll('.lesson-section');
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id; // "lesson-1", "lesson-2", etc.
          var num = parseInt(id.replace('lesson-', ''), 10) - 1;
          updateActiveDot(num);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  function updateActiveDot(activeIdx) {
    var dots = document.querySelectorAll('.lesson-dot-nav');
    dots.forEach(function (dot, i) {
      if (i === activeIdx) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  function updateButtons() {
    var prog = Progress.getLessons(moduleNum);
    var btns = document.querySelectorAll('.lesson-complete-btn');
    btns.forEach(function (btn) {
      var idx = parseInt(btn.getAttribute('data-lesson'), 10);
      if (prog[idx]) {
        btn.classList.add('done');
        btn.textContent = 'Completed';
      }
    });
  }

  function updateIndicatorDot(idx) {
    var dot = document.querySelector('[data-lesson-dot="' + idx + '"]');
    if (dot) dot.classList.add('done');
  }

  // global actions for onclick handlers
  window.CourseActions = {
    markComplete: function (btn, idx) {
      if (btn.classList.contains('done')) return;
      Progress.markLessonDone(moduleNum, idx);
      btn.classList.add('done');
      btn.textContent = 'Completed';

      // update indicator dot
      updateIndicatorDot(idx);

      // update nav progress
      var progress = document.getElementById('navModProgress');
      var done = Progress.countDone(moduleNum);
      if (progress) progress.textContent = done + '/5 lessons';

      // update hero progress
      var fill = document.getElementById('courseProgFill');
      var label = document.getElementById('courseProgLabel');
      var pct = Math.round((done / 5) * 100);
      if (fill) fill.style.width = pct + '%';
      if (label) label.textContent = done + ' of 5 complete';

      // auto-scroll to next lesson
      if (idx < 4) {
        setTimeout(function () {
          var next = document.getElementById('lesson-' + (idx + 2));
          if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      }

      // check if module is now complete
      if (done === 5) {
        Progress.completeModule(moduleNum);
        var compTitle = document.querySelector('.completion-title');
        var compText = document.querySelector('.completion-text');
        var compIcon = document.querySelector('.completion-icon');
        if (compTitle) compTitle.textContent = 'Module Complete!';
        if (compText) compText.textContent = 'You\'ve finished all lessons in this module. Great work!';
        if (compIcon) compIcon.textContent = '🎉';

        // scroll to completion
        setTimeout(function () {
          var comp = document.getElementById('completion');
          if (comp) comp.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 600);
      }
    },

    scrollTo: function (target) {
      var el;
      if (typeof target === 'string') {
        el = document.getElementById(target);
      } else {
        el = document.getElementById('lesson-' + target);
      }
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
