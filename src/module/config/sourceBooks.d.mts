/**
 * Source-book registry config domain (Seam A). `CONFIG.DND5E.sourceBooks`.
 *
 * Label-map of books available as item sources. Empty by default in core; modules
 * register their books here. Keys stay expandable via OverrideTypes.
 */

declare global {
  namespace dnd5e.types {
    namespace SourceBook {
      /** Core registers no source books by default. */
      interface DefaultTypes extends Record<string, boolean | never> {}

      /** Downstream merge point — add `{ "My Book": true }` here. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** List of books available as sources. @enum {string} */
      sourceBooks: { [K in dnd5e.types.SourceBook.TypeKey]: string };
    }
  }
}

export {};
