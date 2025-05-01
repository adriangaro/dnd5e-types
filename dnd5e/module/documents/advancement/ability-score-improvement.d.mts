import Advancement from "./advancement.mjs";
import {
  AbilityScoreImprovementConfigurationData,
  AbilityScoreImprovementValueData
} from "../../data/advancement/ability-score-improvement.mjs";


/**
 * Advancement that presents the player with the option of improving their ability scores or selecting a feat.
 */
declare class AbilityScoreImprovementAdvancement extends Advancement<
  'AbilityScoreImprovement',
  typeof AbilityScoreImprovementConfigurationData,
  typeof AbilityScoreImprovementValueData
> {

  /* -------------------------------------------- */
  /*  Instance Properties                         */
  /* -------------------------------------------- */

  /**
   * Does this advancement allow feats, or just ability score improvements?
   */
  get allowFeat(): boolean

  /* -------------------------------------------- */

  /**
   * Information on the ASI points available.
   */
  get points(): { assigned: number, total: number }

  /* -------------------------------------------- */
  /*  Instance Methods                            */
  /* -------------------------------------------- */

  /**
   * Is this ability allowed to be improved?
   */
  canImprove(ability: dnd5e.types.Ability.TypeKey): boolean


  /* -------------------------------------------- */
  /*  Application Methods                         */
  /* -------------------------------------------- */
}
export default AbilityScoreImprovementAdvancement

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultAdvancementTypes {
        AbilityScoreImprovement: typeof AbilityScoreImprovementAdvancement
      }
    }
  }
}
