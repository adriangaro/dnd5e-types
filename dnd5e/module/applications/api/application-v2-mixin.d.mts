declare class BaseApplication5e {
  /** @privateRemarks All mixin classses should accept anything for its constructor. */
  constructor(...args: any[]);


  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * A reference to the window subtitle.
   */
  get subtitle(): string

  /* -------------------------------------------- */

  /**
   * Disable form fields that aren't marked with the `interface-only` class.
   */
  _disableFields()
}

/**
 * Mixin method for ApplicationV2-based 5e applications.
 */
declare function ApplicationV2Mixin<
  T extends foundry.applications.api.HandlebarsApplicationMixin.BaseClass
>(Base: T): fvttUtils.Mixin<
  typeof BaseApplication5e,
  ReturnType<typeof foundry.applications.api.HandlebarsApplicationMixin<T>>
>

declare namespace ApplicationV2Mixin {
  type MixinClass = BaseApplication5e

  type RenderContext = dnd5e.types.DeepMerge<
    {},
    {
      CONFIG: dnd5e.types.DND5EConfig
      inputs: fvttUtils.PrettifyType<
        typeof foundry.applications.fields & typeof dnd5e.applications.fields
      >
    }
  >
  type Configuration = dnd5e.types.DeepMerge<
    {},
    {
      window: {
        subtitle: string
      }
    }
  >
  type RenderOptions = dnd5e.types.DeepMerge<
    foundry.applications.api.HandlebarsApplicationMixin.RenderOptions,
    {
      window: {
        subtitle: string
      }
    }
  >
}

export default ApplicationV2Mixin