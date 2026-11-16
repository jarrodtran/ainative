# Content Changelog

## November 2026

- Updated tool references to the current model families (GPT-6, Claude 5.5, Gemini 4) and replaced retired references (DALL-E image generation, ChatGPT plugins, GPT-4 examples).
- Glossary refreshed: foundation-model and multimodal examples now cite current models, and the context-window entry reflects the current ~1M-token frontier standard.
- OpenClaw bonus section: "OpenClaw In Context" now covers the OpenClaw Foundation stewardship and the project's scale; "Safe First Experiments" now covers the 2026 ClawHub malicious-skills incidents as a supply-chain vetting lesson. Both lessons re-reviewed November 2026.
- Added OpenClaw to the Tools & Resources page.
- New bonus section "The 2026 Model Landscape" (3 lessons): the GPT-6 / Claude / Gemini 4 families and tier pattern, open-weight versus closed models (Kimi K3.1 Pro, gated models, deprecation risk), and a protocol for reading model releases.
- New bonus section "GitHub For Non-Engineers" (3 lessons): repositories, commits, branches and forks; the daily loop of issues, pull requests, checks, and releases; and how non-engineers participate.
- Agents bonus section expanded from 6 to 8 lessons: "The Proactive Agent Wave" (Muse, Grok Bot, Dots, Claude Duet, Hermes; triggers, hosting, credentials, the silent path) and "Harnesses: The Software Around The Model" (agent = model + harness, the six harness jobs, scaffold versus harness, benchmark and cost evidence).
- Glossary: added Agent harness, Open-weight model, Proactive agent, and Pull request; refreshed the Reasoning model definition.
- New bonus section "Trust But Verify: Checking AI Output" (3 lessons): why confident answers can be wrong (confabulation, stale knowledge, borrowed confidence), a stakes-based checking workflow (skim, verify against primary sources, or hand to a qualified human), and a personal verification checklist with a one-minute citation test. New page trust-but-verify.html; homepage bonus card B4.
- Lesson visuals added to six more lessons: matrices on Open-Weight Versus Closed Models, When To Use An Agent Versus A Normal Assistant, and Compare Vendors More Systematically; flows on Prompt Chaining For Multi-Step Work, Structure Options And Tradeoffs, and Use A Simple Transformation Sequence.
- Fuller briefs: the core concepts in 64 lessons were expanded to two-to-three-sentence explanations — every lesson whose auto-derived "60-Second Version" ran under 40 words, plus Module 18's classification lesson (41 words) so the whole of Modules 18 and 20, the thinnest modules, now read in full. A complete re-scan of all 122 lessons finds zero briefs under the 40-word line (site minimum before this change: 21 words).
- Site plumbing: new pages model-landscape.html and github-essentials.html, homepage bonus cards B2/B3, and course.js now maps each bonus section to its own page.
- Lesson layout rebuilt (all 24 course pages, via the shared course.js renderer): brief-first "60-Second Version" auto-derived from each lesson's concepts, meta chips (time / use-when / outcome), one lesson in focus at a time with dot + outline + hash navigation, sticky apply rail (exercise as a checklist, artifact card, watch-outs), role variants as a lens switcher instead of four stacked accordions, and an optional per-lesson visual (matrix on The New Model Map, flow on How Engineers Use GitHub Every Day). The worked-example block no longer renders — the program teaches by brief, visual, concepts, and application, not cases.

## March 2026

- Introduced split source files and a deterministic build pipeline for curriculum content.
- Added validation for required lesson metadata, ids, slugs, resource links, and core module counts.
- Refreshed representative modules in foundations, workflow, advanced workflows, strategy, and the OpenClaw bonus section.
- Added selective Key Resources blocks for tool-sensitive lessons and modules.
