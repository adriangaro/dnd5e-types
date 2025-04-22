import type AbilityScoreImprovementAdvancement from "@dnd5e/module/documents/advancement/ability-score-improvement.mjs";
import AdvancementConfig from "./advancement-config-v2.mjs";
/**
 * Configuration application for ability score improvements.
 */
export default class AbilityScoreImprovementConfig extends AdvancementConfig<
  AbilityScoreImprovementAdvancement,
  {
    abilities: Record<
      dnd5e.types.Ability.TypeKey,
      {
        key: dnd5e.types.Ability.TypeKey,
        name: string,
        label: string,
        locked: {
          value: boolean,
          hint: string
        },
        value: number,
        canIncrease: boolean,
        canDecrease: boolean
      }
    >,
    points: {
      key: string,
      name: string,
      label: string,
      min: number,
      value: AbilityScoreImprovementAdvancement['configuration']['points'],
      canIncrease: boolean,
      canDecrease: boolean
    }
  }
> {

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle clicking the plus and minus buttons.
   * @this {AbilityScoreImprovementConfig}
   * @param {Event} event         Triggering click event.
   * @param {HTMLElement} target  Button that was clicked.
   */
  static #adjustValue<This extends AdvancementConfig.Any>(this: This, event: MouseEvent, target: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle locking or unlocking an ability.
   * @this {AbilityScoreImprovementConfig}
   * @param {PointerEvent} event  The triggering event.
   * @param {HTMLElement} target  The action target.
   */
  static #lockValue<This extends AdvancementConfig.Any>(this: This, event: PointerEvent, target: HTMLElement)
}
