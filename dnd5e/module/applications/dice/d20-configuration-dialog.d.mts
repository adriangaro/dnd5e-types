import RollConfigurationDialog from "./roll-configuration-dialog.mjs";

/**
 * Dialog for configuring d20 rolls.
 *
 * @param {D20RollProcessConfiguration} [config={}]           Initial roll configuration.
 * @param {BasicRollMessageConfiguration} [message={}]        Message configuration.
 * @param {BasicRollConfigurationDialogOptions} [options={}]  Dialog rendering options.
 */
declare class D20RollConfigurationDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends RollConfigurationDialog<
  dnd5e.dice.D20Roll.DefaultConstructor,
  D20RollConfigurationDialog.RenderContext<RenderContext>,
  D20RollConfigurationDialog.Configuration<Configuration>,
  D20RollConfigurationDialog.RenderOptions<RenderOptions>
> { }

declare class AnyD20RollConfigurationDialog extends D20RollConfigurationDialog<{}, {}, {}> {
  constructor(...args: never);
}

declare namespace D20RollConfigurationDialog {
  interface Any extends AnyD20RollConfigurationDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyD20RollConfigurationDialog> {}
  
  type RenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      buttons: Record<'advantage' | 'normal' | 'disadvantage', {
        default: boolean,
        label: string
      }>
    },
    Ctx
  >
  type Configuration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type RenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
}

export default D20RollConfigurationDialog