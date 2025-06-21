/**
 * Custom token configuration application for handling dynamic rings & resource labels.
 */
export class TokenConfig5e extends foundry.applications.sheets.TokenConfig {
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


export class PrototypeTokenConfig5e extends foundry.applications.sheets.PrototypeTokenConfig {}
