/** Variant of the standard journal sheet with support for additional page types. */

declare class JournalEntrySheet5e<
  RenderContext extends foundry.applications.sheets.journal.JournalEntrySheet.RenderContext = JournalEntrySheet5e.RenderContext,
  Configuration extends
    foundry.applications.sheets.journal.JournalEntrySheet.Configuration = JournalEntrySheet5e.Configuration,
  RenderOptions extends
    foundry.applications.sheets.journal.JournalEntrySheet.RenderOptions = JournalEntrySheet5e.RenderOptions,
> extends foundry.applications.sheets.journal.JournalEntrySheet<RenderContext, Configuration, RenderOptions> {
  /**
   * Append the dnd5e system styling classes to journal pages inside system journal sheets.
   */
  static onRenderJournalPageSheet(page: foundry.applications.sheets.journal.JournalEntryPageSheet.Any, element: HTMLElement): void;

  /**
   * Render an application in the same workspace as this one.
   */
  _renderChild(app: foundry.applications.api.ApplicationV2.Any, options?: RenderOptions): Promise<foundry.applications.api.ApplicationV2.Any>;

  /**
   * Adjust ToC numbering for custom page types.
   * @internal
   */
  static _adjustTOCNumbering(entry: JournalEntry.Implementation, pages: Record<string, object>): void;

  /**
   * Add navigation controls for journal entries that define them.
   * @internal
   */
  static _injectNavigation(entry: JournalEntry.Implementation, html: HTMLElement): Promise<void>;

  /** @inheritDoc */
  protected override _attachFrameListeners(): void;

  protected override _onFirstRender(context: fvttUtils.DeepPartial<RenderContext>, options: fvttUtils.DeepPartial<RenderOptions>): Promise<void>;

  protected override _onRender(context: fvttUtils.DeepPartial<RenderContext>, options: fvttUtils.DeepPartial<RenderOptions>): Promise<void>;
}

declare namespace JournalEntrySheet5e {
  interface Any extends JournalEntrySheet5e<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof JournalEntrySheet5e<any, any, any>> {}

  interface RenderContext extends foundry.applications.sheets.journal.JournalEntrySheet.RenderContext {}
  interface Configuration extends foundry.applications.sheets.journal.JournalEntrySheet.Configuration {}
  interface RenderOptions extends foundry.applications.sheets.journal.JournalEntrySheet.RenderOptions {}
}

export default JournalEntrySheet5e;
