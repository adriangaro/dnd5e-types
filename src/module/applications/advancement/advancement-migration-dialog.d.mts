/** Dialog to select which new advancements should be added to an item. */

import Dialog5e from "../api/dialog.mjs";

declare class AdvancementMigrationDialog<
  RenderContext extends object = AdvancementMigrationDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = AdvancementMigrationDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = AdvancementMigrationDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  /** Result of the migration dialog. */
  result: dnd5e.types.Advancement.Instance[] | null;

  /**
   * A helper constructor function which displays the migration dialog.
   * @param item        Item to which the advancements are being added.
   * @param advancements New advancements that should be displayed in the prompt.
   * @returns Resolves with the advancements that should be added, if any.
   * @throws
   */
  static createDialog(
    item: Item.Implementation,
    advancements: dnd5e.types.Advancement.Instance[],
  ): Promise<dnd5e.types.Advancement.Instance[]>;
}

declare namespace AdvancementMigrationDialog {
  interface Any extends AdvancementMigrationDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AdvancementMigrationDialog<any, any, any>> {}

  interface RenderContext extends Dialog5e.RenderContext {}
  interface Configuration extends Dialog5e.Configuration {
    /** New advancements that should be displayed in the prompt. */
    advancements?: dnd5e.types.Advancement.Instance[];
  }
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default AdvancementMigrationDialog;
