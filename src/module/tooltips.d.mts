/**
 * `Tooltips5e` — orchestrates rich, passive-check, and content-link tooltips for the system (`module/tooltips.mjs`).
 */

declare class Tooltips5e {
  /** The tooltip element. */
  get tooltip(): HTMLElement;

  /** Initialize the mutation observer. */
  observe(): void;

  /** Handle a mutation event. */
  protected _onMutation(mutationList: MutationRecord[]): void;

  /** Handle tooltip activation. */
  protected _onTooltipActivate(): Promise<void>;

  /** Handle hovering some part of an actor's sheet. */
  protected _onHoverActor(actor: globalThis.Actor.Implementation): Promise<void>;

  /** Handle hovering over a content link and showing rich tooltips if possible. */
  protected _onHoverContentLink(doc: foundry.abstract.Document.Any): Promise<void>;

  /** Handle hovering a passive language link to display results for primary party. */
  protected _onHoverPassiveLanguage(language: string): Promise<void>;

  /**
   * Handle hovering a passive skill or ability check link to display results for primary party.
   * Either skill or ability (or both) must be provided.
   */
  protected _onHoverPassiveCheck(
    skill?: dnd5e.types.Skill.TypeKey,
    ability?: dnd5e.types.Ability.TypeKey,
    dc?: string
  ): Promise<void>;

  /** Handle hovering a passive tooltip to display results for primary party. */
  protected _onHoverPassive(
    context: { label: string },
    memberCallback: Tooltips5e.PassiveMemberCallback
  ): Promise<void>;

  /** Position a tooltip after rendering. */
  protected _positionItemTooltip(direction?: string): void;

  /**
   * Intercept middle-click listeners to prevent scrolling behavior inside a locked tooltip when attempting to lock
   * another tooltip.
   */
  static activateListeners(): void;
}

declare namespace Tooltips5e {
  /**
   * Method called for each member. Returns data used to render the member's entry, or `false` to exclude actor.
   * @param actor  The actor instance.
   * @returns Data used to render the member's entry or `false` to exclude actor.
   */
  type PassiveMemberCallback = (
    actor: globalThis.Actor.Implementation
  ) => { passive?: number; status?: string; value?: number } | false;

  interface Any extends Tooltips5e {}
  type AnyConstructor = typeof Tooltips5e;
}

export default Tooltips5e;
