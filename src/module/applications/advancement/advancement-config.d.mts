/** Base configuration application for advancements that can be extended by other types to implement custom editing interfaces. */

declare class AdvancementConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  Options extends AdvancementConfig.Options = AdvancementConfig.Options,
> extends foundry.appv1.api.FormApplication<Document, Options> {
  /** Parent item to which this advancement belongs. */
  item: globalThis.Item.Implementation;

  /** The advancement being created or edited. */
  get advancement(): Document;

  /** @inheritDoc */
  get title(): string;

  /** @inheritDoc */
  activateListeners(html: JQuery): void;

  /** @inheritDoc */
  close(options?: object): Promise<void>;

  /** @inheritDoc */
  getData(): {
    appId: string;
    CONFIG: object;
    src: object;
    source: Document["_source"];
    default: { title: string; icon: string; hint: string };
    levels: Record<number, number | string>;
    classRestrictionOptions: { value: "" | "primary" | "secondary"; label: string }[];
    showClassRestrictions: boolean;
    showLevelSelector: boolean;
  };

  /** Perform any changes to configuration data before it is saved to the advancement. */
  prepareConfigurationUpdate(configuration: object): Promise<object>;

  /**
   * Helper method to take an object and apply updates that remove any empty keys.
   * @param object  Object to be cleaned.
   * @returns Copy of object with only non false-ish values included and others marked with ForcedDeletion syntax to be removed by update process.
   */
  protected static _cleanedObject(object: object): object;

  /** @inheritDoc */
  protected _canDragDrop(selector: string): boolean;

  /** @inheritDoc */
  protected _onDrop(event: DragEvent): Promise<void>;

  /**
   * Handle deleting an existing Item entry from the Advancement.
   * @param event  The originating click event.
   * @returns The updated parent Item after the application re-renders.
   */
  protected _onItemDelete(event: Event): Promise<globalThis.Item.Implementation>;

  /**
   * Called when an item is dropped to validate the Item before it is saved. An error should be thrown
   * if the item is invalid.
   * @param event  Triggering drop event.
   * @param item   The materialized Item that was dropped.
   * @throws An error if the item is invalid.
   */
  protected _validateDroppedItem(event: Event, item: Item.Implementation): void;

  /** @inheritDoc */
  protected _updateObject(event: Event, formData: object): Promise<void>;
}

declare namespace AdvancementConfig {
  /** Path within advancement configuration where dropped items are stored. If populated, will enable default drop & delete behavior. */
  interface Options extends foundry.appv1.api.FormApplication.Options {
    dropKeyPath?: string | null;
  }

  interface Any extends AdvancementConfig<any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AdvancementConfig<any, any>> {}
}

export default AdvancementConfig;
