export const meta = {
  name: 'repo-type-review',
  description: 'Per-file find→verify review of dnd5e-types declarations vs runtime: coverage, correctness, fidelity, seams, shortcuts',
  phases: [{ title: 'Find' }, { title: 'Verify' }],
}

const files = Array.isArray(args) ? args : (typeof args === 'string' ? JSON.parse(args) : [])

const RULES = `
PROJECT CONTEXT — @adriangaro/dnd5e-types v2: a DECLARATIONS-ONLY (.d.mts) type package for FoundryVTT dnd5e v6, layered on foundry-vtt-types (fvtt-types), EXPANDABLE via declaration merging. Runtime source of truth = the dnd5e .mjs files under _research/dnd5e/module/.

PATH MAPPING (src → runtime): src/module/<x> → _research/dnd5e/module/<x>; src/documents/<x> → _research/dnd5e/module/documents/<x>. If the direct path misses, search by basename under _research/dnd5e/module/. Files under src/types/, src/funnel/, src/_api/ are TYPE-INFRA with NO runtime counterpart — for those, skip coverage/correctness and judge only fidelity/seam/shortcut. Files under src/_gen/ are GENERATED from JSDoc (expect 'unknown /* TODO */' markers — each such marker IS a fidelity shortcut to report).

REVIEW AXES (classify every finding by one):
- coverage: a runtime export / class / method / getter / static / overload that is ABSENT from the .d.mts.
- correctness: a typed member whose type or signature does NOT match the runtime shape (wrong param/return, wrong key union, wrong optionality).
- fidelity: a member typed as bare 'string'/'number'/'object'/'any'/'unknown'/'Record<string, any>' where a REAL named type or key-union demonstrably exists in this repo (the project's STRICTNESS MANDATE: domain values get real key unions, never bare string). Only report if the precise type plainly exists and is reachable.
- seam: a MISSING or broken expandability seam — class not generic where subclassing needs it, missing 'declare namespace' with 'interface Any'/'interface AnyConstructor', missing open RenderContext/Schema/Config interface, a type alias used where an open interface is needed for declaration-merging.
- shortcut: a HACK or corner cut — a mixin modeled as 'interface extends X.Members' instead of a real mixin call in heritage; a generic constrained 'extends object' where the foundry base's own constraint should be used; placeholder/loose types with '// loose pending' / 'TODO' / 'FIXME' comments; '@ts-ignore'/'@ts-expect-error'; a base member intentionally dropped/omitted "to avoid conflict"; 'any' used to silence an error.

KNOWN-GOOD CONVENTIONS (do NOT flag these as problems):
- Instance types: dnd5e.types.Activity.Instance, dnd5e.types.Advancement.Instance; globalThis.Actor.Implementation / Item.Implementation / ChatMessage.Implementation. NEVER a dnd5e.types.<DocName> namespace.
- The clean app pattern: class generic over open namespace interfaces (RenderContext/Configuration/RenderOptions), 'interface Any'/'AnyConstructor', 'export default'; composition via 'interface extends'. A child RenderContext overriding an incompatible inherited field via 'extends Omit<Parent.RenderContext<Document>, "key">' is CORRECT (not a shortcut).
- RenderContext generic constraint 'extends object' is CORRECT for dnd5e-owned bases (Application5e/DocumentSheet5e) that accept object; it is a SHORTCUT only when extending a FOUNDRY base directly that has its own RenderContext constraint.
- A member typed 'object'/'any' is acceptable (NOT a fidelity finding) when the runtime genuinely produces an untyped/dynamic shape with no existing named type to reach for. Be conservative: only report fidelity when the better type clearly exists.
`

