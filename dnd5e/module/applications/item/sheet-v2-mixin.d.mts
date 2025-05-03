// Assuming Item.Implementation, JQuery, PointerEvent, HTMLElement, etc. are globally available or implicitly handled.

declare class _ItemSheetV2Mixin {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);

  static TABS: {
      tab: string;
      label: string;
      condition?: (item: Item.Implementation) => boolean;
  }[];

  /**
   * Store the collapsed state of the description boxes.
   * @protected
   */
  _collapsed: Record<string, boolean>;

  /**
   * Track the set of filters which are applied.
   * @protected
   */
  _filters: Record<string, any>; // FilterState5e type is unknown


  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Disable form fields that aren't marked with the `interface-only` class.
   * @param form  The form element whose fields are being disabled.
   */
  _disableFields(form: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle toggling one of the item's description categories.
   * @param event  The triggering event.
   * @protected
   */
  _onToggleOwnDescription(event: PointerEvent): void;

  /* -------------------------------------------- */

  /**
   * Handle toggling Item state.
   * @param event  The triggering event.
   * @protected
   */
  _onToggleState(event: PointerEvent): Promise<Item.Implementation | undefined>;

  /* -------------------------------------------- */

  /**
   * Handle showing the Item's art.
   * @protected
   */
  _onShowIcon(): void;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Determine if an Item support Activities.
   * @param item  The Item.
   * @returns
   */
  static itemHasActivities(item: Item.Implementation): boolean;

  /* -------------------------------------------- */

  /**
   * Determine if an Item support Advancements.
   * @param item  The Item.
   * @returns
   */
  static itemHasAdvancements(item: Item.Implementation): boolean;

  /* -------------------------------------------- */

  /**
   * Determine if an Item has contents.
   * @param item  The Item.
   * @returns
   */
  static itemHasContents(item: Item.Implementation): boolean;

  /* -------------------------------------------- */

  /**
   * Determine if an Item should show an effects tab.
   * @param item  The Item.
   * @returns
   */
  static itemHasEffects(item: Item.Implementation): boolean;

  /* -------------------------------------------- */

  /**
   * Determine whether an Item is considered identified.
   * @param item  The Item.
   * @returns
   */
  static isItemIdentified(item: Item.Implementation): boolean;
}

declare function ItemSheetV2Mixin<T extends fvttUtils.AnyConstructor>(Base: T): T & typeof _ItemSheetV2Mixin;

export default ItemSheetV2Mixin;
