import PhysicalItemTemplate from "../../../data/item/templates/physical-item.mjs";
import { EquipmentEntryData } from "../../../data/item/templates/starting-equipment.mjs";
import DocumentSheet5e from "../../api/document-sheet.mjs";

/**
 * Configuration application for Starting Equipment.
 */
declare class StartingEquipmentConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends DocumentSheet5e<
  Item.OfType<'class'>,
  StartingEquipmentConfig.MakeRenderContext<RenderContext>,
  StartingEquipmentConfig.MakeConfiguration<Configuration>,
  StartingEquipmentConfig.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** @override */
  get title(): string;


  /* -------------------------------------------- */
  /*  Event Listeners                             */
  /* -------------------------------------------- */

  /**
   * Handle an action.
   * @param element - The element on which the action is being performed.
   * @param options - Action options.
   * @param options.action - The specific action to perform.
   * @param options.depth - Depth of the element being acted upon.
   * @param options.entryId - ID of the entry to act upon.
   */
  _onAction(element: HTMLElement, options?: {
    action?: string;
    depth?: number;
    entryId?: string;
  }): void;

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /** @override */
  _prepareSubmitData(
    event: Event | SubmitEvent, 
    form: HTMLFormElement, 
    formData: foundry.applications.ux.FormDataExtended, 
    updateData?: fvttUtils.AnyObject
  ): fvttUtils.AnyObject;


  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /* -------------------------------------------- */

  /**
   * Sort an entry on drop.
   * @param event - Triggering drop event.
   * @param data - Drag event data.
   */
  _onSortEntry(event: DragEvent, data: fvttUtils.AnyObject): void;
}

declare class AnyStartingEquipmentConfig extends StartingEquipmentConfig<
  fvttUtils.EmptyObject, fvttUtils.EmptyObject, fvttUtils.EmptyObject
> {
  constructor(...args: any[]);
}

declare namespace StartingEquipmentConfig {
  interface Any extends AnyStartingEquipmentConfig {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyStartingEquipmentConfig> {}

  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      entries: {
        id: string;
        entry: InstanceType<typeof EquipmentEntryData>;
        depth: number;
        groupType: boolean;
        validTypes: Record<string, string>;
        children?: any[];
        linked?: Item.Implementation;
        showRequireProficiency?: boolean;
      }[];
    },
    Ctx
  >;
  type RenderContext = StartingEquipmentConfig['__RenderContext'];

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Configuration specific to starting equipment
    },
    Cfg
  >;
  type Configuration = StartingEquipmentConfig['__Configuration'];

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Render options specific to starting equipment
    },
    Opt
  >;
  type RenderOptions = StartingEquipmentConfig['__RenderOptions'];
}

export default StartingEquipmentConfig;
