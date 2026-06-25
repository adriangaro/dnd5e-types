/**
 * Mixin used to provide base logic to all activities.
 *
 * A concrete activity *document* is `ActivityMixin(BaseXActivityData)`: the data model supplies the
 * schema + derived overlay (via TypeDataModel), and this mixin layers the pseudo-document behavior
 * (id/uuid/item/actor/use/consume/rollDamage/metadata) WITHOUT adding schema. Downstream modules can
 * add a method to EVERY activity by declaration-merging into {@link ActivityBehavior}.
 *
 * The mixin result has a SINGLE construct signature (so concrete documents can `extends` it) plus the
 * merged static sides of both the behavior and the data class (`Pick<T, keyof T>` drops construct
 * signatures, keeping only statics like `defineSchema`/`metadata`).
 */

/**
 * Permissive base-constructor shape for the mixin. We do NOT use `DataModel.AnyConstructor` because a
 * concrete activity's literal `type` discriminant makes its constructor's data parameter narrower,
 * which (by constructor-parameter contravariance) fails that strict constraint. `(...args: any[])`
 * sidesteps it while still requiring the result be a DataModel.
 */
type AnyActivityDataConstructor = abstract new (...args: any[]) => foundry.abstract.DataModel.Any;

/** Behavior added by the activity pseudo-document mixin. The patch-point for cross-activity methods. */
export declare class ActivityBehavior {
  constructor(...args: any[]);

  get id(): string;
  get uuid(): string;
  get item(): globalThis.Item.Implementation;
  get actor(): globalThis.Actor.Implementation | null;

  /** Should this activity be visible on the item sheet? */
  get canConfigure(): boolean;

  /** Should this activity be able to be used? */
  get canUse(): boolean;

  /** Description used in chat message flavor for messages created with `rollDamage`. */
  get damageFlavor(): string;

  /** Active effect that granted this activity as a rider. */
  get dependentOrigin(): import("../active-effect.mjs").default | null;

  /** Create the data added to messages flags. */
  get messageFlags(): object;

  /** Relative UUID for this activity on an actor. */
  get relativeUUID(): string;

  /** Consumption targets that can be used for this activity. */
  get validConsumptionTypes(): Set<string>;

  /**
   * Activate this activity.
   * @param usage - Configuration info for the activation.
   * @param dialog - Configuration info for the usage dialog.
   * @param message - Configuration info for the created chat message.
   * @returns Details on the usage process if not canceled.
   */
  use(
    config?: dnd5e.types.documents.activity.ActivityUseConfiguration,
    dialog?: dnd5e.types.documents.activity.ActivityDialogConfiguration,
    message?: dnd5e.types.documents.activity.ActivityMessageConfiguration
  ): Promise<dnd5e.types.documents.activity.ActivityUsageResults | void>;

  /**
   * Consume this activation's usage.
   * @param usageConfig - Usage configuration.
   * @param messageConfig - Configuration data for the chat message.
   * @returns The usage updates, or `false` if consumption was prevented.
   */
  consume(
    usageConfig: dnd5e.types.documents.activity.ActivityUseConfiguration,
    messageConfig: dnd5e.types.documents.activity.ActivityMessageConfiguration
  ): Promise<dnd5e.types.documents.activity.ActivityUsageUpdates | false>;

  /** Refund previously used consumption for an activity. */
  refund(consumed: dnd5e.types.data.chatMessage.fields.ActorDeltasData): Promise<void>;

  /**
   * Perform a damage roll.
   * @param config - Configuration information for the roll.
   * @param dialog - Configuration for the roll dialog.
   * @param message - Configuration for the roll message.
   * @returns The resulting damage rolls, or void if the roll was canceled.
   */
  rollDamage(
    config?: dnd5e.types.Dice.DamageRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration
  ): Promise<import("../../dice/damage-roll.mjs").default[] | void>;

  /** Prepare usage configuration with the necessary defaults. */
  protected _prepareUsageConfig(
    config: dnd5e.types.documents.activity.ActivityUseConfiguration
  ): dnd5e.types.documents.activity.ActivityUseConfiguration;

  /** Determine scaling values and update item clone if necessary. */
  protected _prepareUsageScaling(
    usageConfig: dnd5e.types.documents.activity.ActivityUseConfiguration,
    messageConfig: dnd5e.types.documents.activity.ActivityMessageConfiguration,
    item: globalThis.Item.Implementation
  ): Promise<void>;

  /** Calculate changes to actor, items, & this activity based on resource consumption. */
  protected _prepareUsageUpdates(
    config: dnd5e.types.documents.activity.ActivityUseConfiguration,
    options?: { returnErrors?: boolean }
  ): Promise<dnd5e.types.documents.activity.ActivityUsageUpdates | false>;

