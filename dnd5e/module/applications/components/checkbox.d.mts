import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";

/**
 * A custom checkbox implementation with more styling options.
 * @mixes AdoptedStyleSheetMixin
 * @extends {AbstractFormInputElement}
 */
export default class CheckboxElement extends AdoptedStyleSheetMixin(
  foundry.applications.elements.AbstractFormInputElement
)<boolean> {
  /* -------------------------------------------- */

  /** @override */
  static tagName: string;

  /* -------------------------------------------- */

  /**
   * Should a show root be created for this element?
   */
  static useShadowRoot: boolean

  /* -------------------------------------------- */

  /**
   * Controller for removing listeners automatically.
   */
  _controller: AbortController;

  /* -------------------------------------------- */

  /**
   * The shadow root that contains the checkbox elements.
   */
  #shadowRoot: ShadowRoot;

  /* -------------------------------------------- */
  /*  Element Properties                          */
  /* -------------------------------------------- */

  /**
   * The default value as originally specified in the HTML that created this object.
   */
  get defaultValue(): string

  #defaultValue: string

  /* -------------------------------------------- */

  /**
   * The indeterminate state of the checkbox.
   * @type {boolean}
   */
  get indeterminate(): boolean
  set indeterminate(indeterminate: boolean)

  /* -------------------------------------------- */

  /**
   * The checked state of the checkbox.
   */
  get checked(): boolean
  set checked(checked: boolean)

  /* -------------------------------------------- */

  /** @override */
  get value(): boolean

  /**
   * Override AbstractFormInputElement#value setter because we want to emit input/change events when the checked state
   * changes, and not when the value changes.
   * @override
   */
  set value(value: boolean)
}
