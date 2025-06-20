import D20RollConfigurationDialog from "../applications/dice/d20-configuration-dialog.mjs";
import BasicRoll from "./basic-roll.mjs";

/* -------------------------------------------- */

declare class D20Roll<
  D extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  Configuration extends fvttUtils.AnyObject = {},
  ProcessConfiguration extends fvttUtils.AnyObject = {},
  DialogConfiguration extends fvttUtils.AnyObject = {},
  MessageConfiguration extends fvttUtils.AnyObject = {},
> extends BasicRoll<
  D,
  D20Roll.MakeConfiguration<Configuration>,
  D20Roll.MakeProcessConfiguration<
    ProcessConfiguration,
    D20Roll.MakeConfiguration<Configuration>
  >,
  D20Roll.MakeDialogConfiguration<DialogConfiguration>,
  D20Roll.MakeMessageConfiguration<MessageConfiguration>
> {
  /* -------------------------------------------- */

  /**
   * Advantage mode of a 5e d20 roll
   */
  static ADV_MODE: {
    NORMAL: 0;
    ADVANTAGE: 1;
    DISADVANTAGE: -1;
  };

  /* -------------------------------------------- */

  /** @inheritDoc */
  static override DefaultConfigurationDialog: D20RollConfigurationDialog.AnyConstructor;

  /* -------------------------------------------- */
  /*  Static Construction                         */
  /* -------------------------------------------- */

  /**
   * Create a D20Roll from a standard Roll instance.
   */
  static fromRoll<This extends typeof D20Roll>(
    this: This,
    roll: foundry.dice.Roll,
  ): InstanceType<This>;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The primary die used in this d20 roll.
   */
  get d20(): dnd5e.dice.D20Die | undefined;

  /* -------------------------------------------- */

  /**
   * Set the d20 for this roll.
   */
  set d20(die: dnd5e.dice.D20Die);

  /* -------------------------------------------- */

  /**
   * A convenience reference for whether this D20Roll has advantage.
   */
  get hasAdvantage(): boolean;

  /* -------------------------------------------- */

  /**
   * A convenience reference for whether this D20Roll has disadvantage.
   */
  get hasDisadvantage(): boolean;

  /* -------------------------------------------- */

  /**
   * Is this roll a critical success? Returns undefined if roll isn't evaluated.
   */
  get isCritical(): boolean | undefined;

  /* -------------------------------------------- */

  /**
   * Is this roll a critical failure? Returns undefined if roll isn't evaluated.
   */
  get isFumble(): boolean | undefined;

  /* -------------------------------------------- */

  /**
   * Does this roll start with a d20?
   */
  get validD20Roll(): boolean;

  /* -------------------------------------------- */
  /*  Roll Configuration                          */
  /* -------------------------------------------- */

  /**
   * Apply optional modifiers which customize the behavior of the d20term
   */
  configureModifiers();

  /* -------------------------------------------- */

  /**
   * Ensure the d20 die for this roll is actually a D20Die instance.
   */
  #createD20Die();
}

declare class AnyD20Roll extends D20Roll<
  fvttUtils.AnyObject,
  fvttUtils.EmptyObject,
  fvttUtils.EmptyObject,
  fvttUtils.EmptyObject,
  fvttUtils.EmptyObject
> {
  constructor(...args: any[]);
}

declare namespace D20Roll {
  interface Any extends AnyD20Roll {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyD20Roll> {}
  interface DefaultConstructor
    extends fvttUtils.Identity<
      typeof D20Roll<fvttUtils.AnyObject, {}, {}, {}, {}>
    > {}

  type AdvantageMode = -1 | 0 | 1;

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> =
    fvttUtils.PrettifyType<
      dnd5e.types.DeepMerge<
        {
          /** Parts used to construct the roll formula, not including the d20 die. */
          parts: string[]; // Overrides optional parts in base to be required

          /** Options passed through to the roll. */
          options: Options; // Overrides options type in base
        },
        Cfg
      >
    >;
  type Configuration = fvttUtils.PrettifyType<D20Roll["__Configuration"]>;

  type MakeProcessConfiguration<
    PrcCfg extends fvttUtils.AnyObject = {},
    Cfg extends MakeConfiguration<any> = MakeConfiguration,
  > = fvttUtils.PrettifyType<
    dnd5e.types.DeepMerge<
      {
        /** Apply advantage to each roll. */
        advantage?: boolean;

        /** Apply disadvantage to each roll. */
        disadvantage?: boolean;

        /** Use three dice when rolling with advantage. */
        elvenAccuracy?: boolean;

        /** Add a re-roll once modifier to the d20 die. */
        halflingLucky?: boolean;

        /** Set the minimum for the d20 roll to 10. */
        reliableTalent?: boolean;

        /** Configuration data for individual rolls. */
        rolls: BasicRoll.MakeConfiguration<Cfg>[];
      },
      PrcCfg
    >
  >;
  type ProcessConfiguration = fvttUtils.PrettifyType<D20Roll["__ProcessConfiguration"]>;

  /* -------------------------------------------- */

  interface Options extends BasicRoll.Options {
    /** Does this roll potentially have advantage? */
    advantage?: boolean | null;

    /** Does this roll potentially have disadvantage? */
    disadvantage?: boolean | null;

    /** Final advantage mode. */
    advantageMode?: AdvantageMode | null;

    /** The value of the d20 die to be considered a critical success. */
    criticalSuccess?: number | null;

    /** The value of the d20 die to be considered a critical failure. */
    criticalFailure?: number | null;

    /** Use three dice when rolling with advantage. */
    elvenAccuracy?: boolean | null;

    /** Add a re-roll once modifier to the d20 die. */
    halflingLucky?: boolean | null;

    /** Maximum number the d20 die can roll. */
    maximum?: number | null;

    /** Minimum number the d20 die can roll. */
    minimum?: number | null;
  }

  type MakeDialogConfiguration<DlgCfg extends fvttUtils.AnyObject = {}> =
    fvttUtils.PrettifyType<
      dnd5e.types.DeepMerge<
        BasicRoll.MakeDialogAppConfig<typeof D20RollConfigurationDialog>,
        DlgCfg
      >
    >;
  type DialogConfiguration = fvttUtils.PrettifyType<D20Roll["__DialogConfiguration"]>;

  /* -------------------------------------------- */

  /**
   * Configuration data for creating a roll message.
   */

  type MakeMessageConfiguration<MsgCfg extends fvttUtils.AnyObject = {}> =
    fvttUtils.PrettifyType<dnd5e.types.DeepMerge<{}, MsgCfg>>;
  type MessageConfiguration = fvttUtils.PrettifyType<D20Roll["__MessageConfiguration"]>;
}

export default D20Roll;