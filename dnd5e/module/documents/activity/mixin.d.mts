import type BaseActivityData from '@dnd5e/module/data/activity/base-activity.mjs';
import PseudoDocumentMixin from '../mixins/pseudo-document.mjs';

import { default as AttackActivity } from "./attack.mjs";
import { default as CastActivity } from "./cast.mjs";
import { default as CheckActivity } from "./check.mjs";
import { default as DamageActivity } from "./damage.mjs";
import { default as EnchantActivity } from "./enchant.mjs";
import { default as ForwardActivity } from "./forward.mjs";
import { default as HealActivity } from "./heal.mjs";
import { default as SaveActivity } from "./save.mjs";
import { default as SummonActivity } from "./summon.mjs";
import { default as UtilityActivity } from "./utility.mjs";
import type ActivitySheet from '@dnd5e/module/applications/activity/activity-sheet.mjs';

declare class _ActivityMixin {
  /** @privateRemarks All mixin classses should accept anything for its constructor. */
  constructor(...args: any[]);

  type: dnd5e.types.Activity.TypeKey;

  static metadata: _ActivityMixin.Metadata;
  static localize(): void;
  static _localizeSchema(schema: foundry.data.fields.SchemaField<any>, prefixes: string[]): void;

  labels: Record<string, string>;

  get canUse(): boolean
  get damageFlavor(): string
  get messageFlags(): _ActivityMixin.MessageFlags<this>
  get relativeUUID(): string;
  get validConsumptionTypes(): Set<keyof dnd5e.types.DND5EConfig['activityConsumptionTypes']>

  use(
    usage?: ActivityMixin.ActivityUseConfiguration,
    dialog?: ActivityMixin.ActivityDialogConfiguration,
    message?: ActivityMixin.ActivityMessageConfiguration
  ): Promise<ActivityMixin.ActivityUsageResults | void>

  consume(
    usageConfig: ActivityMixin.ActivityUseConfiguration,
    messageConfig: ActivityMixin.ActivityMessageConfiguration
  ): ActivityMixin.ActivityUsageResults | false

  refund(
    consumed: ActivityMixin.ActivityConsumptionDescriptor
  ): Promise<void>

  #applyUsageUpdates(
    updates: ActivityMixin.ActivityUsageUpdates
  ): Promise<ActivityMixin.ActivityConsumptionDescriptor>

  _prepareUsageConfig(
    config: ActivityMixin.ActivityUseConfiguration
  ): ActivityMixin.ActivityUseConfiguration

  _prepareUsageScaling(
    usageConfig: ActivityMixin.ActivityUseConfiguration,
    messageConfig: ActivityMixin.ActivityMessageConfiguration,
    item: Item.Implementation
  )

  _prepareUsageUpdates(
    config: ActivityMixin.ActivityUseConfiguration,
    options?: {
      returnErrors: boolean
    }
  ): Promise<ActivityMixin.ActivityUsageUpdates | Error[] | false>

  _requiresConfigurationDialog(
    config: ActivityMixin.ActivityUseConfiguration
  ): boolean

  _usageChatContext(
    message: ActivityMixin.ActivityMessageConfiguration
  ): Promise<object>

  _usageChatButtons(
    message: ActivityMixin.ActivityMessageConfiguration
  ): Promise<ActivityMixin.ActivityUsageChatButton[]>

  shouldHideChatButton(
    button: HTMLButtonElement,
    message: ChatMessage.Implementation
  ): boolean

  _createUsageMessage(
    message: ActivityMixin.ActivityMessageConfiguration
  ): Promise<object> // Promise<ChatMessage.Implementation | object>

  _finalizeUsage(
    config: ActivityMixin.ActivityUseConfiguration,
    results: ActivityMixin.ActivityUsageResults
  ): Promise<void>

  _triggerSubsequentActions(
    config: ActivityMixin.ActivityUseConfiguration,
    results: ActivityMixin.ActivityUsageResults
  ): Promise<void>

  rollDamage(
    config?: Partial<dnd5e.types.DamageRollProcessConfiguration>,
    dialog?: Partial<dnd5e.types.BasicRollDialogConfiguration>,
    message?: Partial<dnd5e.types.BasicRollMessageConfiguration>
  ): Promise<dnd5e.dice.DamageRoll[] | void>

  activateChatListeners(message: ChatMessage, html: HTMLElement): void

  getContextMenuOptions(): ContextMenu.Entry[]

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
  }): fvttUtils.AnyObject

  _mergeActivityUpdates(updates: ActivityMixin.ActivityUsageUpdates): void
}

