/**
 * Field for storing target data.
 *
 * `static prepareData` derives `scalar`/`dimensions`/`labels` overlays onto the initialized
 * value; the derived shapes are surfaced on {@link TargetField.TargetData} for reuse.
 */

declare global {
  namespace dnd5e.types.fields {
    type TargetField<Fields extends foundry.data.fields.DataSchema = {}> =
      foundry.data.fields.SchemaField<dnd5e.types.MergeSchemas<dnd5e.types.fields.TargetField.Schema, Fields>>;

    namespace TargetField {
      /** `template` sub-schema. */
      interface TemplateSchema extends foundry.data.fields.DataSchema {
        count: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        contiguous: foundry.data.fields.BooleanField;
        stationary: foundry.data.fields.BooleanField;
        type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.AreaTargetType.TypeKey | "", { required: false; blank: true }>;
        size: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        width: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        height: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.DistanceUnit.TypeKey, { required: true; blank: false }>;
      }

      /** `affects` sub-schema. */
      interface AffectsSchema extends foundry.data.fields.DataSchema {
        count: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.IndividualTargetType.TypeKey | "", { required: false; blank: true }>;
        choice: foundry.data.fields.BooleanField;
        special: foundry.data.fields.StringField;
      }

      interface Schema extends foundry.data.fields.DataSchema {
        template: foundry.data.fields.SchemaField<dnd5e.types.fields.TargetField.TemplateSchema>;
        affects: foundry.data.fields.SchemaField<dnd5e.types.fields.TargetField.AffectsSchema>;
      }

      /** Template dimension labels, keyed by axis (`prepareData`/`templateDimensions`). */
      interface Dimensions {
        size: string;
        width?: string;
        height?: string;
      }

      /** Labels generated for the `template` portion by `prepareData`. */
      interface TemplateLabels {
        statblock?: string;
        label?: string;
        size?: string;
        description?: string;
        type?: string;
      }

      /** Labels generated for the `affects` portion by `prepareData`. */
      interface AffectsLabels {
        description: string;
        sheet: string;
        statblock: string;
      }

      /**
       * The `target` shape after `prepareData`: the initialized source for each sub-schema
       * plus the derived flags/labels. `template` gains `dimensions`/`label`/`labels`;
       * `affects` gains `scalar`/`labels`.
       */
      type TargetData = dnd5e.types.PrettifyType<{
        template: dnd5e.types.PrettifyType<
          dnd5e.types.InitializedOf<TemplateSchema> & {
            dimensions: dnd5e.types.fields.TargetField.Dimensions;
            label: string;
            labels: dnd5e.types.fields.TargetField.TemplateLabels;
          }
        >;
        affects: dnd5e.types.PrettifyType<
          dnd5e.types.InitializedOf<AffectsSchema> & {
            scalar: boolean;
            labels: dnd5e.types.fields.TargetField.AffectsLabels;
          }
        >;
      }>;
    }
  }
}

declare class TargetField<
  Fields extends foundry.data.fields.DataSchema = {},
> extends foundry.data.fields.SchemaField<
  dnd5e.types.MergeSchemas<dnd5e.types.fields.TargetField.Schema, Fields>
> {
  /**
   * Prepare data for this field. Should be called during the `prepareFinalData` stage.
   * @this {ItemDataModel|BaseActivityData}
   * @param rollData - Roll data used for formula replacements.
   * @param labels   - Object in which to insert generated labels.
   */
  static prepareData(
    rollData: dnd5e.types.documents.ItemRollData | dnd5e.types.documents.ActivityRollData,
    labels?: object,
  ): void;

  /**
   * Create the template dimensions labels for a template type.
   * @param type - Area of effect type.
   * @returns Template dimension labels keyed by axis.
   */
  static templateDimensions(type: string): dnd5e.types.fields.TargetField.Dimensions;
}

export { TargetField };
export {};
