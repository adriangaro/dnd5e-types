/** Sheet for the damage activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class DamageSheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"damage">,
  RenderContext extends object = DamageSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = DamageSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = DamageSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace DamageSheet {
  interface Any extends DamageSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof DamageSheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"damage">>
    extends ActivitySheet.RenderContext<Document> {}
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default DamageSheet;
