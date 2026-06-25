/**
 * A template for all actors that are creatures.
 * Extends CommonTemplate with `bonuses`, the CONFIG-keyed `skills` + `tools` maps, and `spells`.
 */

import { CommonTemplate } from "./common.mjs";
import type ActorDataModel from "../../abstract/actor-data-model.mjs";
import type Proficiency from "../../../documents/actor/proficiency.mjs";

declare global {
  namespace dnd5e.types.Actor.Creature {
    type AttackBonusesField = foundry.data.fields.SchemaField<{
      attack: dnd5e.types.fields.FormulaField<{ required: true }>;
      damage: dnd5e.types.fields.FormulaField<{ required: true }>;
    }>;

    type BonusesField = foundry.data.fields.SchemaField<{
      mwak: dnd5e.types.Actor.Creature.AttackBonusesField;
      rwak: dnd5e.types.Actor.Creature.AttackBonusesField;
      msak: dnd5e.types.Actor.Creature.AttackBonusesField;
      rsak: dnd5e.types.Actor.Creature.AttackBonusesField;
      abilities: foundry.data.fields.SchemaField<{
        check: dnd5e.types.fields.FormulaField<{ required: true }>;
        save: dnd5e.types.fields.FormulaField<{ required: true }>;
        skill: dnd5e.types.fields.FormulaField<{ required: true }>;
      }>;
      spell: foundry.data.fields.SchemaField<{
        dc: dnd5e.types.fields.FormulaField<{ required: true; deterministic: true }>;
      }>;
    }>;

    /** creature.mjs — per-skill source schema. */
    interface SkillSchema extends foundry.data.fields.DataSchema {
      value: foundry.data.fields.NumberField<{ required: true; nullable: false; min: 0; max: 2; step: 0.5; initial: 0 }>;
      ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey, { required: true; blank: false; initial: "dex" }>;
      bonuses: foundry.data.fields.SchemaField<{
        check: dnd5e.types.fields.FormulaField<{ required: true }>;
        passive: dnd5e.types.fields.FormulaField<{ required: true }>;
      }>;
      roll: foundry.data.fields.SchemaField<{
        min: foundry.data.fields.NumberField<{ nullable: true; integer: true; initial: null }>;
        max: foundry.data.fields.NumberField<{ nullable: true; integer: true; initial: null }>;
        mode: foundry.data.fields.NumberField<{ required: true; nullable: false; initial: 0 }>;
      }>;
    }
    type SkillsField = dnd5e.types.fields.MappingField<
      foundry.data.fields.SchemaField<dnd5e.types.Actor.Creature.SkillSchema>,
      dnd5e.types.Skill.TypeKey
    >;

    /** creature.mjs — per-tool source schema. */
    interface ToolSchema extends foundry.data.fields.DataSchema {
      value: foundry.data.fields.NumberField<{ required: true; nullable: false; min: 0; max: 2; step: 0.5; initial: 0 }>;
      ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey, { required: true; blank: false; initial: "int" }>;
      bonuses: foundry.data.fields.SchemaField<{ check: dnd5e.types.fields.FormulaField<{ required: true }> }>;
      roll: foundry.data.fields.SchemaField<{
        min: foundry.data.fields.NumberField<{ nullable: true; integer: true; initial: null }>;
        max: foundry.data.fields.NumberField<{ nullable: true; integer: true; initial: null }>;
        mode: foundry.data.fields.NumberField<{ required: true; nullable: false; initial: 0 }>;
      }>;
    }
    type ToolsField = dnd5e.types.fields.MappingField<
      foundry.data.fields.SchemaField<dnd5e.types.Actor.Creature.ToolSchema>,
      dnd5e.types.Tool.TypeKey
    >;

    /** Spell-slot map keys: `pact` + `spell1`…`spell9` (level 0 has no slots). */
    type SpellLevelKey = "pact" | `spell${Exclude<dnd5e.types.Spellcasting.Level.TypeKey, "0">}`;
    type SpellsField = dnd5e.types.fields.MappingField<
      foundry.data.fields.SchemaField<{
        value: foundry.data.fields.NumberField<{ nullable: false; integer: true; min: 0; initial: 0 }>;
        override: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
      }>,
      dnd5e.types.Actor.Creature.SpellLevelKey
    >;

    type BaseSchema = dnd5e.types.MergeSchemas<
      CommonTemplate.Schema,
      {
        bonuses: dnd5e.types.Actor.Creature.BonusesField;
        skills: dnd5e.types.Actor.Creature.SkillsField;
        tools: dnd5e.types.Actor.Creature.ToolsField;
        spells: dnd5e.types.Actor.Creature.SpellsField;
      }
    >;

    /** Derived per-skill shape (prepareSkill). */
    type SkillData = dnd5e.types.PrettifyType<
      dnd5e.types.InitializedOf<dnd5e.types.Actor.Creature.SkillSchema> & {
        ability: dnd5e.types.Ability.TypeKey; // normalized/guaranteed present
        effectValue: number;
        bonus: number;
        mod: number;
        prof: Proficiency;
        proficient: number; // = prof.multiplier (numeric)
        total: number;
        passive: number;
        merged?: boolean;
      }
    >;

    /** Derived per-tool shape (prepareTools). */
    type ToolData = dnd5e.types.PrettifyType<
      dnd5e.types.InitializedOf<dnd5e.types.Actor.Creature.ToolSchema> & {
        effectValue: number;
        bonus: number;
        mod: number;
        prof: Proficiency;
        total: number;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig.Actor.creature {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

export declare class CreatureTemplate<
  Schema extends foundry.data.fields.DataSchema = CreatureTemplate.Schema,
  BaseData extends fvttUtils.AnyObject = CreatureTemplate.BaseData,
  DerivedData extends fvttUtils.AnyObject = CreatureTemplate.DerivedData,
> extends CommonTemplate<Schema, BaseData, DerivedData> {
  static override defineSchema(): CreatureTemplate.Schema;

  /**
   * Populate the proper initial abilities for the skills.
   * @param key     Key for which the initial data will be created.
   * @param initial The initial skill object created by SkillData.
   * @returns       Initial skills object with the ability defined.
   * @private
   */
  static _initialSkillValue(key: string, initial: object): object;

  /**
   * Helper for building the default list of spell levels.
   * @type {string[]}
   * @private
   */
  static get _spellLevels(): dnd5e.types.Actor.Creature.SpellLevelKey[];

  /**
   * Whether this Actor type represents a creature.
   * @returns {boolean}
   */
  get isCreature(): true;

  /**
   * Prepare modifiers and other values for skills.
   * @param options                 Additional options.
   * @param options.rollData        Roll data used to calculate bonuses.
   * @param options.originalSkills  Original skills data for transformed actors.
   */
  prepareSkills(options?: {
    rollData?: dnd5e.types.documents.ActorRollData;
    originalSkills?: Record<string, dnd5e.types.Actor.Creature.SkillData>;
  }): void;
  /**
   * Prepares data for a specific skill.
   * @param skillId                    The id of the skill to prepare data for.
   * @param options                    Additional options.
   * @param options.skillData          The base skill data for this skill.
   *                                   If undefined, `this.system.skill[skillId]` is used.
   * @param options.rollData           RollData for this actor, used to evaluate dice terms in bonuses.
   *                                   If undefined, `this.getRollData()` is used.
   * @param options.originalSkills     Original skills if actor is polymorphed.
   *                                   If undefined, the skills of the actor identified by
   *                                   `this.flags.dnd5e.originalActor` are used.
   * @param options.globalBonuses      Global ability bonuses for this actor.
   *                                   If undefined, `this.system.bonuses.abilities` is used.
   * @param options.globalCheckBonus   Global check bonus for this actor.
   *                                   If undefined, `globalBonuses.check` will be evaluated using `rollData`.
   * @param options.globalSkillBonus   Global skill bonus for this actor.
   *                                   If undefined, `globalBonuses.skill` will be evaluated using `rollData`.
   * @param options.ability            The ability to compute bonuses based on.
   *                                   If undefined, skillData.ability is used.
   * @returns The prepared skill data.
   */
  prepareSkill(
    skillId: dnd5e.types.Skill.TypeKey,
    options?: {
      skillData?: dnd5e.types.Actor.Creature.SkillData;
      rollData?: dnd5e.types.documents.ActorRollData;
      originalSkills?: Record<string, dnd5e.types.Actor.Creature.SkillData>;
      globalBonuses?: object;
      globalCheckBonus?: number;
      globalSkillBonus?: number;
      ability?: dnd5e.types.Ability.TypeKey;
    },
  ): dnd5e.types.Actor.Creature.SkillData;
  /**
   * Prepare tool checks. Mutates the values of system.tools.
   * @param options           Additional options.
   * @param options.rollData  Roll data used to calculate bonuses.
   */
  prepareTools(options?: { rollData?: dnd5e.types.documents.ActorRollData }): void;

  override getRollData(options?: { deterministic?: boolean }): ActorDataModel.RollData<this> & {
    classes: Record<string, object>;
    subclasses: Record<string, { levels: number }>;
  };
}

export declare namespace CreatureTemplate {
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Actor.Creature.BaseSchema,
    dnd5e.types.DataModelConfig.Actor.creature.OverrideSchema
  >;
  type BaseData = dnd5e.types.DataModelConfig.Actor.creature.OverrideBase;
  type DerivedData = dnd5e.types.DataModelConfig.Actor.creature.OverrideDerived;
}
