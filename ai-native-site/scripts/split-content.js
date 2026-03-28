#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const MODULES_DIR = path.join(CONTENT_DIR, 'modules');
const BONUS_DIR = path.join(CONTENT_DIR, 'bonus');
const COURSES_FILE = path.join(ROOT, 'js', 'courses.js');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeSlug(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function withLessonMeta(section, lesson, index) {
  return Object.assign({
    id: (typeof section.id === 'number'
      ? 'module-' + String(section.id).padStart(2, '0')
      : section.id) + '-lesson-' + String(index + 1).padStart(2, '0'),
    slug: normalizeSlug(lesson.title),
    sequenceRationale: 'This lesson exists here to move the learner from understanding the pattern to applying it on a live work artifact.'
  }, lesson);
}

const context = {};
vm.createContext(context);
vm.runInContext(fs.readFileSync(COURSES_FILE, 'utf8'), context);

ensureDir(MODULES_DIR);
ensureDir(BONUS_DIR);

Object.keys(context.COURSES).sort(function (a, b) { return Number(a) - Number(b); }).forEach(function (key) {
  const module = context.COURSES[key];
  const data = Object.assign({
    id: Number(key),
    slug: 'module-' + String(key).padStart(2, '0')
  }, module);
  data.lessons = data.lessons.map(function (lesson, index) {
    return withLessonMeta(data, lesson, index);
  });
  fs.writeFileSync(
    path.join(MODULES_DIR, 'module-' + String(key).padStart(2, '0') + '.json'),
    JSON.stringify(data, null, 2) + '\n'
  );
});

Object.keys(context.BONUS_SECTIONS).sort().forEach(function (key) {
  const section = context.BONUS_SECTIONS[key];
  const data = Object.assign({
    id: key,
    slug: normalizeSlug(section.title)
  }, section);
  data.lessons = data.lessons.map(function (lesson, index) {
    return withLessonMeta(data, lesson, index);
  });
  fs.writeFileSync(
    path.join(BONUS_DIR, key + '.json'),
    JSON.stringify(data, null, 2) + '\n'
  );
});

console.log('Split content into source JSON files.');
