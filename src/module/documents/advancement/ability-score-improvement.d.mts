/**
 * Advancement that presents the player with the option of improving their ability scores or selecting a feat.
 */

import type BaseAbilityScoreImprovementAdvancementData from "../../data/advancement/ability-score-improvement-data.mjs";
import { AdvancementMixin } from "./mixin.mjs";

declare const AbilityScoreImprovementAdvancement_base: ReturnType<
  typeof AdvancementMixin<typeof BaseAbilityScoreImprovementAdvancementData>
>;

declare class AbilityScoreImprovementAdvancement extends AbilityScoreImprovementAdvancement_base {
  static metadata: dnd5e.types.Advancement.Metadata & { name: "AbilityScoreImprovement" };

  /**
   * Level above which any ASI will be considered an Epic Boon when using the modern rules.
   */
  static EPIC_BOON_LEVEL: number;

  /**
   * Does this advancement allow feats, or just ability score improvements?
   */
  get allowFeat(): boolean;

  /**
   * Should this be considered an epic boon feat?
   */
  get isEpicBoon(): boolean;

  /**
   * Information on the ASI points available.
   */
  get points(): { assigned: number; total: number };

  /**
   * Is this ability allowed to be improved?
   * @param ability - The ability key.
   */
  canImprove(ability: dnd5e.types.Ability.TypeKey): boolean;
}

declare global {
  namespace dnd5e.types.Advancement {
    interface DefaultTypes {
      AbilityScoreImprovement: typeof AbilityScoreImprovementAdvancement;
    }
  }
}

export default AbilityScoreImprovementAdvancement;
