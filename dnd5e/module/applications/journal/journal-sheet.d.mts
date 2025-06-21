/**
 * Variant of the standard journal sheet to handle custom TOC numbering.
 */
export default class JournalSheet5e extends foundry.appv1.sheets.JournalSheet {
  /** @override */
  static _warnedAppV1: boolean;

  /* --------------------------------------------- */
  /**
   * Add class to journal pages also.
   * @param page  The journal page application.
   * @param jQuery          The rendered Application HTML.
   * @param context         Rendering context provided.
   */
  static onRenderJournalPageSheet(page: JournalPageSheet, jQuery: JQuery, context: object): void;

  /* -------------------------------------------- */

  /**
   * Add class to journal ProseMirror editor.
   * @param page  The journal page application.
   * @param element                    The rendered Application HTML.
   * @param context                         Rendering context provided.
   * @param options                         Rendering options provided.
   */
  static onRenderJournalEntryPageProseMirrorSheet(page: JournalPageSheet, element: HTMLElement, context: object, options: object): void;
}
