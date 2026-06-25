/** Dialog for configuring a short rest. */

import BaseRestDialog from "./base-rest-dialog.mjs";

declare class ShortRestDialog<
  RenderContext extends object = ShortRestDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ShortRestDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ShortRestDialog.RenderOptions,
> extends BaseRestDialog<RenderContext, Configuration, RenderOptions> {}

declare namespace ShortRestDialog {
  interface Any extends ShortRestDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ShortRestDialog<any, any, any>> {}

  interface RenderContext extends BaseRestDialog.RenderContext {
    autoRoll: foundry.data.fields.BooleanField;
    hitDice?: {
      canRoll: boolean;
      denomination?: string;
      options: (foundry.applications.fields.FormSelectOption & { number?: number })[];
    };
    denomination?: string;
  }
  interface Configuration extends BaseRestDialog.Configuration {}
  interface RenderOptions extends BaseRestDialog.RenderOptions {}
}

export default ShortRestDialog;
