/**
 * Base actor sheet built on ApplicationV2.
 *
 * Runtime chain `PrimarySheetMixin(ApplicationV2Mixin(ActorSheetV2))`, expressed
 * directly as heritage. The `ActorSheetV2` generics are threaded through the OUTERMOST mixin call
 * (`PrimarySheetMixin(ApplicationV2Mixin(ActorSheetV2))<…>`) so the sheet is subclassable; the
 * genuinely-new actor-sheet members are declared on the body (the primary-sheet/drag-drop surface
 * and the base lifecycle methods are inherited from the mixins, not restated). Context/config/
 * options are open namespace interfaces.
 */

import ApplicationV2Mixin from "../../api/application-v2-mixin.mjs";
import PrimarySheetMixin from "../../api/primary-sheet-mixin.mjs";
import InventoryElement from "../../components/inventory.mjs";

declare class BaseActorSheet<
  RenderContext extends foundry.applications.sheets.ActorSheetV2.RenderContext = BaseActorSheet.RenderContext,
  Configuration extends
    foundry.applications.sheets.ActorSheetV2.Configuration = BaseActorSheet.Configuration,
  RenderOptions extends
    foundry.applications.sheets.ActorSheetV2.RenderOptions = BaseActorSheet.RenderOptions,
> extends PrimarySheetMixin(
  ApplicationV2Mixin(foundry.applications.sheets.ActorSheetV2),
)<RenderContext, Configuration, RenderOptions> {
  /** The Actor whose items are shown on the sheet. */
  get inventorySource(): globalThis.Actor.Implementation;

  /**
   * The cached concentration information for the character.
   * @internal
   */
  _concentration: {
    items: Set<globalThis.Item.Implementation>;
    effects: Set<globalThis.ActiveEffect.Implementation>;
  };

  /** Key path to the sidebar collapsed flag for the current tab. */
  get _sidebarCollapsedKeyPath(): string;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** Allow subclasses to make adjustments to inventory section configuration. */
  _configureInventorySections(sections: InventoryElement.InventorySectionDescriptor[]): Promise<void>;

  /** Prepare rendering context for the effects tab. */
  _prepareEffectsContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the inventory tab. */
  _prepareInventoryContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the special traits tab. */
  _prepareSpecialTraitsContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the spells tab. */
  _prepareSpellsContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /* -------------------------------------------- */
  /*  Actor Preparation Helpers                   */
  /* -------------------------------------------- */

  /** Prepare actor abilities for display. */
  _prepareAbilities(context: RenderContext): object[];

  /** Prepare items display across the sheet. */
  _prepareItems(context: RenderContext): Promise<void>;

  /** Prepare actor portrait for display. */
  _preparePortrait(context: RenderContext): Promise<object>;

  /** Prepare actor senses for display. */
  _prepareSenses(context: RenderContext): object[];

  /** Prepare actor skills or tools for display. */
  _prepareSkillsTools(context: RenderContext, property: "skills" | "tools"): object[];

  /** Prepare spells sections for display. */
  _prepareSpellbook(context: RenderContext): object;

  /** Prepare actor traits for display. */
  _prepareTraits(context: RenderContext): Record<string, object[]>;

  /* -------------------------------------------- */
  /*  Item Preparation Helpers                    */
  /* -------------------------------------------- */

  /** Place an item into specific categories. */
  _assignItemCategories(item: globalThis.Item.Implementation): Set<string>;

  /** Determine whether an item should be displayed on the sheet. */
  _isItemVisible(item: globalThis.Item.Implementation): boolean;

  /** Prepare specific activity's context. */
  _prepareActivity(activity: dnd5e.types.Activity.Instance): object;

  /** Prepare specific item's context. */
  _prepareItem(item: globalThis.Item.Implementation, ctx: object): void;

  /** Prepare context for a feature. Called in addition to the standard `_prepareItem` for this item. */
  _prepareItemFeature(item: globalThis.Item.Implementation, ctx: object): Promise<void>;

  /** Prepare context for a physical item. Called in addition to the standard `_prepareItem` for this item. */
  _prepareItemPhysical(item: globalThis.Item.Implementation, ctx: object): Promise<void>;

  /** Prepare context for a spell. Called in addition to the standard `_prepareItem` for this item. */
  _prepareItemSpell(item: globalThis.Item.Implementation, ctx: object): Promise<void>;

  /** Augment inventory display with attunement indicator. */
  _renderAttunement(context: RenderContext, options: RenderOptions): void;

  /** Render a button for creating items in the inventory tab. */
  _renderCreateInventory(): void;

  /** Augment spellbook display. */
  _renderSpellbook(context: RenderContext, options: RenderOptions): void;

  /* -------------------------------------------- */
  /*  Life-Cycle Handlers                         */
  /* -------------------------------------------- */

  /** Apply a property attribution tooltip to an element. */
  _applyTooltips(element: HTMLElement): void;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** Determine the types of items that can be added depending on the current tab. */
  _addDocumentItemTypes(tab: string): string[];

  /** Handle following a warning link. Return `false` to prevent default behavior. */
  _inspectWarning(event: Event, target: HTMLElement): unknown;

  /** Handle input changes to numeric form fields, allowing them to accept delta-typed inputs. */
  _onChangeInputDelta(event: Event): void;

  /** Handle editing the portrait. */
  _onEditPortrait(target: string, path: string): Promise<void>;

  /** Handle rolling from the sheet. Return `false` to prevent default behavior. */
  _roll(event: Event, target: HTMLElement): unknown;

  /**
   * Handle opening a configuration application.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   * @returns Return `false` to prevent default behavior.
   * @abstract
   */
  _showConfiguration(event: Event, target: HTMLElement): unknown;

  /** Toggle the sidebar collapsed state. */
  _toggleSidebar(collapsed?: boolean): boolean;

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /** Process form data before it is used to update the document. */
  _processFormData(
    event: SubmitEvent | null,
    form: HTMLFormElement,
    formData: foundry.applications.ux.FormDataExtended,
  ): object;

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /** Handling beginning a drag-drop operation on an Activity. */
  _onDragActivity(event: DragEvent): void;

  /** Handling beginning a drag-drop operation on an Active Effect. */
  _onDragEffect(event: DragEvent): void;

  /** Handle beginning a drag-drop operation on an Item. */
  _onDragItem(event: DragEvent): void;

  /** Handle dropping an item onto a container icon on the actor sheet. */
  _onDropItemContainer(
    event: DragEvent,
    item: globalThis.Item.Implementation,
    container: globalThis.Item.Implementation,
  ): Promise<unknown>;

  /** Handle the final creation of dropped Item data on the Actor. */
  _onDropCreateItems(
    event: DragEvent,
    items: globalThis.Item.Implementation[],
    behavior?: dnd5e.types.DropEffectValue,
  ): Promise<globalThis.Item.Implementation[]>;

  /** Handles dropping of a single item onto this character sheet. */
  _onDropSingleItem(
    event: DragEvent,
    itemData: object,
    options?: { container?: string | null },
  ): Promise<object | boolean>;

  /**
   * Reset certain pieces of data stored on items when they are dropped onto the actor.
   * @param event     The concluding DragEvent which provided the drop data.
   * @param itemData  The item data requested for creation. **Will be mutated.**
   */
  _onDropResetData(event: DragEvent, itemData: object): void;

  /** Stack identical consumables when a new one is dropped rather than creating a duplicate item. */
  _onDropStackConsumables(
    event: DragEvent,
    itemData: object,
    options?: { container?: string | null },
  ): Promise<globalThis.Item.Implementation> | null;

  /** Sort an item relative to its siblings. */
  _onSortItem(
    event: DragEvent,
    item: globalThis.Item.Implementation,
  ): Promise<globalThis.Item.Implementation[]> | void;

  /* -------------------------------------------- */
  /*  Filtering                                   */
  /* -------------------------------------------- */

  /** Filter child embedded Documents based on the current set of filters. */
  _filterChildren(collection: string, filters: Set<string>): foundry.abstract.Document.Any[];

  /** Filter Active Effects based on the current set of filters. */
  _filterEffects(
    effects: globalThis.ActiveEffect.Implementation[],
    filters: Set<string>,
  ): globalThis.ActiveEffect.Implementation[];

  /** Filter items based on the current set of filters. */
  _filterItems(
    items: globalThis.Item.Implementation[],
    filters: Set<string>,
  ): globalThis.Item.Implementation[];

  /** Determine whether an Item will be shown based on the current set of filters. */
  _filterItem(item: globalThis.Item.Implementation, filters: Set<string>): boolean | void;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /** Can an item be expanded on the sheet? */
  canExpand(item: globalThis.Item.Implementation): boolean;

  /** Limited-view template parts, keyed by id. */
  static LIMITED_PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart>;

  /** A set of item types that should be prevented from being dropped on this type of actor sheet. */
  static unsupportedItemTypes: Set<string>;
}

