import PseudoDocumentMixin from '../mixins/pseudo-document.mjs';

declare class _ActivityMixin {
  /** @privateRemarks All mixin classses should accept anything for its constructor. */
  constructor(...args: any[]);

  type: dnd5e.types.Activity.TypeKey;

  static metadata: dnd5e.types.Activity.Metadata;
  static localize(): void;
  static _localizeSchema(schema: foundry.data.fields.SchemaField<any>, prefixes: string[]): void;

  labels: Record<string, string>;

  get canUse(): boolean
  get damageFlavor(): string
  get messageFlags(): dnd5e.types.Activity.MessageFlags<this>
  get relativeUUID(): string;
  get validConsumptionTypes(): Set<keyof dnd5e.types.DND5EConfig['activityConsumptionTypes']>

  use(
    usage?: dnd5e.types.Activity.UseConfiguration,
    dialog?: dnd5e.types.Activity.DialogConfiguration,
    message?: dnd5e.types.Activity.MessageConfiguration
  ): Promise<dnd5e.types.Activity.UsageResults | void>

  consume(
    usageConfig: dnd5e.types.Activity.UseConfiguration,
    messageConfig: dnd5e.types.Activity.MessageConfiguration
  ): dnd5e.types.Activity.UsageResults | false

  refund(
    consumed: dnd5e.types.Activity.ConsumptionDescriptor
  ): Promise<void>

  #applyUsageUpdates(
    updates: dnd5e.types.Activity.UsageUpdates
  ): Promise<dnd5e.types.Activity.ConsumptionDescriptor>

  _prepareUsageConfig(
    config: dnd5e.types.Activity.UseConfiguration
  ): dnd5e.types.Activity.UseConfiguration

  _prepareUsageScaling(
    usageConfig: dnd5e.types.Activity.UseConfiguration,
    messageConfig: dnd5e.types.Activity.MessageConfiguration,
    item: Item.Implementation
  )

  _prepareUsageUpdates(
    config: dnd5e.types.Activity.UseConfiguration,
    options?: {
      returnErrors: boolean
    }
  ): Promise<dnd5e.types.Activity.UsageUpdates | Error[] | false>

  _requiresConfigurationDialog(
    config: dnd5e.types.Activity.UseConfiguration
  ): boolean

  _usageChatContext(
    message: dnd5e.types.Activity.MessageConfiguration
  ): Promise<object>

  _usageChatButtons(
    message: dnd5e.types.Activity.MessageConfiguration
  ): Promise<dnd5e.types.Activity.UsageChatButton[]>

  shouldHideChatButton(
    button: HTMLButtonElement,
    message: ChatMessage.Implementation
  ): boolean

  _createUsageMessage(
    message: dnd5e.types.Activity.MessageConfiguration
  ): Promise<object> // Promise<ChatMessage.Implementation | object>

  _finalizeUsage(
    config: dnd5e.types.Activity.UseConfiguration,
    results: dnd5e.types.Activity.UsageResults
  ): Promise<unknown>

  _triggerSubsequentActions(
    config: dnd5e.types.Activity.UseConfiguration,
    results: dnd5e.types.Activity.UsageResults
  ): Promise<void>

  rollDamage(
    config?: Partial<dnd5e.dice.DamageRoll.ProcessConfiguration>,
    dialog?: Partial<dnd5e.dice.BasicRoll.DialogConfiguration>,
    message?: Partial<dnd5e.dice.BasicRoll.MessageConfiguration>
  ): Promise<dnd5e.dice.DamageRoll[] | void>

  activateChatListeners(message: ChatMessage, html: HTMLElement): void

  getContextMenuOptions(): foundry.applications.ux.ContextMenu.Entry<HTMLElement | JQuery>[][]

  #onChatAction(event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): Promise<void>
  _onChatAction(event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): Promise<void>

  static onContextMenu(item: Item.Implementation, target: HTMLElement): void

  #consumeResource(event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): Promise<void>
  #refundResource(event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): Promise<void>

  #placeTemplate(): Promise<MeasuredTemplateDocument.Implementation[]>

  getFavoriteData(): Promise<dnd5e.types.FavoriteData5e>

  getLinkedActivity(relativeUUID: string): dnd5e.types.Activity.Any | null

  getRollData(options?: {
    deterministic?: boolean | undefined;
  }): dnd5e.types.Activity.RollData<this>

  _mergeActivityUpdates(updates: dnd5e.types.Activity.UsageUpdates): void
}

declare namespace _ActivityMixin {}

declare function ActivityMixin<
  T extends fvttUtils.AnyConstructor
>(
  BaseClass: T
): typeof _ActivityMixin & ReturnType<typeof PseudoDocumentMixin<T>>

declare namespace ActivityMixin {
  
  interface Metadata extends PseudoDocumentMixin.MixinClass.Metadata {
    sheetClass: dnd5e.applications.activity.ActivitySheet.AnyConstructor
    usage: {
      actions: Record<string, Function>,
      chatCard: string,
      dialog: dnd5e.applications.activity.ActivityUsageDialog.AnyConstructor
    }
  }

