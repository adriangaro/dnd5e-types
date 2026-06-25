/**
 * Activity for summoning creatures.
 * The document = `ActivityMixin(BaseSummonActivityData)`, registered as the `"summon"` type.
 */

import type BaseSummonActivityData from "../../data/activity/summon-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const SummonActivity_base: ReturnType<typeof ActivityMixin<typeof BaseSummonActivityData>>;

declare class SummonActivity extends SummonActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "summon" };

  /** Does the user have permissions to summon? */
  get canSummon(): boolean;

  /**
   * Process for summoning actor to the scene.
   * @param options  Configuration data for summoning behavior.
   */
  placeSummons(
    options: dnd5e.types.documents.activity.SummoningConfiguration,
  ): Promise<foundry.canvas.placeables.Token.Implementation[] | void>;

  /**
   * Request a specific actor to summon from the player.
   * @param profile  Profile used for summoning.
   * @returns UUID of the concrete actor to summon or `null` if canceled.
   */
  queryActor(
    profile: dnd5e.types.data.activity.SummonsProfile,
  ): Promise<string | null>;

  /**
   * Prepare the updates to apply to the summoned actor and its token.
   * @param actor    Actor that will be modified.
   * @param profile  Summoning profile used to summon the actor.
   * @param options  Configuration data for summoning behavior.
   * @returns Changes that will be applied to the actor, its items, and its token.
   */
  getChanges(
    actor: globalThis.Actor.Implementation,
    profile: dnd5e.types.data.activity.SummonsProfile,
    options: dnd5e.types.documents.activity.SummoningConfiguration,
  ): Promise<{ actorUpdates: object; tokenUpdates: object }>;

  /**
   * Determine where the summons should be placed on the scene.
   * @param token    Token to be placed.
   * @param profile  Profile used for summoning.
   * @param options  Additional summoning options.
   */
  getPlacement(
    token: foundry.data.PrototypeToken,
    profile: dnd5e.types.data.activity.SummonsProfile,
    options: dnd5e.types.documents.activity.SummoningConfiguration,
  ): Promise<dnd5e.types.canvas.TokenPlacementData[]>;

  /**
   * Create token data ready to be summoned.
   * @param config  Configuration for creating a modified token.
   */
  getTokenData(
    config: dnd5e.types.documents.activity.TokenUpdateData,
  ): Promise<object>;
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      summon: typeof SummonActivity;
    }
  }
}

export default SummonActivity;
