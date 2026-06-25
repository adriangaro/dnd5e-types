# dnd5e-types v2 — PLAN.md

> Status: **ACCEPTED architecture, ready to build.** This plan distills the accepted Architecture Decision Document and the analysis reports under `/home/roadd/Workspace/dnd5e-types-v2/_research/analysis/`. It is the implementation contract for the package.

---

## 1. Overview & Goals

`dnd5e-types` v2 is a **hand-authored, declarations-only** TypeScript package that types the **dnd5e v6.0.0** game system running on **FoundryVTT v14**, layered on top of **`foundry-vtt-types` (`main` branch, v14-parity)**.

### Primary goals

1. **Correct, dual-shape data models.** Every system data model is typed with two distinct read shapes — **Source** (`_source`, stored JSON) and **Initialized + Derived** (`actor.system`, post-`prepareDerivedData`) — using fvtt-types' native `TypeDataModel<Schema, Parent, BaseData, DerivedData>` generics.
2. **First-class expandability (the headline feature).** Downstream Foundry modules must add skills, abilities, damage types, actor/item subtypes, and **per-subtype schema fields** purely via TypeScript declaration merging, with **zero forking** and **zero deep-path imports**. See the Expandability Contract (§4).
3. **Strict, self-compiling, no-emit.** Full `strict`, `skipLibCheck:false`, `noEmit:true`. The package type-checks itself green under both `tsgo` (fast) and `tsc` (canonical gate).
4. **Clean consumer ergonomics.** A single root export (`dnd5e-types`) added to `compilerOptions.types`; no consumer ever names a deep file path (fixing a wart of the prior package).
5. **Maintainability against a fast-moving system.** A 1:1 shadow tree + sparse-checkout + diff-checklist workflow so each dnd5e release can be diffed and re-synced mechanically.

### Non-goals

- No runtime code, no JS emit, no `.ts` files (declarations only, `.d.mts`).
- No type inference from `defineSchema()` (fvtt-types cannot infer this; schemas are **hand-synced** — fvtt-types itself warns at `data.d.mts:116`).
- Not a 100% surface clone on day one: we ship the **priority** domains first (character/actor, skills, abilities, damage types, global config) and expand outward.

### Prior art

The previous attempt — `adriangaro/dnd5e-types` 5.0.x, vendored at `/home/roadd/Workspace/dnd5e-types-v2/_research/old-dnd5e-types/` — **proved every mechanism works** on fvtt-types `main`. v2's job is to (a) modernize to v6/v14, (b) switch derived data to native `TypeDataModel` generics (dropping the old 4th-SchemaField-generic `InitializedType` hack), (c) unify the expandability idiom under **one name set** and **one funnel-per-concern**, and (d) keep type-instantiation depth in check.

---

## 2. Constraints

