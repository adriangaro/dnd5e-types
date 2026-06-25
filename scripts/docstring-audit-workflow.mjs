export const meta = {
  name: 'docstring-comment-audit',
  description: 'Audit each .d.mts vs its dnd5e runtime counterpart: docstring fidelity + spurious conversion comments',
  phases: [{ title: 'Audit', detail: 'one agent per file compares comments to runtime' }],
}

let files = Array.isArray(args) ? args : (args ? JSON.parse(args) : null)

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    file: { type: 'string' },
    runtimeCounterpart: { type: ['string', 'null'], description: 'path under _research/dnd5e/module that this file mirrors, or null if none' },
    noRuntimeCounterpart: { type: 'boolean' },
    docstringIssues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          member: { type: 'string', description: 'the member/symbol the doc belongs to (e.g. "getRollData", "Schema.save.dc")' },
          kind: { type: 'string', enum: ['missing', 'altered', 'fabricated'] },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          runtimeDoc: { type: 'string', description: 'the runtime JSDoc text (trimmed), or "" if none' },
          ourDoc: { type: 'string', description: 'our comment text, or "" if none' },
          detail: { type: 'string', description: 'what is wrong and the suggested fix' },
        },
        required: ['member', 'kind', 'severity', 'runtimeDoc', 'ourDoc', 'detail'],
      },
    },
    spuriousComments: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          line: { type: ['number', 'null'] },
          text: { type: 'string', description: 'the offending comment text' },
          reason: { type: 'string', description: 'why it is conversion noise and should be removed' },
        },
        required: ['line', 'text', 'reason'],
      },
    },
    summary: { type: 'string' },
  },
  required: ['file', 'noRuntimeCounterpart', 'docstringIssues', 'spuriousComments', 'summary'],
}

function prompt(f) {
  return `You are auditing ONE TypeScript declaration file in a FoundryVTT dnd5e types package for DOCUMENTATION FIDELITY against the dnd5e runtime. This is a READ-ONLY audit — do NOT edit any file; only report findings.

TARGET FILE: src/${f}

STEP 1 — LOCATE THE RUNTIME COUNTERPART under _research/dnd5e/module/. The src tree mirrors the runtime tree:
- src/module/<path>/X.d.mts        → _research/dnd5e/module/<path>/X.mjs
- src/documents/<path>/X.d.mts     → _research/dnd5e/module/documents/<path>/X.mjs
- a co-located _types.d.mts         → the sibling _types.mjs (JSDoc @typedef/@property/@callback blocks)
- src/module/_types.d.mts           → _research/dnd5e/module/_types.mjs
Hyphen/camelCase may differ (active-effect ↔ activeEffect is only a path nuance; the runtime uses hyphens). Use Glob/Grep to find it if the direct path misses. If there is genuinely NO runtime counterpart (pure types-infrastructure: src/types/*, src/funnel/*, src/module/_api/*, src/module/config/_stubs.d.mts, src/module/config/_core-funnels.d.mts, src/index.d.mts), set noRuntimeCounterpart=true and runtimeCounterpart=null, and ONLY do STEP 3.

STEP 2 — DOCSTRING FIDELITY (member-level). For each documented member in the RUNTIME file (methods, getters, setters, properties, and for _types.mjs files each @typedef/@property/@callback), check our file carries the SAME documentation:
- kind "missing": runtime has a meaningful doc comment but our corresponding member has no doc (or only a bare restatement). Report it with the runtime text so it can be ported.
- kind "altered": our doc exists but its MEANING diverges from runtime (wrong description, dropped caveat, changed semantics). Pure trimming/reformatting that preserves meaning is NOT an issue — do not report it.
- kind "fabricated": our doc asserts something about runtime behavior that is FALSE or not supported by the runtime.
Severity: high = wrong/misleading or a load-bearing method left undocumented; medium = useful runtime doc dropped; low = minor wording drift. Do NOT nitpick faithful condensations. The goal: "are the dnd5e doc comments copied over properly?"

IMPORTANT — what is NOT a docstring issue:
- File-level header block comments are TYPES-AUTHORED design docs (expandability seams, mixin heritage, why a field is pinned). They are legitimate and intentional — never flag them as missing/altered just because they aren't in the runtime.
- Type-design rationale comments (e.g. "// breaks the item-contains-item cycle", "// persisted:false", "// overrides base effects via MergeSchemas last-wins", "// pinned to string to avoid circular resolution") are VALUABLE and must be KEPT.

STEP 3 — SPURIOUS / USELESS COMMENTS (the conversion-noise sweep). Report comments that were added during the .mjs→.d.mts conversion and add NO value, so they can be removed. Examples of SPURIOUS:
- conversion/process artifacts: "// applied fix", "// TODO from conversion", "// added by review", "// override removed", "// see finding", "// ported", leftover scaffolding or commented-out code.
- comments that merely RESTATE the TypeScript type or member name with no extra information ("// returns a string", "// the name property", "// constructor").
- redundant duplicate comments.
Do NOT flag (KEEP): genuine dnd5e doc comments, file-header design docs, and type-design rationale (see STEP 2). When in doubt, KEEP — only flag clear noise.

Return ONLY the structured object. Keep runtimeDoc/ourDoc snippets short (one line). If the file is clean, return empty arrays with a one-line summary.`
}

if (!files) {
  const disc = await agent(
    'Run `find src -name "*.d.mts"` and return every match as a path RELATIVE to src/ (strip the leading "src/"), e.g. "module/data/activity/save-data.d.mts". Return all of them.',
    { label: 'discover-files', phase: 'Audit', effort: 'low',
      schema: { type: 'object', additionalProperties: false, properties: { files: { type: 'array', items: { type: 'string' } } }, required: ['files'] } },
  )
  files = disc.files
  log(`discovered ${files.length} .d.mts files`)
}

const results = await pipeline(
  files,
  f => agent(prompt(f), { label: f, phase: 'Audit', model: 'sonnet', effort: 'low', schema: SCHEMA }),
)

const ok = results.filter(Boolean)
const withIssues = ok.filter(r => (r.docstringIssues?.length || 0) + (r.spuriousComments?.length || 0) > 0)
const docCount = ok.reduce((n, r) => n + (r.docstringIssues?.length || 0), 0)
const spurCount = ok.reduce((n, r) => n + (r.spuriousComments?.length || 0), 0)
const noCounterpart = ok.filter(r => r.noRuntimeCounterpart).map(r => r.file)

log(`audited ${ok.length}/${files.length}; ${withIssues.length} files have findings; ${docCount} docstring issues, ${spurCount} spurious comments`)

return {
  auditedCount: ok.length,
  totalFiles: files.length,
  docstringIssueCount: docCount,
  spuriousCommentCount: spurCount,
  filesWithNoCounterpart: noCounterpart,
  findings: withIssues,
}
