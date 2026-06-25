/** Journal entry page that displays an automatically generated summary of a class along with additional description. */

declare class JournalClassPageSheet extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet {
  /**
   * Whether this page represents a class or subclass.
   */
  get type(): string;

  /**
   * Prepare features granted by various advancement types.
   */
  _getAdvancement(item: Item.Implementation, options: { modernStyle: boolean }): object;

  /**
   * Enrich all of the entries within the descriptions object on the sheet's system data.
   */
  _getDescriptions(page: JournalEntryPage.Implementation): Promise<object>;

  /**
   * Prepare table based on non-optional GrantItem advancement & ScaleValue advancement.
   */
  _getTable(item: Item.Implementation, options?: { initialLevel?: number; modernStyle?: boolean }): Promise<object>;

  /**
   * Build out the spell progression data.
   */
  _getSpellProgression(item: Item.Implementation): Promise<object | null>;

  /**
   * Prepare options table based on optional GrantItem advancement.
   */
  _getOptionalTable(item: Item.Implementation, options: { modernStyle: boolean }): Promise<object | null>;

  /**
   * Fetch data for each class feature listed.
   */
  _getFeatures(item: Item.Implementation, options: { modernStyle: boolean; optional?: boolean }): Promise<object[]>;

  /**
   * Fetch each subclass and their features.
   */
  _getSubclasses(uuids: string[]): Promise<{
    document: Item.Implementation;
    name: string;
    description: string;
  }[] | null>;

  /**
   * Prepare data for the provided subclass.
   */
  _getSubclass(item: Item.Implementation): Promise<{
    document: Item.Implementation;
    name: string;
    description: string;
  }>;
}

declare namespace JournalClassPageSheet {
  interface Any extends JournalClassPageSheet {}
  interface AnyConstructor extends fvttUtils.Identity<typeof JournalClassPageSheet> {}
}

export default JournalClassPageSheet;
