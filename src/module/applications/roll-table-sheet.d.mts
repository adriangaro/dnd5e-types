/** Extension of the default roll table sheet to add dnd5e styling. */

import ApplicationV2Mixin from "./api/application-v2-mixin.mjs";

declare class RollTableSheet5e extends ApplicationV2Mixin(foundry.applications.sheets.RollTableSheet, { handlebars: false }) {
  /**
   * Replace all matching elements with a new tag, keeping all existing attributes.
   * @param selector           CSS selector to find elements to replace.
   * @param tagName            Tag name for the new element to use.
   * @param options
   * @param options.callback   Method called for each new element before it replaces the old one.
   * @protected
   */
  _replaceElements(selector: string, tagName: string, options?: { callback?: (element: HTMLElement) => void }): void;

  /**
   * Change the sheet mode.
   * @param mode  Mode to set. If not provided, mode will be toggled.
   */
  changeMode(mode?: 1 | 2): Promise<void>;
}

declare namespace RollTableSheet5e {
  interface Any extends RollTableSheet5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof RollTableSheet5e> {}
}

export default RollTableSheet5e;
