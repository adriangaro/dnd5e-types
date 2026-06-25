/** Extended roll configuration dialog that allows selecting attack mode, ammunition, and weapon mastery. */

import D20RollConfigurationDialog from "./d20-configuration-dialog.mjs";

declare class AttackRollConfigurationDialog<
  RenderContext extends object = AttackRollConfigurationDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = AttackRollConfigurationDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = AttackRollConfigurationDialog.RenderOptions,
> extends D20RollConfigurationDialog<RenderContext, Configuration, RenderOptions> {
  get config(): dnd5e.types.Dice.AttackRollProcessConfiguration;
}

declare namespace AttackRollConfigurationDialog {
  interface Any extends AttackRollConfigurationDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AttackRollConfigurationDialog<any, any, any>> {}

  interface RenderContext extends D20RollConfigurationDialog.RenderContext {}
  interface Configuration extends D20RollConfigurationDialog.Configuration {
    /** Ammunition that can be used with the attack. */
    ammunitionOptions: foundry.applications.fields.FormSelectOption[];

    /** Different modes of attack. */
    attackModeOptions: foundry.applications.fields.FormSelectOption[];

    /** Available masteries for the attacking weapon. */
    masteryOptions: foundry.applications.fields.FormSelectOption[];
  }
  interface RenderOptions extends D20RollConfigurationDialog.RenderOptions {}
}

export default AttackRollConfigurationDialog;
