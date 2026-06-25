/**
 * Plain client document: extends the global `ChatMessage` directly (NO mixin, NO `SubType` thread —
 * dnd5e does not register a SystemDataModel-style subtype funnel here). It is registered into
 * fvtt-types' `DocumentClassConfig` centrally elsewhere, so `ChatMessage.Implementation` resolves to
 * this class everywhere.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface ChatMessage5e` — downstream packages
 * add document-level methods/getters by augmenting that interface. The bulk of this class is chat-card
 * rendering UI; DOM/jQuery params are kept loose (`HTMLElement`/`object`) and dependencies that aren't
 * ported yet (D20Roll/DamageRoll dice shapes, Activity instances, simplified-damage breakdowns) are
 * intentionally loose (`object`/`unknown`) and tightened as those land.
 */

declare class ChatMessage5e<
  SubType extends ChatMessage.SubType = ChatMessage.SubType,
> extends ChatMessage<SubType> {
  /* ---- Properties ---- */

  /** The currently highlighted token for attack roll evaluation. */
  _highlighted: TokenDocument.Implementation["object"] | null;

  /** Store the state of any trays in the message. */
  _trayStates: Map<string, boolean> | undefined;

  /** Should the apply damage options appear? */
  get canApplyDamage(): boolean;
  /** Should the select targets options appear? */
  get canSelectTargets(): boolean;
  /** Whether this message represents a roll. */
  get isRoll(): boolean;
  /** Should roll DCs and other challenge details be displayed on this card? */
  get shouldDisplayChallenge(): boolean;

  /* ---- Data preparation ---- */

  override prepareData(): void;

  /* ---- Rendering ---- */

  /** Render the HTML for this chat message, applying dnd5e-specific augmentations. */
  override renderHTML(options?: object): Promise<HTMLElement>;
  /** Handle collapsing or expanding trays depending on user settings. */
  _collapseTrays(html: HTMLElement): void;
  /** Optionally hide the display of chat card action buttons which cannot be performed by the user. */
  _displayChatActionButtons(html: HTMLElement): void;
  /** Highlight critical success or failure on d20 rolls. */
  _highlightCriticalSuccessFailure(html: HTMLElement): void;
  /** Augment the chat card markup for additional styling. */
  _enrichChatCard(html: HTMLElement): Promise<void>;
  /** Augment roll tooltips with some additional information and styling. */
  _enrichRollTooltip(roll: Roll, html: HTMLElement): void;
  /** Augment attack cards with additional information. */
  _enrichAttackTargets(html: HTMLElement): void;
  /** Coalesce damage rolls into a single breakdown. */
  _enrichDamageTooltip(rolls: object[], html: HTMLElement): void;
  /** Simplify damage roll information for use by damage tooltip. */
  _simplifyDamageRoll(roll: object): ChatMessage5e.SimplifiedDamageRoll;
  /** Display option to resist a failed save using a legendary resistance. */
  _enrichSaveTooltip(html: HTMLElement): void;
  /** Display option to break concentration on a failed concentration saving throw. */
  _enrichConcentrationTooltip(html: HTMLElement): void;

  /* ---- Event handlers ---- */

  /**
   * Handle target selection and panning.
   * @param event   The triggering event.
   * @returns A promise that resolves once the canvas pan has completed.
   */
  _onTargetMouseDown(event: Event): Promise<void>;
  /** Handle hovering over a target in an attack roll message. */
  _onTargetHoverIn(event: Event): void;
  /** Handle hovering out of a target in an attack roll message. */
  _onTargetHoverOut(event: Event): void;
  /** Apply rolled dice damage to the token or tokens which are currently controlled. This allows for damage to be scaled by a multiplier to account for healing, critical hits, or resistance */
  applyChatCardDamage(li: HTMLElement, multiplier: number): Promise<unknown[]>;
  /** Select the hit or missed targets. */
  selectTargets(li: HTMLElement, type: string): void;
  /** Apply rolled dice as temporary hit points to the controlled token(s). */
  applyChatCardTemp(li: HTMLElement): Promise<unknown[]>;
  /** Handle dice roll expansion. */
  _onClickDiceRoll(event: PointerEvent): void;

  /* ---- Socket event handlers ---- */

  protected override _preCreate(data: object, options: object, user: User.Implementation): Promise<boolean | void>;
  override _onDelete(options: object, userId: string): void;

  /* ---- Helpers ---- */

  /** Get the Activity that created this chat card. */
  getAssociatedActivity(options?: { scaled?: boolean }): dnd5e.types.Activity.Instance | void;
  /** Get the Actor which is the author of a chat card. */
  getAssociatedActor(): Actor.Implementation | void;
  /** Get the item associated with this chat card. */
  getAssociatedItem(options?: { scaled?: boolean }): Item.Implementation | void;
  /** Get a list of all chat messages containing rolls that originated from this message. */
  getAssociatedRolls(type?: string): ChatMessage.Implementation[];
  /** Get the original chat message from which this message was created (or this message). */
  getOriginatingMessage(): ChatMessage.Implementation;

  /* ---- Statics ---- */

  /** HTML tag names for chat trays that can open and close. */
  static TRAY_TYPES: string[];
  /** Migrate legacy flag data from prior versions. */
  static override migrateData(source: fvttUtils.AnyMutableObject): fvttUtils.AnyMutableObject;
  /** This function is used to hook into the Chat Log context menu to add additional options to each message. These options make it easy to conveniently apply damage to controlled tokens based on the value of a Roll */
  static addChatMessageContextOptions(html: HTMLElement, options: object[]): object[];
  /** Handle rendering a chat popout. */
  static onRenderChatPopout(app: object, html: HTMLElement): void;
  /** Wait to apply appropriate element heights until after the chat log has completed its initial batch render. */
  static onRenderChatLog(html: HTMLElement): void;
  /** Listen for shift key being pressed to show the chat message "delete" icon, or released (or focus lost) to hide it. */
  static activateListeners(): void;
  /** Toggle attributes on the chatlog based on which modifier keys are being held. */
  static toggleModifiers(options?: { releaseAll?: boolean }): void;
}

declare namespace ChatMessage5e {
  /** Simplified damage roll breakdown produced by {@link ChatMessage5e._simplifyDamageRoll}. */
  interface SimplifiedDamageRoll {
    type: string;
    total: number;
    constant: number | null;
    dice: { result: string; classes: string }[];
    icon: string | null;
    method: string | null;
  }
}

export default ChatMessage5e;
