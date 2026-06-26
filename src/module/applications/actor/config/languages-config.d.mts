/** Configuration application for languages. */

import TraitsConfig from "./traits-config.mjs";

/** Configuration application for languages. */
declare class LanguagesConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = LanguagesConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = LanguagesConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = LanguagesConfig.RenderOptions,
> extends TraitsConfig<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace LanguagesConfig {
  interface Any extends LanguagesConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof LanguagesConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.RenderContext<Document> {
    // `trait: "languages"` is pinned, so the edited slice is statically known.
    // `Extract<…, object>` keeps the override assignable to the base's `data: object` under the
    // generic `Document` constraint (where `PathValue` widens to `unknown`); concrete docs get the slice.
    data: Extract<dnd5e.types.PathValue<Document, "system._source.traits.languages">, object>;
    communication: {
      label: string;
      unitOptions: foundry.applications.fields.FormSelectOption[];
      data: dnd5e.types.data.actor.templates.LanguageCommunicationData;
      fields: {
        units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey | "", { required: true; blank: true }>;
        value: foundry.data.fields.NumberField<{ required: true; min: 0 }>;
      };
      keyPath: string;
    }[];
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.Configuration<Document> {}
  interface RenderOptions extends TraitsConfig.RenderOptions {}
}

export default LanguagesConfig;
