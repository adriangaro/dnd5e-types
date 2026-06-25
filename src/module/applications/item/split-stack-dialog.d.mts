/** Small dialog for splitting a stack of items into two. */

import Dialog5e from "../api/dialog.mjs";

declare class SplitStackDialog<
  RenderContext extends object = SplitStackDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = SplitStackDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = SplitStackDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {}

declare namespace SplitStackDialog {
  interface Any extends SplitStackDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SplitStackDialog<any, any, any>> {}

  interface RenderContext extends Dialog5e.RenderContext {
    max: number;
    left: number;
    right: number;
  }
  interface Configuration extends Dialog5e.Configuration {
    document: Item.Implementation | null;
  }
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default SplitStackDialog;
