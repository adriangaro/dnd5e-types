/**
 * Tool category config domain (Seam A). `CONFIG.DND5E.toolTypes`.
 *
 * The categories into which Tool items can be grouped (label-map).
 */

declare global {
  namespace dnd5e.types {
    namespace ToolType {
      /** Default tool categories. */
      interface DefaultTypes {
        art: true;
        game: true;
        music: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      toolTypes: { [K in dnd5e.types.ToolType.TypeKey]: string };
    }
  }
}

export {};
