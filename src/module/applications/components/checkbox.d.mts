/** A custom checkbox implementation with more styling options. */

import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";

declare class CheckboxElement extends AdoptedStyleSheetMixin(
  foundry.applications.elements.AbstractFormInputElement<string | boolean>
) {
  /** @override — typed `string` (not the literal) so subclasses like SlideToggleElement can set their own tagName. */
  static tagName: string;

  /** Should a shadow root be created for this element? */
  static useShadowRoot: boolean;

  /** Controller for removing listeners automatically. */
  _controller: AbortController;

  /** The default value as originally specified in the HTML that created this object. */
  get defaultValue(): string;

  /** The indeterminate state of the checkbox. */
  get indeterminate(): boolean;
  set indeterminate(indeterminate: boolean);

  /** The checked state of the checkbox. */
  get checked(): boolean;
  set checked(checked: boolean);

  /** @override */
  get value(): string | boolean;
  /**
   * Override AbstractFormInputElement#value setter because we want to emit input/change events when the checked state
   * changes, and not when the value changes.
   * @override
   */
  set value(value: string | boolean);

  /** @override */
  protected _getValue(): string | boolean;
}

declare namespace CheckboxElement {
  interface Any extends CheckboxElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CheckboxElement> {}
}

export default CheckboxElement;
