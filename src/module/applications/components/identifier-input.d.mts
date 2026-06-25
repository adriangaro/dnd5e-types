/** Input that allows for entering properly validated identifiers and selecting from a pre-built list. */

declare class IdentifierInputElement extends foundry.applications.elements.AbstractFormInputElement<string> {
  /**
   * Value representing the custom entry in the select dropdown.
   */
  static CUSTOM: "__CUSTOM__";

  /**
   * Mapping of item types to registry entries.
   */
  static REGISTRY_MAP: Record<string, (typeof dnd5e.registry)["backgrounds"]>;

  /** @override */
  static tagName: string;

  /** @override */
  protected _refresh(): void;

  /**
   * Handle changes to one of the internal fields.
   * @param event  Triggering change event.
   */
  _onChangeInput(event: Event): void;
}

export default IdentifierInputElement;
