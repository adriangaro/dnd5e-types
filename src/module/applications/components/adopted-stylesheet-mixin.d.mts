/** Adds functionality to a custom HTML element for caching its stylesheet and adopting it into its Shadow DOM, rather than having each stylesheet duplicated per element. */

declare class AdoptedStyleSheetElement {
  /** @privateRemarks All mixin classes accept anything for their constructor. */
  constructor(...args: any[]);

  /** A map of cached stylesheets per Document root. */
  protected static _stylesheets: WeakMap<Document, CSSStyleSheet>;

  /** The CSS content for this element. */
  static CSS: string;

  adoptedCallback(): void;

  /** Retrieves the cached stylesheet, or generates a new one. */
  protected _getStyleSheet(): CSSStyleSheet | undefined;

  /**
   * Adopt the stylesheet into the Shadow DOM.
   * @param sheet - The sheet to adopt.
   * @abstract
   */
  protected _adoptStyleSheet(sheet: CSSStyleSheet): void;
}

/**
 * Adds functionality to a custom HTML element for caching its stylesheet and adopting it into its Shadow DOM, rather
 * than having each stylesheet duplicated per element.
 */
declare function AdoptedStyleSheetMixin<TBase extends abstract new (...args: any[]) => HTMLElement>(
  Base: TBase,
): typeof AdoptedStyleSheetElement & TBase;

declare namespace AdoptedStyleSheetMixin {
  type MixinClass = AdoptedStyleSheetElement;
}

export default AdoptedStyleSheetMixin;
