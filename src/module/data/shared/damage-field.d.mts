/**
 * Field for storing damage data.
 *
 * `DamageData extends foundry.abstract.DataModel` stores a single damage part:
 * `{ number, denomination, bonus, types, custom, modifiers, scaling }`. `DamageField` is the
 * `EmbeddedDataField` wrapper that embeds `DamageData`.
 *
 * Fields with no explicit `nullable` keep dnd5e's exact options (so e.g. `number`/`denomination`
 * are `number | null | undefined` per the underlying `NumberField` defaults). `types` is tightened
 * to `RestrictedStringField<dnd5e.types.Damage.TypeKey>` per the strictness mandate; `modifiers`
 * is a plain `Set<string>` (untyped `StringField`). The derived getters (`formula`) and the
 * `_automaticFormula`/`_manualFormula`/`scaledFormula`/`steppedDenomination` helpers return
 * trivial `string`/`number | null` and are mirrored for callers.
 */

import type Scaling from "../../../documents/scaling.mjs";

declare global {
  namespace dnd5e.types.fields {
    namespace DamageData {
      interface Schema extends foundry.data.fields.DataSchema {
        number: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
        denomination: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
        bonus: dnd5e.types.fields.FormulaField;
        types: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Damage.TypeKey, { required: true; blank: false }>
        >;
        custom: foundry.data.fields.SchemaField<{
          enabled: foundry.data.fields.BooleanField;
          formula: dnd5e.types.fields.FormulaField;
        }>;
        modifiers: foundry.data.fields.SetField<foundry.data.fields.StringField>;
        scaling: foundry.data.fields.SchemaField<{
          mode: dnd5e.types.fields.RestrictedStringField<dnd5e.types.DamageScalingMode.TypeKey | "", { required: true; blank: true }>;
          number: foundry.data.fields.NumberField<{ initial: 1; min: 0; integer: true }>;
          formula: dnd5e.types.fields.FormulaField;
        }>;
      }
    }

    /** Options to configure damage formula generation (`_types.mjs` DamageFormulaOptions). */
    interface DamageFormulaOptions {
      /** Additional modifiers to apply to the formula, if possible. A `false` value will remove modifiers provided by damage data. */
      modifiers?: Set<string> | false;
    }

    /** `EmbeddedDataField(DamageData)` — embeds the damage part model. */
    type DamageField<
      Options extends foundry.data.fields.EmbeddedDataField.Options<
        typeof DamageData
      > = foundry.data.fields.EmbeddedDataField.DefaultOptions,
    > = foundry.data.fields.EmbeddedDataField<typeof DamageData, Options>;
  }
}

declare class DamageData extends foundry.abstract.DataModel<dnd5e.types.fields.DamageData.Schema> {
  static defineSchema(): dnd5e.types.fields.DamageData.Schema;

  /** The default damage formula (`custom.enabled` → manual, else automatic). */
  get formula(): string;

  /** Produce the auto-generated formula from `number`/`denomination`/`modifiers`/`bonus`. */
  protected _automaticFormula(increase?: number, options?: dnd5e.types.fields.DamageFormulaOptions): string;

  /** Produce the manual formula from `custom.formula` and `modifiers` (if possible). */
  protected _manualFormula(options?: dnd5e.types.fields.DamageFormulaOptions): string;

  /**
   * Scale the damage by a number of steps using its configured scaling configuration.
   * `increase` accepts a step count or a `Scaling` document.
   */
  scaledFormula(
    increase: number | Scaling,
    options?: dnd5e.types.fields.DamageFormulaOptions,
  ): string;

  /** Step the die denomination up or down, sticking to proper die sizes (null if below min). */
  steppedDenomination(steps?: number): number | null;
}

declare namespace DamageData {
  type Schema = dnd5e.types.fields.DamageData.Schema;
}

declare class DamageField<
  Options extends foundry.data.fields.EmbeddedDataField.Options<
    typeof DamageData
  > = foundry.data.fields.EmbeddedDataField.DefaultOptions,
> extends foundry.data.fields.EmbeddedDataField<typeof DamageData, Options> {}

export { DamageData, DamageField };
export default DamageData;
