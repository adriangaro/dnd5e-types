/** Journal entry page that displays a controls for editing map markers. */

declare class JournalMapLocationPageSheet<
  RenderContext extends JournalMapLocationPageSheet.RenderContext = JournalMapLocationPageSheet.RenderContext,
  Configuration extends JournalMapLocationPageSheet.Configuration = JournalMapLocationPageSheet.Configuration,
  RenderOptions extends JournalMapLocationPageSheet.RenderOptions = JournalMapLocationPageSheet.RenderOptions,
> extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet<RenderContext, Configuration, RenderOptions> {
  protected override _onRender(
    context: fvttUtils.DeepPartial<RenderContext>,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<void>;
}

declare namespace JournalMapLocationPageSheet {
  interface Any extends JournalMapLocationPageSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof JournalMapLocationPageSheet> {}

  interface RenderContext extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet.RenderContext {}
  interface Configuration extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet.Configuration {}
  interface RenderOptions extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet.RenderOptions {}
}

export default JournalMapLocationPageSheet;
