/** Dialog to confirm the deletion of an embedded item with advancement or decreasing a class level. */

import Dialog5e from "../api/dialog.mjs";

declare class AdvancementConfirmationDialog<
  RenderContext extends object = AdvancementConfirmationDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = AdvancementConfirmationDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = AdvancementConfirmationDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  /** Result of the deletion dialog. */
  result: boolean | null;

  /**
   * A helper function that displays the dialog prompting for an item deletion.
   * @param item - Item to be deleted.
   * @param options - Additional options.
   * @param options.sheet - Sheet to render the dialog as a child of.
   * @returns Resolves with whether advancements should be unapplied. Rejects with null.
   */
  static forDelete(
    item: Item.Implementation,
    options?: { sheet?: foundry.applications.api.ApplicationV2.Any },
  ): Promise<boolean | null>;

  /**
   * A helper function that displays the dialog prompting for leveling down.
   * @param item - The class whose level is being changed.
   * @param options - Additional options.
   * @param options.sheet - Sheet to render the dialog as a child of.
   * @returns Resolves with whether advancements should be unapplied. Rejects with null.
   */
  static forLevelDown(
    item: Item.Implementation,
    options?: { sheet?: foundry.applications.api.ApplicationV2.Any },
  ): Promise<boolean | null>;

  /** A helper constructor function which displays the confirmation dialog. */
  static createDialog(config: {
    item: Item.Implementation;
    title: string;
    message: string;
    continueButton: { icon: string; label: string };
    sheet?: foundry.applications.api.ApplicationV2.Any;
  }): Promise<boolean | null>;
}

declare namespace AdvancementConfirmationDialog {
  interface Any extends AdvancementConfirmationDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AdvancementConfirmationDialog<any, any, any>> {}

  interface RenderContext extends Dialog5e.RenderContext {}
  interface Configuration extends Dialog5e.Configuration {}
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default AdvancementConfirmationDialog;
