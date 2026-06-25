/** Custom element for displaying SVG icons that are cached and can be styled. */

import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";

declare class IconElement extends AdoptedStyleSheetMixin(HTMLElement) {
  constructor();

  /** The HTML tag named used by this element. */
  static tagName: string;

  /** @inheritDoc */
  static CSS: string;

  /** @override */
  static observedAttributes: string[];

  /** Path to the SVG source file. */
  get src(): string | null;
  set src(src: string);

  /** @inheritDoc */
  _adoptStyleSheet(sheet: CSSStyleSheet): void;

  /** @inheritDoc */
  connectedCallback(): void;

  /**
   * Fetch an SVG element from a source.
   * @param src  Path of the SVG file to retrieve.
   * @returns    Promise if the element is not cached, otherwise the element directly.
   */
  static fetch(src: string): SVGElement | null | Promise<SVGElement | null>;

  /** @inheritDoc */
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}

export default IconElement;
