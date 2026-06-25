/** Variant of the standard journal sheet to handle custom TOC numbering. */

declare class JournalSheet5e extends foundry.appv1.sheets.JournalSheet {
  /** @override */
  static _warnedAppV1: boolean;

  /** @override */
  static override get defaultOptions(): foundry.appv1.sheets.JournalSheet.Options;

  /** @override */
  protected override _getPageData(): JournalEntryPage.Implementation[];

  /** @override */
  protected override _render(force?: boolean, options?: foundry.appv1.sheets.JournalSheet.RenderOptions): Promise<void>;

  /** @override */
  override activateListeners(html: JQuery<HTMLElement>): void;
}

declare namespace JournalSheet5e {
  interface Any extends JournalSheet5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof JournalSheet5e> {}
}

export default JournalSheet5e;