  interface MessageFlags<This> {
    activity: {
      type: dnd5e.types.Activity.TypeKey,
      id: dnd5e.types.GetKey<This, 'id'>,
      uuid: dnd5e.types.GetKey<This, 'uuid'>
    },
    item: {
      type: Item.SubType,
      id: Item.Implementation['id'],
      uuid: Item.Implementation['uuid']
    },
    targets: ReturnType<typeof dnd5e.utils.getTargetDescriptors>
  }
  interface RollData<This> extends ReturnType<Item.Implementation['getRollData']> {
    activity: This,
    mod: number
  }

  interface UseConfiguration {
    create?: false | {
      measuredTemplate: boolean
    },
    concentration?: {
      begin: boolean,
      end?: string | null
    },
    consume?: false | {
      resources: boolean | number[]
      spellSlot?: boolean
    },
    event?: Event,
    spell?: {
      slot: number
    },
    subsequentActions?: boolean,
    cause?: {
      activity: string;
      resources: boolean | number[]
    }
  }

  interface UsageUpdates {
    activity?: object,
    actor?: object,
    create?: object[],
    delete?: string[],
    item?: object[];
    rolls?: Roll[];
  }


  interface DialogConfiguration {
    configure?: boolean,
    applicationClass?: typeof dnd5e.applications.activity.ActivityUsageDialog,
    options?: object
  }

  interface MessageConfiguration {
    create?: boolean;
    data?: object;
    hasConsumption?: boolean;
    rollMode?: string;
  }

  interface UsageResults {
    effects: ActiveEffect.Implementation[];
    message: ChatMessage.Implementation | object;
    templates: MeasuredTemplateDocument.Implementation[];
    updates: UsageUpdates;
  }

  interface ConsumptionDescriptor {
    actor: {
      keyPath: string;
      delta: number;
    }[];
    item: Record<string, {
      keyPath: string;
      delta: number;
    }[]>;
  }

  interface UsageChatButton {
    label: string;
    icon: string;
    classes: string;
    dataset: object;
  }
}

declare global {
  namespace dnd5e.types {
    namespace Activity {
      export import Mixin = _ActivityMixin
      interface DefaultActivityTypes extends Record<string, dnd5e.dataModels.activity.BaseActivityData.AnyConstructor> {

      }
    
      interface OverrideTypes extends Record<string, dnd5e.dataModels.activity.BaseActivityData.AnyConstructor | never> {
    
      }
    
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultActivityTypes,
        OverrideTypes
      >
    
      type TypeKey = dnd5e.types.ExtractKeys<Types>;


      type ActivityInstances = {
        [K in keyof Types]: fvttUtils.FixedInstanceType<Types[K]>
      }
    
      type AnyClass = Types[TypeKey];
      type Any = ActivityInstances[TypeKey];
      type OfType<T extends TypeKey> = ActivityInstances[T]
      type ClassOfType<T extends TypeKey> = Types[T]
    


      type ActivityTypeConfig<T extends TypeKey> = {
        /**
         * The activity's document class.
         */
        documentClass: Types[T],
        /**
         * Whether the activity is editable via the UI.
         */
        configurable?: boolean
        /**
         * Should this activity type be hidden in the selection dialog?
         */
        hidden?: boolean
      }

      type SchemaMap = {
        [K in keyof Types]: dnd5e.types.GetSchema<Types[K]>
      }

      type SheetMap = {
        [K in keyof Types]: OfType<K>['sheet']
      }

      type ActivityAssignmentData<T extends TypeKey = TypeKey> = foundry.data.fields.SchemaField.AssignmentData<
        SchemaMap[T]
      >

      // types
      export import Metadata = ActivityMixin.Metadata;
      export import MessageFlags = ActivityMixin.MessageFlags;
      export import RollData = ActivityMixin.RollData;
      export import UseConfiguration = ActivityMixin.UseConfiguration;
      export import UsageUpdates = ActivityMixin.UsageUpdates;
      export import DialogConfiguration = ActivityMixin.DialogConfiguration;
      export import MessageConfiguration = ActivityMixin.MessageConfiguration;
      export import UsageResults = ActivityMixin.UsageResults;
      export import ConsumptionDescriptor = ActivityMixin.ConsumptionDescriptor;
      export import UsageChatButton = ActivityMixin.UsageChatButton;
    }
    interface DND5EConfig {
      /**
       * Configuration information for activity types.
       */
      activityTypes: {
        [K in dnd5e.types.Activity.TypeKey]: dnd5e.types.Activity.ActivityTypeConfig<K>
      }
    }
  }
}


export default ActivityMixin

type c = dnd5e.types.Activity.OfType<'order'>
type d = dnd5e.types.FindKeyByValue<dnd5e.types.Activity.ActivityInstances, dnd5e.types.Activity.OfType<'order'>>