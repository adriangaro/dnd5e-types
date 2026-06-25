/**
 * Advancement that grants the player with certain traits or presents them with a list of traits from which
 * to choose.
 */

import type BaseTraitAdvancementData from "../../module/data/advancement/trait-data.mjs";
import type SelectChoices from "../actor/select-choices.mjs";
import { AdvancementMixin } from "./mixin.mjs";

declare const TraitAdvancement_base: ReturnType<typeof AdvancementMixin<typeof BaseTraitAdvancementData>>;

declare class TraitAdvancement extends TraitAdvancement_base {
  static metadata: dnd5e.types.Advancement.Metadata & { name: "Trait" };

  /**
   * Perform the pre-localization of this data model.
   */
  static localize(): void;

  /**
   * The maximum number of traits granted by this advancement. The number of traits actually granted may be lower if
   * actor already has some traits.
   * @type {number}
   */
  get maxTraits(): number;

  /**
   * Two sets of keys based on actor data, one that is considered "selected" and thus unavailable to be chosen
   * and another that is "available". This is based off configured advancement mode.
   * @returns {{ selected: Set<string>, available: Set<string> }}
   */
  actorSelected(): Promise<{ selected: Set<string>; available: Set<string> }>;

  /**
   * Guess the trait type from the grants & choices on this advancement.
   * @param pools  Trait pools to use when figuring out the type.
   * @returns The set of represented trait type keys.
   */
  representedTraits(pools?: Set<string>[]): Set<string>;

  /**
   * Prepare the list of available traits from which the player can choose.
   * @param chosen  Traits already chosen on the advancement. If not set then it will
   *                be retrieved from advancement's value.
   * @returns The available choices and a label, or `null` if nothing remains to be chosen.
   */
  availableChoices(chosen?: Set<string>): Promise<{ choices: SelectChoices; label: string } | null>;

  /**
   * Determine which of the provided grants, if any, still needs to be fulfilled.
   * @param chosen  Traits already chosen on the advancement. If not set then it will
   *                be retrieved from advancement's value.
   * @returns The available unfulfilled choices and the full merged SelectChoices.
   */
  unfulfilledChoices(chosen?: Set<string>): Promise<{
    available: dnd5e.types.documents.advancement.TraitChoices[];
    choices: SelectChoices;
  }>;
}

declare global {
  namespace dnd5e.types.Advancement {
    interface DefaultTypes {
      Trait: typeof TraitAdvancement;
    }
  }
}

export default TraitAdvancement;
