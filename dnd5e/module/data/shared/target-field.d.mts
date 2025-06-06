import type { ItemDataModel } from "../abstract.mjs"
import type BaseActivityData from "../activity/base-activity.mjs"

declare class TargetField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends TargetField.Options<
    Schema
  > = TargetField.DefaultOptions,
  const AssignmentType = TargetField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = TargetField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = TargetField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  TargetField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)

  static prepareData(this: BaseActivityData | ItemDataModel, rollData: object, labels?: object): void
  static templateDimensions(type: string): { size: string, width?: string, height?: string }
}

declare namespace TargetField {
  type BaseFields = {
    template: foundry.data.fields.SchemaField<{
      count: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      contiguous: foundry.data.fields.BooleanField,
      type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Target.TemplateTypeKey | ''>,
      size: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      width: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      height: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Distance.TypeKey | ''>
    }>,
    affects: foundry.data.fields.SchemaField<{
      count: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Target.TypeKey | ''>,
      choice: foundry.data.fields.BooleanField,
      special: foundry.data.fields.StringField
    }>,
  }

  type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
  > = fvttUtils.SimpleMerge<
    BaseFields,
    Fields
  >

  type Options<
    Fields extends foundry.data.fields.DataSchema,
  > = foundry.data.fields.SchemaField.Options<
    GetSchema<Fields>
  >

  export import DefaultOptions = foundry.data.fields.SchemaField.DefaultOptions

  type MergedOptions<
    Fields extends foundry.data.fields.DataSchema, Opts extends Options<GetSchema<Fields>>
  > = fvttUtils.SimpleMerge<DefaultOptions, Opts>;

  type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    GetSchema<Fields>,
    MergedOptions<Fields, Opts>
  >

  type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = fvttUtils.Merge<
    foundry.data.fields.SchemaField.Internal.InitializedType<
      GetSchema<Fields>,
      MergedOptions<Fields, Opts>
    >,
    {
      template: {
        dimensions: ReturnType<typeof TargetField['templateDimensions']>
      },
      affects: {
        scaler: boolean,
        labels: Record<string, string>
      }
    }
  >

  type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields>,
    MergedOptions<Fields, Opts>
  >
}

export default TargetField

declare global {
  namespace dnd5e.types {
    namespace Target {
      interface DefaultTargetTypes extends Record<string, true> {
        self: true
        ally: true
        enemy: true
        creature: true
        object: true
        space: true
        creatureOrObject: true
        any: true
        willing: true
      }

      interface OverrideTypes extends Record<string, true | never> {

      }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultTargetTypes,
        OverrideTypes
      >

      type TypeKey = dnd5e.types.ExtractKeys<Types>;
      interface DefaultTemplateTypes extends Record<string, true> {
        circle: true
        cone: true
        cube: true
        cylinder: true
        line: true
        radius: true
        sphere: true
        square: true
        wall: true
      }

      interface OverrideTemplateTypes extends Record<string, true | never> {

      }

      type TemplateTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultTemplateTypes,
        OverrideTemplateTypes
      >

      type TemplateTypeKey = dnd5e.types.ExtractKeys<TemplateTypes>;

      interface IndividualTargetDefinition {
        /**
         * Localized label for this type.
         */
        label: string;
        /**
         * Localization path for counted plural forms. Only necessary for scalar types.
         */
        counted?: string;
        /**
         * Can this target take an associated numeric value?
         */
        scalar?: boolean;
      }

      type SizeType = "radius" | "width" | "height" | "length" | "thickness"
      
      interface AreaTargetDefinition {
        /**
         * Localized label for this type.
         */
        label: string;
        /**
         * Localization path for counted plural forms.
         */
        counted: string;
        /**
         * Type of `MeasuredTemplate` create for this target type.
         */
        template: string;
        /**
         * Reference to a rule page describing this area of effect.
         */
        reference?: string;
        /**
         * List of available sizes for this template. Options are chosen from the list:
         * "radius", "width", "height", "length", "thickness". No more than 3 dimensions may
         * be specified.
         */
        sizes?: SizeType[];
        /**
         * Is this a standard area of effect as defined explicitly by the rules?
         */
        standard?: boolean;
      }
    }

    interface DND5EConfig {
      /**
       * Targeting types that apply to one or more distinct targets.
       */
      individualTargetTypes: {
        [K in Target.TypeKey]: Target.IndividualTargetDefinition
      }
      /**
       * Targeting types that cover an area.
       */
      areaTargetTypes: {
        [K in Target.TemplateTypeKey]: Target.AreaTargetDefinition
      }
      areaTargetOptions: dnd5e.types.FormSelectOption[]

      /**
       * The types of single or area targets which can be applied to abilities.
       */
      targetTypes: {
        [K in Target.TypeKey]: string
      } & {
        [K in Target.TemplateTypeKey]: string
      }

    }
  }
}