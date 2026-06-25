/**
 * Data definition for Class Summary journal entry pages.
 *
 * Class Summary journal entry page (subtype "class" of JournalEntryPage). Extends
 * `foundry.abstract.TypeDataModel` DIRECTLY (parent document = JournalEntryPage.Implementation),
 * NOT a dnd5e ChatMessage/ActiveEffect/System base.
 *
 * All schema fields are standard `foundry.data.fields` (StringField, HTMLField, SchemaField,
 * SetField) — no custom/unported dnd5e fields, so nothing is left loose here.
 */

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `class` JournalEntryPage subtype on the interface the funnel reads. */
    interface JournalEntryPage {
      class: typeof import("./class.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.JournalEntryPage.class {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class ClassJournalPageData extends foundry.abstract.TypeDataModel<
  ClassJournalPageData.Schema,
  JournalEntryPage.Implementation,
  ClassJournalPageData.Base,
  ClassJournalPageData.Derived
> {
  static override defineSchema(): ClassJournalPageData.Schema;
}

declare namespace ClassJournalPageData {
  /** Pre-Seam-D source schema (class.mjs `defineSchema`). */
  type BaseSchema = {
    item: foundry.data.fields.StringField;
    description: foundry.data.fields.SchemaField<{
      value: foundry.data.fields.HTMLField;
      additionalHitPoints: foundry.data.fields.HTMLField;
      additionalTraits: foundry.data.fields.HTMLField;
      additionalEquipment: foundry.data.fields.HTMLField;
      subclass: foundry.data.fields.HTMLField;
    }>;
    style: foundry.data.fields.StringField;
    subclassHeader: foundry.data.fields.StringField;
    subclassItems: foundry.data.fields.SetField<foundry.data.fields.StringField>;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.JournalEntryPage.class.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.class.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.class.OverrideDerived
  >;
}

export default ClassJournalPageData;
