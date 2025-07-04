import PseudoDocumentSheet from "../api/pseudo-document-sheet.mjs";

/**
 * Base configuration application for advancements that can be extended by other types to implement custom
 * editing interfaces.
 */
declare class AdvancementConfig<
  Document extends dnd5e.documents.advancement.Advancement.Any,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends PseudoDocumentSheet<
  Document,
  AdvancementConfig.MakeRenderContext<Document, RenderContext>,
  AdvancementConfig.MakeConfiguration<Configuration>,
  AdvancementConfig.MakeRenderOptions<RenderOptions>
> {
  constructor(advancement: Document, options?: fvttUtils.DeepPartial<AdvancementConfig.MakeConfiguration<Configuration>>)

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The advancement being created or edited.
   */
  get advancement(): Document

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle deleting an existing Item entry from the Advancement.
   */
  static #deleteDroppedItem<This extends AdvancementConfig.Any>(this: This, event: MouseEvent, target: HTMLElement): Promise<void>

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /**
   * Perform any changes to configuration data before it is saved to the advancement.

   */
  prepareConfigurationUpdate(configuration: object): Promise<object>

  /* -------------------------------------------- */

  /**
   * Helper method to take an object and apply updates that remove any empty keys.
   */
  static _cleanedObject(object: object): object

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /**
   * Handle beginning drag events on the sheet.
   */
  _onDragStart(event: DragEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle dropping items onto the sheet.
   */
  _onDrop(event: DragEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Called when an item is dropped to validate the Item before it is saved. An error should be thrown
   * if the item is invalid.
   */
  _validateDroppedItem(event: Event, item: Item.Implementation)
}

declare class AnyAdvancementConfig extends AdvancementConfig<any, fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject> {
  constructor(...args: any[])
}
type d = AnyAdvancementConfig['__RenderContext']
declare namespace AdvancementConfig {
  interface Any extends AnyAdvancementConfig { }
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyAdvancementConfig> { }

  type MakeRenderContext<
    Document extends dnd5e.documents.advancement.Advancement.Any,
    Ctx extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      advancement: Document,
      configuration: {
        data: dnd5e.types.GetKey<Document, 'configuration'>,
        fields: dnd5e.types.GetKey<
          dnd5e.types.GetKey<
            dnd5e.types.GetKey<
              Document,
              'configuration'
            >,
            'schema'
          >,
          'fields'
        >
      },
      fields: Document['schema']['fields'],
      source: Document['_source'],
      default: {
        title: string,
        icon: string,
        hint: string
      }
      levels: {
        value: number,
        label: string
      }[],
      classRestrictionOptions: {
        value: "" | "primary" | "secondary",
        label: string
      }[],
      showClassRestrictions: boolean,
      showLevelSelector: boolean
    },
    Ctx
  >
  type RenderContext = AdvancementConfig<
    dnd5e.documents.advancement.Advancement.Any
  >['__RenderContext']

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = AdvancementConfig<
    dnd5e.documents.advancement.Advancement.Any
  >['__Configuration']
  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = AdvancementConfig<
    dnd5e.documents.advancement.Advancement.Any
  >['__RenderOptions']
}

export default AdvancementConfig