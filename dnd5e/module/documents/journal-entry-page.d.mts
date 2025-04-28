/**
 * Custom implementation of journal entry pages for providing roll data.
 */
declare class JournalEntryPage5e<
  SubType extends JournalEntryPage.SubType = JournalEntryPage.SubType
> extends JournalEntryPage<
  SubType
> {
  /**
   * Return a data object regarding this page and from the containing journal entry.
   */
  getRollData(): JournalEntryPage5e.RollData<this>
}

declare namespace JournalEntryPage5e { 
  interface RollData<This> {
    name: string,
    flags: object,
    page: This & {
      name: string,
      flags: dnd5e.types.GetKey<This, 'flags'>
    }
  }

}

export default JournalEntryPage5e

declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    JournalEntryPage: typeof JournalEntryPage5e<JournalEntryPage.SubType>
  }

  interface ConfiguredJournalEntryPage<SubType extends JournalEntryPage.SubType> {
    document: JournalEntryPage5e<SubType>;
  }
}

