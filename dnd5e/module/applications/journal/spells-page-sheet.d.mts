/**
 * Journal entry page the displays a list of spells for a class, subclass, background, or something else.
 */
export default class JournalSpellListPageSheet extends foundry.appv1.sheets.JournalPageSheet {
  /** @override */
  static _warnedAppV1: boolean;

  /* -------------------------------------------- */

  /**
   * Different ways in which spells can be grouped on the sheet.
   */
  static get GROUPING_MODES(): Record<string, string>

  /* -------------------------------------------- */

  /**
   * Currently selected grouping mode.
   */
  grouping: string | null

  /* -------------------------------------------- */

  /**
   * Load indices with necessary information for spells.
   * @param grouping  Grouping mode to respect.
   */
  prepareSpells(grouping: string): Promise<object[]>

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle performing an action.
   * @param event  This triggering click event.
   */
  _onAction(event: PointerEvent): Promise<void>
}
