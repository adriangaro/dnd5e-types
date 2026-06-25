/**
 * Language config domain. `CONFIG.DND5E.languages`.
 *
 * The `Language` namespace (DefaultTypes/OverrideTypes/Types/TypeKey for the *leaf* language
 * keys, plus the Communication* variants) is declared in `_stubs.d.mts`. This file only adds the
 * `Config` shape for a language *category* node and the `DND5EConfig` funnel entry.
 *
 * NOTE: the runtime `CONFIG.DND5E.languages` is a nested category structure (top-level keys are
 * categories like `standard`/`exotic`, each with a `children` map of leaf languages — and some
 * children, e.g. `primordial`, are themselves nested nodes). It is therefore NOT keyed by
 * `Language.TypeKey` (which enumerates the leaf language keys). The funnel below models the
 * nested category tree.
 */

declare global {
  namespace dnd5e.types {
    namespace Language {
      /** A node in the language tree: either a localized label string or a nested category. */
      type Node = string | Category;

      /** A language category node with selectable flag and child languages/categories. */
      interface Category {
        /** Localized label. */
        label: string;
        /** Whether this category itself can be selected as a language (default `true`). */
        selectable?: boolean;
        /** Child languages (leaf label strings) or nested categories. */
        children?: Record<string, dnd5e.types.Language.Node>;
      }

      /** Shape of each top-level `CONFIG.DND5E.languages[category]` entry. */
      type Config = dnd5e.types.Language.Category;
    }

    interface DND5EConfig {
      languages: Record<string, dnd5e.types.Language.Config>;
    }
  }
}

export {};
