/**
 * A data model that represents the Bastion configuration options.
 *
 * World-setting model for the bastion configuration (`game.settings.get("dnd5e", "bastionConfiguration")`).
 */

declare global {
  namespace dnd5e.types.Settings {
    namespace Bastion {
      type Schema = {
        /** Display the "Advance Bastion Turn" button in the interface for GM users. */
        button: foundry.data.fields.BooleanField<{ required: true; label: "DND5E.Bastion.Button.Label"; hint: "DND5E.Bastion.Button.Hint" }>;
        /** Time between bastion turns in days. */
        duration: foundry.data.fields.NumberField<{ required: true; positive: true; integer: true; initial: 7; label: "DND5E.Bastion.Duration.Label" }>;
        /** Display bastion tab on sheets of characters that are 5th level or higher. */
        enabled: foundry.data.fields.BooleanField<{ required: true; label: "DND5E.Bastion.Enabled.Label"; hint: "DND5E.Bastion.Enabled.Hint" }>;
      };
    }
  }
}

declare class BastionSetting extends foundry.abstract.DataModel<
  dnd5e.types.Settings.Bastion.Schema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Settings.Bastion.Schema;

  /** Determine whether bastions are available for a specific actor. */
  availableForActor(actor: globalThis.Actor.Implementation): boolean;
}

export default BastionSetting;
