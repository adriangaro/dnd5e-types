/**
 * Enchantment re-bind period config domain (Seam A). `CONFIG.DND5E.enchantmentPeriods`.
 *
 * Downstream modules add a period in one line:
 *   declare global { namespace dnd5e.types.EnchantmentPeriod { interface OverrideTypes { dawn: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace EnchantmentPeriod {
      /** Periods at which enchantments can be re-bound to new items. */
      interface DefaultTypes {
        sr: true;
        lr: true;
        atwill: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.enchantmentPeriods[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
      }
    }

    interface DND5EConfig {
      enchantmentPeriods: { [K in dnd5e.types.EnchantmentPeriod.TypeKey]: dnd5e.types.EnchantmentPeriod.Config };
    }
  }
}

export {};
