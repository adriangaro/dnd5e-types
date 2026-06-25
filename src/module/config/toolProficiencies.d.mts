/**
 * Tool proficiency categories (Seam A; label-map). `CONFIG.DND5E.toolProficiencies`.
 *
 * Runtime = `{ ...toolTypes, vehicle }`. Keys are expandable; values are i18n labels.
 */

declare global {
  namespace dnd5e.types {
    namespace ToolProficiency {
      /** Tool proficiency categories a character can gain. */
      interface DefaultTypes {
        art: true;
        game: true;
        music: true;
        vehicle: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      toolProficiencies: { [K in dnd5e.types.ToolProficiency.TypeKey]: string };
    }
  }
}

export {};
