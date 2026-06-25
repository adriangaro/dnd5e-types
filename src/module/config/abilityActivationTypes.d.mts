/**
 * Item/ability activation types (label map, Seam A). `CONFIG.DND5E.abilityActivationTypes`.
 *
 * Legacy activation-type label map (the activity-based variant is `activityActivationTypes`).
 */

declare global {
  namespace dnd5e.types {
    namespace AbilityActivationType {
      interface DefaultTypes {
        none: true;
        special: true;
        action: true;
        bonus: true;
        reaction: true;
        minute: true;
        hour: true;
        day: true;
        legendary: true;
        mythic: true;
        lair: true;
        crew: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      abilityActivationTypes: { [K in dnd5e.types.AbilityActivationType.TypeKey]: string };
    }
  }
}

export {};
