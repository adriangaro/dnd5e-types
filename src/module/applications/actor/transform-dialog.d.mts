/** Dialog that controls transforming an actor using another actor. */

import TransformationSetting from "../../data/settings/transformation-setting.mjs";
import Dialog5e from "../api/dialog.mjs";

declare class TransformDialog<
  RenderContext extends object = TransformDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = TransformDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = TransformDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  /** Settings that should be applied during transformation. */
  get settings(): TransformationSetting;

  /** Was the transform button clicked? */
  get shouldTransform(): boolean;

  /** Prepare rendering context for the details section. */
  _prepareDetailsContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Prepare rendering context for the presets section. */
  _preparePresetsContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Prepare rendering context for the settings section. */
  _prepareSettingsContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /**
   * Display the transform dialog.
   * @param host    Actor that will be transformed.
   * @param source  Actor whose data will be applied to the host.
   * @param options Additional options for the application.
   * @returns Transformation settings to apply.
   */
  static promptSettings(
    host: Actor.Implementation,
    source: Actor.Implementation,
    options?: TransformDialog.Configuration & { windowId?: string },
  ): Promise<TransformationSetting | null>;
}

declare namespace TransformDialog {
  interface Any extends TransformDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof TransformDialog<any, any, any>> {}

  interface RenderContext extends Dialog5e.RenderContext {
    sourceActor?: { artwork: string; name: string };
    hostActor?: { artwork: string; name: string };
    presets?: Record<string, { selected: boolean } & dnd5e.types.Transformation.PresetConfig>;
    noneSelected?: boolean;
    categories?: ReturnType<TransformationSetting["createFormCategories"]>;
  }
  interface Configuration extends Dialog5e.Configuration {
    transform?: {
      host?: Actor.Implementation | null;
      settings?: TransformationSetting | null;
      source?: Actor.Implementation | null;
    };
  }
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default TransformDialog;
