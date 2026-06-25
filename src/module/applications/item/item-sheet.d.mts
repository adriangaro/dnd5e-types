/**
 * Base item sheet built on ApplicationV2.
 *
 * The primary Item sheet: runtime chain `PrimarySheetMixin(DocumentSheet5e)`, expressed directly as
 * heritage. The {@link DocumentSheet5e} `Document` is bound to `Item.Implementation` and the generics
 * are threaded through the OUTERMOST mixin call so it stays subclassable; the actor-independent body
 * members are declared inline (the primary-sheet/drag-drop surface is inherited from the mixin).
 * Context/config/options are open namespace interfaces.
 */

import DocumentSheet5e from "../api/document-sheet.mjs";
import PrimarySheetMixin from "../api/primary-sheet-mixin.mjs";

declare class ItemSheet5e<
  RenderContext extends object = ItemSheet5e.RenderContext,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<globalThis.Item.Implementation> = ItemSheet5e.Configuration,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = ItemSheet5e.RenderOptions,
> extends PrimarySheetMixin(
  DocumentSheet5e,
)<globalThis.Item.Implementation, RenderContext, Configuration, RenderOptions> {
  /** The Item document managed by this sheet. */
  get item(): globalThis.Item.Implementation;

  /** The Actor instance which owns this Item, if any. */
  get actor(): globalThis.Actor.Implementation | null;

  /** Additional toggles added to header buttons. */
  _headerToggles: Record<string, HTMLElement>;

  /** Description currently being edited for item types with multiple descriptions. */
  editingDescriptionTarget: string | null;

  /** Prepare rendering context for the activities tab. */
  protected _prepareActivitiesContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;
  /** Prepare rendering context for the advancement tab. */
  protected _prepareAdvancementContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;
  /** Prepare rendering context for the description tab. */
  protected _prepareDescriptionContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;
  /** Prepare rendering context for the details tab. */
  protected _prepareDetailsContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;
  /** Prepare rendering context for the effects tab. */
  protected _prepareEffectsContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;
  /** Prepare rendering context for the header. */
  protected _prepareHeaderContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Get the display object used to show the advancement tab, grouped by level. */
  _getAdvancement(): Promise<Record<string, object>>;

  /** Prepare tags for an Advancement. */
  protected _getAdvancementTags(advancement: dnd5e.types.Advancement.Instance): { label: string; icon: string }[];

  /** Get the base weapons and tools based on the selected type. */
  protected _getBaseItemOptions(context: RenderContext): Promise<foundry.applications.fields.FormSelectOption[] | null>;

  /**
   * Handle dropping items onto the sheet.
   * @param event  The concluding drag event.
   * @fires dnd5e.dropItemSheetData — fires before dispatch; returning `false` prevents normal drop handling.
   */
  protected _onDrop(event: DragEvent): any;
  /** Handle the dropping of ActiveEffect data onto an Item Sheet. */
  protected _onDropActiveEffect(event: DragEvent, data: object): Promise<globalThis.ActiveEffect.Implementation | boolean>;
  /** Handle dropping an Activity onto the sheet. */
  protected _onDropActivity(event: DragEvent, transfer: { data: object }): void;
  /** Handle the dropping of an advancement or item with advancements onto the advancements tab. */
  protected _onDropAdvancement(event: DragEvent, data: object): Promise<unknown>;
  /** Handle dropping another item onto this item. */
  protected _onDropItem(event: DragEvent, data: object): Promise<unknown>;
  /** Handle creating a "Cast" activity when dropping a spell. */
  protected _onDropSpell(event: DragEvent, item: globalThis.Item.Implementation): void;

  /** Filter child documents based on the current set of filters. */
  protected _filterChildren(collection: string, filters: Set<string>): foundry.abstract.Document.Any[];

  /** Determine whether an Item is considered identified. */
  static isItemIdentified(item: globalThis.Item.Implementation): boolean;
  /** Determine if an Item supports Activities. */
  static itemHasActivities(item: globalThis.Item.Implementation): boolean;
  /** Determine if an Item supports Advancement. */
  static itemHasAdvancement(item: globalThis.Item.Implementation): boolean;
  /** Determine if an Item should show an effects tab. */
  static itemHasEffects(item: globalThis.Item.Implementation): boolean;

}

declare namespace ItemSheet5e {
  interface Any extends ItemSheet5e<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemSheet5e<any, any, any>> {}

  interface RenderContext extends DocumentSheet5e.RenderContext<globalThis.Item.Implementation> {
    mode: PrimarySheetMixin.ModeValue | null;
    filters: Record<string, PrimarySheetMixin.FilterState>;

    // Note: `source` and `fields` are inherited from the base DocumentSheetV2.RenderContext.
    concealDetails?: boolean;
    elements?: { activities: string; effects: string };
    isEmbedded?: boolean;
    isIdentifiable?: boolean;
    isIdentified?: boolean;
    isPhysical?: boolean;
    item?: globalThis.Item.Implementation;
    labels?: object;
    system?: object;
    user?: globalThis.User.Implementation;
    properties?: {
      active: unknown[];
      object: Record<string, boolean>;
      options: foundry.applications.fields.FormSelectOption[];
    };

    // Tab contexts
    activities?: object[];
    advancement?: Record<string, object>;
    expanded?: Record<string, unknown>;
    enriched?: { description: string; unidentified: string; chat: string };
    editingDescription?: { target: string; value: unknown };
    tab?: Partial<foundry.applications.api.ApplicationV2.Tab>;
    parts?: string[];
    baseItemOptions?: foundry.applications.fields.FormSelectOption[] | null;
    coverOptions?: foundry.applications.fields.FormSelectOption[];
    unitsOptions?: foundry.applications.fields.FormSelectOption[];
    spellProgression?: foundry.applications.fields.FormSelectOption[];
    data?: object;
    hasLimitedUses?: boolean;
    recoveryTypes?: foundry.applications.fields.FormSelectOption[];
    usesRecovery?: object[];
    effects?: object;
    name?: { value: string; editable: string; field?: foundry.data.fields.DataField.Any | null };
    img?: { value: string; editable: string };
  }
  interface Configuration extends DocumentSheet5e.Configuration<globalThis.Item.Implementation> {
    legacyDisplay?: boolean;
  }
  interface RenderOptions extends DocumentSheet5e.RenderOptions {}
}

export default ItemSheet5e;
