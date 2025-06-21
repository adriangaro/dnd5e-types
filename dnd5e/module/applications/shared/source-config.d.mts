import DocumentSheet5e from "../api/document-sheet.mjs";

/**
 * Application for configuring the source data on actors and items.
 */
declare class SourceConfig<
  Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {}
> extends DocumentSheet5e<
  Document,
  SourceConfig.MakeRenderContext<RenderContext>,
  SourceConfig.MakeConfiguration<Configuration>,
  SourceConfig.MakeRenderOptions<RenderOptions>
> {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The title of the application.
   */
  get title(): string;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare context data for rendering the source configuration.
   * @param options  Render options.
   * @returns        Prepared context data.
   * @protected
   */
  protected _prepareContext(options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;
}

declare class AnySourceConfig extends SourceConfig<any, any, any, any> {
  constructor(...args: any[]);
}

declare namespace SourceConfig {
  interface Any extends AnySourceConfig {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnySourceConfig> {}

  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      buttons: {
        icon: string;
        label: string;
        type: string;
      }[];
      data: any;
      fields: foundry.data.fields.DataSchema;
      keyPath: string;
      source: any;
      sourceUuid?: string;
      sourceAnchor?: string;
      rulesVersions: {
        value: string;
        label: string;
      }[];
      identifier?: {
        field: foundry.data.fields.DataField.Any;
        placeholder: string;
        value: string;
      };
    },
    Ctx
  >;
  type RenderContext = SourceConfig['__RenderContext'];

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      keyPath?: string;
    },
    Cfg
  >;
  type Configuration = SourceConfig['__Configuration'];

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {},
    Opt
  >;
  type RenderOptions = SourceConfig['__RenderOptions'];
}

export default SourceConfig;
