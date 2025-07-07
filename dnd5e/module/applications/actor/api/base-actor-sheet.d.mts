

import ApplicationV2Mixin from "../../api/application-v2-mixin.mjs";
import PrimarySheetMixin from "../../api/primary-sheet-mixin.mjs";

declare class _BaseActorSheet<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends ApplicationV2Mixin(foundry.applications.sheets.ActorSheetV2)<
  _BaseActorSheet.MakeRenderContext<RenderContext>,
  _BaseActorSheet.MakeConfiguration<Configuration>,
  _BaseActorSheet.MakeRenderOptions<RenderOptions>
> {
  __Configuration: this[typeof foundry.applications.api.ApplicationV2.Internal.__Configuration]
  __RenderOptions: this[typeof foundry.applications.api.ApplicationV2.Internal.__RenderOptions]
  __RenderContext: this[typeof foundry.applications.api.ApplicationV2.Internal.__RenderContext]
}

declare namespace _BaseActorSheet {
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.EnsureAnyIfNever<dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      ApplicationV2Mixin.RenderOptions,
      foundry.applications.sheets.ActorSheetV2.RenderContext
    >,
    Ctx
  >> & foundry.applications.sheets.ActorSheetV2.RenderContext

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.EnsureAnyIfNever<dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.sheets.ActorSheetV2.Configuration,
      ApplicationV2Mixin.Configuration
    >,
    Cfg
  >> & foundry.applications.sheets.ActorSheetV2.Configuration;

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.EnsureAnyIfNever<dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.sheets.ActorSheetV2.RenderOptions,
      ApplicationV2Mixin.RenderOptions
    >,
    Opt
  >> & foundry.applications.sheets.ActorSheetV2.RenderOptions;
}


/**
 * Base actor sheet built on ApplicationV2.
 */
