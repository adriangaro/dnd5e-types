/**
 * Custom implementation of journal entry pages for providing roll data.
 *
 * Extends the base global `JournalEntryPage` directly (no mixin), but threads a `SubType`
 * generic so `system` narrows for the system-specific page subtypes. It is registered into
 * fvtt-types' `DocumentClassConfig` by the document funnel, so `JournalEntryPage.Implementation`
 * everywhere resolves to this class.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface JournalEntryPage5e` — downstream
 * packages add document-level methods/getters by augmenting that interface (the document analogue
 * of the data-model Seam-D override interfaces).
 */

declare class JournalEntryPage5e<
  SubType extends JournalEntryPage.SubType = JournalEntryPage.SubType,
> extends JournalEntryPage<SubType> {
  /** Return a data object regarding this page and from the containing journal entry. */
  getRollData(): JournalEntryPage5e.RollData<this>;
}

declare interface JournalEntryPage5e<
  SubType extends JournalEntryPage.SubType = JournalEntryPage.SubType,
> {}

declare namespace JournalEntryPage5e {
  /** Roll data exposed to dice commands, derived from the page and its parent journal entry. */
  interface RollData<This> {
    name: string;
    flags: object;
    page: fvttUtils.GetKey<This, "system"> & {
      name: string;
      flags: fvttUtils.GetKey<This, "flags">;
    };
  }
}

export default JournalEntryPage5e;