declare namespace _ActivityMixin {
  interface Metadata extends PseudoDocumentMixin.MixinClass.Metadata {
    sheetClass: typeof dnd5e.applications.activity.ActivitySheet
    usage: {
      actions: Record<string, Function>,
      chatCard: string,
      dialog: typeof dnd5e.applications.activity.ActivityUsageDialog
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
}



declare function ActivityMixin<
  T extends fvttUtils.AnyConstructor
>(
  BaseClass: T
): typeof _ActivityMixin & ReturnType<typeof PseudoDocumentMixin<T>>

declare namespace ActivityMixin {
  export import MixinClass = _ActivityMixin;

 
  type ActivityUseConfiguration = {
    create?: false | {
      measuredTemplate: boolean
    },
    concentration?: {
      begin: boolean,
      end?: string | null
    },
    consume?: false | {
      resources: boolean | number[];
      spellSlot?: boolean
    },
    event?: Event,
    spell?: {
      slot: number
    },
    subsequentActions?: boolean,
    cause?: {
      activity: string;
      resources: boolean | number[];
    }
  }

  type ActivityUsageUpdates = {
    activity?: object,
    actor?: object,
    create?: object[],
    delete?: string[],
    item?: object[];
    rolls?: Roll[];
  }

  

  type ActivityDialogConfiguration = {
    configure?: boolean,
    applicationClass?: typeof dnd5e.applications.activity.ActivityUsageDialog,
    options?: object
  }

  type ActivityMessageConfiguration = {
    create?: boolean;
    data?: object;
    hasConsumption?: boolean;
    rollMode?: string;
  }

  type ActivityUsageResults = {
    effects: ActiveEffect.Implementation[];
    message: ChatMessage.Implementation | object;
    templates: MeasuredTemplateDocument.Implementation[];
    updates: ActivityUsageUpdates;
  }

  type ActivityConsumptionDescriptor = {
    actor: {
      keyPath: string;
      delta: number;
    }[];
    item: Record<string, {
      keyPath: string;
      delta: number;
    }[]>;
  }

  type ActivityUsageChatButton = {
    label: string;
    icon: string;
    classes: string;
    dataset: object;
  }
  //
}

declare global {
  namespace dnd5e.types {
    namespace Activity {
      export import Mixin = ActivityMixin
      interface DefaultActivityTypes extends Record<string, BaseActivityData.AnyConstructor> {
        attack: typeof AttackActivity;
        cast: typeof CastActivity;
        check: typeof CheckActivity;
        damage: typeof DamageActivity;
        enchant: typeof EnchantActivity;
        forward: typeof ForwardActivity;
        heal: typeof HealActivity;
        save: typeof SaveActivity;
        summon: typeof SummonActivity;
        utility: typeof UtilityActivity;
      }
    
      interface OverrideTypes extends Record<string, BaseActivityData.AnyConstructor | never> {
    
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
        documentClass: Types[T],
        configurable?: boolean
      }

      type SchemaMap = {
        [K in keyof Types]: dnd5e.types.GetSchema<Types[K]>
      }

      // TODO add activity sheet data
      type SheetMap = {
        [K in keyof Types]: ActivitySheet
      }

      type ActivityAssignmentData<T extends TypeKey = TypeKey> = foundry.data.fields.SchemaField.AssignmentData<
        SchemaMap[T]
      >
    }
    interface DND5EConfig {
      activityTypes: {
        [K in dnd5e.types.Activity.TypeKey]: dnd5e.types.Activity.ActivityTypeConfig<K>
      }
    }
  }
}


export default ActivityMixin