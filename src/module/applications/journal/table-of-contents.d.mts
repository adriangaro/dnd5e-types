/** Compendium that renders pages as a table of contents. */

declare class TableOfContentsCompendium<
  RenderContext extends foundry.applications.sidebar.apps.Compendium.RenderContext = TableOfContentsCompendium.RenderContext,
  Configuration extends
    foundry.applications.sidebar.apps.Compendium.Configuration = TableOfContentsCompendium.Configuration,
  RenderOptions extends
    foundry.applications.sidebar.apps.Compendium.RenderOptions = TableOfContentsCompendium.RenderOptions,
> extends foundry.applications.sidebar.apps.Compendium<
  JournalEntry.ImplementationClass,
  RenderContext,
  Configuration,
  RenderOptions
> {
  /**
   * Position of pages based on type.
   */
  static TYPES: {
    chapter: 0;
    appendix: 100;
  };

  /**
   * Options allowed for entry types.
   */
  static TYPE_OPTIONS: foundry.applications.fields.FormSelectOption[];

  /**
   * Handle clicking a link to a journal entry or page.
   * @param event   The triggering click event.
   * @param target  The action target.
   */
  protected _onClickLink(event: PointerEvent, target: HTMLElement): Promise<void>;

  /** @inheritDoc */
  protected _onDragStart(event: DragEvent): void;

  /**
   * Prepare information on all entries in the provided compendium for configuring table of contents.
   */
  static _getEntryBreakdown(
    compendium: CompendiumCollection.Any
  ): Promise<{ chapterOptions: foundry.applications.fields.FormSelectOption[]; counts: Record<string, number> }>;
}

declare namespace TableOfContentsCompendium {
  interface Any extends TableOfContentsCompendium<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof TableOfContentsCompendium<any, any, any>> {}

  interface RenderContext extends foundry.applications.sidebar.apps.Compendium.RenderContext {
    chapters: {
      type: "chapter" | "appendix" | "special";
      flags: object;
      id: string;
      name: string;
      pages: Array<{ id: string; sort: number; flags: object; name: string; entryId?: string; entry?: true }>;
      order?: number;
      showPages: boolean;
    }[];
    header?: { title: string | undefined; content: string | undefined };
  }
  interface Configuration extends foundry.applications.sidebar.apps.Compendium.Configuration {}
  interface RenderOptions extends foundry.applications.sidebar.apps.Compendium.RenderOptions {}
}

export default TableOfContentsCompendium;
