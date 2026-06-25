/**
 * System data definition for Characters.
 *
 * The concrete, registered actor model. Composes its source schema from CreatureTemplate +
 * the character-specific attributes/details/traits/resources/bastion/favorites additions
 * (each built by merging the shared field bundles, mirroring `defineSchema()`), then layers
 * derived data via the native `TypeDataModel` `BaseData`/`DerivedData` generics:
 *  - BaseData   = prepareBaseData outputs (prof, hd, level, xp totals)
 *  - DerivedData = prepareDerivedData outputs (ability/skill/tool data, ac, hp, movement, …)
 * Each derived top-level key is a COMPLETE overlay (`InitializedOf<Sub> & Extras`) because the
 * computed-instance/schema merge replaces whole top-level keys; the intersection also narrows
 * nullable source fields (e.g. `hp.max: number|null → number`). Seam-D `Override*` hooks fold in.
 */

import { CreatureTemplate } from "./templates/creature.mjs";
import type Proficiency from "../../documents/actor/proficiency.mjs";
import type HitDice from "../../documents/actor/hit-dice.mjs";

declare global {
  namespace dnd5e.types.Actor.Character {
    /* ---------------- source schema fragments ---------------- */

    type AttributesSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.Actor.Attributes.CommonSchema,
      dnd5e.types.MergeSchemas<
        dnd5e.types.Actor.Attributes.CreatureSchema,
        {
          hp: foundry.data.fields.SchemaField<
            dnd5e.types.MergeSchemas<
              dnd5e.types.Actor.Attributes.HitPointsSchema,
              {
                bonuses: foundry.data.fields.SchemaField<{
                  level: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
                  overall: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
                }>;
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
          inspiration: foundry.data.fields.BooleanField<{ required: true }>;
        }
      >
    >;

    type DetailsSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.Actor.Details.CommonSchema,
      dnd5e.types.MergeSchemas<
        dnd5e.types.Actor.Details.CreatureSchema,
        {
          background: dnd5e.types.fields.LocalDocumentField<globalThis.Item.Implementation>;
          originalClass: foundry.data.fields.StringField<{ required: true }>;
          xp: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
          }>;
          appearance: foundry.data.fields.StringField<{ required: true }>;
          trait: foundry.data.fields.StringField<{ required: true }>;
          gender: foundry.data.fields.StringField;
          eyes: foundry.data.fields.StringField;
          height: foundry.data.fields.StringField;
          faith: foundry.data.fields.StringField;
          hair: foundry.data.fields.StringField;
          skin: foundry.data.fields.StringField;
          age: foundry.data.fields.StringField;
          weight: foundry.data.fields.StringField;
        }
      >
    >;

    type TraitsSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.Actor.Traits.CommonSchema,
      dnd5e.types.MergeSchemas<
        dnd5e.types.Actor.Traits.CreatureSchema,
        {
          weaponProf: dnd5e.types.fields.SimpleTraitField<
            {
              mastery: foundry.data.fields.SchemaField<{
                value: foundry.data.fields.SetField<
                  dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeaponMastery.TypeKey, { required: true; blank: false }>
                >;
                bonus: foundry.data.fields.SetField<
                  dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeaponMastery.TypeKey, { required: true; blank: false }>
                >;
              }>;
            },
            dnd5e.types.WeaponProficiency.TypeKey
          >;
          armorProf: dnd5e.types.fields.SimpleTraitField<{}, dnd5e.types.ArmorProficiency.TypeKey>;
        }
      >
    >;

    interface ResourceSchema extends foundry.data.fields.DataSchema {
      value: foundry.data.fields.NumberField<{ required: true; integer: true; initial: 0 }>;
      max: foundry.data.fields.NumberField<{ required: true; integer: true; initial: 0 }>;
      sr: foundry.data.fields.BooleanField<{ required: true }>;
      lr: foundry.data.fields.BooleanField<{ required: true }>;
      label: foundry.data.fields.StringField<{ required: true }>;
    }

    type BaseSchema = dnd5e.types.MergeSchemas<
      CreatureTemplate.Schema,
      {
        attributes: foundry.data.fields.SchemaField<dnd5e.types.Actor.Character.AttributesSchema>;
        details: foundry.data.fields.SchemaField<dnd5e.types.Actor.Character.DetailsSchema>;
        traits: foundry.data.fields.SchemaField<dnd5e.types.Actor.Character.TraitsSchema>;
        bastion: foundry.data.fields.SchemaField<{
          name: foundry.data.fields.StringField<{ required: true }>;
          description: foundry.data.fields.HTMLField;
        }>;
        resources: foundry.data.fields.SchemaField<{
          primary: foundry.data.fields.SchemaField<dnd5e.types.Actor.Character.ResourceSchema>;
          secondary: foundry.data.fields.SchemaField<dnd5e.types.Actor.Character.ResourceSchema>;
          tertiary: foundry.data.fields.SchemaField<dnd5e.types.Actor.Character.ResourceSchema>;
        }>;
        favorites: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<{
            type: dnd5e.types.fields.RestrictedStringField<
              "item" | "effect" | "activity" | "skill" | "tool" | "slots",
              { required: true; blank: false }
            >;
            id: foundry.data.fields.StringField<{ required: true; blank: false }>;
            sort: foundry.data.fields.IntegerSortField;
          }>
        >;
      }
    >;

    /* ---------------- derived overlays ---------------- */

    /** prepareBaseData outputs (character.mjs prepareBaseData). */
    interface BaseData {
      attributes: { prof: number; hd: HitDice };
      details: { level: number; xp: { min: number; max: number; pct: number; boonsEarned?: number } };
    }

    /**
     * prepareDerivedData outputs — each top-level key is a COMPLETE overlay built ON TOP OF the
     * source-initialized shape (`InitializedOf<Schema>`), so it is the SAME single schema source
     * of truth, not a second copy:
     *  - keys that prepareData only *narrows* (null → value) use `NonNullableProps`, reading the
     *    field type from the schema (no hand-retyping) → schema changes propagate / break loudly;
     *  - keys that are genuinely *new* (mod, prof, pct, effectiveMax, …) exist only in prepare* JS,
     *    have no schema counterpart, and so cannot desync with the schema — they are the irreducible
     *    part that must be authored;
     *  - keys whose runtime value *replaces* the stored value (string-formula → number, e.g. `ac`)
     *    are authored standalone for the same reason and are validated against the .mjs, not the schema.
     */
    interface DerivedData {
      abilities: Record<dnd5e.types.Ability.TypeKey, dnd5e.types.Actor.Common.AbilityData>;
      skills: Record<dnd5e.types.Skill.TypeKey, dnd5e.types.Actor.Creature.SkillData>;
      tools: Record<dnd5e.types.Tool.TypeKey, dnd5e.types.Actor.Creature.ToolData>;
      attributes: dnd5e.types.PrettifyType<
        // Start from the source-initialized attributes, but DROP the subtrees whose runtime
        // value differs in TYPE from storage (ac/movement: formula-strings → numbers) or that
        // we re-state (hp/init/concentration/encumbrance), then re-add each at full fidelity.
        Omit<
          dnd5e.types.InitializedOf<dnd5e.types.Actor.Character.AttributesSchema>,
          "ac" | "movement" | "hp" | "init" | "concentration" | "encumbrance"
        > & {
          // NARROW: hp.max/value are nullable in source, always-present after prepareHitPoints.
          hp: dnd5e.types.NonNullableProps<
            dnd5e.types.InitializedOf<dnd5e.types.Actor.Character.AttributesSchema>["hp"],
            "max" | "value"
          > & { effectiveMax: number; damage: number; pct: number };

          // REPLACE: every formula-string field becomes a number — authored standalone
          // (intersection with the source would yield `string & number = never`). Validated vs .mjs.
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
          init: dnd5e.types.InitializedOf<dnd5e.types.Actor.Character.AttributesSchema>["init"] & {
            mod: number;
            prof: Proficiency;
            total: number;
            score: number;
          };
          concentration: dnd5e.types.InitializedOf<dnd5e.types.Actor.Character.AttributesSchema>["concentration"] & {
            save: number;
          };
          encumbrance: dnd5e.types.InitializedOf<dnd5e.types.Actor.Character.AttributesSchema>["encumbrance"] & {
            value: number;
            max: number;
            mod: number;
            pct: number;
            encumbered: boolean;
            thresholds: { encumbered: number; heavilyEncumbered: number; maximum: number };
            stops: { encumbered: number; heavilyEncumbered: number };
          };

          // NEW: derived-only subtree (prepareSpellcastingAbility).
          spell: { attack: number; dc: number; mod: number; abilityLabel: string };
        }
      >;
      details: dnd5e.types.PrettifyType<
        dnd5e.types.InitializedOf<dnd5e.types.Actor.Character.DetailsSchema> & {
          type: dnd5e.types.CreatureTypeData;
          tier: number;
        }
      >;
    }
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the character subtype on the interface the funnel reads. */
    interface Actor {
      character: typeof import("./character.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Actor.character {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

// The class declaration stays clean — all Seam-D folding lives in the namespace aliases below,
// so it's impossible to wire one seam and forget another, and `Schema` is reusable (defineSchema,
// favorites). Overrides arrive via declaration merging (Seam D), NOT as consumer-supplied type
// params, because a downstream module can't instantiate this already-declared class.
declare class CharacterData extends CreatureTemplate<
  CharacterData.Schema,
  CharacterData.Base,
  CharacterData.Derived
> {
  static override _systemType: "character";
  static override defineSchema(): CharacterData.Schema;

  /**
   * Whether this Actor type represents a player character.
   * @returns {boolean}
   */
  get isCharacter(): true;

  /**
   * Level used to determine cantrip scaling.
   * @param spell Spell for which to fetch the cantrip level.
   * @returns The cantrip level.
   */
  cantripLevel(spell: globalThis.Item.Implementation): number;

  /**
   * Checks whether the item with the given relative UUID has been favorited.
   * @param favoriteId The relative UUID of the item to check.
   * @returns Whether the item is favorited.
   */
  hasFavorite(favoriteId: string): boolean;

  /**
   * Add a favorite item to this actor.
   * If the given item is already favorite, this method has no effect.
   * @param favorite The favorite to add.
   * @returns The updated actor.
   * @throws If the item intended to be favorited does not belong to this actor.
   */
  addFavorite(favorite: CharacterData.ActorFavorite5e): Promise<Actor.Implementation>;

  /**
   * Removes the favorite with the given relative UUID or resource ID.
   * @param favoriteId The relative UUID or resource ID of the favorite to remove.
   * @returns The updated actor.
   */
  removeFavorite(favoriteId: string): Promise<Actor.Implementation>;
}

declare namespace CharacterData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Actor.Character.BaseSchema,
    dnd5e.types.DataModelConfig.Actor.character.OverrideSchema
  >;
  /** prepareBaseData overlay with Seam-D `OverrideBase` folded in. */
  type Base = dnd5e.types.MergeData<
    dnd5e.types.Actor.Character.BaseData,
    dnd5e.types.DataModelConfig.Actor.character.OverrideBase
  >;
  /** prepareDerivedData overlay with Seam-D `OverrideDerived` folded in. */
  type Derived = dnd5e.types.MergeData<
    dnd5e.types.Actor.Character.DerivedData,
    dnd5e.types.DataModelConfig.Actor.character.OverrideDerived
  >;
  type ActorFavorite5e = dnd5e.types.InitializedOf<CharacterData.Schema>["favorites"][number];
}

export default CharacterData;
