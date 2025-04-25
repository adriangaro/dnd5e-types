/**
 * System data model for enchantment active effects.
 */
export default class EnchantmentData extends foundry.abstract.TypeDataModel<{}, foundry.abstract.Document.Any> {
  /**
   * Handle enchantment-specific changes to the item.
   */
  _applyLegacy(
    item: Item.Implementation, 
    change: ActiveEffect.EffectChangeData, 
    changes: Record<string, any>
  ): boolean | void
}

declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface ActiveEffect {
        enchantment: typeof EnchantmentData
      }
    }
  }
}