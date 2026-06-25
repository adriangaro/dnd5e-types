/**
 * `D20Roll` — a d20-based roll (`module/dice/d20-roll.mjs`), extends {@link BasicRoll}. Build/config
 * statics narrow to the `dnd5e.types.Dice.D20Roll*` configs.
 */

import type BasicRoll from "./basic-roll.mjs";

declare class D20Roll<D extends fvttUtils.AnyObject = fvttUtils.AnyObject> extends BasicRoll<D> {
  /** Advantage mode enum: NORMAL (0), ADVANTAGE (1), DISADVANTAGE (-1). */
  static ADV_MODE: {
    readonly NORMAL: 0;
    readonly ADVANTAGE: 1;
    readonly DISADVANTAGE: -1;
  };

  static override DefaultConfigurationDialog: typeof import("../applications/dice/d20-configuration-dialog.mjs").default;

  static override fromConfig(
    config: dnd5e.types.Dice.D20RollConfiguration,
    process: dnd5e.types.Dice.D20RollProcessConfiguration,
  ): D20Roll;

  /** Create a D20Roll from a standard Roll instance. */
  static fromRoll(roll: foundry.dice.Roll): D20Roll;

  /**
   * Determines whether the roll should be fast forwarded and what the default advantage mode should be.
   * @param config   Roll configuration data.
   * @param dialog   Data for the roll configuration dialog.
   * @param message  Configuration data that guides roll message creation.
   */
  static override applyKeybindings(
    config: dnd5e.types.Dice.D20RollProcessConfiguration,
    dialog: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): void;

  static override build(
    config?: dnd5e.types.Dice.D20RollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<D20Roll[]>;

  /** The primary d20 die term of this roll. */
  get d20(): import("./d20-die.mjs").default | undefined;
  /** Set the d20 for this roll. */
  set d20(die: import("./d20-die.mjs").default);

  /** Whether the roll is made with advantage. */
  get hasAdvantage(): boolean;
  /** Whether the roll is made with disadvantage. */
  get hasDisadvantage(): boolean;
  /** Whether the d20 result is a critical success. Returns undefined if roll isn't evaluated. */
  get isCritical(): boolean | undefined;
  /** Whether the d20 result is a critical failure (fumble). Returns undefined if roll isn't evaluated. */
  get isFumble(): boolean | undefined;
  /** Does this roll start with a d20? */
  get validD20Roll(): boolean;

  /** Apply advantage/disadvantage + min/max modifiers to the d20 die. */
  configureModifiers(): void;

  /** Merge two roll options, blending advantage/disadvantage flags and min/max bounds. */
  static override mergeOptions<T extends object>(original?: T, other?: object): T;

  /** Annotate the message flavor with advantage/disadvantage label and reliable talent marker. */
  protected static override _prepareMessageData(rolls: D20Roll[], messageData: object): object;
}

declare namespace D20Roll {
  interface Any extends D20Roll<fvttUtils.AnyObject> {}
  type AnyConstructor = typeof D20Roll;
  /** Advantage mode value: -1 | 0 | 1. */
  type AdvantageMode = dnd5e.types.AdvantageMode;
}

export default D20Roll;
