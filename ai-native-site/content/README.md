# AI Native Content Notes

The maintained curriculum now lives in split source files under:

- `/Users/jarrod/Desktop/AINative/ai-native-site/content/program.json`
- `/Users/jarrod/Desktop/AINative/ai-native-site/content/modules/`
- `/Users/jarrod/Desktop/AINative/ai-native-site/content/bonus/`

The frontend runtime artifact is generated into:

- `/Users/jarrod/Desktop/AINative/ai-native-site/js/courses.js`

Use these commands after content edits:

- `npm run build:content`
- `npm run validate:content`

Key expectations:

- Keep lessons practical for business individual contributors.
- Prefer durable workflow guidance over brittle tool trivia.
- Add or refresh `lastReviewed` when a tool-specific lesson changes.
- Keep every lesson tied to a real business task with a verification step.
- Keep the lesson `promptExample` concrete enough that a learner can adapt it on live work.
- Add `resources` selectively, not by default.

Supporting docs:

- `/Users/jarrod/Desktop/AINative/ai-native-site/content/CONTENT_MODEL.md`
- `/Users/jarrod/Desktop/AINative/ai-native-site/content/EDITORIAL_CHECKLIST.md`
- `/Users/jarrod/Desktop/AINative/ai-native-site/content/EDITORIAL_WORKFLOW.md`
- `/Users/jarrod/Desktop/AINative/ai-native-site/content/RELEASE_CHECKLIST.md`
- `/Users/jarrod/Desktop/AINative/ai-native-site/content/CHANGELOG.md`
