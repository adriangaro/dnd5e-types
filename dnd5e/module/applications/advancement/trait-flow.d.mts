import AdvancementFlow from "./advancement-flow.mjs";
import * as Trait from "../../documents/actor/trait.mjs";
import type TraitAdvancement from "#dnd5e/module/documents/advancement/trait.mjs";

/**
 * Inline application that presents the player with a trait choices.
 */
export default class TraitFlow extends AdvancementFlow<
  TraitAdvancement
> {

  /**
   * Array of trait keys currently chosen.
   */
  chosen: Set<string>;


  /* -------------------------------------------- */

  /**
   * Trait configuration from `CONFIG.TRAITS` for this advancement's trait type.
   */
  get traitConfig(): dnd5e.types.Trait.TraitConfig

  /* -------------------------------------------- */

  /**
   * Add a trait to the value when one is selected.
   */
  _onSelectTrait(event: Event)

  /* -------------------------------------------- */

  /**
   * Remove a trait for the value when the remove button is clicked.
   */
  _onRemoveTrait(event: Event)

  /* -------------------------------------------- */
  /*  Data Preparation Methods                    */
  /* -------------------------------------------- */

  /**
   * When only a single choice is available, automatically select that choice provided value is empty.
   */
  prepareInitialValue(): Promise<Set<string>>

  /* -------------------------------------------- */

  /**
   * Prepare the list of slots to be populated by traits.
   */
  prepareTraitSlots(available: object): {
    key: string,
    label: string,
    showDelete: boolean,
    showSelector: boolean
  }[]
}
