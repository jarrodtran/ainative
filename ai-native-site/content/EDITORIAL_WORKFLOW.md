# Editorial Workflow

## Review cadence

- Review tool-specific or time-sensitive lessons at least quarterly.
- Review foundational lessons twice per year unless a major change makes them stale earlier.
- Review resource links whenever a linked product or document changes materially.

## What counts as reviewed

A lesson is only considered reviewed when:

- the lesson content was checked for accuracy,
- time-sensitive claims were confirmed or softened,
- `lastReviewed` was updated if the meaning changed,
- `sourceNotes` still reflect the reasoning behind tool-specific guidance,
- any `resources` were re-checked.

Small wording edits alone do not count as a review.

## Minor refresh vs major rewrite

Minor refresh:

- wording cleanup
- one example swapped for a better one
- resource links added or replaced
- tighter action block or verification language

Major rewrite:

- lesson objective or sequence role changes
- core concepts reorganized
- worked example replaced with a new workflow shape
- role variants materially changed
- module outcomes or progression changed

## Publishing steps

1. Edit source JSON in `content/modules/` or `content/bonus/`.
2. Run `npm run build:content`.
3. Fix any validation failures before touching the frontend.
4. Spot-check the rendered lesson or bonus page in the browser.
5. Update `/Users/jarrod/Desktop/AINative/ai-native-site/content/CHANGELOG.md` for meaningful learner-facing changes.

## Link policy

- Prefer official docs and primary sources.
- Keep lesson-level links rare and useful.
- Do not add links as a substitute for teaching the concept.
- Remove stale or low-signal links during every review cycle.
