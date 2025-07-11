import type { CreateInputFunction } from "../fields.d.mts";
import ApplicationV2Mixin from "./application-v2-mixin.mjs";

/**
 * Base application from which all system applications should be based.
 */
declare class Application5e<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends ApplicationV2Mixin(foundry.applications.api.ApplicationV2)<
  Application5e.MakeRenderContext<RenderContext>,
  Application5e.MakeConfiguration<Configuration>,
  Application5e.MakeRenderOptions<RenderOptions>
> {
  __Configuration: this[typeof foundry.applications.api.ApplicationV2.Internal.__Configuration]
  __RenderOptions: this[typeof foundry.applications.api.ApplicationV2.Internal.__RenderOptions]
  __RenderContext: this[typeof foundry.applications.api.ApplicationV2.Internal.__RenderContext]
}

declare class AnyApplication5e extends Application5e<fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject> {
  constructor(...args: any[])
}

declare namespace Application5e {
  interface Any extends AnyApplication5e { }
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyApplication5e> { }

  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.EnsureAnyIfNever<dnd5e.types.DeepMerge<
    ApplicationV2Mixin.RenderContext,
    Ctx
  >>
  type RenderContext = Application5e['__RenderContext']

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.EnsureAnyIfNever<dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.api.ApplicationV2.Configuration,
      ApplicationV2Mixin.Configuration
    >,
    Cfg
  >> & foundry.applications.api.ApplicationV2.Configuration
  type Configuration = Application5e['__Configuration']

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.EnsureAnyIfNever<dnd5e.types.DeepMerge<
    dnd5e.types.DeepMerge<
      foundry.applications.api.ApplicationV2.RenderOptions,
      ApplicationV2Mixin.RenderOptions
    >,
    Opt
  >> & foundry.applications.api.ApplicationV2.RenderOptions
  type RenderOptions = Application5e['__RenderOptions']

  type FieldsConfig = {
    field: foundry.data.fields.DataField.Any,
    name: string,
    value: any,
    input?: CreateInputFunction
    options?: dnd5e.types.FormSelectOption[]
    choices?: dnd5e.types.FormSelectOption[]
  }
}

export default Application5e