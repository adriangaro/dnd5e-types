import RollConfigurationDialog from "../applications/dice/roll-configuration-dialog.mjs";

/**
 * Custom base roll type with methods for building rolls, presenting prompts, and creating messages.
 */
declare class BasicRoll<
  D extends fvttUtils.AnyObject = fvttUtils.AnyObject,
  Configuration extends fvttUtils.AnyObject = {},
  ProcessConfiguration extends fvttUtils.AnyObject = {},
  DialogConfiguration extends fvttUtils.AnyObject = {},
  MessageConfiguration extends fvttUtils.AnyObject = {},
> extends Roll<D> {
  __Configuration: BasicRoll.MakeConfiguration<Configuration>;
  __ProcessConfiguration: BasicRoll.MakeProcessConfiguration<
    ProcessConfiguration,
    BasicRoll.MakeConfiguration<Configuration>
  >;
  __DialogConfiguration: BasicRoll.MakeDialogConfiguration<DialogConfiguration>;
  __MessageConfiguration: BasicRoll.MakeMessageConfiguration<MessageConfiguration>;

  /**
   * Default application used for the roll configuration prompt.
   */
  static DefaultConfigurationDialog: RollConfigurationDialog.AnyConstructor;

  /* -------------------------------------------- */
  /*  Static Construction                         */
  /* -------------------------------------------- */

  /**
   * Create a roll instance from a roll config.
   */
  static fromConfig<This extends typeof BasicRoll>(
    this: This,
    config: InstanceType<This>["__Configuration"],
    process: InstanceType<This>["__ProcessConfiguration"],
  ): InstanceType<This>;

  /* -------------------------------------------- */

  /**
   * Construct roll parts and populate its data object.
   */
  static constructParts(
    parts: object,
    data?: object,
  ): { parts: string[]; data: object };

  /* -------------------------------------------- */

  /**
   * Construct and perform a roll through the standard workflow.
   */
  static build<This extends BasicRoll.AnyConstructor>(
    config?: InstanceType<This>["__ProcessConfiguration"],
    dialog?: InstanceType<This>["__DialogConfiguration"],
    message?: InstanceType<This>["__MessageConfiguration"],
  ): Promise<InstanceType<This>>;

  /* -------------------------------------------- */

  /**
   * Stage one of the standard rolling workflow, configuring the roll.
   */
  static buildConfigure<This extends BasicRoll.AnyConstructor>(
    this: This,
    config?: InstanceType<This>["__ProcessConfiguration"],
    dialog?: InstanceType<This>["__DialogConfiguration"],
    message?: InstanceType<This>["__MessageConfiguration"],
  ): Promise<InstanceType<This>>;

  /* -------------------------------------------- */

  /**
   * Stage two of the standard rolling workflow, evaluating the rolls.
   */
  static buildEvaluate<This extends BasicRoll.AnyConstructor>(
    this: This,
    rolls: InstanceType<This>[],
    config?: InstanceType<This>["__ProcessConfiguration"],
    message?: InstanceType<This>["__MessageConfiguration"],
  ): Promise<InstanceType<This>>;
  /* -------------------------------------------- */

  /**
   * Stage three of the standard rolling workflow, posting a message to chat.
   */
  static buildPost<This extends BasicRoll.AnyConstructor>(
    this: This,
    rolls: InstanceType<This>[],
    config?: InstanceType<This>["__ProcessConfiguration"],
    message?: InstanceType<This>["__MessageConfiguration"],
  ): Promise<ChatMessage.Implementation>;

  /* -------------------------------------------- */

  /**
   * Determines whether the roll process should be fast forwarded.
   */
  static applyKeybindings<This extends BasicRoll.AnyConstructor>(
    this: This,
    config: InstanceType<This>["__ProcessConfiguration"],
    dialog: InstanceType<This>["__DialogConfiguration"],
    message: InstanceType<This>["__MessageConfiguration"],
  );

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Is the result of this roll a failure? Returns `undefined` if roll isn't evaluated.
   */
  get isFailure(): boolean | undefined;

  /* -------------------------------------------- */

  /**
   * Is the result of this roll a success? Returns `undefined` if roll isn't evaluated.
   */
  get isSuccess(): boolean | undefined;

  /* -------------------------------------------- */
  /*  Chat Messages                               */
  /* -------------------------------------------- */

  /**
   * Transform a Roll instance into a ChatMessage, displaying the roll result.
   * This function can either create the ChatMessage directly, or return the data object that will be used to create it.
   *
   * @param {BasicRoll[]} rolls              Rolls to add to the message.
   * @param {object} messageData             The data object to use when creating the message.
   * @param {options} [options]              Additional options which modify the created message.
   * @param {string} [options.rollMode]      The template roll mode to use for the message from CONFIG.Dice.rollModes
   * @param {boolean} [options.create=true]  Whether to automatically create the chat message, or only return the
   *                                         prepared chatData object.
   * @returns {Promise<ChatMessage|object>}  A promise which resolves to the created ChatMessage document if create is
   *                                         true, or the Object of prepared chatData otherwise.
   */
  static toMessage<This extends BasicRoll.AnyConstructor>(
    this: This,
    rolls: InstanceType<This>[],
    messageData: object,
    options?: {
      rollMode?: string;
      create?: boolean;
    },
  ): Promise<ChatMessage.Implementation>;

  /* -------------------------------------------- */

  /**
   * Perform specific changes to message data before creating message.
   */
  static _prepareMessageData<This extends BasicRoll.AnyConstructor>(
    this: This,
    rolls: InstanceType<This>[],
    messageData: object,
  );

  /* -------------------------------------------- */
  /*  Maximize/Minimize Methods                   */
  /* -------------------------------------------- */

  /**
   * Replaces all dice terms that have modifiers with their maximum/minimum value.
   */
  preCalculateDiceTerms(options?: { maximize?: boolean; minimize?: boolean });

  /* -------------------------------------------- */

  /**
   * Gets information from passed die and calculates the maximum or minimum value that could be rolled.
   *
   * @param {DiceTerm} die                            DiceTerm to get the maximum/minimum value.
   * @param {object} [preCalculateOptions={}]         Additional options to modify preCalculate functionality.
   * @param {boolean} [preCalculateOptions.minimize=false]  Calculate the minimum value instead of the maximum.
   * @returns {number|null}                                 Maximum/Minimum value that could be rolled as an integer, or
   *                                                        null if the modifiers could not be precalculated.
   */
  static preCalculateTerm(
    die: foundry.dice.terms.DiceTerm,
    preCalculateOptions?: { minimize?: boolean },
  ): number | null;

  /* -------------------------------------------- */
  /*  Simplification Methods                      */
  /* -------------------------------------------- */

  /**
   * Replace number and faces of dice terms with numeric values where possible.
   */
  simplify(): void;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Merge two roll configurations.
   * @param original  The initial configuration that will be merged into.
   * @param other     The configuration to merge.
   * @returns         The original instance.
   */
  static mergeConfigs<This extends BasicRoll.AnyConstructor>(
    this: This,
    original: Partial<InstanceType<This>["__Configuration"]>,
    other?: Partial<InstanceType<This>["__Configuration"]>,
  ): Partial<InstanceType<This>["__Configuration"]>;
}

