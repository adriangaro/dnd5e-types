# dnd5e-types v2 — TODO.md

> **Progress (2026-06-20):** Phase 0 ✅ and Phase 1 kernel ✅ complete — green under `tsc` 6.0.3 **and** `tsgo` 7.0.0-dev, with real (negative-control-verified) type tests incl. the R2 purity guard. Deviations from plan: (a) `MergeSchemas` kept **deep** (proven), not shallow — depth guarded by CI budget later; (b) `checkJs:false` + `maxNodeModuleJsDepth:0` so colocated dnd5e `.mjs` resolves without type-checking its JS; (c) custom field shims (MappingField, FormulaField, RollConfigField, …) **deferred to Phase 3** where they're authored alongside the data-model layer — only `RestrictedStringField` shipped in Phase 1. Still open in Phase 0: GitHub Actions CI and the first `dnd5e:diff` run (needs network/cache). **Next: Phase 2 (CONFIG.DND5E records).**


Phased, dependency-ordered build. Each phase ends with a **green `tsc`** (gate) and a passing **instantiation-depth budget** check. Items marked **[EXPANDABILITY-CRITICAL]** directly implement or protect a downstream extension seam (§4 of PLAN.md) — regressions here break module authors and must have `expectType` coverage.

Legend: `[ ]` todo · **[EC]** = expandability-critical.

---

## Phase 0 — Tooling skeleton & scaffolding

- [ ] Initialize repo (git, `.gitignore` including the sparse-checked-out dnd5e `.mjs` source paths).
- [ ] Write `package.json`: `name`, `"type":"module"`, `exports["."].types = "./src/index.d.mts"`, `files: ["src","tsconfig.base.json","tsconfig.json"]`, scripts (`typecheck`=`tsgo`, `typecheck:tsc`=`tsc`, `dnd5e:setup`, `dnd5e:cleanup`, `dnd5e:diff`).
- [ ] Add `fvtt-types` as `peerDependencies` (`*`); add `typescript` + `@typescript/native-preview` as optional peers; install fvtt-types `main` and pin the native-preview build fvtt-types pins.
- [ ] Write `tsconfig.base.json` / `tsconfig.json` copying fvtt-types' strict base: `moduleResolution:"Bundler"`, `allowImportingTsExtensions`, `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`, `allowJs`+`checkJs`, `noEmit`, `skipLibCheck:false`, full `strict` (incl. `noImplicitAny`/`noImplicitThis`), `types: []`.
- [ ] Write `scripts/setup-dnd5e-source.sh` (sparse-checkout dnd5e v6.0.0 `.mjs` into shadow tree), `cleanup-dnd5e-source.sh`, `generate-diff.sh`.
- [ ] Create root barrel stub `src/index.d.mts` (empty side-effect-import list to grow).
- [ ] Set up CI: run `tsgo` **and** `tsc`; add `tsc --extendedDiagnostics` instantiation-depth budget gate; wire `tsd`/`expectType` test runner.
- [ ] Run `dnd5e:diff` to regenerate the **5.0.4 → 6.0.0** diff checklist and scope migration.
- [ ] Verify a trivial `declare class extends TypeDataModel` compiles green (sanity-check the toolchain + the `override _initialize` gotcha).

---

## Phase 1 — Type utility kernel (foundation for everything)

- [ ] **[EC]** `types/expandable.d.mts`: implement `ExtractKeys`, `MergeOverrideDefinition` (on `fvttUtils.SimpleMerge` + `RemoveIndexSignatures`), and `ExpandableEnum`.
- [ ] **[EC]** Write `expectType` purity tests proving `OverrideTypes extends Record<string, boolean|never>` does **not** leak `string` into `TypeKey` (R2 guard) — must pass before any domain is built.
- [ ] `types/merge-schema.d.mts`: implement **shallow** `MergeSchemas` (mirrors runtime `mergeSchema` = `Object.assign`; same-name top-level key replaces) and re-export `RemoveIndexSignatures`.
- [ ] Add `expectType` tests for `MergeSchemas`: shallow override of `attributes`, and `never` → field deletion.
- [ ] **[EC]** `types/fields.d.mts`: implement `RestrictedStringField<Allowed>` (initialized type `Allowed | (string & {})`) + `.Strict` variant; set the three `" __fvtt_types_internal_*"` phantom keys correctly.
- [ ] Implement custom field shims in `types/fields.d.mts` / `module/data/fields/`: `MappingField`, `FormulaField`, `RollConfigField`, `MovementField`, `SensesField`, `SimpleTraitField`, `DamageTraitField`, `ACFormulasField`, `LocalDocumentField`.
- [ ] Add `expectType` tests for each field shim (`_source` type vs initialized type) — bugs here corrupt everything downstream.

---

## Phase 2 — `CONFIG.DND5E` records (Seam A) + global CONFIG funnel

