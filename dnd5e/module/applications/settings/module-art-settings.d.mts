/**
 * A class responsible for allowing GMs to configure art provided by installed modules.
 */
export default class ModuleArtSettingsConfig extends FormApplication {

  /* -------------------------------------------- */

  /**
   * Handle priority increase or decrease actions.
   * @param {PointerEvent} event  The triggering event.
   * @protected
   */
  _onAction(event: PointerEvent)

  /* -------------------------------------------- */

  /** @inheritDoc */
  _updateObject(event: Event, formData: FormDataExtended): Promise<any>
}
