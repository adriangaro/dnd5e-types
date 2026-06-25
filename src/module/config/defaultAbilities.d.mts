/**
 * Default ability mapping config domain (Seam A). `CONFIG.DND5E.defaultAbilities`.
 *
 * Configures which ability score is used as the default modifier for certain rolls
 * (attacks, initiative, hit points, concentration). Values reference ability keys.
 */

declare global {
  namespace dnd5e.types {
    namespace DefaultAbility {
      /** Default roll contexts mapped to an ability. */
      interface DefaultTypes {
        meleeAttack: true;
        rangedAttack: true;
        initiative: true;
        hitPoints: true;
        concentration: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /**
       * Configure which ability score is used as the default modifier for initiative rolls,
       * when calculating hit points per level and hit dice, and as the default modifier for
       * saving throws to maintain concentration.
       * @enum {string}
       */
      defaultAbilities: { [K in dnd5e.types.DefaultAbility.TypeKey]: dnd5e.types.Ability.TypeKey };
    }
  }
}

export {};
