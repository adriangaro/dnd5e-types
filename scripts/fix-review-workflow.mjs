export const meta = {
  name: 'fix-review-findings',
  description: 'Apply the high+medium review findings to each .d.mts file, preserving clean+expandable patterns',
  phases: [{ title: 'Fix' }],
}

const files = Array.isArray(args) ? args : (typeof args === 'string' ? JSON.parse(args) : [])

const RULES = `
PROJECT: @adriangaro/dnd5e-types v2 — declarations-only (.d.mts) types for FoundryVTT dnd5e v6, layered on fvtt-types, expandable via declaration merging. Runtime source of truth: _research/dnd5e/module/.

KNOWN-GOOD CONVENTIONS — keep/produce these, do NOT regress them:
- Instance types: dnd5e.types.Activity.Instance, dnd5e.types.Advancement.Instance; globalThis.Actor.Implementation / Item.Implementation / ChatMessage.Implementation. NEVER create a dnd5e.types.<DocName> namespace.
- App pattern: class generic over open namespace interfaces (RenderContext/Configuration/RenderOptions), interface Any / interface AnyConstructor (fvttUtils.Identity<typeof X<any,...>>), export default; composition via 'interface extends'. Mixins are applied as REAL mixins in heritage: 'extends Mixin(Base)<...>' (type-args on outermost call; thread a Document param as the first arg). Do NOT model a mixin as 'interface extends X.Members'.
- When a child RenderContext must override an inherited field with an INCOMPATIBLE shape, use 'interface RenderContext extends Omit<Parent.RenderContext<Document>, "key"> { key: NewType }'. This compiles (no TS2312) and stays open.
- Strictness mandate: domain ids get real key-unions (e.g. dnd5e.types.X.TypeKey), never bare string, when the union exists & is reachable. Field options stay faithful to the runtime constructor.
- _gen/*.d.mts files are now HAND-MANAGED (the JSDoc generator is retired) — edit them directly like any other file.
- FormSelectOption = foundry.applications.fields.FormSelectOption. Prepared-field descriptor = dnd5e.applications.api.FieldsConfig.
`

const fixPrompt = (f) => `${RULES}

TASK: Apply the verified HIGH+MEDIUM review findings to ONE declaration file. Edit in place. Touch ONLY this file.

TARGET: src/${f}
RUNTIME (authority for shapes/signatures): find the counterpart under _research/dnd5e/module/ (src/module/<x>→module/<x>; src/documents/<x>→documents/<x>; src/_gen & src/types & src/funnel may have no runtime counterpart).
FINDINGS: read reviews/fix-targets-HM.json (JSON keyed by file path) and take the array at key "${f}". Each entry: { severity, axis, member, detail, fix, note }.

Steps:
1. Read the findings for "${f}", the TARGET file, and the runtime counterpart (confirm each fix against runtime before applying).
2. Apply EACH finding's \`fix\` faithfully:
   - coverage → add the missing export/class/getter/method/static with the runtime signature.
   - correctness → correct the type/signature/optionality to match runtime.
   - fidelity → tighten to the cited named type / key-union ONLY if it plainly exists & is reachable; else skip that one.
   - seam → add the missing namespace/Any/AnyConstructor/generic param / open interface.
   - shortcut → replace the loose/placeholder type with the precise one; REMOVE phantom members and dead imports/comments the finding calls out.
3. Respect the conventions above. If a fix would clearly not compile or needs a type that cannot be resolved to something real, SKIP it (note which).

Final message = one line: applied N / skipped M (with brief reasons for skips).`

const results = await pipeline(
  files,
  (f) => agent(fixPrompt(f), { label: f, phase: 'Fix', model: 'sonnet' })
           .then(msg => ({ f, ok: true, msg: String(msg).slice(0, 240) }))
           .catch(e => ({ f, ok: false, err: String(e).slice(0, 200) })),
)

const failed = results.filter(r => r && !r.ok)
log(`processed ${results.filter(r => r && r.ok).length}/${files.length}; failed ${failed.length}`)
return { applied: results.filter(r => r && r.ok).map(r => `${r.f}: ${r.msg}`), failed }
