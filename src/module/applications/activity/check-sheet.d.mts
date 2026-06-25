/** Sheet for the check activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class CheckSheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"check">,
  RenderContext extends object = CheckSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = CheckSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = CheckSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace CheckSheet {
  interface Any extends CheckSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CheckSheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"check">>
    extends ActivitySheet.RenderContext<Document> {
    abilityOptions: foundry.applications.fields.FormSelectOption[];
    associatedOptions: foundry.applications.fields.FormSelectOption[];
    calculationOptions: foundry.applications.fields.FormSelectOption[];
  }
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default CheckSheet;
