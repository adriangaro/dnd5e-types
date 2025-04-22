import AdvancementFlow from "./advancement-flow.mjs";
import type AbilityScoreImprovementAdvancement from "@dnd5e/module/documents/advancement/ability-score-improvement.mjs";


/**
 * Inline application that presents the player with a choice between ability score improvement and taking a feat.
 */
export default class AbilityScoreImprovementFlow extends AdvancementFlow<
  AbilityScoreImprovementAdvancement
> {

  /**
   * Player assignments to abilities.
   */
  assignments: Record<dnd5e.types.Ability.TypeKey, number>;

  /* -------------------------------------------- */

  /**
   * The dropped feat item.
   */
  feat: Item.Implementation;

  /* -------------------------------------------- */

  /**
   * Handle opening the compendium browser and displaying the result.
   */
  _onBrowseCompendium(event: PointerEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle clicking the plus and minus buttons.
   */
  _onClickButton(event: MouseEvent)

  /* -------------------------------------------- */

  /**
   * Handle clicking on a feature during item grant to preview the feature.
   * @protected
   */
  _onClickFeature(event: MouseEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle deleting a dropped feat.
   * @protected
   */
  _onItemDelete(event: MouseEvent): Promise<void>
}
