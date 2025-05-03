// convert to foundry.applications.sidebar?.apps?.Compendium

export default class TableOfContentsCompendium extends Compendium<any> {
}

/**
 * Compendium that renders pages as a table of contents.
 */
declare class TableOfContentsCompendiumV13 {
  /* -------------------------------------------- */

  /**
   * Position of pages based on type.
   */
  static TYPES: Record<string, number> 


  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle clicking a link to a journal entry or page.
   * @param event  The triggering click event.
   * @param target  The action target.
   * @protected
   */
  _onClickLink(event: PointerEvent, target: HTMLElement): Promise<void>
}

/**
 * Compendium that renders pages as a table of contents.
 * TODO: Remove when v12 support is dropped.
 */
declare class TableOfContentsCompendiumV12 extends Compendium<any> {
  /**
   * Position of pages based on type.
   */
  static TYPES: Record<string, number> 
  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Handle clicking a link to a journal entry or page.
   * @param event  The triggering click event.
   * @protected
   */
  _onClickLink(event: PointerEvent): Promise<void>
}