- [ ] `funnel/config-global.d.mts`: `declare global { interface CONFIG { DND5E: dnd5e.types.DND5EConfig } }` (must be `declare global`, NOT module-form — `CONFIG` is a global interface).
- [ ] `module/config.d.mts`: declare the central `dnd5e.types.DND5EConfig` interface, assembled piecemeal via per-domain declaration merges.
- [ ] **[EC]** Implement PRIORITY records first with the fixed Seam-A idiom (`DefaultTypes`/`OverrideTypes`/`Types`/`TypeKey`/`Config`): **`abilities`**, **`skills`** (`Config.ability: Ability.TypeKey`), **`damageTypes`** (`.color: Color`), then `healingTypes`.
- [ ] **[EC]** Implement remaining priority/global records (cross-referenced by `TypeKey`): `movementTypes`, `actorSizes`, `senses`, `creatureTypes`, `conditionTypes`, `currencies`, `itemProperties`, `spellSchools`, `tools`, `weaponMasteries`, `armorClasses`, `consumableTypes`, `featureTypes`, `individualTargetTypes`, `areaTargetTypes`, `restTypes`, `spellPreparationStates`, `traits`, `languages`, `habitats`, `treasure`, `ruleTypes`, `characterFlags`.
- [ ] Reuse fvtt-types primitives: `Color` for `.color`; extend `StatusEffectConfig` for `conditionTypes`/`statusEffects`.
- [ ] Honor `noUncheckedIndexedAccess`: ensure consumers see `Config | undefined` on `CONFIG.DND5E.<record>[id]`.
- [ ] **[EC]** Per-domain `expectType` tests: each `TypeKey` is a clean literal union, and an `OverrideTypes` merge widens it (proves Seam A end-to-end).
- [ ] Add `activityTypes` / `advancementTypes` record *stubs* (filled with class refs in Phase 5; needed shape now).

---

## Phase 3 — Abstract data-model layer (highest-risk module)

- [ ] **Re-derive** (do NOT copy old `abstract.d.mts`) `SystemDataModel` + the `mixin()` **type** against current fvtt-types `TypeDataModel`.
- [ ] `module/data/abstract/system-data-model.d.mts`: declare `ActorDataModel`, `ItemDataModel` base classes (each with `override _initialize(): void;`).
- [ ] Implement schema-fragment interfaces (static field-bundle getters): `AttributesFields.Common` / `.Creature` (`templates/attributes.d.mts`), `DetailsField` (`templates/details.d.mts`), `TraitsField` (`templates/traits.d.mts`), `CommonTemplateSchema` / `CreatureTemplateSchema` (`templates/common.d.mts`, `creature.d.mts`).
- [ ] Confirm `persisted:false` fields are **omitted** from fragment source schemas (they belong in DerivedData).
- [ ] `expectType` test: a fragment composed via shallow `MergeSchemas` yields correct `_source` vs initialized shapes.

---

## Phase 4 — Actor subtypes + funnels (PRIORITY: character first)

- [ ] **[EC]** `module/data/actor/character.d.mts` — the reference implementation:
  - [ ] `CharacterSchema` (SOURCE) hand-synced to `character.mjs` `defineSchema()`, composed from `common`+`creature` fragments via shallow `MergeSchemas`; `abilities`/`skills`/`tools` as `MappingField` keyed by `Ability.TypeKey`/`Skill.TypeKey`/`string`; `hp.value`/`hp.max` `nullable:true` in source.
  - [ ] `CharacterBaseData` (set in `prepareBaseData`, `character.mjs:162`): `attributes.prof`, `attributes.hd: HitDice`, `details.level`, `details.xp`.
  - [ ] `CharacterDerivedData` (`prepareDerivedData` + `persisted:false`): `attributes.ac/encumbrance/hp/init/movement/spell`, `abilities` (mod/save/prof), `skills` (mod/total/passive/prof), `details.tier`, `scale`. `hp.max`/`hp.value` overridden to non-null; `HitDice`/`Proficiency` imported **type-only**.
  - [ ] **[EC]** `declare class CharacterData extends TypeDataModel<CharacterSchema, Actor.Implementation, CharacterBaseData, CharacterDerivedData>` with `static _systemType: "character"` and `override _initialize(): void;`.
  - [ ] **[EC]** Register: merge `dnd5e.types.DataModelConfig.Actor { character: typeof CharacterData }` + declare `Actor.character.OverrideSchema` (extends `DataSchema`) and `OverrideDerived` (Seam D), folding `OverrideSchema` in as a final shallow merge and `OverrideDerived` into derived.
