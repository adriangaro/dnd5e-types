/**
 * Base class for the advancement interface displayed by the advancement prompt that should be subclassed by
 * individual advancement types.
 */
declare class AdvancementFlow<
  Document extends dnd5e.documents.advancement.Advancement.Any,
> extends FormApplication<
  Item.Implementation,
  FormApplication.Options
> {
  item: Item.Implementation
  _advancementId: string
  level: number
  retainedData: object | null
  constructor(item: Item.Implementation, advancementId: string, level: number, options?: FormApplication.Options)

  /* -------------------------------------------- */

  /**
   * The Advancement object this flow modifies.
   */
  get advancement(): Document | null

  /* -------------------------------------------- */

  /**
   * Set the retained data for this flow. This method gives the flow a chance to do any additional prep
   * work required for the retained data before the application is rendered.
   */
  retainData(data: object): Promise<void>

  /* -------------------------------------------- */

  /** @inheritDoc */
  getData(): {
    appId: string,
    advancement: Document,
    type: string,
    title: string,
    hint: string,
    summary: string,
    level: number
  }

  /* -------------------------------------------- */

  /**
   * Retrieve automatic application data from the advancement, if supported.
   */
  getAutomaticApplicationValue(): object | false

  protected override _updateObject(event: Event, formData?: object): Promise<void>
}

declare class AnyAdvancementFlow extends AdvancementFlow<any> {
  constructor(...args: any[]);
}

declare namespace AdvancementFlow {
  interface Any extends AnyAdvancementFlow {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyAdvancementFlow> {}
}

export default AdvancementFlow