const FIND_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    file: { type: 'string' },
    hasRuntimeCounterpart: { type: 'boolean' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          axis: { type: 'string', enum: ['coverage', 'correctness', 'fidelity', 'seam', 'shortcut'] },
          member: { type: 'string', description: 'symbol/member name or "<file>" for file-level' },
          detail: { type: 'string', description: 'what is wrong, citing runtime file:line where relevant' },
          fix: { type: 'string', description: 'concrete one-line fix' },
        },
        required: ['severity', 'axis', 'member', 'detail', 'fix'],
      },
    },
  },
  required: ['file', 'hasRuntimeCounterpart', 'findings'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    file: { type: 'string' },
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          member: { type: 'string' },
          axis: { type: 'string' },
          real: { type: 'boolean', description: 'true only if confirmed a genuine issue against the runtime, not a deliberate convention' },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          fix: { type: 'string' },
          note: { type: 'string' },
        },
        required: ['member', 'axis', 'real', 'severity', 'fix', 'note'],
      },
    },
  },
  required: ['file', 'verdicts'],
}

const findPrompt = (f) => `${RULES}

TASK: Review ONE declaration file for gaps/issues. Do NOT edit anything — REPORT only.

TARGET: src/${f}

Steps:
1. Read src/${f}.
2. Locate its runtime counterpart per the PATH MAPPING and read it (set hasRuntimeCounterpart accordingly).
3. Diff them across the five AXES. Be thorough but PRECISE — every finding must be real and actionable, each with a concrete one-line fix. Prefer fewer high-confidence findings over many speculative ones.
4. Use the project conventions above to avoid false positives.

Return the structured FIND result for "${f}".`

const verifyPrompt = (f, findings) => `${RULES}

TASK: Adversarially VERIFY review findings for src/${f}. For EACH finding decide if it is a GENUINE issue against the runtime (real=true) or a false positive / deliberate convention (real=false). Re-read src/${f} and its runtime counterpart to confirm. Default to real=false when uncertain or when the finding contradicts a KNOWN-GOOD CONVENTION. Adjust severity if the finder over/under-rated it. Keep the fix only if real.

FINDINGS TO VERIFY (JSON):
${JSON.stringify(findings)}

Return the structured VERDICT result for "${f}".`

const results = await pipeline(
  files,
  (f) => agent(findPrompt(f), { label: `find:${f}`, phase: 'Find', schema: FIND_SCHEMA, model: 'sonnet' })
           .then(r => ({ f, r }))
           .catch(() => ({ f, r: null })),
  ({ f, r }) => {
    if (!r || !r.findings || r.findings.length === 0) return { file: f, verdicts: [] }
    const toVerify = r.findings.filter(x => x.severity === 'high' || x.severity === 'medium')
    if (toVerify.length === 0) {
      // keep low findings as unverified (real=true, low confidence) so they surface
      return { file: f, verdicts: r.findings.map(x => ({ member: x.member, axis: x.axis, real: true, severity: x.severity, fix: x.fix, note: 'low — unverified' })) }
    }
    return agent(verifyPrompt(f, r.findings), { label: `verify:${f}`, phase: 'Verify', schema: VERDICT_SCHEMA, model: 'sonnet' })
             .catch(() => ({ file: f, verdicts: toVerify.map(x => ({ member: x.member, axis: x.axis, real: true, severity: x.severity, fix: x.fix, note: 'verify failed — unverified' })) }))
  },
)

const confirmed = []
for (const v of results) {
  if (!v || !v.verdicts) continue
  for (const d of v.verdicts) if (d.real) confirmed.push({ file: v.file, ...d })
}
const bySev = { high: [], medium: [], low: [] }
for (const c of confirmed) (bySev[c.severity] || bySev.low).push(c)
log(`reviewed ${files.length} files; confirmed ${confirmed.length} (high ${bySev.high.length} / medium ${bySev.medium.length} / low ${bySev.low.length})`)

return { reviewed: files.length, counts: { high: bySev.high.length, medium: bySev.medium.length, low: bySev.low.length }, high: bySev.high, medium: bySev.medium, low: bySev.low }
