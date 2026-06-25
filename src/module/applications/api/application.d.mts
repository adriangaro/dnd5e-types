/**
 * Base application from which all system applications should be based.
 *
 * EXPANDABILITY / SUBCLASSING: the class is generic over `RenderContext`/`Configuration`/
 * `RenderOptions`, each DEFAULTING to an open interface in the namespace below. A consumer adds
 * fields to this app's context by declaration-merging `Application5e.RenderContext`; a subclass
 * supplies its OWN namespace interface (chained via `interface extends`) as the type argument. No
 * `Make*`/merge machinery — composition is plain `interface extends`.
 */

import type { CreateInputFunction } from "../fields.mjs";
import ApplicationV2Mixin from "./application-v2-mixin.mjs";

declare class Application5e<
  RenderContext extends object = Application5e.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = Application5e.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = Application5e.RenderOptions,
> extends ApplicationV2Mixin(foundry.applications.api.ApplicationV2)<RenderContext, Configuration, RenderOptions> {}

declare namespace Application5e {
  interface Any extends Application5e<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof Application5e<any, any, any>> {}

  /** Render context for `Application5e`. Open for declaration merging; extended by subclasses. */
  interface RenderContext extends ApplicationV2Mixin.RenderContext {}

  /** Configuration for `Application5e`. Open for declaration merging; extended by subclasses. */
  interface Configuration extends foundry.applications.api.ApplicationV2.Configuration, ApplicationV2Mixin.Configuration {}

  /** Render options for `Application5e`. Open for declaration merging; extended by subclasses. */
  interface RenderOptions extends ApplicationV2Mixin.RenderOptions {}

  /** Descriptor for a field rendered through the 5e input helpers. */
  interface FieldsConfig {
    field: foundry.data.fields.DataField.Any;
    name: string;
    value: any;
    input?: CreateInputFunction;
    localize?: boolean;
    options?: foundry.applications.fields.FormSelectOption[];
    choices?: foundry.data.fields.StringField.Choices;
  }
}

export default Application5e;
