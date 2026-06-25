/** Custom element that handles displaying activities lists. */

declare class ActivitiesElement extends HTMLElement {
  /**
   * The HTML tag named used by this element.
   */
  static tagName: string;

  /**
   * The application that contains this component.
   */
  get app(): foundry.applications.api.ApplicationV2.Any;

  /**
   * The Document containing the activities.
   */
  get document(): foundry.abstract.Document.Any;

  connectedCallback(): void;

  /**
   * Handle activity actions.
   * @param target    The action target.
   * @param action    The action to invoke.
   * @param options
   * @param options.event  The triggering event.
   */
  private _onAction(target: HTMLElement, action: string, options?: { event?: PointerEvent }): Promise<void>;

  /**
   * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs.
   * @param event  Triggering event.
   */
  _onChangeInputDelta(event: Event): Promise<void>;

  /**
   * Handle recharging an activity.
   * @param activity  The activity being recharged.
   * @param options
   * @param options.event  The triggering event.
   */
  _onRollRecharge(activity: dnd5e.types.Activity.Instance, options?: { event?: PointerEvent }): Promise<Roll | void>;
}

declare namespace ActivitiesElement {
  interface Any extends ActivitiesElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ActivitiesElement> {}
}

export default ActivitiesElement;
