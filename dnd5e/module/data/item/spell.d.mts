import { ItemDataModel } from "../abstract.mjs";
import ActivationField from "../shared/activation-field.mjs";
import DurationField from "../shared/duration-field.mjs";
import RangeField from "../shared/range-field.mjs";
import TargetField from "../shared/target-field.mjs";
import ActivitiesTemplate from "./templates/activities.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";

declare class _ItemDataModel extends ItemDataModel { }

/**
 * Data definition for Spell items.
 * @mixes ActivitiesTemplate
 * @mixes ItemDescriptionTemplate
 */
declare class SpellData extends _ItemDataModel.mixin(ActivitiesTemplate, ItemDescriptionTemplate<'spell'>)<
  dnd5e.types.MergeSchemas<
    // Base schema fields defined directly in SpellData.defineSchema()
    {
      ability: foundry.data.fields.StringField<{ label: "DND5E.SpellAbility" }>,
      activation: ActivationField,
      duration: DurationField,
      level: foundry.data.fields.NumberField<{ required: true, integer: true, initial: 1, min: 0, label: "DND5E.SpellLevel" }>,
      materials: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.StringField<{ required: true, label: "DND5E.SpellMaterialsDescription" }>,
        consumed: foundry.data.fields.BooleanField<{ required: true, label: "DND5E.SpellMaterialsConsumed" }>,
        cost: foundry.data.fields.NumberField<{ required: true, initial: 0, min: 0, label: "DND5E.SpellMaterialsCost" }>,
        supply: foundry.data.fields.NumberField<{ required: true, initial: 0, min: 0, label: "DND5E.SpellMaterialsSupply" }>
      }, { label: "DND5E.SpellMaterials" }>,
      preparation: foundry.data.fields.SchemaField<{
        mode: foundry.data.fields.StringField<{ required: true, initial: "prepared", label: "DND5E.SpellPreparation.Mode" }>,
        prepared: foundry.data.fields.BooleanField<{ required: true, label: "DND5E.SpellPrepared" }>
      }, { label: "DND5E.SpellPreparation.Label" }>,
      properties: foundry.data.fields.SetField<
        dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperties.Spell.TypeKey>,
        { label: "DND5E.SpellComponents" }
      >,
      range: RangeField,
      school: foundry.data.fields.StringField<{ required: true, label: "DND5E.SpellSchool" }>,
      sourceClass: foundry.data.fields.StringField<{ label: "DND5E.SpellSourceClass" }>,
      target: TargetField
    },
    // The second object for derived properties added to inherited fields is empty,
    // as derived properties from mixins should be typed in the mixins' .d.mts files.
    {}
  >
> {
  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  static _migrateComponentData(source: SpellData['_source']): void;

  static #migrateActivation(source: SpellData['_source']): void;

  static #migrateTarget(source: SpellData['_source']): void;

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  prepareDerivedData(): void; // Overrides ItemDataModel

  prepareFinalData(): void; // Overrides ItemDataModel

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Attack classification of this spell.
   */
  get attackClassification(): "spell";

  /** @override */
  get availableAbilities(): Set<string>; // Overrides ItemDataModel

  /**
   * Properties displayed in chat.
   */
  get chatProperties(): string[];

  /**
   * Retrieve a linked activity that granted this spell using the stored `cachedFor` value.
   */
  get linkedActivity(): dnd5e.types.Activity.Any | null;

  /**
   * The proficiency multiplier for this item.
   */
  get proficiencyMultiplier(): number; // Overrides ItemDataModel

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /** @inheritDoc */
  getFavoriteData(): Promise<ItemDataModel.FavoriteData & {
    subtitle: [string, string],
    modifier: string,
    range: SpellData['range'],
    save: dnd5e.types.Activity.ActivityInstances['save']['save'] | null
  }>;

  /* -------------------------------------------- */
  /*  Shims                                       */
  /* -------------------------------------------- */

  _applySpellShims(): void; // Private method
}


declare global {
  namespace dnd5e.types {
    namespace ItemProperties {
      namespace Spell {
        // --- Base Definitions ---
        interface DefaultSpellProperties {
          vocal: true;         // V - Verbal component
          somatic: true;       // S - Somatic component
          material: true;      // M - Material component
          concentration: true; // C - Requires concentration
          ritual: true;        // R - Can be cast as a ritual
        }

        /**
         * Override interface for declaration merging.
         * Add custom spell properties here (e.g., focus required).
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Spell {
         * interface OverrideTypes {
         * requiresFocus: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultSpellProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      interface ValidPropertyMap {
        spell: ItemProperties.Spell.TypeKey;
      }
    }

    namespace DataModelConfig {
      interface Item {
        spell: typeof SpellData;
      }
    }
  }
}

export default SpellData;
