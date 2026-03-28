function roleSet(manager, writer, analyst, operator) {
  return {
    manager: manager,
    writer: writer,
    analyst: analyst,
    operator: operator
  };
}

function notes(toolSpecific) {
  var base = [
    'Reviewed for business IC relevance and durable workflow guidance.',
    'Keep verification and organizational policy checks explicit in future revisions.'
  ];
  if (toolSpecific) {
    base.push('This lesson contains tool-selection guidance. Recheck named features during the next quarterly review.');
  }
  return base;
}

function lesson(cfg, defaults) {
  return {
    title: cfg.title,
    subtitle: cfg.subtitle,
    objective: cfg.objective,
    useWhen: cfg.useWhen || defaults.useWhen || cfg.subtitle,
    estimatedMinutes: cfg.estimatedMinutes || defaults.estimatedMinutes || 6,
    whyItMatters: cfg.whyItMatters,
    coreConcepts: cfg.coreConcepts,
    workedExample: cfg.workedExample,
    artifact: cfg.artifact,
    doThisNow: cfg.doThisNow,
    commonMistakes: cfg.commonMistakes,
    roleVariants: cfg.roleVariants || defaults.roleVariants,
    sourceNotes: cfg.sourceNotes || notes(!!cfg.toolSpecific),
    lastReviewed: cfg.lastReviewed || 'March 2026'
  };
}

var ROLE_SETS = {
  foundations: roleSet(
    'Frame AI requests around a deliverable, risk level, and reviewer before you ask for output.',
    'Use AI as a drafting and editing partner, then review for voice, facts, and audience fit.',
    'Treat AI as a hypothesis generator and explainer, not as a trusted source of record.',
    'Anchor every prompt in the real workflow, inputs, and downstream handoff.'
  ),
  productivity: roleSet(
    'Use AI to shorten prep, synthesis, and communication loops without removing judgment.',
    'Push for clearer source material, tighter briefs, and reusable language patterns.',
    'Separate analysis from storytelling so you can verify numbers before sharing narratives.',
    'Build repeatable handoff-ready outputs instead of one-off conversations.'
  ),
  strategy: roleSet(
    'Use AI to compare options, pressure-test plans, and prepare clearer stakeholder communication.',
    'Turn rough thinking into structured documents, memos, and decision briefs.',
    'Ask for assumptions, ranges, and missing data before acting on recommendations.',
    'Translate ambiguous work into checklists, workflows, and operating decisions.'
  ),
  enablement: roleSet(
    'Model safe adoption through small pilots, clear examples, and lightweight team habits.',
    'Document the prompts, examples, and edits that help others replicate quality.',
    'Define simple measures and evidence standards so adoption conversations stay grounded.',
    'Focus on workflow change and training, not just tool access.'
  )
};

