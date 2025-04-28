import BaseSettingsConfig from "./base-settings.mjs";

/**
 * An application for configuring bastion settings.
 */
export default class BastionSettingsConfig extends BaseSettingsConfig<{
  source?: any
}, {

}, {

}> {}


/**
 * A data model that represents the Bastion configuration options.
 */
export class BastionSetting extends foundry.abstract.DataModel<{
  button: foundry.data.fields.BooleanField<{
    required: true, label: "DND5E.Bastion.Button.Label", hint: "DND5E.Bastion.Button.Hint"
  }>,
  duration: foundry.data.fields.NumberField<{
    required: true, positive: true, integer: true, initial: 7, label: "DND5E.Bastion.Duration.Label"
  }>,
  enabled: foundry.data.fields.BooleanField<{
    required: true, label: "DND5E.Bastion.Enabled.Label", hint: "DND5E.Bastion.Enabled.Hint"
  }>
}> {}
