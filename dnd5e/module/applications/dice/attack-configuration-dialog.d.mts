import D20RollConfigurationDialog from "./d20-configuration-dialog.mjs";

declare class AttackRollConfigurationDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends D20RollConfigurationDialog<
  AttackRollConfigurationDialog.RenderContext<RenderContext>,
  AttackRollConfigurationDialog.Configuration<Configuration>,
  AttackRollConfigurationDialog.RenderOptions<RenderOptions>
> { }

declare class AnyAttackRollConfigurationDialog extends AttackRollConfigurationDialog<{}, {}, {}> {
  constructor(...args: never);
}

declare namespace AttackRollConfigurationDialog {
  interface Any extends AnyAttackRollConfigurationDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyAttackRollConfigurationDialog> {}
  
  type RenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Ctx
  >
  type Configuration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
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
  type RenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
}

export default AttackRollConfigurationDialog