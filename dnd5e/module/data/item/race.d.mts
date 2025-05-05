import { ItemDataModel } from "../abstract.mjs";
import AdvancementField from "../fields/advancement-field.mjs";
import { CreatureTypeField, MovementField, SensesField } from "../shared/_module.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";

declare class _ItemDataModel extends ItemDataModel {}

/**
 * Data definition for Race items.
 * @mixes ItemDescriptionTemplate
 */
declare class RaceData extends _ItemDataModel.mixin(ItemDescriptionTemplate<'race'>)<
 
dnd5e.types.MergeSchemas<
 dnd5e.types.MergeSchemas<
    // Base schema fields defined directly in RaceData.defineSchema()
    {
      advancement: foundry.data.fields.ArrayField<AdvancementField, { label: "DND5E.AdvancementTitle" }>,
      movement: MovementField,
      senses: SensesField,
      type: CreatureTypeField<{ swarm: never }>
    },
    // The second object for derived properties added to inherited fields is empty.
    {}
  >,
      fvttUtils.RemoveIndexSignatures<
        dnd5e.types.DataModelConfig.Item.race.OverrideSchema
      >
    >
> {
  /* -------------------------------------------- */
  /* Model Configuration                         */
  /* -------------------------------------------- */

  static metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      singleton: true
    }
  >;

  override metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      singleton: true
    }
  >;
  /* -------------------------------------------- */
  /* Properties                                  */
  /* -------------------------------------------- */

  /**
   * Sheet labels for a race's movement.
   */
  get movementLabels(): Record<dnd5e.types.Movement.TypeKey, string>;

  /**
   * Sheet labels for a race's senses.
   */
  get sensesLabels(): string[];

  /**
   * Sheet label for a race's creature type.
   */
  get typeLabel(): string;
}

declare namespace RaceData {
  type Schema = dnd5e.types.GetSchema<typeof RaceData>
}

declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface Item {
        race: typeof RaceData;
      }
      namespace Item.race {
        interface OverrideSchema extends foundry.data.fields.DataSchema {

        }
      }
    }
  }
}

export default RaceData;
