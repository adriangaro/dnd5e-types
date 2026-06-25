/**
 * Data definition for Race items.
 *
 * Item subtype for character species/races. Mixes the advancement + description templates and adds
 * its own movement / senses / creature-type fields. Follows the canonical loot.d.mts pattern.
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixin } from "./../abstract/system-data-model.mjs";
import type AdvancementTemplate from "./templates/advancement.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";

declare global {
  namespace dnd5e.types.Item.Race {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof AdvancementTemplate,
      typeof ItemDescriptionTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + race's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Race.Templates>,
      {
        movement: dnd5e.types.fields.MovementField;
        senses: dnd5e.types.fields.SensesField;
        type: dnd5e.types.fields.CreatureTypeField;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the race subtype on the interface the funnel reads. */
    interface Item {
      race: typeof import("./race.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.race {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const RaceData_base: ReturnType<
  typeof ItemDataModelMixin<RaceData.Schema, RaceData.Base, RaceData.Derived, dnd5e.types.Item.Race.Templates>
>;

declare class RaceData extends RaceData_base {
  static override _systemType: "race";
  static override defineSchema(): RaceData.Schema;

  /** Sheet labels for a race's movement. */
  get movementLabels(): Partial<Record<dnd5e.types.Movement.TypeKey, string>>;

  /** Sheet labels for a race's senses. */
  get sensesLabels(): string[];

  /** Sheet label for a race's creature type. */
  get typeLabel(): string;
}

declare namespace RaceData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Race.BaseSchema,
    dnd5e.types.DataModelConfig.Item.race.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.race.OverrideBase>;
  type Derived = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.race.OverrideDerived>;
}

export default RaceData;
