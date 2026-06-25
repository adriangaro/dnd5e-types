/** Application for configuring a single unlinked spell in a spell list. */

import DocumentSheet5e from "../api/document-sheet.mjs";

declare class SpellsUnlinkedConfig<
  Document extends foundry.abstract.Document.Any = Item.OfType<"spell">,
  RenderContext extends object = SpellsUnlinkedConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = SpellsUnlinkedConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = SpellsUnlinkedConfig.RenderOptions,
> extends DocumentSheet5e<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace SpellsUnlinkedConfig {
  interface Any extends SpellsUnlinkedConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SpellsUnlinkedConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = Item.OfType<"spell">>
    extends Omit<DocumentSheet5e.RenderContext<Document>, "source">,
      Partial<dnd5e.types.data.journal.UnlinkedSpellConfiguration> {
    fields: foundry.data.fields.DataSchema;
    spellLevelOptions: Array<{ value: dnd5e.types.SpellLevel.TypeKey; label: string }>;
    spellSchoolOptions: Array<{ value: dnd5e.types.SpellSchool.TypeKey; label: string }>;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = Item.OfType<"spell">>
    extends DocumentSheet5e.Configuration<Document> {
    unlinkedId: string | null;
  }
  interface RenderOptions extends DocumentSheet5e.RenderOptions {}
}

export default SpellsUnlinkedConfig;
