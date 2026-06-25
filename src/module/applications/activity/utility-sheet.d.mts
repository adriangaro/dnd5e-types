/** Sheet for the utility activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class UtilitySheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"utility">,
  RenderContext extends object = UtilitySheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = UtilitySheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = UtilitySheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace UtilitySheet {
  interface Any extends UtilitySheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof UtilitySheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"utility">>
    extends ActivitySheet.RenderContext<Document> {}
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default UtilitySheet;
