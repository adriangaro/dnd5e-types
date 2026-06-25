/**
 * Things an ability can consume on use (label map, Seam A). `CONFIG.DND5E.abilityConsumptionTypes`.
 *
 * Legacy consumption-type label map (the activity-based variant is `activityConsumptionTypes`).
 */

declare global {
  namespace dnd5e.types {
    namespace AbilityConsumptionType {
      interface DefaultTypes {
        ammo: true;
        attribute: true;
        hitDice: true;
        material: true;
        charges: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** Different things that an ability can consume upon use. */
      abilityConsumptionTypes: { [K in dnd5e.types.AbilityConsumptionType.TypeKey]: string };
    }
  }
}

export {};
