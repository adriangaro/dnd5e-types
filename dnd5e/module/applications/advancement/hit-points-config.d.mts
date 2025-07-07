import type HitPointsAdvancement from "#dnd5e/module/documents/advancement/hit-points.mjs";
import AdvancementConfig from "./advancement-config-v2.mjs";

/**
 * Configuration application for hit points.
 */
export default class HitPointsConfig extends AdvancementConfig<
  HitPointsAdvancement, 
  {
    hitDie: HitPointsAdvancement['hitDie']
  }
> {}
