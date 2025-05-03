import type Application5e from "../api/application.d.mts";
import DocumentSheet5e from "../api/document-sheet.mjs";

/**
 * Application for configuring a single unlinked spell in a spell list.
 */
export default class SpellsUnlinkedConfig extends DocumentSheet5e<
  Item.OfType<'spell'>,
  {
    fields: foundry.data.fields.DataSchema
    spellLevelOptions: dnd5e.types.FormSelectOption[]
    spellSchoolOptions: dnd5e.types.FormSelectOption[]
  },
  {
    unlinkedId: string
  },
  {}
> {}
