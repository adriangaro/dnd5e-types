/**
 * Custom element that handles displaying active effects lists.
 */
export default class EffectsElement extends HTMLElement {
  connectedCallback()

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Reference to the application that contains this component.
   */
  #app: Application;

  /**
   * Reference to the application that contains this component.
   * @protected
   */
  get _app(): Application

  /* -------------------------------------------- */

  /**
   * Document whose effects are represented.
   */
  get document(): Actor.Implementation | Item.Implementation

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare the data structure for Active Effects which are currently applied to an Actor or Item.
   * @param {ActiveEffect5e[]} effects         The array of Active Effect instances for which to prepare sheet data.
   * @param {object} [options={}]
   * @param {Actor5e|Item5e} [options.parent]  Document that owns these active effects.
   * @returns {object}                  Data for rendering.
   */
  static prepareCategories(
    effects: ActiveEffect.Implementation[], 
    options?: { parent: Actor.Implementation | Item.Implementation }
  ): {
    type: string,
    label: string,
    effects: ActiveEffect.Implementation[],
    isEnchantment?: boolean
    hidden?: boolean
  }[]

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Prepare an array of context menu options which are available for owned ActiveEffect documents.
   * @param {ActiveEffect5e} effect  The ActiveEffect for which the context menu is activated.
   * @returns {ContextMenuEntry[]}   An array of context menu options offered for the ActiveEffect.
   * @protected
   */
  _getContextOptions(effect: ActiveEffect.Implementation): foundry.applications.ux.ContextMenu.Entry<JQuery>[]
  /* -------------------------------------------- */

  /**
   * Handle effects actions.
   * @param target  Button or context menu entry that triggered this action.
   * @param action   Action being triggered.
   * @protected
   */
  _onAction(target: Element, action: string): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle toggling a condition.
   * @param conditionId  The condition identifier.
   * @protected
   */
  _onToggleCondition(conditionId: string): Promise<ActiveEffect.Implementation | void>

  /* -------------------------------------------- */

  /**
   * Create a new effect.
   * @param target  Button that triggered this action.
   */
  _onCreate(target: HTMLElement): Promise<ActiveEffect.Implementation>

  /* -------------------------------------------- */

  /**
   * Handle clicking an effect's source.
   * @param event  The triggering event.
   * @protected
   */
  _onClickEffectSource(event: PointerEvent): Promise<void>

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Fetch an effect from this document, or any embedded items if this document is an actor.
   * @param data
   * @param data.effectId    ID of the effect to fetch.
   * @param [data.parentId]  ID of the parent item containing the effect.
   */
  getEffect(data?: { 
    effectId: string, 
    parentId: string 
  }): ActiveEffect.Implementation
}
