import RollConfigurationDialog from "./roll-configuration-dialog.mjs";

/**
 * Dialog for configuring damage rolls.
 *
 * @param {DamageRollProcessConfiguration} [config={}]        Initial roll configuration.
 * @param {BasicRollMessageConfiguration} [message={}]        Message configuration.
 * @param {BasicRollConfigurationDialogOptions} [options={}]  Dialog rendering options.
 */
export default class DamageRollConfigurationDialog<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends RollConfigurationDialog<
  dnd5e.dice.DamageRoll.DefaultConstructor,
  DamageRollConfigurationDialog.RenderContext<RenderContext>,
  DamageRollConfigurationDialog.Configuration<Configuration>,
  DamageRollConfigurationDialog.RenderOptions<RenderOptions>
> {}

declare class AnyDamageRollConfigurationDialog extends DamageRollConfigurationDialog<{}, {}, {}> {
  constructor(...args: never);
}

declare namespace DamageRollConfigurationDialog {
  interface Any extends AnyDamageRollConfigurationDialog {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyDamageRollConfigurationDialog> {}
  
  type RenderContext<
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