/** Journal entry page that displays a controls for editing rule page tooltip & type. */

declare class JournalRulePageSheet<
  RenderContext extends JournalRulePageSheet.RenderContext = JournalRulePageSheet.RenderContext,
  Configuration extends JournalRulePageSheet.Configuration = JournalRulePageSheet.Configuration,
  RenderOptions extends JournalRulePageSheet.RenderOptions = JournalRulePageSheet.RenderOptions,
> extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet<RenderContext, Configuration, RenderOptions> {
  static EDIT_PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart> & {
    tooltip: { template: string };
  };

  protected override _prepareContext(options: fvttUtils.DeepPartial<RenderOptions> & { isFirstRender: boolean }): Promise<RenderContext>;
}

declare namespace JournalRulePageSheet {
  interface Any extends JournalRulePageSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof JournalRulePageSheet> {}

  interface RenderContext extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet.RenderContext {
    CONFIG: dnd5e.types.DND5EConfig;
  }
  interface Configuration extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet.Configuration {}
  interface RenderOptions extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet.RenderOptions {}
}

export default JournalRulePageSheet;
