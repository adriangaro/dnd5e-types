/**
 * The data model for a region behavior that represents an area of difficult terrain.
 *
 * RegionBehavior subtype (`dnd5e.difficultTerrain`) marking the region as difficult terrain.
 * Registered on `dnd5e.types.DataModelConfig.RegionBehavior` (Seam C); Seam-D overrides fold in.
 */

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `dnd5e.difficultTerrain` region-behavior subtype. */
    interface RegionBehavior {
      "dnd5e.difficultTerrain": typeof import("./difficult-terrain.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.RegionBehavior {
    namespace DifficultTerrain {
      interface OverrideSchema extends foundry.data.fields.DataSchema {}
      interface OverrideBase extends fvttUtils.AnyObject {}
      interface OverrideDerived extends fvttUtils.AnyObject {}
    }
  }
}

/** The data model for a region behavior that represents an area of difficult terrain. */
declare class DifficultTerrainRegionBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<
  DifficultTerrainRegionBehaviorType.Schema,
  globalThis.RegionBehavior.Implementation,
  DifficultTerrainRegionBehaviorType.Base,
  DifficultTerrainRegionBehaviorType.Derived
> {
  static override defineSchema(): DifficultTerrainRegionBehaviorType.Schema;

  static override events: Record<string, (event: any) => Promise<void>>;

  _getTerrainEffects(token: foundry.canvas.placeables.Token.Implementation, segment: object): { name: string }[];
}

declare namespace DifficultTerrainRegionBehaviorType {
  /** Pre-Seam-D source schema (`defineSchema`). */
  type BaseSchema = {
    /** This difficult terrain is caused by magic. */
    magical: foundry.data.fields.BooleanField;
    /** Types of difficult terrain represented. */
    types: foundry.data.fields.SetField<foundry.data.fields.StringField>;
    /** Token dispositions that won't be affected by this difficult terrain. */
    ignoredDispositions: foundry.data.fields.SetField<foundry.data.fields.NumberField>;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.RegionBehavior.DifficultTerrain.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.RegionBehavior.DifficultTerrain.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.RegionBehavior.DifficultTerrain.OverrideDerived
  >;
}

export default DifficultTerrainRegionBehaviorType;
