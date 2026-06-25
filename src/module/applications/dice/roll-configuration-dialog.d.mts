/**
 * Dialog for configuring one or more rolls.
 *
 * Base dialog for configuring a roll before it is evaluated (the parent of the d20/attack/damage/
 * skill-tool dialogs). A {@link Dialog5e}; generic & subclassable via the open interfaces.
 */

import Dialog5e from "../api/dialog.mjs";
import type BasicRoll from "../../dice/basic-roll.mjs";

declare class RollConfigurationDialog<
  RenderContext extends object = RollConfigurationDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = RollConfigurationDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = RollConfigurationDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  constructor(
    config?: dnd5e.types.Dice.BasicRollProcessConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
    options?: Configuration,
  );

  /** @override */
  static PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart>;

  /** The roll type this dialog constructs. */
  static get rollType(): typeof BasicRoll;

  /** Roll configuration. */
  get config(): dnd5e.types.Dice.BasicRollProcessConfiguration;

  /** Configuration information for the roll message. */
  get message(): dnd5e.types.Dice.BasicRollMessageConfiguration;

  /** The rolls being configured. */
  get rolls(): BasicRoll[];

  /** Roll type to use when constructing the rolls. */
  get rollType(): typeof BasicRoll;

  /** Identify DiceTerms in this app's rolls. */
  protected _identifyDiceTerms(): { icon: string; label: string; denomination?: string }[];

  /** Prepare the context for the buttons. */
  protected _prepareButtonsContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Prepare the context for the roll configuration section. */
  protected _prepareConfigurationContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Prepare the context for the formulas list. */
  protected _prepareFormulasContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Prepare individual configuration object before building a roll. */
  protected _buildConfig(
    config: dnd5e.types.Dice.BasicRollConfiguration,
    formData: foundry.applications.ux.FormDataExtended | undefined,
    index: number,
  ): dnd5e.types.Dice.BasicRollConfiguration;

  /** Make any final modifications to rolls based on the button clicked. */
  protected _finalizeRolls(action: string | undefined): BasicRoll[];

  /** Rebuild rolls based on an updated config and re-render the dialog. */
  rebuild(): void;

  /** A helper to handle displaying and responding to the dialog. */
  static configure(
    config?: dnd5e.types.Dice.BasicRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<BasicRoll[]>;
}

declare namespace RollConfigurationDialog {
  interface Any extends RollConfigurationDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof RollConfigurationDialog<any, any, any>> {}

  interface RenderContext extends Omit<Dialog5e.RenderContext, "buttons"> {
    buttons: Record<string, Dialog5e.Button>;
    fields: dnd5e.applications.api.FieldsConfig[];
    rolls: { roll: BasicRoll }[];
    dice: { icon: string; label: string; denomination?: string }[];
  }
  interface Configuration
    extends Dialog5e.Configuration,
      dnd5e.types.Dice.BasicRollConfigurationDialogOptions {}
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default RollConfigurationDialog;
