/** Base class for the advancement interface displayed by the advancement prompt that should be subclassed by individual advancement types. */

import type AdvancementManager from "./advancement-manager.mjs";

declare class AdvancementFlow<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
> extends foundry.appv1.api.FormApplication<
  globalThis.Item.Implementation,
  AdvancementFlow.Options
> {
  constructor(
    item: globalThis.Item.Implementation,
    advancementId: string,
    level: number,
    options?: Partial<foundry.appv1.api.FormApplication.Options>,
  );

  /** The item that houses the Advancement. */
  item: globalThis.Item.Implementation;

  /** ID of the advancement this flow modifies. */
  protected _advancementId: string;

  /** Level for which to configure this flow. */
  level: number;

  /**
   * Data retained by the advancement manager during a reverse step. If restoring data using Advancement#restore,
   * this data should be used when displaying the flow's form.
   */
  retainedData: object | null;

  static _warnedAppV1: boolean;

  static _customElements: string[];

  /** The Advancement object this flow modifies. */
  get advancement(): Document | null;

  /**
   * Set the retained data for this flow, giving it a chance to do any additional prep
   * work required for the retained data before the application is rendered.
   */
  retainData(data: object): Promise<void>;

  /**
   * Retrieve automatic application data from the advancement, if supported.
   * @returns Data to pass to the apply method, or `false` if user intervention required.
   */
  getAutomaticApplicationValue(): Promise<object | false>;

  /** @inheritDoc Data passed to the advancement-flow template. */
  getData(): {
    appId: string;
    advancement: Document | null;
    type: string;
    title: string;
    hint: string;
    summary: string;
    level: number;
  };

  /** @inheritDoc */
  protected _updateObject(event: Event, formData: object): Promise<void>;

  /** @inheritDoc */
  protected _canDragDrop(selector: string): boolean;
}

declare namespace AdvancementFlow {
  interface Options extends foundry.appv1.api.FormApplication.Options {
    /** The AdvancementManager that owns this flow, set at runtime by the manager. */
    manager?: AdvancementManager.Any;
  }

  interface Any extends AdvancementFlow<any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AdvancementFlow<any>> {}
}

export default AdvancementFlow;
