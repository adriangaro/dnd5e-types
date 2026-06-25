/** Sheet for the summon activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class SummonSheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"summon">,
  RenderContext extends object = SummonSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = SummonSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = SummonSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace SummonSheet {
  interface Any extends SummonSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SummonSheet<any, any, any, any>> {}

  /** The summon-profile SchemaField element type from the summon activity schema. */
  type ProfileElement = dnd5e.types.Activity.Summon.Schema["profiles"][" __fvtt_types_get_field_element"];
  /** The DataField record for the summon-profile element schema. */
  type ProfileFields = ProfileElement["fields"];

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"summon">>
    extends ActivitySheet.RenderContext<Document> {
    abilityOptions: foundry.applications.fields.FormSelectOption[];
    creatureSizeOptions: foundry.applications.fields.FormSelectOption[];
    creatureTypeOptions: foundry.applications.fields.FormSelectOption[];
    profileModes: foundry.applications.fields.FormSelectOption[];
    profiles: Array<{
      data: foundry.data.fields.SchemaField.InitializedData<ProfileFields>;
      index: number;
      collapsed: string;
      fields: ProfileFields;
      prefix: string;
      source: foundry.data.fields.SchemaField.SourceData<ProfileFields>;
      document: foundry.abstract.Document.Any | null;
      mode: string;
      typeOptions: foundry.applications.fields.FormSelectOption[] | null;
    }>;
  }
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default SummonSheet;
