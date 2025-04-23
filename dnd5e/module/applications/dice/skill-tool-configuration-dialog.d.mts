import D20RollConfigurationDialog from "./d20-configuration-dialog.mjs";

/**
 * Extended roll configuration dialog that allows selecting abilities.
 */
declare class SkillToolRollConfigurationDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends D20RollConfigurationDialog<
  SkillToolRollConfigurationDialog.RenderContext<RenderContext>,
  SkillToolRollConfigurationDialog.Configuration<Configuration>,
  SkillToolRollConfigurationDialog.RenderOptions<RenderOptions>
> {}

declare class AnySkillToolRollConfigurationDialog extends SkillToolRollConfigurationDialog<{}, {}, {}> {
  constructor(...args: never);
}

declare namespace SkillToolRollConfigurationDialog {
  interface Any extends AnySkillToolRollConfigurationDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnySkillToolRollConfigurationDialog> {}
  
  type RenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      
    },
    Ctx
  >
  type Configuration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      chooseAbility?: boolean
    },
    Cfg
  >
  type RenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
}

export default SkillToolRollConfigurationDialog