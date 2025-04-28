/**
 * Configuration options for the Accordion class.
 */
export interface AccordionConfiguration {
  /**
   * The CSS selector that identifies accordion headers in the given markup.
   */
  headingSelector: string;

  /**
   * The CSS selector that identifies accordion content in the given markup. This
   * can match content within the heading element, or sibling to the heading
   * element, with priority given to the former.
   */
  contentSelector: string;

  /**
   * Automatically collapses the other headings in this group when one heading is
   * clicked.
   * @defaultValue false
   */
  collapseOthers?: boolean;
}

/**
 * A class responsible for augmenting markup with an accordion effect.
 */
export default class Accordion {
  /**
   * @param config Configuration options.
   */
  constructor(config: AccordionConfiguration);

  /**
   * Configuration options.
   * @type {AccordionConfiguration}
   * @private
   */
  #config: AccordionConfiguration;

  /**
   * A mapping of heading elements to content elements.
   * @type {Map<HTMLElement, HTMLElement>}
   * @private
   */
  #sections: Map<HTMLElement, HTMLElement>;

  /**
   * A mapping of heading elements to any ongoing transition effect functions.
   * @type {Map<HTMLElement, Function>}
   * @private
   */
  #ongoing: Map<HTMLElement, Function>;

  /**
   * Record the state of collapsed sections.
   * @type {boolean[]}
   * @private
   */
  #collapsed: boolean[];

  /* -------------------------------------------- */

  /**
   * Augment the given markup with an accordion effect.
   * @param root The root HTML node.
   */
  bind(root: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle clicking an accordion heading.
   * @param event The triggering event.
   * @protected
   */
  protected _onClickHeading(event: PointerEvent): void;

  /* -------------------------------------------- */

  /**
   * Handle expanding a section.
   * @param heading          The section heading.
   * @param content          The section content.
   * @param [options]
   * @param [options.animate=true] Whether to animate the expand effect.
   * @protected
   */
  protected _onExpandSection(
    heading: HTMLElement,
    content: HTMLElement,
    options?: { animate?: boolean }
  ): void;

  /* -------------------------------------------- */

  /**
   * Handle collapsing a section.
   * @param heading          The section heading.
   * @param content          The section content.
   * @param [options]
   * @param [options.animate=true] Whether to animate the collapse effect.
   * @protected
   */
  protected _onCollapseSection(
    heading: HTMLElement,
    content: HTMLElement,
    options?: { animate?: boolean }
  ): void;

  /* -------------------------------------------- */

  /**
   * A function to invoke when the height transition has ended.
   * @param heading The section heading.
   * @param content The section content.
   * @protected
   */
  protected _onEnd(heading: HTMLElement, content: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Cancel an ongoing effect.
   * @param heading The section heading.
   * @private
   */
  #cancelOngoing(heading: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Save the accordion state.
   * @protected
   */
  protected _saveCollapsedState(): void;

  /* -------------------------------------------- */

  /**
   * Restore the accordion state.
   * @protected
   */
  protected _restoreCollapsedState(): void;
}
