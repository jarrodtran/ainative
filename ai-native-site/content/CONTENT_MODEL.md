# Content Model

The source of truth for curriculum content now lives in JSON under:

- `/Users/jarrod/Desktop/AINative/ai-native-site/content/program.json`
- `/Users/jarrod/Desktop/AINative/ai-native-site/content/modules/module-01.json` through `module-21.json`
- `/Users/jarrod/Desktop/AINative/ai-native-site/content/bonus/agents.json`

The runtime artifact consumed by the frontend is generated into:

- `/Users/jarrod/Desktop/AINative/ai-native-site/js/courses.js`

## Module Shape

Each core module file should contain:

- `id`
- `slug`
- `title`
- `phase`
- `summary`
- `outcomes`
- `nextModuleBridge`
- optional `resources`
- `lessons`

## Bonus Section Shape

Each bonus section file should contain:

- `id`
- `slug`
- `title`
- `label`
- `summary`
- `outcomes`
- optional `resources`
- `lessons`

## Lesson Shape

Each lesson should contain:

- `id`
- `slug`
- `title`
- `subtitle`
- `objective`
- `useWhen`
- `estimatedMinutes`
- `whyItMatters`
- `sequenceRationale`
- `coreConcepts`
- `workedExample`
- `artifact`
- `doThisNow`
- `promptExample`
- `commonMistakes`
- `roleVariants`
- `sourceNotes`
- `lastReviewed`
- optional `resources`

## Resource Shape

Each resource entry should contain:

- `title`
- `url`
- `type`
- optional `note`

Allowed `type` values:

- `official`
- `reference`
- `example`
- `further-reading`

## Build Commands

- `npm run build:content`
- `npm run validate:content`

Both commands rebuild and validate the runtime content artifact.
