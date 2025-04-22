import AdvancementFlow from "./advancement-flow.mjs";
import type HitPointsAdvancement from "@dnd5e/module/documents/advancement/hit-points.mjs";

/**
 * Inline application that presents hit points selection upon level up.
 */
export default class HitPointsFlow extends AdvancementFlow<
  HitPointsAdvancement
> {
  /**
   * Update the roll result display when the average result is taken.
   */
  _updateRollResult()
}
