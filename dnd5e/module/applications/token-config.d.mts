// TODO: replace with foundry.applications?.sheets?.TokenConfig
/**
 * Custom token configuration application for handling dynamic rings & resource labels.
 */
export class TokenConfig5e extends TokenConfig {
  /**
   * Adds charge based items as attributes for the current token.
   * @param attributes The attribute groups to add the item entries to.
   * @protected
   */
  _addItemAttributes(attributes: {
    group: string,
    value: any,
    label: string
  }[])

  /* -------------------------------------------- */

  /**
   * Replace the attribute paths in token resources with human readable labels and sort them alphabetically.
   * @param html  The rendered markup.
   * @protected
   */
  _prepareResourceLabels(html: HTMLElement)
}

// TODO replace with foundry.applications?.sheets?.PrototypeTokenConfig

export class PrototypeTokenConfig5e extends (class {}) {
  // TODO: V13 Update
  /** @inheritDoc */
  _onRender(context, options): Promise<void>

  /* -------------------------------------------- */

  // TODO: V13 Update
  /** @inheritDoc */
  _prepareResourcesTab(): Promise<any>
}
