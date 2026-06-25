/** Extended roll configuration dialog that allows selecting abilities. */

import D20RollConfigurationDialog from "./d20-configuration-dialog.mjs";

declare class SkillToolRollConfigurationDialog<
  RenderContext extends object = SkillToolRollConfigurationDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = SkillToolRollConfigurationDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = SkillToolRollConfigurationDialog.RenderOptions,
> extends D20RollConfigurationDialog<RenderContext, Configuration, RenderOptions> {}

declare namespace SkillToolRollConfigurationDialog {
  interface Any extends SkillToolRollConfigurationDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SkillToolRollConfigurationDialog<any, any, any>> {}

  interface RenderContext extends D20RollConfigurationDialog.RenderContext {}
  interface Configuration extends D20RollConfigurationDialog.Configuration {
    /** Whether the dialog allows the user to choose the ability used for the roll. */
    chooseAbility?: boolean;
  }
  interface RenderOptions extends D20RollConfigurationDialog.RenderOptions {}
}

export default SkillToolRollConfigurationDialog;
