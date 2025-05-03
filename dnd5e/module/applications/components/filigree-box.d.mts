import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";

/**
 * Custom element that adds a filigree border that can be colored.
 */
export default class FiligreeBoxElement extends AdoptedStyleSheetMixin(HTMLElement) {
  constructor();

  /** @inheritDoc */
  static CSS: string;

  /**
   * Path definitions for the various box corners and edges.
   * @type {object}
   */
  static svgPaths: Readonly<{
    corner: string;
    block: string;
    inline: string;
  }>;

  /**
   * Shadow root that contains the box shapes.
   */
  #shadowRoot: ShadowRoot;

  /* -------------------------------------------- */

  /** @inheritDoc */
  _adoptStyleSheet(sheet: CSSStyleSheet): void;

  /* -------------------------------------------- */

  /**
   * Build an SVG element.
   * @param {string} path          SVG path to use.
   * @param {...string} positions  Additional position CSS classes to add.
   */
  #buildSVG(path: keyof typeof FiligreeBoxElement.svgPaths, ...positions: string[]): void;
}