declare class BaseActorSheet<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends PrimarySheetMixin(
  _BaseActorSheet
)<
  BaseActorSheet.MakeRenderContext<RenderContext>,
  BaseActorSheet.MakeConfiguration<Configuration>,
  BaseActorSheet.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */

  /**
   * Application parts used when rendering the sheet in limited mode.
   */
  static readonly LIMITED_PARTS: Record<string, any>;

  /**
   * A set of item types that should be prevented from being dropped on this type of actor sheet.
   */
  static readonly unsupportedItemTypes: Set<string>;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The cached concentration information for the character.
   * @internal
   */
  _concentration: { items: Set<Item.Implementation>, effects: Set<ActiveEffect.Implementation> };

  /**
   * Temporary stored copy of the drop behavior.
   */
  #dropBehavior: string | null;

  /**
   * Key path to the sidebar collapsed flag for the current tab.
   * @internal
   */
  get _sidebarCollapsedKeyPath(): string;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Allow subclasses to make adjustments to inventory section configuration.
   * @param sections  The inventory sections.
   * @protected
   */
  _configureInventorySections(sections: any[]): Promise<void>;

  /**
   * Prepare rendering context for the effects tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  _prepareEffectsContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the inventory tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  _prepareInventoryContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the special traits tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  _prepareSpecialTraitsContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the spells tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  _prepareSpellsContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the tabs.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  _prepareTabsContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */
  /*  Actor Preparation Helpers                   */
  /* -------------------------------------------- */

  /**
   * Prepare actor abilities for display.
   * @param context  Context being prepared.
   * @returns        Prepared abilities.
   * @protected
   */
  _prepareAbilities(context: this['__RenderContext']): any[];

  /**
   * Prepare items display across the sheet.
   * @param context  Context being prepared.
   * @protected
   */
  _prepareItems(context: this['__RenderContext']): Promise<void>;

  /**
   * Prepare actor portrait for display.
   * @param context  Context being prepared.
   * @returns        Portrait data.
   * @protected
   */
  _preparePortrait(context: this['__RenderContext']): { token: boolean; src: string; path: string };

  /**
   * Prepare actor senses for display.
   * @param context  Context being prepared.
   * @returns        Prepared senses.
   * @protected
   */
  _prepareSenses(context: this['__RenderContext']): any[];

  /**
   * Prepare actor skills or tools for display.
   * @param context   Context being prepared.
   * @param property  Type of data being prepared.
   * @returns         Prepared skills or tools.
   * @protected
   */
  _prepareSkillsTools(context: this['__RenderContext'], property: "skills" | "tools"): any[];

  /**
   * Prepare spells sections for display.
   * @param context  Context being prepared.
   * @returns        Spellbook data.
   * @protected
   */
  _prepareSpellbook(context: this['__RenderContext']): Record<string, any>;

  /**
   * Prepare actor traits for display.
   * @param context  Context being prepared.
   * @returns        Prepared traits.
   * @protected
   */
  _prepareTraits(context: this['__RenderContext']): Record<string, any[]>;

  /* -------------------------------------------- */
  /*  Item Preparation Helpers                    */
  /* -------------------------------------------- */

  /**
   * Place an item into specific categories.
   * @param item  Item being prepared for display.
   * @returns     Names of categories into which to place item.
   * @protected
   */
  _assignItemCategories(item: Item.Implementation): Set<string>;

  /**
   * Prepare specific activity's context.
   * @param activity  Activity being prepared for display.
   * @returns         Activity context data.
   * @protected
   */
  _prepareActivity(activity: dnd5e.types.Activity.Implementation): {
    _id: string;
    labels: Record<string, string>;
    name: string;
    range: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.Implementation, 'range'>;
    uses: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.Implementation, 'uses'> & {
      hasRecharge: boolean;
      isOnCooldown: boolean;
      hasUses: boolean;
      prop: string;
    };
    activation: string;
    icon: {
      src: string;
      svg: boolean;
    };
    isSpell: boolean;
    save: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.Implementation, 'save'> & {
      ability: string | null;
    } | null;
    toHit: number | null;
  };

  /**
   * Prepare specific item's context.
   * @param item  Item being prepared for display.
   * @param ctx   Item specific context.
   * @protected
   */
  _prepareItem(item: Item.Implementation, ctx: {
    groups: Record<string, any>;
    activities: dnd5e.types.Activity.SheetContext[];
    concentration: boolean;
    toHit: number | null;
    save: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.Implementation, 'save'> & {
      ability: string | null;
    } | null;
    uses: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.Implementation, 'uses'> & {
      hasRecharge: boolean;
      isOnCooldown: boolean;
      hasUses: boolean;
      prop: string;
    };
    linkedUses: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.Implementation, 'uses'> | null;
  }): void;

  /**
   * Prepare context for a feature. Called in addition to the standard `_prepareItem` for this item.
   * @param item  Item being prepared for display.
   * @param ctx   Item specific context.
   * @protected
   */
  _prepareItemFeature(item: Item.Implementation, ctx: {
    prefixedImage: string | null;
    availableLevels: {
      label: string;
      value: number;
      disabled: boolean;
    }[];
    subtitle: string;
  }): Promise<void>;

  /**
   * Prepare context for a physical item. Called in addition to the standard `_prepareItem` for this item.
   * @param item  Item being prepared for display.
   * @param ctx   Item specific context.
   * @protected
   */
  _prepareItemPhysical(item: Item.Implementation, ctx: {
    attunement: {
      applicable: boolean;
      disabled: boolean;
      cls: string;
    };
    equip: {
      applicable: boolean;
      cls: string;
      title: string;
      disabled: boolean;
    };
    subtitle: string;
    totalWeight: number;
  }): Promise<void>;

  /**
   * Prepare context for a spell. Called in addition to the standard `_prepareItem` for this item.
   * @param item  Item being prepared for display.
   * @param ctx   Item specific context.
   * @protected
   */
  _prepareItemSpell(item: Item.Implementation, ctx: {
    activation: string;
    range: dnd5e.types.GetTypeFromPath<dnd5e.types.Activity.Implementation, 'range'>;
    preparation: {
      applicable: boolean;
      disabled: boolean;
      cls: string;
    };
    subtitle: string;
  }): Promise<void>;

  /**
   * Augment inventory display with attunement indicator.
   * @param context  Render context.
   * @param options  Render options.
   * @protected
   */
  _renderAttunement(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): void;

  /**
   * Augment spellbook display.
   * @param context  Render context.
   * @param options  Render options.
   * @protected
   */
  _renderSpellbook(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): void;

  /* -------------------------------------------- */
  /*  Life-Cycle Handlers                         */
  /* -------------------------------------------- */

  /**
   * Apply a property attribution tooltip to an element.
   * @param element  The element to get the tooltip.
   * @protected
   */
  _applyTooltips(element: HTMLElement): void;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Determine the types of items that can be added depending on the current tab.
   * @param tab  Currently viewed tab.
   * @returns    Types of items to allow to create.
   */
  _addDocumentItemTypes(tab: string): string[];

  /**
   * Respond to a new level being selected from the level selector.
   * @param event  The originating change.
   * @returns      Promise that resolves when the change is complete.
   */
  #changeLevel(event: Event): Promise<any>;

  /* -------------------------------------------- */

  /**
   * Handle following a warning link.
   * @param event         Triggering click event.
   * @param target        Button that was clicked.
   */
  static #inspectWarning<This extends BaseActorSheet>(this: This, event: Event, target: HTMLElement): Promise<void>;

  /**
   * Handle following a warning link.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   * @returns       Return `false` to prevent default behavior.
   * @protected
   */
  _inspectWarning(event: Event, target: HTMLElement): any;

  /**
   * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs.
   * @param event  Triggering event.
   * @protected
   */
  _onChangeInputDelta(event: Event): void;

  /* -------------------------------------------- */

  /**
   * Handle opening the preparation warnings dialog.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #openWarnings<This extends BaseActorSheet>(this: This, event: Event, target: HTMLElement): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle resting the actor.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #rest<This extends BaseActorSheet>(this: This, event: Event, target: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle restoring a transformed action.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #restoreTransformation<This extends BaseActorSheet>(this: This, event: Event, target: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle rolling from the sheet.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   * @returns       Any return value from the roll.
   */
  static #roll<This extends BaseActorSheet>(this: This, event: Event, target: HTMLElement): Promise<dnd5e.dice.D20Roll | null>;

  /**
   * Handle rolling from the sheet.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   * @returns       Return `false` to prevent default behavior.
   * @protected
   */
  _roll(event: Event, target: HTMLElement): any;

  /**
   * Save the sheet's current size to preferences.
   * @param position  Application position.
   */
  #saveSheetSize(position: foundry.applications.api.ApplicationV2.Position): void;

  /* -------------------------------------------- */

  /**
   * Handle showing the Item's art.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #showArtwork<This extends BaseActorSheet>(this: This, event: Event, target: HTMLElement): void

  /* -------------------------------------------- */

  /**
   * Handle opening a configuration application.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   * @returns       Return `false` to prevent default behavior.
   */
  static #showConfiguration<This extends BaseActorSheet>(this: This, event: Event, target: HTMLElement): dnd5e.applications.actor.BaseConfigSheetV2 | undefined

  /**
   * Handle opening a configuration application.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   * @returns       Return `false` to prevent default behavior.
   * @abstract
   */
  _showConfiguration(event: Event, target: HTMLElement): any;

  /**
   * Toggle editing hit points.
   * @param event  The triggering event.
   * @param edit   Whether to toggle to the edit state.
   */
  #toggleMeter(event: PointerEvent, edit: boolean): void;

  
  /**
   * Handle toggling a pip on the character sheet.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #togglePip<This extends BaseActorSheet>(this: This, event: Event, target: HTMLElement): void

  /* -------------------------------------------- */

  /**
   * Handle toggling the sidebar collapsed state.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #toggleSidebar<This extends BaseActorSheet>(this: This, event: Event, target: HTMLElement): void

  /* -------------------------------------------- */

  /**
   * Toggle the sidebar collapsed state.
   * @param collapsed  Force a particular collapsed state.
   * @returns          The new collapsed state.
   * @protected
   */
  protected _toggleSidebar(collapsed?: boolean): boolean;

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /**
   * Handling beginning a drag-drop operation on an Activity.
   * @param event  The originating drag event.
   * @protected
   */
  _onDragActivity(event: DragEvent): void;

  /**
   * Handling beginning a drag-drop operation on an Active Effect.
   * @param event  The originating drag event.
   * @protected
   */
  _onDragEffect(event: DragEvent): void;

  /**
   * Handle beginning a drag-drop operation on an Item.
   * @param event  The originating drag event.
   * @protected
   */
  _onDragItem(event: DragEvent): void;

  /**
   * Handle the final creation of dropped Item data on the Actor.
   * @param event     The concluding DragEvent which provided the drop data.
   * @param items     The items requested for creation.
   * @param behavior  The specific drop behavior.
   * @returns         Created items.
   * @protected
   */
  _onDropCreateItems(event: DragEvent, items: Item.Implementation[], behavior?: any): Promise<Item.Implementation[]>;

  /**
   * Handles dropping of a single item onto this character sheet.
   * @param event     The concluding DragEvent which provided the drop data.
   * @param itemData  The item data to create.
   * @returns         The item data to create after processing, or false if the item should not be created.
   * @protected
   */
  _onDropSingleItem(event: DragEvent, itemData: any): Promise<any | false>;

  /**
   * Reset certain pieces of data stored on items when they are dropped onto the actor.
   * @param event     The concluding DragEvent which provided the drop data.
   * @param itemData  The item data requested for creation. **Will be mutated.**
   */
  _onDropResetData(event: DragEvent, itemData: any): void;

  /**
   * Stack identical consumables when a new one is dropped rather than creating a duplicate item.
   * @param event     The concluding DragEvent which provided the drop data.
   * @param itemData  The item data requested for creation.
   * @param options   Additional options.
   * @returns         If a duplicate was found, returns the adjusted item stack.
   */
  _onDropStackConsumables(event: DragEvent, itemData: any, options?: { container?: string | null }): Promise<Item.Implementation> | null;

  /* -------------------------------------------- */
  /*  Filtering                                   */
  /* -------------------------------------------- */

  /**
   * Filter child embedded Documents based on the current set of filters.
   * @param collection  The embedded collection name.
   * @param filters     Filters to apply to the children.
   * @returns           Filtered documents.
   * @protected
   */
  _filterChildren(collection: string, filters: Set<string>): foundry.abstract.Document.Any[];

  /**
   * Filter Active Effects based on the current set of filters.
   * @param effects  The effects to filter.
   * @param filters  Filters to apply to the effects.
   * @returns        Filtered effects.
   * @protected
   */
  _filterEffects(effects: ActiveEffect.Implementation[], filters: Set<string>): ActiveEffect.Implementation[];

  /**
   * Filter items based on the current set of filters.
   * @param items    The items to be filtered.
   * @param filters  Filters applied to the item list.
   * @returns        Subset of input items limited by the provided filters.
   * @protected
   */
  _filterItems(items: Item.Implementation[], filters: Set<string>): Item.Implementation[];

  /**
   * Determine whether an Item will be shown based on the current set of filters.
   * @param item     The item.
   * @param filters  Filters applied to the Item.
   * @returns        Whether to show the item.
   * @protected
   */
  _filterItem(item: Item.Implementation, filters: Set<string>): boolean | void;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Can an item be expanded on the sheet?
   * @param item  Item on the sheet.
   * @returns     Whether the item can be expanded.
   */
  canExpand(item: Item.Implementation): boolean;


  /**
   * Control whether the restore transformation button is visible.
   * @returns  Whether the button should be visible.
   */
  static #canRestoreTransformation<This extends BaseActorSheet.Any>(this: This): boolean;
}

