/**
 * A field for storing relative UUIDs to activations on the actor.
 */
declare class ActivationsField extends foundry.data.fields.SetField<
  foundry.data.fields.StringField,
  foundry.data.fields.SetField.DefaultOptions<foundry.data.fields.ArrayField.AssignmentElementType<foundry.data.fields.StringField>>
> {
  constructor()
  /* -------------------------------------------- */

  /**
   * Find any activity relative UUIDs on this actor that can be used during a set of periods.
   */
  static getActivations(actor: Actor.Implementation, periods: dnd5e.types.ActivityActivation.TypeKey[]): string[]

  /* -------------------------------------------- */

  /**
   * Prepare activations for display on chat card.
   * @param actor  Actor to which this activations can be used.
   */
  static processActivations(this: ActivationsField, actor: Actor.Implementation): dnd5e.types.Activity.Any[]
}

export default ActivationsField