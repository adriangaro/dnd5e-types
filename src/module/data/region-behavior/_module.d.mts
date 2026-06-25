/**
 * Runtime API fragment for `dnd5e.dataModels.regionBehavior`.
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.regionBehavior {
    const ApplyActiveEffect5eRegionBehaviorType: typeof import("./apply-active-effect.mjs").default;
    type ApplyActiveEffect5eRegionBehaviorType = import("./apply-active-effect.mjs").default;

    const DifficultTerrainRegionBehaviorType: typeof import("./difficult-terrain.mjs").default;
    type DifficultTerrainRegionBehaviorType = import("./difficult-terrain.mjs").default;

    const RotateAreaRegionBehaviorType: typeof import("./rotate-area.mjs").default;
    type RotateAreaRegionBehaviorType = import("./rotate-area.mjs").default;

    const config: Record<
      "dnd5e.applyActiveEffect" | "dnd5e.difficultTerrain" | "dnd5e.rotateArea",
      | typeof import("./apply-active-effect.mjs").default
      | typeof import("./difficult-terrain.mjs").default
      | typeof import("./rotate-area.mjs").default
    >;

    const icons: Record<"dnd5e.applyActiveEffect" | "dnd5e.difficultTerrain" | "dnd5e.rotateArea", string>;
  }
}

export {};
