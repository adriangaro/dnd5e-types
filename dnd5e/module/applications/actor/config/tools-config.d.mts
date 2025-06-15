import SkillToolConfig from "./skill-tool-config.mjs";
import TraitsConfig from "./traits-config.mjs";

/**
 * Configuration application for actor's tools.
 */
declare class ToolsConfig<
  Document extends ToolsConfig.ValidDocument = ToolsConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends TraitsConfig<
  'tool',
  Document,
  ToolsConfig.MakeRenderContext<RenderContext, Document>,
  ToolsConfig.MakeConfiguration<Configuration>,
  ToolsConfig.MakeRenderOptions<RenderOptions>
> {

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Open the configuration sheet for a tool.
   * @this {ToolsConfig}
   * @param event         Triggering click event.
   * @param target  Button that was clicked.
   */
  static #configureTool(this: ToolsConfig, event: Event, target: HTMLElement)
}

declare namespace ToolsConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { tools: any } }>
  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
    {
      
    },
    Ctx
  >;
  type RenderContext = ToolsConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = ToolsConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = ToolsConfig['__RenderOptions'];
}

export default ToolsConfig;
