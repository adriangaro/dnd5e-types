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
  D20Roll.Configuration<Configuration>,
  D20Roll.ProcessConfiguration<ProcessConfiguration, D20Roll.Configuration<Configuration>>,
  D20Roll.DialogConfiguration<DialogConfiguration>,
  D20Roll.MessageConfiguration<MessageConfiguration>
> {
  /* -------------------------------------------- */

  /**
   * Advantage mode of a 5e d20 roll
   */
  static ADV_MODE: {
    NORMAL: 0,
    ADVANTAGE: 1,
    DISADVANTAGE: -1
  };

  /* -------------------------------------------- */

  /** @inheritDoc */
  static override DefaultConfigurationDialog: typeof D20RollConfigurationDialog<any, any, any>;

  /* -------------------------------------------- */
  /*  Static Construction                         */
  /* -------------------------------------------- */

  /**
   * Create a D20Roll from a standard Roll instance.
   */
  static fromRoll<This extends typeof D20Roll>(
    this: This,
    roll: foundry.dice.Roll
  ): InstanceType<This>


  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The primary die used in this d20 roll.
   */
  get d20(): dnd5e.dice.D20Die | undefined

  /* -------------------------------------------- */

  /**
   * Set the d20 for this roll.
   */
  set d20(die: dnd5e.dice.D20Die)

  /* -------------------------------------------- */

  /**
   * A convenience reference for whether this D20Roll has advantage.
   */
  get hasAdvantage(): boolean

  /* -------------------------------------------- */

  /**
   * A convenience reference for whether this D20Roll has disadvantage.
   */
  get hasDisadvantage(): boolean

  /* -------------------------------------------- */

  /**
   * Is this roll a critical success? Returns undefined if roll isn't evaluated.
   */
  get isCritical(): boolean | undefined

  /* -------------------------------------------- */

  /**
   * Is this roll a critical failure? Returns undefined if roll isn't evaluated.
   */
  get isFumble(): boolean | undefined

  /* -------------------------------------------- */

  /**
   * Does this roll start with a d20?
   */
  get validD20Roll(): boolean


  /* -------------------------------------------- */
  /*  Roll Configuration                          */
  /* -------------------------------------------- */

  /**
   * Apply optional modifiers which customize the behavior of the d20term
   */
  configureModifiers()

  /* -------------------------------------------- */

  /**
   * Ensure the d20 die for this roll is actually a D20Die instance.
   */
  #createD20Die()

  /* -------------------------------------------- */
  /*  Configuration Dialog                        */
  /* -------------------------------------------- */

  /**
   * Create a Dialog prompt used to configure evaluation of an existing D20Roll instance.
   */
  configureDialog(data?: {
    title?: string,
    defaultRollMode?: D20Roll.AdvantageMode,
    defaultAction?: number,
    ammunitionOptions?: dnd5e.types.FormSelectOption[],
    attackModes?: dnd5e.types.FormSelectOption[],
    chooseModifier?: boolean,
    defaultAbility?: dnd5e.types.Ability.TypeKey,
    masteryOptions?: dnd5e.types.FormSelectOption[],
    template?: string
  }, options?: object): Promise<this | null>
}


declare class AnyD20Roll extends D20Roll<fvttUtils.EmptyObject, {}, {}, {}, {}> {
  constructor(...args: never);
}

declare namespace D20Roll {
  interface Any extends AnyD20Roll {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyD20Roll> {}
  type DefaultConstructor = typeof D20Roll<fvttUtils.EmptyObject, {}, {}, {}, {}>

  type AdvantageMode = -1 | 0 | 1

  type Configuration<
    Cfg extends fvttUtils.AnyObject = {}
  > = fvttUtils.PrettifyType<dnd5e.types.DeepMerge<
    {
      /** Parts used to construct the roll formula, not including the d20 die. */
      parts: string[]; // Overrides optional parts in base to be required

      /** Options passed through to the roll. */
      options: Options; // Overrides options type in base
    },
    Cfg
  >>
  type ProcessConfiguration<
    PrcCfg extends fvttUtils.AnyObject = {},
    Cfg extends Configuration<any> = Configuration
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
        rolls: Cfg[]; // Overrides rolls type in base
      },
      PrcCfg
    >
  >

  /* -------------------------------------------- */

  interface Options extends BasicRoll.Options {
    /** Does this roll potentially have advantage? */
    advantage?: boolean;

    /** Does this roll potentially have disadvantage? */
    disadvantage?: boolean;

    /** Final advantage mode. */
    advantageMode?: AdvantageMode;

    /** The value of the d20 die to be considered a critical success. */
    criticalSuccess?: number;

    /** The value of the d20 die to be considered a critical failure. */
    criticalFailure?: number;

    /** Use three dice when rolling with advantage. */
    elvenAccuracy?: boolean;

    /** Add a re-roll once modifier to the d20 die. */
    halflingLucky?: boolean;

    /** Maximum number the d20 die can roll. */
    maximum?: number;

    /** Minimum number the d20 die can roll. */
    minimum?: number;
  }

  type DialogConfiguration<
    DlgCfg extends fvttUtils.AnyObject = {},
  > = fvttUtils.PrettifyType<
    dnd5e.types.DeepMerge<
      {

      },
      DlgCfg
    >
  >

  /* -------------------------------------------- */

  /**
  * Configuration data for creating a roll message.
  */

  type MessageConfiguration<
    MsgCfg extends fvttUtils.AnyObject = {},
  > = fvttUtils.PrettifyType<
    dnd5e.types.DeepMerge<
      {
      },
      MsgCfg
    >
  >

}

export default D20Roll;

/* -------------------------------------------- */

/**
 * Translate new config objects back into old config objects for deprecated hooks.
 * @internal
 */
export function _createDeprecatedD20Config(
  rollConfig: D20Roll['__ProcessConfiguration'], 
  dialogConfig: BasicRoll['__DialogConfiguration'], 
  messageConfig: BasicRoll['__MessageConfiguration']
): dnd5e.dice.d20Roll.DeprecatedD20RollConfiguration

/* -------------------------------------------- */

/**
 * Apply changes from old config objects back onto new config objects.
 * @internal
 */
export function _applyDeprecatedD20Configs(
  rollConfig: D20Roll['__ProcessConfiguration'], 
  dialogConfig: BasicRoll['__DialogConfiguration'], 
  messageConfig: BasicRoll['__MessageConfiguration'],
  options: dnd5e.dice.d20Roll.DeprecatedD20RollConfiguration
)

