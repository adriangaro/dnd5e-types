export const meta = {
  name: 'fix-docstring-audit',
  description: 'Apply docstring-audit findings per file: port runtime JSDoc, fix surfaced type bugs, remove spurious comments',
  phases: [{ title: 'Fix', detail: 'one agent per file applies its docstring-audit findings' }],
}

const files = Array.isArray(args) ? args : JSON.parse(args)

const RULES = `CONVENTIONS (do not regress the build):
- These are ambient .d.mts declaration files. Use FULLY-QUALIFIED names: globalThis.Actor/Item/ChatMessage(.Implementation/.SubType), foundry.*, dnd5e.* , dnd5e.types.* . fvtt-types globals must be qualified: fvttUtils.DeepPartial / InexactPartial / AnyObject / AnyMutableObject / Identity.
- Co-located _types.d.mts files declare \`declare global { namespace dnd5e.types.<path> }\` (the former defs namespace, now collapsed — NO ".defs.").
- Do NOT change public type signatures EXCEPT where a finding explicitly says the type is wrong (then fix the type to match the runtime exactly). Keep edits minimal and faithful to the runtime.
- KEEP file-header design docs and type-design rationale comments (cycle-break, seam, "pinned to string", "MIXES onto a model", etc.). Only remove the EXACT spurious comments listed.`

function prompt(f) {
  return `Apply the verified DOCSTRING-AUDIT findings to ONE TypeScript declaration file, using the dnd5e runtime as the source of truth.

TARGET FILE: src/${f}

FINDINGS: read reviews/fix-targets-DOCS.json (JSON keyed by file path) and take the object at key "${f}". It has:
- runtimeCounterpart: the runtime .mjs path under _research/dnd5e/module/ (read it — it is the authority for doc text and types).
- docstringIssues: array of { member, kind, severity, runtimeDoc, ourDoc, detail }.
- spuriousComments: array of { line, text, reason }.

APPLY each docstringIssue:
- kind "missing": the member exists but lacks the runtime's doc → add a JSDoc comment carrying the runtime's documentation (faithful wording, incl. meaningful @param/@returns/@throws/@abstract). IF the finding's detail says the MEMBER ITSELF is absent from our file, ADD the member with the correct signature derived from the runtime (params/return types faithful, qualified per conventions) plus its doc.
- kind "altered": our doc's meaning diverged → rewrite it to match the runtime meaning. IF the finding indicates our TYPE is wrong (not just prose), FIX THE TYPE to match the runtime exactly (e.g. a return type, a field's value type, primitive-vs-constructor).
- kind "fabricated": our doc/type asserts something the runtime does not support → remove the false claim, or correct it to the runtime. IF a fabricated PROPERTY/key was added that is not in the runtime typedef, REMOVE it (verify against the runtime _types.mjs / the object literal).

REMOVE each spuriousComment: delete exactly that comment (match by its text). Do not touch any other comment.

${RULES}

Open src/${f}, read its runtimeCounterpart, apply every finding, and save with the Edit/Write tools. Verify the file still parses (balanced braces, valid TS). Reply with: "applied <n> / skipped <m>" and one line per skip explaining why (e.g. runtime member is private/@inheritDoc-only with no portable text, or the finding is stale).`
}

const results = await pipeline(
  files,
  f => agent(prompt(f), { label: f, phase: 'Fix', model: 'sonnet' }),
)

const applied = results.map((r, i) => r == null ? `NULL (unprocessed): ${files[i]}` : `${files[i]}: ${String(r).split('\n')[0]}`)
const failed = results.map((r, i) => r == null ? files[i] : null).filter(Boolean)
log(`processed ${results.filter(Boolean).length}/${files.length}; ${failed.length} null`)
return { applied, failed }
