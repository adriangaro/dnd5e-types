import Advancement from "./advancement.mjs";
import SelectChoices from "../actor/select-choices.mjs";
import { TraitConfigurationData, TraitValueData } from "../../data/advancement/trait.mjs";

/**
 * Advancement that grants the player with certain traits or presents them with a list of traits from which
 * to choose.
 */
declare class TraitAdvancement extends Advancement<
  'Trait',
  typeof TraitConfigurationData,
  typeof TraitValueData
> {
  static metadata: TraitAdvancement.Metadata
  get metadata(): TraitAdvancement.Metadata

  /* -------------------------------------------- */

  /**
   * The maximum number of traits granted by this advancement. The number of traits actually granted may be lower if
   * actor already has some traits.
   */
  get maxTraits(): number

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Two sets of keys based on actor data, one that is considered "selected" and thus unavailable to be chosen
   * and another that is "available". This is based off configured advancement mode.
   */
  actorSelected(): Promise<{ selected: Set<string>, available: Set<string> }>

  /**
   * Guess the trait type from the grants & choices on this advancement.
   */
  representedTraits(pools: Set<string>[]): Set<string>

  /* -------------------------------------------- */

  /**
   * Prepare the list of available traits from which the player can choose.
   */
  availableChoices(chosen: Set<string>): Promise<{ choices: SelectChoices, label: string } | null>

  /* -------------------------------------------- */



  /**
   * Determine which of the provided grants, if any, still needs to be fulfilled.
   */
  unfulfilledChoices(chosen): Promise<{
    available: {
      type: "grant" | "choice"
      choiceIdx?: number
      choices: SelectChoices
    }[],
    choices: SelectChoices
  }>
}
declare namespace TraitAdvancement {
  interface Metadata extends Advancement.Metadata {
    dataModels: {
      configuration: typeof TraitConfigurationData,
      value: typeof TraitValueData
    }
    apps: {
      config: typeof dnd5e.applications.advancement.TraitConfig
      flow: typeof dnd5e.applications.advancement.TraitFlow
    }
  }
}

export default TraitAdvancement

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultAdvancementTypes {
        Trait: typeof TraitAdvancement
      }

      interface DefaultValidItemTypes {
        'Trait.background': true
        'Trait.class': true
        'Trait.race': true
        'Trait.subclass': true
      }
    }
  }
}
