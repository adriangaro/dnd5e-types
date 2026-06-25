/**
 * NPC habitat categories config domain (Seam A). `CONFIG.DND5E.habitats`.
 *
 * Keyed record of `HabitatConfiguration5e` (a label plus an optional `subtypes` flag).
 */

declare global {
  namespace dnd5e.types {
    namespace Habitat {
      /** Core NPC habitat categories. */
      interface DefaultTypes {
        any: true;
        arctic: true;
        coastal: true;
        desert: true;
        forest: true;
        grassland: true;
        hill: true;
        mountain: true;
        planar: true;
        swamp: true;
        underdark: true;
        underwater: true;
        urban: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.habitats[key]` entry (HabitatConfiguration5e). */
      interface Config {
        /** Localized habitat name. */
        label: string;
        /** Whether this habitat is divided into sub-types. */
        subtypes?: boolean;
      }
    }

    interface DND5EConfig {
      habitats: { [K in dnd5e.types.Habitat.TypeKey]: dnd5e.types.Habitat.Config };
    }
  }
}

export {};
