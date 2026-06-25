/** Configuration application for actor's tools. */

import TraitsConfig from "./traits-config.mjs";

declare class ToolsConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = ToolsConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = ToolsConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = ToolsConfig.RenderOptions,
> extends TraitsConfig<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace ToolsConfig {
  interface Any extends ToolsConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ToolsConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.RenderContext<Document> {}
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.Configuration<Document> {}
  interface RenderOptions extends TraitsConfig.RenderOptions {}
}

export default ToolsConfig;
