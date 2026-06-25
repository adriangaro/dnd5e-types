/** Application for configuration spell scroll creation. */

import Dialog5e from "../api/dialog.mjs";

declare class CreateScrollDialog<
  RenderContext extends object = CreateScrollDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = CreateScrollDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = CreateScrollDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  /** Configuration options for scroll creation. */
  get config(): dnd5e.types.documents.SpellScrollConfiguration | null;

  /** Spell from which the scroll will be created. */
  get spell(): Item.OfType<"spell"> | object;

  /**
   * Prepare rendering context for the content section.
   * @param context - Context being prepared.
   * @param options - Options which configure application rendering behavior.
   * @returns
   * @protected
   */
  _prepareContentContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /**
   * Display the create spell scroll dialog.
   * @param spell - The spell or item data to be made into a scroll.
   * @param config - Configuration options for scroll creation.
   * @param options - Additional options for the application.
   * @returns Form data object with results of the dialog.
   */
  static create(
    spell: Item.OfType<"spell"> | object,
    config: dnd5e.types.documents.SpellScrollConfiguration,
    options?: object,
  ): Promise<dnd5e.types.documents.SpellScrollConfiguration | null>;
}

declare namespace CreateScrollDialog {
  interface Any extends CreateScrollDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CreateScrollDialog<any, any, any>> {}

  interface RenderContext extends Dialog5e.RenderContext {
    anchor: string;
    config: dnd5e.types.documents.SpellScrollConfiguration | null;
    fields: dnd5e.applications.api.FieldsConfig[];
    values: {
      bonus: foundry.data.fields.DataField.Any;
      dc: foundry.data.fields.DataField.Any;
    };
    valuePlaceholders: dnd5e.types.SpellScrollValue.Config;
  }
  interface Configuration extends Dialog5e.Configuration {
    config?: dnd5e.types.documents.SpellScrollConfiguration | null;
    spell?: Item.OfType<"spell"> | object | null;
  }
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default CreateScrollDialog;
