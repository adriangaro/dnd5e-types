import { filteredKeys } from "../utils.mjs";
import Award from "./award.mjs";
import Application5e from "./api/application.mjs";

/**
 * Application for performing currency conversions & transfers.
 */
export default class CurrencyManager extends Application5e<{
  currency: Actor.OfType<'character'>['system']['currency'],
  destinations: ReturnType<typeof Award['prepareDestinations']>,
  tabs: Record<string, foundry.applications.api.ApplicationV2.Tab>
  tab: foundry.applications.api.ApplicationV2.Tab
}, {
  document: Actor.Implementation | Item.Implementation
}, {

}> {
  constructor(options: Actor.Implementation | Item.Implementation | CurrencyManager['__Configuration'], _options?: CurrencyManager['__Configuration'])

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Document for which the currency is being managed.
   */
  get document(): Actor.Implementation | Item.Implementation

  /* -------------------------------------------- */

  /**
   * Destinations to which currency can be transferred.
   */
  get transferDestinations(): (Actor.Implementation | Item.Implementation)[]

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare the tab information for the sheet.
   * @protected
   */
  _getTabs(): Record<string, foundry.applications.api.ApplicationV2.Tab>

  /* -------------------------------------------- */
  /*  Event Handling                              */
  /* -------------------------------------------- */

  /**
   * Handle setting the transfer amount based on the buttons.
   * @protected
   */
  static #setTransferValue(this: CurrencyManager, event: Event, target: HTMLElement)

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /**
   * Ensure the transfer form is in a valid form to be submitted.
   * @protected
   */
  _validateForm()

  /* -------------------------------------------- */

  /**
   * Handle submitting the currency manager form.
   */
  static #handleFormSubmission(this: Award, event: Event | SubmitEvent, form: HTMLFormElement, formData: FormDataExtended): Promise<void>

  /* -------------------------------------------- */
  /*  Currency Operations                         */
  /* -------------------------------------------- */

  /**
   * Convert all carried currency to the highest possible denomination using configured conversion rates.
   * See CONFIG.DND5E.currencies for configuration.
   */
  static convertCurrency<T extends Actor.Implementation | Item.Implementation =  Actor.Implementation | Item.Implementation>(doc: T): Promise<T>
  /* -------------------------------------------- */

  /**
   * Deduct a certain amount of currency from a given Actor.
   * @param actor                          The actor.
   * @param amount                          The amount of currency.
   * @param denomination                    The currency's denomination.
   * @param options
   * @param options.recursive      Deduct currency from containers as well as the base Actor.
   * @param options.priority  Prioritize higher denominations before lower, or vice-versa.
   * @param options.exact          Prioritize deducting the requested denomination first.
   * @throws {Error} If the Actor does not have sufficient currency.
   */
  static deductActorCurrency<T extends Actor.Implementation>(
    actor: T, 
    amount: number, 
    denomination: dnd5e.types.Currency.TypeKey, 
    options?: {
      recursive?: boolean,
      priority?: 'high' | 'low',
      exact?: boolean
    }
  ): Promise<T> | void

  /* -------------------------------------------- */

  /**
   * Determine model updates for deducting a certain amount of currency from a given Actor.
   * @param {Actor5e} actor                          The actor.
   * @param {number} amount                          The amount of currency.
   * @param {string} denomination                    The currency's denomination.
   * @param {object} [options]
   * @param {boolean} [options.recursive=false]      Deduct currency from containers as well as the base Actor. TODO
   * @param {"high"|"low"} [options.priority="low"]  Prioritize higher denominations before lower, or vice-versa.
   * @param {boolean} [options.exact=true]           Prioritize deducting the requested denomination first.
   * @returns {{ item: object[], remainder: number, [p: string]: any }}
   */
  static getActorCurrencyUpdates(
    actor: Actor.Implementation,
    amount: number, 
    denomination: dnd5e.types.Currency.TypeKey, 
    options?: {
      recursive?: boolean,
      priority?: 'high' | 'low',
      exact?: boolean
    }
  ): { item: object[], remainder: number, [p: string]: any }

  /* -------------------------------------------- */

  /**
   * Transfer currency between one document and another.
   * @param {Actor5e|Item5e} origin       Document from which to move the currency.
   * @param {Document[]} destinations     Documents that should receive the currency.
   * @param {object[]} amounts            Amount of each denomination to transfer.
   */
  static transferCurrency(
    origin: Actor.Implementation | Item.Implementation, 
    destinations: (Actor.Implementation | Item.Implementation)[], 
    amounts: Record<dnd5e.types.Currency.TypeKey, number>
  ): Promise<void>
}
