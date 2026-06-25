/**
 * Travel type config domain (Seam A). `CONFIG.DND5E.travelTypes`.
 *
 * Types of movement supported by creature actors (land/water/air); the `travel`
 * targets referenced by `movementTypes[*].travel`.
 */

declare global {
  namespace dnd5e.types {
    namespace TravelType {
      /** Default travel types. */
      interface DefaultTypes {
        land: true;
        water: true;
        air: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.travelTypes[key]` entry (`Omit<MovementTypeConfiguration, "travel">`). */
      interface Config {
        /** Whether this movement speed is displayed in the actor's sheet. */
        hidden?: boolean;
        /** Localized label for the travel type. */
        label: string;
        /** When this special movement type runs out, can the actor fall back to using their walk speed at 2x cost? */
        walkFallback?: boolean;
      }
    }

    interface DND5EConfig {
      travelTypes: { [K in dnd5e.types.TravelType.TypeKey]: dnd5e.types.TravelType.Config };
    }
  }
}

export {};
