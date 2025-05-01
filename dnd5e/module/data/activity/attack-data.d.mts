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
   * @type {Set<string>}
   */
  get validAttackTypes(): Set<"melee" | "ranged">


  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * The game term label for this attack.
   */
  getActionLabel(attackMode: AttackActivityData.AttackMode): string

  /* -------------------------------------------- */

  /**
   * Get the roll parts used to create the attack roll.
   */
  getAttackData(config?: { ammunition: string, attackMode: AttackActivityData.AttackMode, situational: string }): { data: object, parts: string[] }

  /* -------------------------------------------- */

  /**
   * Get the roll parts used to create the damage rolls.
   */
  getDamageConfig(config: Partial<AttackActivityData.ProcessConfiguration>): AttackActivityData.ProcessConfiguration
  /* -------------------------------------------- */

  /**
   * Create a label based on this activity's settings and, if contained in a weapon, additional details from the weapon.
   * @returns {string}
   */
  getRangeLabel(): string
}

declare namespace AttackActivityData {
  type AttackMode = "oneHanded" | "twoHanded" | "offhand" | "thrown" | "thrown-offhand"
  interface ProcessConfiguration extends dnd5e.dice.DamageRoll.ProcessConfiguration {
    ammunition: Item.OfType<'consumable'>;
    attackMode: AttackMode
  }
}


export default AttackActivityData;