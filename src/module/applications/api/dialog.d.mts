/**
 * Application for creating dnd5e dialogs.
 *
 * Adds a `buttons` array to context/config/options and content/footer context hooks. Generic over
 * open namespace interfaces that chain off `Application5e`'s via `interface extends`.
 */

import Application5e from "./application.mjs";

declare class Dialog5e<
  RenderContext extends object = Dialog5e.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = Dialog5e.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = Dialog5e.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /** Prepare rendering context for the content section. */
  _prepareContentContext(context: RenderContext, options: fvttUtils.DeepPartial<RenderOptions>): Promise<RenderContext>;

  /** Prepare rendering context for the footer. */
  _prepareFooterContext(context: RenderContext, options: fvttUtils.DeepPartial<RenderOptions>): Promise<RenderContext>;
}

declare namespace Dialog5e {
  interface Any extends Dialog5e<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof Dialog5e<any, any, any>> {}

  /**
   * A dialog button descriptor as supplied by callers (input shape).
   * `cssClass` is NOT part of the input — it is computed by `_prepareFooterContext`
   * as `button.class` and lives only in the rendered context.
   */
  interface Button {
    action?: string;
    label: string;
    icon?: string;
    class?: string;
    default?: boolean;
    type?: HTMLButtonElement["type"];
  }

  /**
   * A dialog button as it appears in the rendered context after `_prepareFooterContext`
   * has spread the input button and added `cssClass: button.class`.
   */
  interface RenderedButton extends Button {
    /** Computed from `button.class` by `_prepareFooterContext`; never supplied by callers. */
    cssClass?: string;
  }

  interface RenderContext extends Application5e.RenderContext {
    buttons: RenderedButton[];
    content: string;
  }
  interface Configuration extends Application5e.Configuration {
    buttons?: Button[];
    content?: string;
    templates?: string[];
  }
  interface RenderOptions extends Application5e.RenderOptions {
    buttons?: Button[];
  }
}

export default Dialog5e;
