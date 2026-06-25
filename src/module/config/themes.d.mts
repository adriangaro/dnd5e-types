/**
 * Sheet/system themes (label map). `CONFIG.DND5E.themes`.
 */

declare global {
  namespace dnd5e.types {
    namespace Theme {
      /** Themes that can be set for the system or on sheets. */
      interface DefaultTypes {
        light: true;
        dark: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      themes: { [K in dnd5e.types.Theme.TypeKey]: string };
    }
  }
}

export {};
