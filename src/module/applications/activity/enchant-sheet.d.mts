/** Sheet for the enchant activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class EnchantSheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"enchant">,
  RenderContext extends object = EnchantSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = EnchantSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = EnchantSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {
  override tabGroups: { sheet: string; activation: string; effect: string };
}

declare namespace EnchantSheet {
  interface Any extends EnchantSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof EnchantSheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"enchant">>
    extends ActivitySheet.RenderContext<Document> {
    allEnchantments: foundry.applications.fields.FormSelectOption[];
    typeOptions: foundry.applications.fields.FormSelectOption[];
    isTypePhysical: boolean;
    categoryOptions?: foundry.applications.fields.FormSelectOption[];
    propertyOptions: foundry.applications.fields.FormSelectOption[];
  }
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default EnchantSheet;
