/* ═══════════════════════════════════════════════════════
   course.js — Course page logic
   Structured lesson rendering, resume state, bookmarks,
   module outline, and bonus section support
   ═══════════════════════════════════════════════════════ */

(function () {
  var moduleNum = null;
  var bonusId = null;
  var course = null;
  var lessonCount = 0;
  var scopeKind = 'module';
  var scopeId = null;
  var currentLessonNumber = 1;
  var HOME_PATH = '/';

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getPagePath(lessonNumber) {
    var base = bonusId ? 'agents-in-practice.html' : 'module-' + moduleNum + '.html';
    var prefix = bonusId ? '' : '';
    if (!lessonNumber) return base;
    return base + '#lesson-' + lessonNumber;
  }

  function getLessonProgress() {
    return bonusId ? Progress.getBonusLessons(bonusId) : Progress.getLessons(moduleNum);
  }

  function countDone() {
    return bonusId ? Progress.countBonusDone(bonusId) : Progress.countDone(moduleNum);
  }

  function markDone(idx) {
    if (bonusId) Progress.markBonusLessonDone(bonusId, idx);
    else Progress.markLessonDone(moduleNum, idx);
  }

  function renderList(items, className) {
    return '<ul' + (className ? ' class="' + className + '"' : '') + '>' +
      items.map(function (item) {
        return '<li>' + escapeHTML(item) + '</li>';
      }).join('') +
      '</ul>';
  }

  function renderConcepts(items) {
    return items.map(function (item) {
      return '<div class="concept-card">' +
        '<div class="concept-card-label">' + escapeHTML(item.title) + '</div>' +
        '<div class="concept-card-text">' + escapeHTML(item.text) + '</div>' +
        '</div>';
    }).join('');
  }

  function renderResources(resources) {
    if (!resources || !resources.length) return '';
    return '<div class="resource-list">' +
      resources.map(function (resource) {
        return '<a class="resource-card" href="' + escapeHTML(resource.url) + '" target="_blank" rel="noreferrer">' +
          '<div class="resource-type">' + escapeHTML(resource.type) + '</div>' +
          '<div class="resource-title">' + escapeHTML(resource.title) + '</div>' +
          (resource.note ? '<div class="resource-note">' + escapeHTML(resource.note) + '</div>' : '') +
          '</a>';
      }).join('') +
      '</div>';
  }

  function renderRoleVariants(variants) {
    var roles = [
      { key: 'manager', label: 'Manager' },
      { key: 'writer', label: 'Writer' },
      { key: 'analyst', label: 'Analyst' },
      { key: 'operator', label: 'Operator' }
    ];

    return roles.map(function (role) {
      return '<details class="role-card">' +
        '<summary class="role-card-label">' + role.label + '</summary>' +
        '<p>' + escapeHTML(variants[role.key]) + '</p>' +
        '</details>';
    }).join('');
  }

  function nextIncompleteLessonNumber() {
    var progress = getLessonProgress();
    for (var i = 0; i < lessonCount; i++) {
      if (!progress[i]) return i + 1;
    }
    return lessonCount;
  }

  function getNextModuleNum() {
    if (bonusId) return null;
    return moduleNum < 21 ? moduleNum + 1 : null;
  }

  function getNextModuleHref() {
    var next = getNextModuleNum();
    if (bonusId) return HOME_PATH;
    return next ? 'module-' + next + '.html' : '../agents-in-practice.html';
  }

  function getNextModuleLabel() {
    if (bonusId) return 'Dashboard';
    var next = getNextModuleNum();
    return next ? 'Module ' + next + ' · ' + COURSES[next].title : 'Bonus Section · Agents In Practice';
  }

  function renderHeroExtras() {
    var heroInner = document.querySelector('.course-hero-inner');
    if (!heroInner) return;

    var progress = getLessonProgress();
    var resumeLesson = nextIncompleteLessonNumber();
    var extras = document.createElement('div');
    extras.className = 'course-hero-extras';

    var outcomesHTML = '';
    if (course.outcomes && course.outcomes.length) {
      outcomesHTML = '<div class="hero-panel" data-animate="fade-up" data-delay="150">' +
        '<div class="hero-panel-label">Module Outcomes</div>' +
        renderList(course.outcomes) +
        '</div>';
    }

    var trustHTML = '';
    if (course.lastReviewed || (course.resources && course.resources.length)) {
      trustHTML = '<div class="hero-panel" data-animate="fade-up" data-delay="225">' +
        '<div class="hero-panel-label">Module Notes</div>' +
        (course.lastReviewed ? '<div class="hero-panel-meta"><strong>Last reviewed:</strong> ' + escapeHTML(course.lastReviewed) + '</div>' : '') +
        (course.resources && course.resources.length ? '<div class="hero-panel-subhead">Key Resources</div>' + renderResources(course.resources) : '') +
        '</div>';
    }

    var outlineHTML = '<div class="hero-panel" data-animate="fade-up" data-delay="200">' +
      '<div class="hero-panel-label">Lesson Outline</div>' +
      '<div class="lesson-outline-list">';

    course.lessons.forEach(function (lesson, idx) {
      var lessonNumber = idx + 1;
      var flags = [];
      if (progress[idx]) flags.push('done');
      if (Progress.isBookmarked(scopeKind, scopeId, idx)) flags.push('bookmarked');
      if (lessonNumber === resumeLesson) flags.push('next');
      outlineHTML += '<a class="lesson-outline-item ' + flags.join(' ') + '" href="#lesson-' + lessonNumber + '">' +
        '<span class="lesson-outline-index">L' + lessonNumber + '</span>' +
        '<span class="lesson-outline-text">' + escapeHTML(lesson.title) + '</span>' +
        '<span class="lesson-outline-state">' + (Progress.isBookmarked(scopeKind, scopeId, idx) ? 'Saved' : (progress[idx] ? 'Done' : (lessonNumber === resumeLesson ? 'Next' : ''))) + '</span>' +
        '</a>';
    });
    outlineHTML += '</div></div>';

    var nextHTML = '<div class="hero-panel hero-panel-accent" data-animate="fade-up" data-delay="250">' +
      '<div class="hero-panel-label">Next Best Action</div>' +
      '<div class="next-action-title" id="nextActionTitle">' + (countDone() === lessonCount ? (bonusId ? 'Return to Dashboard' : 'Move to ' + getNextModuleLabel()) : 'Resume Lesson ' + resumeLesson) + '</div>' +
      '<p class="next-action-copy" id="nextActionCopy">' + (countDone() === lessonCount
        ? escapeHTML(course.nextModuleBridge || 'You have finished this module. Continue into the next skill area.')
        : escapeHTML(course.lessons[resumeLesson - 1].useWhen || course.lessons[resumeLesson - 1].subtitle)) + '</p>' +
      '<div class="next-action-buttons" id="nextActionButtons">' +
      '<a class="hero-action-btn" id="nextActionPrimary" href="' + (countDone() === lessonCount ? getNextModuleHref() : '#lesson-' + resumeLesson) + '">' +
      (countDone() === lessonCount ? (bonusId ? 'Back To Dashboard' : 'Open Next Module') : 'Jump To Next Lesson') + '</a>' +
      (bonusId ? '' : '<a class="hero-action-btn ghost" id="nextActionSecondary" href="' + HOME_PATH + '">Back To Dashboard</a>') +
      '</div>' +
      '</div>';

    extras.innerHTML = outcomesHTML + outlineHTML + trustHTML + nextHTML;
    heroInner.appendChild(extras);
  }

  function renderNav() {
    var title = document.getElementById('navModuleTitle');
    var progress = document.getElementById('navModProgress');
    if (title) title.textContent = course.title;
    if (progress) {
      progress.textContent = countDone() + '/' + lessonCount + ' lessons';
    }
  }

  function renderHero() {
    var numEl = document.getElementById('courseNum');
    var titleEl = document.getElementById('courseTitle');
    var descEl = document.getElementById('courseDesc');
    var fill = document.getElementById('courseProgFill');
    var label = document.getElementById('courseProgLabel');
    var done = countDone();
    var pct = Math.round((done / lessonCount) * 100);

    if (numEl) numEl.textContent = bonusId ? course.label : 'Module ' + moduleNum;
    if (titleEl) titleEl.textContent = course.title;
    if (descEl) descEl.textContent = course.summary || '';
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = done + ' of ' + lessonCount + ' complete';

    renderHeroExtras();
  }

  function renderLessonAnchorNav(lessonNumber) {
    return '<div class="lesson-anchor-nav">' +
      '<a href="#lesson-' + lessonNumber + '-outcome">Outcome</a>' +
      '<a href="#lesson-' + lessonNumber + '-concepts">Concepts</a>' +
      '<a href="#lesson-' + lessonNumber + '-example">Example</a>' +
      '<a href="#lesson-' + lessonNumber + '-action">Action</a>' +
      '<a href="#lesson-' + lessonNumber + '-watch">Watch For</a>' +
      '</div>';
  }

  function renderLessons() {
    var container = document.getElementById('lessonsContainer');
    if (!container) return;

    var lessons = course.lessons;
    var progress = getLessonProgress();

    lessons.forEach(function (lesson, idx) {
      var lessonNumber = idx + 1;
      var isDone = !!progress[idx];
      var isLast = idx === lessons.length - 1;
      var section = document.createElement('section');
      var bookmarkState = Progress.isBookmarked(scopeKind, scopeId, idx);
      var artifactText = lesson.artifact ? [lesson.artifact.title].concat(lesson.artifact.items).join('\n') : '';
      var promptText = lesson.promptExample ? lesson.promptExample.prompt : '';

      section.className = 'lesson-section';
      section.id = 'lesson-' + lessonNumber;

      section.innerHTML =
        '<div class="lesson-inner">' +
        '<div class="lesson-text" data-animate="fade-up">' +
        '<div class="lesson-num">Lesson ' + lessonNumber + ' of ' + lessonCount + '</div>' +
        '<div class="lesson-title-row">' +
        '<h2 class="lesson-title">' + escapeHTML(lesson.title) + '</h2>' +
        '<button class="lesson-bookmark-btn' + (bookmarkState ? ' active' : '') + '" data-lesson-bookmark="' + idx + '" onclick="CourseActions.toggleBookmark(this, ' + idx + ')" aria-label="Save lesson for review later">' + (bookmarkState ? 'Saved' : 'Review Later') + '</button>' +
        '</div>' +
        (lesson.subtitle ? '<p class="lesson-subtitle">' + escapeHTML(lesson.subtitle) + '</p>' : '') +
        renderLessonAnchorNav(lessonNumber) +
        '<div class="lesson-content">' +
        '<div class="lesson-use-when" id="lesson-' + lessonNumber + '-outcome"><strong>Use this when:</strong> ' + escapeHTML(lesson.useWhen || lesson.subtitle) + '</div>' +
        '<div class="lesson-objective">Outcome: ' + escapeHTML(lesson.objective) + '</div>' +
        '<div class="lesson-estimate">Estimated lesson time: ' + escapeHTML(lesson.estimatedMinutes) + ' minutes</div>' +
        '<div class="lesson-sequence-note"><strong>Why this lesson is here:</strong> ' + escapeHTML(lesson.sequenceRationale) + '</div>' +
        '<div class="lesson-block">' +
        '<h3>Why This Matters</h3>' +
        '<p>' + escapeHTML(lesson.whyItMatters) + '</p>' +
        '</div>' +
        '<div class="lesson-block" id="lesson-' + lessonNumber + '-concepts">' +
        '<h3>Core Concepts</h3>' +
        renderConcepts(lesson.coreConcepts) +
        '</div>' +
        '<div class="lesson-block" id="lesson-' + lessonNumber + '-example">' +
        '<h3>Worked Example</h3>' +
        '<div class="worked-example">' +
        '<p><strong>Scenario:</strong> ' + escapeHTML(lesson.workedExample.scenario) + '</p>' +
        '<p><strong>Approach:</strong> ' + escapeHTML(lesson.workedExample.approach) + '</p>' +
        '<p><strong>Result:</strong> ' + escapeHTML(lesson.workedExample.result) + '</p>' +
        '<p><strong>Verification:</strong> ' + escapeHTML(lesson.workedExample.verification) + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="lesson-block" id="lesson-' + lessonNumber + '-watch">' +
        '<h3>What To Watch For</h3>' +
        renderList(lesson.commonMistakes) +
        '</div>' +
        '</div>' +
        '<div class="lesson-nav-between">' +
        (lessonNumber > 1 ? '<button class="lesson-scroll-btn" onclick="CourseActions.scrollTo(' + (lessonNumber - 1) + ')">↑ Previous Lesson</button>' : '') +
        (!isLast ? '<button class="lesson-scroll-btn" onclick="CourseActions.scrollTo(' + (lessonNumber + 1) + ')">Next Lesson ↓</button>' : '<button class="lesson-scroll-btn" onclick="CourseActions.scrollTo(\'completion\')">View Progress ↓</button>') +
        '</div>' +
        '<button class="lesson-complete-btn' + (isDone ? ' done' : '') + '" data-lesson="' + idx + '" onclick="CourseActions.markComplete(this, ' + idx + ')">' +
        (isDone ? 'Completed' : 'Mark Complete') + '</button>' +
        '</div>' +
        '<div class="lesson-visual" data-animate="fade-up" data-delay="200">' +
        (lesson.artifact ? '<div class="try-it-box artifact-box">' +
          '<div class="try-it-head">' +
          '<div><div class="try-it-label">' + escapeHTML(lesson.artifact.label) + '</div><div class="try-it-text"><strong>' + escapeHTML(lesson.artifact.title) + '</strong></div></div>' +
          '<button class="copy-artifact-btn" onclick="CourseActions.copyArtifact(' + idx + ')" data-copy-text="' + escapeHTML(artifactText) + '">Copy</button>' +
          '</div>' +
          renderList(lesson.artifact.items, 'artifact-list') +
          '</div>' : '') +
        (lesson.doThisNow ? '<div class="try-it-box action-box" id="lesson-' + lessonNumber + '-action">' +
          '<div class="try-it-label">Do This Now · ' + escapeHTML(lesson.doThisNow.timebox) + '</div>' +
          '<div class="try-it-text"><strong>' + escapeHTML(lesson.doThisNow.task) + '</strong></div>' +
          renderList(lesson.doThisNow.steps) +
          '</div>' : '') +
        (lesson.promptExample ? '<div class="try-it-box prompt-example-box">' +
          '<div class="try-it-head">' +
          '<div><div class="try-it-label">Prompt Example</div><div class="try-it-text"><strong>' + escapeHTML(lesson.promptExample.title) + '</strong></div></div>' +
          '<button class="copy-artifact-btn" onclick="CourseActions.copyPrompt(' + idx + ')" data-copy-text="' + escapeHTML(promptText) + '">Copy</button>' +
          '</div>' +
          '<pre class="prompt-example-text">' + escapeHTML(promptText) + '</pre>' +
          (lesson.promptExample.note ? '<div class="prompt-example-note">' + escapeHTML(lesson.promptExample.note) + '</div>' : '') +
          '</div>' : '') +
        '<div class="lesson-meta-card">' +
        '<div class="try-it-label">Role Variants</div>' +
        '<div class="role-grid">' + renderRoleVariants(lesson.roleVariants) + '</div>' +
        '</div>' +
        '<div class="lesson-meta-card">' +
        '<div class="try-it-label">Review Notes</div>' +
        '<div class="lesson-meta-line"><strong>Last reviewed:</strong> ' + escapeHTML(lesson.lastReviewed) + '</div>' +
        renderList(lesson.sourceNotes) +
        '</div>' +
        (lesson.resources && lesson.resources.length ? '<div class="lesson-meta-card">' +
        '<div class="try-it-label">Key Resources</div>' +
        renderResources(lesson.resources) +
        '</div>' : '') +
        '</div>' +
        '</div>';

      container.appendChild(section);
    });
  }

  function renderCompletion() {
    var container = document.getElementById('lessonsContainer');
    var done = countDone();
    var allDone = done === lessonCount;
    var nextHref = getNextModuleHref();
    var nextLabel = getNextModuleLabel();
    var bridge = course.nextModuleBridge || 'Review what you learned here, then continue into the next part of the program.';
    var completion = document.createElement('section');

    if (!container) return;

    completion.className = 'completion-section';
    completion.id = 'completion';
    completion.innerHTML =
      '<div class="completion-inner" data-animate="fade-up">' +
      '<div class="completion-icon">' + (allDone ? '🎉' : '📚') + '</div>' +
      '<h2 class="completion-title" id="completionTitle">' + (allDone ? 'Section Complete!' : done + ' of ' + lessonCount + ' Lessons Complete') + '</h2>' +
      '<p class="completion-text" id="completionText">' + (allDone ? escapeHTML(bridge) : 'Complete all lessons to finish this section and unlock a cleaner handoff into what comes next.') + '</p>' +
      '<div class="completion-actions" id="completionActions">' +
      '<a href="' + HOME_PATH + '" class="completion-btn secondary">← Back to Dashboard</a>' +
      (allDone ? '<a href="' + nextHref + '" class="completion-btn" id="completionPrimary">' + escapeHTML(bonusId ? 'Return To Dashboard' : 'Continue To ' + nextLabel) + '</a>' : '<a href="#lesson-' + nextIncompleteLessonNumber() + '" class="completion-btn" id="completionPrimary">Resume Lesson ' + nextIncompleteLessonNumber() + '</a>') +
      '</div>' +
      '</div>';
    container.appendChild(completion);
  }

  function updateNextActionPanel() {
    var title = document.getElementById('nextActionTitle');
    var copy = document.getElementById('nextActionCopy');
    var primary = document.getElementById('nextActionPrimary');
    var done = countDone();
    var nextLesson = nextIncompleteLessonNumber();

    if (!title || !copy || !primary) return;

    if (done === lessonCount) {
      title.textContent = bonusId ? 'Return to Dashboard' : 'Move to ' + getNextModuleLabel();
      copy.textContent = course.nextModuleBridge || 'You have finished this module. Continue into the next skill area.';
      primary.href = getNextModuleHref();
      primary.textContent = bonusId ? 'Back To Dashboard' : 'Open Next Module';
    } else {
      title.textContent = 'Resume Lesson ' + nextLesson;
      copy.textContent = course.lessons[nextLesson - 1].useWhen || course.lessons[nextLesson - 1].subtitle;
      primary.href = '#lesson-' + nextLesson;
      primary.textContent = 'Jump To Next Lesson';
    }
  }

  function updateCompletionPanel() {
    var done = countDone();
    var allDone = done === lessonCount;
    var title = document.getElementById('completionTitle');
    var text = document.getElementById('completionText');
    var primary = document.getElementById('completionPrimary');

    if (!title || !text || !primary) return;

    title.textContent = allDone ? 'Section Complete!' : done + ' of ' + lessonCount + ' Lessons Complete';
    text.textContent = allDone
      ? (course.nextModuleBridge || 'You have finished this section and are ready to continue.')
      : 'Complete all lessons to finish this section and unlock a cleaner handoff into what comes next.';
    primary.href = allDone ? getNextModuleHref() : '#lesson-' + nextIncompleteLessonNumber();
    primary.textContent = allDone ? (bonusId ? 'Return To Dashboard' : 'Continue To ' + getNextModuleLabel()) : 'Resume Lesson ' + nextIncompleteLessonNumber();
  }

  function renderLessonIndicator() {
    var indicator = document.getElementById('lessonIndicator');
    if (!indicator) return;

    var progress = getLessonProgress();
    var html = '';
    for (var i = 0; i < lessonCount; i++) {
      html += '<div class="lesson-dot-nav' + (progress[i] ? ' done' : '') +
        (Progress.isBookmarked(scopeKind, scopeId, i) ? ' bookmarked' : '') +
        '" data-lesson-dot="' + i + '" onclick="CourseActions.scrollTo(' + (i + 1) + ')" title="Lesson ' + (i + 1) + '"></div>';
    }
    indicator.innerHTML = html;
  }

  function updateHeroProgress() {
    var fill = document.getElementById('courseProgFill');
    var label = document.getElementById('courseProgLabel');
    var nav = document.getElementById('navModProgress');
    var done = countDone();
    var pct = Math.round((done / lessonCount) * 100);
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = done + ' of ' + lessonCount + ' complete';
    if (nav) nav.textContent = done + '/' + lessonCount + ' lessons';
  }

  function updateActiveDot(activeIdx) {
    var dots = document.querySelectorAll('.lesson-dot-nav');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === activeIdx);
    });
    currentLessonNumber = activeIdx + 1;
    Progress.setLastVisited(scopeKind, scopeId, currentLessonNumber, getPagePath(currentLessonNumber));
  }

  function updateOutlineState() {
    var progress = getLessonProgress();
    var nextLesson = nextIncompleteLessonNumber();
    var items = document.querySelectorAll('.lesson-outline-item');
    items.forEach(function (item, idx) {
      item.classList.toggle('done', !!progress[idx]);
      item.classList.toggle('bookmarked', Progress.isBookmarked(scopeKind, scopeId, idx));
      item.classList.toggle('next', idx + 1 === nextLesson && !progress[idx]);
      var state = item.querySelector('.lesson-outline-state');
      if (state) {
        state.textContent = Progress.isBookmarked(scopeKind, scopeId, idx) ? 'Saved' : (progress[idx] ? 'Done' : (idx + 1 === nextLesson ? 'Next' : ''));
      }
    });
  }

  function initLessonObserver() {
    var sections = document.querySelectorAll('.lesson-section');
    if (!sections.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          var num = parseInt(id.replace('lesson-', ''), 10) - 1;
          updateActiveDot(num);
        }
      });
    }, { threshold: 0.35 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  function init() {
    moduleNum = parseInt(document.body.getAttribute('data-module'), 10);
    bonusId = document.body.getAttribute('data-bonus');
    if (bonusId) {
      course = BONUS_SECTIONS[bonusId];
      scopeKind = 'bonus';
      scopeId = bonusId;
    } else if (moduleNum && COURSES[moduleNum]) {
      course = COURSES[moduleNum];
      scopeKind = 'module';
      scopeId = moduleNum;
    }
    if (!course) return;

    lessonCount = course.lessons.length;
    renderNav();
    renderHero();
    renderLessons();
    renderCompletion();
    renderLessonIndicator();
    initLessonObserver();
    Progress.setLastVisited(scopeKind, scopeId, 1, getPagePath(1));
  }

  window.CourseActions = {
    markComplete: function (btn, idx) {
      if (btn.classList.contains('done')) return;
      markDone(idx);
      btn.classList.add('done');
      btn.textContent = 'Completed';
      updateHeroProgress();
      renderLessonIndicator();
      updateActiveDot(currentLessonNumber - 1);
      updateOutlineState();
      updateNextActionPanel();
      updateCompletionPanel();

      if (idx < lessonCount - 1) {
        setTimeout(function () {
          CourseActions.scrollTo(idx + 2);
        }, 300);
      } else {
        setTimeout(function () {
          CourseActions.scrollTo('completion');
        }, 350);
      }
    },

    scrollTo: function (target) {
      var el = typeof target === 'string' ? document.getElementById(target) : document.getElementById('lesson-' + target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    toggleBookmark: function (btn, idx) {
      var active = Progress.toggleBookmark(scopeKind, scopeId, idx);
      btn.classList.toggle('active', active);
      btn.textContent = active ? 'Saved' : 'Review Later';
      renderLessonIndicator();
      updateActiveDot(currentLessonNumber - 1);
      updateOutlineState();
    },

    copyArtifact: function (idx) {
      var lesson = course.lessons[idx];
      if (!lesson || !lesson.artifact) return;
      var text = [lesson.artifact.title].concat(lesson.artifact.items).join('\n');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      }
    },

    copyPrompt: function (idx) {
      var lesson = course.lessons[idx];
      if (!lesson || !lesson.promptExample) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lesson.promptExample.prompt);
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
