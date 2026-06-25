/**
 * Activity consumption-target config domain (Seam A). `CONFIG.DND5E.activityConsumptionTypes`.
 */

declare global {
  namespace dnd5e.types {
    namespace ActivityConsumptionType {
      interface DefaultTypes {
        activityUses: true;
        itemUses: true;
        material: true;
        hitDice: true;
        spellSlots: true;
        attribute: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.activityConsumptionTypes[key]` entry. */
      interface Config extends dnd5e.types.core.ActivityConsumptionTargetConfiguration {}
    }

    interface DND5EConfig {
      activityConsumptionTypes: {
        [K in dnd5e.types.ActivityConsumptionType.TypeKey]: dnd5e.types.ActivityConsumptionType.Config;
      };
    }
  }
}

export {};
