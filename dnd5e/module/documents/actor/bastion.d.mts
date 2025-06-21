import Dialog5e from "../../applications/api/dialog.mjs";


/**
 * A singleton class that manages global Bastion activity.
 */
declare class Bastion {
  /**
   * The template for the chat card summary of a bastion attack.
   */
  static ATTACK_TEMPLATE: string;

  /**
   * The template for the chat card summary of a bastion turn.
   */
  static TURN_TEMPLATE: string;

  /* -------------------------------------------- */
  /*  Public API                                  */
  /* -------------------------------------------- */

  /**
   * Advance all bastions by a turn.
   */
  advanceAllBastions(): Promise<void>

  /* -------------------------------------------- */

  /**
   * Advance all the facilities of a given Actor by one bastion turn.
   * @param actor                   The actor.
   * @param options
   * @param options.duration     The number of days the bastion turn spanned.
   * @param options.summary  Print a chat message summary of the turn.
   */
  advanceAllFacilities(
    actor: Actor.OfType<'character'>, 
    options?: { 
      duration?: number, 
      summary?: boolean 
    }
  ): Promise<void>

  /* -------------------------------------------- */

  /**
   * Advance the given facility by one bastion turn.
   * @param facility              The facility.
   * @param options
   * @param options.duration  The number of days the bastion turn spanned.
   * @returns {Promise<BastionTurnResult>}
   */
  advanceTurn(
    facility: Item.OfType<'facility'>, 
    options?: { duration?: number }
  ): Promise<Bastion.TurnResult>

  /* -------------------------------------------- */

  /**
   * Resolve a bastion attack against a given Actor's bastion.
   * @param actor   The Actor.
   * @param formula  The attack formula.
   * @param options
   * @param options.summary  Print a chat message summary of the attack.
   * @param options.threshold    The maximum number on a die roll that is considered a defender death.
   * @returns                The number of defenders who died in the attack.
   */
  resolveAttack(
    actor: Actor.OfType<'character'>, 
    formula: string, 
    option?: { summary?: boolean, threshold?: number }
  ): Promise<void>

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Attach interactivity to chat messages.
   * @param message  The chat message.
   * @param html       The rendered chat card element.
   * @internal
   */
  _activateChatListeners(message: ChatMessage.Implementation, html: HTMLElement)

  /* -------------------------------------------- */

