/**
 * Data model for tracking information on the primary party.
 *
 * World-setting model tracking the primary party actor (`game.settings.get("dnd5e", "primaryParty")`).
 * `actor` is a `ForeignDocumentField` → the resolved group Actor (or null).
 */

declare global {
  namespace dnd5e.types.Settings {
    namespace PrimaryParty {
      type Schema = {
        /** Group actor representing the primary party. */
        actor: foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseActor>;
      };
    }
  }
}

declare class PrimaryPartySetting extends foundry.abstract.DataModel<
  dnd5e.types.Settings.PrimaryParty.Schema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Settings.PrimaryParty.Schema;
}

export default PrimaryPartySetting;
