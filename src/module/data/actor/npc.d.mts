/**
 * System data definition for NPCs.
 *
 * The concrete, registered NPC actor model. Composes its source schema from CreatureTemplate +
 * the npc-specific attributes/details/traits additions plus top-level `resources` and `source`
 * (each built by merging the shared field bundles, mirroring `defineSchema()`), then layers
 * derived data via the native `TypeDataModel` `BaseData`/`DerivedData` generics:
 *  - BaseData    = prepareBaseData outputs (hd.max/denomination, details.level/xp, prof, legact/legres.lr)
 *  - DerivedData = prepareDerivedData outputs (ability/skill/tool data, ac, hp, movement, resources, source, …)
 * Each derived top-level key is a COMPLETE overlay (`InitializedOf<Sub> & Extras`) because the
 * computed-instance/schema merge replaces whole top-level keys; the intersection also narrows
 * nullable source fields (e.g. `hp.max: number|null → number`). Seam-D `Override*` hooks fold in.
 */

import { CreatureTemplate } from "./templates/creature.mjs";
import type Proficiency from "../../documents/actor/proficiency.mjs";
import type HitDice from "../../documents/actor/hit-dice.mjs";

declare global {
  namespace dnd5e.types.Actor.NPC {
    /* ---------------- source schema fragments ---------------- */

    type AttributesSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.Actor.Attributes.CommonSchema,
      dnd5e.types.MergeSchemas<
        dnd5e.types.Actor.Attributes.CreatureSchema,
        {
          hd: foundry.data.fields.SchemaField<{
            spent: foundry.data.fields.NumberField<{ integer: true; min: 0; initial: 0 }>;
          }>;
          hp: foundry.data.fields.SchemaField<
            dnd5e.types.MergeSchemas<
              dnd5e.types.Actor.Attributes.HitPointsSchema,
              {
                formula: dnd5e.types.fields.FormulaField<{ required: true }>;
              }
            >
          >;
          death: dnd5e.types.fields.RollConfigField<
            {
              success: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
              failure: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
              bonuses: foundry.data.fields.SchemaField<{ save: dnd5e.types.fields.FormulaField<{ required: true }> }>;
            },
            false
          >;
          price: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.NumberField<{ initial: null; min: 0 }>;
            denomination: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Currency.TypeKey, { required: true; blank: false }>;
          }>;
          spell: foundry.data.fields.SchemaField<{
            level: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
          }>;
        }
      >
    >;

    type DetailsSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.Actor.Details.CommonSchema,
      dnd5e.types.MergeSchemas<
        dnd5e.types.Actor.Details.CreatureSchema,
        {
          type: dnd5e.types.fields.CreatureTypeField;
          habitat: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.ArrayField<
              foundry.data.fields.SchemaField<{
                type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Habitat.TypeKey | "", { required: true; blank: true }>;
                subtype: foundry.data.fields.StringField;
              }>
            >;
            custom: foundry.data.fields.StringField<{ required: true }>;
          }>;
          cr: foundry.data.fields.NumberField<{ required: true; nullable: true; min: 0; initial: 1 }>;
          treasure: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.SetField<
              dnd5e.types.fields.RestrictedStringField<dnd5e.types.Treasure.TypeKey, { required: true; blank: false }>
            >;
          }>;
        }
      >
    >;

    type TraitsSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.Actor.Traits.CommonSchema,
      dnd5e.types.MergeSchemas<
        dnd5e.types.Actor.Traits.CreatureSchema,
        {
          important: foundry.data.fields.BooleanField;
        }
      >
    >;

    /** npc.mjs — top-level `resources` SchemaField (legendary actions/resistances + lair). */
    interface ResourcesSchema extends foundry.data.fields.DataSchema {
      legact: foundry.data.fields.SchemaField<{
        max: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
        spent: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
      }>;
      legres: foundry.data.fields.SchemaField<{
        max: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
        spent: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
      }>;
      lair: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.BooleanField<{ required: true }>;
        initiative: foundry.data.fields.NumberField<{ required: true; integer: true }>;
        inside: foundry.data.fields.BooleanField;
      }>;
    }

    /**
     * source-field.mjs — top-level `source` SchemaField (`new SourceField()`). Authored inline:
     * there is no shared SourceField shim yet (reported as a new shared field for the integrator).
     */
    interface SourceSchema extends foundry.data.fields.DataSchema {
      book: foundry.data.fields.StringField;
      page: foundry.data.fields.StringField;
      custom: foundry.data.fields.StringField;
      license: foundry.data.fields.StringField;
      revision: foundry.data.fields.NumberField<{ initial: 1 }>;
      rules: foundry.data.fields.StringField<{ initial: "2014" | "2024" }>;
    }

    type BaseSchema = dnd5e.types.MergeSchemas<
      CreatureTemplate.Schema,
      {
        attributes: foundry.data.fields.SchemaField<dnd5e.types.Actor.NPC.AttributesSchema>;
        details: foundry.data.fields.SchemaField<dnd5e.types.Actor.NPC.DetailsSchema>;
        traits: foundry.data.fields.SchemaField<dnd5e.types.Actor.NPC.TraitsSchema>;
        resources: foundry.data.fields.SchemaField<dnd5e.types.Actor.NPC.ResourcesSchema>;
        source: foundry.data.fields.SchemaField<dnd5e.types.Actor.NPC.SourceSchema>;
      }
    >;

    /* ---------------- derived overlays ---------------- */

    /** prepareBaseData outputs (npc.mjs prepareBaseData). */
    interface BaseData {
      attributes: {
        hd: { max: number; denomination: number };
        prof: number | null;
        spell: { level: number };
      };
      details: {
        level: number;
        xp: { value: number };
      };
      resources: {
        legact: { lr: boolean; max: number };
        legres: { lr: boolean; max: number };
      };
    }

    /**
     * prepareDerivedData outputs — each top-level key is a COMPLETE overlay built ON TOP OF the
     * source-initialized shape (`InitializedOf<Schema>`):
     *  - keys that prepareData only *narrows* (null → value) use `NonNullableProps`;
     *  - keys that are genuinely *new* (mod, pct, value, label, …) are authored;
     *  - keys whose runtime value *replaces* the stored value (string-formula → number, e.g. `ac`,
     *    `movement`) are dropped from the source first then authored standalone (string & number = never).
     */
    interface DerivedData {
      abilities: Record<dnd5e.types.Ability.TypeKey, dnd5e.types.Actor.Common.AbilityData>;
      skills: Record<dnd5e.types.Skill.TypeKey, dnd5e.types.Actor.Creature.SkillData>;
      tools: Record<dnd5e.types.Tool.TypeKey, dnd5e.types.Actor.Creature.ToolData>;
      attributes: dnd5e.types.PrettifyType<
        Omit<
          dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.AttributesSchema>,
          "ac" | "movement" | "hp" | "init" | "concentration" | "encumbrance" | "hd"
        > & {
          // NARROW: hp.max/value are nullable in source, always-present after prepareHitPoints.
          hp: dnd5e.types.NonNullableProps<
            dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.AttributesSchema>["hp"],
            "max" | "value"
          > & { effectiveMax: number; damage: number; pct: number };

          // NEW: hd gains max/denomination (prepareBaseData) and value/pct (prepareDerivedData).
          hd: dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.AttributesSchema>["hd"] & {
            max: number;
            denomination: number;
            value: number;
            pct: number;
          };

          // REPLACE: every formula-string field becomes a number — authored standalone.
          ac: {
            armor: number;
            base: number;
            bonus: number;
            calc: string;
            cover: number;
            flat: number;
            formula: string;
            formulas: Array<{ formula: string; label?: string; id?: string; type?: string; armored?: boolean; shielded?: boolean }>;
            min: number;
            override?: number;
            selectedFormulas: Set<string>;
            shield: number;
            value: number;
            label: string;
            dex: number;
            equippedArmor: globalThis.Item.Implementation | null;
            equippedShield: globalThis.Item.Implementation | null;
            clamped: Record<dnd5e.types.Ability.TypeKey, number>;
            activeFormula?: { formula: string; label?: string; id?: string; type?: string };
          };
          movement: Record<dnd5e.types.Movement.TypeKey, number> & {
            bonus: number;
            special: string;
            units: string;
            hover: boolean;
            ignoredDifficultTerrain: Set<string>;
            speed: number;
            max: number;
            slowed: boolean;
            jump: number;
            fromSpecies: Partial<Record<dnd5e.types.Movement.TypeKey, number>>;
          };

          // NARROW/new on top of the preserved source subtree.
          init: dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.AttributesSchema>["init"] & {
            mod: number;
            prof: Proficiency;
            total: number;
            score: number;
          };
          concentration: dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.AttributesSchema>["concentration"] & {
            save: number;
          };
          encumbrance: dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.AttributesSchema>["encumbrance"] & {
            value: number;
            max: number;
            mod: number;
            pct: number;
            encumbered: boolean;
            thresholds: { encumbered: number; heavilyEncumbered: number; maximum: number };
            stops: { encumbered: number; heavilyEncumbered: number };
          };

          // NARROW: prof is set in prepareBaseData (null only when cr === null).
          prof: number | null;

          // NEW: derived-only subtree (prepareSpellcastingAbility).
          spell: dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.AttributesSchema>["spell"] & {
            attack: number;
            dc: number;
            mod: number;
            abilityLabel: string;
          };
        }
      >;
      details: dnd5e.types.PrettifyType<
        dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.DetailsSchema> & {
          // prepareEmbeddedData may overwrite type from the race item; preparation guarantees the
          // full CreatureTypeData (config/label) shape.
          type: dnd5e.types.CreatureTypeData;
          level: number;
          xp: { value: number };
        }
      >;
      resources: dnd5e.types.PrettifyType<
        Omit<dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.ResourcesSchema>, "legact" | "legres"> & {
          legact: dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.ResourcesSchema>["legact"] & {
            lr: boolean;
            value: number;
            label: string;
          };
          legres: dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.ResourcesSchema>["legres"] & {
            lr: boolean;
            value: number;
          };
        }
      >;
      // SourceField.prepareData overlay (bookPlaceholder/label/value/slug/directlyEditable).
      source: dnd5e.types.PrettifyType<
        dnd5e.types.InitializedOf<dnd5e.types.Actor.NPC.SourceSchema> & {
          bookPlaceholder: string;
          label: string;
          value: string;
          slug: string;
          directlyEditable: boolean;
        }
      >;
    }
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the npc subtype on the interface the funnel reads. */
    interface Actor {
      npc: typeof import("./npc.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Actor.npc {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class NPCData extends CreatureTemplate<NPCData.Schema, NPCData.Base, NPCData.Derived> {
  static override _systemType: "npc";
  static override defineSchema(): NPCData.Schema;

  /** Whether this Actor type represents a non-player character. */
  get isNPC(): true;

  /** Prepare movement & senses values derived from race item. */
  prepareEmbeddedData(): void;

  recoverCombatUses(periods: dnd5e.types.LimitedUsePeriod.TypeKey[], results: object): Promise<void>;
  /**
   * Level used to determine cantrip scaling.
   * @param spell - Spell for which to fetch the cantrip level.
   * @returns The cantrip level.
   */
  cantripLevel(spell: globalThis.Item.Implementation): number | null;
  /**
   * Prepare the context information for the embed template rendering.
   * @param rulesVersion - Version of the stat block styling to use.
   * @returns The rendered context object.
   */
  _prepareEmbedContext(rulesVersion: "2014" | "2024"): Promise<object>;
  /** Create a list of gear that can be collected from this NPC. */
  getGear(): Promise<globalThis.Item.Implementation[]>;
  /**
   * Auto-generate a description for the legendary actions block on the NPC stat block.
   * @param name - Name of the actor to use in the text.
   * @returns The generated description string.
   */
  getLegendaryActionsDescription(name?: string): string;
  /**
   * Spend a legendary resistance to change a failed saving throw into a success.
   * @param message - The chat message containing the failed save.
   * @throws If no legendary resistances remain.
   * @throws If the message does not contain a save roll.
   * @throws If the save has already been resisted.
   */
  resistSave(message: ChatMessage.Implementation): Promise<void>;
}

declare namespace NPCData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Actor.NPC.BaseSchema,
    dnd5e.types.DataModelConfig.Actor.npc.OverrideSchema
  >;
  /** prepareBaseData overlay with Seam-D `OverrideBase` folded in. */
  type Base = dnd5e.types.MergeData<
    dnd5e.types.Actor.NPC.BaseData,
    dnd5e.types.DataModelConfig.Actor.npc.OverrideBase
  >;
  /** prepareDerivedData overlay with Seam-D `OverrideDerived` folded in. */
  type Derived = dnd5e.types.MergeData<
    dnd5e.types.Actor.NPC.DerivedData,
    dnd5e.types.DataModelConfig.Actor.npc.OverrideDerived
  >;
}

export default NPCData;