declare class AnyBasicRoll extends BasicRoll<
  fvttUtils.AnyObject,
  fvttUtils.EmptyObject,
  fvttUtils.EmptyObject,
  fvttUtils.EmptyObject,
  fvttUtils.EmptyObject
> {
  constructor(...args: any[]);
}

declare namespace BasicRoll {
  interface Any extends AnyBasicRoll {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyBasicRoll> {}
  interface DefaultConstructor
    extends fvttUtils.Identity<
      typeof BasicRoll<fvttUtils.AnyObject, {}, {}, {}, {}>
    > {}

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> =
    dnd5e.types.EnsureAnyIfNever<
      dnd5e.types.DeepMerge<
        {
          /**
           * Parts used to construct the roll formula.
           * @defaultValue `[]`
           */
          parts?: string[];

          /**
           * Data used to resolve placeholders in the formula.
           * @defaultValue `{}`
           */
          data?: Record<string, any>; // Using Record<string, any> for a generic object type

          /**
           * Whether the situational bonus can be added to this roll in the prompt.
           * @defaultValue `true`
           */
          situational?: boolean;

          /** Additional options passed through to the created roll. */
          options?: Options;
        },
        Cfg
      >
    >;
  type Configuration = BasicRoll["__Configuration"];

  type MakeProcessConfiguration<
    PrcCfg extends fvttUtils.AnyObject = {},
    Cfg extends MakeConfiguration<any> = MakeConfiguration,
  > = dnd5e.types.EnsureAnyIfNever<
    dnd5e.types.DeepMerge<
      {
        /** Configuration data for individual rolls. */
        rolls?: Cfg[];

        /**
         * Should the rolls be evaluated? If set to `false`, then no chat message
         * will be created regardless of message configuration.
         * @defaultValue `true`
         */
        evaluate?: boolean;

        /** Event that triggered the rolls. */
        event?: Event;

        /** Name suffixes for configuration hooks called. */
        hookNames?: string[];

        /** Document that initiated this roll. */
        subject?: Document;

        /** Default target value for all rolls. */
        target?: number;
      },
      PrcCfg
    >
  >;
  type ProcessConfiguration = BasicRoll["__ProcessConfiguration"];

  /**
   * Options allowed on a basic roll.
   */
  interface Options {
    /** The total roll result that must be met for the roll to be considered a success. */
    target?: number;
  }

  /* -------------------------------------------- */

  type MakeDialogConfiguration<DlgCfg extends fvttUtils.AnyObject = {}> =
    dnd5e.types.EnsureAnyIfNever<
      dnd5e.types.DeepMerge<
        {
          /**
           * Display a configuration dialog for the rolling process.
           * @defaultValue `true`
           */
          configure?: boolean;
        } & MakeDialogAppConfig<typeof RollConfigurationDialog>,
        DlgCfg
      >
    >;
  type DialogConfiguration = BasicRoll["__DialogConfiguration"];

  type MakeDialogAppConfig<DialogClass extends fvttUtils.AnyConstructor> = {
    /** Alternate configuration application to use. */
    applicationClass?: DialogClass;

    /** Additional options passed to the dialog. */
    options?: dnd5e.types.GetKey<
      fvttUtils.FixedInstanceType<DialogClass>,
      "__Configuration"
    >;
  };
  /* -------------------------------------------- */

  /**
   * Configuration data for creating a roll message.
   */

  type MakeMessageConfiguration<MsgCfg extends fvttUtils.AnyObject = {}> =
    dnd5e.types.EnsureAnyIfNever<
      dnd5e.types.DeepMerge<
        {
          /**
           * Create a message when the rolling is complete.
           * @defaultValue `true`
           */
          create?: boolean;

          /** Final created chat message document once process is completed. */
          document?: ChatMessage.Implementation;

          /** The roll mode to apply to this message from `CONFIG.Dice.rollModes`. */
          rollMode?: string; // Consider using a literal type if rollModes are known constants

          /**
           * Additional data used when creating the message.
           * @defaultValue `{}`
           */
          data?: Record<string, any>; // Using Record<string, any> for a generic object type
        },
        MsgCfg
      >
    >;
  type MessageConfiguration = BasicRoll["__MessageConfiguration"];
}

export default BasicRoll;
