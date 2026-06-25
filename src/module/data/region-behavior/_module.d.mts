/**
 * Runtime API fragment for `dnd5e.dataModels.regionBehavior`.
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.regionBehavior {
    const ApplyActiveEffect5eRegionBehaviorType: typeof import("../region-behavior/apply-active-effect.mjs").default;
    type ApplyActiveEffect5eRegionBehaviorType = import("../region-behavior/apply-active-effect.mjs").default;

    const DifficultTerrainRegionBehaviorType: typeof import("../region-behavior/difficult-terrain.mjs").default;
    type DifficultTerrainRegionBehaviorType = import("../region-behavior/difficult-terrain.mjs").default;

    const RotateAreaRegionBehaviorType: typeof import("../region-behavior/rotate-area.mjs").default;
    type RotateAreaRegionBehaviorType = import("../region-behavior/rotate-area.mjs").default;

    const config: Record<
      "dnd5e.applyActiveEffect" | "dnd5e.difficultTerrain" | "dnd5e.rotateArea",
      | typeof import("../region-behavior/apply-active-effect.mjs").default
      | typeof import("../region-behavior/difficult-terrain.mjs").default
      | typeof import("../region-behavior/rotate-area.mjs").default
    >;

    const icons: Record<"dnd5e.applyActiveEffect" | "dnd5e.difficultTerrain" | "dnd5e.rotateArea", string>;
  }
}

export {};
