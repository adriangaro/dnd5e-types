import DocumentSheet5e from "../api/document-sheet.mjs";
import PrimarySheetMixin from "../api/primary-sheet-mixin.mjs";

/**
 * Base item sheet built on ApplicationV2.
 */
declare class ItemSheet5e<
  Item extends Item.Implementation = Item.Implementation,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends PrimarySheetMixin(DocumentSheet5e)<
  Item,
  ItemSheet5e.MakeRenderContext<RenderContext, Item>,
  ItemSheet5e.MakeConfiguration<Configuration>,
  ItemSheet5e.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The Actor owning the item, if any.
   */
  get actor(): Actor.Implementation | null;

  /**
   * Additional toggles added to header buttons.
   */
  _headerToggles: Record<string, HTMLElement>;

  /**
   * Description currently being edited for items types with multiple descriptions.
   */
  editingDescriptionTarget: string | null;

  /**
   * The Item document managed by this sheet.
   */
  get item(): Item.Implementation;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the activities tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Updated context.
   * @protected
   */
  protected _prepareActivitiesContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the advancement tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Updated context.
   * @protected
   */
  protected _prepareAdvancementContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the description tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Updated context.
   * @protected
   */
  protected _prepareDescriptionContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the details tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Updated context.
   * @protected
   */
  protected _prepareDetailsContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the effects tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Updated context.
   * @protected
   */
  protected _prepareEffectsContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the header.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Updated context.
   * @protected
   */
  protected _prepareHeaderContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /**
   * Get the display object used to show the advancement tab.
   * @returns Object with advancement data grouped by levels.
   */
  _getAdvancement(): object;

  /**
   * Prepare tags for an Advancement.
   * @param advancement  The Advancement.
   * @returns            Array of tag objects.
   * @protected
   */
  protected _getAdvancementTags(advancement: any): { label: string, icon: string }[];

  /**
   * Get the base weapons and tools based on the selected type.
   * @returns Promise resolving to base item options or null.
   * @protected
   */
  protected _getBaseItemOptions(): Promise<dnd5e.types.FormSelectOption[] | null>;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle adding a recovery option.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   * @returns       Promise resolving to the submission result.
   */
  static #addRecovery<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): Promise<any>;

  /**
   * Handle removing an document.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #deleteDocument<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): Promise<void>;

  /**
   * Handle removing an item currently being crafted.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #deleteCraft<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): void;

  /**
   * Handle removing a recovery option.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #deleteRecovery<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): void;

  /**
   * Handle expanding the description editor.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #editDescription<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): void;

  /**
   * Handle modifying the choices for an advancement level.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #modifyAdvancementChoices<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): void;

  /**
   * Handle opening a configuration application.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   * @returns       Configuration application instance.
   */
  static #showConfiguration<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): any;

  /**
   * Handle opening a document sheet.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #showDocument<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): Promise<void>;

  /**
   * Handle showing the Item's art.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #showIcon<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): void;

  /**
   * Handle toggling Item state.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #toggleState<This extends ItemSheet5e.Any>(this: This, event: Event, target: HTMLElement): void;

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */


  /**
   * Handle dropping items onto the sheet.
   * @param event  The concluding drag event.
   * @returns      Promise resolving to the drop result.
   * @protected
   */
  protected _onDrop(event: DragEvent): Promise<any>;

  /**
   * Handle the dropping of ActiveEffect data onto an Item Sheet
   * @param event  The concluding DragEvent which contains drop data
   * @param data   The data transfer extracted from the event
   * @returns      The created ActiveEffect object or false if it couldn't be created.
   * @protected
   */
  protected _onDropActiveEffect(event: DragEvent, data: any): Promise<ActiveEffect.Implementation | false>;

  /**
   * Handle dropping an Activity onto the sheet.
   * @param event    The drag event.
   * @param transfer The dropped data.
   * @protected
   */
  protected _onDropActivity(event: DragEvent, transfer: { data: any }): void;

  /**
   * Handle the dropping of an advancement or item with advancements onto the advancements tab.
   * @param event  The concluding DragEvent which contains drop data.
   * @param data   The data transfer extracted from the event.
   * @returns      Promise resolving to the drop result.
   */
  protected _onDropAdvancement(event: DragEvent, data: any): Promise<any>;

  /**
   * Handle dropping another item onto this item.
   * @param event  The drag event.
   * @param data   The dropped data.
   */
  protected _onDropItem(event: DragEvent, data: any): Promise<any>;

  /**
   * Handle creating a "Cast" activity when dropping a spell.
   * @param event  The drag event.
   * @param item   The dropped item.
   */
  protected _onDropSpell(event: DragEvent, item: Item.Implementation): void;

  /* -------------------------------------------- */
  /*  Filtering                                   */
  /* -------------------------------------------- */

  /**
   * Filter child documents based on the current set of filters.
   * @param collection  The embedded collection name.
   * @param filters     Filters to apply to the children.
   * @returns           Array of filtered documents.
   * @protected
   */
  protected _filterChildren(collection: string, filters: Set<string>): foundry.abstract.Document.Any[];

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Determine whether an Item is considered identified.
   * @param item  The Item.
   * @returns     Whether the item is identified.
   */
  static isItemIdentified(item: Item.Implementation): boolean;

  /**
   * Determine if an Item support Activities.
   * @param item  The Item.
   * @returns     Whether the item has activities.
   */
  static itemHasActivities(item: Item.Implementation): boolean;

  /**
   * Determine if an Item support Advancement.
   * @param item  The Item.
   * @returns     Whether the item has advancement.
   */
  static itemHasAdvancement(item: Item.Implementation): boolean;

  /**
   * Determine if an Item should show an effects tab.
   * @param item  The Item.
   * @returns     Whether the item should show effects.
   */
  static itemHasEffects(item: Item.Implementation): boolean;
}

