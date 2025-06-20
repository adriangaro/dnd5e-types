declare class ChatMessage5e<
  SubType extends ChatMessage.SubType = ChatMessage.SubType
> extends ChatMessage<
  SubType
> {

  /**
   * HTML tag names for chat trays that can open and close.
   */
  static TRAY_TYPES: string[]

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The currently highlighted token for attack roll evaluation.
   */
  _highlighted: Token.Implementation | null;

  /* -------------------------------------------- */

  /**
   * Should the apply damage options appear?
   */
  get canApplyDamage(): boolean

  /* -------------------------------------------- */

  /**
   * Should the select targets options appear?
   */
  get canSelectTargets(): boolean


  /* -------------------------------------------- */

  /**
   * Should roll DCs and other challenge details be displayed on this card?
   */
  get shouldDisplayChallenge(): boolean

  /* -------------------------------------------- */

  /**
   * Store the state of any trays in the message.
   * @protected
   */
  _trayStates: Map<string, boolean>;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Handle collapsing or expanding trays depending on user settings.
   * @param html  Rendered contents of the message.
   */
  _collapseTrays(html: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Optionally hide the display of chat card action buttons which cannot be performed by the user
   * @param html     Rendered contents of the message.
   * @protected
   */
  _displayChatActionButtons(html: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Highlight critical success or failure on d20 rolls.
   * @param html     Rendered contents of the message.
   * @protected
   */
  _highlightCriticalSuccessFailure(html: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Augment the chat card markup for additional styling.
   * @param html  The chat card markup.
   * @protected
   */
  _enrichChatCard(html: HTMLElement)
  /* -------------------------------------------- */

  /**
   * Augment roll tooltips with some additional information and styling.
   * @param roll            The roll instance.
   * @param html  The roll tooltip markup.
   */
  _enrichRollTooltip(roll: Roll, html: HTMLDivElement)

  /* -------------------------------------------- */

  /**
   * Augment attack cards with additional information.
   * @param html   The chat card.
   * @protected
   */
  _enrichAttackTargets(html: HTMLLIElement)

  /* -------------------------------------------- */

  /**
   * Coalesce damage rolls into a single breakdown.
   * @param rolls  The damage rolls.
   * @param html    The chat card markup.
   * @protected
   */
  _enrichDamageTooltip(rolls: dnd5e.dice.DamageRoll[], html: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Simplify damage roll information for use by damage tooltip.
   * @param roll   The damage roll to simplify.
   * @returns          The object holding simplified damage roll data.
   * @protected
   */
  _simplifyDamageRoll(roll: dnd5e.dice.DamageRoll): {
    type: string,
    total: number,
    constant: number,
    dice: {
      result: string,
      classes: string
    }[]
  }

  /* -------------------------------------------- */

  /**
   * Display the enrichment application interface if necessary.
   * @param html   The chat card.
   * @protected
   */
  _enrichEnchantmentTooltip(html: HTMLLIElement)

  /* -------------------------------------------- */

  /**
   * Display option to resist a failed save using a legendary resistance.
   * @param html  The chat card.
   * @protected
   */
  _enrichSaveTooltip(html: HTMLLIElement)

  /* -------------------------------------------- */

  /**
   * Display the effects tray with effects the user can apply.
   * @param html  The chat card.
   * @protected
   */
  _enrichUsageEffects(html: HTMLLIElement)

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * This function is used to hook into the Chat Log context menu to add additional options to each message
   * These options make it easy to conveniently apply damage to controlled tokens based on the value of a Roll
   *
   * @param html    The Chat Message being rendered
   * @param options    The Array of Context Menu options
   *
   * @returns          The extended options Array including new context choices
   */
  static addChatMessageContextOptions(
    html: HTMLElement, options: {
      name: string,
      icon: string,
      condition: (el: [HTMLElement]) => boolean,
      callback: (el: HTMLElement) => void,
      group: string
    }[]
  ): {
    name: string,
    icon: string,
    condition: (el: [HTMLElement]) => boolean,
    callback: (el: HTMLElement) => void,
    group: string
  }[]

  /* -------------------------------------------- */

  /**
   * Add event listeners for chat messages created from activities.
   * @param html  The chat message HTML.
   */
  _activateActivityListeners(html: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Handle target selection and panning.
   * @param event   The triggering event.
   * @returns    A promise that resolves once the canvas pan has completed.
   * @protected
   */
  _onTargetMouseDown(event: Event): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle hovering over a target in an attack roll message.
   * @param event     Initiating hover event.
   * @protected
   */
  _onTargetHoverIn(event: Event)

  /* -------------------------------------------- */

  /**
   * Handle hovering out of a target in an attack roll message.
   * @param event     Initiating hover event.
   * @protected
   */
  _onTargetHoverOut(event: Event)

  /* -------------------------------------------- */

  /**
   * Apply rolled dice damage to the token or tokens which are currently controlled.
   * This allows for damage to be scaled by a multiplier to account for healing, critical hits, or resistance
   */
  applyChatCardDamage(li: HTMLElement, multiplier: number): Promise<any[]>

  /* -------------------------------------------- */

  /**
   * Select the hit or missed targets.
   * @param li    The chat entry which contains the roll data.
   * @param type       The type of selection ('hit' or 'miss').
   */
  selectTargets(li: HTMLElement, type: string)

  /* -------------------------------------------- */

  /**
   * Apply rolled dice as temporary hit points to the controlled token(s).
   * @param li  The chat entry which contains the roll data
   */
  applyChatCardTemp(li: HTMLElement): Promise<any[]>

  /* -------------------------------------------- */

  /**
   * Handle dice roll expansion.
   * @param event  The triggering event.
   * @protected
   */
  _onClickDiceRoll(event: PointerEvent)

  /* -------------------------------------------- */

  /**
   * Handle rendering a chat popout.
   * @param app  The ChatPopout Application instance.
   * @param html     The rendered Application HTML.
   */
  static onRenderChatPopout(app: foundry.applications.sidebar.apps.ChatPopout, html: JQuery)

  /* -------------------------------------------- */

  /**
   * Wait to apply appropriate element heights until after the chat log has completed its initial batch render.
   */
  static onRenderChatLog(html: HTMLElement | JQuery)

  /* -------------------------------------------- */

  /**
   * Listen for shift key being pressed to show the chat message "delete" icon, or released (or focus lost) to hide it.
   */
  static activateListeners()

  /* -------------------------------------------- */

  /**
   * Toggles attributes on the chatlog based on which modifier keys are being held.
   * @param options
   * @param options.releaseAll Force all modifiers to be considered released.
   */
  static toggleModifiers(options?: {
     releaseAll?: boolean
  })


  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Get the Activity that created this chat card.
   */
  getAssociatedActivity(): dnd5e.types.Activity.Implementation | null

  /* -------------------------------------------- */

  /**
   * Get the Actor which is the author of a chat card.
   */
  getAssociatedActor(): Actor.Implementation | null

  /* -------------------------------------------- */

  /**
   * Get the item associated with this chat card.
   */
  getAssociatedItem(): Item.Implementation | null

  /* -------------------------------------------- */

  /**
   * Get a list of all chat messages containing rolls that originated from this message.
   * @param type  Type of rolls to get. If empty, all roll types will be fetched.
   */
  getAssociatedRolls(type?: string): ChatMessage.Implementation[]

  /* -------------------------------------------- */

  /**
   * Get the original chat message from which this message was created. If no originating message exists,
   * will return this message.
   */
  getOriginatingMessage(): ChatMessage.Implementation
}

export default ChatMessage5e

declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    ChatMessage: typeof ChatMessage5e<ChatMessage.SubType>
  }

  interface ConfiguredChatMessage<SubType extends ChatMessage.SubType> {
    document: ChatMessage5e<SubType>;
  }
}

