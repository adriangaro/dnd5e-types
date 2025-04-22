import LocalDocumentField from "../../fields/local-document-field.mjs";


/**
 * Shared contents of the details schema between various actor types.
 */
export default class DetailsField {
  /**
   * Fields shared between characters, NPCs, and vehicles.
   */
  static get common(): {
    biography: foundry.data.fields.SchemaField<{
      value: foundry.data.fields.HTMLField<{ label: "DND5E.Biography" }>,
      public: foundry.data.fields.HTMLField<{ label: "DND5E.BiographyPublic" }>
    }, { label: "DND5E.Biography" }>
  };


  /* -------------------------------------------- */

  /**
   * Fields shared between characters and NPCs.
   */
  static get creature(): {
    alignment: foundry.data.fields.StringField<{ required: true, label: "DND5E.Alignment" }>,
    ideal: foundry.data.fields.StringField<{ required: true, label: "DND5E.Ideals" }>,
    bond: foundry.data.fields.StringField<{ required: true, label: "DND5E.Bonds" }>,
    flaw: foundry.data.fields.StringField<{ required: true, label: "DND5E.Flaws" }>,
    race: LocalDocumentField<Item.ImplementationClass, {
      required: true, fallback: true, label: "DND5E.Species"
    }>
  }
}
