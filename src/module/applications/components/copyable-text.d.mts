/** Bit of text with a button after it for copying it. */

declare const MaybeAdoptable: typeof HTMLElement;

declare class CopyableTextElement extends MaybeAdoptable {
  /**
   * The HTML tag named used by this element.
   */
  static tagName: string;

  /** @override */
  connectedCallback(): void;

  /** @override */
  disconnectedCallback(): void;

  /**
   * Handle copying the contents.
   * @param event  Triggering click event.
   */
  _onClick(event: PointerEvent): void;
}

export default CopyableTextElement;
