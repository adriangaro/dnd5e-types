/**
 * Extend the base ActiveEffect class to implement system-specific logic.
 */
declare class ActiveEffect5e<
  SubType extends ActiveEffect.SubType = ActiveEffect.SubType
> extends ActiveEffect<
  SubType
> {
  /**
   * Static ActiveEffect ID for various conditions.
   */
  static ID: Record<string, string>

  /* -------------------------------------------- */

  /**
   * Additional key paths to properties added during base data preparation that should be treated as formula fields.
   */
  static FORMULA_FIELDS: Set<string>;

  /* -------------------------------------------- */

  /**
   * Is this effect an enchantment on an item that accepts enchantment?
   */
  get isAppliedEnchantment(): boolean 

  /* -------------------------------------------- */

  /**
   * Should this status effect be hidden from the current user?
   */
  get isConcealed(): boolean

  /* -------------------------------------------- */

  /**
   * Retrieve the source Actor or Item, or null if it could not be determined.
   */
  getSource(): Promise<Actor.Implementation | Item.Implementation | null>

  /* -------------------------------------------- */
  /*  Effect Application                          */
  /* -------------------------------------------- */

  /**
   * Apply a change to activities on this item.
   */
  applyActivity(
    item: Item.Implementation,
    change: ActiveEffect.ChangeData
  ): Record<string, any>

  /* -------------------------------------------- */

  /**
   * Transform the data type of the change to match the type expected for flags.
   */
  _prepareFlagChange(
    actor: Actor.Implementation,
    change: ActiveEffect.ChangeData
  ): ActiveEffect.ChangeData

  /* --------------------------------------------- */

  /**
   * Determine whether this Active Effect is suppressed or not.
   */
  determineSuppression()

  /* -------------------------------------------- */
  /*  Lifecycle                                   */
  /* -------------------------------------------- */

  /**
   * Modify the ActiveEffect's attributes based on the exhaustion level.
   * @protected
   */
  _prepareExhaustionLevel()

  /* -------------------------------------------- */

  /**
   * Prepare effect favorite data.
   */
  getFavoriteData(): Promise<dnd5e.types.FavoriteData5e>

  /* -------------------------------------------- */

  /**
   * Create conditions that are applied separately from an effect.
   */
  createRiderConditions(): Promise<ActiveEffect.Implementation[]>

  /* -------------------------------------------- */

  /**
   * Create additional activities, effects, and items that are applied separately from an enchantment.
   * @param {object} options  Options passed to the effect creation.
   */
  createRiderEnchantments(options?: object): Promise<void>

  /* -------------------------------------------- */

  /** @inheritDoc */
  toDragData(): ReturnType<ActiveEffect<SubType>['toDragData'] & {
    activityId?: string
  }>


  /* -------------------------------------------- */
  /*  Exhaustion and Concentration Handling       */
  /* -------------------------------------------- */

  /**
   * Create effect data for concentration on an actor.
   * @param {Activity} activity  The Activity on which to begin concentrating.
   * @param {object} [data]      Additional data provided for the effect instance.
   * @returns {object}           Created data for the ActiveEffect.
   */
  static createConcentrationEffectData(
    activity: dnd5e.types.Activity.Implementation,
    data?: fvttUtils.DeepPartial<
      ActiveEffect.CreateData
    >
  ): ActiveEffect.CreateData

  /* -------------------------------------------- */

  /**
   * Register listeners for custom handling in the TokenHUD.
   */
  static registerHUDListeners()

  /* -------------------------------------------- */

  /**
   * Add modifications to the core ActiveEffect config.
   */
  static onRenderActiveEffectConfig(
    app: ActiveEffectConfig,
    html: JQuery | HTMLElement
  )

  /* -------------------------------------------- */

  /**
   * Adjust exhaustion icon display to match current level.
   * @param app            The TokenHUD application.
   * @param html  The TokenHUD HTML.
   */
  static onTokenHUDRender(
    app: Application,
    html: HTMLElement
  )

  /* -------------------------------------------- */

  /**
   * Get the image used to represent exhaustion at this level.
   */
  static _getExhaustionImage(level: number): string


  /* -------------------------------------------- */

  /**
   * Implement custom behavior for select conditions on the token HUD.
   * @param {PointerEvent} event        The triggering event.
   */
  static onClickTokenHUD(event: PointerEvent)

  /* -------------------------------------------- */

  /**
   * Manage custom exhaustion cycling when interacting with the token HUD.
   */
  static _manageExhaustion(
    event: PointerEvent,
    actor: Actor.Implementation
  )

  /* -------------------------------------------- */

  /**
   * Manage custom concentration handling when interacting with the token HUD.
   */
  static _manageConcentration(
    event: PointerEvent,
    actor: Actor.Implementation
  )

  /* -------------------------------------------- */

  /**
   * Record another effect as a dependent of this one.
   */
  addDependent(...dependent: ActiveEffect.Implementation[]): Promise<this>

  /* -------------------------------------------- */

  /**
   * Retrieve a list of dependent effects.
   */
  getDependents(): (ActiveEffect.Implementation | Item.Implementation)[]

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Helper method to add choices that have been overridden by an active effect. Used to determine what fields might
   * need to be disabled because they are overridden by an active effect in a way not easily determined by looking at
   * the `Document#overrides` data structure.
   */
  static addOverriddenChoices(
    doc: Actor.Implementation | Item.Implementation,
    prefix: string,
    path: string,
    overrides: string[]
  )

  /* -------------------------------------------- */

  /**
   * Render a rich tooltip for this effect.
   * @param {EnrichmentOptions} [enrichmentOptions={}]  Options for text enrichment.
   * @returns {Promise<{content: string, classes: string[]}>}
   */
  richTooltip(enrichmentOptions?: TextEditor.EnrichmentOptions): Promise<{ content: string, classes: string[] }>

  /* -------------------------------------------- */

  /** @override */
  deleteDialog(
    dialogOptions?: Partial<Dialog.Options>,
    operation?: ActiveEffect.Database.DeleteOperation
  ): Promise<this | false | null | undefined>;
}

export default ActiveEffect5e

declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    ActiveEffect: typeof ActiveEffect5e<ActiveEffect.SubType>
  }

  interface ConfiguredActiveEffect<SubType extends ActiveEffect.SubType> {
    document: SubType extends unknown ? ActiveEffect5e<SubType> : never; 
  }
}

