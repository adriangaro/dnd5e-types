/** Dialog that allows setting the current date. */

import Dialog5e from "../api/dialog.mjs";

declare class SetDateDialog<
  RenderContext extends object = SetDateDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = SetDateDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = SetDateDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {}

declare namespace SetDateDialog {
  interface Any extends SetDateDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SetDateDialog<any, any, any>> {}

  interface RenderContext extends Dialog5e.RenderContext {
    fields: dnd5e.applications.api.FieldsConfig[];
  }
  interface Configuration extends Dialog5e.Configuration {}
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default SetDateDialog;
