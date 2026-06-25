/**
 * Data fields that stores information on the adventure or sourcebook where this document originated.
 *
 * The constructor also pins `{ label: "DND5E.SOURCE.FIELDS.source.label" }` as a schema option
 * (runtime-only metadata).
 *
 * `static prepareData` derives `bookPlaceholder`/`label`/`value`/`slug`/`directlyEditable`
 * onto the initialized value; surfaced on {@link SourceField.SourceData} for reuse.
 */

declare global {
  namespace dnd5e.types.fields {
    type SourceField = foundry.data.fields.SchemaField<dnd5e.types.fields.SourceField.Schema>;

    namespace SourceField {
      interface Schema extends foundry.data.fields.DataSchema {
        book: foundry.data.fields.StringField;
        page: foundry.data.fields.StringField;
        custom: foundry.data.fields.StringField;
        license: foundry.data.fields.StringField;
        revision: foundry.data.fields.NumberField<{ initial: 1 }>;
        /** Initial is `"2024"` or `"2014"` depending on `dnd5e.settings.rulesVersion`. */
        rules: foundry.data.fields.StringField<{ initial: "2024" | "2014" }>;
      }

      /**
       * The `source` shape after `prepareData`: the initialized source plus the derived
       * labels/identifiers. `directlyEditable` is a non-enumerable derived flag.
       */
      type SourceData = dnd5e.types.PrettifyType<
        dnd5e.types.InitializedOf<Schema> & {
          bookPlaceholder: string;
          label: string;
          value: string;
          slug: string;
          directlyEditable: boolean;
        }
      >;
    }
  }
}

declare class SourceField extends foundry.data.fields.SchemaField<
  dnd5e.types.fields.SourceField.Schema
> {
  /**
   * Prepare the source label.
   * @param uuid - Compendium source or document UUID.
   */
  static prepareData(this: dnd5e.types.fields.SourceField.SourceData, uuid: string): void;

  /**
   * Check if the provided package has any source books registered in its manifest.
   * If it has only one, then return that book's key.
   * @param pkg - The package.
   */
  static getModuleBook(
    pkg: foundry.packages.Module | foundry.packages.System | foundry.packages.World | null
  ): string | null;

  /**
   * Get the package associated with the given UUID, if any.
   * @param uuidOrCollection - The document UUID or its collection.
   */
  static getPackage(
    uuidOrCollection: foundry.documents.collections.CompendiumCollection.Any | string
  ): foundry.packages.Module | foundry.packages.System | foundry.packages.World | null;
}

export { SourceField };
export {};
