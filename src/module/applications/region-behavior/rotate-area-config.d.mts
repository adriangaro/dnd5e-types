/** Config sheet for the Rotate Area region behavior. */

declare class RotateAreaConfig extends foundry.applications.sheets.RegionBehaviorConfig<RotateAreaConfig.RenderContext> {}

declare namespace RotateAreaConfig {
  interface Any extends RotateAreaConfig {}
  interface AnyConstructor extends fvttUtils.Identity<typeof RotateAreaConfig> {}

  interface RenderContext extends foundry.applications.sheets.RegionBehaviorConfig.RenderContext {
    positions: { data: { angle: number }; fields: foundry.data.fields.DataSchema; label: string }[];
  }
}

export default RotateAreaConfig;