| Constraint | Detail | Source of truth |
|---|---|---|
| **dnd5e v6.0.0** | Target system version. Includes v6-new item subtype `facility`. Migration scoped via a regenerated `5.0.4 → 6.0.0` diff checklist. | `_research/dnd5e/` source tree; `old-dnd5e-types/dnd5e_diff_checklist_*.md` |
| **Foundry VTT v14** | Engine version dnd5e v6 runs on. | dnd5e `system.json` |
| **fvtt-types `main`** | v14-parity. We merge into its config interfaces (`DataModelConfig`, `DocumentClassConfig`, `FlagConfig`, `SettingConfig`, `SystemNameConfig`) and the global `interface CONFIG`. Pinned as a `peerDependency`. | `fvtt-types/configuration` module; `fvtt-types/src/foundry/client/config.d.mts:211` |
| **TypeScript toolchain** | `tsgo` (`@typescript/native-preview`, pre-release `7.0.0-dev.*`) for the inner loop; **`tsc` 6.x is the canonical gate**. Pin the exact native-preview build fvtt-types pins. | `analysis/tooling-tsgo-build.md` |
| **Strictness floor** | Full `strict` incl. `noImplicitAny`/`noImplicitThis` (the old package wrongly disabled these), `skipLibCheck:false`, `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `moduleResolution:"Bundler"`. | `analysis/tooling-tsgo-build.md`; fvtt-types base tsconfig |
| **Schemas hand-synced** | No inference. Schema interfaces are manually kept in lockstep with `defineSchema()` via the diff workflow. | `data.d.mts:116` warning |
| **Loose runtime validation** | dnd5e/Foundry accept arbitrary strings for many enum-keyed fields at runtime → typed fields must accept `Allowed | (string & {})`, not strict unions. | `RestrictedStringField` (§4.2) |

---

## 3. Architecture Summary (distilled decision)

### 3.1 Guiding principles

1. **fvtt-types owns the engine; we own a `dnd5e.types` façade.** Every merge into `fvtt-types/configuration` or the global `CONFIG` happens in exactly **one funnel file per concern**. Per-domain files merge only into our own `dnd5e.types.*` interfaces. Downstream modules touch `dnd5e.types.*` and never `fvtt-types/configuration`. (The postmortem's "crown jewel" — kept verbatim.)
2. **Two shapes per data model, always: Source vs Initialized+Derived,** via native `TypeDataModel<Schema, Parent, BaseData, DerivedData>`. We **reject** the old 4th-generic `InitializedType` override hack — it loses `_source`/read separation and the `prepareBaseData`/`prepareDerivedData` `this`-staging.
3. **One expandability idiom, one name set.** Every open-ended dnd5e enum uses exactly one pattern with one fixed set of inner names: `DefaultTypes` / `OverrideTypes` / `Types` / `TypeKey` / `Config`. No `DefaultSkillTypes` vs `DefaultAbilityTypes` drift.
4. **Strict, self-compiling, no emit.**
5. **Schema interfaces are hand-synced to `defineSchema()`** via the shadow-file + sparse-checkout + diff-checklist workflow.

### 3.2 Layout in one sentence

A **1:1 `.d.mts` shadow of the dnd5e source tree**, declarations-only, with a single root barrel (`src/index.d.mts`) that side-effect-imports every submodule, a small set of **funnel files** (one per fvtt-types concern), and the dnd5e `.mjs` source colocated **at author time only** (sparse-checkout, gitignored, stripped from publish) so `typeof CharacterData` references resolve to sibling `.d.mts`.

### 3.3 The four expansion seams (see §4 for full contract)

| Seam | What downstream extends | Mechanism |
|---|---|---|
| **A** — keyed config records | skills, abilities, damage types, ~30 records | merge `OverrideTypes` in the domain namespace |
| **B** — schema-field bridge | wiring `TypeKey` unions into actual fields | `RestrictedStringField<TypeKey>` |
| **C** — subtype registration | new Actor/Item (etc.) subtypes | merge `dnd5e.types.DataModelConfig.Actor` |
| **D** — per-subtype schema injection | add SOURCE / DERIVED fields to an existing subtype | merge `OverrideSchema` / `OverrideDerived` |

### 3.4 The four hardest parts and how they're tamed

| # | Black magic | Risk | Tame |
|---|---|---|---|
| 1 | `MergeSchemas` deep-merge + mixin engine | "instantiation excessively deep" at ~350 files | Make `MergeSchemas` **shallow** (mirrors runtime `mergeSchema` = `Object.assign`); recurse only where nested SchemaFields are re-declared; CI depth budget; **re-derive** the mixin engine, don't copy it |
| 2 | Source vs Derived split (`persisted:false`, nullable→number, class instances) | `_source`/`system` mismatch | native `BaseData`/`DerivedData` generics; omit `persisted:false` from Schema, add to DerivedData; type-only imports for `HitDice`/`Proficiency`; model **per-subtype** (Vehicle ≠ creature) |
| 3 | Open-record `TypeKey` purity | `Record<string,…>` base of `OverrideTypes` leaks `string` into unions | `ExtractKeys` + `fvttUtils.RemoveIndexSignatures`; `expectType` regression tests per domain |
| 4 | Activities/advancements pseudo-documents | custom `ActivityCollection`, `MappingField.initialize()`→Collection, schema-generic `BaseActivityData` with `Omit`-based field removal | schema-generic `BaseActivityData<Type, Schema>`; type `ActivityField`/`AdvancementDataField` so `_source` is plain object and `InitializedType` is the resolved union member; two distinct registries (lowercase activity / PascalCase advancement) |

---

## 4. Expandability Contract for Downstream Modules

This is the package's public promise. There are **four seams**, each with a fixed, documented idiom. All examples are copy-pasteable by a downstream module author.

### 4.1 Seam A — Add a value to a keyed config record (skills/abilities/damage types/…)

Every open-ended record exposes the **same five names** in its `dnd5e.types.<Domain>` namespace: `DefaultTypes`, `OverrideTypes`, `Types`, `TypeKey`, `Config`. The kernel utilities (`types/expandable.d.mts`):

```ts
declare global { namespace dnd5e.types {
  type ExtractKeys<_T extends object, T = fvttUtils.RemoveIndexSignatures<_T>> =
    { [K in keyof T]: [T[K]] extends [never] ? never : K }[keyof T];

  type MergeOverrideDefinition<
    D extends object, O extends object,
    Ret = fvttUtils.SimpleMerge<fvttUtils.RemoveIndexSignatures<D>, fvttUtils.RemoveIndexSignatures<O>>
  > = { [K in ExtractKeys<Ret>]: Ret[K] };
}}
```

Domain shape (skills shown; every record is identical in shape):

```ts
declare global { namespace dnd5e.types {
  namespace Skill {
    interface DefaultTypes { acr: true; ani: true; arc: true; /* … */ sur: true; }
    interface OverrideTypes extends Record<string, boolean | never> {}   // ← downstream merge point
    type Types   = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
    type TypeKey = dnd5e.types.ExtractKeys<Types>;
    interface Config {
      label: string;                       // ALWAYS string (i18n key pre-init, localized text post-init)
      ability: dnd5e.types.Ability.TypeKey; // cross-domain ref
      fullKey: string; reference?: string; icon?: string;
    }
  }
  interface DND5EConfig {
    skills: { [K in dnd5e.types.Skill.TypeKey]: dnd5e.types.Skill.Config };
  }
}}
```

**Downstream usage — add a skill in ONE line:**

```ts
declare global { namespace dnd5e.types.Skill { interface OverrideTypes { lor: true } } }
```

That single merge widens `CONFIG.DND5E.skills`, every `MappingField` keyed by `Skill.TypeKey`, and every `RestrictedStringField<Skill.TypeKey>` automatically.

**Records covered (≈30, priority order):** `abilities, skills, damageTypes, healingTypes, itemProperties, spellSchools, creatureTypes, conditionTypes, currencies, movementTypes, actorSizes, senses, tools, weaponMasteries, armorClasses, consumableTypes, featureTypes, activityTypes, advancementTypes, individualTargetTypes, areaTargetTypes, restTypes, spellPreparationStates, traits, languages, habitats, treasure, ruleTypes, characterFlags`.

**Rules:** label/abbreviation/reference/fullKey are **always `string`**. `noUncheckedIndexedAccess` is ON → `CONFIG.DND5E.skills[id]` is `Config | undefined`. Runtime-deleted keys (`abilities.hon`/`san`) stay in `DefaultTypes`; consumers read defensively. Frozen/Proxy records (`travelPace`, `attackModes`, `SPELL_LISTS`, `toolIds`, `scalarTimePeriods`) type fine for reading; `OverrideTypes` expansion is type-only — modules targeting them for **runtime** mutation are documented as unsupported.

### 4.2 Seam B — Wire a key union into a real field: `RestrictedStringField`

`RestrictedStringField<Allowed>` is a `StringField` whose initialized type is `Allowed | (string & {})` — autocompletes known keys, still accepts arbitrary strings (matching Foundry's loose validation). It bridges Seam-A `TypeKey` unions into actual schema fields, e.g. `SetField<RestrictedStringField<Skill.TypeKey>>`. A `.Strict` opt-in variant exists for the rare strict-key field. Downstream modules don't extend this directly — they extend the `TypeKey` (Seam A) and this widens transitively.

### 4.3 Seam C — Register a new Actor/Item subtype

Two-layer indirection. Per-subtype files merge our local `dnd5e.types.DataModelConfig.Actor`; **one funnel** bridges to fvtt-types.

```ts
// per subtype (next to its class), e.g. module/data/actor/character.d.mts
declare global { namespace dnd5e.types.DataModelConfig {
  interface Actor { character: typeof CharacterData }
}}

