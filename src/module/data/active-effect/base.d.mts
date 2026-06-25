/**
 * System data model for base active effects.
 *
 * The dnd5e "base" active-effect subtype (literally keyed "base"). Mirrors the document-subtype
 * data-model pattern:
 *  - `extends ActiveEffectDataModel<Schema, Base, Derived>` (the abstract base pins the parent),
 *  - Seam-D `OverrideSchema`/`OverrideBase`/`OverrideDerived` folded at a single point,
 *  - Seam-C registration on `dnd5e.types.DataModelConfig.ActiveEffect` (read by the funnel).
 *
 * BaseSchema is the runtime `defineSchema()` (parent `super.defineSchema()` is empty for the abstract
 * base). All fields here map to native `foundry.data.fields.*`; none were left loose.
 */

import ActiveEffectDataModel from "../abstract/active-effect-data-model.mjs";

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `base` active-effect subtype on the interface the funnel reads. */
    interface ActiveEffect {
      base: typeof import("./base.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.ActiveEffect.base {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class BaseEffectData extends ActiveEffectDataModel<
  BaseEffectData.Schema,
  BaseEffectData.Base,
  BaseEffectData.Derived
> {
  static override LOCALIZATION_PREFIXES: string[];

  static override defineSchema(): BaseEffectData.Schema;

  /** @override */
  override get applicableType(): string;

  /** Is this effect a rider for a non-applied enchantment? */
  get isRider(): boolean;
}

declare namespace BaseEffectData {
  /** Pre-Seam-D source schema (base.mjs `defineSchema`). */
  type BaseSchema = {
    /** Does this effect originate from a magical source? */
    magical: foundry.data.fields.BooleanField;
    rider: foundry.data.fields.SchemaField<{
      /** Additional status effects that are separately applied when effect is applied. */
      statuses: foundry.data.fields.SetField<foundry.data.fields.StringField>;
    }>;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.ActiveEffect.base.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.ActiveEffect.base.OverrideBase>;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ActiveEffect.base.OverrideDerived
  >;
}

export default BaseEffectData;
