import AdvancementConfig from "./advancement-config-v2.mjs";
import * as Trait from "../../documents/actor/trait.mjs";
import type TraitAdvancement from "@dnd5e/module/documents/advancement/trait.mjs";
/**
 * Configuration application for traits.
 */
export default class TraitConfig extends AdvancementConfig<
  TraitAdvancement,
  {
    grants: {
      label: string,
      data: TraitAdvancement['configuration']['grants'],
      selected: boolean
    },
    choices: {
      label: string,
      data: TraitAdvancement['configuration']['choices'][number],
      selected: boolean
    },
    selectedIndex: number,
    count?: {
      field: AdvancementConfig<TraitAdvancement>['__RenderContext']['configuration']['fields']['choices']['element']['fields']['count'],
      value: TraitAdvancement['configuration']['choices'][number]['count']
    },
    disableAllowReplacements: boolean,
    default: {
      title: string,
      icon: string,
      hint: string
    },
    trait: {
      field: foundry.data.fields.BooleanField,
      input: AdvancementConfig<TraitAdvancement>['__RenderContext']['inputs']['createCheckboxInput'],
      options: Awaited<ReturnType<typeof Trait['choices']>>,
      selected: dnd5e.types.Trait.TypeKey,
      selectedHeader: string,
      typeField: foundry.data.fields.StringField,
      typeOptions: {
        value: string,
        label: string
      }[]
    },
    mode: {
      hint: string,
      options: {
        value: string,
        label: string
      }[]
    }
  }
> {
  selected: number
  trait: dnd5e.types.Trait.TypeKey

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Shortcut to the configuration data on the advancement.
   */
  get config(): TraitAdvancement['configuration']


  /* -------------------------------------------- */

  /**
   * List of trait types for the current selected configuration.
   */
  get types(): Set<string>


  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle adding a new choice.
   */
  static #addChoice<This extends AdvancementConfig.Any>(this: This, event: MouseEvent, target: HTMLElement): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle removing a choice.
   */
  static #removeChoice<This extends AdvancementConfig.Any>(this: This, event: MouseEvent, target: HTMLElement): Promise<void>
}
