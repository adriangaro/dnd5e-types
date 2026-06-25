/**
 * Data model for an damage activity.
 *
 * Simple activity DATA MODEL: adds a top-level `damage` SchemaField (critical allow/bonus + parts).
 * `prepareFinalData` only writes `labels.damage`/`labels.damages` into the base `labels` record via
 * `prepareDamageLabel`, so no DerivedData overlay is required.
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Damage {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "damage",
          "damage",
          "damage"
        >;
        damage: foundry.data.fields.SchemaField<{
          critical: foundry.data.fields.SchemaField<{
            allow: foundry.data.fields.BooleanField;
            bonus: dnd5e.types.fields.FormulaField;
          }>;
          parts: foundry.data.fields.ArrayField<dnd5e.types.fields.DamageField>;
        }>;
      }
    >;
  }
}

/**
 * Data model for an damage activity.
 * @extends {BaseActivityData<DamageActivityData>}
 * @mixes DamageActivityData
 */
declare class BaseDamageActivityData extends BaseActivityData<dnd5e.types.Activity.Damage.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Damage.Schema;

  static override transformTypeData(source: object, activityData: object, options: object): object;

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  override prepareFinalData(rollData?: dnd5e.types.documents.ActivityRollData): void;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /** @inheritDoc */
  override getDamageConfig(
    config?: Partial<dnd5e.types.Dice.DamageRollProcessConfiguration>,
    options?: {
      formulaOptions?: Partial<dnd5e.types.data.shared.DamageFormulaOptions>;
      rollData?: dnd5e.types.documents.ActivityRollData;
    },
  ): dnd5e.types.Dice.DamageRollProcessConfiguration;
}

export default BaseDamageActivityData;
