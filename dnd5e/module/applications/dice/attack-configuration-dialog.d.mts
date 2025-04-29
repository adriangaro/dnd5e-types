import D20RollConfigurationDialog from "./d20-configuration-dialog.mjs";

declare class AttackRollConfigurationDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends D20RollConfigurationDialog<
  AttackRollConfigurationDialog.MakeRenderContext<RenderContext>,
  AttackRollConfigurationDialog.MakeConfiguration<Configuration>,
  AttackRollConfigurationDialog.MakeRenderOptions<RenderOptions>
> { }

declare class AnyAttackRollConfigurationDialog extends AttackRollConfigurationDialog<{}, {}, {}> {
  constructor(...args: never);
}

declare namespace AttackRollConfigurationDialog {
  interface Any extends AnyAttackRollConfigurationDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyAttackRollConfigurationDialog> {}
  
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Ctx
  >
  type RenderContext = AttackRollConfigurationDialog['__RenderContext']

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      ammunitionOptions: {
        value: any,
        label: string
      }[]
      attackModeOptions: {
        value: any,
        label: string
      }[]
      masteryOptions: {
        value: any,
        label: string
      }[]
    },
    Cfg
  >
  type Configuration = AttackRollConfigurationDialog['__Configuration']

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = AttackRollConfigurationDialog['__RenderOptions']
}

export default AttackRollConfigurationDialog