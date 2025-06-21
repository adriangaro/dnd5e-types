/**
 * Compendium that renders pages as a table of contents.
 */
declare class TableOfContentsCompendium extends foundry.applications.sidebar.apps.Compendium {
  /* -------------------------------------------- */
  /*  Static Properties                           */
  /* -------------------------------------------- */

  /**
   * Position of pages based on type.
   */
  static readonly TYPES: {
    readonly chapter: 0;
    readonly appendix: 100;
  };

  /* -------------------------------------------- */
  /*  Event Handlers                             */
  /* -------------------------------------------- */

  /**
   * Handle clicking a link to a journal entry or page.
   * @param event   The triggering click event.
   * @param target  The action target.
   * @protected
   */
  protected _onClickLink(event: PointerEvent, target: HTMLElement): Promise<void>;
}

export default TableOfContentsCompendium;
