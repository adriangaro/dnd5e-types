/**
 * Data model for spell list data.
 *
 * Journal-page subtype ("spells" of JournalEntryPage). Extends `foundry.abstract.TypeDataModel`
 * DIRECTLY (parent = JournalEntryPage.Implementation) — there is no custom dnd5e base for journal
 * pages.
 *
 * Loose method types (`toEmbed` config/options/return) for unported enrichment deps.
 */

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `spells` journal-page subtype on the interface the funnel reads. */
    interface JournalEntryPage {
      spells: typeof import("./spells.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.JournalEntryPage.spells {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class SpellListJournalPageData extends foundry.abstract.TypeDataModel<
  SpellListJournalPageData.Schema,
  JournalEntryPage.Implementation,
  SpellListJournalPageData.Base,
  SpellListJournalPageData.Derived
> {
  static override defineSchema(): SpellListJournalPageData.Schema;

  /** Different ways in which spells can be grouped on the sheet. */
  static GROUPING_MODES: Record<"none" | "alphabetical" | "level" | "school", string>;
}

declare namespace SpellListJournalPageData {
  /** Pre-Seam-D source schema (spells.mjs `defineSchema`). */
  type BaseSchema = {
    type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.SpellListType.TypeKey, { initial: "class" }>;
    identifier: dnd5e.types.fields.IdentifierField;
    grouping: foundry.data.fields.StringField<
      { initial: "level"; choices: Record<"none" | "alphabetical" | "level" | "school", string> },
      "none" | "alphabetical" | "level" | "school"
    >;
    description: foundry.data.fields.SchemaField<{
      value: foundry.data.fields.HTMLField;
    }>;
    spells: foundry.data.fields.SetField<foundry.data.fields.StringField>;
    unlinkedSpells: foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        _id: foundry.data.fields.DocumentIdField;
        identifier: dnd5e.types.fields.IdentifierField;
        name: foundry.data.fields.StringField;
        system: foundry.data.fields.SchemaField<{
          level: foundry.data.fields.NumberField;
          school: dnd5e.types.fields.RestrictedStringField<dnd5e.types.SpellSchool.TypeKey, {}>;
        }>;
        source: dnd5e.types.fields.SourceField;
      }>
    >;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.JournalEntryPage.spells.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.spells.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.JournalEntryPage.spells.OverrideDerived
  >;
}

export default SpellListJournalPageData;
