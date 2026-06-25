/** Sheet for the cast activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class CastSheet<
  Document extends dnd5e.types.Activity.OfType<'cast'> = dnd5e.types.Activity.OfType<'cast'>,
  RenderContext extends object = CastSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = CastSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = CastSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace CastSheet {
  interface Any extends CastSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CastSheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.OfType<'cast'> = dnd5e.types.Activity.OfType<'cast'>>
    extends ActivitySheet.RenderContext<Document> {
    spell: Item.OfType<'spell'> | null;
    contentLink?: string;
    levelOptions?: foundry.applications.fields.FormSelectOption[];
    abilityOptions: foundry.applications.fields.FormSelectOption[];
    propertyOptions: foundry.applications.fields.FormSelectOption[];
    behaviorFields: { field: foundry.data.fields.DataField.Any; value: unknown; input: ActivitySheet.RenderContext<Document>["inputs"]["createCheckboxInput"] }[];
    placeholder: { name: string; img: string };
  }
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default CastSheet;
