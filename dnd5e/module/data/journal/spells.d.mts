import IdentifierField from "../fields/identifier-field.mjs";
import SourceField from "../shared/source-field.mjs";

/**
 * Data needed to display spells that aren't able to be linked (outside SRD & current module).
 */

/**
 * Data model for spell list data.
 */
declare class SpellListJournalPageData extends foundry.abstract.TypeDataModel<{
  type: foundry.data.fields.StringField<{
    initial: "class", label: "JOURNALENTRYPAGE.DND5E.SpellList.Type.Label"
  }>,
  identifier: IdentifierField<{ label: "DND5E.Identifier" }>,
  grouping: dnd5e.types.fields.RestrictedStringField<
    SpellListJournalPageData.GroupingMode,
    {
      initial: "level",
      label: "JOURNALENTRYPAGE.DND5E.SpellList.Grouping.Label",
      hint: "JOURNALENTRYPAGE.DND5E.SpellList.Grouping.Hint"
    }
  >,
  description: foundry.data.fields.SchemaField<{
    value: foundry.data.fields.HTMLField<{ textSearch: true, label: "DND5E.Description" }>
  }>,
  spells: foundry.data.fields.SetField<
    foundry.data.fields.StringField,
    { label: "DND5E.ItemTypeSpellPl" }
  >,
  unlinkedSpells: foundry.data.fields.ArrayField<foundry.data.fields.SchemaField<{
    _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>,
    name: foundry.data.fields.StringField<{ required: true, label: "Name" }>,
    system: foundry.data.fields.SchemaField<{
      level: foundry.data.fields.NumberField<{ min: 0, integer: true, label: "DND5E.Level" }>,
      school: foundry.data.fields.StringField<{ label: "DND5E.School" }>
    }>,
    source: SourceField<
      { license: never, revision: never, rules: never, uuid: foundry.data.fields.StringField }
    >
  }>, { label: "JOURNALENTRYPAGE.DND5E.SpellList.UnlinkedSpells.Label" }>
}, foundry.abstract.Document.Any> {

  /* -------------------------------------------- */

  /**
   * Different ways in which spells can be grouped on the sheet.
   */
  static GROUPING_MODES: Record<SpellListJournalPageData.GroupingMode, string>
}


declare namespace SpellListJournalPageData {
  type GroupingMode = 'none' | 'alphabetical' | 'level' | 'school'
}
export default SpellListJournalPageData