import { ItemDataModel } from "../abstract.mjs";
import AdvancementField from "../fields/advancement-field.mjs";
import IdentifierField from "../fields/identifier-field.mjs";
import SpellcastingField from "./fields/spellcasting-field.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";


declare class _ItemDataModel extends ItemDataModel {}

/**
 * Data definition for Subclass items.
 * @mixes ItemDescriptionTemplate
 */
declare class SubclassData extends _ItemDataModel.mixin(ItemDescriptionTemplate<'subclass'>)<
  dnd5e.types.MergeSchemas<
    // Base schema fields defined directly in SubclassData.defineSchema()
    {
      advancement: foundry.data.fields.ArrayField<AdvancementField, { label: "DND5E.AdvancementTitle" }>,
      classIdentifier: IdentifierField<{
        required: true, label: "DND5E.ClassIdentifier", hint: "DND5E.ClassIdentifierHint"
      }>,
      spellcasting: SpellcastingField
    },
    // The second object for derived properties added to inherited fields is empty.
    {}
  >
> {

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareFinalData()
}

declare global {
  namespace dnd5e.types {
    namespace ItemProperties {
      interface ValidPropertyMap {
        subclass: never
      }
    }

    namespace DataModelConfig {
      interface Item {
        subclass: typeof SubclassData;
      }
    }
  }
}

export default SubclassData;