/**
 * Rule type config domain (Seam A). `CONFIG.DND5E.ruleTypes`.
 *
 * Categories of rules used in rule pages and the `&Reference` enricher.
 */

declare global {
  namespace dnd5e.types {
    namespace RuleType {
      /** The core rule type categories. */
      interface DefaultTypes {
        rule: true;
        ability: true;
        areaOfEffect: true;
        condition: true;
        creatureType: true;
        damage: true;
        skill: true;
        spellComponent: true;
        spellSchool: true;
        spellTag: true;
        weaponMastery: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.ruleTypes[key]` entry. */
      interface Config {
        /** Localized label for the rule type. */
        label: string;
        /** Key path for a configuration object that contains reference data. */
        references?: string;
      }
    }

    interface DND5EConfig {
      ruleTypes: { [K in dnd5e.types.RuleType.TypeKey]: dnd5e.types.RuleType.Config };
    }
  }
}

export {};
