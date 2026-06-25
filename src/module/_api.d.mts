/**
 * The dnd5e runtime API — `game.dnd5e` / `globalThis.dnd5e` (set in `dnd5e.mjs`:
 * `globalThis.dnd5e = game.dnd5e = Object.assign(game.system, { applications, canvas, config, dataModels,
 * dice, documents, enrichers, Filter, migrations, registry, ui, utils })`).
 *
 * We extend the `dnd5e` namespace with VALUE members (alongside its existing type-only `dnd5e.types`),
 * then bind `game.dnd5e` to `typeof dnd5e`. Module-backed members reuse the ported module declarations
 * via `typeof import(...)`; class members via `typeof import(...).default` (constructor) or
 * `import(...).default` (instance).
 */

declare global {
  namespace dnd5e {
    /** `CONFIG.DND5E`. */
    const config: dnd5e.types.DND5EConfig;

    /** Cached system settings (populated by `cacheSettings()` in settings.mjs). */
    const settings: Record<string, unknown>;

    /** The singleton `Bastion` instance (assigned at `init`, `game.dnd5e.bastion = new documents.Bastion()`). */
    const bastion: import("../documents/actor/bastion.mjs").default;

    /** The singleton `Tooltips5e` instance (assigned at `init`, `game.dnd5e.tooltips = new Tooltips5e()`). */
    const tooltips: import("./tooltips.mjs").default;

    /** Dice rolls + helpers (`module/dice`). */
    namespace dice {
      const BasicRoll: typeof import("./dice/basic-roll.mjs").default;
      const D20Roll: typeof import("./dice/d20-roll.mjs").default;
      const DamageRoll: typeof import("./dice/damage-roll.mjs").default;
      const BasicDie: typeof import("./dice/basic-die.mjs").default;
      const D20Die: typeof import("./dice/d20-die.mjs").default;
      const aggregateDamageRolls: typeof import("./dice/aggregate-damage-rolls.mjs").default;
      const simplifyRollFormula: typeof import("./dice/simplify-roll-formula.mjs").default;
    }

    /** Canvas placeables, placement, detection modes (`module/canvas`). */
    namespace canvas {
      const Token5e: typeof import("./canvas/token.mjs").default;
      const Note5e: typeof import("./canvas/note.mjs").default;
      const TokenRuler5e: typeof import("./canvas/ruler.mjs").default;
      const AbilityTemplate: typeof import("./canvas/ability-template.mjs").default;
      const MapLocationControlIcon: typeof import("./canvas/map-location-control-icon.mjs").default;
      const BasePlacement: typeof import("./canvas/api/base-placement.mjs").default;
      const TemplatePlacement: typeof import("./canvas/template-placement.mjs").default;
      const TokenPlacement: typeof import("./canvas/token-placement.mjs").default;
      namespace layers {
        const TokenLayer5e: typeof import("./canvas/layers/tokens.mjs").default;
      }
      namespace detectionModes {
        const DetectionModeBlindsight: typeof import("./canvas/detection-modes/blindsight.mjs").default;
      }
    }

    /** Document subclasses (`module/documents`). */
    namespace documents {
      const ActiveEffect5e: typeof import("../documents/active-effect.mjs").default;
      const Actor5e: typeof import("../documents/actor.mjs").default;
      const Adventure5e: typeof import("../documents/adventure.mjs").default;
      const ChatMessage5e: typeof import("../documents/chat-message.mjs").default;
      const Combat5e: typeof import("../documents/combat.mjs").default;
      const Combatant5e: typeof import("../documents/combatant.mjs").default;
      const CombatantGroup5e: typeof import("../documents/combatant-group.mjs").default;
      const Item5e: typeof import("../documents/item.mjs").default;
      const JournalEntryPage5e: typeof import("../documents/journal-entry-page.mjs").default;
      const TokenDocument5e: typeof import("../documents/token.mjs").default;
      const User5e: typeof import("../documents/user.mjs").default;
      const Bastion: typeof import("../documents/actor/bastion.mjs").default;
      const HitDice: typeof import("../documents/actor/hit-dice.mjs").default;
      const Proficiency: typeof import("../documents/actor/proficiency.mjs").default;
      const SelectChoices: typeof import("../documents/actor/select-choices.mjs").default;
      const Scaling: typeof import("../documents/scaling.mjs").default;
      // activity / advancement sub-namespaces are filled strictly by src/module/_api/documents-*.d.mts.
      const Trait: typeof import("../documents/actor/trait.mjs");
      /** Document mixins (`module/documents/mixins/_module.mjs`). */
      namespace mixins {
        const DependentDocumentMixin: typeof import("../documents/mixins/dependent.mjs").default;
        const SystemDocumentMixin: typeof import("../documents/mixins/document.mjs").default;
        const SystemFlagsMixin: typeof import("../documents/mixins/flags.mjs").default;
      }
      /** Hotbar macro helpers (`module/documents/macro.mjs`). */
      const macro: typeof import("../documents/macro.mjs");
    }

    /** Custom text enrichers (`module/enrichers`). */
    const enrichers: typeof import("./enrichers.mjs");
    /** Predicate/filter helpers (`module/filter`). */
    const Filter: typeof import("./filter.mjs");
    /** World/compendium migrations (`module/migration`). */
    const migrations: typeof import("./migration.mjs");
    /** System registries (`module/registry`). */
    const registry: typeof import("./registry.mjs").default;
    /** Formatting / conversion / misc helpers (`module/utils`). */
    const utils: typeof import("./utils.mjs");

    // The applications/ layer is exposed under the `dnd5e.applications` namespace, populated
    // incrementally by the `_api/applications-*.mjs` fragments (Layer 0 foundation onward).

    // System data models (`module/data`, assigned to `game.dnd5e.dataModels`). The `dnd5e.dataModels.*`
    // value surface is declared by the runtime-mirroring barrels: `data/_module.d.mts` (hub +
    // top-level `TerrainData5e`) and one `data/<sub>/_module.d.mts` per sub-namespace, matching the
    // runtime `data/_module.mjs` `export * as <sub>` layout.

    /** UI singletons populated at init. */
    const ui: Record<string, unknown>;
  }

  interface Game {
    /** The dnd5e system API. */
    dnd5e: typeof dnd5e;
  }
}

export {};
