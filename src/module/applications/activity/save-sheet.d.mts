/** Sheet for the save activity. */

import ActivitySheet from "./activity-sheet.mjs";

/** Sheet for the save activity. */
declare class SaveSheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"save">,
  RenderContext extends object = SaveSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = SaveSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = SaveSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace SaveSheet {
  interface Any extends SaveSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SaveSheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"save">>
    extends ActivitySheet.RenderContext<Document> {
    abilityOptions: foundry.applications.fields.FormSelectOption[];
    calculationOptions: foundry.applications.fields.FormSelectOption[];
    onSaveOptions: foundry.applications.fields.FormSelectOption[];
  }
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default SaveSheet;
