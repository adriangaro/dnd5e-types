/**
 * Character alignment options (Seam A, label-map). `CONFIG.DND5E.alignments`.
 */

declare global {
  namespace dnd5e.types {
    namespace Alignment {
      /** The nine core alignments. */
      interface DefaultTypes {
        lg: true;
        ng: true;
        cg: true;
        ln: true;
        tn: true;
        cn: true;
        le: true;
        ne: true;
        ce: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** Localized alignment labels keyed by alignment code. */
      alignments: { [K in dnd5e.types.Alignment.TypeKey]: string };
    }
  }
}

export {};
