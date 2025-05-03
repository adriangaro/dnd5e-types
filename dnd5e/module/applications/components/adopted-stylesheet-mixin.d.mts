/**
 * Helper type for class constructors.
 */

declare class _AdoptedStyleSheetMixin {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);

  /**
   * A map of cached stylesheets per Document root.
   */
  static _stylesheets: WeakMap<foundry.abstract.Document.Any, CSSStyleSheet>;

  /**
   * The CSS content for this element.
   */
  static CSS: string;

  /* -------------------------------------------- */

  /** @inheritDoc */
  adoptedCallback(): void;

  /* -------------------------------------------- */

  /**
   * Retrieves the cached stylesheet, or generates a new one.
   */
  _getStyleSheet(): CSSStyleSheet;

  /* -------------------------------------------- */

  /**
   * Adopt the stylesheet into the Shadow DOM.
   * @param sheet  The sheet to adopt.
   * @abstract
   */
  _adoptStyleSheet(sheet: CSSStyleSheet): void;
}

declare namespace _AdoptedStyleSheetMixin {}

declare namespace AdoptedStyleSheetMixin {
  export import Mixin = _AdoptedStyleSheetMixin;
}

/**
 * Adds functionality to a custom HTML element for caching its stylesheet and adopting it into its Shadow DOM, rather
 * than having each stylesheet duplicated per element.
 * @param Base  The base class being mixed.
 * @mixin
 */
declare function AdoptedStyleSheetMixin<T extends fvttUtils.AnyConstructor>(Base: T): T & typeof _AdoptedStyleSheetMixin;

export default AdoptedStyleSheetMixin;