// funnel/data-model-config.d.mts — THE single bridge (one merge per document)
declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    Actor: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.Actor>;
    Item:  fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.Item>;
  }
}
```

**Downstream usage — register a custom actor subtype:**

```ts
declare global { namespace dnd5e.types.DataModelConfig {
  interface Actor { "my-module.minion": typeof MyMinionData }
}}
```

(A Foundry **module** subtype can alternatively merge `fvtt-types/configuration` directly with a `"my-module.custom"` key.) The package covers all six WithSystem documents dnd5e registers: **ActiveEffect, Actor, ChatMessage, Item, JournalEntryPage, RegionBehavior**. ActiveEffect/RegionBehavior are typed **additively** (dnd5e registers via `Object.assign` onto core) so core subtypes are never clobbered.

### 4.4 Seam D — Inject schema/derived fields into an existing subtype

The finest-grained seam: add fields to an existing subtype **without subclassing**. Each subtype exposes two empty mergeable interfaces, folded into the schema and derived shape respectively.

```ts
// module/data/actor/character.d.mts
declare global { namespace dnd5e.types.DataModelConfig {
  namespace Actor.character {
    interface OverrideSchema  extends foundry.data.fields.DataSchema {} // adds SOURCE fields
    interface OverrideDerived {}                                         // adds DERIVED-only props
  }
}}
```

**Downstream usage — add a persisted field + a derived field to character:**

```ts
declare global { namespace dnd5e.types.DataModelConfig.Actor.character {
  interface OverrideSchema  { heroPoints: foundry.data.fields.NumberField }
  interface OverrideDerived { heroPointsPct: number }
}}
```

`never` on a key in `OverrideSchema` **deletes** a base field (via shallow `MergeSchemas` semantics). This gives downstream modules a real per-subtype schema-extension point at **both** the source and derived layers — a major selling point.

### 4.5 Consumer ergonomics (read-side guarantees)

With `compilerOptions.types: ["fvtt-types", "dnd5e-types"]` (order matters — fvtt-types first), consumers get, with zero extra wiring:

```ts
type CharacterActor = Actor.OfType<"character">;
const a: CharacterActor = /* … */;
a.system.abilities.str.mod;          // number          (DERIVED)
a.system._source.attributes.hp.max;  // number | null   (SOURCE, nullable)
a.system.attributes.hp.pct;          // number          (DERIVED)
if (a.type === "character") a.system.bastion.name; // narrowed by discriminant
```

`Actor.OfType` / `Actor.Known` / `.type` guards / `OverrideTypes` / `OverrideSchema` are the documented public extension API (README, carried forward from the old package which was excellent here).

---

## 5. Package Layout

```
dnd5e-types/
  src/
    index.d.mts                      # ROOT BARREL: side-effect-imports every submodule so all merges register
    funnel/
      data-model-config.d.mts        # THE single fvtt-types DataModelConfig funnel (Actor + Item + …)
      document-class-config.d.mts    # THE single DocumentClassConfig / ConfiguredActor/Item funnel
      config-global.d.mts            # THE single `declare global { interface CONFIG { DND5E: … } }`
      flag-config.d.mts              # THE single FlagConfig funnel
      setting-config.d.mts           # THE single SettingConfig + SystemNameConfig funnel
    types/
      expandable.d.mts               # ExtractKeys, MergeOverrideDefinition, ExpandableEnum
      merge-schema.d.mts             # shallow MergeSchemas, RemoveIndexSignatures re-exports
      fields.d.mts                   # RestrictedStringField + custom dnd5e field shims
    module/
      config.d.mts                   # dnd5e.types.DND5EConfig assembled across per-domain files
      data/
        abstract/
          system-data-model.d.mts    # SystemDataModel + mixin() type, ActorDataModel, ItemDataModel
        actor/
          _module.d.mts              # merges all actor subtypes into dnd5e.types.DataModelConfig.Actor
          character.d.mts            # CharacterData + OverrideSchema/OverrideDerived
          npc.d.mts vehicle.d.mts group.d.mts encounter.d.mts
          templates/
            common.d.mts creature.d.mts group.d.mts
            attributes.d.mts details.d.mts traits.d.mts   # static field-bundle FRAGMENTS
        item/
          _module.d.mts
          weapon.d.mts spell.d.mts class.d.mts … facility.d.mts   # 13 subtypes (incl. v6 facility)
        activity/   base-activity.d.mts attack.d.mts damage.d.mts …
        advancement/ base-advancement.d.mts item-grant.d.mts …
        fields/     simple-trait-field.d.mts damage-trait-field.d.mts ac-formulas-field.d.mts …
      documents/
        actor.d.mts item.d.mts …     # Actor5e<SubType>, Item5e<SubType> + flags
  scripts/
    setup-dnd5e-source.sh  cleanup-dnd5e-source.sh  generate-diff.sh
  tsconfig.base.json  tsconfig.json  package.json
