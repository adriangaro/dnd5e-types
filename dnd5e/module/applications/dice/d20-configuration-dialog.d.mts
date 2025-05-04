import RollConfigurationDialog from "./roll-configuration-dialog.mjs";

/**
 * Dialog for configuring d20 rolls.
 *
 */
declare class D20RollConfigurationDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends RollConfigurationDialog<
  typeof dnd5e.dice.D20Roll<{}, {}, {}, {}, {}>,
  D20RollConfigurationDialog.MakeRenderContext<RenderContext>,
  D20RollConfigurationDialog.MakeConfiguration<Configuration>,
  D20RollConfigurationDialog.MakeRenderOptions<RenderOptions>
> { 
  __RollType: typeof dnd5e.dice.D20Roll

}

declare class AnyD20RollConfigurationDialog extends D20RollConfigurationDialog {
  constructor(...args: any[]);
}


declare namespace D20RollConfigurationDialog {
  interface Any extends AnyD20RollConfigurationDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyD20RollConfigurationDialog> {}

  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      buttons: Record<'advantage' | 'normal' | 'disadvantage', {
        default: boolean,
        label: string
      }>
    },
    dnd5e.types.IsExactly<Ctx, fvttUtils.AnyObject> extends true ? {} : Ctx
  >
  type RenderContext = D20RollConfigurationDialog['__RenderContext']

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    dnd5e.types.IsExactly<Cfg, fvttUtils.AnyObject> extends true ? {} : Cfg
  >
  type Configuration = D20RollConfigurationDialog['__Configuration']

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    dnd5e.types.IsExactly<Opt, fvttUtils.AnyObject> extends true ? {} : Opt
  >
  type RenderOptions = D20RollConfigurationDialog['__RenderOptions']
}

export default D20RollConfigurationDialog