/**
 * A data model that represents the previous transformation preset.
 *
 * World-setting model storing the previous transformation preset
 * (`game.settings.get("dnd5e", "transformationSettings")`). Also embedded (nullable) on the Transform
 * activity's `settings` field. The `keep`/`merge`/`effects`/`other` sets store
 * `CONFIG.DND5E.transformation[category]` keys; `spellLists` is the strict SpellListType domain.
 */

declare global {
  namespace dnd5e.types.Settings {
    namespace Transformation {
      type Schema = {
        effects: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.Transformation.EffectKey>>;
        keep: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.Transformation.KeepKey>>;
        merge: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.Transformation.MergeKey>>;
        minimumAC: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        other: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.Transformation.OtherKey>>;
        preset: foundry.data.fields.StringField<{ initial: null; nullable: true }>;
        spellLists: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.SpellListType.TypeKey>
        >;
        tempFormula: dnd5e.types.fields.FormulaField;
        transformTokens: foundry.data.fields.BooleanField<{ initial: true }>;
      };
    }
  }
}

declare class TransformationSetting extends foundry.abstract.DataModel<
  dnd5e.types.Settings.Transformation.Schema,
  foundry.abstract.DataModel.Any
> {
  static override LOCALIZATION_PREFIXES: string[];

  static override defineSchema(): dnd5e.types.Settings.Transformation.Schema;

  /** Categories that define sets of booleans. */
  static BOOLEAN_CATEGORIES: readonly ["keep", "merge", "effects", "other"];

  /**
   * Generate form categories populated with data from this settings object.
   * @param options
   * @param options.host - Actor being transformed. Should only be provided if using the dialog.
   * @param options.prefix - Prefix before the field name.
   */
  createFormCategories(options?: { host?: globalThis.Actor.Implementation; prefix?: string }): Array<{ category: string; title: string; hint: string; settings: object[] }>;

  /**
   * Create a field entry for form rendering for a non-boolean field.
   * @param name - Name of the field.
   * @param field - Underlying data field.
   * @param options
   * @param options.host - Actor being transformed.
   * @param options.prefix - Prefix before the field name.
   */
  createFormField(name: string, field: foundry.data.fields.DataField.Any, options: { prefix?: string; host?: globalThis.Actor.Implementation }): object;
}

export default TransformationSetting;