var COURSES = {
  1: {
    title: 'How To Work With AI Systems',
    phase: 1,
    summary: 'Build a durable mental model for how AI responds, where it fails, and how to work with it safely in everyday knowledge work.',
    lessons: [
      lesson({
        title: 'A Working Mental Model',
        subtitle: 'Understand prediction, pattern matching, and why that changes how you prompt.',
        objective: 'Explain what an AI assistant is doing well enough to choose better requests and better review habits.',
        whyItMatters: 'People over-trust AI when they treat it like a database and under-use it when they treat it like a toy. A practical mental model gives you the useful middle ground.',
        coreConcepts: [
          { title: 'Prediction, Not Recall', text: 'Most AI assistants generate the next useful token based on patterns. That makes them flexible for drafting, summarizing, and restructuring work, but unreliable as an unverified source of truth.' },
          { title: 'Context Shapes Output', text: 'The model only sees the instructions, examples, and source material you provide in the current interaction. Better context almost always beats clever phrasing.' },
          { title: 'Judgment Stays Human', text: 'Your job is to define the task, supply the right material, and review the output for fit, facts, and consequences.' }
        ],
        workedExample: {
          scenario: 'A team lead asks AI to write a customer update with no context and gets a generic, overly confident email.',
          approach: 'They retry with the audience, decision status, approved facts, and tone requirements.',
          result: 'The second draft is close to usable because the model is predicting from the right context instead of filling gaps with generic business language.',
          verification: 'The lead checks dates, ownership, and any promises before sending.'
        },
        artifact: {
          label: 'Checklist',
          title: 'Before you ask AI for help',
          items: ['Name the deliverable.', 'State the audience.', 'Add the source material.', 'State what must not be changed.']
        },
        doThisNow: {
          task: 'Take one recurring writing or analysis task and rewrite your prompt around the real deliverable.',
          timebox: '8 minutes',
          steps: ['Write the exact output you need.', 'List the facts or source notes the model must use.', 'Add one sentence describing what a good result should sound like.']
        },
        commonMistakes: ['Asking for output before defining the job.', 'Treating a fluent answer as a verified answer.', 'Leaving out audience or constraints.']
      }, { roleVariants: ROLE_SETS.foundations }),
      lesson({
        title: 'Inputs, Context, and Constraints',
        subtitle: 'Most quality problems begin with missing context.',
        objective: 'Learn how to feed AI the information it needs without drowning it in irrelevant detail.',
        whyItMatters: 'The fastest way to improve results is usually not a smarter model. It is clearer source material, sharper constraints, and better examples.',
        coreConcepts: [
          { title: 'Inputs Beat Instructions Alone', text: 'A request like "summarize this for executives" works best when the relevant document, decision context, and audience needs are present.' },
          { title: 'Constraints Improve Quality', text: 'Word count, format, tone, exclusions, and approval boundaries narrow the solution space and reduce cleanup work.' },
          { title: 'Relevant Context Only', text: 'Include what changes the answer. Remove background that does not affect the deliverable or the model will spend attention on the wrong things.' }
        ],
        workedExample: {
          scenario: 'An operations manager asks AI to draft a process update from memory.',
          approach: 'They provide the old SOP, the actual policy change, and the intended audience.',
          result: 'The revision preserves what matters and updates only the sections that changed.',
          verification: 'The manager compares the output against the source policy and flags any steps that sound plausible but were not explicitly provided.'
        },
        artifact: {
          label: 'Template',
          title: 'Context block',
          items: ['Goal: what needs to be produced', 'Audience: who will use it', 'Source: what material is authoritative', 'Constraints: what cannot change']
        },
        doThisNow: {
          task: 'Pick one active task and build a four-line context block before your next AI prompt.',
          timebox: '10 minutes',
          steps: ['List the authoritative source.', 'Write two constraints.', 'Add the audience and expected format.']
        },
        commonMistakes: ['Pasting everything you have.', 'Forgetting to say what source is authoritative.', 'Asking for polish before accuracy.']
      }, { roleVariants: ROLE_SETS.foundations }),
      lesson({
        title: 'Why Output Varies',
        subtitle: 'Different outputs from the same request do not mean the system is broken.',
        objective: 'Set realistic expectations for variability and learn when to rerun, refine, or reset a conversation.',
        whyItMatters: 'AI is probabilistic. Understanding that helps you stop chasing a perfect single prompt and instead manage the workflow around the model.',
        coreConcepts: [
          { title: 'Variation Is Normal', text: 'Small wording shifts, model updates, and conversation history can change results. That is expected behavior, not necessarily a failure.' },
          { title: 'Threads Accumulate Baggage', text: 'Long chats often mix old assumptions with new requests. Starting a clean thread is often faster than arguing with stale context.' },
          { title: 'Stability Comes From Structure', text: 'Examples, explicit rubrics, and clear output formats make results more consistent than vague requests for the "best answer."' }
        ],
        workedExample: {
          scenario: 'A writer gets three noticeably different summaries from the same document.',
          approach: 'They create a rubric with audience, length, sections, and source-only requirements.',
          result: 'The summaries become far more stable because the expected structure is fixed.',
          verification: 'The writer compares each summary against the rubric instead of comparing vibes alone.'
        },
        artifact: {
          label: 'Rubric',
          title: 'Stability rubric',
          items: ['Audience', 'Length', 'Must-cover points', 'What to exclude']
        },
        doThisNow: {
          task: 'Rewrite one prompt as a rubric-based request and rerun it in a clean thread.',
          timebox: '7 minutes',
          steps: ['Specify the output sections.', 'Add what counts as success.', 'Compare the new result to your old version.']
        },
        commonMistakes: ['Assuming one great output means the prompt is production-ready.', 'Continuing a noisy thread too long.', 'Measuring quality without criteria.']
      }, { roleVariants: ROLE_SETS.foundations }),
      lesson({
        title: 'Hallucinations and Overreach',
        subtitle: 'Fluent language can hide weak evidence.',
        objective: 'Recognize when AI is inventing, stretching, or blending information so you can verify the right things.',
        whyItMatters: 'The harm usually comes from confident specifics: dates, names, citations, causal claims, and policy statements that sound reasonable but were not grounded in source material.',
        coreConcepts: [
          { title: 'High-Risk Claims', text: 'Factual statements, recommendations with business consequences, and anything that cites a source need more scrutiny than simple drafting assistance.' },
          { title: 'Source Grounding Reduces Drift', text: 'When you require the model to use supplied material and call out uncertainty, invented details decrease.' },
          { title: 'Verification Is Part Of The Task', text: 'Do not treat review as optional cleanup. It is part of the workflow whenever the output could influence a decision.' }
        ],
        workedExample: {
          scenario: 'An analyst asks AI for a competitor feature comparison and receives several unsupported claims.',
          approach: 'They rerun the task using pasted source excerpts and a "say unknown if not stated" rule.',
          result: 'The second output is narrower but more trustworthy.',
          verification: 'The analyst spot-checks every feature claim against the source notes before sharing.'
        },
        artifact: {
          label: 'Verification',
          title: 'Claim check sequence',
          items: ['Highlight all factual claims.', 'Mark which source supports each one.', 'Replace unsupported claims with "unknown" or a follow-up task.']
        },
        doThisNow: {
          task: 'Take one AI output you planned to use today and run a simple claim check on it.',
          timebox: '10 minutes',
          steps: ['Underline every specific fact.', 'Find the source for each fact.', 'Revise or remove anything unsupported.']
        },
        commonMistakes: ['Checking only tone and grammar.', 'Letting the model invent citations.', 'Asking for certainty when the evidence is incomplete.']
      }, { roleVariants: ROLE_SETS.foundations }),
      lesson({
        title: 'A Daily Operating Pattern',
        subtitle: 'Use AI with the same lightweight sequence every time.',
        objective: 'Build a repeatable loop for safe, efficient AI use on common business tasks.',
        whyItMatters: 'Consistency matters more than prompt cleverness. A simple operating pattern prevents avoidable errors and keeps the tool useful under time pressure.',
        coreConcepts: [
          { title: 'Frame', text: 'Define the task, audience, and constraints before you prompt.' },
          { title: 'Generate', text: 'Ask for a first pass with an explicit structure.' },
          { title: 'Review', text: 'Verify claims, adjust tone, and turn the output into a final work product.' }
        ],
        workedExample: {
          scenario: 'A project coordinator needs a vendor follow-up note, meeting summary, and task list.',
          approach: 'They run the same three-step loop for each output instead of improvising every time.',
          result: 'The work is faster and more consistent because the operating pattern stays fixed even when the task changes.',
          verification: 'Before sending, they confirm names, dates, and owner assignments.'
        },
        artifact: {
          label: 'Workflow',
          title: 'Three-step AI loop',
          items: ['Frame the work', 'Generate a first pass', 'Review and finalize']
        },
        doThisNow: {
          task: 'Write your own three-step AI loop in the language you would actually use at work.',
          timebox: '6 minutes',
          steps: ['List the three verbs you want to remember.', 'Add one review question for each step.', 'Save it where you can see it during daily work.']
        },
        commonMistakes: ['Skipping the review step when you are rushed.', 'Changing your approach completely for every task.', 'Using AI before clarifying the goal.']
      }, { roleVariants: ROLE_SETS.foundations })
    ]
  },
  2: {
    title: 'Choosing The Right AI Tool',
    phase: 1,
    summary: 'Learn how to match tasks to tool types, evaluate tradeoffs, and build a small stack that fits your real work.',
    lessons: [
      lesson({
        title: 'Tool Types, Not Tool Hype',
        subtitle: 'Think in capabilities first: chat, search, workspace, embedded AI, and automation.',
        objective: 'Classify AI tools by job-to-be-done so you can choose based on workflow fit instead of brand familiarity.',
        whyItMatters: 'Teams lose time when they switch tools for novelty instead of capability. A capability-first view reduces tool sprawl.',
        coreConcepts: [
          { title: 'General Assistants', text: 'Best for drafting, summarizing, outlining, and structured thinking when you can provide the needed context.' },
          { title: 'Research-Oriented Tools', text: 'Best when recent information, link tracing, and source visibility matter more than broad drafting flexibility.' },
          { title: 'Embedded AI', text: 'Best when the strongest advantage is access to work already living in email, docs, chat, or your existing stack.' }
        ],
        workedExample: {
          scenario: 'A business analyst uses one chat tool for everything, including fresh market research and internal document drafting.',
          approach: 'They separate the work into recent-information tasks, internal-document tasks, and writing tasks.',
          result: 'They stop forcing one tool to cover every mode of work.',
          verification: 'They compare output quality and review effort across three real tasks before deciding which tools stay in their stack.'
        },
        artifact: {
          label: 'Map',
          title: 'Capability map',
          items: ['Drafting and synthesis', 'Recent research', 'Work-inside-your-stack', 'Repeatable automation']
        },
        doThisNow: {
          task: 'List the last five AI tasks you attempted and label which capability type each one actually needed.',
          timebox: '9 minutes',
          steps: ['Write the task.', 'Label the tool type that fits it best.', 'Circle where you used the wrong mode.']
        },
        commonMistakes: ['Using a familiar tool for every task.', 'Comparing tools without testing the same workflow.', 'Mistaking marketing claims for workflow fit.']
      }, { roleVariants: ROLE_SETS.foundations, toolSpecific: true }),
      lesson({
        title: 'Selecting Between General Assistants',
        subtitle: 'Choose based on workflow fit, source handling, and the kind of help you need.',
        objective: 'Create a practical rubric for choosing among general AI assistants without relying on stale feature lists.',
        whyItMatters: 'Tool capabilities change frequently. A decision rubric survives updates better than memorizing comparisons.',
        coreConcepts: [
          { title: 'Start With Your Work', text: 'Evaluate tools against writing, synthesis, document review, and analysis tasks you already do every week.' },
          { title: 'Judge The Review Burden', text: 'A tool that gives a decent draft with low cleanup can be more valuable than one that looks smarter in a demo.' },
          { title: 'Consider Trust And Access', text: 'Workspace integration, source visibility, and company approval may matter more than raw model quality.' }
        ],
        workedExample: {
          scenario: 'A manager debates between two assistants based on online opinions.',
          approach: 'They test both on a meeting summary, policy rewrite, and planning memo using the same inputs and rubric.',
          result: 'The choice becomes obvious because one tool fits their actual review burden and integration needs better.',
          verification: 'They compare draft quality, time-to-final, and whether the tool exposes enough evidence for checking.'
        },
        artifact: {
          label: 'Scorecard',
          title: 'General assistant scorecard',
          items: ['Quality on my tasks', 'Cleanup required', 'Evidence and transparency', 'Workspace fit']
        },
        doThisNow: {
          task: 'Build a four-column scorecard for any two AI assistants you are considering.',
          timebox: '8 minutes',
          steps: ['Choose two real tasks.', 'Run the same input through both tools.', 'Score which one created less cleanup.']
        },
        commonMistakes: ['Choosing from internet rankings alone.', 'Testing only fun prompts.', 'Ignoring security or approval constraints.']
      }, { roleVariants: ROLE_SETS.foundations, toolSpecific: true }),
      lesson({
        title: 'When Research Tools Win',
        subtitle: 'Recent information and source traceability require a different evaluation standard.',
        objective: 'Know when to switch from a drafting assistant to a research-oriented tool or a manual search workflow.',
        whyItMatters: 'The wrong tool can make fresh-information tasks look easier than they are, while quietly introducing unsupported claims.',
        coreConcepts: [
          { title: 'Freshness Matters', text: 'If the answer depends on current information, look for tools or workflows that expose sources and timestamps.' },
          { title: 'Traceability Matters More', text: 'A weaker answer with clear links is often better than a polished answer with no visible evidence.' },
          { title: 'Research Still Needs Review', text: 'AI can speed triage and synthesis, but you still decide what evidence is credible enough to use.' }
        ],
        workedExample: {
          scenario: 'A writer needs current policy language for a client note.',
          approach: 'They use a source-forward research workflow, then bring verified excerpts back into a drafting assistant.',
          result: 'The final note is both current and well-written.',
          verification: 'They open the linked sources and confirm the exact language before publishing.'
        },
        artifact: {
          label: 'Decision Rule',
          title: 'Switch to research mode when',
          items: ['The answer depends on recent events.', 'You need citations or links.', 'You must defend the evidence to another person.']
        },
        doThisNow: {
          task: 'Identify one task this week where you should use a source-first workflow instead of a general chat prompt.',
          timebox: '5 minutes',
          steps: ['Write the task.', 'State why freshness matters.', 'Decide how you will verify the sources.']
        },
        commonMistakes: ['Asking a general assistant for live facts without checking.', 'Sharing research summaries with no links.', 'Confusing a confident answer with a sourced answer.']
      }, { roleVariants: ROLE_SETS.foundations, toolSpecific: true }),
      lesson({
        title: 'Build A Small, Stable Stack',
        subtitle: 'Most people need fewer tools, not more.',
        objective: 'Decide what belongs in your personal stack and what should stay on a watch list.',
        whyItMatters: 'Too many tools create cognitive load, inconsistent habits, and duplicated subscriptions with little added value.',
        coreConcepts: [
          { title: 'Keep A Core Stack', text: 'One general assistant, one research workflow, and the AI already embedded in your primary workspace is enough for most business ICs.' },
          { title: 'Use A Watch List', text: 'Capture interesting tools without adopting them immediately. Curiosity is good; constant switching is expensive.' },
          { title: 'Adopt For A Task', text: 'Add a tool only when it clearly improves a recurring task you already care about.' }
        ],
        workedExample: {
          scenario: 'An operator has five subscriptions but still uses only two each week.',
          approach: 'They map each tool to a recurring workflow and cancel the ones with no clear role.',
          result: 'Their stack gets smaller and their habits improve.',
          verification: 'They measure whether the remaining tools cover the same work with less switching.'
        },
        artifact: {
          label: 'Inventory',
          title: 'Keep / watch / cancel',
          items: ['Keep what improves a recurring task.', 'Watch what looks promising but unproven.', 'Cancel what adds no clear workflow value.']
        },
        doThisNow: {
          task: 'Sort your current AI tools into keep, watch, and cancel.',
          timebox: '10 minutes',
          steps: ['Write the task each tool supports.', 'Mark how often you actually use it.', 'Cancel or pause one tool that lacks a clear role.']
        },
        commonMistakes: ['Keeping tools for hypothetical future use.', 'Adding tools before mastering the current stack.', 'Letting demos drive adoption.']
      }, { roleVariants: ROLE_SETS.foundations, toolSpecific: true }),
      lesson({
        title: 'Evaluate New Tools Without Distraction',
        subtitle: 'Use a simple test plan before changing your workflow.',
        objective: 'Create a lightweight evaluation habit for new AI tools and features.',
        whyItMatters: 'The field changes quickly. A repeatable evaluation approach lets you stay current without becoming reactive.',
        coreConcepts: [
          { title: 'Test On Real Work', text: 'The only fair evaluation is a task you already do, with the same review standard you would use in production.' },
          { title: 'Measure Adoption Cost', text: 'Setup time, switching friction, and training needs count just as much as output quality.' },
          { title: 'Delay Optional Decisions', text: 'Interesting does not mean urgent. Most tools can wait until they prove a real workflow advantage.' }
        ],
        workedExample: {
          scenario: 'A coordinator is tempted by a new AI note-taking app.',
          approach: 'They test it on one live meeting, compare the output to their current process, and score the cleanup burden.',
          result: 'They make a grounded decision in one short session instead of weeks of low-grade distraction.',
          verification: 'They compare accuracy, follow-up usefulness, and the effort needed to onboard the rest of the team.'
        },
        artifact: {
          label: 'Test Plan',
          title: '30-minute tool evaluation',
          items: ['Pick one recurring task.', 'Use the same source material.', 'Score quality, review effort, and switching cost.']
        },
        doThisNow: {
          task: 'Write a 30-minute evaluation plan for the next AI tool you are curious about.',
          timebox: '6 minutes',
          steps: ['Name the task you will test.', 'State what success looks like.', 'List what would make the tool not worth adopting.']
        },
        commonMistakes: ['Researching endlessly before testing.', 'Testing on novelty prompts.', 'Ignoring onboarding and change costs.']
      }, { roleVariants: ROLE_SETS.foundations, toolSpecific: true })
    ]
  },
  3: {
    title: 'Prompting For Useful Work',
    phase: 1,
    summary: 'Turn vague requests into clear, repeatable prompt patterns that produce work-ready drafts instead of generic filler.',
    lessons: [
      lesson({
        title: 'The Four Inputs Of A Strong Prompt',
        subtitle: 'Task, audience, source material, and output shape.',
        objective: 'Use a simple structure for prompts that improves quality without overcomplicating the request.',
        whyItMatters: 'Most weak prompts fail in predictable ways: unclear job, missing context, no audience, or no output shape.',
        coreConcepts: [
          { title: 'Task', text: 'Say exactly what needs to be produced and what decision or action it should support.' },
          { title: 'Source Material', text: 'Provide the raw material, approved facts, or examples the model should rely on.' },
          { title: 'Output Shape', text: 'State the format you want so the draft arrives closer to how you need to use it.' }
        ],
        workedExample: {
          scenario: 'A user asks for "a better summary" and gets a vague paragraph.',
          approach: 'They specify audience, source notes, a three-bullet structure, and the decision the summary should support.',
          result: 'The output becomes clear and directly usable.',
          verification: 'They check whether every bullet is supported by the provided notes.'
        },
        artifact: {
          label: 'Template',
          title: 'Prompt skeleton',
          items: ['Task', 'Audience', 'Source material', 'Format', 'Review instruction']
        },
        doThisNow: {
          task: 'Rewrite one of your existing prompts using the prompt skeleton.',
          timebox: '8 minutes',
          steps: ['State the exact deliverable.', 'Paste only the relevant source material.', 'Add a format and one review rule.']
        },
        commonMistakes: ['Trying to sound smart instead of specific.', 'Leaving the model to guess the audience.', 'Not asking for an explicit structure.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Roles And Perspective',
        subtitle: 'A role is useful when it sharpens judgment, not when it adds theater.',
        objective: 'Use role instructions to improve perspective and quality rather than to create empty prompt ritual.',
        whyItMatters: 'A good role narrows the lens of the response. A bad role just decorates the prompt without changing the work.',
        coreConcepts: [
          { title: 'Use Functional Roles', text: 'Ask for the perspective that matters to the task: reviewer, planner, editor, or analyst.' },
          { title: 'Tie The Role To Criteria', text: 'Define what the role should optimize for, such as clarity, risk awareness, or audience fit.' },
          { title: 'Keep The Role Lightweight', text: 'One clear line about perspective is usually enough.' }
        ],
        workedExample: {
          scenario: 'A manager needs a difficult status update rewritten for senior leaders.',
          approach: 'They ask the model to act as an executive editor focused on clarity, risk visibility, and brevity.',
          result: 'The tone and structure improve because the role changes the evaluation standard.',
          verification: 'The manager checks that the new draft still reflects the actual project status and does not soften key risks.'
        },
        artifact: {
          label: 'Prompt Move',
          title: 'Role pattern',
          items: ['Act as: [functional role]', 'Optimize for: [criteria]', 'Avoid: [what would make this wrong]']
        },
        doThisNow: {
          task: 'Add one functional role and one optimization rule to a prompt you already use.',
          timebox: '5 minutes',
          steps: ['Choose the relevant role.', 'Define what that role should optimize for.', 'Remove any decorative fluff.']
        },
        commonMistakes: ['Using a role with no evaluation criteria.', 'Adding dramatic persona language that does not affect the work.', 'Assuming the role changes facts.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Examples And Output Formats',
        subtitle: 'Examples are often the shortest path to better results.',
        objective: 'Use examples, structure, and formatting cues to make outputs more consistent and easier to review.',
        whyItMatters: 'When the model sees a good example or precise layout, it spends less effort guessing the form of the answer.',
        coreConcepts: [
          { title: 'Show, Do Not Only Tell', text: 'A short example of the expected format usually improves output more than extra explanation.' },
          { title: 'Separate Content From Shape', text: 'Define the structure clearly so you can judge the substance independently.' },
          { title: 'Consistency Helps Reuse', text: 'Stable output formats are easier to turn into templates and team playbooks.' }
        ],
        workedExample: {
          scenario: 'An analyst needs weekly updates in the same format every time.',
          approach: 'They provide last week’s approved format as the model example and ask the model to reuse the structure only.',
          result: 'The update becomes consistent and easier to compare week to week.',
          verification: 'The analyst confirms the new draft did not carry over stale facts from the example.'
        },
        artifact: {
          label: 'Example',
          title: 'Formatting moves',
          items: ['Provide a small approved example.', 'Say which parts are structure only.', 'List any fields that must be updated from new source material.']
        },
        doThisNow: {
          task: 'Find one approved past document and use it as a format example in your next prompt.',
          timebox: '8 minutes',
          steps: ['Highlight the structure you want to copy.', 'Tell the model not to reuse old facts.', 'Compare the final output against the original format.']
        },
        commonMistakes: ['Providing examples without saying what to copy.', 'Letting the model reuse stale content.', 'Treating format consistency as trivial.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Fixing A Weak Output',
        subtitle: 'Do not start over every time; diagnose what is missing.',
        objective: 'Use targeted follow-ups to improve low-quality drafts instead of repeatedly asking for a rewrite.',
        whyItMatters: 'Most bad outputs fail for a small number of reasons. Diagnosing the failure saves time and teaches you which context matters most.',
        coreConcepts: [
          { title: 'Name The Failure', text: 'Say whether the issue is missing context, wrong tone, weak structure, unsupported claims, or poor prioritization.' },
          { title: 'Add One Constraint At A Time', text: 'Change a small number of variables so you learn what actually improved the result.' },
          { title: 'Reset When Needed', text: 'If the thread is noisy or confused, restate the task in a clean prompt instead of patching endlessly.' }
        ],
        workedExample: {
          scenario: 'A draft memo is too long and buries the decision.',
          approach: 'The user asks for a rewrite that leads with the decision, limits the memo to five bullets, and marks any unsupported claims.',
          result: 'The second draft is much easier to use because the failure mode was explicitly corrected.',
          verification: 'The user checks that the shorter version still preserves the key facts from the source notes.'
        },
        artifact: {
          label: 'Checklist',
          title: 'Diagnose before rewrite',
          items: ['What is wrong?', 'What is missing?', 'What should stay?', 'Is a clean restart faster?']
        },
        doThisNow: {
          task: 'Take one weak AI output and improve it with a diagnostic follow-up instead of a generic rewrite request.',
          timebox: '7 minutes',
          steps: ['Name the main failure mode.', 'Add one new rule.', 'Decide whether the thread should be reset.']
        },
        commonMistakes: ['Saying "make it better" with no diagnosis.', 'Changing too many variables at once.', 'Continuing a broken thread too long.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Building A Reusable Prompt Library',
        subtitle: 'Save patterns, not just good prompts.',
        objective: 'Turn successful prompts into reusable assets that are easier to maintain and teach.',
        whyItMatters: 'A prompt library compounds your learning. It reduces rework and gives teammates a starting point that already reflects your standards.',
        coreConcepts: [
          { title: 'Save The Context Pattern', text: 'What matters most is often the structure of the request and review rules, not the exact wording.' },
          { title: 'Store An Example Output', text: 'A prompt paired with a good sample is easier to reuse than a prompt alone.' },
          { title: 'Note The Review Standard', text: 'Capture what still had to be checked or edited so others understand the limits.' }
        ],
        workedExample: {
          scenario: 'A coordinator keeps rebuilding the same meeting follow-up prompt from scratch.',
          approach: 'They save the context block, the output format, and the review notes from a successful version.',
          result: 'Future follow-ups become faster and more consistent.',
          verification: 'They confirm the saved prompt works on a second meeting before calling it reusable.'
        },
        artifact: {
          label: 'Library',
          title: 'Prompt entry fields',
          items: ['Use case', 'Prompt pattern', 'Example output', 'Review notes', 'Last reviewed']
        },
        doThisNow: {
          task: 'Create one prompt library entry from a prompt that worked well this month.',
          timebox: '10 minutes',
          steps: ['Save the prompt pattern.', 'Attach the source material rules.', 'Note what still required human review.']
        },
        commonMistakes: ['Saving only the final wording.', 'Not storing examples.', 'Assuming a prompt is reusable after one success.']
      }, { roleVariants: ROLE_SETS.productivity })
    ]
  },
  4: {
    title: 'Safe And Responsible AI Use',
    phase: 1,
    summary: 'Use AI with stronger data judgment, verification habits, and policy awareness so speed never outruns trust.',
    lessons: [
      lesson({
        title: 'Know Your Data Boundaries',
        subtitle: 'The first safety question is what material belongs in the prompt at all.',
        objective: 'Classify inputs by sensitivity and choose safer ways to work when the material is risky.',
        whyItMatters: 'The easiest AI mistake is not a bad answer. It is putting the wrong information into the system in the first place.',
        coreConcepts: [
          { title: 'Separate Public From Sensitive', text: 'Not all work material carries the same risk. Customer data, employee data, contracts, and regulated information need stricter handling.' },
          { title: 'Minimize Before You Paste', text: 'If you can abstract, redact, or summarize the sensitive parts while preserving the task, do that first.' },
          { title: 'Use Approved Paths', text: 'Company-approved tools, internal instances, and redaction workflows matter more than individual convenience.' }
        ],
        workedExample: {
          scenario: 'A writer wants AI help on a customer escalation note that contains account details.',
          approach: 'They remove identifying information and provide the issue pattern, approved facts, and desired tone instead of raw customer data.',
          result: 'They still get useful writing help without moving sensitive details into the prompt.',
          verification: 'They confirm the final note reintroduces only the approved customer-specific facts from the source system.'
        },
        artifact: {
          label: 'Checklist',
          title: 'Before you paste work material',
          items: ['Is this approved for AI use?', 'Can I redact or abstract it?', 'Do I need a safer workflow?']
        },
        doThisNow: {
          task: 'Pick one AI use case you do today and define what data must be removed before prompting.',
          timebox: '6 minutes',
          steps: ['Name the task.', 'List the sensitive fields.', 'Write a redacted version you could safely use.']
        },
        commonMistakes: ['Pasting raw customer or employee data by default.', 'Assuming paid access equals full approval.', 'Ignoring redaction because it feels inconvenient.']
      }, { roleVariants: ROLE_SETS.foundations }),
      lesson({
        title: 'What To Never Trust Without Review',
        subtitle: 'Some outputs always deserve a second look.',
        objective: 'Identify categories of AI output that require explicit human review before use.',
        whyItMatters: 'Not all AI mistakes are equal. Review effort should scale with the business consequence of being wrong.',
        coreConcepts: [
          { title: 'High-Consequence Claims', text: 'Legal, compliance, financial, customer-facing, and policy statements deserve stricter checks.' },
          { title: 'Specifics Need Evidence', text: 'Dates, names, numbers, pricing, citations, and quoted language should be verified against a real source.' },
          { title: 'Advice Is Still Drafting', text: 'Even when AI suggests a strong course of action, it is preparing a recommendation for human judgment, not making the decision.' }
        ],
        workedExample: {
          scenario: 'A program manager asks AI to summarize new contract language.',
          approach: 'They treat the output as a drafting aid and compare every obligation statement to the actual contract.',
          result: 'The summary becomes useful without pretending the AI performed legal review.',
          verification: 'Every clause used in the summary is checked against the source document.'
        },
        artifact: {
          label: 'Review Rule',
          title: 'Mandatory review categories',
          items: ['Anything customer-facing', 'Anything with numbers', 'Anything policy-related', 'Anything that changes risk or cost']
        },
        doThisNow: {
          task: 'Write your personal "always review" list for the work you do most often.',
          timebox: '5 minutes',
          steps: ['List the risky output types.', 'Define who should review them.', 'Save the list beside your prompt library.']
        },
        commonMistakes: ['Reviewing every output the same way.', 'Skipping checks on polished language.', 'Treating AI summaries as authoritative.']
      }, { roleVariants: ROLE_SETS.foundations }),
      lesson({
        title: 'Verification As A Habit',
        subtitle: 'Fast review beats late correction.',
        objective: 'Build a lightweight verification sequence that fits daily work instead of feeling like extra bureaucracy.',
        whyItMatters: 'Verification only works if it is simple enough to use under deadline pressure.',
        coreConcepts: [
          { title: 'Check The Critical Few', text: 'Review the parts that could cause harm: claims, commitments, owners, numbers, and policy statements.' },
          { title: 'Use Source-First Review', text: 'Go back to the original note, document, spreadsheet, or policy before trusting the polished output.' },
          { title: 'Mark Uncertainty', text: 'If something cannot be confirmed quickly, label it as open instead of pretending certainty.' }
        ],
        workedExample: {
          scenario: 'An analyst uses AI to prepare a project status summary from meeting notes.',
          approach: 'They verify dates, owners, and blockers against the source notes and mark uncertain items as open questions.',
          result: 'The summary remains fast to produce without spreading bad details.',
          verification: 'The analyst checks three items systematically before sending: owner, deadline, and risk statement.'
        },
        artifact: {
          label: 'Sequence',
          title: 'Three-point verification',
          items: ['Check the facts.', 'Check the decision or owner.', 'Check anything that could create risk if wrong.']
        },
        doThisNow: {
          task: 'Attach a three-point verification routine to one of your common AI workflows.',
          timebox: '7 minutes',
          steps: ['Choose the workflow.', 'List the three fields you must check.', 'Use it on the next output you generate.']
        },
        commonMistakes: ['Only reading for tone.', 'Assuming shorter outputs need less review.', 'Ignoring uncertainty because the draft looks finished.']
      }, { roleVariants: ROLE_SETS.foundations }),
      lesson({
        title: 'Working Within Policy',
        subtitle: 'Good AI habits include knowing what your organization has already decided.',
        objective: 'Translate organizational AI policy into practical day-to-day behavior.',
        whyItMatters: 'Adoption stalls when policy feels abstract. It succeeds when people know exactly what rules mean in the moment of work.',
        coreConcepts: [
          { title: 'Know The Allowed Tools', text: 'Approval often applies to specific tools, plans, connectors, or data classes rather than to AI in general.' },
          { title: 'Know The Escalation Path', text: 'When the work falls into a gray area, knowing who decides is part of responsible use.' },
          { title: 'Turn Policy Into Prompts', text: 'Simple reminders such as "use source text only" or "do not include identifiers" make policy practical.' }
        ],
        workedExample: {
          scenario: 'A team member is unsure whether internal financial notes can be used in an approved AI workspace.',
          approach: 'They check the policy, confirm the allowed data classes, and ask the reviewer when the case is ambiguous.',
          result: 'The work continues without guessing at the rule.',
          verification: 'The final workflow is documented so the next person does not have to rediscover the same boundary.'
        },
        artifact: {
          label: 'Policy Notes',
          title: 'Translate policy into action',
          items: ['Approved tool', 'Allowed data', 'Required review', 'Escalation contact']
        },
        doThisNow: {
          task: 'Write a one-page translation of your organization’s AI policy into plain working rules.',
          timebox: '10 minutes',
          steps: ['List approved tools.', 'List prohibited data.', 'List who to ask when unsure.']
        },
        commonMistakes: ['Assuming policy is obvious.', 'Treating approval as universal across all data types.', 'Relying on hearsay instead of the actual rule.']
      }, { roleVariants: ROLE_SETS.foundations }),
      lesson({
        title: 'A Safe Daily Checklist',
        subtitle: 'Use the same short checklist whenever you work with AI.',
        objective: 'Create a daily checklist that balances speed, privacy, and verification.',
        whyItMatters: 'A short checklist is easier to maintain than a long policy deck, and it keeps good habits visible under pressure.',
        coreConcepts: [
          { title: 'Check The Inputs', text: 'Is this prompt safe for the selected tool?' },
          { title: 'Check The Output', text: 'What claims or commitments need review before use?' },
          { title: 'Check The Destination', text: 'Who will read this and what happens if it is wrong?' }
        ],
        workedExample: {
          scenario: 'A coordinator uses AI several times per day for communication and planning.',
          approach: 'They keep a visible checklist next to their prompt library and apply it before sharing any final output.',
          result: 'The workflow stays fast while avoiding careless errors.',
          verification: 'The checklist includes a final stop on factual and approval-sensitive claims.'
        },
        artifact: {
          label: 'Checklist',
          title: 'Daily safe-use checklist',
          items: ['Safe input?', 'Clear task?', 'Verified claims?', 'Right reviewer?', 'Right destination?']
        },
        doThisNow: {
          task: 'Draft a five-line AI checklist you can use daily.',
          timebox: '5 minutes',
          steps: ['Write the five questions.', 'Keep them visible.', 'Use them on your next AI-generated deliverable.']
        },
        commonMistakes: ['Making the checklist too long.', 'Using it only for big tasks.', 'Skipping it when the output looks polished.']
      }, { roleVariants: ROLE_SETS.foundations })
    ]
  },
  5: {
    title: 'Writing And Communication',
    phase: 2,
    summary: 'Use AI to draft, reshape, and polish everyday business communication without losing judgment or voice.',
    lessons: [
      lesson({
        title: 'Draft From A Real Brief',
        subtitle: 'Writing gets better when the prompt starts from intent, audience, and source facts.',
        objective: 'Use AI to create stronger first drafts for emails, memos, updates, and internal notes.',
        whyItMatters: 'Most business writing problems are not grammar problems. They are clarity, audience, and structure problems, which AI can help surface quickly.',
        coreConcepts: [
          { title: 'Brief First', text: 'State the message, the audience, and the desired response before asking for prose.' },
          { title: 'Source The Facts', text: 'Provide approved facts and decisions so the draft does not invent context.' },
          { title: 'Draft In Layers', text: 'Get the structure right first, then refine tone and polish.' }
        ],
        workedExample: {
          scenario: 'A project lead needs to explain a slip in timeline without causing panic.',
          approach: 'They provide the facts, audience concerns, and the one action they want from the reader.',
          result: 'The draft communicates clearly without sounding vague or defensive.',
          verification: 'They check that the note does not overpromise recovery steps not yet approved.'
        },
        artifact: {
          label: 'Brief',
          title: 'Writing brief',
          items: ['What happened', 'What matters to the reader', 'What action or response you want', 'What not to imply']
        },
        doThisNow: {
          task: 'Use a four-line brief to draft one message you already need to send today.',
          timebox: '8 minutes',
          steps: ['Write the reader and goal.', 'Paste the approved facts.', 'Ask for a structured first draft.']
        },
        commonMistakes: ['Prompting from memory instead of source notes.', 'Optimizing for polish before clarity.', 'Letting the draft make promises you have not approved.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Rewrite For Audience And Tone',
        subtitle: 'The same information should sound different to different readers.',
        objective: 'Adapt one core message for executives, peers, customers, or partners without rewriting from scratch each time.',
        whyItMatters: 'Audience mismatch is one of the most common communication failures. AI can help vary tone and density while keeping the core message stable.',
        coreConcepts: [
          { title: 'Keep The Message Stable', text: 'Change tone, framing, and detail level without changing the approved facts.' },
          { title: 'Name The Reader’s Need', text: 'Executives want direction and risk. Peers often want process detail. Customers want impact and next steps.' },
          { title: 'Review For Over-Editing', text: 'AI can over-soften or over-formalize. Preserve the actual stakes and your own voice.' }
        ],
        workedExample: {
          scenario: 'A writer needs one update for leadership and another for a customer account team.',
          approach: 'They generate two versions from the same source facts with different audience instructions.',
          result: 'The outputs are tailored without creating conflicting stories.',
          verification: 'They compare both versions against the same approved fact list.'
        },
        artifact: {
          label: 'Matrix',
          title: 'Audience matrix',
          items: ['Audience', 'What they care about', 'What detail they need', 'Tone to avoid']
        },
        doThisNow: {
          task: 'Take one message and rewrite it for two different audiences.',
          timebox: '9 minutes',
          steps: ['List the shared facts.', 'Define the audience needs.', 'Check both versions for consistency.']
        },
        commonMistakes: ['Changing the facts with the tone.', 'Using one-size-fits-all language.', 'Forgetting to remove internal jargon for external readers.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Edit And Tighten',
        subtitle: 'AI is often more valuable as an editor than as a first drafter.',
        objective: 'Use AI to improve clarity, flow, and concision on material you already wrote.',
        whyItMatters: 'Editing preserves your reasoning while reducing the time spent trimming, smoothing, and restructuring.',
        coreConcepts: [
          { title: 'Start With Your Draft', text: 'When the ideas are already yours, AI can help with clarity without taking over the substance.' },
          { title: 'Ask For A Specific Edit', text: 'Shorter, clearer, more direct, more executive-friendly, or more diplomatic are better instructions than "improve this."' },
          { title: 'Compare Versions', text: 'Review what changed so you do not accidentally lose important nuance.' }
        ],
        workedExample: {
          scenario: 'An analyst has a strong draft but it reads too dense for leadership.',
          approach: 'They ask AI to preserve the logic while shortening, clarifying, and moving the recommendation to the top.',
          result: 'The memo stays accurate but becomes easier to consume.',
          verification: 'They compare the original and edited version to ensure caveats were not dropped.'
        },
        artifact: {
          label: 'Prompt Move',
          title: 'Editing request',
          items: ['Keep the facts unchanged.', 'Improve clarity for [audience].', 'Shorten by [target].', 'Preserve these points.']
        },
        doThisNow: {
          task: 'Take one piece of writing you drafted yourself and use AI as an editor rather than a writer.',
          timebox: '7 minutes',
          steps: ['Paste your draft.', 'State what to preserve.', 'Review what changed before accepting edits.']
        },
        commonMistakes: ['Accepting edits without comparison.', 'Giving no preservation rules.', 'Using editing help to avoid making the actual decision.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Turn Notes Into Communication',
        subtitle: 'Move from rough bullet points to useful communication assets.',
        objective: 'Convert meeting notes, project bullets, or rough thinking into clear communication artifacts.',
        whyItMatters: 'A lot of writing work starts as fragments. AI is especially good at lifting fragments into a usable first structure.',
        coreConcepts: [
          { title: 'Structure The Fragments', text: 'Tell the model what each bullet represents before asking for finished prose.' },
          { title: 'Ask For Missing Questions', text: 'A good assistant can point out what information is absent before you finalize the draft.' },
          { title: 'Keep Humans On Commitments', text: 'Never let AI decide ownership, dates, or promises from incomplete notes.' }
        ],
        workedExample: {
          scenario: 'An operator has messy notes after a customer call.',
          approach: 'They label the notes as facts, requests, risks, and next steps before asking for a recap email.',
          result: 'The final message is cleaner and more accurate.',
          verification: 'They confirm the draft did not invent commitments not present in the notes.'
        },
        artifact: {
          label: 'Organizer',
          title: 'Fragment labels',
          items: ['Facts', 'Decisions', 'Requests', 'Risks', 'Next steps']
        },
        doThisNow: {
          task: 'Take a rough set of bullets and turn them into one polished communication asset.',
          timebox: '10 minutes',
          steps: ['Label the bullets first.', 'Ask for a draft in your required format.', 'Review every commitment and owner.']
        },
        commonMistakes: ['Pasting unlabeled notes.', 'Letting the model infer commitments.', 'Skipping a final fact check because the prose looks finished.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Create Writing Templates That Stick',
        subtitle: 'Capture your strongest communication patterns for reuse.',
        objective: 'Turn repeat writing tasks into reusable prompt-and-review templates.',
        whyItMatters: 'Templates reduce decision fatigue and make quality easier to reproduce across the month, not just once.',
        coreConcepts: [
          { title: 'Template The Repeated Jobs', text: 'Status updates, customer recaps, meeting follow-ups, and executive notes are prime candidates.' },
          { title: 'Include Review Rules', text: 'A template is not complete until it says what must be checked before sending.' },
          { title: 'Refresh With Real Use', text: 'Templates improve through reuse. Update them when your edits reveal a missing rule.' }
        ],
        workedExample: {
          scenario: 'A manager writes the same project update every Friday.',
          approach: 'They save the context pattern, section headings, and review rules from a successful version.',
          result: 'Friday updates become faster without feeling robotic.',
          verification: 'They revise the template after two uses to remove redundant instructions and add a missed risk check.'
        },
        artifact: {
          label: 'Template',
          title: 'Communication template fields',
          items: ['Use case', 'Context block', 'Required sections', 'Review checklist', 'Last updated']
        },
        doThisNow: {
          task: 'Convert one frequent writing job into a reusable template.',
          timebox: '10 minutes',
          steps: ['Pick the recurring message.', 'Save the prompt structure.', 'Add the final review checklist.']
        },
        commonMistakes: ['Saving a prompt without the review rules.', 'Templateing rare tasks.', 'Never updating the template after reuse.']
      }, { roleVariants: ROLE_SETS.productivity })
    ]
  },
  6: {
    title: 'Research And Synthesis',
    phase: 2,
    summary: 'Use AI to speed up reading, synthesis, and insight generation while staying anchored in source material.',
    lessons: [
      lesson({
        title: 'Research Starts With A Question',
        subtitle: 'Vague research requests create vague synthesis.',
        objective: 'Frame research tasks so AI helps narrow, compare, and summarize instead of producing generic overviews.',
        whyItMatters: 'A sharp research question drives what sources matter, what output shape you need, and how you will judge success.',
        coreConcepts: [
          { title: 'Ask Decision-Oriented Questions', text: 'Research is more useful when tied to a decision, recommendation, or known uncertainty.' },
          { title: 'Bound The Scope', text: 'Define the timeframe, geography, audience, or competitor set so the model does not drift into filler.' },
          { title: 'State The Output', text: 'Say whether you want a scan, comparison, risk list, or recommendation draft.' }
        ],
        workedExample: {
          scenario: 'A PM asks AI for "everything important" about a market segment.',
          approach: 'They narrow the ask to adoption risks, buyer criteria, and three competitors.',
          result: 'The synthesis becomes much more actionable.',
          verification: 'The PM checks whether every major claim ties back to an identifiable source or source note.'
        },
        artifact: {
          label: 'Question Frame',
          title: 'Research brief',
          items: ['Decision or question', 'Scope boundary', 'Needed output', 'Verification method']
        },
        doThisNow: {
          task: 'Rewrite one current research task as a decision-oriented research brief.',
          timebox: '7 minutes',
          steps: ['State the decision.', 'Add a scope boundary.', 'Name how you will verify the answer.']
        },
        commonMistakes: ['Researching too broadly.', 'Starting with tools before defining the question.', 'Not deciding how the output will be used.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Summarize For Action',
        subtitle: 'A useful summary tells the reader what matters and what to do next.',
        objective: 'Produce summaries that retain key nuance while making action easier.',
        whyItMatters: 'Many AI summaries are technically correct but operationally useless because they compress content without preserving the decision context.',
        coreConcepts: [
          { title: 'Summarize To A Reader', text: 'The summary should reflect what the reader needs to know, not just what the source contains.' },
          { title: 'Preserve What Could Change The Decision', text: 'Caveats, constraints, and outliers matter if they would alter the next step.' },
          { title: 'Add A Recommended Next Move', text: 'A summary becomes more useful when it ends with open questions or recommended actions.' }
        ],
        workedExample: {
          scenario: 'A writer summarizes a long vendor document for procurement.',
          approach: 'They ask for a summary focused on pricing levers, implementation risk, and unanswered questions.',
          result: 'Procurement gets a concise document that supports the next meeting.',
          verification: 'The writer verifies every pricing or commitment statement against the source document.'
        },
        artifact: {
          label: 'Summary Format',
          title: 'Action summary sections',
          items: ['What matters', 'What changed', 'What is uncertain', 'Recommended next step']
        },
        doThisNow: {
          task: 'Summarize one document into an action-oriented format for a real reader.',
          timebox: '8 minutes',
          steps: ['Name the reader.', 'Name the decision they face.', 'Check the key claims against the source.']
        },
        commonMistakes: ['Summarizing for nobody in particular.', 'Dropping the caveats.', 'Treating a summary as a substitute for source review on high-risk material.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Synthesize Across Sources',
        subtitle: 'The value is in the comparison, not just the compression.',
        objective: 'Combine multiple documents into a coherent comparison or takeaway set.',
        whyItMatters: 'AI is useful when the job is not only to read faster, but to spot patterns, disagreements, and recurring themes across materials.',
        coreConcepts: [
          { title: 'Normalize The Inputs', text: 'Tell the model how to compare the sources: by theme, risk, opportunity, audience, or timeline.' },
          { title: 'Track Agreement And Conflict', text: 'A synthesis is more trustworthy when it separates shared conclusions from contested ones.' },
          { title: 'Keep Source Traceability', text: 'If the synthesis will influence a decision, preserve notes on where each major point came from.' }
        ],
        workedExample: {
          scenario: 'An analyst compares customer feedback, support tickets, and win-loss notes.',
          approach: 'They ask AI to cluster common themes and call out where the sources disagree.',
          result: 'The synthesis is more useful than three separate summaries.',
          verification: 'The analyst spot-checks one example for each major theme against the underlying source set.'
        },
        artifact: {
          label: 'Synthesis Grid',
          title: 'Cross-source comparison',
          items: ['Theme', 'Evidence by source', 'Agreement level', 'Open questions']
        },
        doThisNow: {
          task: 'Take two to three related inputs and create a single comparison grid.',
          timebox: '10 minutes',
          steps: ['Choose the comparison lens.', 'Ask AI to separate agreement from conflict.', 'Verify one point from each theme.']
        },
        commonMistakes: ['Combining too many unrelated sources.', 'Letting the model collapse disagreements into false consensus.', 'Losing track of which source supported which claim.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Challenge The Research Output',
        subtitle: 'Good synthesis still needs interrogation.',
        objective: 'Use AI to critique its own research output and reveal weak claims, missing evidence, or blind spots.',
        whyItMatters: 'The first research output should rarely be the final one. A second-pass critique surfaces what still needs checking.',
        coreConcepts: [
          { title: 'Ask For Missing Evidence', text: 'Have the model identify which conclusions are strongest, weakest, and dependent on assumptions.' },
          { title: 'Separate Fact From Inference', text: 'Many research mistakes come from passing off an interpretation as if it were directly observed.' },
          { title: 'Turn Weakness Into Follow-Up Work', text: 'The right response to uncertainty is a next question, not fake confidence.' }
        ],
        workedExample: {
          scenario: 'A research summary recommends a vendor aggressively.',
          approach: 'The user asks the model to critique the recommendation, list assumptions, and identify missing evidence.',
          result: 'The output becomes more balanced and decision-ready.',
          verification: 'The user checks that the critique points map back to actual gaps in the source material.'
        },
        artifact: {
          label: 'Critique Prompt',
          title: 'Challenge the synthesis',
          items: ['What claims are weakest?', 'What evidence is missing?', 'What assumptions drive the conclusion?', 'What should be researched next?']
        },
        doThisNow: {
          task: 'Run a critique pass on one AI-generated summary you already have.',
          timebox: '6 minutes',
          steps: ['Ask for weakest claims.', 'Ask for missing evidence.', 'Turn the answer into follow-up questions.']
        },
        commonMistakes: ['Treating the first synthesis as final.', 'Ignoring inferences disguised as facts.', 'Not converting open questions into follow-up research.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Build A Research Workflow',
        subtitle: 'Good research is a repeatable sequence, not a single magic prompt.',
        objective: 'Create a repeatable AI-assisted workflow for reading, synthesis, critique, and final output.',
        whyItMatters: 'A workflow is easier to trust, teach, and improve than a collection of disconnected chat sessions.',
        coreConcepts: [
          { title: 'Collect', text: 'Gather and label the sources that matter.' },
          { title: 'Synthesize', text: 'Ask for a structured comparison or action summary.' },
          { title: 'Critique', text: 'Challenge the weak spots and verify the critical claims.' }
        ],
        workedExample: {
          scenario: 'An operator regularly prepares market scans for a weekly leadership meeting.',
          approach: 'They standardize the sequence and store the output format and review checks.',
          result: 'The scan becomes faster, more consistent, and easier for others to cover.',
          verification: 'The workflow includes a required check on freshness and source credibility before the scan is shared.'
        },
        artifact: {
          label: 'Workflow',
          title: 'Research operating sequence',
          items: ['Collect sources', 'Summarize to decision', 'Challenge the draft', 'Verify key claims', 'Publish']
        },
        doThisNow: {
          task: 'Write your own five-step research workflow for a recurring task.',
          timebox: '9 minutes',
          steps: ['List the input sources.', 'Define the synthesis format.', 'Add the critique and verification step.']
        },
        commonMistakes: ['Treating research as one prompt.', 'Skipping the critique step.', 'Not saving the workflow once it works.']
      }, { roleVariants: ROLE_SETS.productivity })
    ]
  },
  7: {
    title: 'Advanced Prompting And Decomposition',
    phase: 2,
    summary: 'Break complex work into stages, use examples and structure more deliberately, and turn better prompting into better workflow design.',
    lessons: [
      lesson({
        title: 'When Simple Prompts Stop Working',
        subtitle: 'Complex work usually needs staged thinking, not longer prompts.',
        objective: 'Recognize when a task should be broken into parts instead of pushed through a single request.',
        whyItMatters: 'As tasks get more complex, one-pass prompting often hides reasoning gaps, mixes goals, and creates difficult review work.',
        coreConcepts: [
          { title: 'Complexity Is A Workflow Problem', text: 'When the task includes interpretation, tradeoffs, or multiple outputs, sequence matters more than clever wording.' },
          { title: 'One Pass Creates Hidden Failure', text: 'A single prompt can blur analysis, drafting, and recommendation into one opaque answer.' },
          { title: 'Decompose By Decision Point', text: 'Split the work where a human would naturally pause to review or redirect.' }
        ],
        workedExample: {
          scenario: 'A manager asks AI to analyze feedback, identify themes, recommend actions, and draft an executive memo in one prompt.',
          approach: 'They split it into theme extraction, recommendation ranking, and memo drafting.',
          result: 'Each step becomes easier to inspect and improve.',
          verification: 'The manager checks the recommended actions against the extracted themes before asking for the memo.'
        },
        artifact: {
          label: 'Pattern',
          title: 'Decompose when the task has',
          items: ['Multiple outputs', 'Tradeoff-heavy reasoning', 'High review cost', 'A human decision between stages']
        },
        doThisNow: {
          task: 'Take one messy AI task and divide it into two or three stages.',
          timebox: '8 minutes',
          steps: ['Find the natural review points.', 'Write one prompt per stage.', 'Decide what you will verify before moving on.']
        },
        commonMistakes: ['Trying to solve workflow problems with longer prompts.', 'Combining analysis and recommendation in one opaque step.', 'Skipping the human checkpoint.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Examples For Reasoning And Format',
        subtitle: 'Examples are useful when they teach the model how to think or how to shape output.',
        objective: 'Use examples more deliberately for classification, extraction, and consistent formatting.',
        whyItMatters: 'Well-chosen examples reduce ambiguity and improve repeatability on structured tasks.',
        coreConcepts: [
          { title: 'Examples Set The Pattern', text: 'A short example can teach the model how to classify, prioritize, or structure output.' },
          { title: 'Match The Example To The Task', text: 'Use representative examples, not idealized ones that ignore real ambiguity.' },
          { title: 'Explain The Lesson', text: 'Tell the model what the example demonstrates so it copies the right thing.' }
        ],
        workedExample: {
          scenario: 'An analyst wants support tickets categorized consistently.',
          approach: 'They provide three examples showing how to label root cause, severity, and next action.',
          result: 'Classification becomes more stable.',
          verification: 'They manually review a small sample to confirm the examples did not encode a bad rule.'
        },
        artifact: {
          label: 'Example Set',
          title: 'What a good example includes',
          items: ['Representative input', 'Desired output', 'Short note on why it is correct']
        },
        doThisNow: {
          task: 'Add two short examples to a prompt for a structured task you do often.',
          timebox: '9 minutes',
          steps: ['Choose representative cases.', 'Show the output you want.', 'Review whether the examples taught the right rule.']
        },
        commonMistakes: ['Using unrealistic examples.', 'Adding too many examples with no explanation.', 'Assuming examples remove the need for verification.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Structured Prompts For Complex Work',
        subtitle: 'Headings, labels, and bounded sections help both the model and the reviewer.',
        objective: 'Use structured prompts to manage multi-part tasks more reliably.',
        whyItMatters: 'As prompts become longer, structure matters. Clear sections keep the request readable and make later edits easier.',
        coreConcepts: [
          { title: 'Label The Sections', text: 'Separate goal, context, sources, constraints, and output format so nothing important is buried.' },
          { title: 'Keep Each Section Purposeful', text: 'Every section should change the answer. If it does not, remove it.' },
          { title: 'Reuse The Shape', text: 'Structured prompts are easier to turn into templates than free-form chat requests.' }
        ],
        workedExample: {
          scenario: 'A writer uses a long unstructured prompt for a proposal draft and keeps getting mixed results.',
          approach: 'They reorganize the same information under clear headings with explicit source boundaries.',
          result: 'The model follows the request more consistently and the prompt becomes reusable.',
          verification: 'The writer checks whether the output reflects each section and whether any section can be shortened without loss. '
        },
        artifact: {
          label: 'Structure',
          title: 'Complex prompt sections',
          items: ['Goal', 'Audience', 'Source material', 'Constraints', 'Output format', 'Review notes']
        },
        doThisNow: {
          task: 'Convert one long free-form prompt into a labeled structured prompt.',
          timebox: '7 minutes',
          steps: ['Add section headings.', 'Delete non-essential filler.', 'Run the prompt and compare the output quality.']
        },
        commonMistakes: ['Confusing structure with length.', 'Adding headings that do not affect the answer.', 'Packing too many tasks into one structured prompt anyway.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Prompt Chaining For Multi-Step Work',
        subtitle: 'Move from one answer to a managed sequence.',
        objective: 'Link multiple prompts into a workflow where each stage feeds the next.',
        whyItMatters: 'Prompt chains make complex work easier to inspect, improve, and reuse. They also map better to how real business tasks unfold.',
        coreConcepts: [
          { title: 'Define The Hand-Off', text: 'Each stage should produce an output that is useful on its own and usable by the next stage.' },
          { title: 'Insert Review Gates', text: 'The chain should stop where a human must validate, choose, or redirect.' },
          { title: 'Capture Intermediate Assets', text: 'Save outlines, extracted themes, or ranked options because they can be reused later.' }
        ],
        workedExample: {
          scenario: 'A team lead wants AI help turning survey feedback into an action memo.',
          approach: 'They chain prompts for extraction, theme grouping, recommendation drafting, and memo writing.',
          result: 'The memo is more defensible because the upstream reasoning is visible.',
          verification: 'They validate the extracted themes and ranking before generating the final memo.'
        },
        artifact: {
          label: 'Workflow',
          title: 'Prompt chain map',
          items: ['Stage 1: extract', 'Stage 2: organize', 'Stage 3: recommend', 'Stage 4: draft']
        },
        doThisNow: {
          task: 'Create a simple three-step prompt chain for a recurring task.',
          timebox: '10 minutes',
          steps: ['Name each stage.', 'Define the output of each stage.', 'Add one review gate before the final draft.']
        },
        commonMistakes: ['Chaining too many tiny steps.', 'Not defining what passes to the next stage.', 'Skipping the review gate because the final draft looks polished.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Your Advanced Prompt Toolkit',
        subtitle: 'Keep a small set of moves you can apply deliberately.',
        objective: 'Build a practical toolkit of advanced prompt moves and when to use each one.',
        whyItMatters: 'Advanced prompting is useful only when you know which move fits which problem.',
        coreConcepts: [
          { title: 'Use The Smallest Useful Move', text: 'If a role and structure fix the problem, do not jump to a complex chain.' },
          { title: 'Map Moves To Failure Modes', text: 'Examples help with format consistency. Chains help with multi-step work. Critique prompts help with reasoning quality.' },
          { title: 'Document What Works', text: 'The toolkit becomes valuable when it is stored and reused, not when it lives only in memory.' }
        ],
        workedExample: {
          scenario: 'An operator keeps overcomplicating simple tasks with advanced prompt patterns.',
          approach: 'They build a one-page toolkit listing failure modes and the smallest useful prompt move for each.',
          result: 'Their prompting becomes simpler and more reliable.',
          verification: 'They test the toolkit on three different tasks to make sure the guidance holds up.'
        },
        artifact: {
          label: 'Reference',
          title: 'Advanced prompt moves',
          items: ['Role for perspective', 'Example for pattern', 'Structure for clarity', 'Chain for staged work', 'Critique for review']
        },
        doThisNow: {
          task: 'Write a one-page toolkit mapping common failures to prompt moves.',
          timebox: '10 minutes',
          steps: ['List three failure modes you see often.', 'Assign one prompt move to each.', 'Save one example for later reuse.']
        },
        commonMistakes: ['Using advanced patterns by default.', 'Collecting prompt tricks with no workflow reason.', 'Not documenting when a move actually helped.']
      }, { roleVariants: ROLE_SETS.productivity })
    ]
  },
  8: {
    title: 'Meetings, Notes, And Follow-Up',
    phase: 2,
    summary: 'Use AI before, during, and after meetings to reduce prep time and improve the quality of follow-through.',
    lessons: [
      lesson({
        title: 'Prep With Intention',
        subtitle: 'Use AI to arrive with clearer goals, sharper questions, and better framing.',
        objective: 'Prepare for meetings faster by using AI to structure your thinking before the call.',
        whyItMatters: 'Meeting quality usually depends on preparation, not note-taking alone.',
        coreConcepts: [
          { title: 'Define The Outcome', text: 'State what you need by the end of the meeting: a decision, alignment, information, or commitment.' },
          { title: 'Use AI To Draft Questions', text: 'Ask for questions, risks, and likely objections from the audience perspective.' },
          { title: 'Bring Real Context', text: 'Prep gets better when you include the agenda, participant roles, and current status. ' }
        ],
        workedExample: {
          scenario: 'A manager has a vendor review meeting with limited prep time.',
          approach: 'They use AI to create a short briefing with objectives, questions, and risk areas based on the agenda and prior notes.',
          result: 'The meeting starts with better focus.',
          verification: 'They check that the briefing reflects the latest vendor status, not stale assumptions from older notes.'
        },
        artifact: { label: 'Briefing', title: 'Meeting prep brief', items: ['Outcome needed', 'Participants', 'Open questions', 'Risks to surface'] },
        doThisNow: { task: 'Prepare for one real meeting using a prep brief.', timebox: '8 minutes', steps: ['Paste the agenda or notes.', 'Ask AI for key questions and risks.', 'Review the brief before the meeting.'] },
        commonMistakes: ['Using AI to overprepare instead of clarify.', 'Forgetting to include participant context.', 'Treating prep questions as facts.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Capture Notes You Can Use',
        subtitle: 'Raw notes are only valuable if they preserve decisions and actions accurately.',
        objective: 'Turn rough meeting notes into structured, reviewable material.',
        whyItMatters: 'Most post-meeting confusion comes from weak capture of decisions, owners, and open questions.',
        coreConcepts: [
          { title: 'Label What You Heard', text: 'Separate facts, decisions, risks, and next steps while notes are still fresh.' },
          { title: 'Ask AI To Organize, Not Guess', text: 'The model should structure your notes, not invent details you missed.' },
          { title: 'Review The Commitments', text: 'Owner assignments and deadlines must be checked manually.' }
        ],
        workedExample: {
          scenario: 'An operator leaves a cross-functional sync with fragmented notes.',
          approach: 'They ask AI to turn the notes into decisions, owners, blockers, and open questions.',
          result: 'The recap becomes readable and easier to share.',
          verification: 'The operator checks all dates and assignments against what was actually agreed. '
        },
        artifact: { label: 'Organizer', title: 'Meeting note labels', items: ['Decision', 'Owner', 'Due date', 'Risk', 'Open question'] },
        doThisNow: { task: 'Take one set of rough notes and convert it into labeled meeting output.', timebox: '9 minutes', steps: ['Label the note fragments.', 'Ask AI to structure them.', 'Manually confirm decisions and owners.'] },
        commonMistakes: ['Pasting unlabeled notes.', 'Letting AI assign owners or deadlines.', 'Confusing discussion with decision.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Produce Better Recaps',
        subtitle: 'A recap should lower future confusion, not just summarize the past.',
        objective: 'Draft recap messages that make next actions clear to the right audience.',
        whyItMatters: 'Meeting value is realized in the follow-through, not the transcript.',
        coreConcepts: [
          { title: 'Write To The Receiver', text: 'A recap for participants is different from a recap for leadership or an absent stakeholder.' },
          { title: 'Lead With Decisions', text: 'Most readers want the outcome, not a blow-by-blow replay.' },
          { title: 'Make Action Visible', text: 'If the recap does not clarify owners, dates, or questions, it will not change what happens next.' }
        ],
        workedExample: {
          scenario: 'A project coordinator needs a recap after a weekly steering meeting.',
          approach: 'They draft a recap with decisions first, then actions, then open questions.',
          result: 'Stakeholders can scan the message and know what changed.',
          verification: 'The coordinator checks that the recap reflects the approved decisions, not tentative discussion points.'
        },
        artifact: { label: 'Format', title: 'Recap sections', items: ['Decision summary', 'Actions and owners', 'Open questions', 'Risks or blockers'] },
        doThisNow: { task: 'Rewrite one recap into a decision-first format.', timebox: '7 minutes', steps: ['Move decisions to the top.', 'List owners and dates.', 'Remove discussion detail that does not matter.'] },
        commonMistakes: ['Leading with narrative instead of outcomes.', 'Sending the same recap to every audience.', 'Including tentative ideas as settled decisions.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Follow Through Between Meetings',
        subtitle: 'AI can help reduce the admin drag that causes next steps to slip.',
        objective: 'Use AI to turn meeting outputs into practical follow-up assets.',
        whyItMatters: 'Follow-up work is often small, repetitive, and time-sensitive, which makes it a strong fit for AI assistance.',
        coreConcepts: [
          { title: 'Turn Actions Into Work Items', text: 'Convert notes into task lists, owner reminders, or status questions quickly after the meeting.' },
          { title: 'Tailor The Message', text: 'A reminder to a teammate is different from a readout to leadership.' },
          { title: 'Keep Humans On Accountability', text: 'AI can draft the communication, but you still decide whether the assigned work is accurate and fair.' }
        ],
        workedExample: {
          scenario: 'A team lead needs three different follow-ups from the same meeting.',
          approach: 'They use one source note set and ask AI for a task list, owner check-in messages, and a short leader readout.',
          result: 'The follow-up happens faster with less duplication.',
          verification: 'The lead confirms the owner assignments and due dates before sending any messages.'
        },
        artifact: { label: 'Bundle', title: 'Follow-up asset bundle', items: ['Task list', 'Owner message', 'Leader readout'] },
        doThisNow: { task: 'Turn one meeting outcome into two different follow-up assets.', timebox: '8 minutes', steps: ['Use the same source notes.', 'Draft two audience-specific outputs.', 'Verify owners and deadlines.'] },
        commonMistakes: ['Sending every follow-up in the same voice.', 'Letting AI define accountability.', 'Waiting too long after the meeting to structure the notes.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Build Your Meeting Workflow',
        subtitle: 'Prep, capture, recap, and follow-up work best as one system.',
        objective: 'Create a repeatable end-to-end meeting workflow supported by AI.',
        whyItMatters: 'Meeting work becomes easier to delegate and improve when the sequence is explicit.',
        coreConcepts: [
          { title: 'Use The Same Sequence', text: 'Prep, capture, recap, and follow-up are the core stages for most meetings.' },
          { title: 'Store The Inputs', text: 'Agenda, notes, recap template, and follow-up prompts should live together.' },
          { title: 'Review The High-Risk Fields', text: 'Decisions, owners, dates, and commitments always need a human pass.' }
        ],
        workedExample: {
          scenario: 'An operator supports recurring cross-functional meetings every week.',
          approach: 'They create a standard workflow and template pack for every meeting cycle.',
          result: 'The work gets faster and less error-prone.',
          verification: 'The workflow includes a mandatory final review of decisions and assigned owners.'
        },
        artifact: { label: 'Workflow', title: 'Meeting system', items: ['Prep brief', 'Note labels', 'Recap format', 'Follow-up bundle', 'Review check'] },
        doThisNow: { task: 'Document your meeting workflow for one recurring meeting.', timebox: '10 minutes', steps: ['List the stages.', 'Save the supporting prompts.', 'Add the final review step.'] },
        commonMistakes: ['Improving only one stage.', 'Forgetting where the source notes live.', 'Not storing the workflow for reuse.']
      }, { roleVariants: ROLE_SETS.productivity })
    ]
  },
  9: {
    title: 'Documentation And SOPs',
    phase: 3,
    summary: 'Use AI to document work more clearly, improve process clarity, and turn tribal knowledge into usable team assets.',
    lessons: [
      lesson({
        title: 'Why Documentation Is A Strong Fit',
        subtitle: 'Documentation work usually starts with scattered knowledge and rough inputs.',
        objective: 'Identify documentation tasks where AI can reduce friction without reducing accuracy.',
        whyItMatters: 'Documentation often stalls because the work feels time-consuming and messy. AI helps most when the job is organizing and clarifying existing knowledge.',
        coreConcepts: [
          { title: 'Draft From Existing Knowledge', text: 'Recordings, notes, process bullets, and examples make documentation much easier to generate.' },
          { title: 'Clarity Beats Elegance', text: 'The goal of SOPs and FAQs is usability, not impressive prose.' },
          { title: 'Accuracy Still Comes First', text: 'AI can create a first structure, but the people closest to the process must validate the steps.' }
        ],
        workedExample: {
          scenario: 'A team has an undocumented refund process known only by two operators.',
          approach: 'They capture the current steps in rough bullets and ask AI to structure them into an SOP draft.',
          result: 'The process becomes reviewable and sharable.',
          verification: 'The operators walk through the draft step by step to catch missing exceptions.'
        },
        artifact: { label: 'Prompt Frame', title: 'Documentation request', items: ['What process this is', 'Who uses it', 'Source notes', 'Known exceptions'] },
        doThisNow: { task: 'Choose one undocumented process and gather the rough source notes for an SOP draft.', timebox: '10 minutes', steps: ['Name the process.', 'List the main steps.', 'List who should validate the draft.'] },
        commonMistakes: ['Trying to document from memory only.', 'Optimizing for style over usability.', 'Publishing without process-owner review.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Create SOPs People Will Actually Use',
        subtitle: 'Useful SOPs are specific, scannable, and built around decisions and exceptions.',
        objective: 'Draft standard operating procedures that help people complete work, not just read about it.',
        whyItMatters: 'Many SOPs fail because they describe a process abstractly rather than guiding someone through the real task.',
        coreConcepts: [
          { title: 'Write For The User', text: 'Say who the SOP is for, what triggers it, and what outcome they should achieve.' },
          { title: 'Include Exceptions', text: 'Real work breaks at the edges. If known exceptions are missing, the SOP will fail in practice.' },
          { title: 'Use Clear Step Shapes', text: 'Steps, owners, required tools, and escalation rules should be easy to scan.' }
        ],
        workedExample: {
          scenario: 'A finance team needs a close checklist for a new team member.',
          approach: 'They build the SOP around trigger, inputs, steps, validation points, and exception handling.',
          result: 'The new team member can follow the work without constant shadowing.',
          verification: 'An experienced operator tests the SOP by walking through it line by line.'
        },
        artifact: { label: 'SOP Format', title: 'SOP sections', items: ['Purpose', 'Trigger', 'Inputs', 'Steps', 'Exceptions', 'Escalation'] },
        doThisNow: { task: 'Draft the sections of one SOP before asking AI to write the prose.', timebox: '8 minutes', steps: ['Write the trigger and outcome.', 'List the main steps.', 'Add at least one known exception.'] },
        commonMistakes: ['Writing the SOP as a narrative.', 'Leaving out exceptions.', 'Failing to identify who the SOP is for.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Turn Repeated Questions Into FAQs',
        subtitle: 'FAQ generation works best when the real questions come from support or operational history.',
        objective: 'Create internal or external FAQs from actual recurring questions and approved answers.',
        whyItMatters: 'FAQ content is valuable when it reduces future interruptions and improves consistency of responses.',
        coreConcepts: [
          { title: 'Use Real Questions', text: 'Support logs, chat threads, and onboarding notes are better sources than imagined FAQs.' },
          { title: 'Keep Answers Operational', text: 'Answers should tell people what to do, not just define terms.' },
          { title: 'Mark Approval Boundaries', text: 'If a topic changes often, include who owns updates and what must be verified before publishing.' }
        ],
        workedExample: {
          scenario: 'An operations team receives the same onboarding questions every week.',
          approach: 'They pull real questions from chat and support notes, then ask AI to cluster and draft clear answers.',
          result: 'The FAQ reflects actual confusion points.',
          verification: 'The team checks each answer against the current process and removes any speculative guidance.'
        },
        artifact: { label: 'FAQ Pack', title: 'FAQ entry fields', items: ['Question', 'Approved answer', 'When it changes', 'Owner'] },
        doThisNow: { task: 'Collect five recurring questions from recent work and turn them into draft FAQ entries.', timebox: '10 minutes', steps: ['Pull real questions.', 'Draft concise answers.', 'Verify each answer with the process owner.'] },
        commonMistakes: ['Inventing questions nobody asked.', 'Writing answers that are too broad.', 'Skipping ownership for updates.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Use AI To Improve Existing Processes',
        subtitle: 'Documentation can reveal where the work itself is weak.',
        objective: 'Use AI to identify ambiguity, duplication, or friction in an existing process.',
        whyItMatters: 'Once a process is documented, AI can help critique it for handoff problems, unclear ownership, or unnecessary steps.',
        coreConcepts: [
          { title: 'Critique The Process, Not Just The Writing', text: 'Ask where steps are vague, duplicated, or lacking a clear owner.' },
          { title: 'Find Decision Points', text: 'Good process reviews reveal where human judgment is required and where better rules would help.' },
          { title: 'Separate Improvement From Approval', text: 'AI can suggest changes, but process owners still decide what gets adopted.' }
        ],
        workedExample: {
          scenario: 'A service request workflow causes repeated back-and-forth.',
          approach: 'The team asks AI to review the draft SOP for unclear steps and missing ownership.',
          result: 'They identify two unnecessary handoffs and one missing approval gate.',
          verification: 'They confirm the proposed fixes against how the work actually runs today.'
        },
        artifact: { label: 'Review Prompt', title: 'Process critique lens', items: ['Where is ownership unclear?', 'Where are steps duplicated?', 'Where do exceptions break the flow?'] },
        doThisNow: { task: 'Ask AI to critique one process you already documented.', timebox: '7 minutes', steps: ['Paste the process.', 'Ask for unclear ownership and duplicate steps.', 'Review the suggestions with a process owner.'] },
        commonMistakes: ['Editing wording without examining the workflow.', 'Treating AI suggestions as approved changes.', 'Ignoring exception handling.']
      }, { roleVariants: ROLE_SETS.productivity }),
      lesson({
        title: 'Build A Documentation Toolkit',
        subtitle: 'Turn successful documentation workflows into repeatable assets.',
        objective: 'Create a small toolkit for SOPs, FAQs, and process reviews.',
        whyItMatters: 'Documentation quality improves when the team reuses proven formats and review routines.',
        coreConcepts: [
          { title: 'Store The Source Pattern', text: 'Capture the kinds of raw inputs that produce strong drafts.' },
          { title: 'Save The Format', text: 'A good SOP or FAQ structure can be reused across teams and topics.' },
          { title: 'Keep A Review Checklist', text: 'Documentation needs a standard final pass for accuracy, usability, and ownership.' }
        ],
        workedExample: {
          scenario: 'A team repeatedly documents new workflows during a process redesign.',
          approach: 'They build a shared toolkit with prompt frames, formats, and review rules.',
          result: 'New documentation takes less time and requires less reinvention.',
          verification: 'The toolkit includes a requirement that every draft be tested by a real user of the process.'
        },
        artifact: { label: 'Toolkit', title: 'Documentation toolkit contents', items: ['SOP format', 'FAQ format', 'Process critique prompt', 'Review checklist'] },
        doThisNow: { task: 'Save one documentation workflow as a reusable toolkit entry.', timebox: '8 minutes', steps: ['Store the source pattern.', 'Store the format.', 'Store the review checklist.'] },
        commonMistakes: ['Saving only prompts and not formats.', 'Forgetting who validates the draft.', 'Treating documentation as one-off work.']
      }, { roleVariants: ROLE_SETS.productivity })
    ]
  },
  10: {
    title: 'Project And Program Management',
    phase: 3,
    summary: 'Use AI to improve planning, risk management, stakeholder updates, and recurring coordination work.',
    lessons: [
      lesson({
        title: 'AI As A Project Co-Pilot',
        subtitle: 'Use AI to support planning and communication, not replace project judgment.',
        objective: 'Identify where AI adds leverage in the project workflow and where human decisions still dominate.',
        whyItMatters: 'Project work mixes structure and judgment. AI is strong at organizing inputs and drafting outputs, but weak at owning tradeoffs.',
        coreConcepts: [
          { title: 'Use AI For Structure', text: 'Planning outlines, risk lists, recap drafts, and status formats are all strong fits.' },
          { title: 'Keep Humans On Tradeoffs', text: 'Priority, scope, staffing, and escalation still require human authority.' },
          { title: 'Anchor In Real Project Artifacts', text: 'Briefs, timelines, issue logs, and meeting notes make AI output much more reliable.' }
        ],
        workedExample: {
          scenario: 'A PM needs to turn a rough initiative brief into a kickoff plan.',
          approach: 'They provide the brief, milestones, constraints, and stakeholders, then ask AI for a planning skeleton.',
          result: 'The first draft is more structured and easier to refine.',
          verification: 'The PM checks scope, dependency assumptions, and resource implications before sharing.'
        },
        artifact: { label: 'Map', title: 'Good PM uses for AI', items: ['Plan skeletons', 'Risk lists', 'Status summaries', 'Stakeholder drafts'] },
        doThisNow: { task: 'Identify three PM tasks you can accelerate safely with AI this week.', timebox: '6 minutes', steps: ['List the task.', 'List the source artifact.', 'List what still needs human review.'] },
        commonMistakes: ['Asking AI to make project decisions alone.', 'Planning from memory instead of artifacts.', 'Skipping dependency review.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Plan From A Brief',
        subtitle: 'Good plans start with clear goals, boundaries, and assumptions.',
        objective: 'Use AI to draft project plans and milestone structures from an existing brief.',
        whyItMatters: 'Project plans improve when AI helps surface missing assumptions and organize tasks into a clearer sequence.',
        coreConcepts: [
          { title: 'Start With The Goal', text: 'Define the outcome, deadline, and constraints before asking for tasks.' },
          { title: 'Surface Assumptions', text: 'Plans are only as good as the assumptions behind them. Ask AI to identify what is unknown or unstated.' },
          { title: 'Use Reviewable Structure', text: 'Ask for phases, milestones, dependencies, and risks instead of one long prose plan.' }
        ],
        workedExample: {
          scenario: 'A program manager receives a vague internal request with a target quarter.',
          approach: 'They use AI to turn the brief into milestones, open assumptions, and a draft dependency list.',
          result: 'The conversation shifts from vague ambition to a concrete planning discussion.',
          verification: 'The PM checks that milestone dates and dependencies align with actual team capacity.'
        },
        artifact: { label: 'Plan Format', title: 'Planning outputs', items: ['Milestones', 'Dependencies', 'Assumptions', 'Risks', 'Decision points'] },
        doThisNow: { task: 'Use one active brief to generate a milestone-based project outline.', timebox: '9 minutes', steps: ['Provide the goal and date.', 'Ask for assumptions and dependencies.', 'Review the draft with actual constraints in mind.'] },
        commonMistakes: ['Using AI without a real brief.', 'Treating assumptions as facts.', 'Sharing the plan before checking feasibility.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Use AI For Risk Reviews',
        subtitle: 'Risk identification improves when you ask from multiple perspectives.',
        objective: 'Generate better risk lists and mitigation options using structured prompts.',
        whyItMatters: 'Teams often under-scan risk because they focus on delivery tasks and ignore stakeholder, resource, or change-management issues.',
        coreConcepts: [
          { title: 'Prompt From Different Lenses', text: 'Schedule, resource, dependency, stakeholder, and adoption lenses reveal different categories of risk.' },
          { title: 'Ask For Mitigation, Not Just Lists', text: 'A useful risk review includes early warning signals and response options.' },
          { title: 'Separate Probability From Impact', text: 'A ranked list is more useful than a brainstormed pile.' }
        ],
        workedExample: {
          scenario: 'A project has a strong delivery plan but weak adoption planning.',
          approach: 'The PM asks AI to review the plan from delivery, stakeholder, and change-management perspectives.',
          result: 'New risks appear that were invisible in the first draft.',
          verification: 'The PM validates which risks are real versus generic and adds only those supported by the project context.'
        },
        artifact: { label: 'Risk Lens', title: 'Risk review categories', items: ['Delivery', 'Dependencies', 'Stakeholders', 'Adoption', 'Governance'] },
        doThisNow: { task: 'Run a two-lens risk review on one project you own.', timebox: '8 minutes', steps: ['Choose two lenses.', 'Ask for ranked risks.', 'Validate which risks actually apply.'] },
        commonMistakes: ['Collecting risks with no ranking.', 'Ignoring stakeholder or adoption risk.', 'Accepting generic mitigation advice without context.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Write Faster Status Updates',
        subtitle: 'Status work is easier when AI organizes the raw material first.',
        objective: 'Create faster, clearer status reports from existing project notes and trackers.',
        whyItMatters: 'Status reporting is repetitive and format-driven, making it a strong fit for AI support.',
        coreConcepts: [
          { title: 'Collect The Inputs', text: 'Issue logs, milestone status, notes, and blockers should feed the draft.' },
          { title: 'Lead With What Changed', text: 'Good status updates highlight movement, risk, and decisions needed.' },
          { title: 'Tailor For The Reader', text: 'Leadership, peers, and working teams want different levels of detail.' }
        ],
        workedExample: {
          scenario: 'A PM spends 45 minutes every week consolidating updates.',
          approach: 'They use AI to turn the tracker and notes into a status draft with a fixed format.',
          result: 'The reporting time drops and the message becomes clearer.',
          verification: 'The PM checks that the report reflects the current tracker, not old thread context.'
        },
        artifact: { label: 'Status Format', title: 'Status sections', items: ['What changed', 'Current risks', 'Next milestones', 'Help needed'] },
        doThisNow: { task: 'Use a current tracker and notes to draft one status report.', timebox: '7 minutes', steps: ['Paste the relevant inputs.', 'Ask for a fixed format.', 'Verify the dates and risks before sending.'] },
        commonMistakes: ['Writing status updates from memory.', 'Using the same detail level for every audience.', 'Letting AI hide bad news in polished prose.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Build A PM Prompt Library',
        subtitle: 'Store the patterns that help recurring project work move faster.',
        objective: 'Capture reusable prompts and formats for planning, risk review, and status updates.',
        whyItMatters: 'Project work repeats. Saving what works reduces rework and makes team norms more consistent.',
        coreConcepts: [
          { title: 'Save Prompt + Artifact', text: 'Keep the prompt alongside the input pattern and output format.' },
          { title: 'Document Review Rules', text: 'Record what must be checked before sharing the draft.' },
          { title: 'Version The Pattern', text: 'Update the prompt when you learn a better way to frame the work.' }
        ],
        workedExample: {
          scenario: 'A PM creates a planning prompt that works well but cannot remember why.',
          approach: 'They save the prompt, the planning brief structure, and the review notes.',
          result: 'The next project kickoff starts from a proven asset instead of a blank page.',
          verification: 'They test the saved pattern on a second project before adopting it more broadly.'
        },
        artifact: { label: 'Library', title: 'PM library entry', items: ['Use case', 'Input artifact', 'Prompt pattern', 'Output format', 'Review notes'] },
        doThisNow: { task: 'Save one effective PM prompt as a reusable library entry.', timebox: '8 minutes', steps: ['Capture the input pattern.', 'Capture the format.', 'Capture the review standard.'] },
        commonMistakes: ['Saving only the wording.', 'Forgetting the review standard.', 'Not retesting the prompt on another project.']
      }, { roleVariants: ROLE_SETS.strategy })
    ]
  },
  11: {
    title: 'Data Analysis Without Code',
    phase: 3,
    summary: 'Use AI to explore, explain, and communicate data when the job is analytical thinking, pattern finding, and decision support.',
    lessons: [
      lesson({
        title: 'What AI Can And Cannot Do With Data',
        subtitle: 'AI can help interpret and communicate data, but the workflow needs care.',
        objective: 'Use AI for data-adjacent analysis while understanding where verification and tooling still matter.',
        whyItMatters: 'People often ask AI for statistical certainty or hidden truth when what they really need is structured exploration and explanation.',
        coreConcepts: [
          { title: 'Good At Framing And Explaining', text: 'AI is useful for asking questions, spotting patterns, and drafting explanations from structured inputs.' },
          { title: 'Weak Without Reliable Inputs', text: 'Messy data descriptions or missing context produce shallow insights and invented interpretations.' },
          { title: 'Verification Remains Essential', text: 'Numbers, formulas, and conclusions still need checking against the real dataset or source system.' }
        ],
        workedExample: {
          scenario: 'An analyst wants help interpreting weekly performance data.',
          approach: 'They describe the metrics, time period, and business context before asking for patterns and questions to investigate.',
          result: 'The AI output becomes a useful thinking aid rather than fake certainty.',
          verification: 'The analyst checks any claimed trend or number against the actual dashboard.'
        },
        artifact: { label: 'Frame', title: 'Data analysis brief', items: ['Metric definitions', 'Time period', 'Context', 'Question to answer'] },
        doThisNow: { task: 'Write a brief for one dataset or dashboard you need to interpret this week.', timebox: '7 minutes', steps: ['Define the metrics.', 'State the business question.', 'List what must be checked manually.'] },
        commonMistakes: ['Asking for insights without defining the metrics.', 'Trusting numbers from the model without checking.', 'Expecting AI to replace analysis discipline.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Describe The Data Well',
        subtitle: 'The model needs metric definitions, context, and comparison points.',
        objective: 'Provide data context so AI can help with interpretation rather than guessing.',
        whyItMatters: 'Poor data descriptions lead to generic commentary that sounds analytical without being useful.',
        coreConcepts: [
          { title: 'Define The Measures', text: 'State what each metric means and why it matters.' },
          { title: 'Add Baselines', text: 'Comparisons to prior periods, targets, or segments make interpretation more grounded.' },
          { title: 'Explain The Situation', text: 'Recent events, campaign changes, staffing shifts, or product launches often explain the numbers better than the numbers alone.' }
        ],
        workedExample: {
          scenario: 'A manager pastes weekly numbers with no labels and gets vague commentary.',
          approach: 'They rerun the task with metric definitions, target ranges, and context on a recent launch.',
          result: 'The analysis becomes more relevant and less generic.',
          verification: 'They confirm that any trend explanation is supported by known events or clearly marked as a hypothesis.'
        },
        artifact: { label: 'Input Format', title: 'Describe your data', items: ['Metric name', 'Definition', 'Comparison point', 'Known context'] },
        doThisNow: { task: 'Rewrite one data prompt to include definitions, baselines, and context.', timebox: '6 minutes', steps: ['Define each metric.', 'Add a comparison point.', 'Mark what is known vs hypothesized.'] },
        commonMistakes: ['Pasting unlabeled numbers.', 'Skipping baselines.', 'Confusing hypotheses with observations.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Generate Questions And Hypotheses',
        subtitle: 'One of AI’s best uses is widening the set of reasonable questions.',
        objective: 'Use AI to generate follow-up questions, hypotheses, and segments worth investigating.',
        whyItMatters: 'Analysis improves when you ask better questions, not only when you draft cleaner charts.',
        coreConcepts: [
          { title: 'Ask For Possibilities, Not Certainty', text: 'Prompt for plausible explanations and next checks rather than definitive claims.' },
          { title: 'Prioritize By Decision Value', text: 'The best follow-up questions are the ones that could change an action or decision.' },
          { title: 'Use AI To Surface Blind Spots', text: 'The model can suggest segments, time windows, or comparison points you did not initially consider.' }
        ],
        workedExample: {
          scenario: 'A dashboard shows declining conversion but no obvious root cause.',
          approach: 'The analyst asks AI for plausible hypotheses, segmented cuts to inspect, and what evidence would confirm each one.',
          result: 'The next analysis step becomes clearer.',
          verification: 'Each hypothesis is tested against actual data rather than accepted as the explanation.'
        },
        artifact: { label: 'Prompt Pattern', title: 'Hypothesis request', items: ['Observed change', 'Possible explanations', 'What data would test each explanation'] },
        doThisNow: { task: 'Use AI to generate three testable hypotheses from one business metric change.', timebox: '8 minutes', steps: ['State the observed change.', 'Ask for hypotheses and tests.', 'Select the one most worth checking.'] },
        commonMistakes: ['Asking AI to name the root cause directly.', 'Not defining how a hypothesis would be tested.', 'Using too many low-value follow-up questions.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Turn Analysis Into Communication',
        subtitle: 'Insights only matter when other people can understand and act on them.',
        objective: 'Draft clear narratives, readouts, and chart explanations from analytical work.',
        whyItMatters: 'Many data problems are communication problems. AI can help translate analysis into decision-friendly language.',
        coreConcepts: [
          { title: 'Separate Insight From Evidence', text: 'State the observation, then the likely implication, then the evidence that supports it.' },
          { title: 'Write For The Reader', text: 'Leaders want implications. Working teams often need the operational detail behind the conclusion.' },
          { title: 'Keep Confidence Honest', text: 'Be explicit about what is observed, what is inferred, and what still needs analysis.' }
        ],
        workedExample: {
          scenario: 'An analyst has solid findings but struggles to present them to non-technical stakeholders.',
          approach: 'They ask AI to draft a short readout using observed trend, likely implication, and suggested action.',
          result: 'The story becomes easier to grasp.',
          verification: 'The analyst checks that the final narrative does not claim more certainty than the data supports.'
        },
        artifact: { label: 'Readout Format', title: 'Insight narrative', items: ['What changed', 'Why it matters', 'What we think explains it', 'What to do next'] },
        doThisNow: { task: 'Turn one chart or dashboard finding into a short executive readout.', timebox: '7 minutes', steps: ['Name the observation.', 'State the implication.', 'Add a confidence qualifier.'] },
        commonMistakes: ['Using charts with no narrative.', 'Blurring observation and inference.', 'Overstating causal claims.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Build A Data Interpretation Toolkit',
        subtitle: 'Save the prompts and formats that support recurring analysis work.',
        objective: 'Create reusable assets for framing, hypothesis generation, and readout drafting.',
        whyItMatters: 'Analytical quality improves when you reuse proven questions and communication structures.',
        coreConcepts: [
          { title: 'Store The Data Brief', text: 'Keep the input pattern that produced a good analysis session.' },
          { title: 'Store The Hypothesis Prompt', text: 'Save the prompts that lead to useful next questions.' },
          { title: 'Store The Readout Format', text: 'A strong narrative structure is as reusable as a strong analysis prompt.' }
        ],
        workedExample: {
          scenario: 'A business analyst repeatedly explains weekly KPIs to different audiences.',
          approach: 'They build a toolkit with a data brief, a hypothesis prompt, and two readout formats.',
          result: 'The weekly cycle becomes faster and more consistent.',
          verification: 'They refresh the toolkit when changes in the dashboard make an old prompt misleading.'
        },
        artifact: { label: 'Toolkit', title: 'Data toolkit assets', items: ['Data brief', 'Hypothesis prompt', 'Readout template', 'Verification rules'] },
        doThisNow: { task: 'Save one analysis workflow as a reusable toolkit entry.', timebox: '8 minutes', steps: ['Capture the input pattern.', 'Capture the question pattern.', 'Capture the output format.'] },
        commonMistakes: ['Saving only the final prompt.', 'Ignoring the verification step.', 'Letting the toolkit drift when metrics change.']
      }, { roleVariants: ROLE_SETS.strategy })
    ]
  },
  12: {
    title: 'Decision Support And Strategy',
    phase: 3,
    summary: 'Use AI to structure choices, stress-test reasoning, and communicate decisions with more clarity.',
    lessons: [
      lesson({
        title: 'Use AI As A Thinking Partner',
        subtitle: 'The model can improve decision quality by structuring options and tradeoffs.',
        objective: 'Use AI to support strategic thinking without handing over the decision itself.',
        whyItMatters: 'AI is helpful when the task is exploring options, assumptions, and implications. It is not the accountable decision-maker.',
        coreConcepts: [
          { title: 'Frame The Decision', text: 'State what choice is being made, by whom, by when, and under which constraints.' },
          { title: 'Ask For Structure', text: 'Request options, assumptions, tradeoffs, and missing information rather than a single recommendation first.' },
          { title: 'Keep The Human Owner Visible', text: 'Decision authority should be explicit. AI is there to support judgment, not replace it.' }
        ],
        workedExample: {
          scenario: 'A manager must choose whether to delay a launch to improve onboarding.',
          approach: 'They ask AI to lay out options, assumptions, affected stakeholders, and likely consequences.',
          result: 'The choice becomes easier to discuss.',
          verification: 'The manager checks the assumptions against actual constraints and team capacity before deciding.'
        },
        artifact: { label: 'Decision Brief', title: 'Decision framing', items: ['Decision owner', 'Options', 'Constraints', 'Assumptions', 'Deadline'] },
        doThisNow: { task: 'Write a decision brief for one open decision you are facing.', timebox: '8 minutes', steps: ['State the decision.', 'List two options.', 'List the main constraints and assumptions.'] },
        commonMistakes: ['Asking AI to make the decision with no framing.', 'Skipping the assumptions.', 'Treating a recommendation as a mandate.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Structure Options And Tradeoffs',
        subtitle: 'Good decisions compare meaningful choices against explicit criteria.',
        objective: 'Use AI to build option comparisons that are easier to evaluate and explain.',
        whyItMatters: 'Many strategic discussions go nowhere because the options or evaluation criteria remain fuzzy.',
        coreConcepts: [
          { title: 'Name The Real Options', text: 'A valid option set includes choices someone could actually approve and execute.' },
          { title: 'Define The Criteria', text: 'Cost, speed, risk, customer impact, and reversibility are common lenses.' },
          { title: 'Show Tradeoffs Clearly', text: 'A useful comparison makes the downside of each option visible, not just the upside.' }
        ],
        workedExample: {
          scenario: 'A program lead is comparing three rollout approaches.',
          approach: 'They ask AI to build a criteria matrix and summarize tradeoffs in plain language.',
          result: 'Stakeholders can compare the options more quickly.',
          verification: 'The lead confirms that the criteria reflect what the decision-makers actually care about.'
        },
        artifact: { label: 'Matrix', title: 'Option comparison matrix', items: ['Option', 'Pros', 'Cons', 'Risk', 'Confidence'] },
        doThisNow: { task: 'Create a tradeoff matrix for one live choice.', timebox: '9 minutes', steps: ['List the real options.', 'Define three evaluation criteria.', 'Ask AI to surface tradeoffs.'] },
        commonMistakes: ['Comparing unrealistic options.', 'Leaving criteria implicit.', 'Presenting only benefits.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Use AI As A Devil’s Advocate',
        subtitle: 'Pressure-test plans before other people do it for you.',
        objective: 'Use critique prompts to find weak assumptions, missing risks, and overlooked stakeholder concerns.',
        whyItMatters: 'A structured challenge pass reduces blind spots and improves your ability to defend a plan.',
        coreConcepts: [
          { title: 'Ask For Failure Modes', text: 'Prompt for why the proposal might fail operationally, financially, or politically.' },
          { title: 'Ask From Stakeholder Views', text: 'Different stakeholders object for different reasons. Name those lenses explicitly.' },
          { title: 'Turn Critique Into Revision', text: 'A devil’s advocate step is useful only if it produces changes or better questions.' }
        ],
        workedExample: {
          scenario: 'A team wants to centralize a workflow quickly.',
          approach: 'The lead asks AI to critique the plan from adoption, support, and executive visibility perspectives.',
          result: 'Several realistic objections surface before the presentation.',
          verification: 'The lead checks whether each objection is grounded in the real organization rather than generic caution.'
        },
        artifact: { label: 'Critique Prompt', title: 'Pressure-test this plan', items: ['What assumptions fail?', 'Who might resist and why?', 'What risks are understated?'] },
        doThisNow: { task: 'Run a devil’s advocate pass on one current proposal.', timebox: '6 minutes', steps: ['Name the stakeholder lenses.', 'Ask for likely objections.', 'Revise the plan or message accordingly.'] },
        commonMistakes: ['Treating critique as negativity.', 'Ignoring stakeholder-specific objections.', 'Running critique with no follow-up revision.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Build Repeatable Decision Frameworks',
        subtitle: 'Recurring decisions deserve reusable structures.',
        objective: 'Turn repeated decisions into frameworks you can reuse and improve.',
        whyItMatters: 'A framework improves consistency and reduces the chance that each decision starts from scratch.',
        coreConcepts: [
          { title: 'Frameworks Fit Recurring Choices', text: 'Vendor selection, staffing tradeoffs, rollout timing, and priority calls often repeat.' },
          { title: 'Store Criteria And Questions', text: 'The most reusable part of the framework is the evaluation logic.' },
          { title: 'Keep It Lightweight', text: 'A framework should guide judgment, not replace it with bureaucracy.' }
        ],
        workedExample: {
          scenario: 'A manager repeatedly chooses between feature requests with similar tradeoffs.',
          approach: 'They build a simple framework with impact, effort, urgency, and dependency checks.',
          result: 'The decision conversation becomes faster and more consistent.',
          verification: 'They review the framework after a few uses to make sure it is still helping rather than oversimplifying.'
        },
        artifact: { label: 'Framework', title: 'Decision framework fields', items: ['Decision type', 'Criteria', 'Questions', 'Evidence needed', 'Review owner'] },
        doThisNow: { task: 'Create a lightweight framework for one recurring decision type in your work.', timebox: '10 minutes', steps: ['Choose the decision type.', 'Write the evaluation criteria.', 'List what evidence you need each time.'] },
        commonMistakes: ['Building frameworks for one-off decisions.', 'Adding too many criteria.', 'Forgetting to revisit the framework after use.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Create A Decision Support Toolkit',
        subtitle: 'Save the prompts, matrices, and critique patterns that improve strategic work.',
        objective: 'Build a reusable toolkit for option framing, tradeoff analysis, and critique.',
        whyItMatters: 'Decision quality improves when the best questions and formats are easy to reach.',
        coreConcepts: [
          { title: 'Save The Decision Brief', text: 'A clear framing format helps every later prompt perform better.' },
          { title: 'Save The Comparison Template', text: 'Matrices and summary formats make stakeholder discussions clearer.' },
          { title: 'Save The Critique Pass', text: 'Every major decision should have a reusable challenge step.' }
        ],
        workedExample: {
          scenario: 'A strategy lead makes frequent tradeoff calls but improvises the AI prompts each time.',
          approach: 'They create a toolkit with a decision brief, a comparison matrix, and a critique prompt.',
          result: 'Their process becomes easier to repeat and teach.',
          verification: 'They test the toolkit on a second decision to ensure the prompts are not overfit to one case.'
        },
        artifact: { label: 'Toolkit', title: 'Decision toolkit', items: ['Decision brief', 'Options matrix', 'Devil’s advocate prompt', 'Review checklist'] },
        doThisNow: { task: 'Package one decision workflow into a reusable toolkit entry.', timebox: '8 minutes', steps: ['Save the framing prompt.', 'Save the comparison format.', 'Save the critique step.'] },
        commonMistakes: ['Saving only the recommendation prompt.', 'Skipping the critique pattern.', 'Assuming one strong prompt covers every decision type.']
      }, { roleVariants: ROLE_SETS.strategy })
    ]
  },
  13: {
    title: 'Vendor And Stakeholder Work',
    phase: 3,
    summary: 'Use AI to prepare for vendor evaluation, contract review support, and stakeholder communication with stronger structure and clearer follow-through.',
    lessons: [
      lesson({
        title: 'Prepare For Vendor Conversations',
        subtitle: 'AI can help you arrive with sharper questions and a clearer evaluation lens.',
        objective: 'Use AI to prepare for vendor meetings and internal buy-or-wait discussions.',
        whyItMatters: 'Vendor work often mixes incomplete information, persuasion, and operational consequences. Strong preparation reduces noise.',
        coreConcepts: [
          { title: 'Know The Decision', text: 'Are you exploring, shortlisting, negotiating, or preparing a recommendation?' },
          { title: 'Define The Criteria', text: 'Implementation fit, cost, risk, change burden, and evidence quality are common evaluation lenses.' },
          { title: 'Prepare Questions That Expose Reality', text: 'Good vendor questions test integration effort, support quality, security, and operational readiness.' }
        ],
        workedExample: {
          scenario: 'A team evaluates a new workflow tool with limited preparation time.',
          approach: 'They use AI to create an evaluation brief and a question set tied to their own operating constraints.',
          result: 'The conversation becomes more about fit than sales narrative.',
          verification: 'They compare vendor claims against references, documentation, or internal experience before recommending anything.'
        },
        artifact: { label: 'Brief', title: 'Vendor prep brief', items: ['Decision stage', 'Criteria', 'Questions', 'Risks to validate'] },
        doThisNow: { task: 'Build a prep brief for one real vendor conversation.', timebox: '8 minutes', steps: ['State the decision stage.', 'List the evaluation criteria.', 'Draft five validation questions.'] },
        commonMistakes: ['Letting the vendor’s framing define the evaluation.', 'Using generic questions.', 'Skipping internal fit criteria.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Compare Vendors More Systematically',
        subtitle: 'A structured comparison reduces bias and sales-driven recency.',
        objective: 'Create a repeatable framework for vendor comparison using AI as an organizing assistant.',
        whyItMatters: 'Vendor decisions get messy when information comes in different formats and from different stakeholders.',
        coreConcepts: [
          { title: 'Normalize The Comparison', text: 'Ask AI to place each vendor against the same criteria and evidence fields.' },
          { title: 'Separate Claims From Evidence', text: 'A comparison is stronger when it shows what is claimed versus what is independently supported.' },
          { title: 'Capture Open Questions', text: 'Useful evaluations preserve unresolved concerns instead of hiding them.' }
        ],
        workedExample: {
          scenario: 'A procurement lead compares three vendors whose proposals are structured differently.',
          approach: 'They ask AI to normalize them into one matrix and flag missing evidence.',
          result: 'The team can discuss fit and risk more clearly.',
          verification: 'They review the matrix against the original proposals to ensure no nuance was lost.'
        },
        artifact: { label: 'Matrix', title: 'Vendor comparison fields', items: ['Criteria', 'Vendor claim', 'Evidence', 'Risk', 'Open question'] },
        doThisNow: { task: 'Build a comparison matrix for one vendor review already in progress.', timebox: '10 minutes', steps: ['Choose the criteria.', 'Normalize the source material.', 'Mark evidence gaps explicitly.'] },
        commonMistakes: ['Comparing vendors with different criteria.', 'Collapsing claim and evidence together.', 'Forgetting to track open questions.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Support Contract Review Safely',
        subtitle: 'AI can help organize contract language, but it does not replace legal review.',
        objective: 'Use AI to summarize and organize contract language while keeping approval and risk controls intact.',
        whyItMatters: 'Contract work is high consequence. The safe use case is drafting support and issue spotting, not authoritative interpretation.',
        coreConcepts: [
          { title: 'Use It For Organization', text: 'AI can help extract obligations, timelines, and key terms into a reviewable structure.' },
          { title: 'Mark Uncertainty', text: 'If a clause is ambiguous, the output should note that instead of forcing a confident interpretation.' },
          { title: 'Escalate To The Right Reviewer', text: 'Legal, procurement, or policy owners still decide what the language means and what changes are acceptable.' }
        ],
        workedExample: {
          scenario: 'A business owner needs to understand the main obligations in a draft agreement before legal review.',
          approach: 'They ask AI to extract key clauses, dates, obligations, and questions for counsel.',
          result: 'The legal review starts from a clearer issue list.',
          verification: 'The owner checks the extracted language against the contract text and does not treat the summary as legal advice.'
        },
        artifact: { label: 'Review Aid', title: 'Contract extraction sections', items: ['Obligations', 'Dates', 'Approvals', 'Questions for review'] },
        doThisNow: { task: 'Turn one contract or agreement excerpt into a reviewable issue list.', timebox: '8 minutes', steps: ['Extract obligations and dates.', 'Mark ambiguous language.', 'List questions for the proper reviewer.'] },
        commonMistakes: ['Treating AI output as legal interpretation.', 'Using AI on sensitive documents without approval.', 'Ignoring ambiguous language.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Tailor Stakeholder Communication',
        subtitle: 'Different stakeholders need different levels of detail, risk visibility, and framing.',
        objective: 'Use AI to adapt one core message for sponsors, peers, vendors, or working teams.',
        whyItMatters: 'Stakeholder friction often comes from poor framing rather than disagreement with the underlying plan.',
        coreConcepts: [
          { title: 'Start From Shared Facts', text: 'The core facts should remain stable even as the framing changes.' },
          { title: 'Match The Reader’s Lens', text: 'Sponsors may care about outcomes and risk. Working teams may need tasks and dependencies.' },
          { title: 'Keep Political Reality In Mind', text: 'AI can help you prepare, but you still need judgment about what is wise to say and when.' }
        ],
        workedExample: {
          scenario: 'A team lead must explain the same vendor decision to finance, operations, and leadership.',
          approach: 'They create three versions from the same source brief with different audience instructions.',
          result: 'Each stakeholder gets a clearer, more relevant message.',
          verification: 'The lead checks that none of the versions change the actual decision or overstate certainty.'
        },
        artifact: { label: 'Matrix', title: 'Stakeholder framing', items: ['Audience', 'What they care about', 'What detail they need', 'Tone to avoid'] },
        doThisNow: { task: 'Draft two stakeholder-specific versions of one current message.', timebox: '7 minutes', steps: ['List the shared facts.', 'Define the audience lens.', 'Review for consistency across versions.'] },
        commonMistakes: ['Changing facts across audiences.', 'Using the same level of detail for everyone.', 'Letting AI smooth over real risks.']
      }, { roleVariants: ROLE_SETS.strategy }),
      lesson({
        title: 'Build A Vendor And Stakeholder Toolkit',
        subtitle: 'Save the structures that make recurring evaluation and communication work easier.',
        objective: 'Create a reusable toolkit for vendor prep, comparison, contract issue spotting, and stakeholder messaging.',
        whyItMatters: 'A small toolkit keeps vendor work more consistent and easier to audit.',
        coreConcepts: [
          { title: 'Store The Evaluation Brief', text: 'Start every new vendor review from a consistent decision frame.' },
          { title: 'Store The Comparison Matrix', text: 'Comparisons are easier when the format is stable.' },
          { title: 'Store The Review Boundaries', text: 'Capture what AI can support and what must go to legal, finance, or leadership review.' }
        ],
        workedExample: {
          scenario: 'A business operations team evaluates several tools each quarter.',
          approach: 'They save their best question sets, matrices, and review notes into one toolkit.',
          result: 'Future evaluations become faster and less dependent on memory.',
          verification: 'They update the toolkit after each review cycle to reflect what questions actually mattered.'
        },
        artifact: { label: 'Toolkit', title: 'Vendor toolkit', items: ['Prep brief', 'Comparison matrix', 'Contract issue list', 'Stakeholder message formats'] },
        doThisNow: { task: 'Save one vendor evaluation workflow as a toolkit entry.', timebox: '8 minutes', steps: ['Store the prep brief.', 'Store the matrix.', 'Store the review boundaries.'] },
        commonMistakes: ['Saving prompts without the decision criteria.', 'Forgetting review boundaries.', 'Never updating the toolkit after a real cycle.']
      }, { roleVariants: ROLE_SETS.strategy })
    ]
  },
  14: {
    title: 'Practical AI Agents And Automation',
    phase: 4,
    summary: 'Understand agentic workflows in practical terms: where they help, what oversight they need, and how to start safely.',
    lessons: [
      lesson({
        title: 'What Makes An Agent Different',
        subtitle: 'An agent is a workflow pattern, not magic autonomy.',
        objective: 'Explain the difference between a one-shot assistant interaction and a multi-step agentic workflow.',
        whyItMatters: 'Agent language creates hype quickly. A practical definition helps you decide where autonomy is useful and where it creates unnecessary risk.',
        coreConcepts: [
          { title: 'Assistants Respond, Agents Orchestrate', text: 'A simple assistant answers a request. An agentic workflow can plan, use tools, and continue through several steps.' },
          { title: 'Autonomy Is A Spectrum', text: 'Some systems only suggest next actions. Others perform them. Oversight should match the consequence of being wrong.' },
          { title: 'Workflow Design Matters More Than Labels', text: 'A reliable sequence with clear checks is more important than whether the product calls itself an agent.' }
        ],
        workedExample: {
          scenario: 'A team uses AI to draft a customer follow-up after reading notes.',
          approach: 'They compare that one-shot use with an agentic workflow that reads notes, drafts the follow-up, logs tasks, and creates a reminder.',
          result: 'The difference becomes concrete: multi-step coordination, not just better chat.',
          verification: 'They define which steps can be automated and which still need human approval.'
        },
        artifact: { label: 'Definition', title: 'Agentic workflow ingredients', items: ['Goal', 'Steps', 'Tools', 'Memory', 'Review gates'] },
        doThisNow: { task: 'Pick one recurring task and decide whether it is better handled as an assistant prompt or a multi-step workflow.', timebox: '8 minutes', steps: ['List the steps.', 'Mark which require human judgment.', 'Decide where automation would actually help.'] },
        commonMistakes: ['Calling every AI use case an agent.', 'Assuming more autonomy is always better.', 'Skipping review design.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Tools, Memory, And Planning',
        subtitle: 'These are the building blocks behind most practical agentic systems.',
        objective: 'Understand the three design questions behind useful automation: what it can access, what it remembers, and how it sequences work.',
        whyItMatters: 'Once you understand the building blocks, agentic systems become easier to evaluate without relying on product hype.',
        coreConcepts: [
          { title: 'Tools Give Reach', text: 'The workflow becomes useful when it can read a doc, update a task, send a draft, or retrieve needed information.' },
          { title: 'Memory Preserves Context', text: 'Saved instructions, prior outputs, or known preferences help reduce repeated setup work.' },
          { title: 'Planning Controls Sequence', text: 'Good plans are explicit about steps, stop conditions, and when a human must step in.' }
        ],
        workedExample: {
          scenario: 'A team wants AI to prepare weekly project updates automatically.',
          approach: 'They identify the tool access needed, the context that should persist, and the checkpoints before anything is shared.',
          result: 'The automation design becomes tangible instead of abstract.',
          verification: 'They test the workflow on a sample week and inspect each step before moving toward real use.'
        },
        artifact: { label: 'Design Canvas', title: 'Agentic design questions', items: ['What can it access?', 'What should it remember?', 'What steps can run automatically?', 'Where does human review happen?'] },
        doThisNow: { task: 'Sketch the tool, memory, and planning needs for one candidate workflow.', timebox: '10 minutes', steps: ['Name the inputs.', 'Name what must persist.', 'List where a person must approve or edit.'] },
        commonMistakes: ['Focusing on the model only.', 'Ignoring what context must persist.', 'Treating planning as an afterthought.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Design Human-In-The-Loop Oversight',
        subtitle: 'Oversight should match the risk, not the hype.',
        objective: 'Create practical review checkpoints for multi-step AI workflows.',
        whyItMatters: 'Agentic workflows fail when teams either automate everything too early or make approval so heavy that the system provides no benefit.',
        coreConcepts: [
          { title: 'Use Risk-Based Oversight', text: 'Low-risk drafting can often be reviewed at the end. High-risk actions may need approval before execution.' },
          { title: 'Review The Right Checkpoints', text: 'The important review moments are usually before external communication, data updates, or consequential recommendations.' },
          { title: 'Keep The Workflow Usable', text: 'Oversight should reduce risk without rebuilding the full manual process. ' }
        ],
        workedExample: {
          scenario: 'A team wants an AI workflow to draft client recaps and update tasks.',
          approach: 'They require approval before sending the recap but allow automatic task draft creation.',
          result: 'The workflow saves time without risking external mistakes.',
          verification: 'They review error patterns after the first few runs and adjust the checkpoints as needed.'
        },
        artifact: { label: 'Oversight Map', title: 'Where to review', items: ['Before external send', 'Before system update', 'Before high-impact recommendation'] },
        doThisNow: { task: 'Map the review points for one multi-step workflow you are considering.', timebox: '7 minutes', steps: ['List the steps.', 'Mark risk level by step.', 'Choose approval points.'] },
        commonMistakes: ['Using the same oversight for every step.', 'Automating outbound actions too early.', 'Making the review process so heavy that nobody uses the workflow.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Find Practical Agent Use Cases',
        subtitle: 'Start where the sequence is predictable and the review cost is manageable.',
        objective: 'Identify realistic agentic use cases for business IC workflows.',
        whyItMatters: 'The best early use cases are not the flashiest. They are repetitive, multi-step, and easy to inspect.',
        coreConcepts: [
          { title: 'Good Candidates', text: 'Weekly status preparation, meeting follow-up bundles, intake triage, and recurring report assembly are common starting points.' },
          { title: 'Bad Early Candidates', text: 'Open-ended strategy, sensitive approvals, and customer-facing autonomy without review create more risk than value.' },
          { title: 'Scope Small', text: 'Start with one bounded sequence and prove reliability before expanding the workflow.' }
        ],
        workedExample: {
          scenario: 'An operations team wants an "AI agent for everything."',
          approach: 'They narrow the idea to triaging requests, drafting an internal summary, and preparing a human-reviewed response.',
          result: 'The scope becomes testable and useful.',
          verification: 'They compare error rate and review effort against the manual process before expanding.'
        },
        artifact: { label: 'Use Case Filter', title: 'Strong first agentic use cases', items: ['Repeatable', 'Multi-step', 'Low to medium risk', 'Easy to review'] },
        doThisNow: { task: 'List three candidate workflows and choose the safest first agentic use case.', timebox: '8 minutes', steps: ['Write the workflow steps.', 'Score the risk and review cost.', 'Pick the smallest useful one.'] },
        commonMistakes: ['Starting with the most ambitious use case.', 'Ignoring review cost.', 'Choosing tasks with unclear success criteria.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Start With A Pilot, Not A Myth',
        subtitle: 'The first goal is evidence, not transformation.',
        objective: 'Plan a small agentic pilot with clear scope, review rules, and a success measure.',
        whyItMatters: 'Small pilots produce evidence. Vague automation ambitions usually produce confusion.',
        coreConcepts: [
          { title: 'Pilot One Workflow', text: 'Choose one repeatable sequence with a clear owner and clear review step.' },
          { title: 'Measure The Right Thing', text: 'Time saved, review effort, and error rate matter more than how impressive the demo looks.' },
          { title: 'Document What You Learned', text: 'A good pilot leaves behind a pattern others can reuse or a clear reason not to expand.' }
        ],
        workedExample: {
          scenario: 'A team pilots an AI-generated weekly summary workflow.',
          approach: 'They run it for four cycles with manual review and compare it to the old process.',
          result: 'They get real evidence about reliability and time savings.',
          verification: 'They inspect misses, not just wins, before deciding whether to scale.'
        },
        artifact: { label: 'Pilot Plan', title: 'Agentic pilot fields', items: ['Workflow', 'Owner', 'Review step', 'Metrics', 'End date'] },
        doThisNow: { task: 'Write a one-page pilot plan for one small agentic workflow.', timebox: '10 minutes', steps: ['Define the workflow.', 'Define the review step.', 'Define how you will judge the pilot.'] },
        commonMistakes: ['Starting with a vague vision.', 'Measuring only time saved.', 'Expanding before understanding failure patterns.']
      }, { roleVariants: ROLE_SETS.enablement })
    ]
  },
  15: {
    title: 'AI Inside Your Existing Tools',
    phase: 4,
    summary: 'Get more value from AI where your work already lives by matching embedded features to specific jobs and review standards.',
    lessons: [
      lesson({
        title: 'Why Embedded AI Often Wins',
        subtitle: 'Context already in the workspace can matter more than raw model novelty.',
        objective: 'Identify when embedded AI features inside your current tools are the best option.',
        whyItMatters: 'The strongest AI workflow is often the one with the least friction and the most relevant context already attached.',
        coreConcepts: [
          { title: 'Context Is The Advantage', text: 'Email, docs, tickets, chats, and calendars already contain the material that general assistants often need you to paste manually.' },
          { title: 'Workflow Fit Matters', text: 'A slightly weaker model inside the right tool can still produce better outcomes because setup friction is lower.' },
          { title: 'Review Standards Stay The Same', text: 'Better integration does not remove the need to verify high-risk output.' }
        ],
        workedExample: {
          scenario: 'A manager uses a standalone tool for meeting follow-ups even though the notes already live in their workspace.',
          approach: 'They compare the embedded AI feature against the external workflow on the same meeting.',
          result: 'The embedded tool wins because setup is lighter and the context is closer.',
          verification: 'They still check owners, dates, and factual accuracy before sending. '
        },
        artifact: { label: 'Decision Rule', title: 'Use embedded AI when', items: ['The source material already lives there', 'Setup friction is lower', 'The review burden stays manageable'] },
        doThisNow: { task: 'List one task that would be easier inside your current workspace than in a separate AI tool.', timebox: '5 minutes', steps: ['Name the task.', 'Name where the context lives.', 'State how you will review the output.'] },
        commonMistakes: ['Ignoring embedded tools you already pay for.', 'Assuming embedded AI means safer output automatically.', 'Switching tools without comparing the workflow end to end.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true }),
      lesson({
        title: 'Evaluate Embedded Features By Task',
        subtitle: 'Judge the feature on what you actually do, not on screenshots or launch claims.',
        objective: 'Test embedded AI features against real workflow tasks.',
        whyItMatters: 'Embedded AI varies widely. The right question is whether it improves your work inside the tool, not whether it looks impressive in a demo.',
        coreConcepts: [
          { title: 'Use Real Inputs', text: 'Test on the emails, docs, chats, or tickets you actually work with.' },
          { title: 'Measure Time To Final', text: 'The best feature usually produces the shortest path to a reviewed final output.' },
          { title: 'Check Integration Quality', text: 'See whether the feature actually respects the context and structure of the tool. ' }
        ],
        workedExample: {
          scenario: 'A writer evaluates an embedded document assistant.',
          approach: 'They test outline generation, editing, and recap drafting on real documents.',
          result: 'They discover the feature is strong for editing but weak for initial synthesis.',
          verification: 'They compare the same task against a general assistant to understand the tradeoff.'
        },
        artifact: { label: 'Test Grid', title: 'Embedded AI evaluation', items: ['Task', 'Input source', 'Time to reviewed output', 'What still needed manual work'] },
        doThisNow: { task: 'Run one real task through an embedded AI feature and score the result.', timebox: '10 minutes', steps: ['Pick a real task.', 'Use your normal source material.', 'Score the cleanup burden honestly.'] },
        commonMistakes: ['Testing only novelty features.', 'Ignoring review burden.', 'Assuming a native integration means the output is automatically correct.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true }),
      lesson({
        title: 'Use Workspace Context Better',
        subtitle: 'The win comes from asking with the right nearby material, not from the tool label.',
        objective: 'Write better prompts for AI features embedded in docs, chat, and productivity suites.',
        whyItMatters: 'Even inside your workspace, AI still needs clear intent, constraints, and review instructions.',
        coreConcepts: [
          { title: 'Point To The Right Material', text: 'Call out which email thread, notes, paragraph, or document section should drive the answer.' },
          { title: 'State The Action', text: 'Ask for the exact outcome: summary, reply, next-step list, rewrite, or agenda.' },
          { title: 'Limit The Output', text: 'Embedded AI works better when the output is bounded and immediately usable.' }
        ],
        workedExample: {
          scenario: 'An operator asks an embedded email assistant for a reply and gets a generic response.',
          approach: 'They reference the exact thread, the approved facts, and the tone needed.',
          result: 'The draft becomes more useful and less generic.',
          verification: 'They check that the reply reflects the current thread and does not invent commitments.'
        },
        artifact: { label: 'Prompt Pattern', title: 'Embedded AI request', items: ['Use this source', 'Produce this action', 'Keep this constraint'] },
        doThisNow: { task: 'Rewrite one embedded AI request to point to exact source material and a bounded action.', timebox: '6 minutes', steps: ['Name the source material.', 'Name the action.', 'Add one review constraint.'] },
        commonMistakes: ['Prompting vaguely just because the tool is nearby.', 'Letting the model choose the source context.', 'Skipping the same review rules you would use elsewhere.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true }),
      lesson({
        title: 'Build Stable Integration Patterns',
        subtitle: 'The best embedded AI uses become habits, not experiments.',
        objective: 'Turn successful embedded AI use cases into reliable daily or weekly routines.',
        whyItMatters: 'A tool feature matters only when it changes how work gets done consistently.',
        coreConcepts: [
          { title: 'Capture The Trigger', text: 'Know what event starts the workflow: weekly review, incoming request, meeting end, or document draft.' },
          { title: 'Capture The Prompt Pattern', text: 'Save the instructions and source references that work repeatedly.' },
          { title: 'Capture The Final Review', text: 'Every integration pattern should include the human checkpoint.' }
        ],
        workedExample: {
          scenario: 'A manager uses an embedded chat feature inconsistently.',
          approach: 'They standardize one pattern for meeting prep and one pattern for follow-up communication.',
          result: 'The feature becomes part of real work instead of a novelty button.',
          verification: 'They review whether the pattern still holds after a few uses or needs more context. '
        },
        artifact: { label: 'Pattern', title: 'Integration pattern fields', items: ['Trigger', 'Source context', 'Prompt pattern', 'Final review'] },
        doThisNow: { task: 'Document one embedded AI pattern you want to use repeatedly.', timebox: '8 minutes', steps: ['Name the trigger.', 'Save the source context rule.', 'Save the review step.'] },
        commonMistakes: ['Relying on memory instead of storing patterns.', 'Using the feature ad hoc with no repeatable structure.', 'Forgetting the review step.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true }),
      lesson({
        title: 'Design Your Daily AI Workflow',
        subtitle: 'Mix embedded and general tools intentionally instead of randomly.',
        objective: 'Create a daily workflow that combines your core AI tools with less switching and more consistency.',
        whyItMatters: 'A coherent workflow reduces tool sprawl and helps you know where each task belongs.',
        coreConcepts: [
          { title: 'Use The Closest Useful Tool', text: 'If the work lives in your workspace, start there. Switch tools only when the task genuinely demands it.' },
          { title: 'Separate Creation From Verification', text: 'Embedded AI may draft inside the workspace while source-forward tools or manual review handle verification.' },
          { title: 'Keep The Stack Small', text: 'A small set of reliable patterns beats a scattered set of partially adopted features.' }
        ],
        workedExample: {
          scenario: 'A business IC jumps between five AI tools during a normal day.',
          approach: 'They map which tasks belong in the workspace, which need a general assistant, and which need source-first research.',
          result: 'The day becomes less fragmented and the outputs become easier to trust.',
          verification: 'They review whether the new workflow reduces switching and cleanup rather than adding more tools to manage.'
        },
        artifact: { label: 'Workflow Map', title: 'Daily AI workflow map', items: ['Draft in workspace', 'Deep thinking in general assistant', 'Verification in source-first workflow'] },
        doThisNow: { task: 'Map your current AI tasks into a smaller daily workflow.', timebox: '9 minutes', steps: ['List the tasks.', 'Assign the best tool mode.', 'Remove one unnecessary switch.'] },
        commonMistakes: ['Using different tools for the same job with no reason.', 'Treating embedded AI and general AI as competitors instead of complements.', 'Growing the stack without redesigning the workflow.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true })
    ]
  },
  16: {
    title: 'Reusable AI Playbooks',
    phase: 4,
    summary: 'Turn successful AI workflows into repeatable playbooks that others can use, review, and improve.',
    lessons: [
      lesson({
        title: 'What A Playbook Actually Is',
        subtitle: 'A playbook is a reusable workflow with context, prompts, review rules, and examples.',
        objective: 'Define playbooks in a way that makes them useful for individuals and teams.',
        whyItMatters: 'A good playbook captures not only prompt wording but also the surrounding workflow that makes the output trustworthy.',
        coreConcepts: [
          { title: 'Playbooks Capture Workflow', text: 'They include when to use the workflow, what inputs are needed, and what review is required.' },
          { title: 'Playbooks Reduce Reinvention', text: 'They turn trial-and-error into a reusable starting point.' },
          { title: 'Playbooks Improve Team Consistency', text: 'People can produce more consistent work when the structure and review rules are shared. ' }
        ],
        workedExample: {
          scenario: 'A team has one person who is unusually effective with AI for customer recap notes.',
          approach: 'That person turns their working method into a playbook with a context block, prompt, and review checklist.',
          result: 'Others can start from a proven workflow instead of copying random prompts.',
          verification: 'The team tests the playbook on a second case before sharing it broadly.'
        },
        artifact: { label: 'Definition', title: 'Playbook fields', items: ['Use case', 'Inputs', 'Prompt pattern', 'Output format', 'Review checklist'] },
        doThisNow: { task: 'Identify one AI workflow you should convert into a playbook.', timebox: '5 minutes', steps: ['Name the use case.', 'List the required inputs.', 'List what review is required.'] },
        commonMistakes: ['Treating a single prompt as a full playbook.', 'Ignoring review instructions.', 'Writing playbooks for rare tasks.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Design The Inputs First',
        subtitle: 'Most playbooks live or die by the quality of their inputs.',
        objective: 'Define the input package needed to make a playbook reliable.',
        whyItMatters: 'Playbooks fail when they depend on hidden knowledge or messy context that is never documented.',
        coreConcepts: [
          { title: 'List Required Inputs', text: 'Templates, notes, examples, approved facts, and output destinations should be explicit.' },
          { title: 'Show What Good Looks Like', text: 'An example output or completed case makes the playbook easier to use.' },
          { title: 'Remove Hidden Assumptions', text: 'If the playbook assumes internal jargon or unwritten policy, capture that openly.' }
        ],
        workedExample: {
          scenario: 'A writing playbook works for its creator but fails for teammates.',
          approach: 'They discover the missing ingredient was the approved tone guide and a sample output.',
          result: 'The playbook becomes much more reusable once the inputs are explicit.',
          verification: 'A teammate uses the playbook independently to confirm the input list is complete.'
        },
        artifact: { label: 'Input Pack', title: 'Required input checklist', items: ['Source material', 'Examples', 'Constraints', 'Approval rules'] },
        doThisNow: { task: 'Write the required input list for one playbook you want to create.', timebox: '7 minutes', steps: ['List the source inputs.', 'List the examples needed.', 'List the approval or policy rules.'] },
        commonMistakes: ['Assuming others know the hidden context.', 'Forgetting examples.', 'Leaving review rules implicit.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Use System Prompts And Guidance Carefully',
        subtitle: 'Persistent instructions are valuable when they encode standards, not wishful thinking.',
        objective: 'Write stable guidance for repeated AI workflows without overcomplicating the setup.',
        whyItMatters: 'Persistent instructions can save time, but only when they encode durable standards and real boundaries.',
        coreConcepts: [
          { title: 'Encode Standards', text: 'Voice, structure, prohibited moves, and review rules are good candidates for persistent guidance.' },
          { title: 'Do Not Encode Unverified Assumptions', text: 'Persistent instructions should not hard-code facts that change often.' },
          { title: 'Keep It Readable', text: 'If nobody can understand or update the guidance, the playbook will decay quickly.' }
        ],
        workedExample: {
          scenario: 'A team uses a persistent instruction set for executive updates.',
          approach: 'They encode style, format, and review rules, but keep project facts in the task-specific prompt.',
          result: 'The setup stays reusable without going stale immediately.',
          verification: 'They review the persistent guidance quarterly to remove outdated assumptions.'
        },
        artifact: { label: 'Guidance', title: 'What belongs in persistent instructions', items: ['Style rules', 'Output structure', 'Review rules', 'What never belongs: changing facts'] },
        doThisNow: { task: 'Split one prompt into durable guidance and task-specific context.', timebox: '8 minutes', steps: ['Highlight what stays constant.', 'Move changing facts into the task prompt.', 'Review for outdated assumptions.'] },
        commonMistakes: ['Packing every fact into persistent instructions.', 'Making guidance too long to maintain.', 'Never reviewing what became outdated.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Test And Improve Playbooks',
        subtitle: 'A playbook is not finished when it works once.',
        objective: 'Create a lightweight test method for AI playbooks.',
        whyItMatters: 'Playbooks should survive more than one happy-path example.',
        coreConcepts: [
          { title: 'Test On Multiple Cases', text: 'A playbook should work on varied inputs from the same workflow.' },
          { title: 'Track Failure Modes', text: 'Most playbook improvement comes from seeing where it breaks, not where it shines.' },
          { title: 'Update The Smallest Useful Thing', text: 'Revise the missing input, unclear constraint, or review step before rewriting the whole playbook.' }
        ],
        workedExample: {
          scenario: 'A support recap playbook works well on simple tickets but fails on escalations.',
          approach: 'The team adds an escalation branch and a new review rule instead of rewriting the full playbook.',
          result: 'The playbook becomes more reliable while staying simple.',
          verification: 'They retest it on another escalation case to confirm the revision helped.'
        },
        artifact: { label: 'Test Sheet', title: 'Playbook test fields', items: ['Case used', 'What worked', 'What failed', 'What changed'] },
        doThisNow: { task: 'Test one playbook on a second real case and record what broke.', timebox: '10 minutes', steps: ['Run the playbook on a new case.', 'Note the failure mode.', 'Revise the smallest useful part.'] },
        commonMistakes: ['Declaring success after one use.', 'Overhauling the playbook without diagnosing the failure.', 'Not recording what changed.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Maintain A Shared Playbook Library',
        subtitle: 'The value grows when others can find, trust, and update the right workflow.',
        objective: 'Create a simple shared library for team playbooks.',
        whyItMatters: 'A library makes AI knowledge operational. It also reduces repeated errors and duplicated effort.',
        coreConcepts: [
          { title: 'Make Entries Scannable', text: 'Use case, inputs, prompt pattern, review checklist, owner, and last review date should be visible.' },
          { title: 'Assign Ownership', text: 'Someone should be responsible for updating the playbook when the workflow changes.' },
          { title: 'Prune Aggressively', text: 'Outdated or unused playbooks create noise and reduce trust.' }
        ],
        workedExample: {
          scenario: 'A team has dozens of saved prompts spread across chat threads and docs.',
          approach: 'They move the useful ones into a shared library with ownership and last-reviewed dates.',
          result: 'The best workflows become easier to discover and maintain.',
          verification: 'They remove duplicate entries and test the top three playbooks to ensure they still work.'
        },
        artifact: { label: 'Library', title: 'Shared playbook entry', items: ['Use case', 'Owner', 'Last reviewed', 'Inputs', 'Prompt', 'Review rules'] },
        doThisNow: { task: 'Create one clean shared library entry from a playbook you trust.', timebox: '8 minutes', steps: ['Write the use case and owner.', 'Add the prompt pattern and review rules.', 'Set a next review month.'] },
        commonMistakes: ['Saving playbooks with no owner.', 'Keeping old entries forever.', 'Hiding the review rules.']
      }, { roleVariants: ROLE_SETS.enablement })
    ]
  },
  17: {
    title: 'Helping Your Team Adopt AI',
    phase: 4,
    summary: 'Move from personal AI competence to team enablement with practical demos, simple habits, and clearer safety boundaries.',
    lessons: [
      lesson({
        title: 'Why Team Adoption Stalls',
        subtitle: 'The blockers are usually clarity, trust, and workflow fit.',
        objective: 'Identify the common reasons teams fail to adopt AI even when individuals see value.',
        whyItMatters: 'Understanding the blockers helps you support better adoption from your seat, even without formal authority.',
        coreConcepts: [
          { title: 'People Need Clear Use Cases', text: 'Abstract enthusiasm does not change behavior. Concrete workflows do.' },
          { title: 'Trust Requires Boundaries', text: 'Teams adopt faster when they know what is safe, what must be reviewed, and where AI is not appropriate.' },
          { title: 'Workflow Fit Beats Inspiration', text: 'People keep using AI when it makes their actual work easier, not when it only looks impressive in a demo.' }
        ],
        workedExample: {
          scenario: 'A team attends an AI demo but changes nothing the following week.',
          approach: 'One team member reframes adoption around two recurring workflows and a clear safe-use checklist.',
          result: 'Usage starts to move because the next action is concrete.',
          verification: 'They ask teammates which parts of the workflow still felt unclear or risky and adjust the support accordingly.'
        },
        artifact: { label: 'Checklist', title: 'Adoption blockers to check', items: ['Clear use case?', 'Safe path?', 'Easy workflow?', 'Visible example?'] },
        doThisNow: { task: 'Name the biggest blocker to AI use on your team right now.', timebox: '5 minutes', steps: ['Choose one blocker.', 'Write one way to reduce it.', 'Tie it to a real workflow.'] },
        commonMistakes: ['Assuming resistance is just fear.', 'Leading with hype instead of workflow examples.', 'Ignoring policy confusion.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Create A Small Adoption Play',
        subtitle: 'Start with one workflow, one audience, and one example.',
        objective: 'Design a lightweight adoption play you can run without needing a large change program.',
        whyItMatters: 'Small wins build credibility much faster than broad evangelism.',
        coreConcepts: [
          { title: 'Choose A Useful Workflow', text: 'Pick work that many people do and that already has a painful manual version.' },
          { title: 'Use A Real Example', text: 'Show the workflow on actual work, not a toy example.' },
          { title: 'Include The Review Step', text: 'People trust the workflow more when they see how quality is controlled. ' }
        ],
        workedExample: {
          scenario: 'A coordinator wants teammates to adopt AI for meeting recaps.',
          approach: 'They show one real before-and-after example with the source notes and the final review checklist.',
          result: 'Teammates can imagine themselves using the workflow.',
          verification: 'They watch whether the example is actually replicable by others and refine the instructions based on feedback.'
        },
        artifact: { label: 'Play', title: 'Adoption play fields', items: ['Workflow', 'Audience', 'Real example', 'Review step', 'Success sign'] },
        doThisNow: { task: 'Design one small adoption play for a workflow your team already does.', timebox: '8 minutes', steps: ['Choose the workflow.', 'Choose the audience.', 'Choose the example you will show.'] },
        commonMistakes: ['Trying to teach everything at once.', 'Using demo examples with no real relevance.', 'Skipping the quality control explanation.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Run Better Demos And Training',
        subtitle: 'People learn faster when they can see the workflow, the output, and the review step.',
        objective: 'Prepare short AI demos that teach a workflow rather than just entertaining the audience.',
        whyItMatters: 'A strong demo lowers adoption friction by showing exactly what input, output, and review look like in practice.',
        coreConcepts: [
          { title: 'Demo Real Work', text: 'Use a realistic task with realistic constraints.' },
          { title: 'Narrate The Decisions', text: 'Explain why the prompt includes certain context and why certain review steps are required.' },
          { title: 'End With A Repeatable Pattern', text: 'The audience should leave with something they can try immediately.' }
        ],
        workedExample: {
          scenario: 'A team lead runs a short session on AI-assisted status reporting.',
          approach: 'They show the source tracker, the prompt, the draft, and the final review edits.',
          result: 'The audience sees the full workflow instead of just the shiny middle step.',
          verification: 'They ask one teammate to repeat the demo workflow afterward to prove it was teachable.'
        },
        artifact: { label: 'Demo Plan', title: 'Good demo structure', items: ['Task', 'Source material', 'Prompt', 'Draft', 'Review', 'Takeaway'] },
        doThisNow: { task: 'Outline a 10-minute demo for one AI workflow your team should learn.', timebox: '7 minutes', steps: ['Choose the task.', 'List the source material.', 'List the review points you will show.'] },
        commonMistakes: ['Only showing the output.', 'Using unrealistically clean input.', 'Ending with inspiration instead of a repeatable next step.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Handle Resistance Productively',
        subtitle: 'The goal is not to win an argument; it is to clarify risk, fit, and boundaries.',
        objective: 'Respond to common concerns about AI adoption with practical clarity.',
        whyItMatters: 'Resistance often points to real workflow, trust, or policy concerns that need a better answer than enthusiasm.',
        coreConcepts: [
          { title: 'Treat Concerns As Design Input', text: 'Questions about accuracy, privacy, and quality often reveal what the workflow still lacks.' },
          { title: 'Answer With Boundaries', text: 'People gain trust when you can say where AI should and should not be used.' },
          { title: 'Use Evidence, Not Pressure', text: 'A small working example beats a broad claim that "everyone needs to use AI now."' }
        ],
        workedExample: {
          scenario: 'A teammate worries that AI-generated recaps will create false accountability.',
          approach: 'You show the labeled notes, the review step, and the rule that owners are always checked manually.',
          result: 'The concern becomes a design rule rather than a blocker.',
          verification: 'You confirm whether the revised workflow addresses the concern in practice. '
        },
        artifact: { label: 'Responses', title: 'Useful response pattern', items: ['Acknowledge the concern', 'Show the boundary', 'Show the review step', 'Offer a small trial'] },
        doThisNow: { task: 'Write a practical response to one common AI objection on your team.', timebox: '6 minutes', steps: ['Name the concern.', 'Write the boundary.', 'Point to the workflow control that addresses it.'] },
        commonMistakes: ['Treating skepticism as ignorance.', 'Defending AI in the abstract.', 'Ignoring valid concerns about safety or quality.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Measure Whether Adoption Is Working',
        subtitle: 'Use simple evidence, not vanity metrics.',
        objective: 'Track whether AI adoption is improving team work in concrete ways.',
        whyItMatters: 'Adoption stories get stronger when they are tied to specific workflow outcomes, not just usage counts.',
        coreConcepts: [
          { title: 'Track Workflow Outcomes', text: 'Time saved, cycle time, quality improvements, or reduced rework matter more than raw prompt counts.' },
          { title: 'Use Small Evidence Sets', text: 'A handful of before-and-after examples can be more persuasive than noisy aggregate metrics.' },
          { title: 'Learn From Drop-Off', text: 'When people stop using a workflow, the reason often reveals what needs improvement.' }
        ],
        workedExample: {
          scenario: 'A team tries AI-assisted status reporting for a month.',
          approach: 'They collect three before-and-after examples, average time to final, and common review issues.',
          result: 'The team can decide whether the workflow is worth keeping.',
          verification: 'They compare the examples against the prior process rather than reporting only how many times the feature was used.'
        },
        artifact: { label: 'Measures', title: 'Simple adoption evidence', items: ['Time to final output', 'Quality issues found', 'Number of repeat users', 'Before-and-after samples'] },
        doThisNow: { task: 'Choose one adoption workflow and define how you will judge whether it is working.', timebox: '8 minutes', steps: ['Pick the workflow.', 'Pick two outcome metrics.', 'Choose one example set to review.'] },
        commonMistakes: ['Measuring only usage.', 'Not collecting examples.', 'Treating low adoption as proof the idea was bad without diagnosing why.']
      }, { roleVariants: ROLE_SETS.enablement })
    ]
  },
  18: {
    title: 'Finding Better AI Opportunities',
    phase: 5,
    summary: 'Identify where AI creates real value by examining work patterns, friction points, and decision-heavy tasks with a clear evaluation lens.',
    lessons: [
      lesson({
        title: 'Adopt The Opportunity Audit Mindset',
        subtitle: 'Look for repeated work, information friction, and review-heavy bottlenecks.',
        objective: 'Find AI opportunities by observing work patterns instead of chasing trends.',
        whyItMatters: 'The best AI opportunities usually come from boring recurring pain, not from abstract innovation sessions.',
        coreConcepts: [
          { title: 'Look For Repetition', text: 'Repeated drafting, summarizing, organizing, and comparison work are common signals.' },
          { title: 'Look For Delay', text: 'Waiting for documentation, follow-up, or synthesis often points to high-value use cases.' },
          { title: 'Look For Review Bottlenecks', text: 'If experts spend time reformatting or clarifying work, AI may help reduce that burden.' }
        ],
        workedExample: {
          scenario: 'A business operations team feels busy but cannot name where AI would help.',
          approach: 'They review a week of work and highlight repeated drafting, recap, and coordination tasks.',
          result: 'Several realistic AI use cases appear quickly.',
          verification: 'They confirm the tasks are truly recurring rather than one-off spikes.'
        },
        artifact: { label: 'Audit Lens', title: 'Opportunity signals', items: ['Repetition', 'Delay', 'Reformatting', 'Synthesis burden'] },
        doThisNow: { task: 'Review the last week of your work and list three recurring tasks that match the audit lens.', timebox: '8 minutes', steps: ['Scan your calendar or task list.', 'Mark repeated jobs.', 'Choose the one with the clearest pain.'] },
        commonMistakes: ['Starting from tool ideas instead of work pain.', 'Ignoring small repeated burdens.', 'Choosing flashy use cases over recurring ones.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Classify Tasks: Automate, Augment, Avoid',
        subtitle: 'Not every task should be given to AI, and not every good use case deserves full automation.',
        objective: 'Sort tasks into the right level of AI support.',
        whyItMatters: 'The right level of intervention depends on risk, ambiguity, and how much judgment the task requires.',
        coreConcepts: [
          { title: 'Automate Bounded Repetition', text: 'Low-risk, repeatable sequences with clear review paths are the best automation candidates.' },
          { title: 'Augment Judgment-Heavy Work', text: 'Many tasks benefit most from AI support rather than full handoff.' },
          { title: 'Avoid High-Risk, Low-Clarity Tasks', text: 'If the task is sensitive, ambiguous, or hard to review, AI may not be the right first move.' }
        ],
        workedExample: {
          scenario: 'A team debates whether to automate customer escalations.',
          approach: 'They classify the work and realize drafting summaries is augmentable, but outbound decisions should not be automated.',
          result: 'The scope becomes safer and more realistic.',
          verification: 'They review whether the classification reflects the actual consequences of being wrong.'
        },
        artifact: { label: 'Classifier', title: 'Task classification questions', items: ['How repeatable is it?', 'How risky is it?', 'How much judgment does it require?', 'How easy is it to review?'] },
        doThisNow: { task: 'Classify three current tasks as automate, augment, or avoid.', timebox: '7 minutes', steps: ['List the tasks.', 'Score risk and reviewability.', 'Assign the level of AI support.'] },
        commonMistakes: ['Trying to automate judgment-heavy work first.', 'Treating every good use case as an automation candidate.', 'Ignoring reviewability.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Estimate Value Quickly',
        subtitle: 'Rough ROI thinking is enough to prioritize early opportunities.',
        objective: 'Use simple value estimates to compare candidate AI opportunities.',
        whyItMatters: 'You do not need perfect ROI math to decide what to test next, but you do need a way to compare options.',
        coreConcepts: [
          { title: 'Estimate Frequency', text: 'How often does the work happen?' },
          { title: 'Estimate Current Effort', text: 'How much time, rework, or coordination does it currently require?' },
          { title: 'Estimate Adoption Cost', text: 'Training, setup, risk controls, and change effort all count.' }
        ],
        workedExample: {
          scenario: 'A team must choose between automating weekly status updates or improving vendor research.',
          approach: 'They compare frequency, current effort, and change cost.',
          result: 'The priority becomes clearer without elaborate spreadsheets.',
          verification: 'They sanity-check the estimates with the people doing the work each week.'
        },
        artifact: { label: 'ROI Lite', title: 'Opportunity estimate', items: ['Frequency', 'Current effort', 'Potential gain', 'Change cost'] },
        doThisNow: { task: 'Score two candidate AI opportunities with rough ROI estimates.', timebox: '8 minutes', steps: ['Choose two opportunities.', 'Estimate the current burden.', 'Estimate the change cost and likely gain.'] },
        commonMistakes: ['Demanding perfect precision before testing.', 'Ignoring change cost.', 'Using only hype to prioritize.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Start With Quick Wins',
        subtitle: 'The first AI opportunity should teach you something and lower adoption friction.',
        objective: 'Choose first opportunities that are visible, safe, and teachable.',
        whyItMatters: 'Quick wins create evidence and confidence. They also reveal what support structures you actually need.',
        coreConcepts: [
          { title: 'Pick Visible Value', text: 'The improvement should be easy for others to notice and understand.' },
          { title: 'Keep The Workflow Narrow', text: 'A clear boundary reduces implementation and review complexity.' },
          { title: 'Choose Teachable Work', text: 'The best first wins are easy to explain and repeat.' }
        ],
        workedExample: {
          scenario: 'A team considers a complex workflow automation as its first AI initiative.',
          approach: 'They instead start with a repeatable meeting follow-up workflow that saves time and is easy to review.',
          result: 'They get a cleaner early win and learn faster.',
          verification: 'They compare the before-and-after workflow to confirm the gain is real and visible. '
        },
        artifact: { label: 'Quick Win Filter', title: 'First-opportunity criteria', items: ['Visible benefit', 'Low to medium risk', 'Clear review step', 'Easy to teach'] },
        doThisNow: { task: 'Choose the best first AI opportunity from your current shortlist.', timebox: '6 minutes', steps: ['Apply the quick-win filter.', 'Pick the smallest useful workflow.', 'Write why it is the right first move.'] },
        commonMistakes: ['Picking the most ambitious use case first.', 'Choosing invisible back-office wins nobody notices.', 'Ignoring whether others can learn the workflow.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Write An Opportunity Brief',
        subtitle: 'A short brief is enough to align people on what you want to test.',
        objective: 'Draft a one-page brief for an AI opportunity you want to pursue.',
        whyItMatters: 'A brief turns a good idea into something others can evaluate, support, or refine.',
        coreConcepts: [
          { title: 'Describe The Current Pain', text: 'State what the workflow looks like today and why it is worth improving.' },
          { title: 'Describe The Proposed Change', text: 'Show exactly where AI would help and where people still review.' },
          { title: 'Describe Success', text: 'Define the outcome, not just the implementation. ' }
        ],
        workedExample: {
          scenario: 'An individual contributor wants approval to test AI-assisted research summaries.',
          approach: 'They write a short brief with current effort, proposed workflow, review rules, and simple success measures.',
          result: 'The idea becomes easy to discuss and approve.',
          verification: 'They review the brief to ensure it describes the real workflow instead of a vague AI ambition.'
        },
        artifact: { label: 'Brief', title: 'Opportunity brief sections', items: ['Current problem', 'Proposed workflow', 'Review rule', 'Success measure', 'Owner'] },
        doThisNow: { task: 'Write an opportunity brief for one AI use case you want to test.', timebox: '10 minutes', steps: ['State the current pain.', 'State the proposed AI role.', 'State how you will know if it works.'] },
        commonMistakes: ['Writing about AI in general instead of one workflow.', 'Leaving out the review rule.', 'Not assigning an owner.']
      }, { roleVariants: ROLE_SETS.enablement })
    ]
  },
  19: {
    title: 'AI Change And Governance',
    phase: 5,
    summary: 'Support sustainable AI adoption by planning for workflow change, decision rights, and simple governance that people can actually use.',
    lessons: [
      lesson({
        title: 'Why AI Initiatives Fail',
        subtitle: 'Failure usually comes from workflow gaps, trust gaps, and unclear ownership.',
        objective: 'Recognize the common causes of weak AI initiatives so you can avoid repeating them.',
        whyItMatters: 'Many initiatives fail not because the model is weak, but because the surrounding workflow, training, and governance are unfinished.',
        coreConcepts: [
          { title: 'No Clear Workflow', text: 'People are asked to "use AI more" without a defined process or use case.' },
          { title: 'No Review Design', text: 'Outputs are generated, but nobody knows what must be checked or approved.' },
          { title: 'No Ownership', text: 'Without clear ownership, the initiative becomes everybody’s idea and nobody’s responsibility.' }
        ],
        workedExample: {
          scenario: 'A team rolls out an AI tool broadly and sees little lasting use.',
          approach: 'A review reveals there were no shared workflows, no training on review standards, and no owner for the rollout.',
          result: 'The failure becomes understandable and fixable.',
          verification: 'The team confirms the diagnosis with actual user feedback rather than guessing at the reasons.'
        },
        artifact: { label: 'Failure Scan', title: 'Why this might fail', items: ['No use case', 'No review standard', 'No owner', 'No evidence of value'] },
        doThisNow: { task: 'Review one AI effort you have seen and note which failure pattern was present.', timebox: '6 minutes', steps: ['Choose the effort.', 'Apply the failure scan.', 'Write one fix you would add.'] },
        commonMistakes: ['Blaming the model alone.', 'Ignoring workflow design.', 'Calling adoption poor without asking why.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Use A Simple Transformation Sequence',
        subtitle: 'Discover, pilot, evaluate, and scale only what proves itself.',
        objective: 'Apply a lightweight sequence for moving from idea to tested AI workflow.',
        whyItMatters: 'A small sequence keeps teams from leaping straight from curiosity to broad rollout.',
        coreConcepts: [
          { title: 'Discover', text: 'Find the workflow and define the problem.' },
          { title: 'Pilot', text: 'Run a bounded test with a clear review path.' },
          { title: 'Scale Carefully', text: 'Expand only after the workflow shows evidence of value and manageable risk.' }
        ],
        workedExample: {
          scenario: 'A business unit wants to improve recurring report creation with AI.',
          approach: 'They discover the main friction, pilot one report workflow, and measure the result before sharing broadly.',
          result: 'The sequence produces evidence instead of hype.',
          verification: 'They use the pilot evidence, not enthusiasm, to decide whether to scale.'
        },
        artifact: { label: 'Sequence', title: 'Transformation steps', items: ['Discover', 'Pilot', 'Evaluate', 'Scale'] },
        doThisNow: { task: 'Map one AI opportunity onto the simple transformation sequence.', timebox: '7 minutes', steps: ['Write the workflow.', 'Define the pilot boundary.', 'Define the evaluation step.'] },
        commonMistakes: ['Skipping the pilot.', 'Scaling before learning.', 'Treating the sequence as a bureaucratic exercise instead of a risk-control tool.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Use Lightweight Governance',
        subtitle: 'Governance should clarify what people can do, not freeze the work.',
        objective: 'Define simple governance elements that keep AI use safe and practical.',
        whyItMatters: 'Overly heavy governance kills momentum, but no governance creates avoidable risk and mistrust.',
        coreConcepts: [
          { title: 'Clarify Approved Paths', text: 'People need to know which tools, data classes, and workflows are allowed.' },
          { title: 'Clarify Review And Escalation', text: 'The governance needs a clear answer to "who checks this?" and "who decides if this is okay?"' },
          { title: 'Clarify Ownership', text: 'Someone should own the workflow, the training, and the evidence collection.' }
        ],
        workedExample: {
          scenario: 'A team is interested in AI but avoids it because the rules feel unclear.',
          approach: 'A lead creates a simple approved-path guide with tool, data, review, and escalation rules.',
          result: 'People start using AI more confidently within the boundary.',
          verification: 'They check whether the guide answered the real questions users were asking.'
        },
        artifact: { label: 'Governance', title: 'Minimum governance set', items: ['Approved tools', 'Allowed data', 'Review rules', 'Escalation path', 'Owner'] },
        doThisNow: { task: 'Write the minimum governance notes needed for one AI workflow you want to support.', timebox: '8 minutes', steps: ['Name the tool.', 'Name the data rules.', 'Name the reviewer and escalation path.'] },
        commonMistakes: ['Creating policy with no workflow connection.', 'Forgetting escalation paths.', 'Making the rules so vague that nobody can use them.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Support The Human Change',
        subtitle: 'People need habits, examples, and confidence, not just access.',
        objective: 'Plan for the human side of AI-enabled workflow change.',
        whyItMatters: 'Adoption fails when teams treat AI as a tool installation instead of a workflow change.',
        coreConcepts: [
          { title: 'Change The Workflow, Not Just The Tool', text: 'People need to know how their daily work should change.' },
          { title: 'Provide Examples', text: 'Examples lower cognitive load and increase trust.' },
          { title: 'Normalize Review', text: 'The team should see review and correction as part of the process, not as failure.' }
        ],
        workedExample: {
          scenario: 'A rollout gives everyone access to AI but usage remains low.',
          approach: 'The team adds workflow examples, office hours, and a review checklist.',
          result: 'Usage improves because the change becomes concrete and supported.',
          verification: 'They ask whether people can now describe exactly when and how to use AI in one recurring task.'
        },
        artifact: { label: 'Support Plan', title: 'Human change supports', items: ['Example workflow', 'Training touchpoint', 'Review checklist', 'Feedback loop'] },
        doThisNow: { task: 'Choose one support element your team is currently missing for AI adoption.', timebox: '5 minutes', steps: ['Pick the workflow.', 'Name the missing support.', 'Write how you would add it this month.'] },
        commonMistakes: ['Confusing access with adoption.', 'Treating review as embarrassing.', 'Failing to show the changed workflow.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Write A 90-Day Action Plan',
        subtitle: 'A short plan helps move from intention to measured change.',
        objective: 'Create a 90-day plan for one AI workflow or team adoption effort.',
        whyItMatters: 'A 90-day horizon is long enough to learn something and short enough to stay concrete.',
        coreConcepts: [
          { title: 'Pick One Priority Workflow', text: 'Trying to transform everything at once creates noise.' },
          { title: 'Define Milestones', text: 'Discovery, pilot, review, and next-step decisions should all be visible.' },
          { title: 'Assign Evidence', text: 'Decide what examples or metrics will show progress. ' }
        ],
        workedExample: {
          scenario: 'A team wants to improve recurring internal reporting with AI.',
          approach: 'They build a 90-day plan covering design, pilot, evidence review, and team sharing.',
          result: 'The work becomes easier to coordinate and less likely to stall.',
          verification: 'They check whether each milestone names an owner and a specific output.'
        },
        artifact: { label: 'Plan', title: '90-day plan fields', items: ['Priority workflow', 'Milestones', 'Owner', 'Evidence', 'Review date'] },
        doThisNow: { task: 'Draft a 90-day plan for one AI initiative you can actually influence.', timebox: '10 minutes', steps: ['Choose the workflow.', 'Set three milestones.', 'Set the evidence and review date.'] },
        commonMistakes: ['Writing an initiative with no clear owner.', 'Trying to cover too many workflows.', 'Leaving evidence undefined.']
      }, { roleVariants: ROLE_SETS.enablement })
    ]
  },
  20: {
    title: 'Measuring AI Impact',
    phase: 5,
    summary: 'Move beyond anecdotes by measuring time saved, quality changes, and adoption outcomes on real workflows.',
    lessons: [
      lesson({
        title: 'Measure Work, Not Wonder',
        subtitle: 'The point of AI measurement is to understand workflow improvement, not to defend a trend.',
        objective: 'Define the kinds of impact that matter when evaluating AI-assisted workflows.',
        whyItMatters: 'Teams often say AI is valuable without showing where the value appears. Measurement sharpens priorities and trust.',
        coreConcepts: [
          { title: 'Focus On Workflow Outcomes', text: 'Time to final output, reduced rework, better coverage, and clearer communication are common outcomes.' },
          { title: 'Keep It Close To The Work', text: 'The most useful measures are attached to a specific workflow, not to AI use in general.' },
          { title: 'Pair Numbers With Examples', text: 'Quantitative signals are stronger when paired with before-and-after outputs. ' }
        ],
        workedExample: {
          scenario: 'A team claims AI saves time but cannot explain where.',
          approach: 'They measure one workflow: weekly status reporting.',
          result: 'The claim becomes concrete and discussable.',
          verification: 'They compare the measured workflow against the prior manual version rather than relying on memory.'
        },
        artifact: { label: 'Measure Set', title: 'Useful workflow measures', items: ['Time to final output', 'Review burden', 'Error rate', 'Throughput'] },
        doThisNow: { task: 'Pick one AI workflow and define two measures that would actually matter for it.', timebox: '6 minutes', steps: ['Choose the workflow.', 'Choose one speed measure.', 'Choose one quality or reliability measure.'] },
        commonMistakes: ['Measuring AI use in general.', 'Choosing metrics nobody can observe.', 'Using only a story with no evidence.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Use Simple ROI Thinking',
        subtitle: 'You often need only rough math to make a smarter decision.',
        objective: 'Estimate impact and cost without building an overly complex financial model.',
        whyItMatters: 'Simple ROI thinking helps prioritize workflows and communicate value credibly.',
        coreConcepts: [
          { title: 'Estimate Time Gain', text: 'How much time or rework could the workflow save per cycle?' },
          { title: 'Estimate Frequency', text: 'How often does the workflow happen?' },
          { title: 'Estimate Implementation Cost', text: 'Training, setup, review, and change management all affect the true payoff.' }
        ],
        workedExample: {
          scenario: 'A team debates whether a new AI-supported recap workflow is worth standardizing.',
          approach: 'They estimate minutes saved per meeting, meetings per month, and the setup/training effort.',
          result: 'The value conversation becomes more grounded.',
          verification: 'They sanity-check the assumptions after a short pilot rather than freezing the estimate forever.'
        },
        artifact: { label: 'ROI Lite', title: 'Rough ROI inputs', items: ['Time saved per cycle', 'Cycles per period', 'Setup and training cost', 'Review burden'] },
        doThisNow: { task: 'Run a rough ROI estimate for one AI workflow you use or want to use.', timebox: '8 minutes', steps: ['Estimate the current effort.', 'Estimate the likely gain.', 'Estimate the setup and review cost.'] },
        commonMistakes: ['Demanding exactness too early.', 'Ignoring setup cost.', 'Ignoring quality risks that erase the saved time.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Use Before-And-After Pilots',
        subtitle: 'Pilots become persuasive when they compare the old workflow to the new one on the same task.',
        objective: 'Design simple before-and-after pilots for AI workflows.',
        whyItMatters: 'Before-and-after evidence is easy for teams and leaders to understand, and it exposes tradeoffs better than abstract claims.',
        coreConcepts: [
          { title: 'Use Comparable Work', text: 'Compare similar cases or repeated cycles of the same workflow.' },
          { title: 'Capture Both Speed And Quality', text: 'A faster workflow is not a win if the review burden or error rate spikes.' },
          { title: 'Keep The Pilot Small', text: 'A handful of cycles is often enough to learn whether the workflow has promise.' }
        ],
        workedExample: {
          scenario: 'A team tests AI-assisted customer recap emails.',
          approach: 'They compare four manual recaps with four AI-assisted recaps using the same review standard.',
          result: 'The tradeoffs become visible quickly.',
          verification: 'They inspect both time saved and any mistakes caught in review.'
        },
        artifact: { label: 'Pilot', title: 'Before-and-after pilot sheet', items: ['Task', 'Old time', 'New time', 'Review issues', 'Final quality note'] },
        doThisNow: { task: 'Design a small before-and-after pilot for one workflow.', timebox: '8 minutes', steps: ['Choose the workflow.', 'Choose the comparable cases.', 'Choose the measures you will capture.'] },
        commonMistakes: ['Comparing unrelated tasks.', 'Measuring only speed.', 'Running a pilot with no consistent review standard.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Communicate Impact Upward',
        subtitle: 'Leaders usually want evidence tied to outcomes, risk, and scale.',
        objective: 'Present AI impact in language that decision-makers can act on.',
        whyItMatters: 'Good work gets ignored if the impact is communicated vaguely or without enough evidence.',
        coreConcepts: [
          { title: 'Lead With Workflow Outcome', text: 'Start with what improved and for whom.' },
          { title: 'Show The Evidence', text: 'Use short metrics plus concrete before-and-after examples.' },
          { title: 'State The Next Decision', text: 'Should the workflow continue, expand, or stop? The communication should support that choice.' }
        ],
        workedExample: {
          scenario: 'A team has positive pilot results but struggles to explain them to leadership.',
          approach: 'They present the workflow, the measured change, the risk controls, and the next step recommendation.',
          result: 'The conversation becomes easier to advance.',
          verification: 'They ensure every claim in the readout maps to collected pilot evidence.'
        },
        artifact: { label: 'Readout', title: 'Impact readout sections', items: ['Workflow', 'Evidence', 'Risk controls', 'Recommendation', 'Next step'] },
        doThisNow: { task: 'Draft a one-page impact readout for one AI workflow.', timebox: '9 minutes', steps: ['Lead with the workflow outcome.', 'Add the evidence.', 'Add the decision you want.'] },
        commonMistakes: ['Leading with excitement instead of evidence.', 'Skipping the risk controls.', 'Presenting impact without a next decision.']
      }, { roleVariants: ROLE_SETS.enablement }),
      lesson({
        title: 'Build A Small Measurement System',
        subtitle: 'Measurement works best when it is easy to maintain.',
        objective: 'Create a lightweight recurring measurement habit for AI workflows.',
        whyItMatters: 'If measurement is too heavy, it disappears. If it is too vague, it never helps decisions.',
        coreConcepts: [
          { title: 'Choose A Small Set Of Workflows', text: 'Measure the workflows that matter most rather than everything.' },
          { title: 'Use Simple Templates', text: 'A recurring pilot sheet or evidence log keeps collection manageable.' },
          { title: 'Review On A Rhythm', text: 'A monthly or quarterly review is often enough to make better decisions.' }
        ],
        workedExample: {
          scenario: 'A team keeps losing impact evidence because every pilot is tracked differently.',
          approach: 'They adopt one template and a monthly review habit.',
          result: 'Comparisons become easier and evidence accumulates.',
          verification: 'They check that the template still captures the most decision-useful data after a few cycles.'
        },
        artifact: { label: 'System', title: 'Measurement system basics', items: ['Workflow list', 'Common template', 'Review cadence', 'Owner'] },
        doThisNow: { task: 'Design a lightweight measurement system for your top one to three AI workflows.', timebox: '10 minutes', steps: ['List the workflows.', 'Choose the shared template.', 'Set the review owner and cadence.'] },
        commonMistakes: ['Trying to measure everything.', 'Changing templates constantly.', 'Collecting evidence but never reviewing it.']
      }, { roleVariants: ROLE_SETS.enablement })
    ]
  },
  21: {
    title: 'Staying Current Without Noise',
    phase: 5,
    summary: 'Build a sustainable learning system so you can keep improving your AI practice without drowning in tool news and hype.',
    lessons: [
      lesson({
        title: 'The Signal-To-Noise Problem',
        subtitle: 'Most AI news is not useful for your job this week.',
        objective: 'Filter AI information based on whether it changes your real workflows, not just your curiosity.',
        whyItMatters: 'Without a filter, AI news becomes a distraction engine. With a filter, it becomes a source of selective improvement.',
        coreConcepts: [
          { title: 'Most News Is Optional', text: 'Only a small portion of releases will change how you work in the near term.' },
          { title: 'Track Workflow Relevance', text: 'Ask whether the update affects a task you do often, a tool you already use, or a policy boundary you care about.' },
          { title: 'Prefer Durable Learning', text: 'Capabilities, workflow patterns, and review habits matter longer than feature launches.' }
        ],
        workedExample: {
          scenario: 'A business IC feels pressure to follow every AI announcement.',
          approach: 'They filter updates by current stack relevance and workflow impact.',
          result: 'They spend less time consuming news and more time improving real use cases.',
          verification: 'They review which updates actually changed a workflow over the past month.'
        },
        artifact: { label: 'Filter', title: 'News filter questions', items: ['Does this affect my current stack?', 'Does this change a real workflow?', 'Do I need to act now?'] },
        doThisNow: { task: 'Apply the noise filter to the last three AI updates you noticed.', timebox: '5 minutes', steps: ['List the updates.', 'Answer the filter questions.', 'Ignore at least one that does not matter.'] },
        commonMistakes: ['Following every announcement.', 'Confusing novelty with usefulness.', 'Letting reading replace practice.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true }),
      lesson({
        title: 'Build A Small AI Radar',
        subtitle: 'You need a few trusted sources, not a firehose.',
        objective: 'Create a simple information system for staying current on AI tools and workflows.',
        whyItMatters: 'A small radar helps you notice meaningful change without spending your week in newsletters and feeds.',
        coreConcepts: [
          { title: 'Track Tool Sources', text: 'Follow the official update channels for the tools you already use.' },
          { title: 'Track Practical Interpreters', text: 'A few practitioners who translate updates into workflow impact are more useful than a large feed of opinions.' },
          { title: 'Track Your Own Experiments', text: 'Your most valuable source is still your own record of what worked on real tasks.' }
        ],
        workedExample: {
          scenario: 'A team member follows dozens of AI accounts but cannot remember what was useful.',
          approach: 'They reduce the list to tool updates, two practical sources, and an experiment log.',
          result: 'Their learning becomes more focused and actionable.',
          verification: 'After a few weeks, they review whether the sources actually led to useful workflow changes.'
        },
        artifact: { label: 'Radar', title: 'Three-part radar', items: ['Official tool updates', 'Practical workflow interpreters', 'Your experiment log'] },
        doThisNow: { task: 'Choose the small set of sources that will make up your AI radar.', timebox: '8 minutes', steps: ['List the tools you use.', 'Choose one or two practical sources.', 'Create a place to record experiments.'] },
        commonMistakes: ['Following too many sources.', 'Mixing entertainment with learning.', 'Not capturing what you tested yourself.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true }),
      lesson({
        title: 'Use A Weekly Learning Habit',
        subtitle: 'A small recurring routine beats occasional bursts of enthusiasm.',
        objective: 'Adopt a simple weekly rhythm for reading, testing, and reflecting.',
        whyItMatters: 'Steady experimentation on real work is what turns AI from curiosity into professional capability.',
        coreConcepts: [
          { title: 'Scan Briefly', text: 'Spend a small amount of time noticing meaningful updates.' },
          { title: 'Test One Thing', text: 'Apply one workflow idea or prompt improvement to real work every week.' },
          { title: 'Log What Changed', text: 'A short note on what worked or failed builds a personal evidence base.' }
        ],
        workedExample: {
          scenario: 'A product manager wants to improve AI use without adding another side project.',
          approach: 'They create a weekly 30-minute rhythm: scan, test, and log.',
          result: 'Improvement becomes sustainable.',
          verification: 'They review the log after a month to see which experiments actually improved their work.'
        },
        artifact: { label: 'Routine', title: 'Weekly learning rhythm', items: ['10 minutes scan', '15 minutes test', '5 minutes log'] },
        doThisNow: { task: 'Put a weekly AI learning block on your calendar and define what you will do in it.', timebox: '6 minutes', steps: ['Choose the day.', 'Choose the routine.', 'Create a place to log what you learn.'] },
        commonMistakes: ['Waiting for free time.', 'Reading without testing.', 'Testing without logging the result.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true }),
      lesson({
        title: 'Evaluate New Tools Without FOMO',
        subtitle: 'Curiosity is good; reactive switching is expensive.',
        objective: 'Use a disciplined approach to deciding when a new tool deserves your attention.',
        whyItMatters: 'A deliberate evaluation habit keeps your stack stable while still leaving room for meaningful improvement.',
        coreConcepts: [
          { title: 'Tie Every Evaluation To A Task', text: 'If you cannot name the recurring task, you probably do not need the tool yet.' },
          { title: 'Use A Time Box', text: 'A short, structured evaluation prevents endless research and low-grade distraction.' },
          { title: 'Keep A Watch List', text: 'Interesting tools can wait until they prove themselves or become relevant.' }
        ],
        workedExample: {
          scenario: 'An analyst keeps bookmarking new AI tools but never uses them well.',
          approach: 'They evaluate only when a tool maps to a recurring task and can be tested in a short session.',
          result: 'Their stack gets calmer and more effective.',
          verification: 'They review whether the tool improved a real workflow enough to justify the change.'
        },
        artifact: { label: 'Rule', title: 'Evaluate only when', items: ['A recurring task exists', 'A short test is possible', 'The switching cost is acceptable'] },
        doThisNow: { task: 'Pick one new AI tool you are curious about and decide whether it belongs on a watch list or in a test plan.', timebox: '5 minutes', steps: ['Name the task it would improve.', 'Estimate the switching cost.', 'Choose watch or test.'] },
        commonMistakes: ['Testing tools with no workflow need.', 'Confusing curiosity with urgency.', 'Keeping too many simultaneous experiments active.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true }),
      lesson({
        title: 'Build Your Personal Learning System',
        subtitle: 'The goal is not to know everything. It is to keep improving what matters to your work.',
        objective: 'Create a sustainable personal system for AI learning and application.',
        whyItMatters: 'Your advantage comes from applied practice on your own work, not from memorizing the most updates.',
        coreConcepts: [
          { title: 'Keep The System Small', text: 'A small set of sources, a weekly practice rhythm, and an experiment log are enough.' },
          { title: 'Tie Learning To Work', text: 'The best experiments improve tasks you already own.' },
          { title: 'Review Periodically', text: 'A monthly or quarterly review helps you keep what works and drop what does not.' }
        ],
        workedExample: {
          scenario: 'A business IC wants to stay current without treating AI as a second job.',
          approach: 'They build a small system based on one routine, one experiment log, and quarterly review of their stack and workflows.',
          result: 'Learning becomes sustainable and useful.',
          verification: 'They check whether the system led to real workflow improvements, not just more reading.'
        },
        artifact: { label: 'System', title: 'Personal AI learning system', items: ['Small radar', 'Weekly experiment rhythm', 'Experiment log', 'Quarterly review'] },
        doThisNow: { task: 'Write your one-page personal AI learning system.', timebox: '10 minutes', steps: ['List your sources.', 'Set the weekly rhythm.', 'Define the review cadence.'] },
        commonMistakes: ['Trying to know everything.', 'Building a complex system you will not maintain.', 'Separating learning from daily work.']
      }, { roleVariants: ROLE_SETS.enablement, toolSpecific: true })
    ]
  }
};

var COURSE_META = {
  1: { outcomes: ['Build a durable AI mental model.', 'Learn how to review output instead of trusting fluency.'], nextModuleBridge: 'Next, turn that mental model into better tool choices so you stop forcing one product to do every job.' },
  2: { outcomes: ['Choose tools by workflow fit.', 'Keep a smaller, more stable AI stack.'], nextModuleBridge: 'Next, use the right tool choices to write sharper prompts and reusable workflows.' },
  3: { outcomes: ['Write clearer prompts for real work.', 'Turn successful prompts into reusable patterns.'], nextModuleBridge: 'Next, apply those prompting skills with stronger safety, privacy, and verification habits.' },
  4: { outcomes: ['Use AI with better data judgment.', 'Add lightweight verification to daily work.'], nextModuleBridge: 'Next, move from foundations into daily productivity workflows where AI can save immediate time.' },
  5: { outcomes: ['Draft and revise business writing faster.', 'Adapt messages for audience and tone.'], nextModuleBridge: 'Next, use the same discipline on research and synthesis, where source handling matters even more.' },
  6: { outcomes: ['Summarize and synthesize source material better.', 'Turn research into action-oriented output.'], nextModuleBridge: 'Next, level up prompting for more complex and multi-step work.' },
  7: { outcomes: ['Decompose larger problems into better prompt workflows.', 'Use examples, structure, and chaining more deliberately.'], nextModuleBridge: 'Next, bring those techniques into meetings, notes, and follow-up work.' },
  8: { outcomes: ['Prepare for meetings faster.', 'Create clearer recaps and follow-through.'], nextModuleBridge: 'Next, apply the same workflow thinking to documentation and SOP creation.' },
  9: { outcomes: ['Draft SOPs and FAQs from real inputs.', 'Use documentation to improve process clarity.'], nextModuleBridge: 'Next, carry those documentation habits into planning, coordination, and project work.' },
  10: { outcomes: ['Use AI as a project planning and reporting co-pilot.', 'Surface assumptions, risks, and status faster.'], nextModuleBridge: 'Next, use AI for data interpretation and business analysis without losing rigor.' },
  11: { outcomes: ['Frame data questions more clearly.', 'Turn analysis into decision-ready communication.'], nextModuleBridge: 'Next, use AI to support higher-level choices, tradeoffs, and strategic reasoning.' },
  12: { outcomes: ['Structure options and tradeoffs better.', 'Use AI to challenge assumptions before decisions are made.'], nextModuleBridge: 'Next, apply that same structured thinking to vendors, contracts, and stakeholder work.' },
  13: { outcomes: ['Prepare for vendor evaluation more systematically.', 'Tailor stakeholder messaging without changing the facts.'], nextModuleBridge: 'Next, step into advanced workflows where AI starts acting across multiple steps, tools, and contexts.' },
  14: { outcomes: ['Understand what makes agentic workflows different.', 'Design safer oversight for more autonomous systems.'], nextModuleBridge: 'Next, look at the AI features already inside your existing tools so advanced workflows stay grounded in real work.' },
  15: { outcomes: ['Choose when embedded AI beats a separate tool.', 'Build lower-friction daily AI patterns.'], nextModuleBridge: 'Next, package the workflows that work into reusable playbooks for yourself and your team.' },
  16: { outcomes: ['Turn good prompts into reusable playbooks.', 'Capture inputs, review rules, and examples that others can follow.'], nextModuleBridge: 'Next, move from personal effectiveness into practical team adoption.' },
  17: { outcomes: ['Teach AI through workflows, not hype.', 'Support adoption with examples, boundaries, and evidence.'], nextModuleBridge: 'Next, look for the best opportunities to apply AI more broadly across work.' },
  18: { outcomes: ['Find high-value AI opportunities in real work.', 'Sort tasks into automate, augment, or avoid.'], nextModuleBridge: 'Next, support those opportunities with clear ownership, change habits, and governance.' },
  19: { outcomes: ['Use lightweight governance that people can actually follow.', 'Support human workflow change, not just tool rollout.'], nextModuleBridge: 'Next, measure what changed so AI improvement becomes credible, not anecdotal.' },
  20: { outcomes: ['Measure workflow impact more clearly.', 'Communicate AI value with stronger evidence.'], nextModuleBridge: 'Next, end the core program by building a sustainable system for staying current without drowning in noise.' },
  21: { outcomes: ['Build a small, durable AI learning system.', 'Stay current through practice rather than hype consumption.'], nextModuleBridge: 'If you want to go further, the bonus section on OpenClaw and other agents explores more autonomous tools and how to evaluate them safely.' }
};

Object.keys(COURSE_META).forEach(function (key) {
  COURSES[key].outcomes = COURSE_META[key].outcomes;
  COURSES[key].nextModuleBridge = COURSE_META[key].nextModuleBridge;
});

var BONUS_SECTIONS = {
  agents: {
    title: 'Agents In Practice',
    label: 'Bonus Section',
    summary: 'A practical endcap on OpenClaw and other agents: what they do, where they help, where they add risk, and how to evaluate them without hype.',
    outcomes: [
      'Understand what agent-style tools change compared with a normal assistant.',
      'Use OpenClaw as one concrete example inside a broader agent landscape.',
      'Evaluate agents by oversight, tool reach, review burden, and reliability.'
    ],
    lessons: [
      lesson({
        title: 'What This Class Of Agent Tools Does',
        subtitle: 'Agents orchestrate steps, tools, and follow-through instead of only answering one request.',
        useWhen: 'Use this when you need to understand what changes when an AI tool moves from chat responses into multi-step execution.',
        estimatedMinutes: 7,
        objective: 'Distinguish a normal assistant interaction from a more agentic workflow that plans, uses tools, and keeps going.',
        whyItMatters: 'The practical question is not whether agents are impressive. It is whether the added autonomy meaningfully improves a workflow you actually care about.',
        coreConcepts: [
          { title: 'Multi-Step Execution', text: 'Agent-style systems can continue through several steps, gather inputs, and update outputs without needing a fresh prompt every time.' },
          { title: 'Tool Reach', text: 'The real shift comes from tool access: files, inboxes, calendars, task systems, browsers, terminals, or other connected systems.' },
          { title: 'Oversight Still Matters', text: 'More autonomy increases the importance of checkpoints, review rules, and clear stop conditions.' }
        ],
        workedExample: {
          scenario: 'A normal assistant can draft a meeting recap, while an agentic workflow could also send a draft message, update tasks, and create a reminder.',
          approach: 'The difference is not magic. It is workflow orchestration plus tool access.',
          result: 'You start evaluating agents based on sequence, review cost, and reliability rather than novelty.',
          verification: 'For each step, ask what would happen if it ran with the wrong assumption and whether the workflow has a safe checkpoint.'
        },
        artifact: { label: 'Checklist', title: 'Agent workflow lens', items: ['What steps does it handle?', 'What tools can it access?', 'Where does a human still review?'] },
        doThisNow: { task: 'Pick one recurring task and write the difference between a chat-only version and an agent-style version.', timebox: '7 minutes', steps: ['List the steps.', 'Mark where tool access matters.', 'Mark where you would require review.'] },
        commonMistakes: ['Calling every automation an agent.', 'Focusing on model quality while ignoring tool access.', 'Skipping oversight design.']
      }, { roleVariants: ROLE_SETS.enablement, sourceNotes: ['Reviewed against OpenClaw positioning as a personal AI assistant that can take actions through connected tools and chat interfaces.', 'Keep claims general and review product-specific capabilities regularly.'], lastReviewed: 'March 2026' }),
      lesson({
        title: 'OpenClaw In Context',
        subtitle: 'Use OpenClaw as a concrete example of a more agent-style personal assistant without treating it as the whole category.',
        useWhen: 'Use this when you want one concrete reference point for what a more action-oriented personal assistant can look like.',
        estimatedMinutes: 8,
        objective: 'Understand how OpenClaw fits into the broader landscape of agent-style tools and assistants.',
        whyItMatters: 'OpenClaw is useful as a reference because it emphasizes doing things through connected tools and chat interfaces, but the right lesson is how to evaluate the pattern, not how to memorize one product.',
        coreConcepts: [
          { title: 'Personal Assistant Framing', text: 'OpenClaw presents itself as a personal AI assistant rather than only a chat bot, emphasizing actions, memory, and connected workflows.' },
          { title: 'One Example, Not The Whole Market', text: 'Use it as one example of a system that blends memory, communication channels, and tool execution.' },
          { title: 'Review Product Claims Carefully', text: 'Agent tools evolve fast. Treat feature lists as moving examples and focus on the underlying evaluation criteria.' }
        ],
        workedExample: {
          scenario: 'A learner hears about OpenClaw and assumes all agents work the same way.',
          approach: 'They instead ask what kind of workflows it supports, what tools it can reach, and what review burden it creates.',
          result: 'The conversation moves from hype to evaluation.',
          verification: 'Before adopting or recommending any agent tool, confirm the current capabilities, approval path, and risk controls for your environment.'
        },
        artifact: { label: 'Evaluation', title: 'Questions to ask about OpenClaw', items: ['What work would it actually improve?', 'What systems would it touch?', 'What would need human approval first?'] },
        doThisNow: { task: 'Write a short evaluation note on OpenClaw as if you were deciding whether it is relevant to your work.', timebox: '8 minutes', steps: ['Name one use case.', 'Name the tool access required.', 'Name the review boundary.'] },
        commonMistakes: ['Treating one product as the whole category.', 'Trusting social proof over workflow fit.', 'Adopting based on excitement rather than task relevance.']
      }, { roleVariants: ROLE_SETS.enablement, sourceNotes: ['OpenClaw official site describes it as a personal AI assistant focused on doing things through chat and connected tools.', 'Do not hard-code fast-changing feature claims without a review date.'], lastReviewed: 'March 2026' }),
      lesson({
        title: 'How OpenClaw Compares With Other Agents',
        subtitle: 'Compare agents by workflow shape, tool reach, and supervision model rather than by marketing language.',
        useWhen: 'Use this when you are comparing OpenClaw with other agent tools, coding agents, or workflow automation systems.',
        estimatedMinutes: 8,
        objective: 'Build a practical comparison lens for OpenClaw and other agents.',
        whyItMatters: 'Agent tools differ most in where they live, what they can touch, how much they remember, and how much supervision they require.',
        coreConcepts: [
          { title: 'Where The Agent Lives', text: 'Some agents live inside a chat interface, some in developer tools, and some inside workflow platforms or business apps.' },
          { title: 'What The Agent Can Touch', text: 'Tool access determines both usefulness and risk. The more systems an agent can use, the more valuable and risky it becomes.' },
          { title: 'How The Agent Is Supervised', text: 'The key comparison is not only raw capability. It is whether the workflow exposes enough checkpoints, traceability, and recovery options.' }
        ],
        workedExample: {
          scenario: 'A team compares OpenClaw, a coding-focused agent, and a workflow automation bot.',
          approach: 'They compare where each tool lives, what systems it touches, and how review happens.',
          result: 'The team chooses based on workflow fit rather than brand excitement.',
          verification: 'They test each option on one real workflow and compare review effort, not just output quality.'
        },
        artifact: { label: 'Matrix', title: 'Agent comparison criteria', items: ['Interface and home base', 'Tool access', 'Memory', 'Oversight model', 'Review burden'] },
        doThisNow: { task: 'Compare two agent tools or agent patterns using the matrix.', timebox: '8 minutes', steps: ['Choose a real workflow.', 'Score tool reach and oversight.', 'Decide which option has the safer path to value.'] },
        commonMistakes: ['Comparing by hype alone.', 'Ignoring where the agent lives.', 'Skipping the review burden in comparisons.']
      }, { roleVariants: ROLE_SETS.enablement, sourceNotes: ['Use OpenClaw as one comparison point, not a canonical standard for all agent systems.', 'Keep the comparison framework durable so it still works when product details shift.'], lastReviewed: 'March 2026' }),
      lesson({
        title: 'When To Use An Agent Versus A Normal Assistant',
        subtitle: 'Choose agentic tools when orchestration and follow-through matter more than one good answer.',
        useWhen: 'Use this when you are deciding whether a task really needs an agent or just a better prompt and a better workflow.',
        estimatedMinutes: 7,
        objective: 'Decide when an agentic tool is appropriate and when a normal assistant is the better choice.',
        whyItMatters: 'Many tasks do not need an agent. The wrong level of autonomy adds risk, setup cost, and complexity without improving the work.',
        coreConcepts: [
          { title: 'Use A Normal Assistant For Bounded Thinking', text: 'Drafting, summarizing, outlining, and one-step analysis often do not need tool orchestration.' },
          { title: 'Use An Agent For Repeatable Multi-Step Work', text: 'Agentic workflows make more sense when several steps, tools, or follow-up actions happen together.' },
          { title: 'Start With The Simplest Useful Mode', text: 'If a normal assistant plus a short checklist solves the problem, do not add more autonomy yet.' }
        ],
        workedExample: {
          scenario: 'A manager considers using an agent for weekly status summaries.',
          approach: 'They compare a normal assistant plus manual review against an agent that gathers inputs and prepares the draft automatically.',
          result: 'The team chooses based on where the real friction lies.',
          verification: 'They check whether the automated version truly reduces manual work without hiding errors until later.'
        },
        artifact: { label: 'Decision Rule', title: 'Agent or assistant?', items: ['Is the work multi-step?', 'Does tool access matter?', 'Would added autonomy reduce real friction?', 'Can I review it safely?'] },
        doThisNow: { task: 'Evaluate one workflow and decide whether it deserves a normal assistant or an agent-style tool.', timebox: '7 minutes', steps: ['List the current steps.', 'Mark where tool access helps.', 'Choose the simplest useful mode.'] },
        commonMistakes: ['Using agents for simple drafting work.', 'Assuming more autonomy equals more value.', 'Adding complexity before proving the need.']
      }, { roleVariants: ROLE_SETS.enablement, lastReviewed: 'March 2026' }),
      lesson({
        title: 'Practical Evaluation Checklist',
        subtitle: 'Judge agents by reliability, supervision, and operational fit.',
        useWhen: 'Use this when you are piloting or recommending any agent tool, including OpenClaw.',
        estimatedMinutes: 8,
        objective: 'Use a practical checklist to decide whether an agent is safe and worthwhile for your environment.',
        whyItMatters: 'The right evaluation questions prevent agent adoption from becoming a mix of hype, vague hope, and hidden risk.',
        coreConcepts: [
          { title: 'Reliability', text: 'Does the agent complete the workflow consistently enough to be useful?' },
          { title: 'Oversight', text: 'Can you see what it did, stop it, and recover when it goes wrong?' },
          { title: 'Operational Fit', text: 'Does it fit your approved tools, data boundaries, and the kind of work you actually do?' }
        ],
        workedExample: {
          scenario: 'A team wants to try an agent that can manage inbox and calendar workflows.',
          approach: 'They run the checklist on tool access, approval, review, traceability, and error recovery.',
          result: 'The pilot scope becomes safer and more realistic.',
          verification: 'They reject workflows where tool access and risk controls are mismatched, even if the demo looked impressive.'
        },
        artifact: { label: 'Checklist', title: 'Agent evaluation checklist', items: ['What can it access?', 'How does review happen?', 'What breaks if it is wrong?', 'How do I recover?', 'Is this approved for my environment?'] },
        doThisNow: { task: 'Run the evaluation checklist on one agent you are considering.', timebox: '8 minutes', steps: ['List the systems it touches.', 'List the review points.', 'Write one reason to pilot and one reason to wait.'] },
        commonMistakes: ['Ignoring recovery paths.', 'Testing with too much access too early.', 'Letting demos substitute for evaluation.']
      }, { roleVariants: ROLE_SETS.enablement, lastReviewed: 'March 2026' }),
      lesson({
        title: 'Safe First Experiments',
        subtitle: 'Start with bounded workflows, visible review, and low-consequence outputs.',
        useWhen: 'Use this when you want to test OpenClaw or another agent safely for the first time.',
        estimatedMinutes: 7,
        objective: 'Design a safe first experiment with an agent-style tool.',
        whyItMatters: 'The first experiment should produce evidence, not exposure. A narrow pilot teaches you more than a dramatic but risky rollout.',
        coreConcepts: [
          { title: 'Choose A Bounded Task', text: 'Good first tests include recurring summaries, internal follow-up drafts, or low-risk personal workflows.' },
          { title: 'Limit Access', text: 'Start with the minimum systems and permissions needed to learn something useful.' },
          { title: 'Review Every Output', text: 'Early experiments should make human review explicit and unavoidable.' }
        ],
        workedExample: {
          scenario: 'A user wants to try OpenClaw for personal scheduling and lightweight internal follow-up.',
          approach: 'They start with one bounded workflow, limited access, and manual approval before any outbound action.',
          result: 'They learn where the tool helps without overcommitting or overexposing sensitive systems.',
          verification: 'After a few runs, they review where the agent helped, where it drifted, and what access should still remain off-limits.'
        },
        artifact: { label: 'Pilot Plan', title: 'Safe first experiment', items: ['One bounded workflow', 'Minimum tool access', 'Required manual approval', 'Short review window'] },
        doThisNow: { task: 'Write a one-page first experiment for an agent-style tool.', timebox: '7 minutes', steps: ['Choose the workflow.', 'Limit the access.', 'Define the review and stop rule.'] },
        commonMistakes: ['Starting with a high-consequence workflow.', 'Granting broad access before learning.', 'Skipping review because the task feels small.']
      }, { roleVariants: ROLE_SETS.enablement, lastReviewed: 'March 2026' })
    ]
  }
};
