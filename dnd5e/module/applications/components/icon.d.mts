import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";

/**
 * Custom element for displaying SVG icons that are cached and can be styled.
 */
export default class IconElement extends AdoptedStyleSheetMixin(HTMLElement) {
  constructor();

  /** @inheritDoc */
  static CSS: string;

  /**
   * Cached SVG files by SRC.
   */
  static #svgCache: Map<string, SVGElement | Promise<SVGElement>>;

  /**
   * The custom element's form and accessibility internals.
   */
  #internals: ElementInternals;

  /**
   * Shadow root that contains the icon.
   */
  #shadowRoot: ShadowRoot;

  /* -------------------------------------------- */

  /**
   * Path to the SVG source file.
   */
  get src(): string | null;

  set src(src: string | null);

  /* -------------------------------------------- */

  /** @inheritDoc */
  _adoptStyleSheet(sheet: CSSStyleSheet): void;

  /* -------------------------------------------- */

  /** @inheritDoc */
  connectedCallback(): void;

  /* -------------------------------------------- */

  /**
   * Fetch an SVG element from a source.
   * @param {string} src                        Path of the SVG file to retrieve.
   * @returns {SVGElement|Promise<SVGElement>}  Promise if the element is not cached, otherwise the element directly.
   */
  static fetch(src: string): SVGElement | Promise<SVGElement>;
}