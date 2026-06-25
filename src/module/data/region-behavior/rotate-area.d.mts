/**
 * The data model for a region behavior that rotates tokens in its area around a center point along with any
 * other specified placeables.
 *
 * RegionBehavior subtype (`dnd5e.rotateArea`) that rotates tokens (and optionally linked
 * tiles/walls/lights/regions/sounds) around a center point over time. Registered on
 * `dnd5e.types.DataModelConfig.RegionBehavior` (Seam C); Seam-D overrides fold in.
 */

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `dnd5e.rotateArea` region-behavior subtype. */
    interface RegionBehavior {
      "dnd5e.rotateArea": typeof import("./rotate-area.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.RegionBehavior {
    namespace RotateArea {
      /** Rotation direction modes (`DIRECTION_MODES`). */
      type DirectionMode = "cw" | "ccw" | "short" | "long";
      /** Time→speed mapping modes (`SPEED_MODES`). */
      type SpeedMode = "fixed" | "variable";

      interface OverrideSchema extends foundry.data.fields.DataSchema {}
      interface OverrideBase extends fvttUtils.AnyObject {}
      interface OverrideDerived extends fvttUtils.AnyObject {}
    }
  }
}

declare class RotateAreaRegionBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<
  RotateAreaRegionBehaviorType.Schema,
  globalThis.RegionBehavior.Implementation,
  RotateAreaRegionBehaviorType.Base,
  RotateAreaRegionBehaviorType.Derived
> {
  static override defineSchema(): RotateAreaRegionBehaviorType.Schema;

  /** Modes for determining rotation direction when moving to the next point. */
  static DIRECTION_MODES: Record<dnd5e.types.DataModelConfig.RegionBehavior.RotateArea.DirectionMode, string>;

  /** Modes for mapping rotation time to final speed. */
  static SPEED_MODES: Record<dnd5e.types.DataModelConfig.RegionBehavior.RotateArea.SpeedMode, string>;

  /**
   * Rotate to the next position.
   * @param reverse  Rotate to previous position instead of next one.
   * @returns        Resolves once rotation is complete.
   */
  rotate(reverse?: boolean): Promise<boolean>;

  /**
   * Trigger the rotator to rotate to an angle or specific position.
   * Either the angle or position must be provided.
   */
  rotateTo(options: { angle?: number; position?: number }): Promise<boolean | void>;

  /**
   * Animate rotation in response to changes to behavior.
   * Note: the misspelling (`updateRotatateArea`) is load-bearing — the runtime hook calls this exact name.
   */
  updateRotatateArea(changes: object, options: object): Promise<void>;
}

declare namespace RotateAreaRegionBehaviorType {
  type DocumentLinks = foundry.data.fields.SchemaField<{
    ids: foundry.data.fields.SetField<foundry.data.fields.DocumentIdField>;
  }>;

  /** Pre-Seam-D source schema (`defineSchema`). */
  type BaseSchema = {
    time: foundry.data.fields.SchemaField<{
      value: foundry.data.fields.NumberField<{ required: true; initial: 1000; min: 0; integer: true }>;
      mode: dnd5e.types.fields.RestrictedStringField<
        dnd5e.types.DataModelConfig.RegionBehavior.RotateArea.SpeedMode,
        { required: true; blank: false; initial: "fixed" }
      >;
    }>;
    tiles: DocumentLinks;
    walls: foundry.data.fields.SchemaField<{
      ids: foundry.data.fields.SetField<foundry.data.fields.DocumentIdField>;
      link: foundry.data.fields.BooleanField<{ initial: true }>;
    }>;
    lights: DocumentLinks;
    regions: DocumentLinks;
    sounds: DocumentLinks;
    directionMode: dnd5e.types.fields.RestrictedStringField<
      dnd5e.types.DataModelConfig.RegionBehavior.RotateArea.DirectionMode,
      { required: true; blank: false; initial: "short" }
    >;
    positions: foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        angle: foundry.data.fields.NumberField<{ required: true; nullable: false; initial: 0; min: -360; max: 360 }>;
      }>,
      { initial: [{ angle: 0 }] }
    >;
    // `hidden` (a runtime form hint) is omitted — not a typed DataField option in fvtt-types.
    status: foundry.data.fields.SchemaField<{
      angle: foundry.data.fields.AngleField<{ required: true; initial: 0 }>;
      position: foundry.data.fields.NumberField<{ initial: 0; integer: true; min: 0 }>;
      rotating: foundry.data.fields.BooleanField;
    }>;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.RegionBehavior.RotateArea.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.RegionBehavior.RotateArea.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.RegionBehavior.RotateArea.OverrideDerived
  >;
}

export default RotateAreaRegionBehaviorType;