  /**
   * Determine if the configuration dialog is required based on the configuration options. Does not
   * guarantee a dialog is shown if the dialog is suppressed in the activation dialog configuration.
   */
  protected _requiresConfigurationDialog(
    config: dnd5e.types.documents.activity.ActivityUseConfiguration
  ): boolean;

  /** Prepare the context used to render the usage chat card. */
  protected _usageChatContext(
    message: dnd5e.types.documents.activity.ActivityMessageConfiguration
  ): Promise<object>;

  /** Apply any final modifications to message config immediately before message is created. */
  protected _finalizeMessageConfig(
    usageConfig: dnd5e.types.documents.activity.ActivityUseConfiguration,
    messageConfig: dnd5e.types.documents.activity.ActivityMessageConfiguration,
    results: dnd5e.types.documents.activity.ActivityUsageResults
  ): void;

  /** Create the buttons that will be displayed in chat. */
  protected _usageChatButtons(
    message: dnd5e.types.documents.activity.ActivityMessageConfiguration
  ): dnd5e.types.documents.activity.ActivityUsageChatButton[];

  /** Determine whether the provided button in a chat message should be visible. */
  shouldHideChatButton(
    button: HTMLButtonElement,
    message: globalThis.ChatMessage.Implementation
  ): boolean;

  /** Display a chat message for this usage. */
  protected _createUsageMessage(
    message: dnd5e.types.documents.activity.ActivityMessageConfiguration
  ): Promise<globalThis.ChatMessage.Implementation | object>;

  /** Apply any activity-type specific modifications to the rendered chat card. */
  onRenderChatCard(message: globalThis.ChatMessage.Implementation, element: HTMLElement): void;

  /** Perform any final steps of the activation including creating measured templates. */
  protected _finalizeUsage(
    config: dnd5e.types.documents.activity.ActivityUseConfiguration,
    results: dnd5e.types.documents.activity.ActivityUsageResults
  ): Promise<void>;

  /** Trigger a primary activation action defined by the activity (such as opening the attack dialog for attack rolls). */
  protected _triggerSubsequentActions(
    config: dnd5e.types.documents.activity.ActivityUseConfiguration,
    results: dnd5e.types.documents.activity.ActivityUsageResults
  ): Promise<void>;

  /** Activate listeners on a chat message. */
  activateChatListeners(message: globalThis.ChatMessage.Implementation, html: HTMLElement): void;

  /** Construct context menu options for this Activity. */
  getContextMenuOptions(): foundry.applications.ux.ContextMenu.Entry<HTMLElement>[];

  /** Handle an action activated from an activity's chat message (for actions with no defined handler). */
  protected _onChatAction(
    event: PointerEvent,
    target: HTMLElement,
    message: globalThis.ChatMessage.Implementation
  ): Promise<void>;

  /** Retrieve consumed flag for given update data. */
  createConsumedFlag(
    actor: globalThis.Actor.Implementation,
    deltas: dnd5e.types.data.chatMessage.fields.ActorDeltasData | null | undefined
  ): { hd: string } | void;

  /** Prepare activity favorite data. */
  getFavoriteData(): Promise<dnd5e.types.data.abstract.FavoriteData5e>;

  /**
   * Retrieve a linked activity based on the provided relative UUID, or the stored `cachedFor` value.
   * Note: returns `any` because the concrete Activity type is not expressible from the mixin.
   */
  getLinkedActivity(relativeUUID?: string): any | null;

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Activity.
   * Note: ActivityRollData is not yet defined in gen defs; return type stays loose.
   */
  getRollData(options?: object): object;

  /** Get the best matched token from which this activity is being used if one can be found for this actor in the current scene. */
  getUsageToken(): globalThis.TokenDocument.Implementation | void;

  /** Merge the activity updates into this activity's item updates. */
  _mergeActivityUpdates(updates: dnd5e.types.documents.activity.ActivityUsageUpdates): void;

  static metadata: dnd5e.types.Activity.Metadata;

  /** Perform the pre-localization of this data model. */
  static localize(): void;

  /** Perform pre-localization on the contents of a SchemaField. */
  static _localizeSchema(schema: foundry.data.fields.SchemaField.Any, prefixes: string[]): void;

  /** Handle context menu events on activities. */
  static onContextMenu(item: globalThis.Item.Implementation, target: HTMLElement): void;

  /** Can an activity of this type be added to the provided item? */
  static availableForItem(item: globalThis.Item.Implementation): boolean;

  /** @override */
  static _createDialogTypes(parent: globalThis.Item.Implementation): string[];
}

/** The mixed document type: one constructor → `data instance & behavior`, plus both static sides. */
export type ActivityMix<T extends AnyActivityDataConstructor> = (new (
  ...args: any[]
) => fvttUtils.FixedInstanceType<T> & ActivityBehavior) &
  Pick<T, keyof T> &
  Pick<typeof ActivityBehavior, keyof typeof ActivityBehavior>;

export declare function ActivityMixin<T extends AnyActivityDataConstructor>(Base: T): ActivityMix<T>;
