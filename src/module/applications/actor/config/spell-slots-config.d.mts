/** Configuration application for overriding actor spell slots. */

import BaseConfigSheet from "../api/base-config-sheet.mjs";

declare class SpellSlotsConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = SpellSlotsConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = SpellSlotsConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = SpellSlotsConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  get title(): string;
}

declare namespace SpellSlotsConfig {
  interface Any extends SpellSlotsConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SpellSlotsConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    overrides: {
      value: number | undefined;
      label: string;
      name: string;
      placeholder: number;
    }[];
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default SpellSlotsConfig;
