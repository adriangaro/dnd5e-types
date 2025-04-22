import type ItemChoiceAdvancement from "@dnd5e/module/documents/advancement/item-choice.mjs";
import AdvancementConfig from "./advancement-config-v2.mjs";

/**
 * Configuration application for item choices.
 */
export default class ItemChoiceConfig extends AdvancementConfig<
  ItemChoiceAdvancement,
  {
      items: {
        data: ItemChoiceAdvancement['configuration']['pool'][number],
        fields: ItemChoiceAdvancement['configuration']['schema']['fields']['pool']['element']['fields'],
        index: ReturnType<typeof fromUuidSync<Item>>
      }[],
      abilityOptions: {
        value: dnd5e.types.Ability.TypeKey,
        label: string
      }[],
      choices: (ItemChoiceAdvancement['configuration']['choices'][string] & {
        label: string
      })[],
      levelRestrictionOptions: ({
        value: string,
        label: string
      } | {
        rule: true
      })[]
      showContainerWarning: boolean,
      showSpellConfig: boolean,
      showRequireSpellSlot: boolean,
      typeOptions: ({
        value: string,
        label: string
      } | {
        rule: true
      })[]
    }
> {}
