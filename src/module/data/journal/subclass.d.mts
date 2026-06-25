/**
 * Data definition for Subclass Summary journal entry pages.
 *
 * JournalEntryPage subtype ("subclass"). Extends `foundry.abstract.TypeDataModel` DIRECTLY
 * (parent document = `JournalEntryPage.Implementation`), not a dnd5e ChatMessage/ActiveEffect base.
 *
 * No custom/unported fields and no public getters/methods on the runtime model — every schema field
 * maps directly to a `foundry.data.fields` type.
 */

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `subclass` JournalEntryPage subtype on the interface the funnel reads. */
    interface JournalEntryPage {
      subclass: typeof import("./subclass.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.JournalEntryPage.subclass {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class SubclassJournalPageData extends foundry.abstract.TypeDataModel<
  SubclassJournalPageData.Schema,
  JournalEntryPage.Implementation,
  SubclassJournalPageData.Base,
  SubclassJournalPageData.Derived
> {
  static override defineSchema(): SubclassJournalPageData.Schema;
}

declare namespace SubclassJournalPageData {
  /** Pre-Seam-D source schema (subclass.mjs `defineSchema`). */
  type BaseSchema = {
    /** UUID of the subclass item included. */
    item: foundry.data.fields.StringField<{ required: true }>;
    description: foundry.data.fields.SchemaField<{
      /** Introductory description for the subclass. */
      value: foundry.data.fields.HTMLField;
    }>;
    /**
     * Force the page style to use modern or legacy formatting, rather than what
     * is specified by the subclass.
     */
    style: foundry.data.fields.StringField;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.JournalEntryPage.subclass.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.subclass.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.subclass.OverrideDerived
  >;
}

export default SubclassJournalPageData;
