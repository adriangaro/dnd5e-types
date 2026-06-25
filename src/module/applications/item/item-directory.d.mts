/** Items sidebar with added support for item containers. */

import DragDropApplicationMixin from "../api/drag-drop-mixin.mjs";

declare class ItemDirectory5e extends DragDropApplicationMixin(foundry.applications.sidebar.tabs.ItemDirectory) {
  /** @override */
  protected _allowedDropBehaviors(event: DragEvent, data?: object): Set<dnd5e.types.DropEffectValue>;

  /** @override */
  protected _defaultDropBehavior(event: DragEvent, data?: object): dnd5e.types.DropEffectValue;

  /** @inheritDoc */
  protected _entryAlreadyExists(item: Item.Implementation): boolean;

  /** @override */
  protected _onDrop(event: DragEvent): void;

  /** @inheritDoc */
  protected _handleDroppedEntry(target: HTMLElement, data: any, event: DragEvent): Promise<void>;

  /** @override */
  protected _onClickEntry(event: Event, target: HTMLElement): Promise<void>;
}

declare namespace ItemDirectory5e {
  interface Any extends ItemDirectory5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemDirectory5e> {}
}

export default ItemDirectory5e;
