import DragDropApplicationMixin from "../mixins/drag-drop-mixin.mjs";

declare class _ActorSheetMixin {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);
  /**
   * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs.
   * @param {Event} event  Triggering event.
   * @protected
   */
  protected _onChangeInputDelta(event: Event): void;

  /* -------------------------------------------- */

  /**
   * Stack identical consumables when a new one is dropped rather than creating a duplicate item.
   * @param {object} itemData                  The item data requested for creation.
   * @param {object} [options={}]
   * @param {string} [options.container=null]  ID of the container into which this item is being dropped.
   * @returns {Promise<Item.Implementation>|null}           If a duplicate was found, returns the adjusted item stack.
   */
  _onDropStackConsumables(itemData: object, options?: { container?: string | null }): Promise<Item.Implementation> | null;

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /** @override */
  protected _allowedDropBehaviors(event: Event, data: { uuid?: string }): Set<string>;

  /* -------------------------------------------- */

  /** @override */
  protected _defaultDropBehavior(event: Event, data: { uuid?: string }): string;
}

declare namespace _ActorSheetMixin {}

declare namespace ActorSheetMixin {
  export import Mixin = _ActorSheetMixin;
}

/**
 * Mixin method for common uses between all actor sheets.
 * @param Base   Application class being extended.
 * @mixin
 */
declare function ActorSheetMixin<T extends Application.AnyConstructor>(Base: T): ReturnType<typeof DragDropApplicationMixin<T>> & typeof _ActorSheetMixin;


export default ActorSheetMixin;