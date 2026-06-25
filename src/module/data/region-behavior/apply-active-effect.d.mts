/**
 * The data model for a region behavior that applies active effects to certain tokens.
 *
 * RegionBehavior subtype (`dnd5e.applyActiveEffect`) that applies active effects to tokens entering
 * the region, optionally filtered by disposition / size / creature type. Registered on
 * `dnd5e.types.DataModelConfig.RegionBehavior` (Seam C); Seam-D override interfaces fold in.
 */

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `dnd5e.applyActiveEffect` region-behavior subtype. */
    interface RegionBehavior {
      "dnd5e.applyActiveEffect": typeof import("./apply-active-effect.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.RegionBehavior {
    namespace ApplyActiveEffect {
      interface OverrideSchema extends foundry.data.fields.DataSchema {}
      interface OverrideBase extends fvttUtils.AnyObject {}
      interface OverrideDerived extends fvttUtils.AnyObject {}
    }
  }
}

declare class ApplyActiveEffect5eRegionBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<
  ApplyActiveEffect5eRegionBehaviorType.Schema,
  globalThis.RegionBehavior.Implementation,
  ApplyActiveEffect5eRegionBehaviorType.Base,
  ApplyActiveEffect5eRegionBehaviorType.Derived
> {
  static override defineSchema(): ApplyActiveEffect5eRegionBehaviorType.Schema;
}

declare namespace ApplyActiveEffect5eRegionBehaviorType {
  /** Pre-Seam-D source schema (`defineSchema`). */
  type BaseSchema = {
    /** UUIDs of the ActiveEffects to apply. */
    effects: foundry.data.fields.SetField<
      foundry.data.fields.DocumentUUIDField<{ type: "ActiveEffect"; nullable: false }>
    >;
    /** If non-empty, only apply to tokens with these dispositions (SECRET excluded). */
    dispositions: foundry.data.fields.SetField<foundry.data.fields.NumberField>;
    /** If non-empty, only apply to tokens whose actor has one of these sizes. */
    sizes: foundry.data.fields.SetField<
      dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey, { required: true; blank: false }>
    >;
    /** If non-empty, only apply to tokens whose actor has one of these creature types. */
    types: foundry.data.fields.SetField<
      dnd5e.types.fields.RestrictedStringField<dnd5e.types.Creature.TypeKey, { required: true; blank: false }>
    >;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.RegionBehavior.ApplyActiveEffect.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.RegionBehavior.ApplyActiveEffect.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.RegionBehavior.ApplyActiveEffect.OverrideDerived
  >;
}

export default ApplyActiveEffect5eRegionBehaviorType;
