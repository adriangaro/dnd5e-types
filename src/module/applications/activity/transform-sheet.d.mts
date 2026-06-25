/** Sheet for the summon activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class TransformSheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"transform">,
  RenderContext extends object = TransformSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = TransformSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = TransformSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace TransformSheet {
  interface Any extends TransformSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof TransformSheet<any, any, any, any>> {}

  type ProfileElement = dnd5e.types.Activity.Transform.Schema["profiles"][" __fvtt_types_get_field_element"];
  type ProfileFields = ProfileElement["fields"];

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"transform">>
    extends ActivitySheet.RenderContext<Document> {
    categories: ReturnType<dnd5e.dataModels.settings.TransformationSetting["createFormCategories"]>;
    presetOptions: foundry.applications.fields.FormSelectOption[];
    creatureSizeOptions: foundry.applications.fields.FormSelectOption[];
    creatureTypeOptions: foundry.applications.fields.FormSelectOption[];
    movementTypeOptions: foundry.applications.fields.FormSelectOption[];
    profileModes: foundry.applications.fields.FormSelectOption[];
    profiles: {
      data: foundry.data.fields.SchemaField.InitializedData<ProfileFields>;
      index: number;
      collapsed: string;
      document: Actor.Implementation | null;
      fields: ProfileFields;
      prefix: string;
      source: foundry.data.fields.SchemaField.SourceData<ProfileFields>;
    }[];
  }
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default TransformSheet;
