/** Application for performing currency conversions & transfers. */

import Application5e from "./api/application.mjs";
import Award from "./award.mjs";

declare class CurrencyManager<
  RenderContext extends object = CurrencyManager.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = CurrencyManager.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = CurrencyManager.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Document for which the currency is being managed.
   */
  get document(): Actor.Implementation | Item.Implementation;

  /**
   * Destinations to which currency can be transferred.
   */
  get transferDestinations(): (Actor.Implementation | Item.Implementation)[];

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare the tab information for the sheet.
   * @protected
   */
  _getTabs(): Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /**
   * Ensure the transfer form is in a valid form to be submitted.
   * @protected
   */
  _validateForm(): void;

  /* -------------------------------------------- */
  /*  Currency Operations                         */
  /* -------------------------------------------- */

  /**
   * Convert all carried currency to the highest possible denomination using configured conversion rates.
   * See CONFIG.DND5E.currencies for configuration.
   * @param doc  Actor or container item to convert.
   */
  static convertCurrency<
    T extends Actor.Implementation | Item.Implementation = Actor.Implementation | Item.Implementation
  >(doc: T): Promise<T>;

  /**
   * Deduct a certain amount of currency from a given Actor.
   * @param actor         The actor.
   * @param amount        The amount of currency.
   * @param denomination  The currency's denomination.
   * @throws {Error} If the Actor does not have sufficient currency.
   */
  static deductActorCurrency<T extends Actor.Implementation>(
    actor: T,
    amount: number,
    denomination: dnd5e.types.Currency.TypeKey,
    options?: dnd5e.types.applications.CurrencyUpdateOptions
  ): Promise<T> | void;

  /**
   * Determine model updates for deducting a certain amount of currency from a given Actor.
   * @param actor         The actor.
   * @param amount        The amount of currency.
   * @param denomination  The currency's denomination.
   */
  static getActorCurrencyUpdates(
    actor: Actor.Implementation,
    amount: number,
    denomination: dnd5e.types.Currency.TypeKey,
    options?: dnd5e.types.applications.CurrencyUpdateOptions
  ): { item: object[]; remainder: number; [p: string]: any };

  /**
   * Transfer currency between one document and another.
   * @param origin        Document from which to move the currency.
   * @param destinations  Documents that should receive the currency.
   * @param amounts       Amount of each denomination to transfer.
   */
  static transferCurrency(
    origin: Actor.Implementation | Item.Implementation,
    destinations: (Actor.Implementation | Item.Implementation)[],
    amounts: Record<dnd5e.types.Currency.TypeKey, number>
  ): Promise<void>;
}

declare namespace CurrencyManager {
  interface Any extends CurrencyManager<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CurrencyManager<any, any, any>> {}

  /** Render context for `CurrencyManager`. Open for declaration merging; extended by subclasses. */
  interface RenderContext extends Application5e.RenderContext {
    currency: (Actor.Implementation | Item.Implementation)["system"] extends { currency: infer C } ? C : Record<string, number>;
    destinations: ReturnType<typeof Award.prepareDestinations>;
    tabs: Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;
    tab: Partial<foundry.applications.api.ApplicationV2.Tab>;
  }

  /** Configuration for `CurrencyManager`. Open for declaration merging; extended by subclasses. */
  interface Configuration extends Application5e.Configuration {
    document: Actor.Implementation | Item.Implementation;
  }

  /** Render options for `CurrencyManager`. Open for declaration merging; extended by subclasses. */
  interface RenderOptions extends Application5e.RenderOptions {}
}

export default CurrencyManager;
