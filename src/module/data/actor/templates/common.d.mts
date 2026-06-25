/**
 * A template for all actors that share the common template.
 *
 * Schema is composed from the mixed-in `CurrencyTemplate` (via `GetSchema`, i.e. its mirrored
 * `defineSchema()` return) plus this template's own `abilities` field, then has the Seam-D
 * `OverrideSchema` folded in — so downstream modules patch the schema at exactly the point the
 * runtime composes it.
 */

import ActorDataModel from "../../abstract/actor-data-model.mjs";
import CurrencyTemplate from "../../shared/currency.mjs";
import type Proficiency from "../../../documents/actor/proficiency.mjs";

declare global {
  namespace dnd5e.types.Actor.Common {
    /** common.mjs — per-ability source schema. */
    interface AbilitySchema extends foundry.data.fields.DataSchema {
      value: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 10 }>;
      proficient: foundry.data.fields.NumberField<{ required: true; integer: true; min: 0; max: 1; initial: 0 }>;
      max: foundry.data.fields.NumberField<{ required: true; integer: true; nullable: true; min: 0; initial: null }>;
      bonuses: foundry.data.fields.SchemaField<{
        check: dnd5e.types.fields.FormulaField<{ required: true }>;
        save: dnd5e.types.fields.FormulaField<{ required: true }>;
      }>;
      check: dnd5e.types.fields.RollConfigField<{}, false>;
      save: dnd5e.types.fields.RollConfigField<{}, false>;
    }

    type AbilitiesField = dnd5e.types.fields.MappingField<
      foundry.data.fields.SchemaField<dnd5e.types.Actor.Common.AbilitySchema>,
      dnd5e.types.Ability.TypeKey
    >;

    /** Pre-Seam-D source schema: mixed currency + own `abilities`. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.GetSchema<typeof CurrencyTemplate>,
      { abilities: dnd5e.types.Actor.Common.AbilitiesField }
    >;

    /** Derived per-ability shape (prepareAbilities). Intersection narrows `max: number|null → number`. */
    type AbilityData = dnd5e.types.PrettifyType<
      dnd5e.types.InitializedOf<dnd5e.types.Actor.Common.AbilitySchema> & {
        mod: number;
        checkProf: Proficiency;
        saveProf: Proficiency;
        checkBonus: number;
        saveBonus: number;
        attack: number;
        dc: number;
        max: number;
        merged?: boolean;
        save: dnd5e.types.InitializedOf<dnd5e.types.Actor.Common.AbilitySchema>["save"] & { value: number };
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig.Actor.common {
    /** Seam D: downstream merges SOURCE fields here. */
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    /** Seam D: downstream merges prepareBaseData-derived props here. */
    interface OverrideBase extends fvttUtils.AnyObject {}
    /** Seam D: downstream merges prepareDerivedData-derived props here. */
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

export declare class CommonTemplate<
  Schema extends foundry.data.fields.DataSchema = CommonTemplate.Schema,
  BaseData extends fvttUtils.AnyObject = CommonTemplate.BaseData,
  DerivedData extends fvttUtils.AnyObject = CommonTemplate.DerivedData,
> extends ActorDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): CommonTemplate.Schema;

  /**
   * Prepare modifiers and other values for abilities.
   * @param options
   * @param options.rollData     Roll data used to calculate bonuses.
   * @param options.originalSaves  Original ability data for transformed actors.
   */
  prepareAbilities(options?: {
    rollData?: dnd5e.types.documents.ActorRollData;
    originalSaves?: Partial<Record<dnd5e.types.Ability.TypeKey, dnd5e.types.Actor.Common.AbilityData>>;
  }): void;

  /**
   * Create the proficiency object for an ability, skill, or tool, taking remarkable athlete and Jack of All Trades
   * into account.
   * @param multiplier      Multiplier stored on the actor.
   * @param ability         Ability associated with this proficiency.
   * @param options
   * @param options.skill   Skill associated with this proficiency.
   * @param options.tool    Tool associated with this proficiency.
   * @returns The proficiency instance.
   */
  calculateAbilityCheckProficiency(
    multiplier: number,
    ability: dnd5e.types.Ability.TypeKey,
    options?: { skill?: dnd5e.types.Skill.TypeKey; tool?: dnd5e.types.Tool.TypeKey },
  ): Proficiency;
  /**
   * Calculate proficiency, applying specific logic for tools.
   * @param multiplier      Multiplier stored on the actor.
   * @param ability         Ability associated with this proficiency.
   * @param options
   * @param options.skill   Skill associated with this proficiency.
   * @param options.tool    Tool associated with this proficiency.
   * @returns The proficiency instance.
   */
  calculateToolProficiency(
    multiplier: number,
    ability: dnd5e.types.Ability.TypeKey,
    options?: { skill?: dnd5e.types.Skill.TypeKey; tool?: dnd5e.types.Tool.TypeKey },
  ): Proficiency;
  /**
   * Calculate proficiency for a given actor using either a skill, a tool, or both.
   * @param actor           The actor.
   * @param abilityId       The ability used with the check.
   * @param options
   * @param options.skill   The skill.
   * @param options.tool    The tool.
   * @returns The proficiency instance, or null if no actor provided.
   */
  static calculateSkillToolProficiency(
    actor: Actor.Implementation,
    abilityId: dnd5e.types.Ability.TypeKey,
    options?: { skill?: dnd5e.types.Skill.TypeKey; tool?: dnd5e.types.Tool.TypeKey },
  ): Proficiency | null;
}

export declare namespace CommonTemplate {
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Actor.Common.BaseSchema,
    dnd5e.types.DataModelConfig.Actor.common.OverrideSchema
  >;
  type BaseData = dnd5e.types.DataModelConfig.Actor.common.OverrideBase;
  type DerivedData = dnd5e.types.DataModelConfig.Actor.common.OverrideDerived;
}
