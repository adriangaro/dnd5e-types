/** A custom HTML element that represents a checkbox-like input that is displayed as a slide toggle. */

import CheckboxElement from "./checkbox.mjs";

/**
 * A custom HTML element that represents a checkbox-like input that is displayed as a slide toggle.
 * @fires change
 */
declare class SlideToggleElement extends CheckboxElement {
  /** @override */
  static tagName: string;

  /** @override */
  static useShadowRoot: boolean;

  /** Activate the element when it is attached to the DOM. */
  connectedCallback(): void;

  /** Create the constituent components of this element. */
  protected _buildElements(): HTMLElement[];
}

declare namespace SlideToggleElement {
  interface Any extends SlideToggleElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SlideToggleElement> {}
}

export default SlideToggleElement;
