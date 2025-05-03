import FormulaField from "../fields/formula-field.mjs";
import DamageField from "../shared/damage-field.mjs";
import BaseActivityData from "./base-activity.mjs";


/**
 * Data model for an attack activity.
 */
declare class AttackActivityData extends BaseActivityData<
  'attack',
  {
    attack: foundry.data.fields.SchemaField<{
      ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | 'none' | 'spellcasting'>,
      bonus: FormulaField,
      critical: foundry.data.fields.SchemaField<{
        threshold: foundry.data.fields.NumberField<{ integer: true, positive: true }>
      }>,
      flat: foundry.data.fields.BooleanField,
      type: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.StringField,
        classification: foundry.data.fields.StringField
      }>
    }>,
    damage: foundry.data.fields.SchemaField<{
      critical: foundry.data.fields.SchemaField<{
        bonus: FormulaField
      }>,
      includeBase: foundry.data.fields.BooleanField<{ initial: true }>,
      parts: foundry.data.fields.ArrayField<DamageField>
    }>
  }
> {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */
  
  /**
   * Abilities that could potentially be used with this attack. Unless a specific ability is specified then
   * whichever ability has the highest modifier will be selected when making an attack.
   */
  get availableAbilities(): Set<dnd5e.types.Ability.TypeKey>

  /* -------------------------------------------- */

  /**
   * Critical threshold for attacks with this activity.
   */
  get criticalThreshold(): number

  /* -------------------------------------------- */

  /**
   * Potential attack types when attacking with this activity.
   */
  get validAttackTypes(): Set<dnd5e.types.Attack.TypeKey>


  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * The game term label for this attack.
   */
  getActionLabel(attackMode: dnd5e.types.Attack.ModeTypeKey): string

  /* -------------------------------------------- */

  /**
   * Get the roll parts used to create the attack roll.
   */
  getAttackData(config?: { ammunition: string, attackMode: dnd5e.types.Attack.ModeTypeKey, situational: string }): { data: object, parts: string[] }

  /* -------------------------------------------- */

  /**
   * Get the roll parts used to create the damage rolls.
   */
  getDamageConfig(config: Partial<AttackActivityData.ProcessConfiguration>): AttackActivityData.ProcessConfiguration
  /* -------------------------------------------- */

  /**
   * Create a label based on this activity's settings and, if contained in a weapon, additional details from the weapon.
   */
  getRangeLabel(): string
}

declare namespace AttackActivityData {
  interface ProcessConfiguration extends dnd5e.dice.DamageRoll.ProcessConfiguration {
    ammunition: Item.OfType<'consumable'>;
    attackMode: dnd5e.types.Attack.ModeTypeKey
  }
}


export default AttackActivityData;


declare global {
  namespace dnd5e.types {
    namespace Attack {
      interface DefaultAttackTypes extends Record<string, boolean> {
        melee: true
        ranged: true
      }

       /**
       * Override interface for declaration merging.
       * NOTE: Modifying or adding attack types is not currently supported
       * by the core D&D5e system logic. This interface exists primarily
       * for potential future expansion or for use by custom systems/modules
       * that specifically implement handling for new movement types.
       * Attempting to add types here without corresponding system support
       * will likely have no effect.
       *
       * @example No overrides are supported by default.
       */
      // Defined with `never` key to prevent accidental merging in standard setups.
      interface OverrideTypes extends Record<never, boolean | never> { }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultAttackTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      interface DefaultAttackModeTypes extends Record<string, boolean> {
        oneHanded: true
        twoHanded: true
        offhand: true
        ranged: true
        thrown: true
        "thrown-offhand": true
      }

       /**
       * Override interface for declaration merging.
       * NOTE: Modifying or adding attack modes is not currently supported
       * by the core D&D5e system logic. This interface exists primarily
       * for potential future expansion or for use by custom systems/modules
       * that specifically implement handling for new movement types.
       * Attempting to add types here without corresponding system support
       * will likely have no effect.
       *
       * @example No overrides are supported by default.
       */
      // Defined with `never` key to prevent accidental merging in standard setups.
      interface OverrideModeTypes extends Record<never, boolean | never> { }

      type ModeTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultAttackModeTypes,
        OverrideModeTypes
      >;
      type ModeTypeKey = dnd5e.types.ExtractKeys<ModeTypes>;

      interface DefaultClassificationTypes extends Record<string, boolean> {
        weapon: true
        spell: true
        unarmed: true
      }

       /**
       * Override interface for declaration merging.
       * NOTE: Modifying or adding attack modes is not currently supported
       * by the core D&D5e system logic. This interface exists primarily
       * for potential future expansion or for use by custom systems/modules
       * that specifically implement handling for new movement types.
       * Attempting to add types here without corresponding system support
       * will likely have no effect.
       *
       * @example No overrides are supported by default.
       */
      // Defined with `never` key to prevent accidental merging in standard setups.
      interface OverrideClassificationTypes extends Record<never, boolean | never> { }

      type ClassificationTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultClassificationTypes,
        OverrideClassificationTypes
      >;
      type ClassificationTypeKey = dnd5e.types.ExtractKeys<ClassificationTypes>;
    }

    interface DND5EConfig {
      /**
       * Classifications of attacks based on what is performing them.
       */
      attackClassifications: {
        [K in Attack.ClassificationTypeKey]: {
          label: string
        }
      }
      /**
       * Types of attacks based on range.
       */
      attackTypes: {
        [K in Attack.TypeKey]: {
          label: string
        }
      }
      /**
       * Attack modes available for weapons.
       */
      attackModes: {
        [K in Attack.ModeTypeKey]: {
          label: string
        }
      }
    }
  }
}