import EnchantmentData from "./enchantment.mjs";

export { EnchantmentData };

export const config: {
  enchantment: typeof EnchantmentData
};


declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface ActiveEffect {
      }
    }
  }
}

declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    ActiveEffect: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.ActiveEffect>,
  }
}
