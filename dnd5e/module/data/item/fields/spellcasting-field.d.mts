import FormulaField from "../../fields/formula-field.mjs";


/**
 * Data field for class & subclass spellcasting information.
 */
declare class SpellcastingField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends SpellcastingField.Options<
    Schema
  > = SpellcastingField.DefaultOptions,
  const AssignmentType = SpellcastingField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = SpellcastingField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = SpellcastingField.PersistedType<
    Schema, Options
  >
> extends  foundry.data.fields.SchemaField<
  SpellcastingField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType

> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)
}

declare namespace SpellcastingField {
  type BaseFields = {
    progression: foundry.data.fields.StringField<{
      initial: "none",
      blank: false,
      label: "DND5E.SpellProgression"
    }>,
    ability: foundry.data.fields.StringField<{ label: "DND5E.SpellAbility" }>,
    preparation: foundry.data.fields.SchemaField<{
      formula: FormulaField<{ label: "DND5E.SpellPreparation.Formula" }>
    }>
  }

  type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
  > = fvttUtils.SimpleMerge<
    BaseFields,
    Fields
  >

  type Options<
    Fields extends foundry.data.fields.DataSchema
  > = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.Options<
      GetSchema<Fields>
    >,
    {
    }
  >;

  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.DefaultOptions,
    {
    }
  >
  type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    GetSchema<Fields>,
    Opts
  >

  type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = dnd5e.types.DeepMerge<
    foundry.data.fields.SchemaField.Internal.InitializedType<
      GetSchema<Fields>,
      Opts
    >,
    {
      preparation: {
        max: number
      },
      type: string,
      levels: any // TODO:
      attack: number,
      save: number
    }
  >

  type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields>,
    Opts
  >
}
declare global {
  namespace dnd5e.types {
    namespace Spellcasting {
      interface DefaultSpellcastingTypes {
        leveled: 'artificer' | 'full' | 'half' | 'third';
        pact: true;
      }

      /**
       * Override interface for declaration merging.
       * Add custom currency types and their conversion rate relative to the base unit (GP=1).
       * @example
       * declare global {
       * namespace dnd5e.types.Spellcasting {
       * interface OverrideTypes {
       * "rune": "small" | "big"
       * }
       * }
       * }
       */
      // Defined with `never` key to prevent accidental merging in standard setups.
      interface OverrideTypes extends Record<string, string | boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultSpellcastingTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      type SpellCastingConfig<T extends TypeKey> = {
        img?: string,
        label: string,
        progression: Types[T] extends string ? Record<
          Types[T],
          {
            label: string,
            roundUp?: boolean,
            divisor: number
          }
        > : undefined,
        shortRest?: boolean
      }
    }
  }

  interface DND5EConfig {
    spellcastingTypes: {
      [K in dnd5e.types.Spellcasting.TypeKey]: dnd5e.types.Spellcasting.SpellCastingConfig<K>
    }
  }
}

export default SpellcastingField