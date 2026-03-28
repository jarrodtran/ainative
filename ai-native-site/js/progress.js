/* ═══════════════════════════════════════════════════════
   progress.js — localStorage progress tracking
   Compatible with the legacy single-file keys
   ═══════════════════════════════════════════════════════ */

var Progress = (function () {
  var MODULES_KEY = 'ainative_progress';
  var LESSONS_KEY = 'ainative_lessons';

  function _read(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}'); }
    catch (e) { return {}; }
  }
  function _write(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  /** Get module-level completion map { "1": true, "2": false, ... } */
  function getModules() { return _read(MODULES_KEY); }

  /** Is module N completed? */
  function isModuleComplete(n) { return !!_read(MODULES_KEY)[n]; }

  /** Mark module N as complete */
  function completeModule(n) {
    var m = _read(MODULES_KEY);
    m[n] = true;
    _write(MODULES_KEY, m);
  }

  /** Get lesson progress for module N → [true, false, ...] */
  function getLessons(n) {
    return _read(LESSONS_KEY)[n] || [];
  }

  /** Mark lesson i of module n as done */
  function markLessonDone(n, i) {
    var all = _read(LESSONS_KEY);
    if (!all[n]) all[n] = [];
    all[n][i] = true;
    _write(LESSONS_KEY, all);
  }

  /** Count completed lessons for module n */
  function countDone(n) {
    var arr = getLessons(n);
    return arr.filter(Boolean).length;
  }

  /** Total completed lessons across all modules */
  function totalLessonsDone() {
    var all = _read(LESSONS_KEY);
    var count = 0;
    for (var k in all) { if (all.hasOwnProperty(k)) count += (all[k] || []).filter(Boolean).length; }
    return count;
  }

  /** Total completed modules */
  function totalModulesDone() {
    var m = _read(MODULES_KEY);
    var count = 0;
    for (var k in m) { if (m.hasOwnProperty(k) && m[k]) count++; }
    return count;
  }

  /** Reset everything */
  function resetAll() {
    localStorage.removeItem(MODULES_KEY);
    localStorage.removeItem(LESSONS_KEY);
  }

  return {
    getModules: getModules,
    isModuleComplete: isModuleComplete,
    completeModule: completeModule,
    getLessons: getLessons,
    markLessonDone: markLessonDone,
    countDone: countDone,
    totalLessonsDone: totalLessonsDone,
    totalModulesDone: totalModulesDone,
    resetAll: resetAll
  };
})();