// Any class for generic flexibility
declare class AnyBaseActorSheet extends BaseActorSheet<any, any, any> {
  constructor(...args: any[]);
}

// Namespace for types
declare namespace BaseActorSheet {
  // Required interfaces for extensibility
  interface Any extends AnyBaseActorSheet { }
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyBaseActorSheet> { }

  // Make... types for extension support
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      actor: Actor.Implementation;
      elements: Record<string, string>;
      fields: foundry.data.fields.DataSchema;
      labels: Record<string, any>;
      limited: boolean;
      modernRules: boolean;
      rollableClass: string;
      sidebarCollapsed: boolean;
      system: any;
      user: User.Implementation | undefined;
      warnings: any[];
      source: any;
      config: any;
      effects?: Record<string, any>;
      conditions?: any[];
      itemCategories?: Record<string, any[]>;
      itemContext?: Record<string, any>;
      items?: Item.Implementation[];
      containers?: any[];
      sections?: any[];
      showCurrency?: boolean;
      listControls?: any;
      flags?: any;
      spellbook?: Record<string, any>;
      tabs?: any[];
    },
    Ctx
  >;

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Base actor sheet configuration
    },
    Cfg
  >;

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Base actor sheet render options
    },
    Opt
  >;

  // Type aliases for convenience
  type RenderContext = BaseActorSheet.MakeRenderContext<{}>;
  type Configuration = BaseActorSheet.MakeConfiguration<{}>;
  type RenderOptions = BaseActorSheet.MakeRenderOptions<{}>;
}

export default BaseActorSheet;
