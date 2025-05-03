/**
 * A class responsible for orchestrating tooltips in the system.
 */
export default class Tooltips5e {
  /* -------------------------------------------- */
  /*  Properties & Getters                        */
  /* -------------------------------------------- */

  /**
   * The currently registered observer.
   */
  #observer: MutationObserver;

  /**
   * The tooltip element.
   */
  get tooltip(): HTMLElement;

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Initialize the mutation observer.
   */
  observe(): void;

  /* -------------------------------------------- */

  /**
   * Handle a mutation event.
   * @param mutationList  The list of changes.
   * @protected
   */
  protected _onMutation(mutationList: MutationRecord[]): void;

  /* -------------------------------------------- */

  /**
   * Handle tooltip activation.
   * @protected
   */
  protected _onTooltipActivate(): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle hovering some part of an actor's sheet.
   * @param actor  The actor.
   * @protected
   */
  protected _onHoverActor(actor: Actor.Implementation): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle hovering over a content link and showing rich tooltips if possible.
   * @param doc  The document linked by the content link.
   * @protected
   */
  protected _onHoverContentLink(doc: Document): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle hovering a passive skill or ability check link to display results for primary party.
   * Either skill or ability (or both) must be provided.
   * @param skill     Passive skill key. If undefined, this will be a passive ability check.
   * @param ability   Passive ability key. If undefined, the skill's default ability is used.
   * @param dc        DC against which to compare party values.
   * @protected
   */
  protected _onHoverPassive(skill?: string, ability?: string, dc?: number): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Position a tooltip after rendering.
   * @param [direction]  The direction to position the tooltip.
   * @protected
   */
  protected _positionItemTooltip(direction?: string): void;

  /* -------------------------------------------- */
  /*  Static Helpers                              */
  /* -------------------------------------------- */

  /**
   * Intercept middle-click listeners to prevent scrolling behavior inside a locked tooltip when attempting to lock
   * another tooltip.
   */
  static activateListeners(): void;
}
