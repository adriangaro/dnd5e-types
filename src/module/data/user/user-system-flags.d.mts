/**
 * A custom model to validate system flags on User Documents.
 *
 * Validates the dnd5e system flags stored on User documents (`user.flags.dnd5e`). Surfaced as the
 * User's `_systemFlagsDataModel` (see `documents/user.d.mts`), so `flags.dnd5e` is typed by this
 * schema: previous `/award` targets, spell-scroll creation default, and per-sheet/per-tab prefs.
 */

declare global {
  namespace dnd5e.types.UserSystemFlags {
    type Schema = {
      awardDestinations: foundry.data.fields.SetField<
        foundry.data.fields.ForeignDocumentField<typeof foundry.documents.BaseActor, { idOnly: true }>,
        { required: false }
      >;
      creation: foundry.data.fields.SchemaField<{
        scrollExplanation: foundry.data.fields.StringField<{ initial: "reference" }>;
      }>;
      sheetPrefs: dnd5e.types.fields.MappingField<
        foundry.data.fields.SchemaField<{
          width: foundry.data.fields.NumberField<{ integer: true; positive: true }>;
          height: foundry.data.fields.NumberField<{ integer: true; positive: true }>;
          tabs: dnd5e.types.fields.MappingField<
            foundry.data.fields.SchemaField<{
              collapseSidebar: foundry.data.fields.BooleanField<{ required: false }>;
              group: foundry.data.fields.StringField<{ required: false }>;
              sort: dnd5e.types.fields.RestrictedStringField<"a" | "m" | "p", { required: false; initial: "m" }>;
            }>,
            string,
            { required: false }
          >;
        }>
      >;
    };
  }
}

/** A custom model to validate system flags on User Documents. */
declare class UserSystemFlags extends foundry.abstract.DataModel<
  dnd5e.types.UserSystemFlags.Schema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.UserSystemFlags.Schema;
}

export default UserSystemFlags;
