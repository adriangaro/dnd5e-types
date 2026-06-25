/** Custom element that adds a filigree border that can be colored. */

import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";

declare const MaybeAdoptable: typeof HTMLElement;

declare class FiligreeBoxElement extends AdoptedStyleSheetMixin(MaybeAdoptable) {
  constructor();

  /** The HTML tag name used by this element. */
  static tagName: "filigree-box";

  /** @inheritDoc */
  static CSS: string;

  /** Path definitions for the various box corners and edges. */
  static svgPaths: Readonly<{
    corner: string;
    block: string;
    inline: string;
  }>;

  /** Shadow root that contains the box shapes. */
  #shadowRoot: ShadowRoot;

  /** @inheritDoc */
  _adoptStyleSheet(sheet: CSSStyleSheet): void;

  /**
   * Build an SVG element.
   * @param path       SVG path to use.
   * @param positions  Additional position CSS classes to add.
   */
  #buildSVG(path: keyof typeof FiligreeBoxElement.svgPaths, ...positions: string[]): void;
}

export default FiligreeBoxElement;
