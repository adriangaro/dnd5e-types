import { ItemDataModel } from "../abstract.mjs";
import AdvancementField from "../fields/advancement-field.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import StartingEquipmentTemplate from "./templates/starting-equipment.mjs";


declare class _ItemDataModel extends ItemDataModel {}

/**
 * Data definition for Background items.
 */
declare class BackgroundData extends _ItemDataModel.mixin(
  ItemDescriptionTemplate<'background'>, StartingEquipmentTemplate
)<
  dnd5e.types.MergeSchemas<
    {
      advancement: foundry.data.fields.ArrayField<AdvancementField, { label: "DND5E.AdvancementTitle" }>
    },
    {

    }
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
    }
  }
}

export default BackgroundData;

