import type ItemGrantAdvancement from "#dnd5e/module/documents/advancement/item-grant.mjs";
import AdvancementConfig from "./advancement-config-v2.mjs";

/**
 * Configuration application for item grants.
 */
export default class ItemGrantConfig extends AdvancementConfig<
  ItemGrantAdvancement<'ItemGrant'>,
  {
    items: {
      data: ItemGrantAdvancement<'ItemGrant'>['configuration']['items'][number],
      fields: ItemGrantAdvancement<'ItemGrant'>['configuration']['schema']['fields']['items']['element']['fields'],
      index: ReturnType<typeof fromUuidSync<Item>>
    }[],
    abilityOptions: {
      value: dnd5e.types.Ability.TypeKey,
      label: string
    }[],
    showContainerWarning: boolean,
    showSpellConfig: boolean,
    showRequireSpellSlot: boolean
  }
> {}
