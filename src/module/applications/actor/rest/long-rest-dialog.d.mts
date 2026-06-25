/** Dialog for configuring a long rest. */

import BaseRestDialog from "./base-rest-dialog.mjs";

declare class LongRestDialog<
  RenderContext extends object = LongRestDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = LongRestDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = LongRestDialog.RenderOptions,
> extends BaseRestDialog<RenderContext, Configuration, RenderOptions> {}

declare namespace LongRestDialog {
  interface Any extends LongRestDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof LongRestDialog<any, any, any>> {}

  interface RenderContext extends BaseRestDialog.RenderContext {}
  interface Configuration extends BaseRestDialog.Configuration {}
  interface RenderOptions extends BaseRestDialog.RenderOptions {}
}

export default LongRestDialog;
