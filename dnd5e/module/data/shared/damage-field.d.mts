import Scaling from "../../documents/scaling.mjs";

type DamageDataSchema<Types extends string = dnd5e.types.Damage.TypeKey> = {
  number: foundry.data.fields.NumberField<{ min: 0, integer: true }>,
  denomination: foundry.data.fields.NumberField<{ min: 0, integer: true }>,
  bonus: dnd5e.dataModels.fields.FormulaField,
  types: foundry.data.fields.SetField<
    foundry.data.fields.StringField,
    {},
    Types,
    Types,
    Types
  >,
  custom: foundry.data.fields.SchemaField<{
    enabled: foundry.data.fields.BooleanField,
    formula: dnd5e.dataModels.fields.FormulaField
  }>,
  scaling: foundry.data.fields.SchemaField<{
    mode: foundry.data.fields.StringField,
    number: foundry.data.fields.NumberField<{ initial: 1, min: 0, integer: true }>,
    formula: dnd5e.dataModels.fields.FormulaField
  }>
}

declare class DamageField<
  Types extends string = dnd5e.types.Damage.TypeKey,
  Options extends DamageField.Options = DamageField.DefaultOptions,
  AssignmentType = DamageField.AssignmentType<Types, Options>,
  InitializedType = DamageField.InitializedType<Types, Options>,
  PersistedType extends fvttUtils.AnyObject | null | undefined = DamageField.PersistedType<Types, Options>,
> extends foundry.data.fields.EmbeddedDataField<
  typeof DamageData,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(options: Options);
}

declare namespace DamageField {
  type Options = foundry.data.fields.EmbeddedDataField.Options<typeof DamageData>;
  export import DefaultOptions = foundry.data.fields.EmbeddedDataField.DefaultOptions;
  type AssignmentType<
    Types extends string,
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    foundry.data.fields.SchemaField.AssignmentData<DamageDataSchema<Types>>,
    fvttUtils.SimpleMerge<
      DefaultOptions,
      Opts
    >
  >;
  type InitializedType<
    Types extends string,
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedInitializedType<
    foundry.data.fields.SchemaField.InitializedData<DamageDataSchema<Types>>,
    fvttUtils.SimpleMerge<
      DefaultOptions,
      Opts
    >
  >;
  type PersistedType<
    Types extends string,
    Opts extends Options,
  > = foundry.data.fields.DataField.DerivedInitializedType<
    foundry.data.fields.SchemaField.PersistedData<DamageDataSchema<Types>>,
    fvttUtils.SimpleMerge<
      DefaultOptions,
      Opts
    >
  >;
}

export default DamageField;


export class DamageData<
  Types extends string = dnd5e.types.Damage.TypeKey
> extends foundry.abstract.DataModel<
  DamageDataSchema<Types>,
  Item.Implementation
> {


  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The default damage formula.
   */
  get formula(): string

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Produce the auto-generated formula from the `number`, `denomination`, and `bonus`.

   */
  _automaticFormula(increase?: number): string
  /* -------------------------------------------- */

  /**
   * Scale the damage by a number of steps using its configured scaling configuration.
   * @param {number|Scaling} increase  Number of steps above base damage to scaling.
   * @returns {string}
   */
  scaledFormula(increase: string | Scaling): string
  /* -------------------------------------------- */

  /**
   * Step the die denomination up or down by a number of steps, sticking to proper die sizes. Will return `null` if
   * stepping reduced the denomination below minimum die size.
   */
  steppedDenomination(steps?: number): number | null
}

declare global {
  namespace dnd5e.types {
    namespace Damage {
      // --- Base Damage Type Definitions ---
      interface DefaultDamageTypes {
        "acid": true;
        "bludgeoning": true;
        "cold": true;
        "fire": true;
        "force": true;
        "lightning": true;
        "necrotic": true;
        "piercing": true;
        "poison": true;
        "psychic": true;
        "radiant": true;
        "slashing": true;
        "thunder": true;
        "none": true; // Represents typeless damage or effects that use the damage system without a specific type
      }

      /**
       * Override interface for declaration merging.
       * Add custom damage types here (e.g., sonic, void).
       * @example
       * declare global {
       * namespace dnd5e.types.Damage {
       * interface OverrideDamageTypes {
       * "sonic": true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> {}

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultDamageTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Types representing resistance/vulnerability/immunity bypasses */
      type Bypass = 'ada' | 'mgc' | 'sil'; // Adamantine, Magic, Silver

      /** Configuration object structure for a damage type. */
      interface DamageTypeConfig {
        label: string;
        icon?: string; // Icon representation (e.g., CSS class or path)
        reference?: string; // Link to rules reference
        color?: Color; // Associated color for UI elements
        /** Indicates if the damage type is typically affected by non-magical physical resistance/immunity */
        isPhysical?: boolean; // Usually true for bludgeoning, piercing, slashing
      }
    }

    namespace Healing {
      // --- Base Healing Type Definitions ---
      interface DefaultHealingTypes {
        "healing": true; // Standard HP restoration
        "temphp": true; // Temporary Hit Points
      }

      /**
       * Override interface for declaration merging.
       * Add custom healing types if needed (e.g., shield regeneration).
       * @example
       * declare global {
       * namespace dnd5e.types.Healing {
       * interface OverrideHealingTypes {
       * "shieldRegen": true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> {}

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultHealingTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Configuration object structure for a healing type. */
      interface HealingTypeConfig {
        label: string;
        icon?: string; // Icon representation
        reference?: string; // Link to rules reference
        color?: Color; // Associated color for UI elements
      }
    }

    interface DND5EConfig {
      damageTypes: {
        [K in dnd5e.types.Damage.TypeKey]: dnd5e.types.Damage.DamageTypeConfig
      }
      healingTypes: {
        [K in dnd5e.types.Healing.TypeKey]: dnd5e.types.Healing.HealingTypeConfig
      }
    }
  }
}