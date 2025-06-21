import Application5e from "./api/application.mjs";

/**
 * Application for awarding XP and currency to players.
 */
declare class Award extends Application5e<{
  currency: Record<
    dnd5e.types.Currency.TypeKey,
    {
      label: string,
      icon: string,
      value: number
    }
  >,
  destinations: {doc: Actor.Implementation, icon: string}[],
  each: boolean,
  hideXP: boolean,
  noPrimaryParty: boolean,
  xp: number | null
}, {
  origin: Actor.OfType<'group'>
  award: Award.AwardOptions
}, {
  
}> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Award options.awardCurrency
   */
  get award(): Award.AwardOptions

  /* -------------------------------------------- */

  /**
   * Group actor from which this award is being granted.
   */
  get origin(): Actor.OfType<'group'>

  /* -------------------------------------------- */

  /**
   * Destinations to which XP & currency can be awarded.
   */
  get transferDestinations(): Actor.Implementation[]

  /* -------------------------------------------- */

  /**
   * Is this award coming from a party group actor rather than the /award command?
   */
  get isPartyAward(): boolean

  /* -------------------------------------------- */
  /*  Rendering                                   */


  /**
   * Apply type icons to transfer destinations and prepare them for display in the list.
   */
  static prepareDestinations(
    destinations: Actor.Implementation[], 
    savedDestinations: Set<string>
  ): {doc: Actor.Implementation, icon: string}[] 


  /* -------------------------------------------- */

  /**
   * Ensure the award form is in a valid form to be submitted.
   * @protected
   */
  _validateForm()

  /* -------------------------------------------- */

  /**
   * Handle submitting the award form.
   */
  static #handleFormSubmission(
    this: Award, 
    event: Event | SubmitEvent, 
    form: HTMLFormElement, 
    formData: foundry.applications.ux.FormDataExtended
  ): Promise<void>

  /* -------------------------------------------- */

  /**
   * Save the selected destination IDs to either the current group's flags or the user's flags.
   * @protected
   */
  _saveDestinations(destinations: Actor.Implementation[])

  /* -------------------------------------------- */
  /*  Awarding Methods                            */
  /* -------------------------------------------- */

  /**
   * Award currency, optionally transferring between one document and another.
   * @param {Record<string, number>} amounts   Amount of each denomination to transfer.
   * @param {(Actor5e|Item5e)[]} destinations  Documents that should receive the currency.
   * @param {object} [config={}]
   * @param {boolean} [config.each=false]      Award the specified amount to each player, rather than splitting it.
   * @param {Actor5e|Item5e} [config.origin]   Document from which to move the currency, if not a freeform award.
   * @param {Map<Actor5e|Item5e, object>} [config.results]  Results of the award operation.
   */
  static awardCurrency(
    amounts: Record<dnd5e.types.Currency.TypeKey, number>, 
    destinations: (Actor.Implementation | Item.Implementation)[], 
    config?: { 
      each?: boolean, 
      origin: Actor.Implementation | Item.Implementation, 
      results: Map<Actor.Implementation | Item.Implementation, object>
    }
  ): Promise<void> 

  /* -------------------------------------------- */

  /**
   * Award XP split across the provided destination actors.
   * @param {number} amount            Amount of XP to award.
   * @param {Actor5e[]} destinations   Actors that should receive the XP.
   * @param {object} [config={}]
   * @param {boolean} [config.each=false]      Award the specified amount to each player, rather than splitting it.
   * @param {Actor5e} [config.origin]  Group actor from which to transfer the XP.
   * @param {Map<Actor5e|Item5e, object>} [config.results]  Results of the award operation.
   */
  static awardXP(
    amount: number, 
    destinations: Actor.Implementation[], 
    config?: { 
      each?: boolean, 
      origin: Actor.Implementation, 
      results: Map<Actor.Implementation | Item.Implementation, object>
    }
  ): Promise<void>

  /* -------------------------------------------- */

  /**
   * Display chat messages for awarded currency and XP.
   */
  static displayAwardMessages(
    results: Map<Actor.Implementation | Item.Implementation, object>
  ): Promise<void>

  /* -------------------------------------------- */
  /*  Chat Command                                */
  /* -------------------------------------------- */

  /**
   * Regular expression used to match the /award command in chat messages.
   */
  static COMMAND_PATTERN: RegExp

  /* -------------------------------------------- */

  /**
   * Regular expression used to split currency & xp values from their labels.
   */
  static VALUE_PATTERN: RegExp

  /* -------------------------------------------- */

  /**
   * Use the `chatMessage` hook to determine if an award command was typed.
   * @param {string} message   Text of the message being posted.
   * @returns {boolean|void}   Returns `false` to prevent the message from continuing to parse.
   */
  static chatMessage(message: string): false | void

  /* -------------------------------------------- */

  /**
   * Parse the award command and grant an award.
   */
  static handleAward(message: string): Promise<void>

  /* -------------------------------------------- */

  /**
   * Parse the award command.
   * @param {string} message  Award command typed in chat.
   * @returns {{currency: Record<string, number>, xp: number, party: boolean}}
   */
  static parseAwardCommand(message: string): {
    currency: Record<dnd5e.types.Currency.TypeKey, number>, 
    xp: number, 
    party: boolean
  }
}


declare namespace Award {
  interface AwardOptions {
    currency: Record<string, number> | null;
    each: boolean;
    savedDestinations: Set<string>;
    xp: number | null;
  }
}

export default Award