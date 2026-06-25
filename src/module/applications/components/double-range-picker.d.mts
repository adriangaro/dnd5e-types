/** Version of the default range picker that has number inputs on both sides. */

/**
 * Version of the default range picker that has number inputs on both sides.
 */
declare class DoubleRangePickerElement extends foundry.applications.elements.HTMLRangePickerElement {
  constructor();

  /** @override */
  static tagName: "double-range-picker";
}

declare namespace DoubleRangePickerElement {
  interface Any extends DoubleRangePickerElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof DoubleRangePickerElement> {}
}

export default DoubleRangePickerElement;
