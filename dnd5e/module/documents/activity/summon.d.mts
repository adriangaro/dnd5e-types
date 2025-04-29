import type TokenPlacement from "@dnd5e/module/canvas/token-placement.mjs";
import SummonActivityData from "../../data/activity/summon-data.mjs";
import { simplifyBonus, staticID } from "../../utils.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for summoning creatures.
 */
declare class SummonActivity extends ActivityMixin(SummonActivityData) {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Does the user have permissions to summon?
   */
  get canSummon(): boolean

  /* -------------------------------------------- */
  /*  Activation                                  */
  /* -------------------------------------------- */


  /** @inheritDoc */
  _prepareUsageConfig(config: SummonActivity.UseConfiguration): SummonActivity.UseConfiguration

  /* -------------------------------------------- */

  /** @inheritDoc */
  _finalizeUsage(config: SummonActivity.UseConfiguration, results: SummonActivity.UsageResults): Promise<void>

  /* -------------------------------------------- */
  /*  Summoning                                   */
  /* -------------------------------------------- */

  /**
   * Process for summoning actor to the scene.
   * @param options  Configuration data for summoning behavior.
   */
  placeSummons(options: SummonActivity.SummoningConfiguration): Promise<Token.Object[] | void>

  /* -------------------------------------------- */

  /**
   * If actor to be summoned is in a compendium, create a local copy or use an already imported version if present.
   * @param uuid  UUID of actor that will be summoned.
   * @returns     Local copy of actor.
   */
  fetchActor(uuid: string): Actor.Implementation
  /* -------------------------------------------- */

  /**
   * Request a specific actor to summon from the player.
   * @param profile  Profile used for summoning.
   * @returns  UUID of the concrete actor to summon or `null` if canceled.
   */
  queryActor(profile: SummonActivity.SummonsProfile): Promise<string | null>

  /* -------------------------------------------- */

  /**
   * Prepare the updates to apply to the summoned actor and its token.
   * @param actor                   Actor that will be modified.
   * @param profile          Summoning profile used to summon the actor.
   * @param options  Configuration data for summoning behavior.
   * @returns   Changes that will be applied to the actor, its items, and its token.
   */
  getChanges(
    actor: Actor.Implementation, profile: SummonActivity.SummonsProfile, options: SummonActivity.SummoningConfiguration
  ): Promise<{ actorChanges: object, tokenChanges: object }>

  /* -------------------------------------------- */

  /**
   * Determine where the summons should be placed on the scene.
   * @param token            Token to be placed.
   * @param profile          Profile used for summoning.
   * @param options  Additional summoning options.
   * @returns
   */
  getPlacement(
    token: foundry.data.PrototypeToken,
    profile: SummonActivity.SummonsProfile,
    options: SummonActivity.SummoningConfiguration
  ): Promise<TokenPlacement.PlacementData[]>

  /* -------------------------------------------- */



  /**
   * Create token data ready to be summoned.
   * @param config  Configuration for creating a modified token.
   */
  getTokenData(config: SummonActivity.TokenUpdateData): Promise<TokenDocument['_source']>

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle placing a summons from the chat card.
   * @this {SummonActivity}
   * @param {PointerEvent} event     Triggering click event.
   * @param {HTMLElement} target     The capturing HTML element which defined a [data-action].
   * @param {ChatMessage5e} message  Message associated with the activation.
   */
  static #placeSummons(this: SummonActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): Promise<void>
}

declare namespace SummonActivity {
  type UseConfiguration = dnd5e.types.Activity.UseConfiguration & {
    create: {
      summons: string
    } | false,
    summons: Partial<SummoningConfiguration>
  }
  interface SummoningConfiguration {
    profile: string,
    creatureSize: string
    creatureType: string
  }

  interface UsageResults extends dnd5e.types.Activity.UsageResults {
    summoned: Token.Object[]
  }

  type SummonsProfile = SummonActivity['profiles'][number]

  /**
   * Configuration for creating a modified token.
   */
  interface TokenUpdateData {
    actor: Actor.Implementation;
    placement: TokenPlacement.PlacementData;
    tokenUpdates: object;
    actorUpdates: object;
  }
}

export default SummonActivity;