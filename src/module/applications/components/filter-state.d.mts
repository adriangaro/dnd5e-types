/**
 * Input element that represents a three-state filter (include, exclude, or ignore). This is used for filters in
 * the compendium browser and in the inventory element. Returns a number with `1` indicating this filter should be
 * positively applied (show items that match the filter), `-1` indicating it should be negatively applied (hide
 * items that match the filter), and `0` indicating this filter should be ignored.
 */
declare class FilterStateElement extends foundry.applications.elements.AbstractFormInputElement<number> {
  constructor();

  /** @override */
  static tagName: string;

  /** Controller for removing listeners automatically. */
  _controller: AbortController;

  /** Get any labels describing this element. */
  get labels(): HTMLElement[];

  /** @override */
  protected _getValue(): number;

  /** @override */
  connectedCallback(): void;

  /** @override */
  disconnectedCallback(): void;

  /** @override */
  protected _buildElements(): HTMLElement[];

  /** @override */
  protected _refresh(): void;

  /** @override */
  protected _activateListeners(): void;

  /** @override */
  protected _onClick(event: PointerEvent): void;
}

declare namespace FilterStateElement {
  interface Any extends FilterStateElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof FilterStateElement> {}
}

export default FilterStateElement;
