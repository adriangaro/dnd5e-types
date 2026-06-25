/** Sheet for the forward activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class ForwardSheet<
  Document extends dnd5e.types.Activity.OfType<"forward"> = dnd5e.types.Activity.OfType<"forward">,
  RenderContext extends object = ForwardSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ForwardSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ForwardSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {
  /**
   * Prepare the tab information for the sheet.
   * @returns {Record<string, Partial<ApplicationTab>>}
   * @protected
   */
  protected _getTabs(): Record<string, Partial<foundry.applications.api.ApplicationV2.Tab>>;
}

declare namespace ForwardSheet {
  interface Any extends ForwardSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ForwardSheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.OfType<"forward"> = dnd5e.types.Activity.OfType<"forward">>
    extends ActivitySheet.RenderContext<Document> {
    activityOptions: foundry.applications.fields.FormSelectOption[];
    behaviorFields: { field: foundry.data.fields.DataField.Any; value: unknown; input: ActivitySheet.RenderContext<Document>["inputs"]["createCheckboxInput"] }[];
    showConsumeSpellSlot: boolean;
    showScaling: boolean;
  }
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default ForwardSheet;
