/**
 * Static ability activation types (label map). `CONFIG.DND5E.staticAbilityActivationTypes`.
 *
 * Ways to activate an item that cannot be labeled with a cost; also spread into
 * `abilityActivationTypes`.
 */

declare global {
  namespace dnd5e.types {
    namespace StaticAbilityActivationType {
      interface DefaultTypes {
        none: true;
        special: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      staticAbilityActivationTypes: { [K in dnd5e.types.StaticAbilityActivationType.TypeKey]: string };
    }
  }
}

export {};
