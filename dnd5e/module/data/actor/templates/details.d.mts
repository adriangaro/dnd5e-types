import LocalDocumentField from "../../fields/local-document-field.mjs";


/**
 * Shared contents of the details schema between various actor types.
 */
declare class DetailsField {
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
    alignment: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Alignment.TypeKey, { required: true, label: "DND5E.Alignment" }>,
    ideal: foundry.data.fields.StringField<{ required: true, label: "DND5E.Ideals" }>,
    bond: foundry.data.fields.StringField<{ required: true, label: "DND5E.Bonds" }>,
    flaw: foundry.data.fields.StringField<{ required: true, label: "DND5E.Flaws" }>,
    race: LocalDocumentField<typeof foundry.documents.BaseItem<'race'>, {
      required: true, fallback: true, label: "DND5E.Species"
    }>
  }
}

declare namespace DetailsField {

}

export default DetailsField

declare global {
  namespace dnd5e.types {
    namespace Alignment {
      // --- Base Definitions ---
      interface DefaultAlignmentTypes {
        lg: true,
        ng: true,
        cg: true,
        ln: true,
        tn: true,
        cn: true,
        le: true,
        ne: true,
        ce: true
      }

      /**
       * Override interface for declaration merging.
       * Add custom condition types here.
       * @example
       * declare global {
       * namespace dnd5e.types.Conditions {
       * interface OverrideTypes {
       * 'dazed': true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultAlignmentTypes,
        OverrideTypes
      >;

      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }  

    interface DND5EConfig {
      alignments: {
        [K in Alignment.TypeKey]: string
      }
    }
  }
}
