/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/documents/mixins/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.documents.mixins {
      /** Configuration information for PseudoDocuments. */
      interface PseudoDocumentsMetadata {
      name: string; // Base type name of this PseudoDocument (e.g. "Activity", "Advancement").
      label: string; // Localized name for this PseudoDocument type.
      }

  }
}

export {};
