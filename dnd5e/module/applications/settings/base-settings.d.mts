import Application5e from "../api/application.mjs";
import { createCheckboxInput, type CreateInputFunction } from "../fields.mjs";

/**
 * Base application for configuring system settings.
 */
declare class BaseSettingsConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends Application5e<
  BaseSettingsConfig.RenderContext<RenderContext>,
  BaseSettingsConfig.Configuration<Configuration>,
  BaseSettingsConfig.RenderOptions<RenderOptions>
> {

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Create the field data for a specific setting.
   * @param name  Setting key within the dnd5e namespace.
   */
  createSettingField(name: string): {
    field: foundry.data.fields.BooleanField | foundry.data.fields.NumberField | foundry.data.fields.StringField
    name: string,
    value: string | number | boolean,
    input?: CreateInputFunction,
    options?: {
      value: string,
      label: string
    }[]
  }

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Commit settings changes.
   * @this {BaseSettingsConfig}
   * @param {SubmitEvent} event          The submission event.
   * @param {HTMLFormElement} form       The submitted form element.
   * @param {foundry.applications.ux.FormDataExtended} formData  The submitted form data.
   * @returns {Promise}
   */
  static #onCommitChanges(
    this: BaseSettingsConfig,
    event: SubmitEvent, 
    form: HTMLFormElement, 
    formData: foundry.applications.ux.FormDataExtended
  ): Promise<void>
}

declare namespace BaseSettingsConfig {
  type RenderContext<
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      buttons: {
        type: string,
        label: string,
        icon: string,
      }[],
      fields: ReturnType<BaseSettingsConfig['createSettingField']>[]
    },
    Ctx
  >
  type Configuration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
    },
    Cfg
  >
  type RenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
}

export default BaseSettingsConfig