/** Compendium with added support for item containers. */

import DragDropApplicationMixin from "../api/drag-drop-mixin.mjs";

declare class ItemCompendium5e extends DragDropApplicationMixin(foundry.applications.sidebar.apps.Compendium) {
  /** @inheritDoc */
  protected _handleDroppedEntry(target: HTMLElement, data: any): Promise<void>;

  /** @override */
  protected _onClickEntry(event: Event): Promise<void>;
}

declare namespace ItemCompendium5e {
  interface Any extends ItemCompendium5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemCompendium5e> {}
}

export default ItemCompendium5e;