declare class AnyItemSheet5e extends ItemSheet5e<any, any, any> {
  constructor(...args: any[]);
}

declare namespace ItemSheet5e {  
  interface Any extends AnyItemSheet5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyItemSheet5e> {}

  type MakeRenderContext<
  Ctx extends fvttUtils.AnyObject = {}, 
  Item extends Item.Implementation = Item.Implementation
  > = dnd5e.types.DeepMerge<
    {
      // Core item data
      item: Item;
      actor: Actor.Implementation | null;
      system: Item['system'];
      fields: dnd5e.types.GetTypeFromPath<Item, 'system.schema.fields'>;
      source: Item['system']['_source'] | Item['system'];
      labels: Item['labels'];
      user: User.Implementation;
      
      // Item state
      concealDetails: boolean;
      elements: { effects: string };
      isEmbedded: boolean;
      isIdentifiable: boolean;
      isIdentified: boolean;
      isPhysical: boolean;
      
      // Properties
      properties: {
        active: string[];
        object: Record<string, boolean>;
        options: dnd5e.types.FormSelectOption[];
      };
      
      // Tab-specific contexts
      activities?: {
        id: string;
        name: string;
        sort: number;
        img: { src: string; svg: boolean };
        uuid: string;
      }[];
      
      advancement?: Record<string, {
        items: {
          id: string;
          uuid: string;
          order: string;
          title: string;
          icon: string;
          classRestriction: string;
          configured: boolean;
          summary?: string;
          tags: { label: string; icon: string }[];
          value?: any;
          classes: string;
        }[];
        configured: boolean | "partial" | "full";
      }>;
      
      expanded?: Record<string, boolean>;
      enriched?: {
        description: string;
        unidentified?: string;
        chat: string;
      };
      editingDescription?: {
        target: string;
        value: any;
      };
      
      // Details tab
      tab?: any;
      parts?: any[];
      baseItemOptions?: dnd5e.types.FormSelectOption[] | null;
      coverOptions?: dnd5e.types.FormSelectOption[];
      spellProgression?: dnd5e.types.FormSelectOption[];
      data?: { uses: any };
      hasLimitedUses?: boolean;
      recoveryPeriods?: any;
      recoveryTypes?: dnd5e.types.FormSelectOption[];
      usesRecovery?: {
        data: any;
        fields: any;
        prefix: string;
        source: any;
        formulaOptions: any;
      }[];
      
      // Effects tab
      effects?: Record<string, {
        effects: {
          id: string;
          name: string;
          img: string;
          disabled: boolean;
          duration: any;
          source: any;
          parent: any;
          durationParts: string[];
          hasTooltip: boolean;
        }[];
      }>;
      
      // Header context
      name?: {
        value: string;
        editable: string;
        field: foundry.data.fields.DataField.Any;
      };
      img?: {
        value: string;
        editable: string;
      };
    },
    Ctx
  >;
  type RenderContext = ItemSheet5e['__RenderContext'];

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      editingDescriptionTarget: string | null;
    },
    Cfg
  >;
  type Configuration = ItemSheet5e['__Configuration'];

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // ItemSheet5e doesn't add specific render options beyond the parents
    },
    Opt
  >;
  type RenderOptions = ItemSheet5e['__RenderOptions'];
}

export default ItemSheet5e; 