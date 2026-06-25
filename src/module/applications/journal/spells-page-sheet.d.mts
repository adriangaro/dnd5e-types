/** Journal entry page that displays a list of spells for a class, subclass, background, or something else. */

declare class JournalSpellListPageSheet<
  RenderContext extends JournalSpellListPageSheet.RenderContext = JournalSpellListPageSheet.RenderContext,
  Configuration extends JournalSpellListPageSheet.Configuration = JournalSpellListPageSheet.Configuration,
  RenderOptions extends JournalSpellListPageSheet.RenderOptions = JournalSpellListPageSheet.RenderOptions,
> extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet<RenderContext, Configuration, RenderOptions> {
  static EDIT_PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart>;

  static VIEW_PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart>;

  /**
   * Different ways in which spells can be grouped on the sheet.
   */
  static get GROUPING_MODES(): Record<string, string>;

  /**
   * Currently selected grouping mode.
   */
  grouping: string | null;

  /**
   * Load indices with necessary information for spells.
   * @param grouping  Grouping mode to respect.
   */
  prepareSpells(grouping: string): Promise<{ spell?: object; unlinked?: object; name: string; display: string }[]>;

  /**
   * Handle changing the grouping.
   * @param event  The triggering event.
   */
  protected _onChangeGroup(event: Event): void;

  protected _canDragDrop(): boolean;

  protected _onDrop(event: DragEvent): Promise<false | undefined>;
}

declare namespace JournalSpellListPageSheet {
  interface Any extends JournalSpellListPageSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof JournalSpellListPageSheet> {}

  interface RenderContext extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet.RenderContext {}
  interface Configuration extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet.Configuration {}
  interface RenderOptions extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet.RenderOptions {}
}

export default JournalSpellListPageSheet;
