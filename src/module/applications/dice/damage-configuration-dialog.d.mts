/**
 * Dialog for configuring damage rolls.
 *
 * @param {dnd5e.types.Dice.DamageRollProcessConfiguration} [config={}]       Initial roll configuration.
 * @param {dnd5e.types.Dice.BasicRollMessageConfiguration} [message={}]       Message configuration.
 * @param {dnd5e.types.Dice.BasicRollConfigurationDialogOptions} [options={}]  Dialog rendering options.
 */

import RollConfigurationDialog from "./roll-configuration-dialog.mjs";
import DamageRoll from "../../dice/damage-roll.mjs";

declare class DamageRollConfigurationDialog<
  RenderContext extends object = DamageRollConfigurationDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = DamageRollConfigurationDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = DamageRollConfigurationDialog.RenderOptions,
> extends RollConfigurationDialog<RenderContext, Configuration, RenderOptions> {
  /** The roll type this dialog constructs. */
  static get rollType(): typeof DamageRoll;

  /** @override */
  protected override _prepareButtonsContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** @override */
  protected override _prepareFormulasContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /**
   * Prepare individual configuration object before building a roll.
   * @inheritDoc — overrides parent to read damageType from formData and set config.options.type
   */
  protected override _buildConfig(
    config: dnd5e.types.Dice.BasicRollConfiguration,
    formData: foundry.applications.ux.FormDataExtended | undefined,
    index: number,
  ): dnd5e.types.Dice.BasicRollConfiguration;

  /** @override */
  protected override _finalizeRolls(action: string): DamageRoll[];
}

declare namespace DamageRollConfigurationDialog {
  interface Any extends DamageRollConfigurationDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof DamageRollConfigurationDialog<any, any, any>> {}

  interface RenderContext extends Omit<RollConfigurationDialog.RenderContext, "buttons" | "rolls"> {
    buttons: {
      critical?: { default: boolean; icon: string; label: string };
      normal: { default: boolean; icon: string; label: string };
    };
    rolls: {
      roll: DamageRoll;
      damageConfig: dnd5e.types.Damage.Config | dnd5e.types.HealingType.Config | undefined;
      damageTypes: { value: dnd5e.types.Damage.TypeKey | dnd5e.types.HealingType.TypeKey; label: string }[] | null;
    }[];
  }
  interface Configuration extends RollConfigurationDialog.Configuration {}
  interface RenderOptions extends RollConfigurationDialog.RenderOptions {}
}

export default DamageRollConfigurationDialog;