- [ ] `module/data/actor/npc.d.mts` (creature-based).
- [ ] `module/data/actor/vehicle.d.mts` — **NOT a creature**: extends CommonTemplate, no `skills`/`tools`/`spells`/creature-derived; re-adds persisted `ac.calc`. Model independently.
- [ ] `module/data/actor/group.d.mts`, `encounter.d.mts`.
- [ ] **[EC]** `module/data/actor/_module.d.mts`: aggregate all subtypes into `dnd5e.types.DataModelConfig.Actor`.
- [ ] **[EC]** `funnel/data-model-config.d.mts`: single bridge `Actor: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.Actor>`.
- [ ] **[EC]** `funnel/document-class-config.d.mts`: wire `Actor5e<SubType>` via `DocumentClassConfig`/`ConfiguredActor`.
- [ ] `expectType` tests: `Actor.OfType<"character">` narrows `.system`; `.type` guard narrows; `_source.hp.max` is `number|null` while `system.hp.max` is `number`; an `OverrideSchema`/`OverrideDerived` merge appears on `.system` (proves Seam D).

---

## Phase 5 — Item subtypes + activities + advancements

- [ ] `module/data/item/_module.d.mts` + 13 subtype files: `background, container, class, consumable, equipment, facility, feat, loot, race, spell, subclass, tool, weapon` (each with Seam-D `OverrideSchema`/`OverrideDerived`).
- [ ] **[EC]** Register item subtypes via Foundry-native `CONFIG.Item.dataModels` path: merge `dnd5e.types.DataModelConfig.Item` + the `Item: InterfaceToObject<…>` bridge in `funnel/data-model-config.d.mts`; wire `Item5e<SubType>`.
- [ ] **[EC]** Activities (`module/data/activity/`): schema-generic `BaseActivityData<Type, Schema>`; type `ActivityField` so `_source` is the plain object and `InitializedType` is the resolved union member; handle `Omit`-based field removal for Cast/Forward/Order; type `ActivityCollection` (Collection subclass with `getByType(K): OfType<K>[]`) and `MappingField.initialize()` returning a Collection.
- [ ] **[EC]** Fill `activityTypes` registry (lowercase keys): `Activity.DefaultTypes { attack: typeof AttackActivity; damage: typeof DamageActivity; … }`, `OverrideTypes extends Record<string, never>`, `Config<K>` with `documentClass: typeof Activity`.
- [ ] **[EC]** Advancements (`module/data/advancement/`): `BaseAdvancementData`, `AdvancementDataField.getModel()` typing, `value` sub-model with plain-object `metadata.defaults` fallback.
- [ ] **[EC]** Fill `advancementTypes` registry (PascalCase keys): same idiom; `Config` adds `validItemTypes: Set<string>` and `documentClass: typeof Advancement`.
- [ ] `module/documents/` shadow: type-only `Activity`/`Advancement` classes referenced by the registries.
- [ ] `expectType` tests: `activities.getByType("attack")` returns the attack model; an `OverrideTypes` merge registers a custom activity type.

---

## Phase 6 — Flags, settings, document classes, cross-cutting

- [ ] **[EC]** `funnel/flag-config.d.mts`: single `FlagConfig` funnel per document (Actor, Item, …) merging `dnd5e.types` flag interfaces; expose mergeable flag interfaces for downstream extension.
- [ ] `funnel/setting-config.d.mts`: one `SettingConfig` entry per `game.settings.register("dnd5e", …)`; set `SystemNameConfig.name = "dnd5e"`.
- [ ] `module/documents/actor.d.mts` / `item.d.mts`: finalize `Actor5e<SubType>` / `Item5e<SubType>` document shapes + flags.
- [ ] Type the `game.dnd5e` global (public API: `config`, registry singleton, etc.).
- [ ] **[EC]** Ensure ActiveEffect / RegionBehavior subtype registration is **additive** (dnd5e uses `Object.assign` onto core) — never clobber core subtypes; cover ChatMessage and JournalEntryPage WithSystem documents too.
- [ ] Finalize root barrel `src/index.d.mts`: side-effect-import **every** submodule so all merges register.

---

## Phase 7 — Tests, validation & consumer docs

- [ ] Full `expectType`/`tsd` suite green: per-domain `TypeKey` purity (R2), each of the four seams demonstrated by a fixture module, source vs derived divergence on character.
- [ ] Author a **sample downstream module** fixture exercising all four seams (add skill via `OverrideTypes`; register a subtype via `DataModelConfig.Actor`; inject fields via `OverrideSchema`/`OverrideDerived`; consume via `Actor.OfType`) and type-check it in CI.
- [ ] Run instantiation-depth budget (`tsc --extendedDiagnostics`) and record the baseline; fail CI on regression (R1).
- [ ] Confirm consumer story: `compilerOptions.types: ["fvtt-types","dnd5e-types"]` (order asserted), single root export, no deep-path import required.
- [ ] Verify publish artifact is declarations-only (colocated `.mjs` excluded via `files`; `cleanup-dnd5e-source.sh` run pre-publish).
- [ ] Write `README.md` with extension recipes for all four seams + `Actor.OfType`/`Actor.Known`/`.type` guards (carry forward old package's examples).
- [ ] Write `documentation-issues.md` capturing upstream fvtt-types/dnd5e bugs encountered.
- [ ] Run final `tsc` gate green under the pinned native-preview build.