declare namespace BaseActorSheet {
  interface Any extends BaseActorSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BaseActorSheet<any, any, any>> {}

  interface RenderContext
    extends foundry.applications.sheets.ActorSheetV2.RenderContext,
      ApplicationV2Mixin.RenderContext {
    mode: PrimarySheetMixin.ModeValue | null;
    filters: Record<string, PrimarySheetMixin.FilterState>;

    // _prepareContext fields
    actor: globalThis.Actor.Implementation;
    elements: Record<string, string>;
    labels: Record<string, unknown>;
    limited: boolean;
    modernRules: boolean;
    rollableClass: string;
    sidebarCollapsed: boolean;
    system: object;
    user: globalThis.User.Implementation;
    warnings: object[];
    config: dnd5e.types.DND5EConfig;

    // _prepareItems fields
    itemCategories: Record<string, globalThis.Item.Implementation[]>;
    itemContext: Record<string, object>;
    items: globalThis.Item.Implementation[];

    // Tab builder fields (conditionally populated per-tab)
    effects?: object;
    conditions?: object[];
    currency?: Record<string, number>;
    containers?: globalThis.Item.Implementation[];
    sections?: object;
    showCurrency?: boolean;
    listControls?: object;
    flags?: object;
    spellbook?: object;
  }

  interface Configuration
    extends foundry.applications.sheets.ActorSheetV2.Configuration,
      ApplicationV2Mixin.Configuration {}

  interface RenderOptions
    extends foundry.applications.sheets.ActorSheetV2.RenderOptions,
      ApplicationV2Mixin.RenderOptions {}
}

export default BaseActorSheet;
