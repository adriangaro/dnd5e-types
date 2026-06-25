/**
 * A custom HTML element that displays proficiency status and allows cycling through values.
 * @fires change
 */

import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";

declare const _ProficiencyCycleBase: ReturnType<
  typeof AdoptedStyleSheetMixin<typeof foundry.applications.elements.AbstractFormInputElement<number>>
>;

declare class ProficiencyCycleElement extends _ProficiencyCycleBase {
  constructor();

  /** The HTML tag named used by this element. */
  static tagName: "proficiency-cycle";

  /** @inheritDoc */
  static CSS: string;

  protected _toggleDisabled(value: boolean): void;

  /** Type of proficiency represented by this control (e.g. "ability" or "skill"). */
  get type(): "ability" | "skill" | "tool";
  set type(value: "ability" | "skill" | "tool");

  /** Valid values for the current type. */
  get validValues(): number[];

  protected _setValue(value: number): void;

  protected _adoptStyleSheet(sheet: CSSStyleSheet): void;

  protected _buildElements(): HTMLElement[];

  protected _refresh(): void;

  protected _activateListeners(): void;

  disconnectedCallback(): void;

  /**
   * Redirect focus requests into the inner input.
   * @param options  Focus options forwarded to inner input.
   */
  focus(options?: FocusOptions): void;

  /**
   * Change the value by one step, looping around if the limits have been reached.
   * @param up  Should the value step up or down?
   */
  step(up?: boolean): void;
}

declare namespace ProficiencyCycleElement {
  interface Any extends ProficiencyCycleElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ProficiencyCycleElement> {}
}

export default ProficiencyCycleElement;
