#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const MODULES_DIR = path.join(CONTENT_DIR, 'modules');
const BONUS_DIR = path.join(CONTENT_DIR, 'bonus');
const OUTPUT_FILE = path.join(ROOT, 'js', 'courses.js');
const ALLOWED_RESOURCE_TYPES = new Set(['official', 'reference', 'example', 'further-reading']);
const REQUIRED_ROLE_KEYS = ['manager', 'writer', 'analyst', 'operator'];

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function listJSONFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter(function (name) { return name.endsWith('.json'); })
    .sort()
    .map(function (name) { return path.join(dirPath, name); });
}

function normalizeSlug(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function parseMonthYear(value) {
  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(value || '');
  if (!match) return null;
  const months = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };
  const month = months[match[1].toLowerCase()];
  if (month === undefined) return null;
  return new Date(Date.UTC(Number(match[2]), month, 1));
}

function maxReviewed(items) {
  let best = null;
  items.forEach(function (item) {
    const parsed = parseMonthYear(item.lastReviewed);
    if (parsed && (!best || parsed > best.date)) {
      best = { date: parsed, label: item.lastReviewed };
    }
  });
  return best ? best.label : null;
}

function validateResources(resources, context) {
  if (!resources) return;
  assert(Array.isArray(resources), context + ': resources must be an array.');
  resources.forEach(function (resource, index) {
    const label = context + ' resource #' + (index + 1);
    assert(resource && typeof resource === 'object', label + ' must be an object.');
    assert(typeof resource.title === 'string' && resource.title.trim(), label + ' is missing title.');
    assert(typeof resource.url === 'string' && /^https?:\/\//.test(resource.url), label + ' must have a valid URL.');
    assert(ALLOWED_RESOURCE_TYPES.has(resource.type), label + ' must use an allowed type.');
    if (resource.note !== undefined) {
      assert(typeof resource.note === 'string', label + ' note must be a string.');
    }
  });
}

function validateLesson(lesson, context) {
  [
    'id', 'slug', 'title', 'subtitle', 'objective', 'useWhen', 'whyItMatters',
    'estimatedMinutes', 'coreConcepts', 'workedExample', 'artifact', 'doThisNow',
    'commonMistakes', 'roleVariants', 'sourceNotes', 'lastReviewed', 'promptExample'
  ].forEach(function (key) {
    assert(lesson[key] !== undefined, context + ': missing `' + key + '`.');
  });

  assert(typeof lesson.id === 'string' && lesson.id.trim(), context + ': invalid lesson id.');
  assert(typeof lesson.slug === 'string' && lesson.slug.trim(), context + ': invalid lesson slug.');
  assert(typeof lesson.objective === 'string' && lesson.objective.trim(), context + ': invalid objective.');
  assert(typeof lesson.useWhen === 'string' && lesson.useWhen.trim(), context + ': invalid useWhen.');
  assert(typeof lesson.estimatedMinutes === 'number' && lesson.estimatedMinutes > 0, context + ': estimatedMinutes must be a positive number.');
  assert(Array.isArray(lesson.coreConcepts) && lesson.coreConcepts.length >= 3, context + ': coreConcepts must have at least 3 items.');
  assert(Array.isArray(lesson.commonMistakes) && lesson.commonMistakes.length >= 2, context + ': commonMistakes must have at least 2 items.');
  assert(Array.isArray(lesson.sourceNotes) && lesson.sourceNotes.length >= 1, context + ': sourceNotes must have at least 1 item.');
  assert(parseMonthYear(lesson.lastReviewed), context + ': lastReviewed must use `Month YYYY`.');
  assert(typeof lesson.sequenceRationale === 'string' && lesson.sequenceRationale.trim(), context + ': missing sequenceRationale.');

  REQUIRED_ROLE_KEYS.forEach(function (key) {
    assert(lesson.roleVariants && typeof lesson.roleVariants[key] === 'string' && lesson.roleVariants[key].trim(), context + ': roleVariants.' + key + ' is required.');
  });

  assert(lesson.workedExample && typeof lesson.workedExample === 'object', context + ': workedExample is required.');
  ['scenario', 'approach', 'result', 'verification'].forEach(function (key) {
    assert(typeof lesson.workedExample[key] === 'string' && lesson.workedExample[key].trim(), context + ': workedExample.' + key + ' is required.');
  });

  assert(lesson.artifact && typeof lesson.artifact === 'object', context + ': artifact is required.');
  assert(typeof lesson.artifact.label === 'string' && lesson.artifact.label.trim(), context + ': artifact.label is required.');
  assert(typeof lesson.artifact.title === 'string' && lesson.artifact.title.trim(), context + ': artifact.title is required.');
  assert(Array.isArray(lesson.artifact.items) && lesson.artifact.items.length >= 2, context + ': artifact.items must have at least 2 items.');

  assert(lesson.doThisNow && typeof lesson.doThisNow === 'object', context + ': doThisNow is required.');
  ['task', 'timebox'].forEach(function (key) {
    assert(typeof lesson.doThisNow[key] === 'string' && lesson.doThisNow[key].trim(), context + ': doThisNow.' + key + ' is required.');
  });
  assert(Array.isArray(lesson.doThisNow.steps) && lesson.doThisNow.steps.length >= 2, context + ': doThisNow.steps must have at least 2 items.');

  assert(lesson.promptExample && typeof lesson.promptExample === 'object', context + ': promptExample is required.');
  ['title', 'prompt'].forEach(function (key) {
    assert(typeof lesson.promptExample[key] === 'string' && lesson.promptExample[key].trim(), context + ': promptExample.' + key + ' is required.');
  });
  if (lesson.promptExample.note !== undefined) {
    assert(typeof lesson.promptExample.note === 'string', context + ': promptExample.note must be a string.');
  }

  validateResources(lesson.resources, context);
}

function lessonNeedsResourceReview(lesson) {
  const notes = (lesson.sourceNotes || []).join(' ').toLowerCase();
  return !!lesson.resources || notes.indexOf('tool') !== -1 || notes.indexOf('openclaw') !== -1 || notes.indexOf('official') !== -1;
}

function buildPromptExample(lesson) {
  var artifactItems = lesson.artifact && lesson.artifact.items ? lesson.artifact.items.slice(0, 4) : [];
  var conceptTitles = lesson.coreConcepts.map(function (item) { return item.title; }).slice(0, 3);
  var actionSteps = lesson.doThisNow && lesson.doThisNow.steps ? lesson.doThisNow.steps.slice(0, 3) : [];

  return {
    title: 'Starter prompt',
    prompt: [
      'Help me with this work task: ' + lesson.doThisNow.task,
      '',
      'Goal:',
      lesson.objective,
      '',
      'Use this when:',
      lesson.useWhen,
      '',
      'Important context:',
      artifactItems.map(function (item) { return '- ' + item; }).join('\n'),
      '',
      'Please structure the response around:',
      conceptTitles.map(function (item) { return '- ' + item; }).join('\n'),
      '',
      'Workflow requirements:',
      actionSteps.map(function (item) { return '- ' + item; }).join('\n'),
      '',
      'Before you finish, include a verification checklist based on this rule:',
      lesson.workedExample.verification
    ].join('\n'),
    note: 'Adapt the placeholders to your real document, workflow, and source material before you run it.'
  };
}

function enrichLessons(section, sectionType) {
  const seenIds = new Set();
  const seenSlugs = new Set();

  section.lessons = section.lessons.map(function (lesson, index) {
    const enriched = Object.assign({}, lesson);
    enriched.id = enriched.id || (sectionType === 'module'
      ? 'module-' + String(section.id).padStart(2, '0') + '-lesson-' + String(index + 1).padStart(2, '0')
      : section.id + '-lesson-' + String(index + 1).padStart(2, '0'));
    enriched.slug = enriched.slug || normalizeSlug(enriched.title);
    enriched.sequenceRationale = enriched.sequenceRationale || 'This lesson exists here to reinforce the module sequence from framing the work to applying it on a live deliverable.';
    enriched.promptExample = enriched.promptExample || buildPromptExample(enriched);

    validateLesson(enriched, sectionType + ' `' + section.title + '` lesson ' + (index + 1));
    assert(!seenIds.has(enriched.id), section.title + ': duplicate lesson id `' + enriched.id + '`.');
    assert(!seenSlugs.has(enriched.slug), section.title + ': duplicate lesson slug `' + enriched.slug + '`.');
    seenIds.add(enriched.id);
    seenSlugs.add(enriched.slug);

    if (lessonNeedsResourceReview(enriched)) {
      assert(Array.isArray(enriched.sourceNotes) && enriched.sourceNotes.length > 0, section.title + ' lesson `' + enriched.title + '` needs sourceNotes.');
      assert(parseMonthYear(enriched.lastReviewed), section.title + ' lesson `' + enriched.title + '` needs a valid lastReviewed date.');
    }

    return enriched;
  });

  section.lastReviewed = section.lastReviewed || maxReviewed(section.lessons);
  return section;
}

function validateModule(module) {
  const context = 'module `' + module.title + '`';
  ['id', 'slug', 'title', 'phase', 'summary', 'outcomes', 'nextModuleBridge', 'lessons'].forEach(function (key) {
    assert(module[key] !== undefined, context + ': missing `' + key + '`.');
  });
  assert(typeof module.id === 'number', context + ': id must be a number.');
  assert(typeof module.slug === 'string' && module.slug.trim(), context + ': slug is required.');
  assert(Number.isInteger(module.phase) && module.phase >= 1 && module.phase <= 5, context + ': phase must be between 1 and 5.');
  assert(Array.isArray(module.outcomes) && module.outcomes.length >= 2, context + ': outcomes must have at least 2 items.');
  assert(Array.isArray(module.lessons) && module.lessons.length === 5, context + ': core modules must have exactly 5 lessons.');
  validateResources(module.resources, context);
}

function validateBonus(section) {
  const context = 'bonus section `' + section.title + '`';
  ['id', 'slug', 'title', 'label', 'summary', 'outcomes', 'lessons'].forEach(function (key) {
    assert(section[key] !== undefined, context + ': missing `' + key + '`.');
  });
  assert(typeof section.id === 'string' && section.id.trim(), context + ': invalid id.');
  assert(typeof section.slug === 'string' && section.slug.trim(), context + ': invalid slug.');
  assert(Array.isArray(section.outcomes) && section.outcomes.length >= 2, context + ': outcomes must have at least 2 items.');
  assert(Array.isArray(section.lessons) && section.lessons.length >= 1, context + ': lessons are required.');
  validateResources(section.resources, context);
}

function loadProgramMeta() {
  const programPath = path.join(CONTENT_DIR, 'program.json');
  const meta = readJSON(programPath);
  assert(Array.isArray(meta.phases) && meta.phases.length === 5, 'program.json must define 5 phases.');
  assert(Array.isArray(meta.recentUpdates), 'program.json must define recentUpdates.');
  return meta;
}

function build() {
  const program = loadProgramMeta();
  const modules = listJSONFiles(MODULES_DIR).map(readJSON).sort(function (a, b) { return a.id - b.id; });
  const bonusSections = listJSONFiles(BONUS_DIR).map(readJSON);

  assert(modules.length === 21, 'Expected 21 core modules, found ' + modules.length + '.');

  const moduleIds = new Set();
  const moduleSlugs = new Set();
  modules.forEach(function (module) {
    module.slug = module.slug || 'module-' + module.id;
    validateModule(module);
    assert(!moduleIds.has(module.id), 'Duplicate module id `' + module.id + '`.');
    assert(!moduleSlugs.has(module.slug), 'Duplicate module slug `' + module.slug + '`.');
    moduleIds.add(module.id);
    moduleSlugs.add(module.slug);
    enrichLessons(module, 'module');
  });

  const bonusIds = new Set();
  const bonusSlugs = new Set();
  bonusSections.forEach(function (section) {
    validateBonus(section);
    assert(!bonusIds.has(section.id), 'Duplicate bonus id `' + section.id + '`.');
    assert(!bonusSlugs.has(section.slug), 'Duplicate bonus slug `' + section.slug + '`.');
    bonusIds.add(section.id);
    bonusSlugs.add(section.slug);
    enrichLessons(section, 'bonus');
  });

  const recentUpdates = (program.recentUpdates || []).map(function (item) {
    assert(typeof item.title === 'string' && item.title.trim(), 'recentUpdates items need a title.');
    assert(typeof item.date === 'string' && parseMonthYear(item.date), 'recentUpdates items need a `Month YYYY` date.');
    assert(typeof item.summary === 'string' && item.summary.trim(), 'recentUpdates items need a summary.');
    return item;
  });

  const runtime = {
    program: {
      title: program.title,
      description: program.description,
      phases: program.phases,
      recentUpdates: recentUpdates
    },
    courses: {},
    bonusSections: {}
  };

  modules.forEach(function (module) {
    runtime.courses[module.id] = module;
  });
  bonusSections.forEach(function (section) {
    runtime.bonusSections[section.id] = section;
  });

  const output = [
    '/* This file is generated by `npm run build:content`. Do not edit by hand. */',
    'var PROGRAM_META = ' + JSON.stringify(runtime.program, null, 2) + ';',
    'var COURSES = ' + JSON.stringify(runtime.courses, null, 2) + ';',
    'var BONUS_SECTIONS = ' + JSON.stringify(runtime.bonusSections, null, 2) + ';',
    ''
  ].join('\n');

  writeFile(OUTPUT_FILE, output);
  console.log('Built content to ' + path.relative(ROOT, OUTPUT_FILE));
}

build();
