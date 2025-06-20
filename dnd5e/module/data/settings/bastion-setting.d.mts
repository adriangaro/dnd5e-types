/**
 * A data model that represents the Bastion configuration options.
 */
declare class BastionSetting extends foundry.abstract.DataModel<{
  button: foundry.data.fields.BooleanField<{
    required: true,
    label: "DND5E.Bastion.Button.Label",
    hint: "DND5E.Bastion.Button.Hint"
  }>,
  duration: foundry.data.fields.NumberField<{
    required: true,
    positive: true,
    integer: true,
    initial: 7,
    label: "DND5E.Bastion.Duration.Label"
  }>,
  enabled: foundry.data.fields.BooleanField<{
    required: true,
    label: "DND5E.Bastion.Enabled.Label",
    hint: "DND5E.Bastion.Enabled.Hint"
  }>
}> {}

declare namespace BastionSetting {
  type Data = fvttUtils.PrettifyType<foundry.data.fields.SchemaField.InitializedData<dnd5e.types.GetSchema<typeof BastionSetting>>>;
}

export default BastionSetting;