```

**Rationale:** every `.d.mts` sits next to its `.mjs`, imports siblings by relative `.mjs` path, and TS resolves to the declaration. The tree stays structurally identical to upstream — the only realistic way to track a fast-moving system via the diff checklist.

**`.d.mts` only.** Classes are `declare class`, never defined. The one known gotcha: `declare class X extends TypeDataModel<…>` can trip a protected-member inheritance error, fixed by adding `override _initialize(): void;` on each subclass (per fvtt-types regression `type-data.test-d.ts:49-53`). Every system data model class includes that line.

---

## 6. Build / Tooling

### 6.1 Decision

Pure hand-authored `.d.mts`, `noEmit` everywhere. **tsgo = fast default checker; tsc 6.x = canonical publish/CI gate** (mirrors fvtt-types, whose `typecheck` script is literally `tsgo`).

```jsonc
// package.json
{
  "name": "dnd5e-types",
  "type": "module",
  "exports": { ".": { "types": "./src/index.d.mts" } },
  "files": ["src", "tsconfig.base.json", "tsconfig.json"],
  "scripts": {
    "typecheck": "tsgo",            // fast inner loop
    "typecheck:tsc": "tsc",         // CI / publish gate (canonical)
    "dnd5e:setup": "bash scripts/setup-dnd5e-source.sh",
    "dnd5e:cleanup": "bash scripts/cleanup-dnd5e-source.sh",
    "dnd5e:diff": "bash scripts/generate-diff.sh"
  },
  "peerDependencies": { "fvtt-types": "*" },
  "peerDependenciesMeta": {
    "typescript": { "optional": true },
    "@typescript/native-preview": { "optional": true }
  }
}
```

### 6.2 tsconfig

Copy fvtt-types' strict base: `moduleResolution:"Bundler"`, `allowImportingTsExtensions`, `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`, `allowJs`+`checkJs` (for the colocated `.mjs`), `noEmit`, `skipLibCheck:false`, full `strict` incl. `noImplicitAny`/`noImplicitThis`, `types: []` (control ambient globals explicitly).

### 6.3 Source colocation workflow

`scripts/setup-dnd5e-source.sh` sparse-checks-out the dnd5e `.mjs` source into the shadow tree at author time (needed for `typeof CharacterData` refs; requires `allowJs`). It is **gitignored** and excluded from publish via `files`. `generate-diff.sh` produces the per-release diff checklist. The published artifact is **declarations-only**.

### 6.4 Why tsgo is safe / its risk

Its one real gap — declaration emit / `--build` — is irrelevant (we never emit; we only ask "does this type-check?"). Risk: tsgo is pre-release (`7.0.0-dev.*`) and diagnostics differ slightly from tsc, so a tsgo pass ≠ guaranteed tsc pass. **Mitigation:** tsc is the gate; pin the exact `@typescript/native-preview` dev build that fvtt-types pins.

### 6.5 CI

CI runs **both** `tsgo` and `tsc`, plus an instantiation-depth budget via `tsc --extendedDiagnostics` (fail the build if instantiation count regresses past a threshold), plus the `expectType`/`tsd` kernel + per-domain `TypeKey` purity tests.

---

## 7. Risk Register

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **Type instantiation excessively deep** (`MergeSchemas` × ~350 files, `skipLibCheck:false`) | High | High | Shallow `MergeSchemas`; recurse only on re-declared nested SchemaFields; CI depth budget from Phase 0; re-derive mixin engine |
| R2 | **`OverrideTypes` index-signature leak** (`string` pollutes every `TypeKey`) | Med | High | `ExtractKeys` + `RemoveIndexSignatures`; mandatory `expectType` purity test per domain (load-bearing) |
| R3 | **Source/Derived divergence bugs** (nullable→number, `persisted:false`, class instances) | Med | High | Native `BaseData`/`DerivedData` generics; omit `persisted:false` from Schema; type-only class imports; per-subtype modeling (Vehicle ≠ creature) |
| R4 | **fvtt-types `main` churn** (merge targets change shape) | Med | Med | Pin fvtt-types + native-preview; funnel-per-concern localizes breakage to one file |
| R5 | **tsgo/tsc diagnostic divergence** | Med | Low | tsc is the gate; pin native-preview build |
| R6 | **Protected-member inheritance error** on `declare class extends TypeDataModel` | High | Low | `override _initialize(): void;` on every model class |
| R7 | **dnd5e v6 release drift / hand-sync rot** | High | Med | Shadow tree + sparse-checkout + diff checklist; `dnd5e:diff` in CI on version bump |
| R8 | **Activities/advancements pseudo-document complexity** (`ActivityCollection`, `Omit`-based field removal) | Med | Med | Sequenced last (Phase 5); schema-generic `BaseActivityData<Type, Schema>`; isolated, tested incrementally |
| R9 | **Frozen/Proxy config records mutated at runtime by a module** | Low | Low | Document as type-only; recommend modules target non-frozen records |
| R10 | **Consumer mis-orders `types[]`** (dnd5e before fvtt-types) | Med | Low | README documents required order; single root export removes deep-path footgun |

---

## 8. Open Questions for the User

1. **Package name & scope.** Publish as `dnd5e-types` (un-scoped, matching the old package) or a scope like `@<you>/dnd5e-types`? Affects `package.json.name` and README install instructions.
2. **fvtt-types pin granularity.** Pin fvtt-types to an exact `main` commit/snapshot, or track `*`? Exact pin = reproducible builds but manual bumps; `*` = always-current but exposed to churn (R4).
3. **Surface scope for v1 ship.** Is the priority set (character/actor data, skills, abilities, damage types, global config, then item/activity/advancement, flags/settings) sufficient for a first published release, or must NPC/Vehicle/Group/Encounter + all 13 item subtypes be complete before publish?
4. **Strict-key opt-in.** Do you want `RestrictedStringField.Strict` (no `(string & {})` escape hatch) exposed publicly, or kept internal? It changes the downstream extension story for any strictly-keyed field.
5. **Config shape — enriched vs raw.** Confirm we model the **post-init enriched** `CONFIG.DND5E` shape (back-reference `key` injected into abilities/skills) as the old package did, rather than the raw pre-init literal. (Recommended; flagged for explicit sign-off.)
6. **Distribution channel.** npm publish, GitHub package, or git dependency only? Affects `files`/`exports` finalization and release automation.
7. **Old package licensing/attribution.** We lift specific idioms (expandable record pattern, README examples, diff workflow) verbatim from `adriangaro/dnd5e-types`. Confirm attribution/licensing approach.
