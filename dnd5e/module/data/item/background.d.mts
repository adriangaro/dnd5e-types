import { ItemDataModel } from "../abstract.mjs";
import AdvancementField from "../fields/advancement-field.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import StartingEquipmentTemplate from "./templates/starting-equipment.mjs";


declare class _ItemDataModel extends ItemDataModel { }

/**
 * Data definition for Background items.
 */
declare class BackgroundData extends _ItemDataModel.mixin(
  ItemDescriptionTemplate<'background'>, StartingEquipmentTemplate
)<
  dnd5e.types.MergeSchemas<
    dnd5e.types.MergeSchemas<
      {
        advancement: foundry.data.fields.ArrayField<AdvancementField, { label: "DND5E.AdvancementTitle" }>
      },
      {

      }
    >,
    fvttUtils.RemoveIndexSignatures<
      dnd5e.types.DataModelConfig.Item.background.OverrideSchema
    >
  >
> {

  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      singleton: true
    }
  >;
  static get metadata(): fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      singleton: true
    }
  >;

  /** @inheritDoc */
  getSheetData(context: BackgroundData.SheetData): Promise<void>
}

declare namespace BackgroundData {
  type Schema = dnd5e.types.GetSchema<typeof BackgroundData>
  interface SheetData {
    subtitles: { label: string }[],
    singleDescription: boolean,
    parts: string[]
  }
}

declare global {
  namespace dnd5e.types {
    namespace ItemProperties {
      interface ValidPropertyMap {
        background: never
      }
    }

    namespace DataModelConfig {
      interface Item {
        background: typeof BackgroundData;
      }
      namespace Item.background {
        interface OverrideSchema extends foundry.data.fields.DataSchema {

        }
      }
    }
  }
}

export default BackgroundData;

