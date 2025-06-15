import Item5e from "../../documents/item.mjs";
import DragDropApplicationMixin from "../mixins/drag-drop-mixin.mjs";
import ItemSheet5e2 from "./item-sheet-2.mjs";
// TODO foundry.applications?.sidebar?.tabs?.ItemDirectory
// Assuming Foundry VTT types like Compendium, DragEvent, object, Set, HTMLElement, PointerEvent, CompendiumCollection, Folder, TextEditor, Document, Item.Implementation, CompendiumCollection.Options are globally available

// TODO  fix this cause fvtt types broke it completely

/**
 * Compendium with added support for item containers.
 */
// @ts-expect-error
declare class ItemCompendium5eV13 extends DragDropApplicationMixin(Compendium<any>) {
  // No specific members declared based on user's edits
}

/**
 * Compendium with added support for item containers.
 * TODO: Remove when v12 support is dropped.
 */
// @ts-expect-error
declare class ItemCompendium5eV12 extends DragDropApplicationMixin(
  // @ts-expect-error
  Compendium
)<any> {
  // No specific members declared based on user's edits
}

/**
 * Compendium with added support for item containers.
 */
export default class ItemCompendium5e extends Compendium<any> {
  constructor(...args: any[]);
}
