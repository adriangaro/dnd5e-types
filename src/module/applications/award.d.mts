/** Application for awarding XP and currency to players. */

import Application5e from "./api/application.mjs";

declare class Award<
  RenderContext extends object = Award.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = Award.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = Award.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** Award options. */
  get award(): Award.AwardOptions;

  /** Group actor from which this award is being granted. */
  get origin(): Actor.OfType<"group"> | null;

  /** Destinations to which XP & currency can be awarded. */
  get transferDestinations(): Actor.Implementation[];

  /** Is this award coming from a party group actor rather than the /award command? */
  get isPartyAward(): boolean;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** Apply type icons to transfer destinations and prepare them for display in the list. */
  static prepareDestinations(
    destinations: foundry.abstract.Document.Any[],
    savedDestinations?: Set<string>,
  ): { doc: foundry.abstract.Document.Any; checked?: boolean; icon: string }[];

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /** Ensure the award form is in a valid form to be submitted. */
  protected _validateForm(): void;

  /** Save the selected destination IDs to either the current group's flags or the user's flags. */
  protected _saveDestinations(destinations: Actor.Implementation[]): void;

  /* -------------------------------------------- */
  /*  Awarding Methods                            */
  /* -------------------------------------------- */

  /** Award currency, optionally transferring between one document and another. */
  static awardCurrency(
    amounts: Record<dnd5e.types.Currency.TypeKey, number>,
    destinations: (Actor.Implementation | Item.Implementation)[],
    config?: {
      each?: boolean;
      origin?: Actor.Implementation | Item.Implementation;
      results?: Map<Actor.Implementation | Item.Implementation, Award.AwardResult>;
    },
  ): Promise<void>;

  /** Award XP split across the provided destination actors. */
  static awardXP(
    amount: number | undefined,
    destinations: Actor.Implementation[],
    config?: {
      each?: boolean;
      origin?: Actor.Implementation;
      results?: Map<Actor.Implementation | Item.Implementation, Award.AwardResult>;
    },
  ): Promise<void>;

  /** Display chat messages for awarded currency and XP. */
  static displayAwardMessages(
    results: Map<Actor.Implementation | Item.Implementation, Award.AwardResult>,
  ): Promise<void>;

  /* -------------------------------------------- */
  /*  Chat Command                                */
  /* -------------------------------------------- */

  /** Regular expression used to match the /award command in chat messages. */
  static COMMAND_PATTERN: RegExp;

  /** Regular expression used to split currency & xp values from their labels. */
  static VALUE_PATTERN: RegExp;

  /**
   * Use the `chatMessage` hook to determine if an award command was typed.
   * @param message  Text of the message being posted.
   * @returns Returns `false` to prevent the message from continuing to parse.
   */
  static chatMessage(message: string): false | void;

  /** Parse the award command and grant an award. */
  static handleAward(message: string): Promise<void>;

  /** Parse the award command. */
  static parseAwardCommand(message: string): {
    currency: Record<dnd5e.types.Currency.TypeKey, string>;
    xp: number | undefined;
    each: boolean;
    party: boolean;
  };
}

declare namespace Award {
  interface Any extends Award<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof Award<any, any, any>> {}

  /** Render context for `Award`. Open for declaration merging; extended by subclasses. */
  interface RenderContext extends Application5e.RenderContext {
    currency: Record<
      dnd5e.types.Currency.TypeKey,
      {
        label: string;
        icon: string;
        value: number;
      }
    >;
    destinations: { doc: foundry.abstract.Document.Any; checked?: boolean; icon: string }[];
    each: boolean;
    hideXP: boolean;
    noPrimaryParty: boolean;
    xp: number | null | undefined;
  }

  /** Configuration for `Award`. Open for declaration merging; extended by subclasses. */
  interface Configuration extends Application5e.Configuration {
    award: Award.AwardOptions;
    origin: Actor.OfType<"group"> | null;
  }

  /** Render options for `Award`. Open for declaration merging; extended by subclasses. */
  interface RenderOptions extends Application5e.RenderOptions {}

  /** Award options. */
  interface AwardOptions {
    currency: Record<dnd5e.types.Currency.TypeKey, number> | null;
    each: boolean;
    savedDestinations: Set<string>;
    xp: number | null;
  }

  /** Result shape populated by `awardCurrency` and `awardXP`. */
  interface AwardResult {
    currency?: Record<dnd5e.types.Currency.TypeKey, number>;
    xp?: number;
  }
}

export default Award;
