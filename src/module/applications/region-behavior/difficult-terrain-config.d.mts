/** Config sheet for the Difficult Terrain region behavior. */

declare class DifficultTerrainConfig extends foundry.applications.sheets.RegionBehaviorConfig {}

declare namespace DifficultTerrainConfig {
  interface Any extends DifficultTerrainConfig {}
  interface AnyConstructor extends fvttUtils.Identity<typeof DifficultTerrainConfig> {}
}

export default DifficultTerrainConfig;
