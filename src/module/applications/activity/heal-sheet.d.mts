/** Sheet for the healing activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class HealSheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"heal">,
  RenderContext extends object = HealSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = HealSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = HealSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace HealSheet {
  interface Any extends HealSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof HealSheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"heal">>
    extends ActivitySheet.RenderContext<Document> {
    typeOptions: { value: dnd5e.types.HealingType.TypeKey; label: string; selected: boolean }[];
    scalingOptions: { value: "" | dnd5e.types.DamageScalingMode.TypeKey; label: string }[];
  }
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default HealSheet;
