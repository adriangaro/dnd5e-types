import type { DropEffectValue } from "../../../drag-drop.mjs";
import DragDropApplicationMixin from "../../mixins/drag-drop-mixin.mjs";

/**
 * The mixed ActorSheet class created by ActorSheetMixin.
 * @deprecated Use BaseActorSheet instead
 */
declare class ActorSheetMixinClass {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);

  /**
   * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs.
   * @param event Triggering event.
   * @protected
   */
  protected _onChangeInputDelta(event: Event): void;

  /**
   * Stack identical consumables when a new one is dropped rather than creating a duplicate item.
   * @param itemData The item data requested for creation.
   * @param options
   * @param options.container ID of the container into which this item is being dropped.
   * @returns If a duplicate was found, returns the adjusted item stack.
   */
  _onDropStackConsumables(
    itemData: any, 
    options?: { container?: string | null }
  ): Promise<Item.Implementation> | null;

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  protected _allowedDropBehaviors(event: DragEvent, data?: any): Set<DropEffectValue>;

  protected _defaultDropBehavior(event: DragEvent, data?: any): DropEffectValue;
}

declare namespace ActorSheetMixinClass {}

/**
 * Mixin method for common uses between all actor sheets.
 * @param Base Application class being extended.
 * @returns Mixed class with actor sheet functionality.
 * @deprecated Use BaseActorSheet instead
 * @mixin
 */
declare function ActorSheetMixin<T extends Application.AnyConstructor>(
  Base: T
  // @ts-expect-error
): ReturnType<typeof DragDropApplicationMixin<T>> & typeof ActorSheetMixinClass;

declare namespace ActorSheetMixin {
  export import Mixin = ActorSheetMixinClass;
}

export default ActorSheetMixin;
