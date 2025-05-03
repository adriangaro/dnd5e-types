/**
 * Input element that represents a three-state filter (include, exclude, or ignore). This is used for filters in
 * the compendium browser and in the inventory element. Returns a number with `1` indicating this filter should be
 * positively applied (show items that match the filter), `-1` indicating it should be negatively applied (hide
 * items that match the filter), and `0` indicating this filter should be ignored.
 */
export default class FilterStateElement extends foundry.applications.elements.AbstractFormInputElement<number> {
  constructor(...args: any[]);

  /** @override */
  static tagName: string;

  /**
   * Controller for removing listeners automatically.
   */
  _controller: AbortController;

  /**
   * Internal indicator used to render the input.
   */
  #indicator: HTMLElement;

  /* -------------------------------------------- */
  /*  Element Properties                          */
  /* -------------------------------------------- */

  /** @override */
  _getValue(): number;

  /* -------------------------------------------- */
  /*  Element Lifecycle                           */
  /* -------------------------------------------- */

  /** @override */
  connectedCallback(): void;

  /* -------------------------------------------- */

  /** @override */
  disconnectedCallback(): void;

  /* -------------------------------------------- */

  /** @override */
  _buildElements(): HTMLElement[];

  /* -------------------------------------------- */

  /** @override */
  _refresh(): void;

  /* -------------------------------------------- */

  /** @override */
  _activateListeners(): void;

  /* -------------------------------------------- */

  /** @override */
  _onClick(event: MouseEvent): void;

  /* -------------------------------------------- */

  /**
   * Handle changing the value based on a click or keyboard trigger.
   * @param {boolean} [backwards=false]  Should the value be decreased rather than increased?
   */
  #handleValueChange(backwards?: boolean): void;
}