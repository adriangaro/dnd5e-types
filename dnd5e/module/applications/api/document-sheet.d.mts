import ApplicationV2Mixin from "./application-v2-mixin.mjs";

/**
 * Base document sheet from which all document-based application should be based.
 */
export default class DocumentSheet5e<
  Document extends foundry.abstract.Document.Any | foundry.applications.api.DocumentSheetV2.UnsetDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends ApplicationV2Mixin(foundry.applications.api.DocumentSheetV2)<
  Document,
  DocumentSheet5e.RenderContext<RenderContext>,
  DocumentSheet5e.Configuration<Document, Configuration>,
  DocumentSheet5e.RenderOptions<RenderOptions>
> { }

declare namespace DocumentSheet5e {
  type RenderContext<Ctx extends fvttUtils.AnyObject = {}> =  dnd5e.types.DeepMerge<
    ApplicationV2Mixin.RenderContext,
    Ctx
  >
  type Configuration<
    Document extends foundry.abstract.Document.Any | foundry.applications.api.DocumentSheetV2.UnsetDocument = foundry.applications.api.DocumentSheetV2.UnsetDocument,
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.api.DocumentSheetV2.Configuration<Document>,
      ApplicationV2Mixin.Configuration
    >,
    Cfg
  > & foundry.applications.api.DocumentSheetV2.Configuration<Document>
  type RenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.api.DocumentSheetV2.RenderOptions,
      ApplicationV2Mixin.RenderOptions
    >,
    Opt
  > & foundry.applications.api.DocumentSheetV2.RenderOptions
}