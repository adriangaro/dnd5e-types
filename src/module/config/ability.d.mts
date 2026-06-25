/**
 * Ability score config domain (Seam A). `CONFIG.DND5E.abilities`.
 *
 * Downstream modules add an ability in one line:
 *   declare global { namespace dnd5e.types.Ability { interface OverrideTypes { hon: true } } }
 * which widens `Ability.TypeKey`, every `MappingField` keyed by it (e.g. `system.abilities`),
 * and `CONFIG.DND5E.abilities`.
 */

declare global {
  namespace dnd5e.types {
    namespace Ability {
      /** The six core abilities. */
      interface DefaultTypes {
        str: true;
        dex: true;
        con: true;
        int: true;
        wis: true;
        cha: true;
      }

      /** Downstream merge point — add `{ myAbility: true }` here. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.abilities[key]` entry. */
      interface Config {
        /** Localized label (i18n key pre-init, localized text post-init). */
        label: string;
        /** Localized abbreviation. */
        abbreviation: string;
        /** Full key path used by enrichers. */
        fullKey: string;
        /** UUID of a rule reference. */
        reference?: string;
        /** `"physical"` or `"mental"`. */
        type?: "physical" | "mental";
        /** Default values for this ability based on actor type. If a string is used, the system will attempt to fetch the value of the specified ability. */
        defaults?: Record<string, number | string>;
        /** An SVG icon that represents the ability. */
        icon?: string;
      }
    }

    interface DND5EConfig {
      abilities: { [K in dnd5e.types.Ability.TypeKey]: dnd5e.types.Ability.Config };
    }
  }
}

export {};
