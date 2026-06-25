import BaseConfigSheet from "../api/base-config-sheet.mjs";

declare class HabitatConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = HabitatConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = HabitatConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = HabitatConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  get title(): string;
}

declare namespace HabitatConfig {
  interface Any extends HabitatConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof HabitatConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    custom: {
      field: foundry.data.fields.StringField;
      value: string;
      name: string;
    };
    habitats: Array<{
      label: string;
      id: dnd5e.types.Habitat.TypeKey;
      checked: boolean;
      disabled?: boolean;
      subtype?: string;
      subtypes?: boolean;
    }>;
    rows: number;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default HabitatConfig;
