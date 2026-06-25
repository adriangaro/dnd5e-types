/** Configuration application for an actor's death saving throws. */

import BaseConfigSheet from "../api/base-config-sheet.mjs";

declare class DeathConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = DeathConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = DeathConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = DeathConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  /** @override */
  get title(): string;
}

declare namespace DeathConfig {
  interface Any extends DeathConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof DeathConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    data: object;
    fields: foundry.data.fields.DataSchema;
    global?: {
      data: object;
      fields: foundry.data.fields.DataSchema;
    };
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default DeathConfig;
