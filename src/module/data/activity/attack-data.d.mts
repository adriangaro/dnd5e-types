/**
 * Data model for an attack activity.
 *
 * SIMPLE activity DATA MODEL: adds top-level `attack` + `damage` SchemaFields. Derived prep only
 * populates already-declared schema fields (`attack.type.value`/`classification`, `damage.parts`)
 * and writes `labels.modifier`/`labels.toHit` onto the base `labels` record — so no DerivedData
 * overlay is needed.
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Attack {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "attack",
          "attack",
          "attack"
        >;
        attack: foundry.data.fields.SchemaField<{
          ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: true; blank: true }>;
          bonus: dnd5e.types.fields.FormulaField;
          critical: foundry.data.fields.SchemaField<{
            threshold: foundry.data.fields.NumberField<{ integer: true; positive: true }>;
          }>;
          flat: foundry.data.fields.BooleanField;
          type: foundry.data.fields.SchemaField<{
            value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.AttackType.TypeKey | "", { required: true; blank: true }>;
            classification: dnd5e.types.fields.RestrictedStringField<dnd5e.types.AttackClassification.TypeKey | "", { required: true; blank: true }>;
          }>;
        }>;
        damage: foundry.data.fields.SchemaField<{
          critical: foundry.data.fields.SchemaField<{
            bonus: dnd5e.types.fields.FormulaField;
          }>;
          includeBase: foundry.data.fields.BooleanField<{ initial: true }>;
          parts: foundry.data.fields.ArrayField<dnd5e.types.fields.DamageField>;
        }>;
      }
    >;
  }
}

declare class BaseAttackActivityData extends BaseActivityData<dnd5e.types.Activity.Attack.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Attack.Schema;

  /**
   * Abilities that could potentially be used with this attack. Unless a specific ability is specified then
   * whichever ability has the highest modifier will be selected when making an attack.
   */
  get availableAbilities(): Set<dnd5e.types.Ability.TypeKey>;

  /** Critical threshold for attacks with this activity. */
  get criticalThreshold(): number;

  /** Potential attack types when attacking with this activity. */
  get validAttackTypes(): Set<dnd5e.types.AttackType.TypeKey>;

  /**
   * Get the roll parts used to create the attack roll.
   * @param config - Optional configuration
   */
  getAttackData(config?: { ammunition?: string; attackMode?: string; situational?: string }): { data: object; parts: string[] };

  /**
   * The game term label for this attack.
   * @param attackMode - The mode the attack was made with.
   */
  getActionLabel(attackMode?: string): string;

  /**
   * Create a label based on this activity's settings and, if contained in a weapon, additional details from the weapon.
   */
  getRangeLabel(): string;
}

export default BaseAttackActivityData;
