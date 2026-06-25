/**
 * Difficult-terrain type config domain (Seam A). `CONFIG.DND5E.difficultTerrainTypes`.
 *
 * Downstream modules add a type in one line:
 *   declare global { namespace dnd5e.types.DifficultTerrain { interface OverrideTypes { lava: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace DifficultTerrain {
      /** Core terrain types that can cause difficult terrain. */
      interface DefaultTypes {
        ice: true;
        liquid: true;
        plants: true;
        rocks: true;
        mud: true;
        sand: true;
        slope: true;
        snow: true;
        web: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.difficultTerrainTypes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
      }
    }

    interface DND5EConfig {
      difficultTerrainTypes: { [K in dnd5e.types.DifficultTerrain.TypeKey]: dnd5e.types.DifficultTerrain.Config };
    }
  }
}

export {};
