/**
 * `BasicRoll` — dnd5e's base roll (`module/dice/basic-roll.mjs`), extends `foundry.dice.Roll`.
 * The build/config statics take the augmentable `dnd5e.types.Dice.*` config interfaces, so widening
 * a config (see src/module/dice/_types.d.mts) flows straight into these signatures.
 */

import type RollConfigurationDialog from "../applications/dice/roll-configuration-dialog.mjs";

declare class BasicRoll<D extends fvttUtils.AnyObject = fvttUtils.AnyObject> extends foundry.dice.Roll<D> {
  /** Default configuration-dialog application class. */
  static DefaultConfigurationDialog: typeof RollConfigurationDialog;

  /** Construct a roll instance from the provided config + process config. */
  static fromConfig(
    config: dnd5e.types.Dice.BasicRollConfiguration,
    process: dnd5e.types.Dice.BasicRollProcessConfiguration,
  ): BasicRoll;

  /** Construct roll parts and populate its data object. */
  static constructParts(parts: Record<string, string | number | null | undefined>, data?: object): { parts: string[]; data: object };

  /** Full build pipeline: configure → evaluate → post (chat message). */
  static build(
    config?: dnd5e.types.Dice.BasicRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<BasicRoll[]>;

  /** Stage one of the standard rolling workflow, configuring the roll. */
  static buildConfigure(
    config?: dnd5e.types.Dice.BasicRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<BasicRoll[]>;

  /** Stage 2 — evaluate the built rolls. */
  static buildEvaluate(
    rolls: BasicRoll[],
    config?: dnd5e.types.Dice.BasicRollProcessConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<void>;

  /** Stage 3 — create the chat message for the evaluated rolls. */
  static buildPost(
    rolls: BasicRoll[],
    config: dnd5e.types.Dice.BasicRollProcessConfiguration,
    message: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<globalThis.ChatMessage.Implementation | void>;

  /** Determines whether the roll process should be fast forwarded. */
  static applyKeybindings(
    config: dnd5e.types.Dice.BasicRollProcessConfiguration,
    dialog: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): void;

  /**
   * Transform a Roll instance into a ChatMessage, displaying the roll result.
   * This function can either create the ChatMessage directly, or return the data object that will be used to create it.
   * @param rolls       Rolls to add to the message.
   * @param messageData The data object to use when creating the message.
   * @param options     Additional options which modify the created message.
   */
  static toMessage(
    rolls: BasicRoll[],
    messageData?: object,
    options?: { rollMode?: string; create?: boolean },
  ): Promise<globalThis.ChatMessage.Implementation | object | void>;

  /** Hook to mutate message data before creation. */
  protected static _prepareMessageData(rolls: BasicRoll[], messageData: object): object;

  /** Replace `@key` references in a formula with values from data. */
  static replaceFormulaData(formula: string, data: object, options?: object): string;

  /**
   * Gets information from passed die and calculates the maximum or minimum value that could be rolled.
   * @param die     DiceTerm to get the maximum/minimum value.
   * @param options Additional options to modify preCalculate functionality.
   * @returns Maximum/Minimum value that could be rolled as an integer, or null if the modifiers could not be precalculated.
   */
  static preCalculateTerm(die: foundry.dice.terms.RollTerm, options?: { minimize?: boolean }): number | null;

  /** Retrieve the message mode to use, treating in-character as public by default. */
  static getMessageMode(ignoreIC?: boolean): string;

  /** Merge two process/roll configs. */
  static mergeConfigs<T extends object>(original: T, other?: object): T;
  /** Merge two roll options. */
  static mergeOptions<T extends object>(original?: T, other?: object): T;

  /** The chat message this roll originated from, if any. */
  getOriginatingMessage(): globalThis.ChatMessage.Implementation | null;

  /** Is the result of this roll a failure? Returns `undefined` if roll isn't evaluated. */
  get isFailure(): boolean | undefined;
  /** Is the result of this roll a success? Returns `undefined` if roll isn't evaluated. */
  get isSuccess(): boolean | undefined;

  /** Invert the roll's formula, resulting in a formula whose total, if multiplied by -1, will be the same as the evaluated total of the original formula. */
  invert(): this;

  /** Pre-calculate the min/max of each dice term without evaluating. */
  preCalculateDiceTerms(options?: { minimize?: boolean }): void;

  /** Replace number and faces of dice terms with numeric values where possible. */
  simplify(): void;
}

declare namespace BasicRoll {
  /** Any concrete BasicRoll. */
  interface Any extends BasicRoll<fvttUtils.AnyObject> {}
  type AnyConstructor = typeof BasicRoll;
}

export default BasicRoll;
