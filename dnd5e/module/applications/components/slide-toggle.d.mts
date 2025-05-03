import CheckboxElement from "./checkbox.mjs";

/**
 * A custom HTML element that represents a checkbox-like input that is displayed as a slide toggle.
 * @fires change
 */
export default class SlideToggleElement extends CheckboxElement {
  /** @inheritDoc */
  constructor();

  /* -------------------------------------------- */

  /** @override */
  static tagName: string;

  /* -------------------------------------------- */

  /** @override */
  static useShadowRoot: boolean;

  /* -------------------------------------------- */
  /*  Element Lifecycle                           */
  /* -------------------------------------------- */

  /**
   * Activate the element when it is attached to the DOM.
   * @inheritDoc
   */
  connectedCallback(): void;

  /* -------------------------------------------- */

  /**
   * Create the constituent components of this element.
   * @returns {HTMLElement[]}
   * @protected
   */
  _buildElements(): HTMLElement[];
}
