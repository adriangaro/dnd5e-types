/** Configuration application for armor class calculation. */

import BaseConfigSheet from "../api/base-config-sheet.mjs";

declare class ArmorClassConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = ArmorClassConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = ArmorClassConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = ArmorClassConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  get title(): string;

  /**
   * Prepare rendering context for the calculation section.
   * @param context - Context being prepared.
   * @param options - Options which configure application rendering behavior.
   * @returns The updated render context.
   * @protected
   */
  protected _prepareCalculationContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /**
   * Prepare rendering context for the configuration section.
   * @param context - Context being prepared.
   * @param options - Options which configure application rendering behavior.
   * @returns The updated render context.
   * @protected
   */
  protected _prepareConfigurationContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;
}

declare namespace ArmorClassConfig {
  interface Any extends ArmorClassConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ArmorClassConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    data: dnd5e.types.PathValue<Document, "system.attributes.ac">;
    fields: foundry.data.fields.DataSchema;
    source: dnd5e.types.SourceOf<dnd5e.types.Actor.Attributes.ArmorClassSchema>;
    ability?: { label: string; value: number };
    calculations?: Array<{
      anchor: string;
      img: string;
      magicalBonus: string;
      name: string;
      value: string;
    }>;
    formulaLabel?: string;
    customFormulas?: Array<{
      source: object;
      fields: foundry.data.fields.DataSchema;
      limitFields: Array<{
        classes: string;
        field: foundry.data.fields.StringField;
        name: string;
        options: Array<{ value: null | boolean; label: string }>;
        value: unknown;
      }>;
      prefix: string;
    }>;
    formulaOptions?: Array<{ value: dnd5e.types.ArmorClass.TypeKey; label: string }>;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default ArmorClassConfig;
