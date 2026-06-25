/** Dialog for configuring d20 rolls. */

import RollConfigurationDialog from "./roll-configuration-dialog.mjs";
import type D20Roll from "../../dice/d20-roll.mjs";

declare class D20RollConfigurationDialog<
  RenderContext extends object = D20RollConfigurationDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = D20RollConfigurationDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = D20RollConfigurationDialog.RenderOptions,
> extends RollConfigurationDialog<RenderContext, Configuration, RenderOptions> {
  static get rollType(): typeof D20Roll;
  get rollType(): typeof D20Roll;
}

declare namespace D20RollConfigurationDialog {
  interface Any extends D20RollConfigurationDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof D20RollConfigurationDialog<any, any, any>> {}

  interface RenderContext extends Omit<RollConfigurationDialog.RenderContext, "buttons"> {
    buttons: Record<"advantage" | "normal" | "disadvantage", { default: boolean; label: string }>;
  }
  interface Configuration extends RollConfigurationDialog.Configuration {
    defaultButton?: "advantage" | "normal" | "disadvantage";
  }
  interface RenderOptions extends RollConfigurationDialog.RenderOptions {}
}

export default D20RollConfigurationDialog;
