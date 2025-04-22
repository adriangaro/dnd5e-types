import ApplicationV2Mixin from "./application-v2-mixin.mjs";

/**
 * Base application from which all system applications should be based.
 */
declare class Application5e<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends ApplicationV2Mixin(foundry.applications.api.ApplicationV2)<
  Application5e.RenderContext<RenderContext>,
  Application5e.Configuration<Configuration>,
  Application5e.RenderOptions<RenderOptions>
> {
  __Configuration: Application5e.Configuration<Configuration>;
  __RenderOptions: Application5e.RenderOptions<RenderOptions>;
  __RenderContext: Application5e.RenderContext<RenderContext>;
}


declare namespace Application5e {
  type RenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    ApplicationV2Mixin.RenderContext,
    Ctx
  >
  type Configuration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.api.ApplicationV2.Configuration,
      ApplicationV2Mixin.Configuration
    >,
    Cfg
  > & foundry.applications.api.ApplicationV2.Configuration
  type RenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.api.ApplicationV2.RenderOptions,
      ApplicationV2Mixin.RenderOptions
    >,
    Opt
  > & foundry.applications.api.ApplicationV2.RenderOptions
}

export default Application5e