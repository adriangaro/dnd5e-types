import Item5e from "../../documents/item.mjs";
import DragDropApplicationMixin from "../mixins/drag-drop-mixin.mjs";
import ItemSheet5e2 from "./item-sheet-2.mjs";
// TODO foundry.applications?.sidebar?.tabs?.ItemDirectory

/**
 * Items sidebar with added support for item containers.
 */
export default class ItemDirectory5e extends DragDropApplicationMixin(
  // @ts-expect-error
  ItemDirectory
) {}