  /**
   * Evaluate the completion of an order.
   * @param facility  The facility.
   * @param order     The order that was completed.
   * @param updates   Facility updates.
   */
  #evaluateOrder(
    facility: Item.OfType<'facility'>, order: string, updates: object
  ): Omit<Bastion.TurnResult, 'order'>

  /* -------------------------------------------- */

  /**
   * Evaluate the completion of a build order.
   * @param facility  The facility.
   * @param updates   Facility updates.
   */
  #evaluateBuildOrder(facility: Item.OfType<'facility'>, updates: object): Omit<Bastion.TurnResult, 'order'>

  /* -------------------------------------------- */

  /**
   * Evaluate the completion of a craft order.
   * @param facility          The facility.
   * @param updates           Facility updates.
   */
  #evaluateCraftOrder(facility: Item.OfType<'facility'>, updates: object): Omit<Bastion.TurnResult, 'order'>

  /* -------------------------------------------- */

  /**
   * Evaluate the completion of an enlarge order.
   * @param facility  The facility.
   * @param updates   Facility updates.
   */
  #evaluateEnlargeOrder(facility: Item.OfType<'facility'>, updates: object): Omit<Bastion.TurnResult, 'order'>

  /* -------------------------------------------- */

  /**
   * Evaluate the completion of a harvest order.
   * @param facility  The facility.
   * @param updates   Facility updates.
   */
  #evaluateHarvestOrder(facility: Item.OfType<'facility'>, updates: object): Omit<Bastion.TurnResult, 'order'>

  /* -------------------------------------------- */

  /**
   * Evaluate the completion of a repair order.
   * @param facility  The facility.
   * @param updates   Facility updates.
   */
  #evaluateRepairOrder(facility: Item.OfType<'facility'>, updates: object): Omit<Bastion.TurnResult, 'order'>

  /* -------------------------------------------- */

  /**
   * Evaluate the completion of a trade order.
   * @param facility  The facility.
   * @param updates   Facility updates.
   */
  #evaluateTradeOrder(facility: Item.OfType<'facility'>, updates: object): Omit<Bastion.TurnResult, 'order'>

  /* -------------------------------------------- */

  /**
   * Retrieve a list of defenders for the given Actor's bastion.
   * @param actor  The actor.
   */
  #getDefenders(actor: Actor.OfType<'character'>): { facility: Item.OfType<'facility'>, uuid: string }[]

  /* -------------------------------------------- */

  /**
   * Handle clicking action elements in chat cards.
   * @param event     The triggering event.
   * @param target     The action element.
   * @param message  The chat message.
   */
  #onChatAction(event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation)

  /* -------------------------------------------- */

  /**
   * Handle claiming gold from a bastion turn summary message.
   * @param message  The message.
   */
   #onClaimGold(message: ChatMessage.Implementation): Promise<ChatMessage.Implementation | void>

  /* -------------------------------------------- */

  /**
   * Handle dragging an item created as part of order completion.
   * @param event    The initiating drag event.
   * @param item        The created item.
   * @param updates   Updates to apply to the Item.
   */
  #onDragItem(event: DragEvent, item: Item.Implementation, updates?: object)

  /* -------------------------------------------- */

  /**
   * Handle automatic resolution of a bastion attack via chat message.
   * @param message  The message.
   */
  #onResolveAttack(message: ChatMessage.Implementation): Promise<ChatMessage.Implementation | void>

  /* -------------------------------------------- */

  /**
   * Handle viewing a created item.
   * @param target  The item element.
   */
  #onViewItem(target: HTMLElement): Promise<any>

  /* -------------------------------------------- */

  /**
   * Render a chat card summary for the bastion attack.
   * @param actor                 The actor whose bastion was attacked.
   * @param roll                     The bastion attack roll.
   * @param results
   * @param results.damaged      The ID of the facility damaged in the attack.
   * @param results.deaths       The number of bastion defenders slain in the attack.
   * @param results.undefended  If the bastion was undefended during the attack.
   * @param results.resolved    Whether the attack has been automatically resolved.
   */
  #renderAttackSummary(
    actor: Actor.OfType<'character'>, 
    roll: Roll, 
    results?: { 
      damaged?: string, 
      deaths?: number, 
      undefended?: boolean, 
      resolved?: boolean 
    }
  ): Promise<string> 
  /* -------------------------------------------- */

  /**
   * Render a chat card summary for the bastion turn results.
   * @param actor                                     The actor whose turn it was.
   * @param results
   * @param results.items                   The items produced during the turn.
   * @param results.gold  Gold generated during the turn.
   * @param results.orders    Orders completed during the turn.
   */
  #renderTurnSummary(
    actor: Actor.OfType<'character'>, 
    results: {
      items: Bastion.TurnItem[],
      gold: { value: number, claimed: boolean },
      orders: { id: string, order: string }[]
    }
  ): Promise<string> 

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Confirm the bastion turn should be advanced.
   */
  confirmAdvance(): Promise<void>

  /* -------------------------------------------- */

  /**
   * Initialize the bastion UI.
   */
  initializeUI()
  /* -------------------------------------------- */

  /**
   * Prompt the DM to resolve a bastion attack against a specific Actor.
   * @param actor  The Actor.
   */
  promptAttack(actor?: Actor.OfType<'character'> | null): Promise<void>
}

declare namespace Bastion {
  interface TurnResult {
    order?: string;
    gold?: number;
    items?: TurnItem[];
  }
  
  interface TurnItem {
    uuid: string;
    quantity: number;
  }
  
}

export default Bastion

/* -------------------------------------------- */

/**
 * A dialog for resolving bastion attacks.
 */
declare class BastionAttackDialog extends Dialog5e<{
  formula: {
    field: foundry.data.fields.StringField,
    name: string
  }
}, {
  actor: Actor.OfType<'character'>
}, {
  dnd5e?: {
    submitted?: boolean
  }
}> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The Actor whose bastion is being attacked.
   */
  #actor: Actor.OfType<'character'>;

  /**
   * The bastion attack formula.
   */
  get formula(): string | null

  #formula: string | null;

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Handle submission of the dialog.
   * @param event          The form submission event.
   * @param form       The submitted form.
   * @param formData  Data from the dialog.
   */
  static #handleFormSubmission(
    this: BastionAttackDialog, event: SubmitEvent, form: HTMLFormElement, formData: foundry.applications.ux.FormDataExtended
  ): Promise<void>

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * Create the bastion attack prompt.
   * @param actor      The Actor whose bastion is being attacked.
   * @returns  A promise that resolves to the input bastion attack formula.
   */
  static prompt(actor: Actor.OfType<'character'>): Promise<string>
}
