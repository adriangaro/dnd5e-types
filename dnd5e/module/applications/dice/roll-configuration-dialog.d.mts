import Dialog5e from "../api/dialog.mjs";

/**
 * Dialog for configuring one or more rolls.
 */

declare class RollConfigurationDialog<
  RollType extends dnd5e.dice.BasicRoll.AnyConstructor = typeof dnd5e.dice.BasicRoll<{}, {}, {}, {}, {}>,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Dialog5e<
  RollConfigurationDialog.MakeRenderContext<RenderContext, RollType>,
  RollConfigurationDialog.MakeConfiguration<Configuration>,
  RollConfigurationDialog.MakeRenderOptions<RenderOptions>
> {

  constructor(
    config?: InstanceType<RollType>['__ProcessConfiguration'],
    message?: InstanceType<RollType>['__MessageConfiguration'],
    options?: RollConfigurationDialog.MakeConfiguration<Configuration>
  )

  /* -------------------------------------------- */

  /**
   * Roll type to use when constructing the rolls.
   */
  static get rollType(): typeof dnd5e.dice.BasicRoll
  get rollType(): RollType

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  #config: InstanceType<RollType>['__ProcessConfiguration']
  get config(): InstanceType<RollType>['__ProcessConfiguration']

  /* -------------------------------------------- */

  /**
   * Configuration information for the roll message.
   */
  #message: InstanceType<RollType>['__MessageConfiguration']
  get message(): InstanceType<RollType>['__MessageConfiguration']

  /* -------------------------------------------- */

  /**
   * The rolls being configured.
   */
  #rolls: dnd5e.dice.BasicRoll[]

  get rolls(): dnd5e.dice.BasicRoll[]



  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Identify DiceTerms in this app's rolls.
   * @protected
   */
  _identifyDiceTerms(): { icon: string, label: string }[]

  /* -------------------------------------------- */

  /**
   * Prepare the context for the buttons.
   */
  _prepareButtonsContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare the context for the roll configuration section.
   */
  _prepareConfigurationContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>

  /* -------------------------------------------- */

  /**
   * Prepare the context for the formulas list.
   */
  _prepareFormulasContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>

  /* -------------------------------------------- */
  /*  Roll Handling                               */
  /* -------------------------------------------- */

  /**
   * Build a roll from the provided configuration objects.
   */
  #buildRolls(config: InstanceType<RollType>['__ProcessConfiguration'], formData: FormDataExtended)

  /* -------------------------------------------- */

  /**
   * Prepare individual configuration object before building a roll.
   */
  _buildConfig(config: InstanceType<RollType>['__Configuration'], formData: FormDataExtended, index: number): InstanceType<RollType>['__Configuration']

  /* -------------------------------------------- */

  /**
   * Make any final modifications to rolls based on the button clicked.
   */
  _finalizeRolls(action: string): InstanceType<RollType>[]

  /* -------------------------------------------- */

  /**
   * Rebuild rolls based on an updated config and re-render the dialog.
   */
  rebuild()

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle submission of the dialog using the form buttons.
   */
  static #handleFormSubmission(this: RollConfigurationDialog, event: Event | SubmitEvent, form: HTMLFormElement, formData: FormDataExtended): Promise<FormDataExtended>

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /**
   * A helper to handle displaying and responding to the dialog.
   */
  static configure(
    config?: dnd5e.dice.BasicRoll.ProcessConfiguration, 
    dialog?: dnd5e.dice.BasicRoll.DialogConfiguration,
    message?: dnd5e.dice.BasicRoll.MessageConfiguration
  ): Promise<dnd5e.dice.BasicRoll[]>
}

declare class AnyRollConfigurationDialog extends RollConfigurationDialog<
  typeof dnd5e.dice.BasicRoll<fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject>,
  fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject
> {
  constructor(...args: any[]);
}

declare namespace RollConfigurationDialog {
  interface Any extends AnyRollConfigurationDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyRollConfigurationDialog> {}

  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    RollType extends dnd5e.dice.BasicRoll.AnyConstructor = typeof dnd5e.dice.BasicRoll
  > = dnd5e.types.DeepMerge<
    {
      fields: {
        field: foundry.data.fields.DataField.Any,
        name: string,
        value: any,
        options: {
          value: any,
          label: string
        }[]
      }[],
      rolls: {
        roll: InstanceType<RollType>
      }[],
      dice: {
        icon: string;
        label: string;
      }[]
    },
    Ctx
  >
  type RenderContext = RollConfigurationDialog['__RenderContext']

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    fvttUtils.InterfaceToObject<RollConfigurationDialog.BasicRollConfigurationDialogOptions>,
   Cfg 
  >
  type Configuration = RollConfigurationDialog['__Configuration']

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt  
  >
  type RenderOptions =  RollConfigurationDialog['__RenderOptions']

  /**
 * Callback to handle additional build configuration.
 *
 * @param process Configuration for the entire rolling process.
 * @param config Configuration for a specific roll.
 * @param formData Any data entered into the rolling prompt.
 * @param index Index of the roll within all rolls being prepared.
 */
  type RollBuildConfigCallback = fvttUtils.ToMethod<(
    process: dnd5e.dice.BasicRoll.ProcessConfiguration,
    config: dnd5e.dice.BasicRoll.Configuration,
    formData?: FormDataExtended,
    index?: number
  ) => void>;

  /**
  * Rendering options specific to the dice display in the configuration dialog.
  */
  interface BasicRollConfigurationDialogRenderDiceOptions {
    /**
     * The maximum number of dice to display in the large dice breakdown. If
     * the given rolls contain more dice than this, then the large breakdown
     * is not shown.
     * @defaultValue `5`
     */
    max?: number;

    /**
     * Valid die denominations to display in the large dice breakdown. If any
     * of the given rolls contain an invalid denomination, then the large
     * breakdown is not shown.
     */
    denominations?: Set<string>;
  }


  /**
  * Options related to rendering the roll configuration dialog.
  */
  interface BasicRollConfigurationDialogRenderOptions {
    /** Options related to the dice display. */
    dice?: BasicRollConfigurationDialogRenderDiceOptions;
  }

  /**
  * Dialog rendering options for a roll configuration dialog.
  */
  interface BasicRollConfigurationDialogOptions {
    /** Roll type to use when constructing final roll. */
    rollType: typeof dnd5e.dice.BasicRoll;

    /** Default values for the dialog. */
    default?: {
      /** Default roll mode to have selected. */
      rollMode?: number; // Consider using a literal type if rollModes are known constants
    };

    /** Callback to handle additional build configuration. */
    buildConfig?: RollBuildConfigCallback;

    /** Options specific to rendering the dialog. */
    rendering?: BasicRollConfigurationDialogRenderOptions;
  }
}

export default RollConfigurationDialog