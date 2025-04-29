import type D20Roll from "@dnd5e/module/dice/d20-roll.mjs";
import D20RollConfigurationDialog from "./d20-configuration-dialog.mjs";
import type RollConfigurationDialog from "./roll-configuration-dialog.d.mts";
import type BasicRoll from "@dnd5e/module/dice/basic-roll.mjs";

/**
 * Extended roll configuration dialog that allows selecting abilities.
 */
declare class SkillToolRollConfigurationDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends D20RollConfigurationDialog<
  SkillToolRollConfigurationDialog.MakeRenderContext<RenderContext>,
  SkillToolRollConfigurationDialog.MakeConfiguration<Configuration>,
  SkillToolRollConfigurationDialog.MakeRenderOptions<RenderOptions>
> {}

declare class AnySkillToolRollConfigurationDialog extends SkillToolRollConfigurationDialog<{}, {}, {}> {
  constructor(...args: never);
}

declare namespace SkillToolRollConfigurationDialog {
  interface Any extends AnySkillToolRollConfigurationDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnySkillToolRollConfigurationDialog> {}
  
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      
    },
    Ctx
  >
  type RenderContext = SkillToolRollConfigurationDialog['__RenderContext']

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      chooseAbility?: boolean
    },
    Cfg
  >
  type Configuration = SkillToolRollConfigurationDialog['__Configuration']

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = SkillToolRollConfigurationDialog['__RenderOptions']

  interface RollProcessConfiguration extends D20Roll.ProcessConfiguration {
    ability?: dnd5e.types.Ability.TypeKey,
    bonus?: string,
    item?: Item.OfType<'tool'>
    skill?: dnd5e.types.Skill.TypeKey
    tool?: dnd5e.types.Tool.TypeKey
  }
  type RollDialogConfiguration = dnd5e.types.DeepMerge<
    D20Roll.DialogConfiguration,
    BasicRoll.MakeDialogAppConfig<typeof SkillToolRollConfigurationDialog<{}, {}, {}>>
  >
}

export default SkillToolRollConfigurationDialog