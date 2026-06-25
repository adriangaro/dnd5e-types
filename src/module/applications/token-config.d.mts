/**
 * Custom token configuration application for handling dynamic rings & resource labels.
 */
export declare class TokenConfig5e<
  RenderContext extends foundry.applications.sheets.TokenConfig.RenderContext = TokenConfig5e.RenderContext,
  Configuration extends
    foundry.applications.sheets.TokenConfig.Configuration = TokenConfig5e.Configuration,
  RenderOptions extends
    foundry.applications.sheets.TokenConfig.RenderOptions = TokenConfig5e.RenderOptions,
> extends foundry.applications.sheets.TokenConfig<RenderContext, Configuration, RenderOptions> {
  /** @inheritDoc */
  protected override _onRender(context: fvttUtils.DeepPartial<RenderContext>, options: fvttUtils.DeepPartial<RenderOptions>): Promise<void>;

  /** @inheritDoc */
  protected override _prepareContext(options: fvttUtils.DeepPartial<RenderOptions> & { isFirstRender: boolean }): Promise<RenderContext>;

  /** @inheritDoc */
  protected _prepareResourcesTab(): Promise<object>;

  /**
   * Adds charge based items as attributes for the current token.
   * @param attributes The attribute groups to add the item entries to.
   * @protected
   */
  _addItemAttributes(attributes: { group: string; value: any; label: string }[]): void;

  /**
   * Replace the attribute paths in token resources with human readable labels and sort them alphabetically.
   * @param html  The rendered markup.
   * @protected
   */
  _prepareResourceLabels(html: HTMLElement): void;

  /**
   * Lock the Vision tab fields that are derived from the actor's senses and surface a sync notice.
   * @param html  The rendered markup.
   * @protected
   */
  _applySenseSyncNotice(html: HTMLElement): void;
}

export declare namespace TokenConfig5e {
  interface Any extends TokenConfig5e<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof TokenConfig5e<any, any, any>> {}
  interface RenderContext extends foundry.applications.sheets.TokenConfig.RenderContext {
    scale: number;
  }
  interface Configuration extends foundry.applications.sheets.TokenConfig.Configuration {}
  interface RenderOptions extends foundry.applications.sheets.TokenConfig.RenderOptions {}
}

/**
 * Custom prototype token configuration application for handling dynamic rings & resource labels.
 */
export declare class PrototypeTokenConfig5e<
  RenderContext extends foundry.applications.sheets.PrototypeTokenConfig.RenderContext = PrototypeTokenConfig5e.RenderContext,
  Configuration extends
    foundry.applications.sheets.PrototypeTokenConfig.Configuration = PrototypeTokenConfig5e.Configuration,
  RenderOptions extends
    foundry.applications.sheets.PrototypeTokenConfig.RenderOptions = PrototypeTokenConfig5e.RenderOptions,
> extends foundry.applications.sheets.PrototypeTokenConfig<RenderContext, Configuration, RenderOptions> {
  /** @inheritDoc */
  protected override _onRender(context: fvttUtils.DeepPartial<RenderContext>, options: fvttUtils.DeepPartial<RenderOptions>): Promise<void>;

  /** @inheritDoc */
  protected _prepareResourcesTab(): Promise<object>;
}

export declare namespace PrototypeTokenConfig5e {
  interface Any extends PrototypeTokenConfig5e<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof PrototypeTokenConfig5e<any, any, any>> {}
  interface RenderContext extends foundry.applications.sheets.PrototypeTokenConfig.RenderContext {}
  interface Configuration extends foundry.applications.sheets.PrototypeTokenConfig.Configuration {}
  interface RenderOptions extends foundry.applications.sheets.PrototypeTokenConfig.RenderOptions {}
}
