import RollConfigurationDialog from "./roll-configuration-dialog.mjs";

/**
 * Dialog for configuring damage rolls.
 *
 */
export default class DamageRollConfigurationDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends RollConfigurationDialog<
  typeof dnd5e.dice.DamageRoll<{}, {}, {}, {}, {}>,
  DamageRollConfigurationDialog.MakeRenderContext<RenderContext>,
  DamageRollConfigurationDialog.MakeConfiguration<Configuration>,
  DamageRollConfigurationDialog.MakeRenderOptions<RenderOptions>
> {}

declare class AnyDamageRollConfigurationDialog extends DamageRollConfigurationDialog<{}, {}, {}> {
  constructor(...args: any[]);
}

declare namespace DamageRollConfigurationDialog {
  interface Any extends AnyDamageRollConfigurationDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyDamageRollConfigurationDialog> {}
  
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      buttons: Record<'critical' | 'normal', {
        default: boolean,
        icon: string,
        label: string
      }>,
      rolls: {
        damageConfig: dnd5e.types.Damage.DamageTypeConfig | dnd5e.types.Healing.HealingTypeConfig | null,
        damageTypes: {
          value: dnd5e.types.Damage.TypeKey | dnd5e.types.Healing.TypeKey | (string & {})
        }[]
      }[]
    },
    Ctx
  >
  type RenderContext = DamageRollConfigurationDialog['__RenderContext']


  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = DamageRollConfigurationDialog['__Configuration']

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = DamageRollConfigurationDialog['__RenderOptions']
}