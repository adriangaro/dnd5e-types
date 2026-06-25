/**
 * Base document sheet from which all document-based application should be based.
 *
 * Generic over the bound `Document` plus open `RenderContext`/`Configuration`/`RenderOptions`
 * interfaces (the `RenderContext`/`Configuration` are parameterised by `Document`). Composition is
 * plain `interface extends` — no `Make*`/merge machinery. See {@link Application5e} for the pattern.
 */

import ApplicationV2Mixin from "./application-v2-mixin.mjs";

declare class DocumentSheet5e<
  Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
  RenderContext extends object = DocumentSheet5e.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = DocumentSheet5e.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = DocumentSheet5e.RenderOptions,
> extends ApplicationV2Mixin(foundry.applications.api.DocumentSheetV2)<
  Document,
  RenderContext,
  Configuration,
  RenderOptions
> {}

declare namespace DocumentSheet5e {
  interface Any extends DocumentSheet5e<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof DocumentSheet5e<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any>
    extends ApplicationV2Mixin.RenderContext,
      foundry.applications.api.DocumentSheetV2.RenderContext<Document> {}

  interface Configuration<Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any>
    extends foundry.applications.api.DocumentSheetV2.Configuration<Document>,
      ApplicationV2Mixin.Configuration {}

  interface RenderOptions
    extends ApplicationV2Mixin.RenderOptions,
      foundry.applications.api.DocumentSheetV2.RenderOptions {}
}

export default DocumentSheet5e;
