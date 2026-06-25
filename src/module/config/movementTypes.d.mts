/**
 * Movement types supported by creature actors (Seam A; `Movement` namespace stubbed).
 * `CONFIG.DND5E.movementTypes`.
 *
 * The `Movement` namespace (DefaultTypes/OverrideTypes/Types/TypeKey) is declared in
 * `_stubs.d.mts`; this file only adds the per-entry `Config` shape + the funnel entry.
 */

declare global {
  namespace dnd5e.types {
    namespace Movement {
      /** Shape of each `CONFIG.DND5E.movementTypes[key]` entry. */
      interface Config {
        /** Localized label for the movement type. */
        label: string;
        /**
         * Whether this movement speed is displayed in the actor's sheet.
         * @defaultValue false
         */
        hidden?: boolean;
        /** Travel type in `CONFIG.DND5E.travelTypes` to map this speed to (defaults to `land`). */
        travel?: dnd5e.types.TravelType.TypeKey;
        /** When this special movement runs out, can the actor fall back to walk speed at 2x cost? */
        walkFallback?: boolean;
      }
    }

    interface DND5EConfig {
      movementTypes: { [K in dnd5e.types.Movement.TypeKey]: dnd5e.types.Movement.Config };
    }
  }
}

export {};
