export const meta = {
  name: 'fix-review-regressions',
  description: 'Fix tsgo compile regressions introduced by the review-fix pass, per file, against exact diagnostics',
  phases: [{ title: 'Fix' }],
}

const items = Array.isArray(args) ? args : JSON.parse(args)

const RULES = `
PROJECT: @adriangaro/dnd5e-types v2 — declarations-only (.d.mts) for FoundryVTT dnd5e v6 on fvtt-types. Runtime authority: _research/dnd5e/module/.
These errors were introduced when members were ADDED to match the dnd5e runtime. Your job: make them COMPILE while keeping the intent. Do NOT delete a member just to silence an error if it can be made compatible.

ERROR PLAYBOOK:
- TS2416 "Property X not assignable to same property in base type" → an override's signature is WIDER than the base (return type too loose, or params). Fix by NARROWING the override to be assignable to the base: match the base's parameter and return types. For lifecycle/internal methods (_initializeSource, _preCreate, prepareData, getEmbeddedDocument, getBarAttribute, toEmbed, toggleStatusEffect, rollInitiative, initialize) the cleanest fix is usually to REMOVE the redundant override entirely (the inherited base signature already covers it and the override added only loose \`object\`/\`unknown\` types that conflict) UNLESS the override adds a genuinely needed dnd5e-specific return — then narrow it to be a subtype of the base return.
- TS2417 "Class static side incorrectly extends base class static side" → a static member added on a subclass conflicts with the parent's static of the same name (often a static factory/metadata returning a narrower/wider type). Fix by aligning the static's type with the parent's, or removing the conflicting static if it merely restated the parent.
- TS2430 "Interface incorrectly extends interface" → an interface member conflicts with the base; use \`interface X extends Omit<Base, "key"> { key: NewType }\` or align the member type.
- TS2314/2707 "Generic type requires N type argument(s)" → a referenced generic was given the wrong arg count (e.g. SchemaField, ObjectField.Options, CompendiumCollection, DataField.Options). Supply the correct number of args, or use the project's \`.Any\`/default-arg alias.
- TS2694 "Namespace has no exported member" → the referenced nested type doesn't exist (e.g. ObjectField.Options). Use the correct existing type (search the runtime/types for the right name) or a reachable equivalent.
- TS4113 "member cannot have an 'override' modifier because it is not declared in the base class" → the member genuinely is NOT on the base (the pass mis-marked it). REMOVE the \`override\` keyword (keep the member — it's a new addition).
- TS1243 "'override' modifier cannot be used with 'declare' modifier" → remove the \`override\` keyword (keep \`declare\`), or drop \`declare\` if the surrounding members don't use it. Match the file's existing style.
- TS2320 "Interface cannot simultaneously extend types A and B" → a RenderContext interface extends the parent AND a second shape with a conflicting key. Use \`interface RenderContext extends Omit<Parent.RenderContext<Document>, "key">, Partial<Other> { key: ... }\` to drop the conflict, or inline the non-conflicting members.
- TS2304 "Cannot find name 'DeepPartial'" / TS2552 "Cannot find name 'AnyObject'" → these are fvtt-types utilities exposed under the global \`fvttUtils\` namespace. Replace bare \`DeepPartial<X>\`→\`fvttUtils.DeepPartial<X>\`, \`AnyObject\`→\`fvttUtils.AnyObject\` (verify the exact member exists; grep other src files for the established qualified form).
- TS2307 "Cannot find module './x.mjs'" → wrong relative path or extension. Find the real file under src/ and correct the relative path (use .mjs for the sibling .d.mts).
- TS2344 custom-element base "does not satisfy constraint '{ new (): HTMLElement }'" → a customElements.define/mixin call got an abstract/typed element constructor where a concrete HTMLElement constructor is expected. Match the established pattern other component files in src/module/applications/components/ use for the same base (grep for how AbstractFormInputElement-based elements are typed there); cast/alias to the concrete form they use.

Keep clean+expandable conventions intact. Touch ONLY the target file.`

const fixPrompt = (it) => `${RULES}

TARGET: src/${it.file}
RUNTIME counterpart: _research/dnd5e/module/${it.file.replace(/^module\//,'').replace(/^documents\//,'documents/')} (best-effort; data models live under module/data, documents under documents/).

EXACT tsgo DIAGNOSTICS to clear in this file:
${it.errors.map(e => '  ' + e).join('\n')}

Read the file, read the cited base/runtime as needed, and fix EACH diagnostic per the playbook. After editing, re-check your reasoning that each override is now assignable to its base. Final message = one line: fixed N (brief how).`

const results = await pipeline(
  items,
  (it) => agent(fixPrompt(it), { label: it.file, phase: 'Fix', model: 'sonnet' })
            .then(msg => ({ f: it.file, ok: true, msg: String(msg).slice(0, 200) }))
            .catch(e => ({ f: it.file, ok: false, err: String(e).slice(0, 200) })),
)
const failed = results.filter(r => r && !r.ok)
log(`processed ${results.filter(r=>r&&r.ok).length}/${items.length}; failed ${failed.length}`)
return { fixed: results.filter(r=>r&&r.ok).map(r=>`${r.f}: ${r.msg}`), failed }
