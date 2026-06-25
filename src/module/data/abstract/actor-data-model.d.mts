/**
 * The base data model on which all Actor data models are based. Carries the real `TypeDataModel`
 * generics `<Schema, BaseData, DerivedData>` (Parent pinned per layer) and the advancement-scale +
 * roll-data machinery shared by every actor subtype.
 */

import SystemDataModel from "./system-data-model.mjs";

type _DataSchema = foundry.data.fields.DataSchema;

declare class ActorDataModel<
  Schema extends _DataSchema = fvttUtils.EmptyObject,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  // Parent pinned to abstract `Document.Any`, NOT `Actor.Implementation` — same cycle-break as
  // `ItemDataModel`: an actor model IS its document's `.system`, so a concrete parent loops
  // `Actor.Implementation → Actor.system → <subtype> → this` and trips tsc's recursion limiter at
  // scale (tsgo tolerates it; tsc emits false-positive circularity past ~18 source files).
> extends SystemDataModel<Schema, BaseData, DerivedData, foundry.abstract.Document.Any> {
  static override get metadata(): ActorDataModel.Metadata;
  override get metadata(): ActorDataModel.Metadata;
  override get embeddedDescriptionKeyPath(): string;

  /** Derived scale values, populated by `_prepareScaleValues` (actor-data-model.mjs). */
  scale: Record<string, dnd5e.types.AdvancementScaleValue>;

  /** Section of the group sheet this actor will render within. */
  get groupSection(): string;

  /** Other actors that are available for currency transfers from this actor. */
  get transferDestinations(): globalThis.Actor.Implementation[];

  /** Data preparation steps to perform after item data has been prepared, but before active effects are applied. */
  prepareEmbeddedData(): void;

  /** Derive any values that have been scaled by the Advancement system. Mutates `system.scale`. */
  protected _prepareScaleValues(): void;

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Actor.
   * @param options
   * @returns Roll data for this actor.
   */
  getRollData(options?: { deterministic?: boolean }): ActorDataModel.RollData<this>;

  /**
   * Reset combat-related uses.
   * @param periods  Which recovery periods should be considered.
   * @param results  Updates to perform on the actor and containing items.
   */
  recoverCombatUses(
    periods: string[],
    results: dnd5e.types.documents.CombatRecoveryResults,
  ): Promise<void>;
}

declare abstract class AnyActorDataModel extends ActorDataModel<any, any, any> {
  constructor(...args: any[]);
}

declare namespace ActorDataModel {
  interface Any extends AnyActorDataModel {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyActorDataModel> {}

  interface Metadata extends SystemDataModel.Metadata {
    supportsAdvancement: boolean;
  }

  type RollData<This extends object> = fvttUtils.InterfaceToObject<
    This & { prof: import("../../documents/actor/proficiency.mjs").default }
  >;
}

export default ActorDataModel;
