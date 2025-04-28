import DocumentSheet5e from "./api/document-sheet.mjs";

/**
 * Application for configuring the source data on actors and items.
 */
declare class SourceConfig<
  Document extends foundry.abstract.Document.Any,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends DocumentSheet5e<
  Document,
  SourceConfig.RenderContext<Document, RenderContext>,
  SourceConfig.Configuration<Document, Configuration>,
  SourceConfig.RenderOptions<RenderOptions>
> {}


declare namespace SourceConfig {
  type RenderContext<
    Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      buttons: {
        icon: string,
        label: string,
        type: string
      }[],
      data: any,
      fields: foundry.data.fields.DataSchema,
      keyPath: string,
      source: dnd5e.types.GetKey<Document['system'], '_source'>,
      sourceUuid?: string,
      sourceAnchor?: string,
      rulesVersions: {value: string, label: string}[],
      identifier?: {
        field: foundry.data.fields.DataField,
        placeholder: string,
        value: string
      }
    },
    Ctx
  >
  type Configuration<
    Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type RenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
}


export default SourceConfig