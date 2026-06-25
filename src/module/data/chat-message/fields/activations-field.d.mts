/**
 * A field for storing relative UUIDs to activations on the actor.
 *
 * A `SetField<StringField>` storing relative UUIDs to activities on the actor that can be used during
 * a set of recovery periods (drives the "available activations" section of rest/turn chat cards).
 */

declare class ActivationsField extends foundry.data.fields.SetField<foundry.data.fields.StringField> {
  /** Find activity relative UUIDs on this actor usable during a set of periods. */
  static getActivations(
    actor: globalThis.Actor.Implementation,
    periods: dnd5e.types.LimitedUsePeriod.TypeKey[],
  ): string[];

  /**
   * Prepare activations for display on chat card.
   * @param actor  Actor to which this activations can be used.
   */
  static processActivations(
    this: ReadonlySet<string>,
    actor: globalThis.Actor.Implementation,
  ): dnd5e.types.Activity.Instance[];
}

export default ActivationsField;
