import ApplicationV2Mixin from "./application-v2-mixin.mjs";

/**
 * Base document sheet from which all document-based application should be based.
 */
declare class DocumentSheet5e<
  Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends ApplicationV2Mixin(foundry.applications.api.DocumentSheetV2)<
  Document,
  DocumentSheet5e.MakeRenderContext<Document, RenderContext>,
  DocumentSheet5e.MakeConfiguration<Document, Configuration>,
  DocumentSheet5e.MakeRenderOptions<RenderOptions>
> {
  __Document: Document;
  __Configuration: this[typeof foundry.applications.api.ApplicationV2.Internal.__Configuration]
  __RenderOptions: this[typeof foundry.applications.api.ApplicationV2.Internal.__RenderOptions]
  __RenderContext: this[typeof foundry.applications.api.ApplicationV2.Internal.__RenderContext]

  // Overrides no longer seem to be needed as issue is fixed in fvtt-types
  
  // _prepareContext(options: fvttUtils.DeepPartial<this['__RenderOptions']> & { isFirstRender: boolean }): Promise<this['__RenderContext']>;

  // override _renderHTML(
  //   context: this['__RenderContext'],
  //   options: fvttUtils.DeepPartial<this['__RenderOptions']>,
  // ): Promise<Record<string, HTMLElement>>;

  
  // override _preparePartContext(
  //   partId: string,
  //   context: this['__RenderContext'],
  //   options: fvttUtils.DeepPartial<this['__RenderOptions']>,
  // ): Promise<this['__RenderContext']>;
}
declare class AnyDocumentSheet5e extends DocumentSheet5e<any, fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject> {
  constructor(...args: any[])
}

export default DocumentSheet5e

declare namespace DocumentSheet5e {
  interface Any extends AnyDocumentSheet5e { }
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyDocumentSheet5e> { }

  type MakeRenderContext<
    Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.api.DocumentSheetV2.RenderContext<Document>,
      ApplicationV2Mixin.RenderOptions
    >,
    Ctx
  > & foundry.applications.api.DocumentSheetV2.RenderContext<Document>
  type RenderContext = DocumentSheet5e['__RenderContext']
  type MakeConfiguration<
    Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.api.DocumentSheetV2.Configuration<Document>,
      ApplicationV2Mixin.Configuration
    >,
    Cfg
  > & foundry.applications.api.DocumentSheetV2.Configuration<Document>
  type Configuration = DocumentSheet5e['__Configuration']
  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.api.DocumentSheetV2.RenderOptions,
      ApplicationV2Mixin.RenderOptions
    >,
    Opt
  > & foundry.applications.api.DocumentSheetV2.RenderOptions
  type RenderOptions = DocumentSheet5e['__RenderOptions']
}