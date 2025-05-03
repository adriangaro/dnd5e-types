import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";

/**
 * A custom HTML element that displays proficiency status and allows cycling through values.
 * @fires change
 */
export default class ProficiencyCycleElement extends AdoptedStyleSheetMixin(
  foundry.applications.elements.AbstractFormInputElement
)<number> {
  /** @inheritDoc */
  constructor();

  /** @inheritDoc */
  static CSS: string;

  /**
   * Controller for removing listeners automatically.
   * @type {AbortController}
   */
  #controller: AbortController;

  /**
   * Shadow root of the element.
   * @type {ShadowRoot}
   */
  #shadowRoot: ShadowRoot;

  /* -------------------------------------------- */

  /** @override */
  _toggleDisabled(value: boolean): void;

  /* -------------------------------------------- */

  /**
   * Type of proficiency represented by this control (e.g. "ability" or "skill").
   */
  get type(): "ability" | "skill" | "tool";
  set type(value: "ability" | "skill" | "tool");

  /* -------------------------------------------- */

  /**
   * Valid values for the current type.
   */
  get validValues(): number[];

  /* -------------------------------------------- */

  /** @inheritDoc */
  _setValue(value: number): boolean;

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _adoptStyleSheet(sheet: CSSStyleSheet): void;

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
  disconnectedCallback(): void;

  /* -------------------------------------------- */

  /**
   * Redirect focus requests into the inner input.
   * @param options  Focus options forwarded to inner input.
   */
  focus(options?: FocusOptions): void;

  /* -------------------------------------------- */

  /**
   * Change the value by one step, looping around if the limits have been reached.
   * @param up  Should the value step up or down?
   */
  step(up?: boolean): void;

  /* -------------------------------------------- */

  /**
   * Handle changes to the input value directly.
   * @param event  Triggering change event.
   */
  #onChangeInput(event: Event): void;

  /* -------------------------------------------- */

  /**
   * Handle a click event for modifying the value.
   * @param event  Triggering click event.
   */
  #onClick(event: PointerEvent): void;
}
